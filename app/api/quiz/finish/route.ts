
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";

type FinishError = {
  error: string;
  status: number;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const attemptId =
      typeof body.attemptId === "string" ? body.attemptId : "";

    if (!attemptId) {
      return NextResponse.json(
        { success: false, message: "Attempt ID is required." },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const attempt = await tx.quizAttempt.findUnique({
        where: { id: attemptId },
      });

      if (!attempt) {
        return {
          error: "Quiz attempt not found.",
          status: 404,
        } satisfies FinishError;
      }

      if (attempt.status !== "IN_PROGRESS") {
        return {
          error: "This quiz has already been submitted.",
          status: 409,
        } satisfies FinishError;
      }

      const now = new Date();
      const expired = now >= attempt.expiresAt;

      const answers = await tx.quizAnswer.findMany({
        where: { attemptId },
        select: {
          isCorrect: true,
          pointsAwarded: true,
        },
      });

      if (!expired && answers.length < attempt.totalQuestions) {
        return {
          error: "Please answer all questions before submitting.",
          status: 400,
        } satisfies FinishError;
      }

      const score = answers.reduce(
        (total, answer) => total + answer.pointsAwarded,
        0
      );

      const correctAnswers = answers.filter(
        (answer) => answer.isCorrect
      ).length;

      const durationSeconds = Math.min(
        240,
        Math.max(
          0,
          Math.floor(
            (now.getTime() - attempt.startedAt.getTime()) / 1000
          )
        )
      );

      const status = expired ? "EXPIRED" : "COMPLETED";

      await tx.quizAttempt.update({
        where: { id: attemptId },
        data: {
          status,
          score,
          correctAnswers,
          completedAt: now,
          durationSeconds,
        },
      });

      return {
        score,
        correctAnswers,
        totalQuestions: attempt.totalQuestions,
        durationSeconds,
        status,
        rewardUnlocked: score >= 15,
      };
    });

    if ("error" in result) {
      return NextResponse.json(
        {
          success: false,
          message: result.error,
        },
        {
          status: result.status,
        }
      );
    }

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Quiz finish error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to finish the quiz.",
      },
      { status: 500 }
    );
  }
}

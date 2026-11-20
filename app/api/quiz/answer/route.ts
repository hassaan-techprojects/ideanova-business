
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const attemptId =
      typeof body.attemptId === "string" ? body.attemptId : "";

    const questionId =
      typeof body.questionId === "string" ? body.questionId : "";

    const selectedAnswer = body.selectedAnswer;

    if (
      !attemptId ||
      !questionId ||
      !Number.isInteger(selectedAnswer) ||
      selectedAnswer < 0
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid answer submission." },
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
        };
      }

      if (attempt.status !== "IN_PROGRESS") {
        return {
          error: "This quiz is no longer active.",
          status: 409,
        };
      }

      const now = new Date();

      if (now >= attempt.expiresAt) {
        await tx.quizAttempt.update({
          where: { id: attemptId },
          data: {
            status: "EXPIRED",
            completedAt: now,
            durationSeconds: Math.min(
              240,
              Math.floor(
                (now.getTime() - attempt.startedAt.getTime()) / 1000
              )
            ),
          },
        });

        return {
          error: "Your 4-minute quiz time has expired.",
          status: 410,
        };
      }

      const assignedQuestionIds = Array.isArray(attempt.questionIds)
        ? attempt.questionIds
        : [];

      if (
        !assignedQuestionIds.includes(questionId) ||
        !assignedQuestionIds.every((id) => typeof id === "string")
      ) {
        return {
          error: "This question does not belong to your quiz.",
          status: 403,
        };
      }

      const question = await tx.question.findUnique({
        where: { id: questionId },
        select: {
          id: true,
          options: true,
          correctAnswer: true,
        },
      });

      if (!question || !Array.isArray(question.options)) {
        return {
          error: "Question not found.",
          status: 404,
        };
      }

      if (
        selectedAnswer >= question.options.length ||
        question.options.length !== 4
      ) {
        return {
          error: "Invalid answer option.",
          status: 400,
        };
      }

      const isCorrect = selectedAnswer === question.correctAnswer;

      await tx.quizAnswer.upsert({
        where: {
          attemptId_questionId: {
            attemptId,
            questionId,
          },
        },
        create: {
          attemptId,
          questionId,
          selectedAnswer,
          isCorrect,
          pointsAwarded: isCorrect ? 1 : 0,
          answeredAt: now,
        },
        update: {
          selectedAnswer,
          isCorrect,
          pointsAwarded: isCorrect ? 1 : 0,
          answeredAt: now,
        },
      });

      const answeredCount = await tx.quizAnswer.count({
        where: { attemptId },
      });

      return {
        answeredCount,
        totalQuestions: attempt.totalQuestions,
      };
    });

    if ("error" in result) {
      return NextResponse.json(
        { success: false, message: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Answer saved successfully.",
      answeredCount: result.answeredCount,
      totalQuestions: result.totalQuestions,
    });
  } catch (error) {
    console.error("Quiz answer error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save your answer. Please try again.",
      },
      { status: 500 }
    );
  }
}

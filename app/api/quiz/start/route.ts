
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";

const CATEGORIES = [
  "FINANCE",
  "MARKETING",
  "HR",
  "BUSINESS_STRATEGY",
] as const;

const QUESTIONS_PER_CATEGORY = 5;
const QUIZ_DURATION_SECONDS = 4 * 60;

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name =
      typeof body.name === "string" ? body.name.trim() : "";

    if (name.length < 2 || name.length > 40) {
      return NextResponse.json(
        { success: false, message: "Name must contain 2–40 characters." },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // Find the participant, or create a new participant.
      let participant = await tx.participant.findFirst({
        where: {
          name: {
            equals: name,
            mode: "insensitive",
          },
        },
      });

      if (!participant) {
        participant = await tx.participant.create({
          data: { name },
        });
      }

      const now = new Date();

      // Expire any previous attempts whose time has run out.
      await tx.quizAttempt.updateMany({
        where: {
          participantId: participant.id,
          status: "IN_PROGRESS",
          expiresAt: { lte: now },
        },
        data: {
          status: "EXPIRED",
          completedAt: now,
        },
      });

      // Do not allow multiple active attempts for one participant.
      const activeAttempt = await tx.quizAttempt.findFirst({
        where: {
          participantId: participant.id,
          status: "IN_PROGRESS",
          expiresAt: { gt: now },
        },
      });

      if (activeAttempt) {
        return {
          error: "You already have an active quiz. Please finish it first.",
        };
      }

      // Collect every question assigned in this participant's past attempts.
      const previousAttempts = await tx.quizAttempt.findMany({
        where: { participantId: participant.id },
        select: { questionIds: true },
      });

      const previouslyUsed = new Set<string>();

      for (const attempt of previousAttempts) {
        if (Array.isArray(attempt.questionIds)) {
          for (const id of attempt.questionIds) {
            if (typeof id === "string") {
              previouslyUsed.add(id);
            }
          }
        }
      }

      // Pick 5 questions from each category.
      const selectedQuestions = [];

      for (const category of CATEGORIES) {
        const available = await tx.question.findMany({
          where: {
            category,
            isActive: true,
          },
        });

        if (available.length < QUESTIONS_PER_CATEGORY) {
          throw new Error(
            `Not enough active questions in ${category}.`
          );
        }

        const freshQuestions = shuffle(
          available.filter((q) => !previouslyUsed.has(q.id))
        );

        const recycledQuestions = shuffle(
          available.filter((q) => previouslyUsed.has(q.id))
        );

        const chosen = [
          ...freshQuestions.slice(0, QUESTIONS_PER_CATEGORY),
        ];

        // Reuse older questions only when fresh ones are insufficient.
        if (chosen.length < QUESTIONS_PER_CATEGORY) {
          chosen.push(
            ...recycledQuestions.slice(
              0,
              QUESTIONS_PER_CATEGORY - chosen.length
            )
          );
        }

        selectedQuestions.push(...chosen);
      }

      // Randomize the order of all 20 questions.
      const finalQuestions = shuffle(selectedQuestions);

      const startedAt = new Date();
      const expiresAt = new Date(
        startedAt.getTime() + QUIZ_DURATION_SECONDS * 1000
      );

      const questionIds = finalQuestions.map((q) => q.id);

      const attempt = await tx.quizAttempt.create({
        data: {
          participantId: participant.id,
          status: "IN_PROGRESS",
          totalQuestions: 20,
          questionIds,
          startedAt,
          expiresAt,
        },
      });

      return {
        participantName: participant.name,
        attemptId: attempt.id,
        startedAt,
        expiresAt,
        durationSeconds: QUIZ_DURATION_SECONDS,
        questions: finalQuestions.map((q) => ({
          id: q.id,
          category: q.category,
          question: q.question,
          options: Array.isArray(q.options)
            ? q.options.filter(
                (option): option is string =>
                  typeof option === "string"
              )
            : [],
        })),
      };
    });

    if ("error" in result) {
      return NextResponse.json(
        { success: false, message: result.error },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your IDEANOVA Business Quiz has started!",
      quiz: result,
    });
  } catch (error) {
    console.error("Quiz start error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to start the quiz. Please try again.",
      },
      { status: 500 }
    );
  }
}

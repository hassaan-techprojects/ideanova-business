import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    await prisma.$connect();

    const participants = await prisma.participant.count();
    const questions = await prisma.question.count();

    return NextResponse.json({
      success: true,
      message: "IDEANOVA Quiz database connected successfully!",
      database: {
        participants,
        questions,
      },
    });
  } catch (error) {
    console.error("IDEANOVA DATABASE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed. Check the server terminal.",
        errorType:
          error instanceof Error ? error.name : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect().catch(() => {});
  }
}
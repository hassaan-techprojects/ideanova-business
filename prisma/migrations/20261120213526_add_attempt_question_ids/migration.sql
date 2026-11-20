-- AlterTable
ALTER TABLE "QuizAttempt" ADD COLUMN     "questionIds" JSONB NOT NULL DEFAULT '[]';

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import "./quiz.css";

type QuizQuestion = {
  id: string;
  category: string;
  question: string;
  options: string[];
};

type QuizSession = {
  participantName: string;
  attemptId: string;
  startedAt: string;
  expiresAt: string;
  durationSeconds: number;
  questions: QuizQuestion[];
};

type QuizResult = {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  durationSeconds: number;
  status: string;
  rewardUnlocked: boolean;
};

type Phase = "welcome" | "quiz" | "finishing" | "result";

const categoryNames: Record<string, string> = {
  FINANCE: "Finance",
  MARKETING: "Marketing",
  HR: "Human Resources",
  BUSINESS_STRATEGY: "Business Strategy",
};

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [name, setName] = useState("");
  const [session, setSession] = useState<QuizSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [remaining, setRemaining] = useState(240);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const finishStarted = useRef(false);

  const finishQuiz = useCallback(async () => {
    if (!session || finishStarted.current) return;

    finishStarted.current = true;
    setPhase("finishing");
    setError("");

    try {
      const response = await fetch("/api/quiz/finish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attemptId: session.attemptId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to finish the quiz.");
      }

      setResult(data.result);
      setPhase("result");
    } catch (err) {
      finishStarted.current = false;
      setPhase("quiz");

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while finishing."
      );
    }
  }, [session]);

  useEffect(() => {
    if (phase !== "quiz" || !session) return;

    const updateTimer = () => {
      const secondsLeft = Math.max(
        0,
        Math.ceil(
          (new Date(session.expiresAt).getTime() - Date.now()) / 1000
        )
      );

      setRemaining(secondsLeft);

      if (secondsLeft <= 0) {
        void finishQuiz();
      }
    };

    updateTimer();

    const timer = window.setInterval(updateTimer, 250);

    return () => window.clearInterval(timer);
  }, [phase, session, finishQuiz]);

  async function startQuiz(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanName = name.trim();

    if (cleanName.length < 2 || cleanName.length > 40) {
      setError("Please enter a name between 2 and 40 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/quiz/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to start the quiz.");
      }

      setSession(data.quiz);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setAnsweredCount(0);
      setRemaining(data.quiz.durationSeconds ?? 240);
      setResult(null);
      finishStarted.current = false;
      setPhase("quiz");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to start the quiz."
      );
    } finally {
      setLoading(false);
    }
  }

  async function submitAnswer() {
    if (!session || selectedAnswer === null || submitting) return;

    const question = session.questions[currentIndex];

    if (!question) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/quiz/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attemptId: session.attemptId,
          questionId: question.id,
          selectedAnswer,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to save your answer.");
      }

      setAnsweredCount((count) => count + 1);

      if (currentIndex === session.questions.length - 1) {
        await finishQuiz();
      } else {
        setCurrentIndex((index) => index + 1);
        setSelectedAnswer(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save your answer."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function resetQuiz() {
    setName("");
    setSession(null);
    setResult(null);
    setCurrentIndex(0);
    setAnsweredCount(0);
    setSelectedAnswer(null);
    setRemaining(240);
    setError("");
    setLoading(false);
    setSubmitting(false);
    finishStarted.current = false;
    setPhase("welcome");
  }

  const currentQuestion = session?.questions[currentIndex];
  const totalQuestions = session?.questions.length ?? 20;
  const progress =
    totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  return (
    <main className="quiz-page">
      {/* HEADER */}
      <header className="quiz-header">
        <div className="quiz-header-inner">
          <a href="/" className="quiz-brand" aria-label="IDEANOVA home">
            <Image
              src="/ideanova-logo.jpeg"
              alt="IDEANOVA logo"
              width={48}
              height={48}
              className="quiz-brand-logo"
              priority
            />

            <div className="quiz-brand-copy">
              <p className="quiz-brand-name">IDEANOVA</p>
              <p className="quiz-brand-tagline">
                Where Ideas Become Impact
              </p>
            </div>
          </a>

          <div className="quiz-header-caption">
            Entrepreneurship Club
          </div>

          <a href="/" className="quiz-exit">
            Exit Quiz
          </a>
        </div>
      </header>

      {/* MAIN */}
      <div className="quiz-container">
        {/* WELCOME SCREEN */}
        {phase === "welcome" && (
          <section className="quiz-welcome">
            <div className="quiz-intro">
              <div className="quiz-eyebrow">
                <span className="quiz-eyebrow-dot" />
                IDEANOVA Business Challenge
              </div>

              <h1 className="quiz-main-heading">
                Think sharp.
                <br />
                <span>Decide smart.</span>
                <br />
                Lead forward.
              </h1>

              <p className="quiz-intro-description">
                Put your business knowledge to the test. Take on challenging
                questions across finance, marketing, human resources and
                business strategy. Think critically, make decisions and prove
                your business intelligence.
              </p>

              <div className="quiz-stats">
                <div className="quiz-stat-card">
                  <p className="quiz-stat-value">20</p>
                  <p className="quiz-stat-label">Questions</p>
                </div>

                <div className="quiz-stat-card">
                  <p className="quiz-stat-value">04:00</p>
                  <p className="quiz-stat-label">Minutes</p>
                </div>

                <div className="quiz-stat-card">
                  <p className="quiz-stat-value">04</p>
                  <p className="quiz-stat-label">Categories</p>
                </div>
              </div>
            </div>

            {/* REGISTRATION */}
            <div className="quiz-register-card">
              <div className="quiz-register-top">
                <span className="quiz-register-label">
                  Candidate Registration
                </span>

                <span className="quiz-register-step">01 / 02</span>
              </div>

              <h2 className="quiz-register-heading">
                Ready to take
                <br />
                the challenge?
              </h2>

              <p className="quiz-register-description">
                Enter your name to create your quiz attempt and begin your
                business challenge.
              </p>

              <form onSubmit={startQuiz} className="quiz-form">
                <label
                  htmlFor="participant-name"
                  className="quiz-input-label"
                >
                  Participant Name
                </label>

                <input
                  id="participant-name"
                  className="quiz-name-input"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  minLength={2}
                  maxLength={40}
                  autoComplete="name"
                  required
                />

                {error && (
                  <div className="quiz-error" role="alert">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="quiz-primary-button"
                  disabled={loading}
                >
                  {loading ? "Preparing your quiz..." : "Start the challenge"}

                  {!loading && <span aria-hidden="true">→</span>}
                </button>
              </form>

              <div className="quiz-register-footer">
                Four business disciplines. Twenty challenging questions.
                Four minutes. Your attempt and score will be recorded.
              </div>
            </div>
          </section>
        )}

        {/* QUIZ SCREEN */}
        {phase === "quiz" && session && currentQuestion && (
          <section className="quiz-content">
            <div className="quiz-topbar">
              <div>
                <p className="quiz-heading-small">
                  IDEANOVA Business Challenge
                </p>

                <h1 className="quiz-participant-heading">
                  Good luck, {session.participantName}.
                </h1>
              </div>

              <div
                className={`quiz-timer ${
                  remaining <= 30 ? "quiz-timer-danger" : ""
                }`}
              >
                <p className="quiz-timer-label">Time Remaining</p>

                <p className="quiz-timer-value">
                  {formatTime(remaining)}
                </p>
              </div>
            </div>

            {/* PROGRESS */}
            <div className="quiz-progress-card">
              <div className="quiz-progress-top">
                <span className="quiz-progress-title">
                  Your Progress
                </span>

                <span className="quiz-progress-count">
                  {answeredCount} / {totalQuestions}
                </span>
              </div>

              <div
                className="quiz-progress-track"
                role="progressbar"
                aria-valuenow={answeredCount}
                aria-valuemin={0}
                aria-valuemax={totalQuestions}
              >
                <div
                  className="quiz-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="quiz-progress-bottom">
                <span>
                  Question {currentIndex + 1} of {totalQuestions}
                </span>

                <span>1 point per correct answer</span>
              </div>
            </div>

            {/* QUESTION */}
            <div className="quiz-question-card" key={currentQuestion.id}>
              <div className="quiz-question-top">
                <span className="quiz-category">
                  {categoryNames[currentQuestion.category] ??
                    currentQuestion.category}
                </span>

                <span className="quiz-question-type">
                  Single Choice
                </span>
              </div>

              <p className="quiz-question-number">
                Question {String(currentIndex + 1).padStart(2, "0")}
              </p>

              <h2 className="quiz-question-heading">
                {currentQuestion.question}
              </h2>

              {/* OPTIONS */}
              <div className="quiz-options">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;

                  return (
                    <button
                      key={`${currentQuestion.id}-${index}`}
                      type="button"
                      className={`quiz-option ${
                        isSelected ? "quiz-option-selected" : ""
                      }`}
                      disabled={submitting}
                      aria-pressed={isSelected}
                      onClick={() => setSelectedAnswer(index)}
                    >
                      <span className="quiz-option-letter">
                        {String.fromCharCode(65 + index)}
                      </span>

                      <span className="quiz-option-text">
                        {option}
                      </span>

                      <span className="quiz-option-indicator" />
                    </button>
                  );
                })}
              </div>

              {error && (
                <div className="quiz-error" role="alert">
                  {error}
                </div>
              )}

              {/* ACTIONS */}
              <div className="quiz-question-actions">
                <p className="quiz-action-description">
                  Your answer is saved before moving to the next question.
                </p>

                <button
                  type="button"
                  className="quiz-submit-button"
                  onClick={submitAnswer}
                  disabled={selectedAnswer === null || submitting}
                >
                  {submitting
                    ? "Saving..."
                    : currentIndex === totalQuestions - 1
                      ? "Finish Challenge →"
                      : "Save & Continue →"}
                </button>
              </div>
            </div>

            <p className="quiz-security-note">
              Stay focused. Your quiz time is controlled by the server.
            </p>
          </section>
        )}

        {/* FINISHING SCREEN */}
        {phase === "finishing" && (
          <section className="quiz-finishing">
            <div className="quiz-finishing-icon">↗</div>

            <h1>Calculating your results</h1>

            <p>
              Your answers are being evaluated and securely saved.
            </p>
          </section>
        )}

        {/* RESULT SCREEN */}
        {phase === "result" && result && (
          <section className="quiz-result">
            <div className="quiz-result-icon">
              {result.rewardUnlocked ? "🏆" : "✦"}
            </div>

            <p className="quiz-result-eyebrow">
              Challenge Completed
            </p>

            <h1 className="quiz-result-heading">
              {result.rewardUnlocked
                ? "Outstanding work."
                : "Challenge complete."}
            </h1>

            <p className="quiz-result-description">
              {session?.participantName}, your performance has been recorded.
            </p>

            {/* SCORE */}
            <div className="quiz-score-card">
              <p className="quiz-score-label">
                Your Final Score
              </p>

              <p className="quiz-score-value">
                {result.score}
                <span>/{result.totalQuestions}</span>
              </p>

              <div className="quiz-result-stats">
                <div>
                  <p className="quiz-result-stat-value">
                    {result.correctAnswers}
                  </p>

                  <p className="quiz-result-stat-label">
                    Correct Answers
                  </p>
                </div>

                <div>
                  <p className="quiz-result-stat-value">
                    {formatTime(result.durationSeconds)}
                  </p>

                  <p className="quiz-result-stat-label">
                    Time Used
                  </p>
                </div>
              </div>
            </div>

            {/* REWARD */}
            {result.rewardUnlocked ? (
              <div className="quiz-reward">
                <p className="quiz-reward-label">
                  Surprise Reward Unlocked
                </p>

                <h2>IDEANOVA Business Star</h2>

                <p>
                  You scored 15 or more points and earned the Business Star
                  achievement. Your performance deserves recognition!
                </p>
              </div>
            ) : (
              <p className="quiz-result-note">
                Keep sharpening your business thinking. Every challenge is
                another opportunity to improve and achieve a higher score.
              </p>
            )}

            {result.status === "EXPIRED" && (
              <div className="quiz-error">
                Your time expired. Your saved answers have been included in
                this result.
              </div>
            )}

            <button
              type="button"
              className="quiz-restart-button"
              onClick={resetQuiz}
            >
              Back to Registration
            </button>
          </section>
        )}
      </div>

      {/* FOOTER */}
      <footer className="quiz-footer">
        <p>IDEANOVA · Where Ideas Become Impact</p>
      </footer>
    </main>
  );
}
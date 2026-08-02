import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
} from "lucide-react";

export default function QuizCard({ questions = [] }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);

  if (questions.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow">
        <h2 className="text-3xl font-bold">Chapter Quiz</h2>

        <p className="mt-5 text-slate-600">
          No quiz has been added for this lesson yet.
        </p>
      </div>
    );
  }

  const question = questions[currentQuestion];

  function submitAnswer() {
    if (selectedAnswer === null) return;

    const updated = [...answers];
    updated[currentQuestion] = selectedAnswer;

    setAnswers(updated);
    setSubmitted(true);
  }

  function nextQuestion() {
    setSubmitted(false);
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setSubmitted(false);
    setAnswers([]);
  }

  const score = answers.reduce((total, answer, index) => {
    return total + (answer === questions[index].answer ? 1 : 0);
  }, 0);

  const finished =
    answers.length === questions.length &&
    currentQuestion === questions.length - 1 &&
    submitted;

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow">

        <Trophy
          size={70}
          className="mx-auto text-yellow-500"
        />

        <h2 className="mt-6 text-4xl font-bold">
          Quiz Completed
        </h2>

        <p className="mt-4 text-xl">
          Score
        </p>

        <div className="mt-2 text-6xl font-bold text-blue-600">
          {score}/{questions.length}
        </div>

        <div className="mt-6">

          {percentage >= 80 ? (
            <span className="rounded-full bg-green-100 px-5 py-3 font-semibold text-green-700">
              Passed
            </span>
          ) : (
            <span className="rounded-full bg-red-100 px-5 py-3 font-semibold text-red-700">
              Try Again
            </span>
          )}

        </div>

        <button
          onClick={restartQuiz}
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700"
        >
          <RotateCcw size={18} />
          Restart Quiz
        </button>

      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow">

      <div className="flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          Chapter Quiz
        </h2>

        <span className="rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">
          Question {currentQuestion + 1} / {questions.length}
        </span>

      </div>

      <h3 className="mt-8 text-2xl font-semibold">
        {question.question}
      </h3>

      <div className="mt-8 space-y-4">

        {question.options.map((option, index) => (

          <button
            key={index}
            disabled={submitted}
            onClick={() => setSelectedAnswer(index)}
            className={`w-full rounded-2xl border p-5 text-left transition

            ${
              selectedAnswer === index
                ? "border-blue-600 bg-blue-50"
                : "hover:bg-slate-50"
            }`}
          >
            {option}
          </button>

        ))}

      </div>

      {!submitted ? (

        <button
          onClick={submitAnswer}
          className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Submit Answer
        </button>

      ) : (

        <div className="mt-8">

          {selectedAnswer === question.answer ? (

            <div className="flex items-center gap-3 rounded-2xl bg-green-100 p-5 text-green-700">

              <CheckCircle2 />

              Correct Answer

            </div>

          ) : (

            <div className="flex items-center gap-3 rounded-2xl bg-red-100 p-5 text-red-700">

              <XCircle />

              Incorrect Answer

            </div>

          )}

          <button
            onClick={nextQuestion}
            className="mt-6 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {currentQuestion === questions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>

        </div>

      )}

    </div>
  );
}
import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, RotateCcw, XCircle } from "lucide-react";

const questions = [
  {
    question: "Which statement best defines a robot?",
    options: [
      "Any machine powered by electricity",
      "A programmable machine that interacts with its environment to perform tasks",
      "Only a machine shaped like a human",
      "A computer that has no physical components",
    ],
    answer: 1,
  },
  {
    question: "What is the correct basic operating cycle of a robot?",
    options: ["Act–sleep–repeat", "Think–act–sense", "Sense–think–act", "Power–stop–charge"],
    answer: 2,
  },
  {
    question: "Which robot component obtains information about the environment?",
    options: ["Sensor", "Actuator", "Frame", "Battery"],
    answer: 0,
  },
  {
    question: "What is the primary role of a robot controller?",
    options: [
      "Decorate the robot",
      "Process inputs and execute programmed decisions",
      "Store mechanical energy",
      "Replace every sensor",
    ],
    answer: 1,
  },
  {
    question: "Which of the following is an actuator?",
    options: ["Ultrasonic sensor", "Camera", "Servo motor", "Temperature sensor"],
    answer: 2,
  },
  {
    question: "Which is an example of an industrial robot?",
    options: [
      "A welding arm on a production line",
      "A desktop calculator",
      "A passive trolley",
      "A printed circuit board",
    ],
    answer: 0,
  },
  {
    question: "A robot controlled continuously by a distant human operator is:",
    options: ["Biological", "Teleoperated", "Unpowered", "Purely mechanical"],
    answer: 1,
  },
  {
    question: "Which controller is commonly used in beginner robotics projects?",
    options: ["Arduino", "Mechanical switch only", "Loudspeaker", "Gearbox"],
    answer: 0,
  },
  {
    question: "Why are robots useful in hazardous environments?",
    options: [
      "They eliminate every possible risk",
      "They can reduce direct human exposure to dangerous work",
      "They never require maintenance",
      "They function without power",
    ],
    answer: 1,
  },
  {
    question: "Which issue belongs to responsible robotics?",
    options: [
      "Ignoring safety limits",
      "Removing all human oversight",
      "Considering safety, privacy and cybersecurity",
      "Using sensors without testing",
    ],
    answer: 2,
  },
];

export default function QuizPanel() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () =>
      questions.reduce(
        (total, item, index) => total + (answers[index] === item.answer ? 1 : 0),
        0
      ),
    [answers]
  );

  const percentage = score * 10;
  const passed = percentage >= 80;
  const complete = Object.keys(answers).length === questions.length;

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <CircleHelp className="text-blue-600" size={30} aria-hidden="true" />
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Chapter 1 Quiz</h2>
            <p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p>
          </div>
        </div>
        <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          Practice assessment
        </span>
      </div>

      <div className="mt-6 space-y-6">
        {questions.map((item, questionIndex) => (
          <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5">
            <legend className="px-2 font-bold text-slate-900">
              {questionIndex + 1}. {item.question}
            </legend>
            <div className="mt-3 space-y-2">
              {item.options.map((option, optionIndex) => {
                const selected = answers[questionIndex] === optionIndex;
                const correct = submitted && optionIndex === item.answer;
                const incorrect = submitted && selected && optionIndex !== item.answer;

                return (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
                      correct
                        ? "border-green-300 bg-green-50"
                        : incorrect
                          ? "border-red-300 bg-red-50"
                          : selected
                            ? "border-blue-400 bg-blue-50"
                            : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      checked={selected}
                      disabled={submitted}
                      onChange={() =>
                        setAnswers((current) => ({
                          ...current,
                          [questionIndex]: optionIndex,
                        }))
                      }
                      className="mt-1"
                    />
                    <span className="text-slate-700">{option}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {!submitted ? (
        <div className="mt-6">
          <button
            type="button"
            disabled={!complete}
            onClick={() => setSubmitted(true)}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Submit Quiz
          </button>
          {!complete && (
            <p className="mt-2 text-sm text-slate-500">
              Answer all ten questions before submitting.
            </p>
          )}
        </div>
      ) : (
        <div
          className={`mt-6 rounded-2xl border p-6 ${
            passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"
          }`}
        >
          <div className="flex items-start gap-3">
            {passed ? (
              <CheckCircle2 className="text-green-700" size={30} aria-hidden="true" />
            ) : (
              <XCircle className="text-red-700" size={30} aria-hidden="true" />
            )}
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {passed ? "Chapter quiz passed" : "Review and try again"}
              </h3>
              <p className="mt-1 text-slate-700">
                You scored {score}/10 ({percentage}%). A score of 80% is required.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetQuiz}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw size={18} aria-hidden="true" />
            Retake Quiz
          </button>
        </div>
      )}
    </section>
  );
}

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleHelp,
  Code2,
  Cpu,
  Lightbulb,
  PlayCircle,
  RotateCcw,
  ShieldAlert,
  Usb,
  XCircle,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import LessonHeader from "../components/LessonHeader";
import ChapterSidebar from "../components/ChapterSidebar";

const questions = [
  { question: "What is Arduino?", options: ["Only a motor driver", "An open-source electronics prototyping platform", "A battery type", "A mechanical gearbox"], answer: 1 },
  { question: "Which microcontroller is used on the classic Arduino Uno R3?", options: ["ATmega328P", "ESP8266", "RP2040", "8051 only"], answer: 0 },
  { question: "Which function runs once when an Arduino starts?", options: ["loop()", "start()", "setup()", "mainLoop()"], answer: 2 },
  { question: "Which function repeats while the board is powered?", options: ["setup()", "loop()", "pinMode()", "upload()"], answer: 1 },
  { question: "What does pinMode(LED_BUILTIN, OUTPUT) do?", options: ["Turns the LED on", "Configures the LED pin as an output", "Reads an analogue sensor", "Stops the program"], answer: 1 },
  { question: "Which value normally sets a digital output HIGH?", options: ["digitalWrite(pin, HIGH)", "analogRead(pin)", "pinMode(pin, INPUT)", "delay(0) only"], answer: 0 },
  { question: "Why should an external LED normally use a resistor?", options: ["To increase voltage", "To limit current", "To store code", "To reverse polarity"], answer: 1 },
  { question: "Which Arduino Uno pins can read analogue voltage?", options: ["A0–A5", "Only GND", "VIN only", "RESET only"], answer: 0 },
  { question: "What must be selected correctly before uploading from the IDE?", options: ["Board and port", "Screen brightness", "Website theme", "Battery colour"], answer: 0 },
  { question: "What is the safest practice before changing circuit wiring?", options: ["Increase voltage", "Disconnect power", "Touch exposed conductors", "Short 5V to GND"], answer: 1 },
];

const blinkCode = `// Chapter 2: First Arduino program
const int ledPin = LED_BUILTIN;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);
  delay(1000);

  digitalWrite(ledPin, LOW);
  delay(1000);
}`;

function ChapterQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(
    () => questions.reduce((sum, item, index) => sum + (answers[index] === item.answer ? 1 : 0), 0),
    [answers]
  );
  const complete = Object.keys(answers).length === questions.length;
  const passed = score >= 8;

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
        <CircleHelp className="text-blue-600" size={30} aria-hidden="true" />
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Chapter 2 Quiz</h2>
          <p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p>
        </div>
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
                    className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${
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
                      name={`chapter-2-question-${questionIndex}`}
                      checked={selected}
                      disabled={submitted}
                      onChange={() =>
                        setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))
                      }
                      className="mt-1"
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {!submitted ? (
        <button
          type="button"
          disabled={!complete}
          onClick={() => setSubmitted(true)}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Submit Quiz
        </button>
      ) : (
        <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}>
          <div className="flex gap-3">
            {passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}
            <div>
              <h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review and try again"}</h3>
              <p className="mt-1">You scored {score}/10 ({score * 10}%).</p>
            </div>
          </div>
          <button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold">
            <RotateCcw size={18} /> Retake Quiz
          </button>
        </div>
      )}
    </section>
  );
}

export default function ArduinoBasicsChapterPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <LessonHeader chapter={2} lesson={1} chapterTitle="Arduino Basics" />

      <div className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-3">
            <ChapterSidebar currentChapter={2} />
          </aside>

          <main className="col-span-12 space-y-6 lg:col-span-9">
            <section className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <PlayCircle className="text-blue-600" size={28} />
                <div>
                  <h2 className="text-2xl font-bold">Arduino Basics</h2>
                  <p className="text-slate-500">Chapter 2 • Reading, coding and assessment</p>
                </div>
              </div>
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950 to-blue-950 p-8 text-center text-white">
                <div>
                  <PlayCircle className="mx-auto text-cyan-300" size={64} />
                  <h3 className="mt-5 text-2xl font-bold">Video lesson coming soon</h3>
                  <p className="mt-3 text-cyan-100">Use the guided notes and Blink program below to complete this chapter.</p>
                </div>
              </div>
            </section>

            <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
              <header>
                <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 2</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Arduino Basics</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Arduino is an open-source electronics platform that combines an easy-to-use
                  microcontroller board with software for writing and uploading programs.
                </p>
              </header>

              <section>
                <h3 className="text-2xl font-bold">Learning objectives</h3>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {[
                    "Identify the important parts of an Arduino Uno.",
                    "Install and navigate the Arduino IDE.",
                    "Explain setup() and loop().",
                    "Configure and control a digital output.",
                    "Upload and test the Blink program.",
                    "Apply basic electrical and USB safety.",
                  ].map((item) => (
                    <li key={item} className="rounded-xl border p-4">
                      <span className="mr-2 font-bold text-green-600">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl bg-cyan-50 p-6">
                <div className="flex items-center gap-3">
                  <Cpu className="text-cyan-700" size={28} />
                  <h3 className="text-2xl font-bold">Arduino Uno at a glance</h3>
                </div>
                <p className="mt-4 leading-7 text-slate-700">
                  The classic Arduino Uno R3 uses the ATmega328P microcontroller. It provides
                  digital pins, analogue inputs, USB communication, power connections and a
                  reset circuit on one beginner-friendly board.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Main board sections</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {[
                    [Usb, "USB connector", "Uploads programs and can power the board during development."],
                    [Cpu, "ATmega328P", "Executes the compiled Arduino program."],
                    [Zap, "Power pins", "5V, 3.3V, GND and VIN support connected circuits."],
                    [Lightbulb, "Digital and analogue pins", "Connect LEDs, switches, sensors and modules."],
                  ].map(([Icon, title, text]) => (
                    <div key={title} className="rounded-2xl border p-5">
                      <Icon className="text-blue-700" size={26} />
                      <h4 className="mt-3 text-lg font-bold">{title}</h4>
                      <p className="mt-2 text-slate-600">{text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Arduino sketch structure</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead><tr className="bg-slate-900 text-white"><th className="p-3">Function</th><th className="p-3">Purpose</th></tr></thead>
                    <tbody className="divide-y">
                      <tr><td className="p-3 font-semibold">setup()</td><td className="p-3">Runs once after power-up or reset; initialise pins and communication here.</td></tr>
                      <tr><td className="p-3 font-semibold">loop()</td><td className="p-3">Runs repeatedly while the board is powered; place ongoing behaviour here.</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Code2 className="text-green-700" size={28} />
                  <h3 className="text-2xl font-bold">First program: Blink</h3>
                </div>
                <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-green-300"><code>{blinkCode}</code></pre>
                <p className="mt-4 leading-7 text-slate-600">
                  The program configures the built-in LED as an output, turns it on for one
                  second, turns it off for one second, and repeats.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Upload procedure</h3>
                <ol className="mt-4 space-y-3">
                  {[
                    "Connect the Arduino Uno to the computer using a data-capable USB cable.",
                    "Open Arduino IDE and create or open the Blink sketch.",
                    "Select Tools → Board → Arduino Uno.",
                    "Select the correct serial port under Tools → Port.",
                    "Click Verify, correct any compilation errors, then click Upload.",
                    "Observe the built-in LED blinking once per second.",
                  ].map((item, index) => (
                    <li key={item} className="flex gap-3 rounded-xl bg-slate-50 p-4">
                      <span className="font-bold text-blue-700">{index + 1}.</span>{item}
                    </li>
                  ))}
                </ol>
              </section>

              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="text-amber-700" size={28} />
                  <h3 className="text-xl font-bold">Electrical safety</h3>
                </div>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• Disconnect power before changing wiring.</li>
                  <li>• Never connect 5V directly to GND.</li>
                  <li>• Use a current-limiting resistor with an external LED.</li>
                  <li>• Do not power motors directly from an Arduino I/O pin.</li>
                  <li>• Check voltage and polarity before connecting modules.</li>
                </ul>
              </section>

              <section className="rounded-2xl bg-slate-900 p-6 text-white">
                <h3 className="text-2xl font-bold">Chapter activity</h3>
                <p className="mt-3 text-slate-200">
                  Upload Blink, change both delay values from 1000 ms to 250 ms, predict the
                  result, and verify your prediction on the board. Then restore the original
                  program and explain why setup() runs only once while loop() repeats.
                </p>
              </section>
            </article>

            <ChapterQuiz />

            <nav className="flex justify-between gap-4">
              <Link to="/courses/robotics-foundation/learn" className="rounded-xl border bg-white px-5 py-3 font-semibold hover:bg-slate-50">
                ← Chapter 1
              </Link>
              <span className="rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-500">
                Chapter 3 coming next
              </span>
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import { Braces, CheckCircle2, CircleHelp, Code2, Cpu, RotateCcw, ShieldAlert, Terminal, XCircle } from "lucide-react";

const exampleCode = `const int sensorPin = A0;
const int ledPin = LED_BUILTIN;

int readAverage(int pin, int samples) {
  long total = 0;

  for (int index = 0; index < samples; index++) {
    total += analogRead(pin);
    delay(5);
  }

  return total / samples;
}

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int sensorValue = readAverage(sensorPin, 10);
  bool thresholdReached = sensorValue >= 600;

  digitalWrite(ledPin, thresholdReached ? HIGH : LOW);

  Serial.print("Sensor value: ");
  Serial.println(sensorValue);
  delay(250);
}`;

const questions = [
  { question: "Which data type normally stores a whole number on Arduino?", options: ["int", "float only", "String only", "void"], answer: 0 },
  { question: "What does const mean when declaring a variable?", options: ["Its value should not change", "It is always negative", "It is deleted immediately", "It stores only text"], answer: 0 },
  { question: "Which operator tests whether two values are equal?", options: ["=", "==", ">=", "+="], answer: 1 },
  { question: "Which statement selects between alternative code paths?", options: ["if", "include", "return type only", "comment"], answer: 0 },
  { question: "Which loop is useful when the number of repetitions is known?", options: ["for", "if", "switch pin", "define"], answer: 0 },
  { question: "What does a function parameter provide?", options: ["Input data for the function", "Board power", "A USB driver", "Permanent flash erasure"], answer: 0 },
  { question: "What is the first valid index of a C/C++ array?", options: ["0", "1", "-1", "10"], answer: 0 },
  { question: "What is variable scope?", options: ["Where a variable can be accessed", "The supply voltage", "The upload speed", "The board colour"], answer: 0 },
  { question: "Why is long used for the running total in the example?", options: ["To reduce overflow risk", "To create a comment", "To disable Serial", "To select the board"], answer: 0 },
  { question: "Which command prints a value followed by a new line?", options: ["Serial.println()", "pinMode()", "analogRead()", "delayMicroseconds() only"], answer: 0 },
];

export default function ArduinoChapterThreeLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 3</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Embedded C Programming Fundamentals</h2>
          <p className="mt-4 leading-8 text-slate-600">Arduino sketches are written in C++ with an easy-to-use framework around the hardware. The core ideas—data types, expressions, decisions, repetition, functions, arrays, and scope—form the foundation of every reliable embedded program.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold">Learning objectives</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">{["Declare variables and constants using suitable data types.", "Use arithmetic, comparison, and logical operators.", "Control decisions with if, else, and switch.", "Repeat operations using for and while loops.", "Create reusable functions with parameters and return values.", "Use arrays, understand scope, and debug through Serial Monitor."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><span className="mr-2 font-bold text-emerald-600">✓</span>{item}</li>)}</ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><Braces className="text-blue-700" size={28} /><h3 className="text-2xl font-bold">Sketch structure and syntax</h3></div>
          <p className="mt-4 leading-8 text-slate-700">Statements normally end with a semicolon. Braces group related statements into a block. Names are case-sensitive, so <code>sensorValue</code> and <code>SensorValue</code> are different identifiers. Comments document intent without becoming executable instructions.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2"><InfoCard title="setup()" text="Runs once to configure pins, communication, and initial state." /><InfoCard title="loop()" text="Repeats while the board is powered and contains ongoing behaviour." /></div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Variables, constants, and data types</h3>
          <div className="mt-5 overflow-x-auto"><table className="w-full border-collapse text-left"><thead><tr className="bg-slate-900 text-white"><th className="p-3">Type</th><th className="p-3">Typical use</th><th className="p-3">Example</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">bool</td><td className="p-3">True/false state</td><td className="p-3"><code>bool active = true;</code></td></tr><tr><td className="p-3 font-semibold">byte</td><td className="p-3">Small unsigned value</td><td className="p-3"><code>byte level = 200;</code></td></tr><tr><td className="p-3 font-semibold">int</td><td className="p-3">Whole-number calculations</td><td className="p-3"><code>int count = 0;</code></td></tr><tr><td className="p-3 font-semibold">long</td><td className="p-3">Larger whole numbers</td><td className="p-3"><code>long total = 0;</code></td></tr><tr><td className="p-3 font-semibold">float</td><td className="p-3">Decimal values</td><td className="p-3"><code>float voltage = 4.75;</code></td></tr><tr><td className="p-3 font-semibold">char</td><td className="p-3">One character</td><td className="p-3"><code>char command = 'A';</code></td></tr></tbody></table></div>
          <p className="mt-4 rounded-xl bg-emerald-50 p-4 text-emerald-900"><strong>Good practice:</strong> use <code>const</code> for pin numbers and values that must not change. Choose the smallest suitable data type while leaving enough range for calculations.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Operators and expressions</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3"><InfoCard title="Arithmetic" text="+  −  *  /  % perform numerical calculations." /><InfoCard title="Comparison" text="==  !=  <  >  <=  >= produce true or false." /><InfoCard title="Logical" text="&& (AND), || (OR), and ! (NOT) combine conditions." /></div>
          <p className="mt-4 text-slate-600">Use <code>=</code> to assign a value and <code>==</code> to compare values. Confusing them is a common source of defects.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Decisions and repetition</h3>
          <div className="mt-4 space-y-3"><InfoCard title="if / else" text="Run one block when a condition is true and another when it is false." /><InfoCard title="switch" text="Select one branch from several discrete command values." /><InfoCard title="for loop" text="Repeat a block a known number of times using an initial value, condition, and update." /><InfoCard title="while loop" text="Continue repeating while a condition remains true; ensure it can eventually become false." /></div>
        </section>

        <section>
          <div className="flex items-center gap-3"><Cpu className="text-indigo-700" size={28} /><h3 className="text-2xl font-bold">Functions, arrays, and scope</h3></div>
          <p className="mt-4 leading-8 text-slate-600">Functions divide a large problem into reusable operations. Parameters carry inputs into a function and a return value carries a result back. Arrays store several values of the same type and use zero-based indexing. A global variable is visible throughout the sketch, while a local variable exists only inside its function or block.</p>
        </section>

        <section>
          <div className="flex items-center gap-3"><Code2 className="text-emerald-700" size={28} /><h3 className="text-2xl font-bold">Practical program: averaged sensor threshold</h3></div>
          <p className="mt-3 leading-7 text-slate-600">This program combines a constant, variables, a function, a loop, arithmetic, a Boolean condition, the ternary operator, and Serial debugging.</p>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{exampleCode}</code></pre>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-amber-700" size={28} /><h3 className="text-xl font-bold">Reliable embedded-code practices</h3></div><ul className="mt-4 space-y-2 text-slate-700"><li>• Initialise variables before using them.</li><li>• Check numeric range before choosing a data type.</li><li>• Avoid array indexes outside the declared bounds.</li><li>• Use descriptive names and short, focused functions.</li><li>• Add Serial messages during development, then reduce unnecessary output in the final system.</li></ul></section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white"><div className="flex items-center gap-3"><Terminal className="text-cyan-300" /><h3 className="text-2xl font-bold">Hands-on activity</h3></div><p className="mt-3 leading-7 text-slate-200">Upload the example and open Serial Monitor at 9600 baud. Connect a potentiometer or supported analogue sensor to A0, observe the averaged value, change the threshold from 600 to 400, and explain how the LED behaviour changes. Extend the program to print “LOW” or “HIGH” beside each reading.</p></section>
      </article>

      <ChapterThreeQuiz />
    </>
  );
}

function ChapterThreeQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);
  const complete = Object.keys(answers).length === questions.length;
  const passed = score >= 8;
  const reset = () => { setAnswers({}); setSubmitted(false); };

  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 3 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
      <div className="mt-6 space-y-6">{questions.map((item, questionIndex) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{questionIndex + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[questionIndex] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`arduino-chapter-3-${questionIndex}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}</div>
      {!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p className="mt-1">You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
    </section>
  );
}

function InfoCard({ title, text }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>;
}

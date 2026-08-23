import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, Code2, Lightbulb, Power, RotateCcw, ShieldAlert, ToggleLeft, XCircle } from "lucide-react";

const buttonCode = `const int buttonPin = 2;
const int ledPin = 8;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int buttonState = digitalRead(buttonPin);
  bool pressed = buttonState == LOW;

  digitalWrite(ledPin, pressed ? HIGH : LOW);

  Serial.println(pressed ? "Button pressed" : "Button released");
  delay(20);
}`;

const toggleCode = `const int buttonPin = 2;
const int ledPin = 8;

bool ledState = false;
int previousButtonState = HIGH;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int currentButtonState = digitalRead(buttonPin);

  if (previousButtonState == HIGH && currentButtonState == LOW) {
    ledState = !ledState;
    digitalWrite(ledPin, ledState ? HIGH : LOW);
    delay(30);
  }

  previousButtonState = currentButtonState;
}`;

const questions = [
  { question: "Which function configures an Arduino pin's operating mode?", options: ["pinMode()", "digitalRead()", "delay()", "Serial.print()"], answer: 0 },
  { question: "Which function reads a digital input?", options: ["digitalRead()", "digitalWrite()", "analogWrite()", "setup()"], answer: 0 },
  { question: "Which values can a normal digital input return?", options: ["HIGH or LOW", "Any decimal voltage", "Only text", "A file name"], answer: 0 },
  { question: "Why should an external LED use a series resistor?", options: ["To limit current", "To increase memory", "To upload code", "To select a port"], answer: 0 },
  { question: "What does INPUT_PULLUP enable?", options: ["The microcontroller's internal pull-up resistor", "A motor driver", "An external battery", "PWM output"], answer: 0 },
  { question: "With INPUT_PULLUP, what state is normally read when the button is released?", options: ["HIGH", "LOW", "Undefined always", "Analogue only"], answer: 0 },
  { question: "With INPUT_PULLUP and a button connected to GND, what state indicates a press?", options: ["LOW", "HIGH", "1023", "Floating"], answer: 0 },
  { question: "What is a floating input?", options: ["An input without a defined HIGH or LOW reference", "A waterproof pin", "A PWM output", "A serial port"], answer: 0 },
  { question: "What does digitalWrite(ledPin, HIGH) normally do in an active-high LED circuit?", options: ["Turns the LED on", "Reads the button", "Changes the board type", "Erases the sketch"], answer: 0 },
  { question: "Why can one physical button press appear as several rapid transitions?", options: ["Mechanical contact bounce", "Flash memory", "The USB connector", "The board name"], answer: 0 },
];

export default function ArduinoChapterFourLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header><p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 4</p><h2 className="mt-2 text-3xl font-bold text-slate-900">Digital Input, Output and Push-Button Control</h2><p className="mt-4 leading-8 text-slate-600">Digital pins connect an Arduino to the two-state world of switches, buttons, LEDs, relays, and logic signals. A digital signal is interpreted as HIGH or LOW, allowing the program to sense events and control devices.</p></header>

        <section><h3 className="text-2xl font-bold">Learning objectives</h3><ul className="mt-4 grid gap-3 md:grid-cols-2">{["Configure a pin as INPUT, INPUT_PULLUP, or OUTPUT.", "Read HIGH and LOW states with digitalRead().", "Control an LED with digitalWrite().", "Explain active-high and active-low logic.", "Wire a push button without leaving the input floating.", "Build and test momentary and toggle button controls."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><span className="mr-2 font-bold text-emerald-600">✓</span>{item}</li>)}</ul></section>

        <section className="rounded-2xl bg-blue-50 p-6"><div className="flex items-center gap-3"><Power className="text-blue-700" size={28} /><h3 className="text-2xl font-bold">Understanding digital logic</h3></div><p className="mt-4 leading-8 text-slate-700">A digital pin compares voltage against logic thresholds. A valid low voltage is read as LOW and a valid high voltage is read as HIGH. Never assume that a disconnected input has a predictable state; electrical noise can make it change randomly.</p><div className="mt-5 grid gap-4 md:grid-cols-2"><InfoCard title="Active-high" text="The device or event is active when the signal is HIGH." /><InfoCard title="Active-low" text="The device or event is active when the signal is LOW. INPUT_PULLUP button circuits commonly use this logic." /></div></section>

        <section><h3 className="text-2xl font-bold">Core digital functions</h3><div className="mt-5 overflow-x-auto"><table className="w-full border-collapse text-left"><thead><tr className="bg-slate-900 text-white"><th className="p-3">Function</th><th className="p-3">Purpose</th><th className="p-3">Example</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">pinMode()</td><td className="p-3">Sets the electrical behaviour of a pin.</td><td className="p-3"><code>pinMode(8, OUTPUT);</code></td></tr><tr><td className="p-3 font-semibold">digitalRead()</td><td className="p-3">Reads HIGH or LOW from an input.</td><td className="p-3"><code>int state = digitalRead(2);</code></td></tr><tr><td className="p-3 font-semibold">digitalWrite()</td><td className="p-3">Writes HIGH or LOW to an output.</td><td className="p-3"><code>digitalWrite(8, HIGH);</code></td></tr></tbody></table></div></section>

        <section><div className="flex items-center gap-3"><Lightbulb className="text-amber-600" size={28} /><h3 className="text-2xl font-bold">Circuit: button-controlled LED</h3></div><div className="mt-5 grid gap-4 md:grid-cols-2"><InfoCard title="LED output" text="Connect Arduino pin 8 through a 220–330 Ω resistor to the LED anode. Connect the LED cathode to GND." /><InfoCard title="Button input" text="Connect one button terminal to pin 2 and the other to GND. INPUT_PULLUP keeps the released input HIGH." /></div><p className="mt-4 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-cyan-900"><strong>Logic:</strong> released = HIGH; pressed = LOW. The program converts this active-low reading into a clear Boolean named <code>pressed</code>.</p></section>

        <section><div className="flex items-center gap-3"><Code2 className="text-emerald-700" size={28} /><h3 className="text-2xl font-bold">Program 1: momentary control</h3></div><p className="mt-3 leading-7 text-slate-600">The LED remains on only while the button is pressed.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{buttonCode}</code></pre></section>

        <section><div className="flex items-center gap-3"><ToggleLeft className="text-indigo-700" size={28} /><h3 className="text-2xl font-bold">Program 2: press-to-toggle control</h3></div><p className="mt-3 leading-7 text-slate-600">This version detects the transition from released to pressed and reverses the stored LED state once per detected press.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{toggleCode}</code></pre><p className="mt-4 text-slate-600">The short delay provides introductory contact-bounce suppression. Chapter 7 develops robust timing and debouncing without blocking the program.</p></section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-amber-700" size={28} /><h3 className="text-xl font-bold">Safety and troubleshooting</h3></div><ul className="mt-4 space-y-2 text-slate-700"><li>• Disconnect USB or external power before changing wiring.</li><li>• Confirm LED polarity and always use a current-limiting resistor.</li><li>• Do not apply voltage above the board's logic limit to an input.</li><li>• If readings change randomly, confirm the pull-up/pull-down arrangement and common GND.</li><li>• Do not drive motors, solenoids, or high-current relays directly from an I/O pin.</li></ul></section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white"><h3 className="text-2xl font-bold">Hands-on activity</h3><p className="mt-3 leading-7 text-slate-200">Build the INPUT_PULLUP button and LED circuit. Test momentary control, then upload the toggle version. Add a second LED on pin 9 that always displays the opposite state. Use Serial Monitor to print the raw button state and explain why a pressed button reads LOW.</p></section>
      </article>

      <ChapterFourQuiz />
    </>
  );
}

function ChapterFourQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);
  const complete = Object.keys(answers).length === questions.length;
  const passed = score >= 8;
  const reset = () => { setAnswers({}); setSubmitted(false); };
  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 4 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, questionIndex) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{questionIndex + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[questionIndex] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`arduino-chapter-4-${questionIndex}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p className="mt-1">You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function InfoCard({ title, text }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>;
}

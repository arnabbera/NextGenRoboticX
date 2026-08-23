import { useMemo, useState } from "react";
import { BellRing, CheckCircle2, CircleHelp, Clock3, Code2, RotateCcw, ShieldAlert, TimerReset, XCircle } from "lucide-react";

const millisCode = `const int ledPin = LED_BUILTIN;
const unsigned long interval = 500;

unsigned long previousMillis = 0;
bool ledState = false;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    ledState = !ledState;
    digitalWrite(ledPin, ledState ? HIGH : LOW);
  }

  // Other tasks can run here without waiting.
}`;

const debounceCode = `const int buttonPin = 2;
const int ledPin = 8;
const unsigned long debounceDelay = 40;

int lastRawState = HIGH;
int stableState = HIGH;
bool ledState = false;
unsigned long lastChangeTime = 0;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int rawState = digitalRead(buttonPin);

  if (rawState != lastRawState) {
    lastChangeTime = millis();
    lastRawState = rawState;
  }

  if (millis() - lastChangeTime >= debounceDelay && rawState != stableState) {
    stableState = rawState;

    if (stableState == LOW) {
      ledState = !ledState;
      digitalWrite(ledPin, ledState ? HIGH : LOW);
    }
  }
}`;

const interruptCode = `const int interruptPin = 2;
volatile bool eventPending = false;

void onExternalEvent() {
  eventPending = true;
}

void setup() {
  pinMode(interruptPin, INPUT_PULLUP);
  Serial.begin(9600);
  attachInterrupt(digitalPinToInterrupt(interruptPin), onExternalEvent, FALLING);
}

void loop() {
  if (eventPending) {
    noInterrupts();
    eventPending = false;
    interrupts();

    Serial.println("Interrupt event handled safely in loop()");
  }
}`;

const questions = [
  { question: "What is a major disadvantage of delay()?", options: ["It blocks normal sketch execution", "It increases ADC resolution", "It adds memory", "It selects a port"], answer: 0 },
  { question: "What does millis() return?", options: ["Milliseconds since the board program started", "Current motor current", "ADC voltage", "The pin number"], answer: 0 },
  { question: "Why use currentMillis - previousMillis instead of comparing absolute future times?", options: ["It remains reliable across counter rollover", "It changes board voltage", "It enables USB", "It removes all variables"], answer: 0 },
  { question: "What is an interrupt service routine (ISR)?", options: ["A short function executed in response to an interrupt", "A PDF file", "A voltage divider", "A PWM pin"], answer: 0 },
  { question: "Which Uno pins support the usual external interrupts?", options: ["Digital pins 2 and 3", "Only A5", "VIN and GND", "Pins 8–13 only"], answer: 0 },
  { question: "Why is shared ISR data often declared volatile?", options: ["It tells the compiler the value can change unexpectedly", "It stores data forever", "It enables pull-up resistance", "It increases clock speed"], answer: 0 },
  { question: "Which operation should normally be avoided inside an ISR?", options: ["Lengthy Serial printing and delay", "Setting a Boolean flag", "Reading a simple pin", "Incrementing a small counter"], answer: 0 },
  { question: "What causes switch bounce?", options: ["Mechanical contacts rapidly making and breaking during transition", "Flash-memory size", "USB baud rate", "PWM duty cycle"], answer: 0 },
  { question: "What does debouncing achieve?", options: ["One stable logical event for one intended action", "Higher supply voltage", "More analogue pins", "A faster clock"], answer: 0 },
  { question: "What does FALLING mean in attachInterrupt()?", options: ["Trigger when the signal changes from HIGH to LOW", "Trigger continuously", "Trigger only at power-off", "Trigger on analogue value 1023"], answer: 0 },
];

export default function ArduinoChapterSevenLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header><p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 7</p><h2 className="mt-2 text-3xl font-bold text-slate-900">Timers, Interrupts and Switch Debouncing</h2><p className="mt-4 leading-8 text-slate-600">Responsive embedded systems must manage time without freezing, react quickly to important events, and reject false transitions from mechanical switches. These techniques let one Arduino coordinate several activities reliably.</p></header>

        <section><h3 className="text-2xl font-bold">Learning objectives</h3><ul className="mt-4 grid gap-3 md:grid-cols-2">{["Compare blocking delay() with non-blocking millis() timing.", "Schedule repeated tasks using elapsed-time calculations.", "Explain how hardware timers support timing and PWM.", "Configure an external interrupt with attachInterrupt().", "Apply ISR rules and safely share event flags.", "Debounce a push button using a non-blocking state-based method."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><span className="mr-2 font-bold text-emerald-600">✓</span>{item}</li>)}</ul></section>

        <section className="rounded-2xl bg-blue-50 p-6"><div className="flex items-center gap-3"><Clock3 className="text-blue-700" size={28} /><h3 className="text-2xl font-bold">Blocking and non-blocking timing</h3></div><p className="mt-4 leading-8 text-slate-700"><code>delay()</code> pauses normal sketch progress. It is convenient for simple demonstrations, but the board cannot perform other ordinary tasks during the wait. A <code>millis()</code>-based design repeatedly checks elapsed time and lets the loop continue servicing sensors, communication, outputs, and user input.</p><div className="mt-5 grid gap-4 md:grid-cols-2"><InfoCard title="Blocking" text="The program waits inside one operation before continuing. Other loop tasks are delayed." /><InfoCard title="Non-blocking" text="The loop keeps running and performs an action only when its time interval has elapsed." /></div></section>

        <section><div className="flex items-center gap-3"><Code2 className="text-emerald-700" size={28} /><h3 className="text-2xl font-bold">Program 1: blink without delay</h3></div><p className="mt-3 leading-7 text-slate-600">Unsigned subtraction makes elapsed-time checking work correctly even when the <code>millis()</code> counter eventually rolls over.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{millisCode}</code></pre></section>

        <section><div className="flex items-center gap-3"><TimerReset className="text-indigo-700" size={28} /><h3 className="text-2xl font-bold">Hardware timers</h3></div><p className="mt-4 leading-8 text-slate-600">A hardware timer counts clock-derived pulses independently of ordinary program flow. Arduino core functions use timers for facilities such as <code>millis()</code>, <code>micros()</code>, and PWM. Directly reconfiguring a timer can affect those facilities, so advanced timer changes must be planned against the board's timer allocation.</p><div className="mt-5 grid gap-4 md:grid-cols-3"><InfoCard title="Prescaler" text="Divides the system clock before it reaches the timer counter." /><InfoCard title="Counter / compare" text="Tracks ticks and detects programmed values or overflow." /><InfoCard title="Timer event" text="Can update hardware output or request an interrupt at a defined time." /></div></section>

        <section><div className="flex items-center gap-3"><BellRing className="text-red-600" size={28} /><h3 className="text-2xl font-bold">External interrupts and ISR rules</h3></div><p className="mt-4 leading-8 text-slate-600">An interrupt temporarily pauses normal execution and runs an interrupt service routine. On a classic Uno, digital pins 2 and 3 provide the usual external interrupts. Trigger modes include LOW, CHANGE, RISING, and FALLING.</p><ul className="mt-4 space-y-2 rounded-2xl border border-red-100 bg-red-50 p-5 text-slate-700"><li>• Keep an ISR short and deterministic.</li><li>• Prefer setting a flag or incrementing a small counter.</li><li>• Avoid <code>delay()</code>, lengthy calculations, and Serial output inside the ISR.</li><li>• Declare shared values <code>volatile</code> and protect multi-step access where necessary.</li></ul><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{interruptCode}</code></pre></section>

        <section><h3 className="text-2xl font-bold">Why switches bounce</h3><p className="mt-4 leading-8 text-slate-600">A physical contact does not always change cleanly from open to closed. It can make and break several times over a few milliseconds, so one press may look like several events. Hardware debouncing uses components such as an RC network and Schmitt trigger; software debouncing accepts a new state only after it remains stable for a defined interval.</p></section>

        <section><div className="flex items-center gap-3"><Code2 className="text-emerald-700" size={28} /><h3 className="text-2xl font-bold">Program 2: non-blocking debounced toggle</h3></div><p className="mt-3 leading-7 text-slate-600">This program records the time of each raw transition and accepts it only after the input remains unchanged for 40 ms.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{debounceCode}</code></pre></section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-amber-700" size={28} /><h3 className="text-xl font-bold">Reliability guidance</h3></div><ul className="mt-4 space-y-2 text-slate-700"><li>• Use the narrowest interrupt trigger that matches the event.</li><li>• Filter noisy external signals before they reach an interrupt pin.</li><li>• Keep shared state simple and minimise time with interrupts disabled.</li><li>• Test timing across counter rollover using unsigned elapsed-time arithmetic.</li><li>• Choose debounce time from measured switch behaviour instead of making it unnecessarily long.</li></ul></section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white"><h3 className="text-2xl font-bold">Hands-on activity</h3><p className="mt-3 leading-7 text-slate-200">Run blink-without-delay at 500 ms while also reading a push button. Implement the non-blocking debounced toggle so the button changes a second LED without disturbing the blinking LED. Observe raw button transitions in Serial Monitor, compare them with accepted stable transitions, and experiment with debounce intervals of 10, 40, and 100 ms.</p></section>
      </article>

      <ChapterSevenQuiz />
    </>
  );
}

function ChapterSevenQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);
  const complete = Object.keys(answers).length === questions.length;
  const passed = score >= 8;
  const reset = () => { setAnswers({}); setSubmitted(false); };
  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 7 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, questionIndex) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{questionIndex + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[questionIndex] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`arduino-chapter-7-${questionIndex}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p className="mt-1">You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function InfoCard({ title, text }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>;
}

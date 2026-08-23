import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, Code2, Gauge, Lightbulb, RotateCcw, ShieldAlert, Waves, XCircle, Zap } from "lucide-react";

const fadeCode = `const int ledPin = 9;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  for (int brightness = 0; brightness <= 255; brightness++) {
    analogWrite(ledPin, brightness);
    delay(5);
  }

  for (int brightness = 255; brightness >= 0; brightness--) {
    analogWrite(ledPin, brightness);
    delay(5);
  }
}`;

const motorCode = `const int controlPin = A0;
const int motorPwmPin = 9;

void setup() {
  pinMode(motorPwmPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int controlValue = analogRead(controlPin);
  int pwmValue = map(controlValue, 0, 1023, 0, 255);

  analogWrite(motorPwmPin, pwmValue);

  int dutyPercent = map(pwmValue, 0, 255, 0, 100);
  Serial.print("PWM: ");
  Serial.print(pwmValue);
  Serial.print(" | Duty cycle: ");
  Serial.print(dutyPercent);
  Serial.println("%");

  delay(100);
}`;

const questions = [
  { question: "What does PWM stand for?", options: ["Pulse Width Modulation", "Power Wire Measurement", "Program Write Mode", "Pin Wave Memory"], answer: 0 },
  { question: "What does PWM control in each repeating cycle?", options: ["The proportion of ON time", "The program file name", "The board model", "The USB port number"], answer: 0 },
  { question: "What range does analogWrite() normally use on an Arduino Uno?", options: ["0–255", "0–1023", "0–5 only", "-1–1"], answer: 0 },
  { question: "Which Uno pins can normally produce PWM through analogWrite()?", options: ["Pins marked with ~", "Only analogue inputs", "GND and VIN", "RESET only"], answer: 0 },
  { question: "What duty cycle corresponds to an output that is always off?", options: ["0%", "50%", "75%", "100%"], answer: 0 },
  { question: "Approximately what duty cycle does analogWrite(pin, 128) produce?", options: ["About 50%", "0%", "100%", "About 5%"], answer: 0 },
  { question: "Why must a DC motor not be driven directly from an Arduino I/O pin?", options: ["It requires more current and creates electrical transients", "It cannot rotate", "It stores program code", "It changes the USB driver"], answer: 0 },
  { question: "What component commonly switches motor current under Arduino PWM control?", options: ["A suitable transistor or MOSFET", "An LED only", "A push button only", "A USB cable"], answer: 0 },
  { question: "What is the purpose of a flyback diode across a DC motor?", options: ["Suppress inductive voltage spikes", "Increase ADC resolution", "Select a serial port", "Store variables"], answer: 0 },
  { question: "What connection is normally required between Arduino and an external motor supply?", options: ["A common ground", "Two unrelated grounds only", "No control wire", "A direct mains connection"], answer: 0 },
];

export default function ArduinoChapterSixLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header><p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 6</p><h2 className="mt-2 text-3xl font-bold text-slate-900">PWM, LED Brightness and Motor Speed Control</h2><p className="mt-4 leading-8 text-slate-600">Pulse Width Modulation rapidly switches a digital output on and off. By changing the percentage of time spent ON, Arduino can control average power delivered to an LED or to a properly driven DC motor.</p></header>

        <section><h3 className="text-2xl font-bold">Learning objectives</h3><ul className="mt-4 grid gap-3 md:grid-cols-2">{["Explain PWM frequency, period, pulse width, and duty cycle.", "Identify PWM-capable pins on an Arduino Uno.", "Use analogWrite() with values from 0 to 255.", "Create smooth LED brightness effects.", "Map a potentiometer reading to PWM output.", "Control a DC motor safely through a transistor or MOSFET stage."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><span className="mr-2 font-bold text-emerald-600">✓</span>{item}</li>)}</ul></section>

        <section className="rounded-2xl bg-blue-50 p-6"><div className="flex items-center gap-3"><Waves className="text-blue-700" size={28} /><h3 className="text-2xl font-bold">PWM and duty cycle</h3></div><p className="mt-4 leading-8 text-slate-700">PWM is not a continuously variable analogue voltage. The output remains digital, alternating between LOW and HIGH. A connected load responds to the average energy when switching occurs fast enough.</p><div className="mt-5 grid gap-4 md:grid-cols-4"><DutyCard value="0%" text="Always OFF" /><DutyCard value="25%" text="ON for one quarter" /><DutyCard value="50%" text="Equal ON and OFF" /><DutyCard value="100%" text="Always ON" /></div></section>

        <section><h3 className="text-2xl font-bold">Using analogWrite()</h3><p className="mt-3 leading-7 text-slate-600">On an Uno, PWM-capable digital pins are marked with a tilde (~). <code>analogWrite(pin, value)</code> accepts an 8-bit value from 0 to 255: 0 produces 0% duty cycle, 255 produces 100%, and approximately 128 produces 50%.</p><div className="mt-5 overflow-x-auto"><table className="w-full border-collapse text-left"><thead><tr className="bg-slate-900 text-white"><th className="p-3">PWM value</th><th className="p-3">Approx. duty cycle</th><th className="p-3">Typical LED result</th></tr></thead><tbody className="divide-y"><tr><td className="p-3">0</td><td className="p-3">0%</td><td className="p-3">Off</td></tr><tr><td className="p-3">64</td><td className="p-3">25%</td><td className="p-3">Dim</td></tr><tr><td className="p-3">128</td><td className="p-3">50%</td><td className="p-3">Medium</td></tr><tr><td className="p-3">255</td><td className="p-3">100%</td><td className="p-3">Full brightness</td></tr></tbody></table></div></section>

        <section><div className="flex items-center gap-3"><Lightbulb className="text-amber-600" size={28} /><h3 className="text-2xl font-bold">Program 1: smooth LED fade</h3></div><p className="mt-3 leading-7 text-slate-600">Connect an LED and 220–330 Ω resistor to PWM pin 9, or use a supported onboard PWM LED where available. Two loops gradually increase and decrease duty cycle.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{fadeCode}</code></pre></section>

        <section><div className="flex items-center gap-3"><Zap className="text-indigo-700" size={28} /><h3 className="text-2xl font-bold">Safe DC motor interface</h3></div><p className="mt-4 leading-8 text-slate-600">A motor draws far more current than an Arduino pin can supply and produces an inductive voltage spike when switched. Use a suitable logic-level MOSFET or transistor, gate/base resistor where required, flyback diode, external motor supply, and a common ground. For direction control, use an H-bridge motor driver.</p><div className="mt-5 grid gap-4 md:grid-cols-2"><InfoCard title="Power path" text="The external supply provides motor current through the switching device; the Arduino pin provides only the control signal." /><InfoCard title="Protection" text="The flyback diode gives inductive current a safe path when switching turns off, helping protect electronics." /></div></section>

        <section><div className="flex items-center gap-3"><Code2 className="text-emerald-700" size={28} /><h3 className="text-2xl font-bold">Program 2: potentiometer speed control</h3></div><p className="mt-3 leading-7 text-slate-600">The potentiometer produces a 0–1023 ADC reading. The program maps it into the 0–255 PWM range and reports the approximate duty cycle.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{motorCode}</code></pre></section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-amber-700" size={28} /><h3 className="text-xl font-bold">Motor safety and troubleshooting</h3></div><ul className="mt-4 space-y-2 text-slate-700"><li>• Never connect a motor directly between an Arduino pin and GND.</li><li>• Select the switching device, diode, driver, wiring, and supply for motor voltage and stall current.</li><li>• Connect grounds correctly without routing motor current through fragile signal paths.</li><li>• Add decoupling and keep motor wiring away from sensitive analogue signals.</li><li>• Disconnect power before changing the circuit; rotating parts can cause injury.</li></ul></section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white"><div className="flex items-center gap-3"><Gauge className="text-cyan-300" /><h3 className="text-2xl font-bold">Hands-on activity</h3></div><p className="mt-3 leading-7 text-slate-200">First test the LED fade circuit. Then connect a potentiometer to A0 and map its reading to LED brightness. If you have a correctly rated motor driver circuit, use the same PWM value for motor speed, record the minimum duty cycle at which the motor starts reliably, and explain why a stopped motor may need a higher starting duty cycle.</p></section>
      </article>

      <ChapterSixQuiz />
    </>
  );
}

function ChapterSixQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);
  const complete = Object.keys(answers).length === questions.length;
  const passed = score >= 8;
  const reset = () => { setAnswers({}); setSubmitted(false); };
  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 6 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, questionIndex) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{questionIndex + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[questionIndex] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`arduino-chapter-6-${questionIndex}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p className="mt-1">You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function DutyCard({ value, text }) {
  return <div className="rounded-2xl border border-blue-200 bg-white p-5 text-center"><div className="text-2xl font-bold text-blue-700">{value}</div><p className="mt-2 text-sm text-slate-600">{text}</p></div>;
}

function InfoCard({ title, text }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>;
}

import { useMemo, useState } from "react";
import { Activity, CheckCircle2, CircleHelp, Code2, Gauge, RotateCcw, ShieldAlert, SlidersHorizontal, XCircle } from "lucide-react";

const sensorCode = `const int sensorPin = A0;
const float referenceVoltage = 5.0;
const int sampleCount = 10;

int readSmoothedSensor() {
  long total = 0;

  for (int sample = 0; sample < sampleCount; sample++) {
    total += analogRead(sensorPin);
    delay(5);
  }

  return total / sampleCount;
}

void setup() {
  Serial.begin(9600);
}

void loop() {
  int adcValue = readSmoothedSensor();
  float voltage = adcValue * (referenceVoltage / 1023.0);
  int percentage = map(adcValue, 0, 1023, 0, 100);

  Serial.print("ADC: ");
  Serial.print(adcValue);
  Serial.print(" | Voltage: ");
  Serial.print(voltage, 2);
  Serial.print(" V | Level: ");
  Serial.print(percentage);
  Serial.println("%");

  delay(250);
}`;

const questions = [
  { question: "What does ADC stand for?", options: ["Analogue-to-Digital Converter", "Automatic Device Control", "Arduino Data Cable", "Alternating Digital Current"], answer: 0 },
  { question: "What range does analogRead() normally return on an Arduino Uno?", options: ["0–1023", "0–255", "0–100", "-1–1"], answer: 0 },
  { question: "How many distinct levels does a 10-bit ADC provide?", options: ["1024", "10", "256", "1000 exactly"], answer: 0 },
  { question: "Which pins are the Uno's analogue input channels?", options: ["A0–A5", "Only 0 and 1", "VIN and RESET", "GND only"], answer: 0 },
  { question: "With a 5 V reference, approximately what voltage does ADC value 512 represent?", options: ["About 2.5 V", "5 V", "0 V", "12 V"], answer: 0 },
  { question: "Why is 1023.0 used in the voltage calculation?", options: ["It is the maximum 10-bit reading and forces floating-point calculation", "It selects a port", "It delays the program", "It enables PWM"], answer: 0 },
  { question: "What does a voltage divider do?", options: ["Produces a fraction of the supply voltage", "Stores program code", "Creates USB communication", "Increases ADC resolution"], answer: 0 },
  { question: "Why average several sensor samples?", options: ["To reduce random noise", "To increase supply voltage", "To erase EEPROM", "To change the board type"], answer: 0 },
  { question: "What does map(value, 0, 1023, 0, 100) produce?", options: ["A proportional 0–100 value", "A voltage reference", "A Boolean only", "A serial port number"], answer: 0 },
  { question: "What must never exceed the analogue pin's safe input range?", options: ["The applied sensor voltage", "The variable name length", "The Serial Monitor width", "The comment count"], answer: 0 },
];

export default function ArduinoChapterFiveLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header><p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 5</p><h2 className="mt-2 text-3xl font-bold text-slate-900">Analogue Input, ADC and Sensor Reading</h2><p className="mt-4 leading-8 text-slate-600">Many real-world quantities—light, temperature, position, pressure, and sound—change continuously. The Arduino analogue-to-digital converter transforms a supported input voltage into a number that your sketch can measure, process, display, and use for decisions.</p></header>

        <section><h3 className="text-2xl font-bold">Learning objectives</h3><ul className="mt-4 grid gap-3 md:grid-cols-2">{["Explain analogue signals and ADC conversion.", "Interpret the Uno's 10-bit range from 0 to 1023.", "Convert an ADC reading into an estimated voltage.", "Wire a potentiometer or resistive sensor as a voltage divider.", "Scale and calibrate readings for an application.", "Reduce noise through repeated sampling and averaging."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><span className="mr-2 font-bold text-emerald-600">✓</span>{item}</li>)}</ul></section>

        <section className="rounded-2xl bg-blue-50 p-6"><div className="flex items-center gap-3"><Gauge className="text-blue-700" size={28} /><h3 className="text-2xl font-bold">From voltage to a digital number</h3></div><p className="mt-4 leading-8 text-slate-700">The Uno's ADC is 10-bit, so it represents the input using 2¹⁰ = 1024 levels. The returned integer ranges from 0 to 1023. With the default 5 V reference, 0 represents approximately 0 V and 1023 represents approximately 5 V.</p><div className="mt-5 rounded-xl bg-slate-900 p-5 text-center text-lg font-semibold text-cyan-200">Voltage ≈ ADC reading × (reference voltage ÷ 1023)</div><p className="mt-4 text-slate-700">At a 5 V reference, each step represents about 4.89 mV. Actual accuracy depends on reference stability, sensor quality, wiring, noise, and calibration.</p></section>

        <section><h3 className="text-2xl font-bold">Analogue input functions</h3><div className="mt-5 overflow-x-auto"><table className="w-full border-collapse text-left"><thead><tr className="bg-slate-900 text-white"><th className="p-3">Function</th><th className="p-3">Purpose</th><th className="p-3">Example</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">analogRead()</td><td className="p-3">Performs an ADC conversion on the selected input.</td><td className="p-3"><code>int value = analogRead(A0);</code></td></tr><tr><td className="p-3 font-semibold">analogReference()</td><td className="p-3">Selects a supported reference source where applicable.</td><td className="p-3"><code>analogReference(DEFAULT);</code></td></tr><tr><td className="p-3 font-semibold">map()</td><td className="p-3">Scales an integer from one range into another.</td><td className="p-3"><code>map(value, 0, 1023, 0, 100)</code></td></tr></tbody></table></div></section>

        <section><div className="flex items-center gap-3"><SlidersHorizontal className="text-indigo-700" size={28} /><h3 className="text-2xl font-bold">Potentiometer and voltage-divider wiring</h3></div><div className="mt-5 grid gap-4 md:grid-cols-2"><InfoCard title="Potentiometer" text="Connect one outer terminal to 5V, the other outer terminal to GND, and the centre wiper to A0. Rotating the shaft changes the wiper voltage." /><InfoCard title="Resistive sensor divider" text="Place the sensor and a fixed resistor in series between supply and GND. Connect their junction to A0 so resistance changes become voltage changes." /></div><p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">Never apply a voltage outside the board's permitted input range. A sensor powered from a higher voltage may require proper level scaling or isolation.</p></section>

        <section><h3 className="text-2xl font-bold">Noise, smoothing, and calibration</h3><div className="mt-4 grid gap-4 md:grid-cols-3"><InfoCard title="Averaging" text="Take several readings and divide their sum to reduce random variation." /><InfoCard title="Calibration" text="Compare readings against known physical values and determine useful minimum and maximum points." /><InfoCard title="Stable wiring" text="Use a common ground, short signal paths, suitable decoupling, and clean power where possible." /></div></section>

        <section><div className="flex items-center gap-3"><Code2 className="text-emerald-700" size={28} /><h3 className="text-2xl font-bold">Practical program: smoothed sensor monitor</h3></div><p className="mt-3 leading-7 text-slate-600">This sketch averages ten readings, estimates voltage, scales the result to a percentage, and prints all three values to Serial Monitor.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{sensorCode}</code></pre></section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-amber-700" size={28} /><h3 className="text-xl font-bold">Measurement safety and troubleshooting</h3></div><ul className="mt-4 space-y-2 text-slate-700"><li>• Confirm the sensor's supply and output-voltage limits before connection.</li><li>• Ensure the Arduino and sensor share a common ground when required.</li><li>• Never connect mains voltage or an unisolated high-voltage source to an Arduino.</li><li>• If the reading remains 0 or 1023, inspect wiring and check for a short to GND or supply.</li><li>• If values fluctuate, improve grounding, shorten wires, average samples, and stabilise the supply.</li></ul></section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white"><div className="flex items-center gap-3"><Activity className="text-cyan-300" /><h3 className="text-2xl font-bold">Hands-on activity</h3></div><p className="mt-3 leading-7 text-slate-200">Connect a potentiometer to A0 and run the sensor monitor. Record ADC value, calculated voltage, and percentage at the minimum, centre, and maximum positions. Then change the program to illuminate the built-in LED when the percentage is 70 or higher.</p></section>
      </article>

      <ChapterFiveQuiz />
    </>
  );
}

function ChapterFiveQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);
  const complete = Object.keys(answers).length === questions.length;
  const passed = score >= 8;
  const reset = () => { setAnswers({}); setSubmitted(false); };
  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 5 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, questionIndex) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{questionIndex + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[questionIndex] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`arduino-chapter-5-${questionIndex}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p className="mt-1">You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function InfoCard({ title, text }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>;
}

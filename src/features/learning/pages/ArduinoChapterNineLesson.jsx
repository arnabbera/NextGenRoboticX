import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, Code2, Cpu, Gauge, Monitor, RotateCcw, ShieldAlert, XCircle, Zap } from "lucide-react";

const proximityCode = `#include <Servo.h>

const int triggerPin = 7;
const int echoPin = 6;
const int ledPin = 9;
const int servoPin = 10;

Servo indicatorServo;

float readDistanceCm() {
  digitalWrite(triggerPin, LOW);
  delayMicroseconds(2);
  digitalWrite(triggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(triggerPin, LOW);

  unsigned long duration = pulseIn(echoPin, HIGH, 30000);
  if (duration == 0) return -1;

  return duration * 0.0343 / 2.0;
}

void setup() {
  pinMode(triggerPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ledPin, OUTPUT);
  indicatorServo.attach(servoPin);
  Serial.begin(9600);
}

void loop() {
  float distance = readDistanceCm();

  if (distance > 0) {
    int angle = constrain(map((int)distance, 5, 100, 180, 0), 0, 180);
    int brightness = constrain(map((int)distance, 5, 100, 255, 0), 0, 255);

    indicatorServo.write(angle);
    analogWrite(ledPin, brightness);

    Serial.print("Distance: ");
    Serial.print(distance, 1);
    Serial.println(" cm");
  } else {
    analogWrite(ledPin, 0);
    Serial.println("No valid echo");
  }

  delay(100);
}`;

const questions = [
  { question: "What is the main role of a sensor?", options: ["Convert a physical condition into usable information", "Supply unlimited motor current", "Store the sketch", "Select the USB port"], answer: 0 },
  { question: "What is an actuator?", options: ["A device that produces a physical action from a control signal", "Only an analogue input", "A program comment", "An I2C address"], answer: 0 },
  { question: "Why is sensor calibration performed?", options: ["To relate readings to known reference values", "To increase board clock speed", "To erase memory", "To enable USB"], answer: 0 },
  { question: "How does an HC-SR04-style ultrasonic sensor estimate distance?", options: ["From the echo travel time", "From PWM brightness", "From EEPROM", "From the board name"], answer: 0 },
  { question: "Why is ultrasonic travel time divided by two in the distance formula?", options: ["The pulse travels to the object and back", "The ADC is 10-bit", "The motor has two wires", "The display has two lines"], answer: 0 },
  { question: "Which bus is commonly used by small OLED and LCD interface modules?", options: ["I2C", "Mains AC", "Analogue output only", "PWM only"], answer: 0 },
  { question: "What type of control signal is commonly used by a hobby servo?", options: ["Timed control pulses", "An I2C address only", "Raw mains voltage", "ADC input"], answer: 0 },
  { question: "Why should a larger servo use a suitable external supply?", options: ["It can draw more current than the Arduino regulator safely provides", "It requires a PDF", "It changes baud rate", "It needs no ground"], answer: 0 },
  { question: "What does constrain(value, minimum, maximum) do?", options: ["Limits a value to a range", "Reads an I2C device", "Starts Serial", "Changes pin mode"], answer: 0 },
  { question: "What is essential when an Arduino and actuator use separate compatible supplies?", options: ["A correct common reference/ground where required", "No signal connection", "A direct mains connection", "Different baud rates"], answer: 0 },
];

export default function ArduinoChapterNineLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header><p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 9</p><h2 className="mt-2 text-3xl font-bold text-slate-900">Interfacing Sensors, Displays and Actuators</h2><p className="mt-4 leading-8 text-slate-600">A useful embedded system follows a complete information path: sensors measure the environment, the program processes data, displays communicate status, and actuators change the physical world. Reliable integration requires compatible voltage, power, timing, libraries, and error handling.</p></header>

        <section><h3 className="text-2xl font-bold">Learning objectives</h3><ul className="mt-4 grid gap-3 md:grid-cols-2">{["Classify analogue, digital, pulse, and bus-based sensors.", "Apply calibration, filtering, range checking, and timeout handling.", "Measure distance using an ultrasonic trigger and echo.", "Explain I2C display addressing and library configuration.", "Control LEDs, buzzers, relays, motors, and hobby servos safely.", "Combine sensing, processing, indication, and actuation in one program."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><span className="mr-2 font-bold text-emerald-600">✓</span>{item}</li>)}</ul></section>

        <section className="rounded-2xl bg-blue-50 p-6"><div className="flex items-center gap-3"><Cpu className="text-blue-700" size={28} /><h3 className="text-2xl font-bold">The sense–decide–act pipeline</h3></div><div className="mt-5 grid gap-4 md:grid-cols-3"><StageCard number="1" title="Sense" text="Acquire raw information from analogue, digital, timed-pulse, UART, I2C, or SPI devices." /><StageCard number="2" title="Decide" text="Validate, filter, calibrate, compare thresholds, and determine the required response." /><StageCard number="3" title="Act" text="Update a display or control an output through correctly rated interface hardware." /></div></section>

        <section><h3 className="text-2xl font-bold">Sensor interface types</h3><div className="mt-5 overflow-x-auto"><table className="w-full border-collapse text-left"><thead><tr className="bg-slate-900 text-white"><th className="p-3">Interface</th><th className="p-3">Example</th><th className="p-3">Arduino technique</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">Analogue voltage</td><td className="p-3">Potentiometer, LDR divider</td><td className="p-3"><code>analogRead()</code>, calibration, averaging</td></tr><tr><td className="p-3 font-semibold">Digital state</td><td className="p-3">PIR output, limit switch</td><td className="p-3"><code>digitalRead()</code>, pull-up, debounce</td></tr><tr><td className="p-3 font-semibold">Timed pulse</td><td className="p-3">Ultrasonic echo</td><td className="p-3"><code>pulseIn()</code> with a timeout</td></tr><tr><td className="p-3 font-semibold">Data bus</td><td className="p-3">Environmental sensor</td><td className="p-3">Library plus I2C, SPI, or UART</td></tr></tbody></table></div></section>

        <section><div className="flex items-center gap-3"><Gauge className="text-indigo-700" size={28} /><h3 className="text-2xl font-bold">Ultrasonic distance measurement</h3></div><p className="mt-4 leading-8 text-slate-600">A short trigger pulse starts an ultrasonic burst. The echo signal remains active for the measured round-trip travel time. Distance is estimated using the speed of sound and divided by two because the sound travels to the object and returns.</p><div className="mt-5 rounded-xl bg-slate-900 p-5 text-center text-lg font-semibold text-cyan-200">Distance = echo duration × speed of sound ÷ 2</div><p className="mt-4 text-slate-600">A timeout prevents the sketch from waiting indefinitely when no echo is received. Soft, angled, narrow, or distant objects may give weak or inconsistent readings.</p></section>

        <section><div className="flex items-center gap-3"><Monitor className="text-purple-700" size={28} /><h3 className="text-2xl font-bold">Displays and visual feedback</h3></div><p className="mt-4 leading-8 text-slate-600">Small LCD and OLED modules frequently use I2C. Confirm their logic voltage, address, display dimensions, and supported library. Initialise the display once in <code>setup()</code>, then update only changed content where practical to reduce flicker and bus traffic.</p><div className="mt-5 grid gap-4 md:grid-cols-2"><InfoCard title="Text LCD" text="Useful for labels and numeric status. An I2C backpack reduces parallel wiring to power, SDA, and SCL." /><InfoCard title="Graphic OLED" text="Supports text, icons, and simple graphs. Buffer-based libraries may use significant SRAM on a small Uno." /></div></section>

        <section><div className="flex items-center gap-3"><Zap className="text-orange-600" size={28} /><h3 className="text-2xl font-bold">Actuator interfaces</h3></div><div className="mt-5 grid gap-4 md:grid-cols-2"><InfoCard title="LED or small buzzer" text="May be driven from a pin only when voltage and current remain within safe limits." /><InfoCard title="Servo" text="Receives timed control pulses but should use a suitable external supply when current is significant." /><InfoCard title="DC motor or solenoid" text="Requires a rated transistor/MOSFET or driver plus flyback protection and external power." /><InfoCard title="Relay module" text="Use a compatible driver/isolation module and observe safe separation from hazardous load voltage." /></div></section>

        <section><div className="flex items-center gap-3"><Code2 className="text-emerald-700" size={28} /><h3 className="text-2xl font-bold">Integrated program: proximity indicator</h3></div><p className="mt-3 leading-7 text-slate-600">This program measures distance, reports it through Serial, moves a servo indicator, and changes LED brightness as an object approaches. Power the servo appropriately and share the required ground reference.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{proximityCode}</code></pre></section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-amber-700" size={28} /><h3 className="text-xl font-bold">Integration safety and troubleshooting</h3></div><ul className="mt-4 space-y-2 text-slate-700"><li>• Verify each module's pinout; similarly shaped modules may use different pin orders.</li><li>• Check logic voltage and use level shifting when required.</li><li>• Size external supplies for actuator starting/stall current, not only average current.</li><li>• Use common grounding correctly and keep noisy actuator wiring away from sensor signals.</li><li>• Add timeouts and reject impossible sensor values instead of acting on them.</li><li>• Test each device separately before integrating the complete system.</li></ul></section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white"><h3 className="text-2xl font-bold">Hands-on activity</h3><p className="mt-3 leading-7 text-slate-200">Build and test the ultrasonic measurement first. Record readings at 10, 25, 50, and 100 cm. Add the LED output, then connect a separately powered servo using a correct common ground. Modify the program so the servo moves to three fixed positions for near, medium, and far ranges, and describe how you would show the same status on an I2C display.</p></section>
      </article>

      <ChapterNineQuiz />
    </>
  );
}

function ChapterNineQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);
  const complete = Object.keys(answers).length === questions.length;
  const passed = score >= 8;
  const reset = () => { setAnswers({}); setSubmitted(false); };
  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 9 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, questionIndex) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{questionIndex + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[questionIndex] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`arduino-chapter-9-${questionIndex}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p className="mt-1">You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function StageCard({ number, title, text }) {
  return <div className="rounded-2xl border border-blue-200 bg-white p-5"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">{number}</span><h4 className="mt-3 font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>;
}

function InfoCard({ title, text }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>;
}

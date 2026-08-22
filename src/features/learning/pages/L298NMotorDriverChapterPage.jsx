import { useMemo, useState } from "react";
import {
  BatteryCharging,
  CheckCircle2,
  CircleHelp,
  Code2,
  Cpu,
  Gauge,
  Lightbulb,
  PlayCircle,
  RotateCcw,
  ShieldAlert,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import LessonHeader from "../components/LessonHeader";
import ChapterSidebar from "../components/ChapterSidebar";
import ChapterVideoManager from "../components/ChapterVideoManager";

const questions = [
  { question: "What is the main purpose of an L298N module?", options: ["Measure distance", "Drive DC motors in both directions", "Store Arduino code", "Regulate sensor light"], answer: 1 },
  { question: "Which circuit inside a motor driver reverses motor direction?", options: ["Voltage divider", "H-bridge", "Oscillator", "ADC"], answer: 1 },
  { question: "Which pins control Motor A direction?", options: ["IN1 and IN2", "IN3 and IN4", "SDA and SCL", "RX and TX"], answer: 0 },
  { question: "What does the ENA pin control?", options: ["Motor A enable and speed", "Motor B direction only", "Arduino reset", "Battery charging"], answer: 0 },
  { question: "How is motor speed commonly controlled through ENA or ENB?", options: ["Serial printing", "PWM", "analogRead()", "A pull-up resistor"], answer: 1 },
  { question: "Why must the Arduino and motor supply grounds be connected?", options: ["To increase battery voltage", "To provide a common signal reference", "To bypass the motor driver", "To erase electrical noise"], answer: 1 },
  { question: "Why should motors use a suitable external supply?", options: ["Arduino I/O pins cannot safely provide motor current", "Motors cannot rotate near Arduino", "USB has no ground", "Drivers work without power"], answer: 0 },
  { question: "What happens when IN1 is HIGH and IN2 is LOW?", options: ["Motor A runs in one direction", "Motor A is disconnected", "Motor B reverses", "The Arduino resets"], answer: 0 },
  { question: "What is a known limitation of the L298N?", options: ["It has no direction control", "Its bipolar transistors cause voltage drop and heat", "It only reads sensors", "It requires internet access"], answer: 1 },
  { question: "What should you do before changing motor wiring?", options: ["Increase PWM to 255", "Disconnect power", "Remove common ground", "Touch the heat sink"], answer: 1 },
];

const motorCode = `const int ENA = 5;
const int IN1 = 8;
const int IN2 = 9;
const int ENB = 6;
const int IN3 = 10;
const int IN4 = 11;

void setup() {
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ENB, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  stopMotors();
}

void loop() {
  moveForward(180);
  delay(2000);

  stopMotors();
  delay(500);

  moveBackward(180);
  delay(2000);

  turnLeft(170);
  delay(800);

  stopMotors();
  delay(1500);
}

void moveForward(int speedValue) {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  analogWrite(ENA, speedValue);
  analogWrite(ENB, speedValue);
}

void moveBackward(int speedValue) {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  analogWrite(ENA, speedValue);
  analogWrite(ENB, speedValue);
}

void turnLeft(int speedValue) {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  analogWrite(ENA, speedValue);
  analogWrite(ENB, speedValue);
}

void stopMotors() {
  analogWrite(ENA, 0);
  analogWrite(ENB, 0);
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
          <h2 className="text-2xl font-bold text-slate-900">Chapter 4 Quiz</h2>
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
                      name={`chapter-4-question-${questionIndex}`}
                      checked={selected}
                      disabled={submitted}
                      onChange={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))}
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

export default function L298NMotorDriverChapterPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <LessonHeader chapter={4} lesson={1} chapterTitle="Motor Driver (L298N)" />

      <div className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-3">
            <ChapterSidebar currentChapter={4} />
          </aside>

          <main className="col-span-12 space-y-6 lg:col-span-9">
            <section className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <PlayCircle className="text-blue-600" size={28} aria-hidden="true" />
                <div>
                  <h2 className="text-2xl font-bold">Motor Driver (L298N)</h2>
                  <p className="text-slate-500">Chapter 4 • Power, direction and speed control</p>
                </div>
              </div>
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 via-red-950 to-orange-950 p-8 text-center text-white">
                <div>
                  <Zap className="mx-auto text-orange-300" size={64} aria-hidden="true" />
                  <h3 className="mt-5 text-2xl font-bold">Drive two DC motors safely</h3>
                  <p className="mt-3 text-orange-100">Use H-bridges, external power and PWM to move a robot with control.</p>
                </div>
              </div>
              <ChapterVideoManager chapter={4} />
            </section>

            <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
              <header>
                <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 4</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Motor Driver (L298N)</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Arduino pins send control signals, but they cannot safely supply the current required by DC motors.
                  The L298N module acts as a power interface, allowing a controller to run two motors forward or
                  backward and vary their speed.
                </p>
              </header>

              <section>
                <h3 className="text-2xl font-bold">Learning objectives</h3>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {[
                    "Explain why a motor driver is required.",
                    "Describe how an H-bridge reverses a motor.",
                    "Identify the L298N power and control terminals.",
                    "Control two DC motors with Arduino.",
                    "Use PWM for motor speed control.",
                    "Wire and test a driver safely.",
                  ].map((item) => (
                    <li key={item} className="rounded-xl border p-4">
                      <span className="mr-2 font-bold text-green-600">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl bg-blue-50 p-6">
                  <Cpu className="text-blue-700" size={30} aria-hidden="true" />
                  <h3 className="mt-3 text-2xl font-bold">Arduino provides logic</h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    Digital direction signals and PWM tell the driver what to do. These pins handle only small logic currents.
                  </p>
                </div>
                <div className="rounded-2xl bg-orange-50 p-6">
                  <BatteryCharging className="text-orange-700" size={30} aria-hidden="true" />
                  <h3 className="mt-3 text-2xl font-bold">The driver provides power</h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    A suitable battery or supply sends motor current through the driver outputs. Arduino and driver must share ground.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold">How an H-bridge works</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  An H-bridge uses electronic switches to change the direction of current through a motor.
                  Reversing the current reverses rotation. Each L298N channel contains one H-bridge.
                </p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead><tr className="bg-slate-900 text-white"><th className="p-3">IN1</th><th className="p-3">IN2</th><th className="p-3">Motor A result</th></tr></thead>
                    <tbody className="divide-y">
                      {[["LOW", "LOW", "Stop / coast"], ["HIGH", "LOW", "Rotate one direction"], ["LOW", "HIGH", "Rotate opposite direction"], ["HIGH", "HIGH", "Brake"]].map((row) => (
                        <tr key={row.join("-")}>{row.map((cell, index) => <td key={cell} className={`p-3 ${index < 2 ? "font-mono font-semibold" : "text-slate-600"}`}>{cell}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold">L298N pin guide</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead><tr className="bg-blue-700 text-white"><th className="p-3">Pins</th><th className="p-3">Purpose</th><th className="p-3">Connect to</th></tr></thead>
                    <tbody className="divide-y">
                      {[
                        ["ENA", "Enable / PWM speed for Motor A", "Arduino PWM pin 5"],
                        ["IN1, IN2", "Direction for Motor A", "Arduino digital pins 8, 9"],
                        ["OUT1, OUT2", "Motor A output", "Left DC motor"],
                        ["ENB", "Enable / PWM speed for Motor B", "Arduino PWM pin 6"],
                        ["IN3, IN4", "Direction for Motor B", "Arduino digital pins 10, 11"],
                        ["OUT3, OUT4", "Motor B output", "Right DC motor"],
                        ["12V / VS", "Motor power input", "Suitable external motor supply"],
                        ["GND", "Common electrical reference", "Supply negative and Arduino GND"],
                        ["5V", "Logic supply terminal", "Follow the module regulator/jumper instructions"],
                      ].map(([pins, purpose, connection]) => (
                        <tr key={pins}><td className="p-3 font-mono font-semibold">{pins}</td><td className="p-3 text-slate-600">{purpose}</td><td className="p-3 text-slate-600">{connection}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="text-amber-700" size={28} aria-hidden="true" />
                  <h3 className="text-xl font-bold">5V jumper and power caution</h3>
                </div>
                <p className="mt-3 leading-7 text-slate-700">
                  L298N boards vary. The 5V-enable jumper may activate the onboard regulator, and its allowed
                  motor-supply range depends on the module. Read the label or datasheet for your board. Never connect
                  two powered 5V sources together unless the module instructions explicitly require it.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Gauge className="text-purple-700" size={28} aria-hidden="true" />
                  <h3 className="text-2xl font-bold">Speed control with PWM</h3>
                </div>
                <p className="mt-3 leading-7 text-slate-600">
                  Remove the ENA and ENB jumpers when those inputs are controlled by Arduino PWM pins.
                  analogWrite() accepts values from 0 (off) to 255 (full duty cycle). Motors may stall at low
                  values, so find a reliable minimum speed experimentally.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Code2 className="text-green-700" size={28} aria-hidden="true" />
                  <h3 className="text-2xl font-bold">Practical: two-motor movement test</h3>
                </div>
                <ol className="mt-4 space-y-2 text-slate-700">
                  <li>1. Disconnect all power and complete the wiring from the pin table.</li>
                  <li>2. Lift the robot so its wheels can rotate freely during the first test.</li>
                  <li>3. Check polarity, common ground and supply voltage, then upload the sketch.</li>
                  <li>4. If one wheel turns the wrong way, power off and swap that motor’s two output wires.</li>
                </ol>
                <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-green-300"><code>{motorCode}</code></pre>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Wrench className="text-slate-700" size={28} aria-hidden="true" />
                  <h3 className="text-2xl font-bold">Troubleshooting</h3>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {[
                    ["Motor does not move", "Check ENA/ENB, supply voltage, ground, wiring and PWM value."],
                    ["Arduino resets", "Motor noise or supply sag may be affecting logic power; separate supplies and improve decoupling."],
                    ["Driver becomes hot", "Stop power and check current, stalled motors, shorts and ventilation."],
                    ["Robot curves", "Motors differ naturally; calibrate left and right PWM values."],
                    ["Weak motor torque", "Check battery condition and remember the L298N has a significant voltage drop."],
                    ["Direction is reversed", "Swap the motor output wires or reverse its input logic in software."],
                  ].map(([problem, solution]) => (
                    <div key={problem} className="rounded-xl border p-5">
                      <h4 className="font-bold">{problem}</h4>
                      <p className="mt-2 text-slate-600">{solution}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-red-50 p-6">
                <h3 className="text-2xl font-bold">Limitations of the L298N</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  The L298N is useful for learning, but its older bipolar-transistor design wastes power as heat
                  and reduces voltage available to the motors. For efficient battery robots, modern MOSFET drivers
                  such as TB6612FNG or DRV8833 may be better when their voltage and current ratings fit the motors.
                </p>
              </section>

              <section className="rounded-2xl bg-slate-900 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Lightbulb className="text-yellow-300" size={26} />
                  <h3 className="text-2xl font-bold">Chapter activity</h3>
                </div>
                <p className="mt-3 text-slate-200">
                  Run both motors at PWM values 100, 150, 200 and 255. Record whether each motor starts reliably
                  and whether the robot travels straight. Determine separate left and right PWM values that give
                  the straightest movement, then explain why calibration is necessary.
                </p>
              </section>

              <section className="rounded-2xl bg-blue-50 p-6">
                <h3 className="text-2xl font-bold">Chapter summary</h3>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• The L298N lets low-current logic control higher-current DC motors.</li>
                  <li>• H-bridges reverse current to reverse motor direction.</li>
                  <li>• ENA and ENB accept PWM for speed control when their jumpers are removed.</li>
                  <li>• Motor power should come from a suitable external supply with a common ground.</li>
                  <li>• Safe wiring, current limits, heat and voltage drop must be considered.</li>
                </ul>
              </section>
            </article>

            <ChapterQuiz />

            <nav className="flex justify-between gap-4">
              <Link to="/courses/robotics-foundation/learn/chapter-3" className="rounded-xl border bg-white px-5 py-3 font-semibold hover:bg-slate-50">
                ← Chapter 3
              </Link>
              <Link to="/courses/robotics-foundation/learn/chapter-5" className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
                Chapter 5 →
              </Link>
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}

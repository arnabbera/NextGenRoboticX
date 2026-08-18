import { useMemo, useState } from "react";
import {
  Bluetooth,
  CheckCircle2,
  CircleHelp,
  Code2,
  Gamepad2,
  Lightbulb,
  PlayCircle,
  Radio,
  RotateCcw,
  ShieldAlert,
  Smartphone,
  Wrench,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import LessonHeader from "../components/LessonHeader";
import ChapterSidebar from "../components/ChapterSidebar";

const questions = [
  { question: "Which module is commonly used for Bluetooth serial control with Arduino?", options: ["HC-05", "LDR", "HC-SR04", "L298N only"], answer: 0 },
  { question: "What type of communication does the HC-05 provide to Arduino?", options: ["UART serial", "Analogue video", "I2C display", "Motor PWM output"], answer: 0 },
  { question: "How should the HC-05 TXD pin connect to Arduino in this project?", options: ["To Arduino software RX pin", "To a motor output", "Directly to 12V", "To ENA"], answer: 0 },
  { question: "Why is a voltage divider recommended on the HC-05 RXD input?", options: ["To increase motor speed", "To reduce Arduino 5V TX logic to a safer level", "To charge the battery", "To reverse the robot"], answer: 1 },
  { question: "Which command is used for forward movement in this lesson?", options: ["F", "B", "L", "S"], answer: 0 },
  { question: "What should the robot do when it receives an unknown command?", options: ["Run at full speed", "Stop safely", "Disconnect ground", "Enter AT mode"], answer: 1 },
  { question: "Why does the sketch use SoftwareSerial?", options: ["To create another serial port on digital pins", "To power the motors", "To measure distance", "To replace the L298N"], answer: 0 },
  { question: "What must the Bluetooth module, Arduino and motor driver share?", options: ["A common ground", "The same PWM pin", "A 12V logic input", "No electrical connection"], answer: 0 },
  { question: "What does command S do?", options: ["Increase speed", "Stop the motors", "Turn left", "Pair Bluetooth"], answer: 1 },
  { question: "What is the safest first movement test?", options: ["With wheels lifted from the floor", "At full speed near stairs", "While changing live wiring", "Without checking motor direction"], answer: 0 },
];

const robotCode = `#include <SoftwareSerial.h>

SoftwareSerial bluetooth(2, 3); // Arduino RX, TX

const int ENA = 5;
const int IN1 = 8;
const int IN2 = 9;
const int ENB = 6;
const int IN3 = 10;
const int IN4 = 11;

int motorSpeed = 180;

void setup() {
  Serial.begin(9600);
  bluetooth.begin(9600);

  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ENB, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);

  stopRobot();
}

void loop() {
  if (bluetooth.available()) {
    char command = bluetooth.read();
    Serial.println(command);

    switch (command) {
      case 'F': moveForward(); break;
      case 'B': moveBackward(); break;
      case 'L': turnLeft(); break;
      case 'R': turnRight(); break;
      case 'S': stopRobot(); break;
      case '1': motorSpeed = 120; break;
      case '2': motorSpeed = 180; break;
      case '3': motorSpeed = 255; break;
      default:  stopRobot(); break;
    }
  }
}

void setSpeed() {
  analogWrite(ENA, motorSpeed);
  analogWrite(ENB, motorSpeed);
}

void moveForward() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  setSpeed();
}

void moveBackward() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  setSpeed();
}

void turnLeft() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  setSpeed();
}

void turnRight() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  setSpeed();
}

void stopRobot() {
  analogWrite(ENA, 0);
  analogWrite(ENB, 0);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
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
          <h2 className="text-2xl font-bold text-slate-900">Chapter 5 Quiz</h2>
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
                      name={`chapter-5-question-${questionIndex}`}
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

export default function BluetoothRobotChapterPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <LessonHeader chapter={5} lesson={1} chapterTitle="Bluetooth Robot" />

      <div className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-3">
            <ChapterSidebar currentChapter={5} />
          </aside>

          <main className="col-span-12 space-y-6 lg:col-span-9">
            <section className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <PlayCircle className="text-blue-600" size={28} aria-hidden="true" />
                <div>
                  <h2 className="text-2xl font-bold">Bluetooth Robot</h2>
                  <p className="text-slate-500">Chapter 5 • Wireless commands and mobile control</p>
                </div>
              </div>
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 p-8 text-center text-white">
                <div>
                  <Bluetooth className="mx-auto text-cyan-300" size={64} aria-hidden="true" />
                  <h3 className="mt-5 text-2xl font-bold">Control your robot wirelessly</h3>
                  <p className="mt-3 text-cyan-100">Send simple commands from a phone to Arduino through Bluetooth serial communication.</p>
                </div>
              </div>
            </section>

            <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
              <header>
                <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 5</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Bluetooth Robot</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  In this chapter, you will combine the Arduino and L298N motor circuit with an HC-05 or HC-06
                  Bluetooth serial module. A mobile controller sends single-character commands that make the robot
                  move forward, backward, left, right or stop.
                </p>
              </header>

              <section>
                <h3 className="text-2xl font-bold">Learning objectives</h3>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {[
                    "Explain Bluetooth serial control.",
                    "Identify HC-05/HC-06 power and UART pins.",
                    "Wire the module using a safe logic-level connection.",
                    "Pair a phone with the Bluetooth module.",
                    "Translate commands into robot movement.",
                    "Test and troubleshoot wireless control safely.",
                  ].map((item) => (
                    <li key={item} className="rounded-xl border p-4">
                      <span className="mr-2 font-bold text-green-600">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="grid gap-5 md:grid-cols-3">
                <div className="rounded-2xl bg-blue-50 p-5">
                  <Smartphone className="text-blue-700" size={30} />
                  <h3 className="mt-3 text-xl font-bold">Phone</h3>
                  <p className="mt-2 text-slate-700">A Bluetooth terminal or robot-controller app sends characters.</p>
                </div>
                <div className="rounded-2xl bg-cyan-50 p-5">
                  <Radio className="text-cyan-700" size={30} />
                  <h3 className="mt-3 text-xl font-bold">HC-05</h3>
                  <p className="mt-2 text-slate-700">The module converts wireless data into UART serial data.</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-5">
                  <Gamepad2 className="text-emerald-700" size={30} />
                  <h3 className="mt-3 text-xl font-bold">Arduino</h3>
                  <p className="mt-2 text-slate-700">The sketch converts each command into L298N motor signals.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold">HC-05/HC-06 module basics</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  These modules commonly communicate at 9600 baud in normal data mode. Pin labels and breakout-board
                  voltage support can vary, so inspect your module before connecting it.
                </p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead><tr className="bg-slate-900 text-white"><th className="p-3">Module pin</th><th className="p-3">Purpose</th><th className="p-3">Connection used here</th></tr></thead>
                    <tbody className="divide-y">
                      {[
                        ["VCC", "Module power", "5V only if supported by the breakout board"],
                        ["GND", "Electrical reference", "Arduino GND and driver ground"],
                        ["TXD", "Data transmitted by module", "Arduino pin 2 (SoftwareSerial RX)"],
                        ["RXD", "Data received by module", "Arduino pin 3 (SoftwareSerial TX) through divider"],
                        ["STATE", "Optional connection-status output", "Not required"],
                        ["EN / KEY", "Configuration or AT mode", "Not required for normal control"],
                      ].map(([pin, purpose, connection]) => (
                        <tr key={pin}><td className="p-3 font-mono font-semibold">{pin}</td><td className="p-3 text-slate-600">{purpose}</td><td className="p-3 text-slate-600">{connection}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="text-amber-700" size={28} aria-hidden="true" />
                  <h3 className="text-xl font-bold">Protect the Bluetooth RX pin</h3>
                </div>
                <p className="mt-3 leading-7 text-slate-700">
                  Arduino Uno outputs 5V logic, while many Bluetooth module RX inputs use approximately 3.3V logic.
                  Place a voltage divider between Arduino pin 3 and module RXD—for example, 1 kΩ from Arduino TX to
                  RXD and 2 kΩ from RXD to GND. The module TXD can normally drive Arduino’s input directly.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Command protocol</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    ["F", "Forward"],
                    ["B", "Backward"],
                    ["L", "Turn left"],
                    ["R", "Turn right"],
                    ["S", "Stop"],
                    ["1 / 2 / 3", "Low / medium / full speed"],
                  ].map(([command, action]) => (
                    <div key={command} className="rounded-xl border p-4">
                      <span className="rounded-lg bg-blue-100 px-3 py-1 font-mono font-bold text-blue-800">{command}</span>
                      <p className="mt-3 font-semibold">{action}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-slate-600">
                  Matching uppercase and lowercase matters. Configure the phone app to send exactly one of the listed uppercase characters.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Code2 className="text-green-700" size={28} aria-hidden="true" />
                  <h3 className="text-2xl font-bold">Complete Arduino program</h3>
                </div>
                <p className="mt-3 leading-7 text-slate-600">
                  This sketch keeps the USB serial port available for debugging and creates a separate Bluetooth
                  serial port on pins 2 and 3. The L298N wiring remains consistent with Chapter 4.
                </p>
                <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-green-300"><code>{robotCode}</code></pre>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Build and pairing procedure</h3>
                <ol className="mt-4 space-y-3 text-slate-700">
                  <li className="rounded-xl border p-4"><strong>1. Wire with power disconnected.</strong> Recheck VCC, ground, crossed TX/RX connections and the voltage divider.</li>
                  <li className="rounded-xl border p-4"><strong>2. Upload the sketch.</strong> SoftwareSerial avoids disconnecting the module during normal uploads.</li>
                  <li className="rounded-xl border p-4"><strong>3. Power the robot.</strong> Confirm the module’s status LED indicates it is waiting to pair.</li>
                  <li className="rounded-xl border p-4"><strong>4. Pair from the phone.</strong> Select the module name and use its documented PIN; common defaults are 1234 or 0000.</li>
                  <li className="rounded-xl border p-4"><strong>5. Connect through an app.</strong> Use a Bluetooth serial terminal or controller app compatible with your phone and module.</li>
                  <li className="rounded-xl border p-4"><strong>6. Test safely.</strong> Lift the wheels, send S first, then briefly test F, B, L and R.</li>
                </ol>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Wrench className="text-slate-700" size={28} aria-hidden="true" />
                  <h3 className="text-2xl font-bold">Troubleshooting</h3>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {[
                    ["Module not visible", "Check power, LED state, phone Bluetooth and whether another device is connected."],
                    ["Pairs but does not control", "Check app connection, baud rate, uppercase commands and crossed TX/RX wiring."],
                    ["Unreadable characters", "The module and sketch baud rates probably do not match."],
                    ["Motors move incorrectly", "Recheck L298N inputs or swap the affected motor wires with power off."],
                    ["Connection drops", "Check battery voltage, loose wiring and electrical noise from the motors."],
                    ["Upload problem", "Verify SoftwareSerial pins are used and no wiring shorts the Arduino serial interface."],
                  ].map(([problem, solution]) => (
                    <div key={problem} className="rounded-xl border p-5">
                      <h4 className="font-bold">{problem}</h4>
                      <p className="mt-2 text-slate-600">{solution}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-red-50 p-6">
                <h3 className="text-2xl font-bold">Operational safety</h3>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• Test with wheels off the floor before placing the robot on the ground.</li>
                  <li>• Keep the robot away from stairs, roads, people, pets and fragile objects.</li>
                  <li>• Stop immediately if the driver, battery, wires or motors become unusually hot.</li>
                  <li>• Do not modify wiring while the battery or USB power is connected.</li>
                  <li>• Use a safe command fallback: unknown input must stop the robot.</li>
                </ul>
              </section>

              <section className="rounded-2xl bg-slate-900 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Lightbulb className="text-yellow-300" size={26} />
                  <h3 className="text-2xl font-bold">Chapter activity</h3>
                </div>
                <p className="mt-3 text-slate-200">
                  Build a controller layout with forward, backward, left, right, stop and three speed buttons.
                  Run a short course containing a straight path, left turn and right turn. Record response delay,
                  reliable control distance and the lowest PWM setting at which both motors start consistently.
                </p>
              </section>

              <section className="rounded-2xl bg-blue-50 p-6">
                <h3 className="text-2xl font-bold">Chapter summary</h3>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• HC-05/HC-06 modules provide Bluetooth-to-UART serial communication.</li>
                  <li>• TX and RX must be crossed, with suitable level protection on the module RX input.</li>
                  <li>• Single-character commands create a simple, reliable control protocol.</li>
                  <li>• SoftwareSerial preserves the USB serial port for debugging.</li>
                  <li>• A stop command, safe fallback and controlled testing reduce movement risks.</li>
                </ul>
              </section>
            </article>

            <ChapterQuiz />

            <nav className="flex justify-between gap-4">
              <Link to="/courses/robotics-foundation/learn/chapter-4" className="rounded-xl border bg-white px-5 py-3 font-semibold hover:bg-slate-50">
                ← Chapter 4
              </Link>
              <span className="rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-500">
                Chapter 6 coming next
              </span>
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}

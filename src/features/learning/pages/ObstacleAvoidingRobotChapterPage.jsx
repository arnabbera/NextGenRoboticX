import { useMemo, useState } from "react";
import {
  Bot,
  CheckCircle2,
  CircleHelp,
  Code2,
  Eye,
  Gauge,
  Lightbulb,
  PlayCircle,
  Radar,
  RotateCcw,
  ScanLine,
  ShieldAlert,
  Wrench,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import LessonHeader from "../components/LessonHeader";
import ChapterSidebar from "../components/ChapterSidebar";

const questions = [
  { question: "What does the HC-SR04 sensor measure?", options: ["Motor current", "Distance using ultrasonic sound", "Bluetooth signal strength", "Wheel colour"], answer: 1 },
  { question: "Which HC-SR04 pin starts an ultrasonic measurement?", options: ["ECHO", "TRIG", "GND", "VCC"], answer: 1 },
  { question: "What does pulseIn() measure in this project?", options: ["Echo pulse duration", "Battery capacity", "Servo angle", "PWM frequency only"], answer: 0 },
  { question: "Why is the measured time divided by two?", options: ["There are two motors", "Sound travels to the object and back", "The sensor has two transducers", "Arduino runs twice"], answer: 1 },
  { question: "What should the robot do when an obstacle is closer than the threshold?", options: ["Accelerate", "Stop and choose a clear direction", "Disable the sensor", "Continue unchanged"], answer: 1 },
  { question: "Why is the ultrasonic sensor mounted on a servo?", options: ["To increase voltage", "To scan left and right", "To power the motors", "To pair with a phone"], answer: 1 },
  { question: "What does a pulseIn() timeout prevent?", options: ["The program waiting indefinitely for a missing echo", "The motor from reversing", "The servo from moving", "The battery from charging"], answer: 0 },
  { question: "What is the purpose of a common ground?", options: ["Provide a shared signal reference", "Double the supply voltage", "Replace the L298N", "Create an obstacle"], answer: 0 },
  { question: "Why should several distance readings be compared during calibration?", options: ["Sensor readings can fluctuate", "It changes motor polarity", "It enables Bluetooth", "It uploads the sketch"], answer: 0 },
  { question: "What is the safest first test condition?", options: ["Robot lifted with wheels free", "Beside stairs", "At maximum speed near people", "While changing powered wiring"], answer: 0 },
];

const robotCode = `#include <Servo.h>

Servo scanner;

const int trigPin = 7;
const int echoPin = 12;
const int servoPin = 4;

const int ENA = 5;
const int IN1 = 8;
const int IN2 = 9;
const int ENB = 6;
const int IN3 = 10;
const int IN4 = 11;

const int safeDistance = 25; // centimetres
const int motorSpeed = 170;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ENB, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);

  scanner.attach(servoPin);
  scanner.write(90);
  stopRobot();
  delay(800);
}

void loop() {
  int frontDistance = readDistance();

  if (frontDistance == 0 || frontDistance > safeDistance) {
    moveForward();
    return;
  }

  stopRobot();
  delay(250);
  moveBackward();
  delay(350);
  stopRobot();

  int leftDistance = lookAt(150);
  int rightDistance = lookAt(30);
  scanner.write(90);
  delay(250);

  if (leftDistance >= rightDistance) {
    turnLeft();
  } else {
    turnRight();
  }

  delay(500);
  stopRobot();
}

int lookAt(int angle) {
  scanner.write(angle);
  delay(450);
  return readDistance();
}

int readDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  unsigned long duration = pulseIn(echoPin, HIGH, 30000);

  if (duration == 0) {
    return 0; // no echo before timeout
  }

  return duration * 0.0343 / 2;
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
          <h2 className="text-2xl font-bold text-slate-900">Chapter 6 Quiz</h2>
          <p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p>
        </div>
      </div>
      <div className="mt-6 space-y-6">
        {questions.map((item, questionIndex) => (
          <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5">
            <legend className="px-2 font-bold text-slate-900">{questionIndex + 1}. {item.question}</legend>
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
                      name={`chapter-6-question-${questionIndex}`}
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

export default function ObstacleAvoidingRobotChapterPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <LessonHeader chapter={6} lesson={1} chapterTitle="Obstacle Avoiding Robot" />

      <div className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-3">
            <ChapterSidebar currentChapter={6} />
          </aside>

          <main className="col-span-12 space-y-6 lg:col-span-9">
            <section className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <PlayCircle className="text-blue-600" size={28} aria-hidden="true" />
                <div>
                  <h2 className="text-2xl font-bold">Obstacle Avoiding Robot</h2>
                  <p className="text-slate-500">Chapter 6 • Distance sensing and autonomous decisions</p>
                </div>
              </div>
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-emerald-950 p-8 text-center text-white">
                <div>
                  <Radar className="mx-auto text-emerald-300" size={64} aria-hidden="true" />
                  <h3 className="mt-5 text-2xl font-bold">Sense, decide and move</h3>
                  <p className="mt-3 text-emerald-100">Build an autonomous robot that detects obstacles and selects a clearer path.</p>
                </div>
              </div>
            </section>

            <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
              <header>
                <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 6</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Obstacle Avoiding Robot</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  This project combines the Arduino, L298N motor driver, two DC motors, an HC-SR04 ultrasonic
                  sensor and a small servo. The robot measures the space ahead, stops near an obstacle, scans
                  left and right, and turns toward the direction with more room.
                </p>
              </header>

              <section>
                <h3 className="text-2xl font-bold">Learning objectives</h3>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {[
                    "Explain ultrasonic time-of-flight measurement.",
                    "Connect and operate the HC-SR04 sensor.",
                    "Convert echo duration into distance.",
                    "Scan left and right with a servo.",
                    "Implement an autonomous avoidance algorithm.",
                    "Calibrate and test the robot safely.",
                  ].map((item) => (
                    <li key={item} className="rounded-xl border p-4">
                      <span className="mr-2 font-bold text-green-600">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="grid gap-5 md:grid-cols-3">
                <div className="rounded-2xl bg-blue-50 p-5">
                  <Eye className="text-blue-700" size={30} />
                  <h3 className="mt-3 text-xl font-bold">Sense</h3>
                  <p className="mt-2 text-slate-700">The ultrasonic sensor measures the nearest reflecting surface.</p>
                </div>
                <div className="rounded-2xl bg-purple-50 p-5">
                  <Bot className="text-purple-700" size={30} />
                  <h3 className="mt-3 text-xl font-bold">Decide</h3>
                  <p className="mt-2 text-slate-700">Arduino compares the measurement with a safe-distance threshold.</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-5">
                  <ScanLine className="text-emerald-700" size={30} />
                  <h3 className="mt-3 text-xl font-bold">Act</h3>
                  <p className="mt-2 text-slate-700">The motor driver moves or turns the robot toward the clearer path.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold">How ultrasonic distance sensing works</h3>
                <ol className="mt-4 space-y-3 text-slate-700">
                  <li className="rounded-xl border p-4"><strong>1. Trigger:</strong> Arduino sends a 10 μs HIGH pulse to TRIG.</li>
                  <li className="rounded-xl border p-4"><strong>2. Transmit:</strong> The sensor emits a short 40 kHz ultrasonic burst.</li>
                  <li className="rounded-xl border p-4"><strong>3. Reflect:</strong> Sound travels to an object and returns as an echo.</li>
                  <li className="rounded-xl border p-4"><strong>4. Measure:</strong> ECHO remains HIGH for the sound’s round-trip travel time.</li>
                  <li className="rounded-xl border p-4"><strong>5. Calculate:</strong> Distance = duration × 0.0343 ÷ 2, approximately in centimetres.</li>
                </ol>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Components and connections</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead><tr className="bg-slate-900 text-white"><th className="p-3">Component</th><th className="p-3">Connection</th><th className="p-3">Purpose</th></tr></thead>
                    <tbody className="divide-y">
                      {[
                        ["HC-SR04 VCC / GND", "Arduino 5V / common GND", "Sensor power"],
                        ["HC-SR04 TRIG", "Arduino pin 7", "Starts measurement"],
                        ["HC-SR04 ECHO", "Arduino pin 12", "Returns pulse duration"],
                        ["Servo signal", "Arduino pin 4", "Rotates the sensor"],
                        ["L298N ENA / ENB", "Arduino PWM pins 5 / 6", "Motor speed"],
                        ["L298N IN1–IN4", "Arduino pins 8–11", "Motor direction"],
                        ["Motor supply", "Suitable external battery", "Motor power"],
                        ["All grounds", "Joined together", "Common signal reference"],
                      ].map(([part, connection, purpose]) => (
                        <tr key={part}><td className="p-3 font-semibold">{part}</td><td className="p-3 text-slate-600">{connection}</td><td className="p-3 text-slate-600">{purpose}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="text-amber-700" size={28} />
                  <h3 className="text-xl font-bold">Power and mounting precautions</h3>
                </div>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• A servo can cause voltage dips; use a suitable regulated supply when necessary.</li>
                  <li>• Join the servo, Arduino, sensor and motor-driver grounds.</li>
                  <li>• Mount the HC-SR04 level, with an unobstructed forward view.</li>
                  <li>• Ensure the servo bracket and wires cannot touch the wheels.</li>
                  <li>• Disconnect all power before changing connections.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Avoidance decision sequence</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {[
                    ["Clear path", "If distance is above the threshold, continue forward."],
                    ["Obstacle detected", "Stop, then reverse briefly to create turning space."],
                    ["Scan", "Move the sensor left and right and measure both directions."],
                    ["Choose", "Turn toward the side with the greater measured distance."],
                    ["Recover", "Centre the sensor, stop briefly and resume forward sensing."],
                    ["Fail-safe", "Use a timeout so a missing echo cannot block the program."],
                  ].map(([title, description]) => (
                    <div key={title} className="rounded-xl border p-5">
                      <h4 className="font-bold">{title}</h4>
                      <p className="mt-2 text-slate-600">{description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Code2 className="text-green-700" size={28} />
                  <h3 className="text-2xl font-bold">Complete Arduino program</h3>
                </div>
                <p className="mt-3 leading-7 text-slate-600">
                  Start with the robot raised so the wheels rotate freely. If forward movement is reversed on one
                  side, disconnect power and swap that motor’s two output wires.
                </p>
                <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-green-300"><code>{robotCode}</code></pre>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Gauge className="text-purple-700" size={28} />
                  <h3 className="text-2xl font-bold">Calibration</h3>
                </div>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead><tr className="bg-blue-700 text-white"><th className="p-3">Parameter</th><th className="p-3">Starting value</th><th className="p-3">Adjustment</th></tr></thead>
                    <tbody className="divide-y">
                      {[
                        ["safeDistance", "25 cm", "Increase for faster robots or slow response"],
                        ["motorSpeed", "170", "Reduce if the robot cannot stop or turn reliably"],
                        ["Reverse time", "350 ms", "Increase only if more turning clearance is needed"],
                        ["Turn time", "500 ms", "Tune until turns are approximately correct"],
                        ["Servo angles", "30° / 150°", "Limit them if the bracket or wires bind"],
                        ["Scan delay", "450 ms", "Allow enough time for the servo to settle"],
                      ].map(([parameter, value, adjustment]) => (
                        <tr key={parameter}><td className="p-3 font-mono font-semibold">{parameter}</td><td className="p-3">{value}</td><td className="p-3 text-slate-600">{adjustment}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Wrench className="text-slate-700" size={28} />
                  <h3 className="text-2xl font-bold">Troubleshooting</h3>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {[
                    ["Always reads zero", "Check TRIG/ECHO wiring, common ground and pulseIn timeout."],
                    ["Distance jumps", "Keep the sensor stable, avoid angled soft surfaces and compare repeated readings."],
                    ["Servo causes resets", "Use a suitable regulated servo supply and add decoupling."],
                    ["Robot hits obstacles", "Increase threshold, reduce speed or shorten the control loop."],
                    ["Robot turns repeatedly", "Check sensor mounting and whether side measurements are valid."],
                    ["Motors behave incorrectly", "Verify L298N pins, ENA/ENB jumpers, polarity and battery voltage."],
                  ].map(([problem, solution]) => (
                    <div key={problem} className="rounded-xl border p-5">
                      <h4 className="font-bold">{problem}</h4>
                      <p className="mt-2 text-slate-600">{solution}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-red-50 p-6">
                <h3 className="text-2xl font-bold">Sensor limitations</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Ultrasonic sensors can struggle with soft materials, narrow objects, angled surfaces, nearby
                  ultrasonic sensors and objects outside their useful range. An autonomous robot should move at a
                  speed that leaves enough distance to react even when a measurement is imperfect.
                </p>
              </section>

              <section className="rounded-2xl bg-slate-900 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Lightbulb className="text-yellow-300" size={26} />
                  <h3 className="text-2xl font-bold">Chapter activity</h3>
                </div>
                <p className="mt-3 text-slate-200">
                  Create a safe test course using large cardboard obstacles. Record ten measured distances against
                  ruler measurements, calculate the typical error, then test thresholds of 15, 25 and 35 cm.
                  Identify the lowest threshold that still prevents contact at your selected motor speed.
                </p>
              </section>

              <section className="rounded-2xl bg-blue-50 p-6">
                <h3 className="text-2xl font-bold">Chapter summary</h3>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• HC-SR04 distance is calculated from ultrasonic round-trip time.</li>
                  <li>• A servo lets one sensor compare the space to the left and right.</li>
                  <li>• The controller repeatedly senses, decides and commands the motors.</li>
                  <li>• Threshold, speed and movement timing require practical calibration.</li>
                  <li>• Safe power, common ground and fail-safe handling improve reliability.</li>
                </ul>
              </section>
            </article>

            <ChapterQuiz />

            <nav className="flex justify-between gap-4">
              <Link to="/courses/robotics-foundation/learn/chapter-5" className="rounded-xl border bg-white px-5 py-3 font-semibold hover:bg-slate-50">
                ← Chapter 5
              </Link>
              <Link to="/courses/robotics-foundation/learn/chapter-7" className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
                Chapter 7 →
              </Link>
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}

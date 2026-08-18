import { useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleHelp,
  Code2,
  Contrast,
  Gauge,
  Lightbulb,
  Map,
  PlayCircle,
  RotateCcw,
  Route,
  Sensors,
  ShieldAlert,
  SlidersHorizontal,
  Wrench,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import LessonHeader from "../components/LessonHeader";
import ChapterSidebar from "../components/ChapterSidebar";

const questions = [
  { question: "How does a common IR line sensor distinguish a dark line from a light surface?", options: ["By reflected infrared light", "By ultrasonic echo", "By Bluetooth strength", "By motor current"], answer: 0 },
  { question: "Why must the sensor output be tested before final programming?", options: ["Some modules report black as LOW and others as HIGH", "Arduino has no digital inputs", "It changes the battery voltage", "The wheels select the logic"], answer: 0 },
  { question: "What should the robot normally do when both sensors are positioned correctly around the line?", options: ["Move forward", "Reverse", "Stop permanently", "Spin continuously"], answer: 0 },
  { question: "If the left sensor detects the line, what correction is commonly required?", options: ["Steer left toward the line", "Steer right away from it", "Disable both motors", "Increase battery voltage"], answer: 0 },
  { question: "Why are the sensors mounted close to the floor?", options: ["To obtain reliable reflected-light readings", "To cool the motors", "To improve Bluetooth range", "To power the L298N"], answer: 0 },
  { question: "What does PWM control in this robot?", options: ["Motor speed", "IR wavelength", "Track colour", "Arduino memory"], answer: 0 },
  { question: "What can happen if the robot moves too quickly?", options: ["It may overshoot turns and lose the line", "The line becomes brighter", "The sensors become ultrasonic", "The code uploads faster"], answer: 0 },
  { question: "What should a recovery routine use when both sensors lose the line?", options: ["The last known error direction", "A random voltage", "The HC-05 PIN", "No motor commands"], answer: 0 },
  { question: "What does proportional steering improve?", options: ["Smoothness by varying correction with error", "Battery charging", "Sensor power voltage", "Wireless pairing"], answer: 0 },
  { question: "What is essential before modifying sensor or motor wiring?", options: ["Disconnect power", "Set PWM to 255", "Place the robot on stairs", "Short the outputs"], answer: 0 },
];

const lineFollowerCode = `const int leftSensor = 2;
const int rightSensor = 3;

const int ENA = 5;
const int IN1 = 8;
const int IN2 = 9;
const int ENB = 6;
const int IN3 = 10;
const int IN4 = 11;

const int baseSpeed = 165;
const int turnSpeed = 190;

// Change LOW to HIGH if your module reports black as HIGH.
const int LINE_DETECTED = LOW;

int lastDirection = 0; // -1 = left, 1 = right

void setup() {
  pinMode(leftSensor, INPUT);
  pinMode(rightSensor, INPUT);

  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ENB, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);

  stopRobot();
}

void loop() {
  bool leftOnLine = digitalRead(leftSensor) == LINE_DETECTED;
  bool rightOnLine = digitalRead(rightSensor) == LINE_DETECTED;

  if (!leftOnLine && !rightOnLine) {
    moveForward(baseSpeed, baseSpeed);
  } else if (leftOnLine && !rightOnLine) {
    lastDirection = -1;
    steerLeft();
  } else if (!leftOnLine && rightOnLine) {
    lastDirection = 1;
    steerRight();
  } else {
    recoverLine();
  }
}

void moveForward(int leftSpeed, int rightSpeed) {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  analogWrite(ENA, leftSpeed);
  analogWrite(ENB, rightSpeed);
}

void steerLeft() {
  moveForward(80, turnSpeed);
}

void steerRight() {
  moveForward(turnSpeed, 80);
}

void recoverLine() {
  if (lastDirection < 0) {
    digitalWrite(IN1, LOW);
    digitalWrite(IN2, HIGH);
    digitalWrite(IN3, HIGH);
    digitalWrite(IN4, LOW);
  } else {
    digitalWrite(IN1, HIGH);
    digitalWrite(IN2, LOW);
    digitalWrite(IN3, LOW);
    digitalWrite(IN4, HIGH);
  }

  analogWrite(ENA, 130);
  analogWrite(ENB, 130);
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
          <h2 className="text-2xl font-bold text-slate-900">Chapter 7 Quiz</h2>
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
                      name={`chapter-7-question-${questionIndex}`}
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

export default function LineFollowingRobotChapterPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <LessonHeader chapter={7} lesson={1} chapterTitle="Line Following Robot" />
      <div className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-3">
            <ChapterSidebar currentChapter={7} />
          </aside>

          <main className="col-span-12 space-y-6 lg:col-span-9">
            <section className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <PlayCircle className="text-blue-600" size={28} />
                <div>
                  <h2 className="text-2xl font-bold">Line Following Robot</h2>
                  <p className="text-slate-500">Chapter 7 • Reflectance sensing and closed-loop steering</p>
                </div>
              </div>
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 via-purple-950 to-blue-950 p-8 text-center text-white">
                <div>
                  <Route className="mx-auto text-cyan-300" size={64} />
                  <h3 className="mt-5 text-2xl font-bold">Follow a path automatically</h3>
                  <p className="mt-3 text-cyan-100">Detect contrast, calculate direction error and correct the robot continuously.</p>
                </div>
              </div>
            </section>

            <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
              <header>
                <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 7</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Line Following Robot</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  A line-following robot uses downward-facing infrared reflectance sensors to distinguish a dark
                  track from a lighter background. Arduino reads the sensor pattern and changes the two motor
                  speeds so the robot repeatedly corrects its position over the line.
                </p>
              </header>

              <section>
                <h3 className="text-2xl font-bold">Learning objectives</h3>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {[
                    "Explain infrared reflectance sensing.",
                    "Calibrate sensors for the track surface.",
                    "Interpret two-sensor line patterns.",
                    "Control differential steering with PWM.",
                    "Implement line-loss recovery logic.",
                    "Tune the robot for smooth path tracking.",
                  ].map((item) => (
                    <li key={item} className="rounded-xl border p-4">
                      <span className="mr-2 font-bold text-green-600">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="grid gap-5 md:grid-cols-3">
                <div className="rounded-2xl bg-blue-50 p-5">
                  <Contrast className="text-blue-700" size={30} />
                  <h3 className="mt-3 text-xl font-bold">Detect contrast</h3>
                  <p className="mt-2 text-slate-700">Light surfaces usually reflect more IR energy than dark surfaces.</p>
                </div>
                <div className="rounded-2xl bg-purple-50 p-5">
                  <Sensors className="text-purple-700" size={30} />
                  <h3 className="mt-3 text-xl font-bold">Estimate error</h3>
                  <p className="mt-2 text-slate-700">The left/right pattern shows which way the robot has drifted.</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-5">
                  <SlidersHorizontal className="text-emerald-700" size={30} />
                  <h3 className="mt-3 text-xl font-bold">Correct motion</h3>
                  <p className="mt-2 text-slate-700">Different wheel speeds steer the chassis back toward the line.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold">How an IR line sensor works</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  Each channel contains an infrared emitter and receiver. The receiver detects reflected infrared
                  light, and a comparator converts the measurement to a digital output. Many modules include a
                  potentiometer for the switching threshold. Output polarity varies: verify whether your sensor
                  reports a dark line as LOW or HIGH.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Components and wiring</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead><tr className="bg-slate-900 text-white"><th className="p-3">Connection</th><th className="p-3">Arduino / driver pin</th><th className="p-3">Purpose</th></tr></thead>
                    <tbody className="divide-y">
                      {[
                        ["Left sensor OUT", "Digital pin 2", "Left-side line state"],
                        ["Right sensor OUT", "Digital pin 3", "Right-side line state"],
                        ["Sensor VCC / GND", "5V / common GND", "Sensor power"],
                        ["L298N ENA / ENB", "PWM pins 5 / 6", "Left/right motor speed"],
                        ["L298N IN1–IN4", "Pins 8–11", "Motor direction"],
                        ["Motor supply", "Suitable external battery", "Motor current"],
                        ["All grounds", "Connected together", "Shared logic reference"],
                      ].map(([connection, pin, purpose]) => (
                        <tr key={connection}><td className="p-3 font-semibold">{connection}</td><td className="p-3 font-mono text-slate-600">{pin}</td><td className="p-3 text-slate-600">{purpose}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="text-amber-700" size={28} />
                  <h3 className="text-xl font-bold">Sensor mounting and calibration</h3>
                </div>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• Mount both sensors at equal height, typically a few millimetres above the track.</li>
                  <li>• Position them symmetrically so the line passes between or beneath them as intended.</li>
                  <li>• Test outputs over both the line and background before running the motors.</li>
                  <li>• Adjust module potentiometers until each output switches reliably.</li>
                  <li>• Shield the sensors from strong sunlight if it causes unstable readings.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Two-sensor decision table</h3>
                <p className="mt-3 text-slate-600">The following example assumes a dark line produces LOW and the sensors straddle the track.</p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead><tr className="bg-blue-700 text-white"><th className="p-3">Left</th><th className="p-3">Right</th><th className="p-3">Interpretation</th><th className="p-3">Action</th></tr></thead>
                    <tbody className="divide-y">
                      {[
                        ["HIGH", "HIGH", "Line remains between sensors", "Move forward"],
                        ["LOW", "HIGH", "Line under left sensor", "Steer left"],
                        ["HIGH", "LOW", "Line under right sensor", "Steer right"],
                        ["LOW", "LOW", "Wide line, crossing or lost state", "Recover using last direction"],
                      ].map((row) => (
                        <tr key={row.join("-")}>{row.map((cell, index) => <td key={cell} className={`p-3 ${index < 2 ? "font-mono font-semibold" : "text-slate-600"}`}>{cell}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Code2 className="text-green-700" size={28} />
                  <h3 className="text-2xl font-bold">Complete Arduino program</h3>
                </div>
                <p className="mt-3 leading-7 text-slate-600">
                  Confirm the sensor polarity and motor directions before testing. Change LINE_DETECTED if your
                  module uses the opposite output convention.
                </p>
                <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-green-300"><code>{lineFollowerCode}</code></pre>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Gauge className="text-purple-700" size={28} />
                  <h3 className="text-2xl font-bold">Tuning for smooth tracking</h3>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {[
                    ["Base speed", "Start slowly. Increase only after the robot follows straights and curves reliably."],
                    ["Correction strength", "Increase the difference between left and right PWM if turns are too weak."],
                    ["Sensor spacing", "Wider spacing sees large errors earlier but can reduce precision on narrow tracks."],
                    ["Sensor height", "Too high reduces contrast; too low may strike the floor."],
                    ["Track design", "Use a matte, high-contrast line with gradual curves during initial tests."],
                    ["Loop delay", "Avoid unnecessary delays because frequent corrections improve tracking."],
                  ].map(([title, description]) => (
                    <div key={title} className="rounded-xl border p-5">
                      <h4 className="font-bold">{title}</h4>
                      <p className="mt-2 text-slate-600">{description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-purple-50 p-6">
                <h3 className="text-2xl font-bold">From on/off control to proportional control</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Two digital sensors provide only a few steering states. A multi-sensor array with analogue or
                  weighted readings can estimate line position more precisely. Proportional control calculates a
                  correction from the position error, then increases one motor speed while reducing the other.
                  PID control can add accumulated and rate-of-change terms for more advanced performance.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Wrench className="text-slate-700" size={28} />
                  <h3 className="text-2xl font-bold">Troubleshooting</h3>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {[
                    ["Robot steers away", "Swap sensor logic or reverse the left/right correction actions."],
                    ["Outputs never change", "Check height, alignment, VCC/GND and comparator threshold."],
                    ["Robot oscillates", "Reduce speed or correction strength and increase sensing frequency."],
                    ["Fails on curves", "Use wider curves, lower speed or improve sensor placement."],
                    ["One wheel dominates", "Calibrate separate PWM values for motor differences."],
                    ["Readings change in sunlight", "Shield sensors and recalibrate under actual lighting."],
                  ].map(([problem, solution]) => (
                    <div key={problem} className="rounded-xl border p-5">
                      <h4 className="font-bold">{problem}</h4>
                      <p className="mt-2 text-slate-600">{solution}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-red-50 p-6">
                <h3 className="text-2xl font-bold">Safe testing</h3>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• Verify sensor states and wheel directions with the chassis raised first.</li>
                  <li>• Test on a flat, open floor away from stairs and people.</li>
                  <li>• Begin at low speed and keep a power switch within easy reach.</li>
                  <li>• Disconnect power before changing sensor or motor wiring.</li>
                </ul>
              </section>

              <section className="rounded-2xl bg-slate-900 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Map className="text-yellow-300" size={26} />
                  <h3 className="text-2xl font-bold">Chapter activity</h3>
                </div>
                <p className="mt-3 text-slate-200">
                  Build a matte black track on a light surface containing a straight, gentle left curve, gentle
                  right curve and one crossing. Record performance at PWM values 120, 160 and 200. For each speed,
                  count line losses and measure completion time, then select the fastest reliable setting.
                </p>
              </section>

              <section className="rounded-2xl bg-blue-50 p-6">
                <h3 className="text-2xl font-bold">Chapter summary</h3>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• IR reflectance sensors distinguish a dark line from a light background.</li>
                  <li>• Sensor polarity, height, spacing and threshold must be calibrated.</li>
                  <li>• Differential motor speed produces steering corrections.</li>
                  <li>• Lower speed and frequent sensing generally improve reliable tracking.</li>
                  <li>• Multi-sensor proportional or PID control enables smoother advanced robots.</li>
                </ul>
              </section>
            </article>

            <ChapterQuiz />

            <nav className="flex justify-between gap-4">
              <Link to="/courses/robotics-foundation/learn/chapter-6" className="rounded-xl border bg-white px-5 py-3 font-semibold hover:bg-slate-50">
                ← Chapter 6
              </Link>
              <span className="rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-500">
                Chapter 8 coming next
              </span>
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}

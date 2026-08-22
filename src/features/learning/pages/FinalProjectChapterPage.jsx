import { useMemo, useState } from "react";
import {
  Award,
  Bluetooth,
  Bot,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  Code2,
  Flag,
  Lightbulb,
  ListChecks,
  PlayCircle,
  Radar,
  RotateCcw,
  ShieldAlert,
  Wrench,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import LessonHeader from "../components/LessonHeader";
import ChapterSidebar from "../components/ChapterSidebar";
import ChapterVideoManager from "../components/ChapterVideoManager";

const questions = [
  { question: "What is the main purpose of the final project?", options: ["Integrate course skills into a tested robot system", "Use the maximum number of components", "Avoid documentation", "Replace safety checks"], answer: 0 },
  { question: "Which command selects autonomous mode in the supplied program?", options: ["A", "M", "S", "F"], answer: 0 },
  { question: "What should happen whenever the operating mode changes?", options: ["The robot should stop before the new mode begins", "Both motors should run at full speed", "The sensor should be disconnected", "The watchdog should be removed"], answer: 0 },
  { question: "Why should subsystems be tested separately first?", options: ["It isolates faults before integration", "It increases battery voltage", "It eliminates the need for code", "It guarantees certification"], answer: 0 },
  { question: "What is the manual-control watchdog for?", options: ["Stopping motion if fresh commands stop arriving", "Measuring distance", "Pairing the HC-05", "Changing servo angle"], answer: 0 },
  { question: "Why must acceptance criteria be measurable?", options: ["They make success objectively testable", "They hide failures", "They replace wiring", "They prevent iteration"], answer: 0 },
  { question: "What belongs in the project evidence?", options: ["Wiring, code, tests, results and limitations", "Only a finished photograph", "Only successful quiz answers", "No failure records"], answer: 0 },
  { question: "What should be done after changing wiring?", options: ["Reinspect before applying power", "Immediately test at maximum speed", "Remove common ground", "Bypass the driver"], answer: 0 },
  { question: "Why document known limitations?", options: ["To communicate operating boundaries honestly", "To reduce motor speed", "To avoid testing", "To increase model confidence"], answer: 0 },
  { question: "What is the correct response to a hot driver or damaged wire?", options: ["Disconnect power and investigate", "Continue testing", "Increase PWM", "Touch the heat sink immediately"], answer: 0 },
];

const finalProjectCode = `#include <Servo.h>
#include <SoftwareSerial.h>

SoftwareSerial bluetooth(2, 3); // Arduino RX, TX
Servo scanner;

const int servoPin = 4;
const int ENA = 5;
const int ENB = 6;
const int trigPin = 7;
const int IN1 = 8;
const int IN2 = 9;
const int IN3 = 10;
const int IN4 = 11;
const int echoPin = 12;

const int safeDistance = 25;
const int manualSpeed = 175;
const int autoSpeed = 155;
const unsigned long manualTimeout = 2000;

enum RobotMode { MANUAL, AUTONOMOUS };
RobotMode mode = MANUAL;

unsigned long lastManualCommand = 0;
bool robotMoving = false;

void setup() {
  Serial.begin(9600);
  bluetooth.begin(9600);

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ENA, OUTPUT);
  pinMode(ENB, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);

  scanner.attach(servoPin);
  scanner.write(90);
  stopRobot();
  delay(700);
}

void loop() {
  readBluetooth();

  if (mode == AUTONOMOUS) {
    runAutonomousStep();
  } else if (robotMoving &&
             millis() - lastManualCommand > manualTimeout) {
    stopRobot();
  }
}

void readBluetooth() {
  while (bluetooth.available()) {
    char command = bluetooth.read();

    if (command == 'M' || command == 'm') {
      stopRobot();
      mode = MANUAL;
    } else if (command == 'A' || command == 'a') {
      stopRobot();
      mode = AUTONOMOUS;
    } else if (mode == MANUAL) {
      handleManualCommand(command);
    }
  }
}

void handleManualCommand(char command) {
  lastManualCommand = millis();

  switch (command) {
    case 'F': case 'f': moveForward(manualSpeed); break;
    case 'B': case 'b': moveBackward(manualSpeed); break;
    case 'L': case 'l': turnLeft(manualSpeed); break;
    case 'R': case 'r': turnRight(manualSpeed); break;
    case 'S': case 's': stopRobot(); break;
    default: stopRobot(); break;
  }
}

void runAutonomousStep() {
  int front = readDistance();

  if (front == 0 || front > safeDistance) {
    moveForward(autoSpeed);
    return;
  }

  stopRobot();
  delay(200);
  moveBackward(autoSpeed);
  delay(300);
  stopRobot();

  int left = lookAt(150);
  int right = lookAt(30);
  scanner.write(90);
  delay(200);

  if (left >= right) {
    turnLeft(autoSpeed);
  } else {
    turnRight(autoSpeed);
  }

  delay(450);
  stopRobot();
}

int lookAt(int angle) {
  scanner.write(angle);
  delay(400);
  return readDistance();
}

int readDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  unsigned long duration = pulseIn(echoPin, HIGH, 30000);
  if (duration == 0) return 0;

  return duration * 0.0343 / 2;
}

void setForwardDirection() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void moveForward(int speedValue) {
  setForwardDirection();
  analogWrite(ENA, speedValue);
  analogWrite(ENB, speedValue);
  robotMoving = true;
}

void moveBackward(int speedValue) {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  analogWrite(ENA, speedValue);
  analogWrite(ENB, speedValue);
  robotMoving = true;
}

void turnLeft(int speedValue) {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  analogWrite(ENA, speedValue);
  analogWrite(ENB, speedValue);
  robotMoving = true;
}

void turnRight(int speedValue) {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  analogWrite(ENA, speedValue);
  analogWrite(ENB, speedValue);
  robotMoving = true;
}

void stopRobot() {
  analogWrite(ENA, 0);
  analogWrite(ENB, 0);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
  robotMoving = false;
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
        <CircleHelp className="text-blue-600" size={30} />
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Chapter 10 Quiz</h2>
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
                      name={`chapter-10-question-${questionIndex}`}
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

export default function FinalProjectChapterPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <LessonHeader chapter={10} lesson={1} chapterTitle="Final Project" />
      <div className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-3">
            <ChapterSidebar currentChapter={10} />
          </aside>

          <main className="col-span-12 space-y-6 lg:col-span-9">
            <section className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <PlayCircle className="text-blue-600" size={28} />
                <div>
                  <h2 className="text-2xl font-bold">Final Project</h2>
                  <p className="text-slate-500">Chapter 10 • Multi-mode mobile robot capstone</p>
                </div>
              </div>
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-emerald-950 p-8 text-center text-white">
                <div>
                  <Award className="mx-auto text-yellow-300" size={64} />
                  <h3 className="mt-5 text-2xl font-bold">Build, integrate, test and demonstrate</h3>
                  <p className="mt-3 text-emerald-100">Combine manual Bluetooth control and autonomous obstacle avoidance in one documented robot.</p>
                </div>
              </div>
              <ChapterVideoManager chapter={10} />
            </section>

            <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
              <header>
                <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 10</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Final Project: Multi-Mode Mobile Robot</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  The capstone integrates the core skills from the course into one system. Your robot must operate
                  in manual Bluetooth mode and autonomous obstacle-avoidance mode, switch modes safely, stop after
                  communication loss, and be supported by clear design and testing evidence.
                </p>
              </header>

              <section>
                <h3 className="text-2xl font-bold">Project outcomes</h3>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {[
                    "Translate requirements into a system design.",
                    "Integrate Arduino, L298N, motors, HC-05, HC-SR04 and servo.",
                    "Implement manual and autonomous operating modes.",
                    "Apply fail-safe stop and communication timeout logic.",
                    "Test subsystems before complete-system trials.",
                    "Present evidence, results, limitations and improvements.",
                  ].map((item) => (
                    <li key={item} className="rounded-xl border p-4">
                      <span className="mr-2 font-bold text-green-600">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl bg-blue-50 p-6">
                <div className="flex items-center gap-3">
                  <Flag className="text-blue-700" size={30} />
                  <h3 className="text-2xl font-bold">Project challenge</h3>
                </div>
                <p className="mt-3 leading-7 text-slate-700">
                  Build a two-wheel robot controlled by a phone in Manual mode. Command A must stop the robot and
                  activate Autonomous mode, where it detects obstacles, scans both sides and chooses a clearer path.
                  Command M must stop the robot and return control to Manual mode.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Minimum functional requirements</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {[
                    ["Manual movement", "F, B, L, R and S commands operate correctly through Bluetooth."],
                    ["Autonomous avoidance", "Robot stops before a large obstacle and selects a clearer direction."],
                    ["Safe mode change", "Motors stop before switching between Manual and Autonomous modes."],
                    ["Communication watchdog", "Manual movement stops if fresh commands are not received."],
                    ["Power integrity", "Motors use a suitable supply and all signal circuits share ground."],
                    ["Accessible stop", "A phone stop control and physical power switch remain accessible."],
                  ].map(([title, description]) => (
                    <div key={title} className="rounded-xl border p-5">
                      <h4 className="font-bold">{title}</h4>
                      <p className="mt-2 text-slate-600">{description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Bill of materials</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead><tr className="bg-slate-900 text-white"><th className="p-3">Item</th><th className="p-3">Quantity</th><th className="p-3">Role</th></tr></thead>
                    <tbody className="divide-y">
                      {[
                        ["Arduino Uno or compatible board", "1", "Controller"],
                        ["L298N motor-driver module", "1", "Motor power and direction"],
                        ["Geared DC motors and wheels", "2", "Differential drive"],
                        ["Caster wheel and chassis", "1 each", "Mechanical platform"],
                        ["HC-05/HC-06 Bluetooth module", "1", "Manual commands"],
                        ["HC-SR04 ultrasonic sensor", "1", "Obstacle distance"],
                        ["Micro servo and sensor bracket", "1", "Left/right scanning"],
                        ["Suitable battery, switch and wiring", "As required", "Safe power distribution"],
                        ["Voltage-divider resistors", "2", "Bluetooth RX logic protection"],
                      ].map(([item, quantity, role]) => (
                        <tr key={item}><td className="p-3 font-semibold">{item}</td><td className="p-3">{quantity}</td><td className="p-3 text-slate-600">{role}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Pin allocation</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead><tr className="bg-blue-700 text-white"><th className="p-3">Arduino pin</th><th className="p-3">Connection</th><th className="p-3">Function</th></tr></thead>
                    <tbody className="divide-y">
                      {[
                        ["2 / 3", "HC-05 TXD / RXD", "SoftwareSerial RX/TX; protect module RXD"],
                        ["4", "Servo signal", "Ultrasonic scan angle"],
                        ["5 / 6", "L298N ENA / ENB", "Motor PWM"],
                        ["7 / 12", "HC-SR04 TRIG / ECHO", "Distance measurement"],
                        ["8–11", "L298N IN1–IN4", "Motor direction"],
                        ["5V / GND", "Logic modules / common ground", "Use ratings and power plan"],
                      ].map(([pin, connection, purpose]) => (
                        <tr key={pin}><td className="p-3 font-mono font-semibold">{pin}</td><td className="p-3 text-slate-600">{connection}</td><td className="p-3 text-slate-600">{purpose}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold">System architecture</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    [Bluetooth, "Manual input", "Phone → HC-05 → Arduino command parser"],
                    [Radar, "Autonomous input", "HC-SR04 + servo → distance and direction"],
                    [Bot, "Controller", "Mode manager → safety checks → movement functions"],
                    [Wrench, "Actuation", "Arduino → L298N → left and right motors"],
                    [ShieldAlert, "Safety", "Stop command, mode stop, timeout and physical switch"],
                    [ClipboardCheck, "Evidence", "Test records, results, video and documented limitations"],
                  ].map(([Icon, title, description]) => (
                    <div key={title} className="rounded-2xl border p-5">
                      <Icon className="text-blue-700" size={28} />
                      <h4 className="mt-3 font-bold">{title}</h4>
                      <p className="mt-2 text-sm text-slate-600">{description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="text-amber-700" size={28} />
                  <h3 className="text-xl font-bold">Mandatory safety review</h3>
                </div>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• Disconnect battery and USB before changing wiring.</li>
                  <li>• Verify polarity, voltage ratings, common ground and absence of shorts.</li>
                  <li>• Secure the battery, wires, sensor bracket and all moving parts.</li>
                  <li>• Run first tests with wheels lifted and motor speed reduced.</li>
                  <li>• Use a flat area away from stairs, traffic, people, pets and fragile items.</li>
                  <li>• Stop immediately if components become hot, damaged or unstable.</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Code2 className="text-green-700" size={28} />
                  <h3 className="text-2xl font-bold">Complete integrated Arduino program</h3>
                </div>
                <p className="mt-3 leading-7 text-slate-600">
                  Upload only after completing the wiring review. Commands M and A select modes; F, B, L, R and S
                  control Manual mode. Tune distance, speed and movement timings for your actual chassis.
                </p>
                <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-green-300"><code>{finalProjectCode}</code></pre>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <ListChecks className="text-indigo-700" size={28} />
                  <h3 className="text-2xl font-bold">Staged build and test plan</h3>
                </div>
                <ol className="mt-4 space-y-3 text-slate-700">
                  <li className="rounded-xl border p-4"><strong>Stage 1 — Mechanical:</strong> Check alignment, free wheel rotation, stable caster and secure battery.</li>
                  <li className="rounded-xl border p-4"><strong>Stage 2 — Motors:</strong> Test stop, forward, backward and turns with the chassis lifted.</li>
                  <li className="rounded-xl border p-4"><strong>Stage 3 — Bluetooth:</strong> Verify pairing, every manual command, unknown-command stop and timeout.</li>
                  <li className="rounded-xl border p-4"><strong>Stage 4 — Sensing:</strong> Compare ultrasonic readings with ruler distances and verify servo angles.</li>
                  <li className="rounded-xl border p-4"><strong>Stage 5 — Autonomous:</strong> Tune threshold, reverse time and turn time at low speed.</li>
                  <li className="rounded-xl border p-4"><strong>Stage 6 — Integration:</strong> Run repeated mode-switching and complete-system acceptance tests.</li>
                </ol>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Acceptance tests</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead><tr className="bg-emerald-700 text-white"><th className="p-3">Test</th><th className="p-3">Pass condition</th><th className="p-3">Trials</th></tr></thead>
                    <tbody className="divide-y">
                      {[
                        ["Manual controls", "All five commands produce correct actions", "10 each"],
                        ["Mode switching", "Robot stops before changing mode", "10 switches"],
                        ["Watchdog", "Manual movement stops after communication ceases", "5 trials"],
                        ["Obstacle stop", "No contact with a large flat obstacle", "10 approaches"],
                        ["Direction choice", "Turns toward the side measured as clearer", "10 trials"],
                        ["Endurance", "Operates without unsafe heat or loose connections", "10 minutes"],
                      ].map(([test, pass, trials]) => (
                        <tr key={test}><td className="p-3 font-semibold">{test}</td><td className="p-3 text-slate-600">{pass}</td><td className="p-3">{trials}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Project documentation checklist</h3>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {[
                    "Project title, goal and measurable requirements",
                    "System block diagram and final wiring diagram",
                    "Bill of materials and power calculations",
                    "Commented final source code",
                    "Risk assessment and safety controls",
                    "Test table with expected and actual results",
                    "Photographs and short demonstration video",
                    "Problems found, fixes made and known limitations",
                    "Future improvements and personal reflection",
                    "Repository or submission link with clear file names",
                  ].map((item) => (
                    <li key={item} className="rounded-xl border p-4">
                      <span className="mr-2 font-bold text-blue-600">□</span>{item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Assessment rubric</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead><tr className="bg-slate-900 text-white"><th className="p-3">Category</th><th className="p-3">Weight</th><th className="p-3">Evidence</th></tr></thead>
                    <tbody className="divide-y">
                      {[
                        ["Functional performance", "30%", "Manual and autonomous requirements pass"],
                        ["Engineering and integration", "20%", "Correct wiring, modular code and stable construction"],
                        ["Safety and reliability", "20%", "Risk controls, watchdog, stop behaviour and repeated tests"],
                        ["Testing and problem solving", "15%", "Measured results, calibration and justified fixes"],
                        ["Documentation", "10%", "Clear diagrams, code, records and limitations"],
                        ["Demonstration and reflection", "5%", "Concise explanation and realistic improvements"],
                      ].map(([category, weight, evidence]) => (
                        <tr key={category}><td className="p-3 font-semibold">{category}</td><td className="p-3 font-bold text-blue-700">{weight}</td><td className="p-3 text-slate-600">{evidence}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Wrench className="text-slate-700" size={28} />
                  <h3 className="text-2xl font-bold">Integration troubleshooting</h3>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {[
                    ["Manual works, autonomous fails", "Test distance and servo subsystems independently; check pin allocation."],
                    ["Mode changes unexpectedly", "Inspect serial input and require exact single-character commands."],
                    ["Arduino resets under load", "Improve power separation, battery capacity, grounding and decoupling."],
                    ["Obstacle is hit", "Increase threshold, reduce speed and verify fresh sensor readings."],
                    ["Robot curves in manual mode", "Calibrate separate motor PWM values and check alignment."],
                    ["Servo or driver overheats", "Disconnect power; inspect load, supply, wiring and mechanical binding."],
                  ].map(([problem, solution]) => (
                    <div key={problem} className="rounded-xl border p-5">
                      <h4 className="font-bold">{problem}</h4>
                      <p className="mt-2 text-slate-600">{solution}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-slate-900 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Lightbulb className="text-yellow-300" size={26} />
                  <h3 className="text-2xl font-bold">Extension challenges</h3>
                </div>
                <ul className="mt-4 space-y-2 text-slate-200">
                  <li>• Add wheel encoders and closed-loop speed balancing.</li>
                  <li>• Replace blocking delays with a non-blocking state machine.</li>
                  <li>• Add battery-voltage monitoring and a low-battery safe stop.</li>
                  <li>• Integrate line following as a third selectable mode.</li>
                  <li>• Add an edge-AI perception input with strict confidence and watchdog policies.</li>
                </ul>
              </section>

              <section className="rounded-2xl bg-blue-50 p-6">
                <h3 className="text-2xl font-bold">Course conclusion</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  You have progressed from robotics fundamentals and Arduino programming to sensing, motor control,
                  Bluetooth, autonomous navigation, line following, voice interfaces and AI integration. The final
                  project demonstrates the most important engineering habit: build in stages, measure performance,
                  document limitations and make physical systems fail safely.
                </p>
              </section>
            </article>

            <ChapterQuiz />

            <nav className="flex flex-wrap justify-between gap-4">
              <Link to="/courses/robotics-foundation/learn/chapter-9" className="rounded-xl border bg-white px-5 py-3 font-semibold hover:bg-slate-50">
                ← Chapter 9
              </Link>
              <Link to="/courses/robotics-foundation" className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">
                Course Overview ✓
              </Link>
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import {
  Bluetooth,
  CheckCircle2,
  CircleHelp,
  Code2,
  Lightbulb,
  MessageSquareText,
  Mic,
  PlayCircle,
  RotateCcw,
  ShieldAlert,
  Smartphone,
  Volume2,
  Wrench,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import LessonHeader from "../components/LessonHeader";
import ChapterSidebar from "../components/ChapterSidebar";

const questions = [
  { question: "Where is speech normally converted into a command in this project?", options: ["On the smartphone app", "Inside the L298N", "Inside the DC motor", "On the HC-05 antenna"], answer: 0 },
  { question: "What is the HC-05 responsible for?", options: ["Bluetooth serial communication", "Speech recognition", "Motor power switching", "Ultrasonic sensing"], answer: 0 },
  { question: "Why should voice phrases map to short command characters?", options: ["They are simple for Arduino to parse", "They increase motor voltage", "They remove the battery", "They calibrate sensors"], answer: 0 },
  { question: "What should an unrecognised command do?", options: ["Stop the robot", "Run at full speed", "Turn randomly", "Disable common ground"], answer: 0 },
  { question: "Why is a movement timeout useful?", options: ["It stops the robot if communication is lost", "It increases Bluetooth range", "It charges the phone", "It changes speech language"], answer: 0 },
  { question: "Which phrase maps to backward movement in this lesson?", options: ["backward", "forward", "stop", "right"], answer: 0 },
  { question: "Why can voice control fail in a noisy room?", options: ["The phone may recognise the phrase incorrectly", "The L298N becomes a microphone", "PWM stops Bluetooth", "Motors cannot reverse"], answer: 0 },
  { question: "What must Arduino, Bluetooth and motor-driver circuits share?", options: ["Common ground", "The same TX pin", "A 12V logic supply", "No reference connection"], answer: 0 },
  { question: "What should be tested before placing the robot on the floor?", options: ["Stop command and wheel directions", "Only the phone volume", "Maximum speed near stairs", "Live wiring changes"], answer: 0 },
  { question: "What improves recognition reliability?", options: ["Short distinct phrases and confirmation", "Long similar sentences", "Removing fail-safe logic", "Increasing motor current"], answer: 0 },
];

const voiceRobotCode = `#include <SoftwareSerial.h>

SoftwareSerial bluetooth(2, 3); // Arduino RX, TX

const int ENA = 5;
const int IN1 = 8;
const int IN2 = 9;
const int ENB = 6;
const int IN3 = 10;
const int IN4 = 11;

const int motorSpeed = 175;
const unsigned long movementTimeout = 1500;

unsigned long lastCommandTime = 0;
bool robotMoving = false;

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
    handleCommand(command);
  }

  if (robotMoving &&
      millis() - lastCommandTime > movementTimeout) {
    stopRobot();
  }
}

void handleCommand(char command) {
  lastCommandTime = millis();

  switch (command) {
    case 'F':
    case 'f':
      moveForward();
      break;

    case 'B':
    case 'b':
      moveBackward();
      break;

    case 'L':
    case 'l':
      turnLeft();
      break;

    case 'R':
    case 'r':
      turnRight();
      break;

    case 'S':
    case 's':
      stopRobot();
      break;

    default:
      stopRobot();
      break;
  }
}

void applySpeed() {
  analogWrite(ENA, motorSpeed);
  analogWrite(ENB, motorSpeed);
  robotMoving = true;
}

void moveForward() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  applySpeed();
}

void moveBackward() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  applySpeed();
}

void turnLeft() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  applySpeed();
}

void turnRight() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  applySpeed();
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
          <h2 className="text-2xl font-bold text-slate-900">Chapter 8 Quiz</h2>
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
                      name={`chapter-8-question-${questionIndex}`}
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

export default function VoiceControlledRobotChapterPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <LessonHeader chapter={8} lesson={1} chapterTitle="Voice Controlled Robot" />
      <div className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-3">
            <ChapterSidebar currentChapter={8} />
          </aside>

          <main className="col-span-12 space-y-6 lg:col-span-9">
            <section className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <PlayCircle className="text-blue-600" size={28} />
                <div>
                  <h2 className="text-2xl font-bold">Voice Controlled Robot</h2>
                  <p className="text-slate-500">Chapter 8 • Speech recognition and safe command control</p>
                </div>
              </div>
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 via-violet-950 to-fuchsia-950 p-8 text-center text-white">
                <div>
                  <Mic className="mx-auto text-fuchsia-300" size={64} />
                  <h3 className="mt-5 text-2xl font-bold">Turn spoken instructions into motion</h3>
                  <p className="mt-3 text-fuchsia-100">Recognise speech on a phone, transmit a command and control the robot safely.</p>
                </div>
              </div>
            </section>

            <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
              <header>
                <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 8</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Voice Controlled Robot</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Voice control adds a human-friendly interface to the Bluetooth robot. The smartphone performs
                  speech recognition, maps the recognised phrase to a short command, and sends that command through
                  the HC-05. Arduino does not recognise speech itself—it safely executes the received instruction.
                </p>
              </header>

              <section>
                <h3 className="text-2xl font-bold">Learning objectives</h3>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {[
                    "Describe the complete speech-to-motion pipeline.",
                    "Design clear voice phrases and command codes.",
                    "Configure a compatible voice-control application.",
                    "Parse Bluetooth commands on Arduino.",
                    "Implement stop, timeout and unknown-command fail-safes.",
                    "Measure and improve recognition reliability.",
                  ].map((item) => (
                    <li key={item} className="rounded-xl border p-4">
                      <span className="mr-2 font-bold text-green-600">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Voice-control system pipeline</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    [Mic, "1. Speak", "The phone microphone captures a short phrase."],
                    [MessageSquareText, "2. Recognise", "The app converts speech into text and selects a command."],
                    [Bluetooth, "3. Transmit", "HC-05 carries the command to Arduino over serial."],
                    [Volume2, "4. Execute", "Arduino drives the L298N and motors, or stops safely."],
                  ].map(([Icon, title, description]) => (
                    <div key={title} className="rounded-2xl border p-5">
                      <Icon className="text-blue-700" size={28} />
                      <h4 className="mt-3 font-bold">{title}</h4>
                      <p className="mt-2 text-sm text-slate-600">{description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-blue-50 p-6">
                <div className="flex items-center gap-3">
                  <Smartphone className="text-blue-700" size={30} />
                  <h3 className="text-2xl font-bold">Important architecture note</h3>
                </div>
                <p className="mt-3 leading-7 text-slate-700">
                  The HC-05 is only a wireless serial bridge. It does not understand spoken language. Recognition
                  quality, language support and whether internet access is needed depend on the phone and selected
                  application. Use an application that can map recognised phrases to exact Bluetooth characters.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Voice phrases and command protocol</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead><tr className="bg-slate-900 text-white"><th className="p-3">Spoken phrase</th><th className="p-3">Sent character</th><th className="p-3">Robot action</th></tr></thead>
                    <tbody className="divide-y">
                      {[
                        ["forward", "F", "Move forward"],
                        ["backward", "B", "Move backward"],
                        ["turn left", "L", "Turn left"],
                        ["turn right", "R", "Turn right"],
                        ["stop", "S", "Stop immediately"],
                      ].map(([phrase, command, action]) => (
                        <tr key={phrase}><td className="p-3 font-semibold">{phrase}</td><td className="p-3 font-mono text-blue-700">{command}</td><td className="p-3 text-slate-600">{action}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-slate-600">
                  Short, distinct phrases reduce confusion. Avoid commands that sound similar, and always provide a prominent manual stop control.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Hardware connections</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead><tr className="bg-violet-700 text-white"><th className="p-3">Connection</th><th className="p-3">Arduino / driver pin</th><th className="p-3">Note</th></tr></thead>
                    <tbody className="divide-y">
                      {[
                        ["HC-05 TXD", "Arduino pin 2", "SoftwareSerial RX"],
                        ["HC-05 RXD", "Arduino pin 3", "SoftwareSerial TX through suitable divider"],
                        ["HC-05 VCC / GND", "Supported supply / common GND", "Verify the breakout-board rating"],
                        ["L298N ENA / ENB", "PWM pins 5 / 6", "Motor speed"],
                        ["L298N IN1–IN4", "Pins 8–11", "Motor direction"],
                        ["Motor supply", "External battery", "Sized for motor voltage and current"],
                      ].map(([connection, pin, note]) => (
                        <tr key={connection}><td className="p-3 font-semibold">{connection}</td><td className="p-3 font-mono text-slate-600">{pin}</td><td className="p-3 text-slate-600">{note}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="text-amber-700" size={28} />
                  <h3 className="text-xl font-bold">Fail-safe design</h3>
                </div>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• The “stop” command must always override movement.</li>
                  <li>• Unknown or corrupted input must stop rather than move the robot.</li>
                  <li>• A movement timeout stops the robot if communication is interrupted.</li>
                  <li>• Keep a physical power switch and manual app stop button accessible.</li>
                  <li>• Do not depend on voice control in safety-critical environments.</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Code2 className="text-green-700" size={28} />
                  <h3 className="text-2xl font-bold">Complete Arduino program</h3>
                </div>
                <p className="mt-3 leading-7 text-slate-600">
                  The sketch accepts uppercase or lowercase commands. Movement automatically stops after 1.5
                  seconds unless another valid movement command arrives, limiting uncontrolled travel after a
                  lost Bluetooth connection.
                </p>
                <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-green-300"><code>{voiceRobotCode}</code></pre>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Setup and test procedure</h3>
                <ol className="mt-4 space-y-3 text-slate-700">
                  <li className="rounded-xl border p-4"><strong>1. Verify the Bluetooth robot.</strong> Confirm manual F, B, L, R and S commands work first.</li>
                  <li className="rounded-xl border p-4"><strong>2. Configure voice mappings.</strong> Map the five phrases to their exact characters.</li>
                  <li className="rounded-xl border p-4"><strong>3. Test without motors.</strong> Observe commands in Serial Monitor before movement tests.</li>
                  <li className="rounded-xl border p-4"><strong>4. Raise the chassis.</strong> Confirm wheel direction, stop and timeout behaviour.</li>
                  <li className="rounded-xl border p-4"><strong>5. Test on open ground.</strong> Start slowly, use short commands and stay within reach of power.</li>
                </ol>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Wrench className="text-slate-700" size={28} />
                  <h3 className="text-2xl font-bold">Troubleshooting</h3>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {[
                    ["Wrong phrase appears", "Use shorter phrases, reduce noise and verify app language settings."],
                    ["Phrase recognised but no motion", "Check mapping character, Bluetooth connection, baud rate and TX/RX wiring."],
                    ["Robot stops quickly", "The timeout is working; resend movement commands or adjust it carefully."],
                    ["Robot does not stop", "Verify S mapping and confirm unknown commands call stopRobot()."],
                    ["Connection drops near motors", "Check battery condition, grounding, wiring and motor-noise suppression."],
                    ["Directions are reversed", "Power off, check L298N inputs or swap the affected motor output wires."],
                  ].map(([problem, solution]) => (
                    <div key={problem} className="rounded-xl border p-5">
                      <h4 className="font-bold">{problem}</h4>
                      <p className="mt-2 text-slate-600">{solution}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-red-50 p-6">
                <h3 className="text-2xl font-bold">Limitations and responsible use</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Recognition can be affected by noise, accent, microphone quality, language models and network
                  availability. Bluetooth range and radio interference also vary. Treat recognised speech as
                  untrusted input: confirm important commands, restrict movement time and keep the test area clear.
                </p>
              </section>

              <section className="rounded-2xl bg-slate-900 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Lightbulb className="text-yellow-300" size={26} />
                  <h3 className="text-2xl font-bold">Chapter activity</h3>
                </div>
                <p className="mt-3 text-slate-200">
                  Speak each of the five commands ten times in a quiet room and ten times with background noise.
                  Record correct recognitions, wrong recognitions and response time. Calculate accuracy for both
                  conditions, then modify one confusing phrase and repeat the test.
                </p>
              </section>

              <section className="rounded-2xl bg-blue-50 p-6">
                <h3 className="text-2xl font-bold">Chapter summary</h3>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• The phone recognises speech; HC-05 transmits the resulting serial command.</li>
                  <li>• Short, distinct phrases should map to simple characters.</li>
                  <li>• Arduino validates commands and drives the L298N motor circuit.</li>
                  <li>• Stop, timeout and unknown-command handling are essential fail-safes.</li>
                  <li>• Recognition accuracy must be tested under realistic noise conditions.</li>
                </ul>
              </section>
            </article>

            <ChapterQuiz />

            <nav className="flex justify-between gap-4">
              <Link to="/courses/robotics-foundation/learn/chapter-7" className="rounded-xl border bg-white px-5 py-3 font-semibold hover:bg-slate-50">
                ← Chapter 7
              </Link>
              <span className="rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-500">
                Chapter 9 coming next
              </span>
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}

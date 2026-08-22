import { useMemo, useState } from "react";
import {
  Activity,
  CheckCircle2,
  CircleHelp,
  Code2,
  Gauge,
  Lightbulb,
  PlayCircle,
  Radio,
  RotateCcw,
  Settings,
  ShieldAlert,
  SlidersHorizontal,
  XCircle,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import LessonHeader from "../components/LessonHeader";
import ChapterSidebar from "../components/ChapterSidebar";
import ChapterVideoManager from "../components/ChapterVideoManager";

const questions = [
  { question: "What is the main purpose of a sensor in a robot?", options: ["Create movement", "Measure a physical condition", "Store mechanical energy", "Replace the controller"], answer: 1 },
  { question: "Which device is an actuator?", options: ["LDR", "Ultrasonic sensor", "Servo motor", "Temperature sensor"], answer: 2 },
  { question: "Which Arduino function reads an analogue input?", options: ["analogRead()", "digitalWrite()", "pinMode()", "delay()"], answer: 0 },
  { question: "The Arduino Uno analogue-to-digital converter normally produces values from:", options: ["0–1", "0–255", "0–1023", "0–10,000"], answer: 2 },
  { question: "Which sensor is commonly used to measure distance without contact?", options: ["Ultrasonic sensor", "Relay", "Servo", "LED"], answer: 0 },
  { question: "Why should a motor not be powered directly from an Arduino I/O pin?", options: ["It needs no power", "Its current demand can exceed the pin rating", "It only accepts software", "It prevents sensing"], answer: 1 },
  { question: "What does PWM help control?", options: ["Only program storage", "Average power delivered to devices such as motors or LEDs", "USB cable length", "Sensor colour"], answer: 1 },
  { question: "Why is a flyback diode used with an inductive load?", options: ["To increase code speed", "To suppress damaging voltage spikes", "To measure distance", "To reverse every signal"], answer: 1 },
  { question: "What is signal conditioning?", options: ["Painting a sensor", "Preparing a sensor signal by filtering, scaling or amplifying it", "Removing the controller", "Charging a battery"], answer: 1 },
  { question: "What must externally powered actuators normally share with the Arduino?", options: ["A common ground", "The same program file only", "No electrical reference", "A separate USB keyboard"], answer: 0 },
];

const servoCode = `#include <Servo.h>

Servo armServo;

const int sensorPin = A0;
const int servoPin = 9;

void setup() {
  armServo.attach(servoPin);
}

void loop() {
  int sensorValue = analogRead(sensorPin);
  int angle = map(sensorValue, 0, 1023, 0, 180);

  armServo.write(angle);
  delay(15);
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
          <h2 className="text-2xl font-bold text-slate-900">Chapter 3 Quiz</h2>
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
                      name={`chapter-3-question-${questionIndex}`}
                      checked={selected}
                      disabled={submitted}
                      onChange={() =>
                        setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))
                      }
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

export default function SensorsActuatorsChapterPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <LessonHeader chapter={3} lesson={1} chapterTitle="Sensors & Actuators" />

      <div className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-3">
            <ChapterSidebar currentChapter={3} />
          </aside>

          <main className="col-span-12 space-y-6 lg:col-span-9">
            <section className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <PlayCircle className="text-blue-600" size={28} aria-hidden="true" />
                <div>
                  <h2 className="text-2xl font-bold">Sensors & Actuators</h2>
                  <p className="text-slate-500">Chapter 3 • Reading, interfacing and assessment</p>
                </div>
              </div>
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950 to-blue-950 p-8 text-center text-white">
                <div>
                  <Activity className="mx-auto text-emerald-300" size={64} aria-hidden="true" />
                  <h3 className="mt-5 text-2xl font-bold">From sensing to physical action</h3>
                  <p className="mt-3 text-emerald-100">Learn how robots observe their environment and safely produce movement.</p>
                </div>
              </div>
              <ChapterVideoManager chapter={3} />
            </section>

            <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
              <header>
                <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 3</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Sensors & Actuators</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Sensors convert physical conditions into electrical information. Actuators
                  convert electrical commands into motion, force, light, heat or another
                  physical effect. Together they connect robot software to the real world.
                </p>
              </header>

              <section>
                <h3 className="text-2xl font-bold">Learning objectives</h3>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {[
                    "Explain the roles of sensors and actuators.",
                    "Distinguish analogue and digital signals.",
                    "Select sensors for common robotics tasks.",
                    "Identify DC, servo, stepper and relay actuators.",
                    "Interface a potentiometer and servo with Arduino.",
                    "Apply power, grounding and protection practices.",
                  ].map((item) => (
                    <li key={item} className="rounded-xl border p-4">
                      <span className="mr-2 font-bold text-green-600">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl bg-blue-50 p-6">
                  <Radio className="text-blue-700" size={30} aria-hidden="true" />
                  <h3 className="mt-3 text-2xl font-bold">Sensors: robot inputs</h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    Sensors measure quantities such as distance, light, temperature,
                    acceleration, position, pressure and sound. Their signals allow the
                    controller to make decisions.
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-6">
                  <Settings className="text-emerald-700" size={30} aria-hidden="true" />
                  <h3 className="mt-3 text-2xl font-bold">Actuators: robot outputs</h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    Actuators perform physical work. Motors rotate wheels, servos position
                    joints, relays switch loads and solenoids create linear movement.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Common robotics sensors</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead><tr className="bg-slate-900 text-white"><th className="p-3">Sensor</th><th className="p-3">Measures</th><th className="p-3">Typical use</th></tr></thead>
                    <tbody className="divide-y">
                      {[
                        ["Ultrasonic", "Distance using sound pulses", "Obstacle detection"],
                        ["Infrared proximity", "Reflected infrared energy", "Short-range object sensing"],
                        ["LDR / photoresistor", "Light intensity", "Light-following robots"],
                        ["Temperature sensor", "Temperature", "Environmental monitoring"],
                        ["Encoder", "Shaft rotation or position", "Speed and odometry"],
                        ["IMU", "Acceleration and angular motion", "Balance and orientation"],
                        ["Camera", "Images and video", "Computer vision"],
                      ].map(([sensor, measures, use]) => (
                        <tr key={sensor}><td className="p-3 font-semibold">{sensor}</td><td className="p-3 text-slate-600">{measures}</td><td className="p-3 text-slate-600">{use}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Analogue and digital signals</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border p-5">
                    <Gauge className="text-purple-700" size={26} />
                    <h4 className="mt-3 text-lg font-bold">Analogue</h4>
                    <p className="mt-2 text-slate-600">Varies over a range. Arduino Uno analogRead() converts 0–5 V into a value from 0 to 1023.</p>
                  </div>
                  <div className="rounded-xl border p-5">
                    <SlidersHorizontal className="text-orange-700" size={26} />
                    <h4 className="mt-3 text-lg font-bold">Digital</h4>
                    <p className="mt-2 text-slate-600">Usually represents two states such as LOW/HIGH, off/on or false/true.</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Common actuators</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {[
                    ["DC motor", "Continuous rotation for wheels, fans and pumps; requires a driver."],
                    ["Servo motor", "Controlled angular position for arms, steering and grippers."],
                    ["Stepper motor", "Precise movement in fixed steps for positioning systems."],
                    ["Relay", "Electrically switches an isolated higher-voltage or higher-current load."],
                    ["Solenoid", "Produces short linear push or pull motion."],
                    ["LED or buzzer", "Provides visual or audible output and status indication."],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-xl border p-5">
                      <h4 className="font-bold">{title}</h4>
                      <p className="mt-2 text-slate-600">{text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Code2 className="text-green-700" size={28} aria-hidden="true" />
                  <h3 className="text-2xl font-bold">Practical: potentiometer controls a servo</h3>
                </div>
                <p className="mt-3 leading-7 text-slate-600">
                  Connect the potentiometer ends to 5V and GND and its centre pin to A0.
                  Connect the servo signal to pin 9. Use an appropriate external 5V supply
                  for the servo and join the external supply ground to Arduino GND.
                </p>
                <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-green-300"><code>{servoCode}</code></pre>
              </section>

              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="text-amber-700" size={28} aria-hidden="true" />
                  <h3 className="text-xl font-bold">Power and protection rules</h3>
                </div>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• Never power a DC motor directly from an Arduino I/O pin.</li>
                  <li>• Use a transistor, MOSFET or motor driver sized for the load.</li>
                  <li>• Use a flyback diode with relays, solenoids and other inductive loads.</li>
                  <li>• Use a separate regulated supply when actuator current is high.</li>
                  <li>• Connect grounds together when circuits exchange logic signals.</li>
                  <li>• Disconnect power before changing wiring.</li>
                </ul>
              </section>

              <section className="rounded-2xl bg-slate-900 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Lightbulb className="text-yellow-300" size={26} />
                  <h3 className="text-2xl font-bold">Chapter activity</h3>
                </div>
                <p className="mt-3 text-slate-200">
                  Build the potentiometer-to-servo circuit. Record the sensor values at the
                  minimum, centre and maximum positions, observe the matching servo angles,
                  and explain why map() is needed. Test initially with the servo horn removed.
                </p>
              </section>

              <section className="rounded-2xl bg-blue-50 p-6">
                <h3 className="text-2xl font-bold">Chapter summary</h3>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• Sensors create inputs; actuators produce physical outputs.</li>
                  <li>• Analogue inputs represent a range, while digital inputs represent discrete states.</li>
                  <li>• Signal conditioning improves compatibility and measurement quality.</li>
                  <li>• Motors and inductive loads require drivers and protection components.</li>
                  <li>• Correct voltage, current capacity and common grounding are essential.</li>
                </ul>
              </section>
            </article>

            <ChapterQuiz />

            <nav className="flex justify-between gap-4">
              <Link to="/courses/robotics-foundation/learn/chapter-2" className="rounded-xl border bg-white px-5 py-3 font-semibold hover:bg-slate-50">
                ← Chapter 2
              </Link>
              <Link to="/courses/robotics-foundation/learn/chapter-4" className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
                Chapter 4 →
              </Link>
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}

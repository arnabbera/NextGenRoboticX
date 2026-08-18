import { useMemo, useState } from "react";
import {
  BrainCircuit,
  CheckCircle2,
  CircleHelp,
  Cloud,
  Code2,
  Cpu,
  Database,
  Eye,
  Lightbulb,
  PlayCircle,
  RotateCcw,
  ScanSearch,
  ShieldAlert,
  Wrench,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import LessonHeader from "../components/LessonHeader";
import ChapterSidebar from "../components/ChapterSidebar";

const questions = [
  { question: "How does machine learning differ from a fixed rule-based program?", options: ["It learns patterns from examples", "It removes all sensors", "It guarantees perfect decisions", "It needs no data"], answer: 0 },
  { question: "What is inference?", options: ["Using a trained model to make a prediction", "Charging the robot", "Labelling training images", "Connecting motor wires"], answer: 0 },
  { question: "Why must training, validation and test data be separated?", options: ["To estimate performance on unseen data", "To increase motor voltage", "To replace confidence scores", "To pair Bluetooth"], answer: 0 },
  { question: "What does a confidence score represent?", options: ["The model's estimated certainty", "The battery percentage", "The motor PWM only", "A guaranteed probability of correctness"], answer: 0 },
  { question: "What should a robot do when AI confidence is below the safe threshold?", options: ["Enter a safe state such as stop", "Move faster", "Ignore the result and continue", "Disable the watchdog"], answer: 0 },
  { question: "What is edge inference?", options: ["Running the model on or near the robot", "Sending all data to a distant cloud", "Only using mechanical switches", "Training without data"], answer: 0 },
  { question: "Why can a highly accurate model still be unsafe?", options: ["Rare failures can have serious physical consequences", "Accuracy prevents all errors", "Robots cannot use models", "The L298N changes labels"], answer: 0 },
  { question: "What does dataset bias mean?", options: ["Examples do not adequately represent real operating conditions", "The motors rotate in reverse", "The serial baud rate is wrong", "The sensor has two pins"], answer: 0 },
  { question: "What is the purpose of a command watchdog?", options: ["Stop movement when fresh valid commands cease", "Train the model", "Increase camera resolution", "Improve Wi-Fi range"], answer: 0 },
  { question: "What should be logged during AI robot testing?", options: ["Inputs, predictions, confidence, actions and failures", "Only successful movements", "Only battery colour", "No test information"], answer: 0 },
];

const gatewayCode = `// AI host sends one character followed by a newline:
// G = path clear, P = person detected, U = uncertain, S = stop

const int ENA = 5;
const int IN1 = 8;
const int IN2 = 9;
const int ENB = 6;
const int IN3 = 10;
const int IN4 = 11;

const int safeSpeed = 140;
const unsigned long commandTimeout = 500;

unsigned long lastValidCommand = 0;
bool robotMoving = false;

void setup() {
  Serial.begin(115200);

  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ENB, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);

  stopRobot();
}

void loop() {
  if (Serial.available()) {
    char command = Serial.read();

    if (command == 'G') {
      moveForward();
      lastValidCommand = millis();
    } else if (command == 'P' ||
               command == 'U' ||
               command == 'S') {
      stopRobot();
      lastValidCommand = millis();
    } else if (command != '\\n' && command != '\\r') {
      stopRobot();
    }
  }

  if (robotMoving &&
      millis() - lastValidCommand > commandTimeout) {
    stopRobot();
  }
}

void moveForward() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  analogWrite(ENA, safeSpeed);
  analogWrite(ENB, safeSpeed);
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

const inferencePseudocode = `frame = camera.capture()
prediction = model.predict(frame)

if prediction.label == "person" and prediction.confidence >= 0.80:
    send_to_arduino("P")
elif prediction.label == "clear" and prediction.confidence >= 0.90:
    send_to_arduino("G")
else:
    send_to_arduino("U")

log(frame_time, prediction.label,
    prediction.confidence, command)`;

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
          <h2 className="text-2xl font-bold text-slate-900">Chapter 9 Quiz</h2>
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
                      name={`chapter-9-question-${questionIndex}`}
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

export default function AIRobotIntegrationChapterPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <LessonHeader chapter={9} lesson={1} chapterTitle="AI Robot Integration" />
      <div className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-3">
            <ChapterSidebar currentChapter={9} />
          </aside>

          <main className="col-span-12 space-y-6 lg:col-span-9">
            <section className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <PlayCircle className="text-blue-600" size={28} />
                <div>
                  <h2 className="text-2xl font-bold">AI Robot Integration</h2>
                  <p className="text-slate-500">Chapter 9 • Perception, inference and safe action</p>
                </div>
              </div>
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-cyan-950 p-8 text-center text-white">
                <div>
                  <BrainCircuit className="mx-auto text-cyan-300" size={64} />
                  <h3 className="mt-5 text-2xl font-bold">Connect machine perception to robot behaviour</h3>
                  <p className="mt-3 text-cyan-100">Turn model predictions into restricted, testable and fail-safe motor commands.</p>
                </div>
              </div>
            </section>

            <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
              <header>
                <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 9</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">AI Robot Integration</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Artificial intelligence can help a robot classify images, detect objects, recognise sounds or
                  estimate conditions that are difficult to describe with fixed rules. The model does not replace
                  the control system: its prediction becomes one input to carefully constrained robot logic.
                </p>
              </header>

              <section>
                <h3 className="text-2xl font-bold">Learning objectives</h3>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {[
                    "Distinguish rule-based control from machine learning.",
                    "Explain dataset, training, validation, testing and inference.",
                    "Compare edge and cloud AI architectures.",
                    "Use labels and confidence thresholds safely.",
                    "Connect an AI host to an Arduino motor controller.",
                    "Evaluate reliability, bias, privacy and physical risk.",
                  ].map((item) => (
                    <li key={item} className="rounded-xl border p-4">
                      <span className="mr-2 font-bold text-green-600">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl bg-blue-50 p-6">
                  <Code2 className="text-blue-700" size={30} />
                  <h3 className="mt-3 text-2xl font-bold">Rule-based robotics</h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    A developer explicitly writes conditions such as “if distance is below 25 cm, stop.” Rules are
                    transparent and predictable but may be difficult to create for complex perception.
                  </p>
                </div>
                <div className="rounded-2xl bg-purple-50 p-6">
                  <BrainCircuit className="text-purple-700" size={30} />
                  <h3 className="mt-3 text-2xl font-bold">Machine-learning robotics</h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    A model learns statistical patterns from labelled examples. It can generalise to new inputs,
                    but predictions remain uncertain and can fail outside the training conditions.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold">The machine-learning lifecycle</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    [Database, "1. Collect", "Capture representative examples from real operating conditions."],
                    [ScanSearch, "2. Label", "Assign correct classes or target values consistently."],
                    [BrainCircuit, "3. Train", "Optimise model parameters using the training set."],
                    [Eye, "4. Validate", "Tune choices without using the final test set."],
                    [CheckCircle2, "5. Test", "Measure performance on held-out unseen examples."],
                    [Cpu, "6. Deploy", "Run inference, monitor results and update responsibly."],
                  ].map(([Icon, title, description]) => (
                    <div key={title} className="rounded-2xl border p-5">
                      <Icon className="text-indigo-700" size={28} />
                      <h4 className="mt-3 font-bold">{title}</h4>
                      <p className="mt-2 text-sm text-slate-600">{description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold">AI perception-to-action pipeline</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead><tr className="bg-slate-900 text-white"><th className="p-3">Stage</th><th className="p-3">Example</th><th className="p-3">Safety question</th></tr></thead>
                    <tbody className="divide-y">
                      {[
                        ["Sense", "Camera captures a frame", "Is the input fresh and valid?"],
                        ["Preprocess", "Resize and normalise pixels", "Does it match model training?"],
                        ["Infer", "Model predicts person or clear", "What is the confidence?"],
                        ["Validate", "Apply threshold and permitted states", "Should uncertainty force stop?"],
                        ["Act", "Send restricted command to Arduino", "Can a watchdog stop motion?"],
                        ["Monitor", "Log prediction and outcome", "Can failures be reproduced?"],
                      ].map(([stage, example, safety]) => (
                        <tr key={stage}><td className="p-3 font-semibold">{stage}</td><td className="p-3 text-slate-600">{example}</td><td className="p-3 text-slate-600">{safety}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border p-6">
                  <Cpu className="text-emerald-700" size={30} />
                  <h3 className="mt-3 text-2xl font-bold">Edge inference</h3>
                  <p className="mt-3 text-slate-600">
                    Runs on the robot, phone or a nearby computer. It can reduce latency and preserve privacy but
                    is limited by local processing power, memory and energy.
                  </p>
                </div>
                <div className="rounded-2xl border p-6">
                  <Cloud className="text-blue-700" size={30} />
                  <h3 className="mt-3 text-2xl font-bold">Cloud inference</h3>
                  <p className="mt-3 text-slate-600">
                    Sends data to remote computing infrastructure. It may support larger models but introduces
                    network delay, outages, cost and privacy considerations.
                  </p>
                </div>
              </section>

              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="text-amber-700" size={28} />
                  <h3 className="text-xl font-bold">Confidence is not a guarantee</h3>
                </div>
                <p className="mt-3 leading-7 text-slate-700">
                  A confidence score is the model’s numerical output, not proof that a prediction is correct.
                  Thresholds must be chosen using validation data and real robot testing. When input is missing,
                  stale, outside expected conditions or below the safe threshold, the robot should enter a safe
                  state—normally stop.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Practical integration architecture</h3>
                <ol className="mt-4 space-y-3 text-slate-700">
                  <li className="rounded-xl border p-4"><strong>1. AI host:</strong> A phone, laptop or edge computer captures camera frames and runs the model.</li>
                  <li className="rounded-xl border p-4"><strong>2. Safety policy:</strong> Host converts predictions into G (clear), P (person), U (uncertain) or S (stop).</li>
                  <li className="rounded-xl border p-4"><strong>3. Serial link:</strong> USB, UART or a suitable wireless bridge sends only the allowed command.</li>
                  <li className="rounded-xl border p-4"><strong>4. Arduino gateway:</strong> Arduino accepts valid commands and controls the L298N.</li>
                  <li className="rounded-xl border p-4"><strong>5. Watchdog:</strong> If fresh commands stop arriving, Arduino stops both motors.</li>
                </ol>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Code2 className="text-green-700" size={28} />
                  <h3 className="text-2xl font-bold">Inference-side pseudocode</h3>
                </div>
                <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-cyan-300"><code>{inferencePseudocode}</code></pre>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Code2 className="text-green-700" size={28} />
                  <h3 className="text-2xl font-bold">Arduino safety gateway</h3>
                </div>
                <p className="mt-3 leading-7 text-slate-600">
                  This demonstration intentionally permits only slow forward motion when the AI host repeatedly
                  reports a confidently clear path. Person, uncertainty, explicit stop, invalid data or a 500 ms
                  communication timeout all stop the robot.
                </p>
                <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-green-300"><code>{gatewayCode}</code></pre>
              </section>

              <section>
                <h3 className="text-2xl font-bold">Evaluation metrics</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {[
                    ["Accuracy", "Overall fraction of predictions that are correct; can hide minority-class failures."],
                    ["Precision", "Of predicted positives, how many are correct."],
                    ["Recall", "Of actual positives, how many the model detects."],
                    ["False negative", "A real hazard is missed—often especially important in safety detection."],
                    ["Latency", "Time from sensing to action; excessive delay makes decisions stale."],
                    ["Robustness", "Performance across lighting, angles, backgrounds, devices and disturbances."],
                  ].map(([metric, meaning]) => (
                    <div key={metric} className="rounded-xl border p-5">
                      <h4 className="font-bold">{metric}</h4>
                      <p className="mt-2 text-slate-600">{meaning}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3">
                  <Wrench className="text-slate-700" size={28} />
                  <h3 className="text-2xl font-bold">Troubleshooting</h3>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {[
                    ["Good test accuracy, poor robot results", "Collect data from the actual camera, lighting, height and environment."],
                    ["Predictions fluctuate", "Improve data, stabilise input and require consistent frames before movement."],
                    ["Robot moves after host stops", "Verify the Arduino watchdog and command timestamp logic."],
                    ["High latency", "Reduce model/input size, use edge inference or lower capture rate carefully."],
                    ["One class is often missed", "Inspect class balance, labels and per-class recall."],
                    ["Serial commands are corrupted", "Check baud rate, grounding, cable quality and strict parsing."],
                  ].map(([problem, solution]) => (
                    <div key={problem} className="rounded-xl border p-5">
                      <h4 className="font-bold">{problem}</h4>
                      <p className="mt-2 text-slate-600">{solution}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-red-50 p-6">
                <h3 className="text-2xl font-bold">Responsible AI and privacy</h3>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• Collect images or audio only with appropriate permission and a defined purpose.</li>
                  <li>• Minimise stored personal data and protect it against unauthorised access.</li>
                  <li>• Test for performance differences across people, environments and devices.</li>
                  <li>• Document model limitations instead of presenting predictions as certainty.</li>
                  <li>• Keep human supervision and a physical emergency stop during experiments.</li>
                </ul>
              </section>

              <section className="rounded-2xl bg-slate-900 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Lightbulb className="text-yellow-300" size={26} />
                  <h3 className="text-2xl font-bold">Chapter activity</h3>
                </div>
                <p className="mt-3 text-slate-200">
                  Design a two-class “person / clear” evaluation plan without moving the robot initially. Create a
                  table of at least 40 test cases across different lighting, distance and backgrounds. Record label,
                  prediction, confidence and latency; calculate accuracy and person recall; then select and justify
                  a confidence threshold before enabling slow supervised movement.
                </p>
              </section>

              <section className="rounded-2xl bg-blue-50 p-6">
                <h3 className="text-2xl font-bold">Chapter summary</h3>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• Machine-learning models learn patterns from representative examples.</li>
                  <li>• Training, validation, testing and inference have different purposes.</li>
                  <li>• AI predictions require thresholds, validation and constrained control logic.</li>
                  <li>• Edge and cloud inference have different latency, privacy and resource trade-offs.</li>
                  <li>• Uncertainty, stale data and communication loss must produce a safe robot state.</li>
                </ul>
              </section>
            </article>

            <ChapterQuiz />

            <nav className="flex justify-between gap-4">
              <Link to="/courses/robotics-foundation/learn/chapter-8" className="rounded-xl border bg-white px-5 py-3 font-semibold hover:bg-slate-50">
                ← Chapter 8
              </Link>
              <span className="rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-500">
                Chapter 10 coming next
              </span>
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}

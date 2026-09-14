import { useMemo, useState } from "react";
import { AlertTriangle, Boxes, CheckCircle2, CircleHelp, Cloud, Code2, Database, Gauge, ListChecks, Network, RotateCcw, ShieldCheck, Wrench, XCircle, Zap } from "lucide-react";

const questions = [
  { question: "What is the main goal of the final IoT project?", options: ["Build a complete sense-to-action system that can be monitored and controlled safely", "Connect an LED without collecting data", "Store passwords inside source code", "Depend entirely on a dashboard"], answer: 0 },
  { question: "Which topic structure best separates devices in MQTT?", options: ["site/device/category/name", "one shared topic for everything", "password/device", "random text without hierarchy"], answer: 0 },
  { question: "Why must telemetry include a timestamp and quality field?", options: ["To identify stale or unreliable readings", "To increase sensor voltage", "To replace authentication", "To make JSON colourful"], answer: 0 },
  { question: "What should the controller do if temperature data becomes stale?", options: ["Move the actuator to the defined safe state and report the fault", "Keep the last command forever", "Delete the device identity", "Disable all logs"], answer: 0 },
  { question: "What is the difference between desired and reported state?", options: ["Desired is the requested state; reported is the device's actual confirmed state", "They must always be identical messages", "Reported state is only a password", "Desired state is a sensor measurement"], answer: 0 },
  { question: "Which mechanism prevents a retried command from running twice?", options: ["A unique command ID and idempotent command handling", "A larger database", "A shorter device name", "An anonymous MQTT connection"], answer: 0 },
  { question: "What should be tested before connecting a real pump or fan?", options: ["The logic with an LED or other low-risk load", "Only the dashboard colour", "Only cloud storage capacity", "Nothing if the code compiles"], answer: 0 },
  { question: "Which security practice is correct?", options: ["Use unique credentials, encrypted transport and least privilege", "Publish credentials in the repository", "Use one administrator password on every device", "Allow all devices to access all topics"], answer: 0 },
  { question: "What proves that an actuator command succeeded?", options: ["A verified reported state or physical feedback", "The command was displayed in the browser", "The broker accepted a connection", "A sensor has a long name"], answer: 0 },
  { question: "What should the final project report contain?", options: ["Architecture, wiring, code, tests, results, limitations and evidence", "Only a photograph", "Only component prices", "Only copied source code"], answer: 0 },
];

const buildStages = [
  ["Define", "Write the use case, users, inputs, outputs, limits, success criteria and safe behaviour."],
  ["Design", "Prepare the block diagram, wiring, MQTT topics, payloads, database fields and control rules."],
  ["Build", "Assemble and test one sensor and one output at a time before integrating the whole system."],
  ["Connect", "Add Wi-Fi, secure messaging, cloud storage, dashboards and remote commands."],
  ["Verify", "Test normal operation, faults, disconnection, restart, recovery, security and physical outcomes."],
  ["Document", "Record evidence, decisions, results, limitations and improvements so another learner can reproduce it."],
];

const billOfMaterials = [
  ["ESP32 development board", "1", "Reads sensors, applies local rules and communicates with the IoT service"],
  ["Temperature/humidity sensor", "1", "Provides environmental measurements; DHT22 or an equivalent calibrated sensor"],
  ["Soil-moisture or water-level sensor", "1", "Provides the second monitored variable for the chosen use case"],
  ["Relay module or logic-level MOSFET stage", "1", "Controls a low-voltage fan, lamp or pump using a suitable driver"],
  ["LED and 220 Ω resistor", "1 each", "Safe output for initial testing before a real actuator is connected"],
  ["Breadboard, jumper wires and regulated supply", "As needed", "Supports safe prototyping with a shared reference ground"],
];

export default function InternetOfThingsChapterTenLesson() {
  return <><article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
    <header>
      <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 10</p>
      <h2 className="mt-2 text-3xl font-bold">Final Project: Smart IoT Monitoring and Control System</h2>
      <p className="mt-4 leading-8 text-slate-600">Bring the complete course together by building an ESP32-based system that measures the environment, publishes trustworthy telemetry, stores and visualises data, accepts authorised commands, applies safe local automation and proves its behaviour under normal and failure conditions.</p>
    </header>

    <section>
      <h3 className="text-2xl font-bold">Learning objectives</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">{["Convert a practical problem into clear functional and safety requirements.", "Design an end-to-end device, network, cloud, data and application architecture.", "Build structured MQTT telemetry and command flows.", "Implement local automation, desired/reported state and safe fallbacks.", "Create a useful dashboard with alerts and historical trends.", "Test, troubleshoot, secure and document a complete IoT prototype."].map((text) => <CheckItem key={text} text={text} />)}</div>
    </section>

    <section className="rounded-2xl bg-slate-950 p-6 text-white">
      <Title icon={Boxes} text="Project brief and success criteria" color="text-cyan-300" />
      <p className="mt-4 leading-8 text-slate-300">Build a smart room, greenhouse or small equipment-monitoring prototype. The ESP32 must read at least two variables, control one output, continue essential automation without the cloud, publish current and historical state, and allow a permitted user to send a remote command.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DarkCard title="Measure" text="Read, validate and timestamp two sensors at a defined sampling interval." />
        <DarkCard title="Communicate" text="Publish structured telemetry and receive commands through secure MQTT or HTTPS." />
        <DarkCard title="Store and display" text="Keep historical readings and show current value, freshness, trend and device health." />
        <DarkCard title="Automate" text="Apply a stable local rule with hysteresis, persistence, timeout and manual override." />
        <DarkCard title="Alert" text="Notify only for actionable abnormal, stale or failed conditions." />
        <DarkCard title="Recover" text="Reconnect safely, avoid duplicate commands and reconcile desired with reported state." />
      </div>
    </section>

    <section>
      <Title icon={Network} text="End-to-end architecture" />
      <div className="mt-5 grid gap-4 md:grid-cols-5">
        {["Sensors", "ESP32 edge controller", "Wi-Fi + MQTT/HTTPS", "Cloud + database", "Dashboard + authorised user"].map((item, index) => <div key={item} className="relative rounded-2xl border bg-slate-50 p-4 text-center font-bold text-slate-800"><span className="mb-2 block text-sm text-blue-700">Stage {index + 1}</span>{item}</div>)}
      </div>
      <p className="mt-5 leading-8 text-slate-600">Telemetry travels from the device to storage and visualisation. Commands travel in the reverse direction, but the actuator changes only after authentication, validation and local safety checks. Reported state then confirms what actually happened.</p>
    </section>

    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
      <Title icon={ListChecks} text="Development workflow" color="text-blue-800" />
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{buildStages.map(([title, text], index) => <div key={title} className="rounded-2xl bg-white p-5"><span className="text-sm font-bold text-blue-700">STEP {index + 1}</span><h4 className="mt-2 font-bold">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>)}</div>
    </section>

    <section>
      <Title icon={Wrench} text="Hardware and safe prototyping" />
      <div className="mt-5 overflow-x-auto rounded-2xl border"><table className="w-full min-w-[760px] text-left"><thead className="bg-slate-100"><tr><th className="p-4">Item</th><th className="p-4">Quantity</th><th className="p-4">Purpose</th></tr></thead><tbody className="divide-y">{billOfMaterials.map(([item, quantity, purpose]) => <tr key={item}><th className="p-4">{item}</th><td className="p-4 text-slate-600">{quantity}</td><td className="p-4 text-slate-600">{purpose}</td></tr>)}</tbody></table></div>
      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950"><b>Safety:</b> first test the output with an LED. Use an isolated, correctly rated driver for a real load, keep mains voltage away from the breadboard, never power a motor or pump directly from an ESP32 pin, and obtain qualified supervision for mains-powered equipment.</div>
    </section>

    <section className="rounded-2xl bg-cyan-50 p-6">
      <Title icon={Database} text="Topics, payloads and data model" color="text-cyan-800" />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Card title="Telemetry topic" text="lab/esp32-01/telemetry/environment — periodic validated measurements." />
        <Card title="Desired state topic" text="lab/esp32-01/command/fan — short-lived, authorised control requests." />
        <Card title="Reported state topic" text="lab/esp32-01/state/fan — actual output state, command ID and result." />
        <Card title="Health topic" text="lab/esp32-01/status — online state, firmware, uptime, signal and last fault." />
      </div>
      <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-cyan-100"><code>{`{
  "deviceId": "esp32-01",
  "timestamp": "2026-09-14T12:00:00Z",
  "temperatureC": 31.6,
  "humidityPct": 68.2,
  "quality": "valid",
  "sequence": 1842
}`}</code></pre>
      <p className="mt-4 leading-7 text-cyan-950">Use consistent units and field names. Store the device timestamp, server-received time, value, quality and sequence number. Validate every payload before using it in a rule or database query.</p>
    </section>

    <section>
      <Title icon={Code2} text="ESP32 control logic" />
      <p className="mt-4 leading-8 text-slate-600">Keep credentials outside source control and load them from a private configuration mechanism. The following compact structure shows the control flow; adapt sensor libraries and secure-client configuration to your selected hardware and platform.</p>
      <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-100"><code>{`void loop() {
  maintainSecureConnection();
  readAndValidateSensors();

  if (dataIsFresh()) {
    if (temperatureC > 35 && highReadingCount >= 2) setFan(true, "local-high");
    if (temperatureC < 32) setFan(false, "local-normal");
  } else {
    setFan(false, "stale-data-safe-state");
    publishFault("sensor-data-stale");
  }

  enforceMaximumRunTime();
  publishTelemetryAtInterval();
  publishReportedStateAfterChange();
}

void onCommand(Command command) {
  if (!authorised(command) || expired(command)) return;
  if (alreadyProcessed(command.id)) publishStoredResult(command.id);
  else if (localInterlocksAllow(command)) applyOnceAndReport(command);
}`}</code></pre>
    </section>

    <section className="rounded-2xl border border-violet-200 bg-violet-50 p-6">
      <Title icon={Zap} text="Automation and command policy" color="text-violet-800" />
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card title="Normal rule" text="Start the fan only after two valid readings above 35°C; stop below 32°C." />
        <Card title="Data failure" text="If readings are missing, stale or implausible, enter the documented safe state and raise one fault." />
        <Card title="Manual override" text="Permit an authorised override for a limited duration and show it clearly on the dashboard." />
        <Card title="Command expiry" text="Reject commands that arrive after their expiry time or use an invalid device, action or range." />
        <Card title="Idempotency" text="Store recent command IDs and return the previous result instead of applying a duplicate." />
        <Card title="Reconciliation" text="After restart or reconnection, publish actual state and resolve differences using the declared authority policy." />
      </div>
    </section>

    <section>
      <Title icon={Gauge} text="Dashboard and alert requirements" />
      <div className="mt-5 grid gap-3 md:grid-cols-2">{["Current values with units, source timestamp, age and quality.", "Historical temperature and humidity trend with a useful time range.", "Device online/offline state, last seen, signal and firmware version.", "Desired output beside confirmed reported output.", "Manual command control visible only to an authorised user.", "Alert history with severity, acknowledgement and resolution.", "Counts of rejected readings, failed commands and reconnects.", "A clear warning when displayed data is stale."].map((text) => <CheckItem key={text} text={text} />)}</div>
    </section>

    <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
      <Title icon={ShieldCheck} text="Security and privacy checklist" color="text-emerald-800" />
      <div className="mt-5 grid gap-3 md:grid-cols-2">{["Give every device a unique identity and revocable credential.", "Use TLS for MQTT/HTTPS and validate the server certificate.", "Apply least-privilege topic or API permissions.", "Never commit Wi-Fi, broker or cloud secrets to a public repository.", "Validate payload type, size, range, timestamp and command permission.", "Protect dashboards with authentication and role-based access.", "Collect only necessary data and define retention and deletion rules.", "Plan signed firmware updates, credential rotation and device retirement."].map((text) => <CheckItem key={text} text={text} />)}</div>
    </section>

    <section>
      <Title icon={AlertTriangle} text="Verification test plan" color="text-amber-700" />
      <div className="mt-5 overflow-x-auto rounded-2xl border"><table className="w-full min-w-[800px] text-left"><thead className="bg-amber-50"><tr><th className="p-4">Test</th><th className="p-4">Action</th><th className="p-4">Expected evidence</th></tr></thead><tbody className="divide-y">
        <TestRow test="Normal telemetry" action="Run valid sensors for ten minutes" result="Ordered records, correct units, fresh dashboard and no false alert" />
        <TestRow test="Threshold control" action="Move input above 35°C and then below 32°C" result="Stable on/off transitions with reason and reported state" />
        <TestRow test="Sensor failure" action="Disconnect or simulate an invalid reading" result="Safe output, quality fault and one actionable alert" />
        <TestRow test="Network loss" action="Disable Wi-Fi, then restore it" result="Local rule continues; reconnect uses backoff and state reconciliation" />
        <TestRow test="Duplicate command" action="Send the same command ID twice" result="Physical action occurs once and stored result is returned" />
        <TestRow test="Restart" action="Reboot while output is active" result="Documented startup state, restored connection and correct reported state" />
      </tbody></table></div>
    </section>

    <section>
      <Title icon={Wrench} text="Troubleshooting guide" />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Card title="No sensor data" text="Check power, common ground, pin mapping, address, library, sampling delay and raw serial output." />
        <Card title="MQTT disconnects repeatedly" text="Check Wi-Fi strength, time synchronisation, TLS certificate, credential permissions, keepalive and reconnect backoff." />
        <Card title="Dashboard shows old values" text="Compare device and server timestamps, display age, inspect subscription and database writes, and reject out-of-order samples." />
        <Card title="Output changes unexpectedly" text="Log the rule version and reason, inspect thresholds, quality, override, duplicate messages and desired/reported state." />
        <Card title="Relay resets the ESP32" text="Use a suitable driver and separate supply where required; inspect current demand, flyback protection, grounding and noise." />
        <Card title="Too many alerts" text="Add persistence, hysteresis, deduplication and cooldown; alert on user action, not every repeated sample." />
      </div>
    </section>

    <section className="rounded-2xl bg-indigo-50 p-6">
      <h3 className="text-2xl font-bold text-indigo-950">Final submission portfolio</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-2">{["Problem statement and measurable success criteria.", "Architecture diagram, wiring diagram and bill of materials.", "MQTT topic and JSON payload specification.", "Commented firmware and dashboard configuration.", "Security, privacy, safety and failure-mode decisions.", "Completed test table with screenshots, logs or measurements.", "Short demonstration showing sensing, automation, remote control and recovery.", "Reflection covering limitations and the next three improvements."].map((text) => <CheckItem key={text} text={text} />)}</div>
    </section>

    <section className="rounded-2xl border border-green-200 bg-green-50 p-6">
      <h3 className="text-xl font-bold text-green-950">Course completion checklist</h3>
      <p className="mt-3 leading-7 text-green-900">Your project is complete when it senses accurately, communicates securely, stores and visualises trustworthy data, acts safely at the edge, accepts only valid commands, survives common failures, and includes reproducible evidence. Complete the portfolio and score at least 80% in the final chapter quiz.</p>
    </section>
  </article><ChapterQuiz /></>;
}

function ChapterQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);
  const complete = Object.keys(answers).length === questions.length;
  const passed = score >= 8;

  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
    <div className="flex items-center gap-3 border-b pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 10 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
    <div className="mt-6 space-y-6">{questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => {
      const selected = answers[index] === optionIndex;
      const correct = submitted && optionIndex === item.answer;
      const wrong = submitted && selected && optionIndex !== item.answer;
      const style = correct ? "border-green-300 bg-green-50" : wrong ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "hover:bg-slate-50";
      return <label key={option} className={"flex cursor-pointer gap-3 rounded-xl border p-3 " + style}><input type="radio" name={"iot-ch10-" + index} checked={selected} disabled={submitted} onChange={() => setAnswers((value) => ({ ...value, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>;
    })}</div></fieldset>)}</div>
    {!submitted ? <button disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={"mt-6 rounded-2xl border p-6 " + (passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50")}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Final chapter quiz passed" : "Review the project lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button onClick={() => { setAnswers({}); setSubmitted(false); }} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
  </section>;
}

function Title({ icon: Icon, text, color = "text-indigo-700" }) { return <div className="flex items-center gap-3"><Icon className={color} /><h3 className="text-2xl font-bold">{text}</h3></div>; }
function Card({ title, text }) { return <div className="rounded-2xl border bg-white p-5"><h4 className="font-bold">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function DarkCard({ title, text }) { return <div className="rounded-2xl border border-white/15 bg-white/5 p-5"><h4 className="font-bold text-cyan-200">{title}</h4><p className="mt-2 leading-7 text-slate-300">{text}</p></div>; }
function CheckItem({ text }) { return <div className="flex gap-3 rounded-xl border bg-white p-4"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={20} /><span>{text}</span></div>; }
function TestRow({ test, action, result }) { return <tr><th className="p-4">{test}</th><td className="p-4 text-slate-600">{action}</td><td className="p-4 text-slate-600">{result}</td></tr>; }

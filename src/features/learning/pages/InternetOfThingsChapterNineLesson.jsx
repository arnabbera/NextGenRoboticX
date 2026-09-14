import { useMemo, useState } from "react";
import { Activity, AlertTriangle, BellRing, CheckCircle2, CircleHelp, Cpu, Gauge, GitBranch, RotateCcw, Settings2, TimerReset, Workflow, XCircle, Zap } from "lucide-react";

const questions = [
  { question: "Why should safety-critical automation continue at the edge when possible?", options: ["It can respond even when cloud connectivity is unavailable", "It makes sensors unnecessary", "It removes the need for testing", "It guarantees unlimited storage"], answer: 0 },
  { question: "What is hysteresis used for in a threshold rule?", options: ["To stop rapid switching near the threshold", "To encrypt telemetry", "To increase network latency", "To rename a device"], answer: 0 },
  { question: "What is a debounce interval?", options: ["A period that filters repeated or unstable input changes", "A permanent device shutdown", "A database password", "A cloud billing cycle"], answer: 0 },
  { question: "Which design prevents an actuator from remaining on indefinitely after a failure?", options: ["A maximum run-time timeout and safe default state", "A larger dashboard", "More frequent log deletion", "A shared administrator password"], answer: 0 },
  { question: "Why should rules include data-quality checks?", options: ["Missing, stale or implausible readings must not trigger unsafe actions", "Every sensor value is always correct", "It increases the ADC range", "It replaces calibration"], answer: 0 },
  { question: "What does an acknowledgement workflow provide?", options: ["Evidence that an alert was seen and assigned", "Automatic sensor calibration", "A replacement for authentication", "Unlimited retries"], answer: 0 },
  { question: "Which metric best reveals delayed real-time processing?", options: ["Event-to-action latency", "Device colour", "Topic name length", "Dashboard font size"], answer: 0 },
  { question: "What is a good strategy when a command is retried?", options: ["Use an idempotency key so the same command is not applied twice", "Disable logging", "Execute it repeatedly without checking", "Change the device identity"], answer: 0 },
  { question: "What should happen after communication is restored?", options: ["Reconcile local state, queued events and desired cloud state", "Discard all safety limits", "Trust every queued command forever", "Reset all credentials"], answer: 0 },
  { question: "What is the main purpose of a rule priority?", options: ["To ensure safety and emergency rules override routine automation", "To increase sensor noise", "To replace timestamps", "To remove manual control"], answer: 0 },
];

const ruleRows = [
  ["Threshold", "Temperature > 35°C", "Simple limits and warnings", "Add hysteresis and duration"],
  ["Range", "Moisture < 30% or > 80%", "Detecting abnormal operating bands", "Validate calibration and units"],
  ["Rate of change", "Level rises > 10 cm/min", "Early detection of fast events", "Filter noise before calculation"],
  ["Schedule", "Irrigate at 06:00 if soil is dry", "Time-based operation", "Use timezone and missed-run policy"],
  ["State sequence", "Motion, then door opened", "Context-aware workflows", "Define time window and reset"],
  ["Aggregate", "Average vibration over 60 s exceeds limit", "Reducing false alarms", "Choose a suitable window"],
];

const workflowSteps = [
  ["Sense", "Read calibrated inputs and attach device ID, unit, timestamp and quality."],
  ["Evaluate", "Apply freshness, range, threshold, hysteresis, schedule and state conditions."],
  ["Decide", "Resolve priorities, permissions, cooldowns and manual overrides."],
  ["Act", "Send an idempotent command with timeout and verify the result."],
  ["Observe", "Record event-to-action latency, outcome and any alert or failure."],
];

export default function InternetOfThingsChapterNineLesson() {
  return <><article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
    <header>
      <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 9</p>
      <h2 className="mt-2 text-3xl font-bold">Edge Automation, Rules and Real-Time Monitoring</h2>
      <p className="mt-4 leading-8 text-slate-600">IoT becomes useful when measurements lead to timely, safe and explainable action. This chapter shows how to turn sensor events into local and cloud rules, control actuators reliably, monitor system health in real time, and handle failures without unsafe behaviour.</p>
    </header>

    <section>
      <h3 className="text-2xl font-bold">Learning objectives</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">{["Distinguish local edge decisions from cloud automation.", "Design threshold, time, sequence and aggregate rules.", "Use hysteresis, debounce, cooldowns and state machines.", "Control actuators with priorities, timeouts and safe defaults.", "Build actionable dashboards, alerts and acknowledgement flows.", "Measure latency, availability, data freshness and rule outcomes."].map((text) => <CheckItem key={text} text={text} />)}</div>
    </section>

    <section className="rounded-2xl bg-slate-950 p-6 text-white">
      <Title icon={Workflow} text="The event-to-action loop" color="text-cyan-300" />
      <div className="mt-5 grid gap-4 md:grid-cols-5">{workflowSteps.map(([title, text], index) => <div key={title} className="rounded-2xl border border-white/15 bg-white/5 p-4"><span className="text-sm font-bold text-cyan-300">{index + 1}</span><h4 className="mt-2 font-bold">{title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{text}</p></div>)}</div>
      <p className="mt-5 leading-8 text-slate-300">Every action should be traceable to the input, rule version, decision, command and result. That evidence makes troubleshooting and improvement possible.</p>
    </section>

    <section>
      <Title icon={Cpu} text="Edge automation versus cloud automation" />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Card title="Use the edge for immediate control" text="Choose local logic for safety interlocks, sub-second response, offline operation, privacy-sensitive processing and reduced bandwidth. The device or gateway should retain a safe operating policy when the internet fails." />
        <Card title="Use the cloud for fleet-wide intelligence" text="Choose cloud rules for cross-device comparison, long-term trends, remote configuration, heavy analytics and coordinated workflows. Cloud decisions must tolerate network delay and disconnection." />
      </div>
      <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-blue-950"><b>Practical pattern:</b> keep immediate protection and minimum viable control at the edge; use the cloud for optimisation, supervision and configuration. Define which side has authority when their desired states differ.</div>
    </section>

    <section className="rounded-2xl border border-violet-200 bg-violet-50 p-6">
      <Title icon={GitBranch} text="Rule types and design conditions" color="text-violet-700" />
      <div className="mt-5 overflow-x-auto rounded-2xl border bg-white"><table className="w-full min-w-[780px] text-left"><thead className="bg-violet-100"><tr><th className="p-4">Rule type</th><th className="p-4">Example</th><th className="p-4">Useful for</th><th className="p-4">Design check</th></tr></thead><tbody className="divide-y">{ruleRows.map(([a,b,c,d]) => <tr key={a}><th className="p-4">{a}</th><td className="p-4 text-slate-600">{b}</td><td className="p-4 text-slate-600">{c}</td><td className="p-4 text-slate-600">{d}</td></tr>)}</tbody></table></div>
    </section>

    <section>
      <Title icon={Settings2} text="Making rules stable and safe" />
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card title="Hysteresis" text="Turn a fan on above 35°C but off only below 32°C. Separate limits prevent rapid on/off oscillation." />
        <Card title="Debounce" text="Accept a button, switch or noisy digital state only after it remains stable for a defined interval." />
        <Card title="Persistence" text="Require a condition to remain true for a duration before acting, such as high temperature for 30 seconds." />
        <Card title="Cooldown" text="After sending an alert or command, wait before repeating it unless severity increases." />
        <Card title="Priority" text="Emergency shutdown must override comfort, schedule and energy-saving rules. Document the conflict policy." />
        <Card title="Manual override" text="Make overrides time-limited, authorised, visible and auditable; return safely to automatic control." />
      </div>
    </section>

    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
      <Title icon={AlertTriangle} text="Data quality before action" color="text-amber-700" />
      <div className="mt-5 grid gap-3 md:grid-cols-2">{["Reject or flag values outside physical and calibrated ranges.", "Check timestamp age so stale data cannot trigger a current action.", "Detect missing samples, flat-lined sensors and impossible rate changes.", "Carry a quality flag with each event and define allowed rule behaviour.", "Compare redundant sensors for high-consequence decisions.", "Never silently replace a failed measurement with a value that looks real."].map((text) => <CheckItem key={text} text={text} />)}</div>
    </section>

    <section>
      <Title icon={Zap} text="Reliable actuator control" />
      <ol className="mt-5 space-y-3">{["Validate that the requester and rule are authorised for the actuator.", "Include command ID, desired state, issue time, expiry and idempotency key.", "Check local interlocks, limits and current equipment state before execution.", "Apply the command once, then report accepted, running, completed or failed.", "Use a maximum run time and a safe default for lost communication.", "Reconcile reported state with desired state after restart or reconnection."].map((text, index) => <Step key={text} number={index + 1} text={text} />)}</ol>
    </section>

    <section className="rounded-2xl bg-cyan-50 p-6">
      <Title icon={Activity} text="Real-time monitoring that supports action" color="text-cyan-800" />
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Metric title="Device health" text="Online status, last seen, resets, battery, signal and firmware version." />
        <Metric title="Data health" text="Sample count, freshness, missing values, rejected values and sensor quality." />
        <Metric title="Automation health" text="Rule evaluations, triggers, suppressions, conflicts, failures and execution time." />
        <Metric title="Command health" text="Accepted, completed, timed out, retried and rejected commands." />
        <Metric title="Service health" text="Broker/API availability, queue depth, database write errors and end-to-end latency." />
        <Metric title="Outcome" text="Whether the intended physical result occurred, not merely whether a command was sent." />
      </div>
    </section>

    <section>
      <Title icon={BellRing} text="Alerts and escalation" />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Card title="Make alerts actionable" text="Include device, site, severity, observed value, threshold, time, likely impact and a recommended first action." />
        <Card title="Control alert fatigue" text="Deduplicate repeated events, group related devices, apply cooldowns and escalate only unresolved or worsening incidents." />
        <Card title="Acknowledge and assign" text="Record who accepted responsibility, when it happened, notes, resolution and closure evidence." />
        <Card title="Separate warning from control" text="An alert informs a person; an automated command changes the physical system. Give each its own authorisation and audit trail." />
      </div>
    </section>

    <section className="rounded-2xl bg-indigo-50 p-6">
      <h3 className="text-2xl font-bold text-indigo-950">Hands-on project: ESP32 smart ventilation controller</h3>
      <p className="mt-3 leading-8 text-indigo-900">Build an ESP32 system that reads temperature every five seconds, controls a fan locally and publishes monitoring events to MQTT.</p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">{["Validate the sensor value and mark readings stale after 15 seconds.", "Turn the fan on above 35°C and off below 32°C.", "Require two valid high readings before starting the fan.", "Limit continuous fan operation and define a safe fallback.", "Publish sensor, rule, command and reported-state events.", "Create dashboard cards for value, state, freshness and event-to-action latency.", "Generate one deduplicated alert if the fan is commanded on but no expected response is observed.", "Test sensor failure, Wi-Fi loss, MQTT loss, reboot and manual override."].map((text) => <CheckItem key={text} text={text} />)}</div>
      <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-cyan-100"><code>{`if (readingIsValid && temperature > 35 && highCount >= 2) {
  requestFan(ON, "temperature-high");
}
if (temperature < 32 || readingIsStale || maxRuntimeExceeded) {
  requestFan(OFF, "safe-stop");
}
publishReportedState();`}</code></pre>
    </section>

    <section>
      <Title icon={TimerReset} text="Testing and troubleshooting" />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Card title="Fan switches rapidly" text="Add hysteresis, persistence and a minimum on/off interval; inspect noise and calibration." />
        <Card title="Duplicate actuation" text="Use unique command IDs and idempotent handling; acknowledge the stored result when a command is retried." />
        <Card title="Dashboard looks current but is stale" text="Display source timestamp and age, not only the browser refresh time. Alert when freshness exceeds the limit." />
        <Card title="Cloud and device disagree" text="Define source of truth, compare desired and reported state, then reconcile using a versioned command." />
        <Card title="Alert storm after reconnection" text="Expire old events, deduplicate by incident and device, and apply a controlled backlog policy." />
        <Card title="Rule never triggers" text="Inspect units, timestamps, quality flags, threshold operators, persistence window, priority and suppression history." />
      </div>
    </section>

    <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
      <h3 className="text-xl font-bold text-emerald-950">Chapter completion checklist</h3>
      <div className="mt-4 grid gap-2 md:grid-cols-2">{["Local and cloud responsibilities are documented.", "Rules handle noise, stale data and conflicts.", "Actuators have timeouts and safe defaults.", "Commands are traceable and idempotent.", "Dashboards display freshness and outcomes.", "Failure and recovery tests have been completed."].map((text) => <CheckItem key={text} text={text} />)}</div>
      <p className="mt-5 text-emerald-900">Complete the ventilation controller design and score at least 80% in the chapter quiz.</p>
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
    <div className="flex items-center gap-3 border-b pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 9 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
    <div className="mt-6 space-y-6">{questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => {
      const selected = answers[index] === optionIndex;
      const correct = submitted && optionIndex === item.answer;
      const wrong = submitted && selected && optionIndex !== item.answer;
      const style = correct ? "border-green-300 bg-green-50" : wrong ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "hover:bg-slate-50";
      return <label key={option} className={"flex cursor-pointer gap-3 rounded-xl border p-3 " + style}><input type="radio" name={"iot-ch9-" + index} checked={selected} disabled={submitted} onChange={() => setAnswers((value) => ({ ...value, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>;
    })}</div></fieldset>)}</div>
    {!submitted ? <button disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={"mt-6 rounded-2xl border p-6 " + (passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50")}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button onClick={() => { setAnswers({}); setSubmitted(false); }} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
  </section>;
}

function Title({ icon: Icon, text, color = "text-indigo-700" }) { return <div className="flex items-center gap-3"><Icon className={color} /><h3 className="text-2xl font-bold">{text}</h3></div>; }
function Card({ title, text }) { return <div className="rounded-2xl border bg-white p-5"><h4 className="font-bold">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function CheckItem({ text }) { return <div className="flex gap-3 rounded-xl border bg-white p-4"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={20} /><span>{text}</span></div>; }
function Step({ number, text }) { return <li className="flex gap-4 rounded-xl border bg-white p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">{number}</span><span>{text}</span></li>; }
function Metric({ title, text }) { return <div className="rounded-2xl bg-white p-5"><Gauge className="text-cyan-700" size={24} /><h4 className="mt-3 font-bold text-cyan-950">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }

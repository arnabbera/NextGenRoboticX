import { useMemo, useState } from "react";
import {
  Activity,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  Cpu,
  FileText,
  Gauge,
  GitBranch,
  ListChecks,
  MemoryStick,
  Radio,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  TestTube2,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";

const questions = [
  { question: "What should be completed before selecting components for the capstone system?", options: ["Measurable functional, timing and safety requirements", "The enclosure colour only", "A random parts order", "The final presentation"], answer: 0 },
  { question: "Why should the controller move to a safe state after a critical sensor fault?", options: ["To prevent uncontrolled or unsafe output", "To increase PWM frequency", "To erase the firmware", "To bypass all diagnostics"], answer: 0 },
  { question: "Which task should normally own a shared communication peripheral?", options: ["One defined task or driver with controlled access", "Every task simultaneously", "No task", "Only the bootloader"], answer: 0 },
  { question: "What is the purpose of sensor range and plausibility checks?", options: ["Reject values that are impossible or inconsistent", "Increase supply voltage", "Replace calibration", "Disable alarms"], answer: 0 },
  { question: "What does a watchdog supervise most effectively?", options: ["Evidence that critical software continues to make valid progress", "Only the LED state", "PCB dimensions", "The compiler version"], answer: 0 },
  { question: "Why record timestamps with telemetry and faults?", options: ["To reconstruct event order and measure timing", "To make packets larger", "To avoid testing", "To change the ADC reference"], answer: 0 },
  { question: "What does a requirements traceability matrix connect?", options: ["Requirements to design elements and verification evidence", "Only component prices", "Source files to colours", "Tasks to employee names"], answer: 0 },
  { question: "Which test examines the complete integrated product against its requirements?", options: ["System test", "Syntax highlighting", "A single function unit test only", "Schematic drawing"], answer: 0 },
  { question: "What should happen if an actuator command exceeds its permitted limit?", options: ["Clamp or reject it and record the fault according to policy", "Send it unchanged", "Disable every sensor", "Erase configuration memory"], answer: 0 },
  { question: "When is the capstone ready for release?", options: ["When acceptance criteria pass and evidence, risks and limitations are documented", "When it works once on the bench", "Immediately after compilation", "Before fault testing"], answer: 0 },
];

export default function EmbeddedSystemsChapterTenLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 10 • Final Project</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Real-Time Monitoring and Control System</h2>
          <p className="mt-4 leading-8 text-slate-600">Bring the complete course together by designing a dependable embedded controller that samples sensors, makes real-time decisions, controls an actuator, communicates status and moves to a defined safe state when a fault occurs.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold text-slate-900">Project outcomes</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {["Translate a product idea into measurable functional and non-functional requirements.", "Partition hardware and firmware into clear, testable modules.", "Build an RTOS task model with bounded timing and resource ownership.", "Validate sensor data and control an actuator with enforced safety limits.", "Detect, record and recover from representative hardware and software faults.", "Present traceable verification evidence and a professional engineering report."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><Activity className="text-blue-700" /><h3 className="text-2xl font-bold text-blue-950">The system to build</h3></div>
          <p className="mt-4 leading-8 text-blue-950">Create a low-voltage environmental monitoring controller. It reads temperature and one additional sensor, filters and validates the measurements, drives a fan or simulated actuator, displays local status and publishes telemetry over UART or another supported interface.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard title="Inputs" text="Temperature plus light, humidity, pressure or another safe sensor; optional user button." />
            <InfoCard title="Outputs" text="PWM fan, LED load or simulated actuator, status indicators and an alarm output." />
            <InfoCard title="Interface" text="Serial telemetry and commands with bounded frames, validation, timeout and error responses." />
            <InfoCard title="Protection" text="Safe-state control, watchdog supervision, sensor plausibility checks and fault history." />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><ClipboardCheck className="text-indigo-700" /><h3 className="text-2xl font-bold">Define requirements first</h3></div>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[860px] text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-4">ID</th><th className="p-4">Requirement</th><th className="p-4">Acceptance evidence</th></tr></thead><tbody className="divide-y divide-slate-200 text-slate-700">
              <Requirement id="SYS-01" requirement="Sample each sensor every 100 ms ±10 ms." evidence="Timestamp log across normal and peak load." />
              <Requirement id="SYS-02" requirement="Update the control output within 50 ms of a valid threshold crossing." evidence="Stimulus-to-output timing measurement." />
              <Requirement id="SYS-03" requirement="Reject invalid, stale or implausible sensor data." evidence="Injected open, short, out-of-range and frozen values." />
              <Requirement id="SYS-04" requirement="Enter the documented safe state after a critical fault." evidence="Fault-injection test and measured output state." />
              <Requirement id="SYS-05" requirement="Publish status and fault telemetry at least once per second." evidence="Captured and decoded serial log." />
              <Requirement id="SYS-06" requirement="Recover from a simulated task stall through supervised watchdog reset." evidence="Reset-cause record and controlled recovery demonstration." />
            </tbody></table>
          </div>
          <p className="mt-4 leading-8 text-slate-600">Adapt numeric limits to your hardware, then freeze a baseline. Every requirement must be unambiguous, feasible and verifiable.</p>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><GitBranch className="text-cyan-300" /><h3 className="text-2xl font-bold">Reference architecture</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DarkCard title="Acquisition" text="Timer or RTOS release → ADC/digital sensor → range and plausibility checks → sample queue." />
            <DarkCard title="Control" text="Validated sample → state machine and limits → PWM or digital actuator command." />
            <DarkCard title="Communication" text="Telemetry queue → framed UART output; received commands pass length, format and range checks." />
            <DarkCard title="Diagnostics" text="Health counters, reset cause, timing margins, stack levels and fault records." />
            <DarkCard title="Storage" text="Versioned configuration with CRC, safe defaults and power-failure-aware update." />
            <DarkCard title="Supervision" text="Independent progress checks decide whether watchdog refresh is justified." />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><Cpu className="text-violet-700" /><h3 className="text-2xl font-bold">RTOS task design</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <TaskCard title="Sensor task" timing="100 ms period" text="Acquires, timestamps and validates inputs before publishing an immutable sample." />
            <TaskCard title="Control task" timing="Event driven" text="Consumes the latest valid sample and applies hysteresis, bounds and safe-state logic." />
            <TaskCard title="Comms task" timing="1 s telemetry" text="Owns the serial peripheral and handles bounded transmit and receive queues." />
            <TaskCard title="Health task" timing="500 ms period" text="Checks task heartbeats, stack margin, errors and system readiness for watchdog refresh." />
          </div>
          <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 leading-7 text-amber-950">Determine priorities from deadlines, execution time and blocking—not task names. Avoid sharing sensor buffers directly; pass completed messages through queues.</p>
        </section>

        <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
          <div className="flex items-center gap-3"><Gauge className="text-cyan-700" /><h3 className="text-2xl font-bold text-cyan-950">Control behaviour</h3></div>
          <p className="mt-4 leading-8 text-cyan-900">Use a state machine so behaviour is explicit. A simple controller can use <b>STARTUP</b>, <b>NORMAL</b>, <b>WARNING</b> and <b>SAFE</b> states. Apply hysteresis around thresholds so noise does not rapidly switch the actuator.</p>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-cyan-200"><code>{`if (!sample.valid || sample.age_ms > SENSOR_TIMEOUT_MS) {
  state = SAFE;
  actuator_set(SAFE_OUTPUT);
  fault_raise(FAULT_SENSOR);
} else if (sample.temperature >= HIGH_LIMIT) {
  state = WARNING;
  actuator_set(MAX_SAFE_OUTPUT);
} else if (sample.temperature <= LOW_LIMIT) {
  state = NORMAL;
  actuator_set(NORMAL_OUTPUT);
}`}</code></pre>
          <p className="mt-4 leading-7 text-cyan-900">The example illustrates intent. Use calibrated units, handle every state transition and ensure hardware defaults remain safe during startup and reset.</p>
        </section>

        <section>
          <div className="flex items-center gap-3"><Wrench className="text-emerald-700" /><h3 className="text-2xl font-bold">Hardware implementation checklist</h3></div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {["Confirm voltage compatibility, pin functions, grounds and current limits from datasheets.", "Use suitable decoupling near the MCU and sensors; keep noisy actuator currents away from analog paths.", "Drive inductive loads through a rated transistor or driver with required flyback protection.", "Provide debug/programming access and useful test points for power, signals and buses.", "Choose pull-ups, pull-downs and I²C values deliberately; never leave safety-related inputs floating.", "Start with a current-limited supply and verify power rails before inserting or enabling every module."].map((item) => <div key={item} className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950">✓ {item}</div>)}
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Radio className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Telemetry and commands</h3></div>
          <p className="mt-4 leading-8 text-indigo-900">Define a small protocol rather than printing uncontrolled text from several tasks. Each message should contain a type, sequence number, timestamp, payload length and integrity check when required.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <InfoCard title="Status" text="Current state, sensor values, actuator command, uptime and active fault mask." />
            <InfoCard title="Diagnostics" text="Reset cause, missed deadlines, queue high-water marks, stack margin and error counters." />
            <InfoCard title="Commands" text="Allowlisted operations only; validate framing, length, range, state and authorization assumptions." />
          </div>
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-3"><ShieldAlert className="text-red-700" /><h3 className="text-2xl font-bold text-red-950">Fault handling and safe state</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <FaultCard fault="Sensor missing" response="Invalidate data, stop dependent control and apply safe output." />
            <FaultCard fault="Out-of-range reading" response="Reject the sample, increment diagnostics and follow the configured severity policy." />
            <FaultCard fault="Communication timeout" response="Keep local safety active; mark remote data stale and restrict remote commands." />
            <FaultCard fault="Queue overflow" response="Record overload, preserve critical data and enter a degraded or safe mode if required." />
            <FaultCard fault="Task stall" response="Health supervision withholds watchdog refresh and records recovery context." />
            <FaultCard fault="Brown-out/reset" response="Hardware protection resets safely; startup reads reset cause and validates persistent data." />
          </div>
          <p className="mt-4 font-semibold leading-7 text-red-950">A safe state is application-specific and must be defined from hazard analysis. “Turn everything off” is not automatically safe for every machine.</p>
        </section>

        <section>
          <div className="flex items-center gap-3"><TestTube2 className="text-blue-700" /><h3 className="text-2xl font-bold">Verification strategy</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <TestCard title="Unit" text="Filters, CRC, state transitions, conversions and limit functions with boundary values." />
            <TestCard title="Integration" text="Sensor drivers, queues, control output, storage and communication working together." />
            <TestCard title="System" text="End-to-end behaviour measured against every acceptance criterion." />
            <TestCard title="Fault injection" text="Disconnected sensor, corrupt frame, blocked task, full queue, reset and low supply." />
          </div>
          <ol className="mt-5 space-y-3 text-slate-700">
            {["Record the test ID, linked requirement, setup, stimulus and expected result.", "Capture measured timing, logs, waveforms or photographs as objective evidence.", "Repeat boundary, sustained-load and recovery tests—not only nominal demonstrations.", "Record failures, determine root cause, implement the correction and rerun affected regression tests."].map((item, index) => <li key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4"><span className="font-bold text-blue-700">{index + 1}.</span><span>{item}</span></li>)}
          </ol>
        </section>

        <section className="rounded-2xl bg-amber-50 p-6">
          <div className="flex items-center gap-3"><MemoryStick className="text-amber-700" /><h3 className="text-2xl font-bold text-amber-950">Measure resource margins</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Metric title="CPU" text="Worst observed utilisation and execution time under peak event load." />
            <Metric title="Stack" text="Minimum remaining stack for each task and interrupt context." />
            <Metric title="Queues" text="Maximum occupancy, drops, timeouts and overload policy operation." />
            <Metric title="Memory & power" text="Flash/RAM usage, persistent endurance assumptions and operating current profile." />
          </div>
          <p className="mt-4 leading-7 text-amber-950">Test observations are evidence for the tested conditions, not proof of every possible worst case. State assumptions and apply suitable engineering margin.</p>
        </section>

        <section>
          <div className="flex items-center gap-3"><FileText className="text-violet-700" /><h3 className="text-2xl font-bold">Required project submission</h3></div>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {["Problem statement, scope, assumptions and measurable requirements", "System block diagram, circuit schematic, pin map and bill of materials", "Task table, state machine, communication protocol and data ownership", "Source code with build instructions and version identification", "Risk analysis, safe-state definition and fault-handling table", "Test plan, traceability matrix, captured results and unresolved limitations", "Short demonstration showing nominal control and at least three injected faults", "Final reflection covering design decisions, lessons learned and next improvements"].map((item) => <li key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4"><ListChecks className="mt-0.5 shrink-0 text-violet-700" size={20} /><span>{item}</span></li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-emerald-50 p-6">
          <div className="flex items-center gap-3"><ShieldCheck className="text-emerald-700" /><h3 className="text-2xl font-bold text-emerald-950">Capstone completion checklist</h3></div>
          <p className="mt-3 leading-8 text-emerald-900">Your project is complete when the hardware is electrically safe, the firmware builds reproducibly, every requirement is traced to passing evidence, timing and resource margins are recorded, critical faults produce the defined safe response, and another learner can understand and reproduce the system from your documentation.</p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Course revision summary</h3>
          <p className="mt-3 leading-8 text-blue-900">A professional embedded system combines architecture, electronics, Embedded C, peripherals, timing, analog interfaces, communication, memory, power, reliability and RTOS design. The final result is judged not only by whether it operates, but by whether its behaviour is bounded, testable, safe and supported by evidence.</p>
        </section>
      </article>
      <ChapterQuiz />
    </>
  );
}

function ChapterQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);
  const complete = Object.keys(answers).length === questions.length;
  const passed = score >= 8;
  const reset = () => { setAnswers({}); setSubmitted(false); };
  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 10 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => {
    const selected = answers[index] === optionIndex;
    const correct = submitted && optionIndex === item.answer;
    const incorrect = submitted && selected && optionIndex !== item.answer;
    return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`embedded-ch10-${index}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>;
  })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Final chapter quiz passed" : "Review the capstone lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function InfoCard({ title, text }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function DarkCard({ title, text }) { return <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><h4 className="font-bold text-cyan-200">{title}</h4><p className="mt-2 leading-7 text-slate-200">{text}</p></div>; }
function Requirement({ id, requirement, evidence }) { return <tr><th className="p-4 font-bold text-blue-700">{id}</th><td className="p-4">{requirement}</td><td className="p-4">{evidence}</td></tr>; }
function TaskCard({ title, timing, text }) { return <div className="rounded-2xl border border-violet-200 p-5"><span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-800">{timing}</span><h4 className="mt-4 font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function FaultCard({ fault, response }) { return <div className="rounded-2xl bg-white p-5"><div className="flex items-center gap-2"><Zap className="text-red-600" size={19} /><h4 className="font-bold text-red-950">{fault}</h4></div><p className="mt-2 leading-7 text-slate-600">{response}</p></div>; }
function TestCard({ title, text }) { return <div className="rounded-2xl border border-blue-200 p-5"><h4 className="font-bold text-blue-950">{title} test</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function Metric({ title, text }) { return <div className="rounded-2xl bg-white p-5"><h4 className="font-bold text-amber-950">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }

import { useMemo, useState } from "react";
import {
  BatteryCharging,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Database,
  Gauge,
  HardDrive,
  MemoryStick,
  Moon,
  RefreshCcw,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Thermometer,
  XCircle,
  Zap,
} from "lucide-react";

const questions = [
  { question: "Which memory normally holds variables, stack and temporary buffers while the device is running?", options: ["SRAM", "Program Flash only", "Fuse labels", "PCB silkscreen"], answer: 0 },
  { question: "What happens to ordinary SRAM contents after power is removed?", options: ["They are normally lost", "They become program instructions", "They move automatically to Flash", "They become read-only"], answer: 0 },
  { question: "Why should Flash or EEPROM write endurance be considered?", options: ["Each location supports a finite number of program/erase cycles", "Memory can never be read", "Writes increase GPIO voltage", "It determines UART parity"], answer: 0 },
  { question: "What is wear levelling?", options: ["Distributing writes across storage locations to avoid repeatedly wearing one location", "Lowering the supply voltage", "Increasing stack depth", "Sorting interrupt priorities"], answer: 0 },
  { question: "Which action commonly reduces dynamic power consumption?", options: ["Lowering unnecessary clock frequency and disabling unused peripherals", "Running every peripheral continuously", "Increasing switching activity", "Removing all sleep modes"], answer: 0 },
  { question: "What is a wake-up source?", options: ["An event allowed to return the processor from a low-power state", "A Flash erase command only", "A motor flyback diode", "A compiler warning"], answer: 0 },
  { question: "What should a watchdog prove before it is refreshed?", options: ["The supervised software is making valid progress", "Only that one line of code executed", "The battery is fully charged", "The enclosure is closed"], answer: 0 },
  { question: "What is the purpose of brown-out protection?", options: ["Prevent unreliable operation when supply voltage is below a safe threshold", "Increase ADC sample count", "Select an I²C address", "Improve Flash endurance"], answer: 0 },
  { question: "What makes a configuration record more resilient to interrupted writes?", options: ["Version, length, integrity check and an atomic update strategy", "One unchecked byte", "Writing continuously in a tight loop", "Using an unknown address"], answer: 0 },
  { question: "What is a useful reliability design principle?", options: ["Detect faults, limit their effect and recover to a defined safe state", "Assume faults never happen", "Disable diagnostics", "Use maximum clock speed at all times"], answer: 0 },
];

export default function EmbeddedSystemsChapterEightLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 8</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Memory, Power Management and Reliability</h2>
          <p className="mt-4 leading-8 text-slate-600">Reliable embedded systems preserve important data, operate within limited energy and recover safely when hardware or software behaves unexpectedly. This chapter connects memory architecture, low-power design and fault-management techniques into one disciplined product strategy.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold text-slate-900">Learning objectives</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {["Compare Flash, SRAM, EEPROM and external storage.", "Interpret code, data, BSS, stack and heap memory regions.", "Store configuration safely within endurance and power-failure limits.", "Estimate energy use and select useful low-power modes.", "Design watchdog, brown-out and reset-cause handling.", "Apply fault detection, safe states, redundancy and reliability testing."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><MemoryStick className="text-blue-700" /><h3 className="text-2xl font-bold text-blue-950">Embedded memory technologies</h3></div>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-blue-100 bg-white">
            <table className="w-full min-w-[820px] text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-4">Memory</th><th className="p-4">Retains data?</th><th className="p-4">Typical use</th><th className="p-4">Design concern</th></tr></thead><tbody className="divide-y divide-slate-200 text-slate-700">
              <MemoryRow name="Flash / ROM" retains="Yes" use="Program code, constants and boot image" concern="Erase granularity, programming time and endurance" />
              <MemoryRow name="SRAM" retains="No" use="Variables, stack, heap and communication buffers" concern="Limited capacity, corruption and peak usage" />
              <MemoryRow name="EEPROM / data Flash" retains="Yes" use="Calibration, counters and configuration" concern="Write endurance, write time and interrupted updates" />
              <MemoryRow name="External Flash / FRAM" retains="Yes" use="Logs, assets, firmware images or high-cycle records" concern="Interface failure, integrity, security and technology-specific limits" />
            </tbody></table>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><Database className="text-indigo-700" /><h3 className="text-2xl font-bold">Firmware memory layout</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Concept icon={HardDrive} title="Text and constants" text="Executable instructions and read-only values normally stored in non-volatile program memory." />
            <Concept icon={Database} title="Initialised data" text="Writable global/static variables with initial values copied into RAM during startup." />
            <Concept icon={RefreshCcw} title="BSS" text="Zero-initialised global/static objects cleared by startup code." />
            <Concept icon={MemoryStick} title="Stack" text="Function calls, return state, parameters and automatic local variables; usually grows and shrinks at runtime." />
            <Concept icon={Gauge} title="Heap" text="Region used by dynamic allocation when enabled; fragmentation and allocation failure require a policy." />
            <Concept icon={ShieldCheck} title="Reserved regions" text="Bootloader, vector table, persistent records and update slots defined by the linker and device map." />
          </div>
          <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 leading-7 text-amber-950"><b>Measure, do not guess:</b> review the linker map and build report. Test worst-case stack depth, maximum buffer occupancy and every allocation-failure path.</p>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <h3 className="text-2xl font-bold">Common memory failures</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DarkCard title="Stack overflow" text="Deep calls, large local arrays or interrupts exceed the reserved stack and corrupt nearby data." />
            <DarkCard title="Buffer overrun" text="Code reads or writes beyond an object's bounds, damaging state or exposing a security weakness." />
            <DarkCard title="Use-after-free" text="A pointer refers to dynamic memory after ownership ended." />
            <DarkCard title="Fragmentation" text="Free heap exists but not as a suitable contiguous block for a new request." />
            <DarkCard title="Uninitialised data" text="Execution depends on an indeterminate value or stale retained RAM." />
            <DarkCard title="Interrupted storage write" text="Power loss leaves a partially programmed or inconsistent persistent record." />
          </div>
        </section>

        <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
          <div className="flex items-center gap-3"><HardDrive className="text-cyan-700" /><h3 className="text-2xl font-bold text-cyan-950">Safe non-volatile storage</h3></div>
          <p className="mt-4 leading-8 text-cyan-900">Persistent records should be self-describing and independently verifiable. Include a format version, payload length, sequence number and CRC or other integrity check. Validate every field before use and retain safe defaults.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard title="Atomic update" text="Write a new record to an inactive slot, verify it, then commit it with a final marker or sequence change. Keep the previous valid copy until completion." />
            <InfoCard title="Wear management" text="Limit unnecessary writes, combine updates and rotate among records or pages when lifetime calculations require it." />
          </div>
          <Formula title="Approximate write lifetime" expression="lifetime ≈ endurance cycles × locations used / writes per unit time" explanation="This is a planning estimate. Apply device specifications, erase-page behaviour, temperature effects and safety margin." />
        </section>

        <section>
          <div className="flex items-center gap-3"><BatteryCharging className="text-emerald-700" /><h3 className="text-2xl font-bold">Power and energy fundamentals</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Formula title="Electrical power" expression="P = V × I" explanation="Instantaneous consumption depends on voltage and current." />
            <Formula title="Energy" expression="E = P × time" explanation="Battery life depends on energy over the complete operating profile." />
            <Formula title="Average current" expression="Iavg = Σ(Istate × tstate) / total time" explanation="Use active, idle, sleep, sensor, radio and actuator intervals." />
          </div>
          <p className="mt-4 leading-8 text-slate-600">Battery capacity ratings depend on load, temperature, age, chemistry and cutoff voltage. Regulators, leakage, self-discharge and peak-current capability must be included; a simple capacity/current estimate is only a first approximation.</p>
        </section>

        <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Moon className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Low-power operating modes</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <PowerMode title="Run" text="CPU and required peripherals execute; performance is highest and current is usually greatest." />
            <PowerMode title="Idle / sleep" text="CPU stops while selected clocks and peripherals remain available for quick wake-up." />
            <PowerMode title="Deep sleep / stop" text="More clock domains and memory blocks are disabled or retained selectively." />
            <PowerMode title="Standby / shutdown" text="Lowest consumption, but wake-up may resemble reset and retained context is limited." />
          </div>
          <p className="mt-5 leading-8 text-indigo-900">Wake sources may include timers, RTC alarms, GPIO edges, communication activity or analog comparators. Verify which clocks, RAM banks and peripheral registers survive each mode.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Practical low-power strategy</h3>
          <ol className="mt-5 space-y-3 text-slate-700">
            {["Measure current in each operating state with representative hardware.", "Remove unnecessary polling and replace it with events, interrupts or scheduled work.", "Disable unused peripheral clocks, analog blocks and debug features where safe.", "Reduce clock frequency or voltage only within documented operating limits.", "Batch sensor and radio work so the system can remain asleep longer.", "Configure pins to avoid floating inputs and unintended external current paths.", "Select the deepest mode whose wake latency and retained state meet requirements.", "Re-measure the complete duty cycle and validate every wake source."].map((item, index) => <li key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4"><span className="font-bold text-blue-700">{index + 1}.</span><span>{item}</span></li>)}
          </ol>
        </section>

        <section className="rounded-2xl bg-amber-50 p-6">
          <div className="flex items-center gap-3"><Clock3 className="text-amber-700" /><h3 className="text-2xl font-bold text-amber-950">Reliable sleep and wake sequencing</h3></div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {["Complete or safely cancel pending storage and communication transactions.", "Configure and clear the intended wake source before sleeping.", "Prevent the check-then-sleep race with the architecture's supported atomic sequence.", "Place outputs and external devices into safe low-power states.", "After wake, restore clocks and peripherals in the required order.", "Identify the wake reason and reject stale events before normal processing."].map((item) => <div key={item} className="rounded-xl bg-white p-4 text-amber-950">✓ {item}</div>)}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><ShieldAlert className="text-red-700" /><h3 className="text-2xl font-bold">Watchdogs, reset and brown-out protection</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Concept icon={Clock3} title="Independent watchdog" text="Uses a separate clock where supported and resets the system if valid progress is not demonstrated in time." />
            <Concept icon={Zap} title="Brown-out detector" text="Holds or resets the device when supply voltage is too low for reliable operation." />
            <Concept icon={RefreshCcw} title="Reset-cause record" text="Captures power-on, watchdog, brown-out, software and external reset causes before flags are cleared." />
          </div>
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-5 leading-7 text-red-950"><b>Do not refresh a watchdog blindly:</b> a health monitor should confirm that required tasks, communication and control loops have progressed. After reset, outputs must default safe and repeated resets should lead to a controlled degraded mode.</p>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="flex items-center gap-3"><ShieldCheck className="text-emerald-700" /><h3 className="text-2xl font-bold text-emerald-950">Reliability engineering</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ReliabilityCard title="Prevention" text="Margins, derating, decoupling, validated interfaces and bounded software reduce fault likelihood." />
            <ReliabilityCard title="Detection" text="Timeouts, range checks, CRCs, watchdogs, self-tests and sensor plausibility reveal abnormal behaviour." />
            <ReliabilityCard title="Containment" text="Isolation, current limits, memory protection and state ownership prevent fault propagation." />
            <ReliabilityCard title="Recovery" text="Retries, reinitialisation, fallback data, safe state and controlled reset restore service where possible." />
            <ReliabilityCard title="Evidence" text="Fault injection, endurance testing, environmental tests and traceable logs demonstrate behaviour." />
            <ReliabilityCard title="Maintenance" text="Versioned configuration, rollback-capable updates and diagnosable field records support the lifecycle." />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><Thermometer className="text-orange-700" /><h3 className="text-2xl font-bold">Environmental and lifetime factors</h3></div>
          <p className="mt-4 leading-8 text-slate-600">Temperature affects battery capacity, oscillator accuracy, leakage, component lifetime and non-volatile-memory retention. Voltage transients, ESD, vibration, moisture and electromagnetic interference can create intermittent failures. Design limits must cover the real environment with margin and be verified by suitable testing.</p>
        </section>

        <section className="rounded-2xl bg-violet-50 p-6">
          <h3 className="text-2xl font-bold text-violet-950">Hands-on activity: low-power reliable data logger</h3>
          <p className="mt-3 leading-8 text-violet-900">Build a low-voltage sensor logger that wakes periodically, samples a sensor, validates the result, updates a persistent record only when needed, and returns to sleep. Add watchdog supervision, reset-cause reporting and safe defaults for missing or corrupt configuration.</p>
          <ol className="mt-5 space-y-3 text-violet-950">
            {["Create a memory budget from the linker/build report and estimate worst-case stack use.", "Define a versioned configuration record with length, sequence and CRC.", "Implement two-slot update logic and simulate power interruption between write steps.", "Measure run and sleep current, then calculate average current from the duty cycle.", "Test timer wake, sensor fault, corrupt record, watchdog reset and brown-out reset behaviour.", "Document measured energy, recovery result, safe state and remaining reliability risks."].map((item, index) => <li key={item} className="flex gap-3 rounded-xl bg-white p-4"><span className="font-bold text-violet-700">{index + 1}.</span><span>{item}</span></li>)}
          </ol>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• Flash, SRAM and persistent data memories have different lifetime, speed and retention properties.</li>
            <li>• Memory budgets must include worst-case stack, buffers and controlled allocation behaviour.</li>
            <li>• Persistent records need integrity checks, atomic updates and endurance management.</li>
            <li>• Low-power design depends on measured duty cycles, wake sources and complete-system current.</li>
            <li>• Reliability combines prevention, detection, containment, recovery and verification evidence.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Chapter completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the data-logger activity, explain the firmware memory regions, design an atomic persistent record, calculate average current, select a sleep mode and wake source, explain watchdog supervision and brown-out recovery, and score at least 80% in the quiz.</p>
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
  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 8 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => {
    const selected = answers[index] === optionIndex;
    const correct = submitted && optionIndex === item.answer;
    const incorrect = submitted && selected && optionIndex !== item.answer;
    return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`embedded-ch8-${index}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>;
  })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function MemoryRow({ name, retains, use, concern }) { return <tr><th className="p-4 font-bold text-slate-900">{name}</th><td className="p-4">{retains}</td><td className="p-4">{use}</td><td className="p-4">{concern}</td></tr>; }
function Concept({ icon: Icon, title, text }) { return <div className="rounded-2xl border border-slate-200 p-5"><Icon className="text-blue-600" size={27} /><h4 className="mt-3 text-lg font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function DarkCard({ title, text }) { return <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><h4 className="font-bold text-sky-200">{title}</h4><p className="mt-2 leading-7 text-slate-200">{text}</p></div>; }
function InfoCard({ title, text }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function Formula({ title, expression, explanation }) { return <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><code className="mt-3 block rounded-lg bg-slate-950 p-3 text-cyan-300">{expression}</code><p className="mt-3 leading-7 text-slate-600">{explanation}</p></div>; }
function PowerMode({ title, text }) { return <div className="rounded-2xl bg-white p-5"><h4 className="font-bold text-indigo-950">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function ReliabilityCard({ title, text }) { return <div className="rounded-2xl bg-white p-5"><h4 className="font-bold text-emerald-950">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }

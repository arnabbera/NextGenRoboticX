import { useMemo, useState } from "react";
import { Activity, CheckCircle2, CircleHelp, ClipboardCheck, Eye, Gauge, RotateCcw, Search, ShieldCheck, Thermometer, Wrench, XCircle, Zap } from "lucide-react";

const questions = [
  { question: "What should be checked before applying power to a new PCB?", options: ["Only the silkscreen colour", "Visual condition and resistance between power rails and ground", "Only firmware version", "Only enclosure fit"], answer: 1 },
  { question: "Why use a current-limited bench supply for first power-up?", options: ["To reduce damage if a fault draws excessive current", "To increase every rail voltage", "To replace inspection", "To program the PCB automatically"], answer: 0 },
  { question: "What is a good assembly order for manual prototypes?", options: ["Fit everything before inspection", "Start with low-profile and critical power parts, inspecting by stage", "Connect mains first", "Solder connectors before every small component in all cases"], answer: 1 },
  { question: "What commonly causes a solder bridge?", options: ["Excess solder joining adjacent conductors", "Insufficient board thickness", "A missing BOM", "A software breakpoint"], answer: 0 },
  { question: "Why must a polarized component's orientation be checked?", options: ["Incorrect orientation may cause malfunction or damage", "It changes board colour", "It affects only silkscreen", "Orientation never matters"], answer: 0 },
  { question: "What should be verified first after controlled power is applied?", options: ["Application features", "Input current and power rails", "Wireless range", "Enclosure labels"], answer: 1 },
  { question: "What does divide-and-conquer debugging mean?", options: ["Change many parts at once", "Isolate the system into blocks and test boundaries systematically", "Ignore the schematic", "Replace the entire board"], answer: 1 },
  { question: "Why use an oscilloscope ground spring for fast measurements?", options: ["To minimise the probe loop and measurement artefacts", "To increase ringing", "To raise signal voltage", "To remove bandwidth"], answer: 0 },
  { question: "What must be done after rework?", options: ["Skip inspection", "Clean as required, inspect, and repeat affected electrical tests", "Delete the change record", "Immediately ship the board"], answer: 1 },
  { question: "What makes a fault report useful?", options: ["A vague description", "Reproducible conditions, expected and actual results, evidence and actions", "Only a photograph", "Only a component name"], answer: 1 },
];

export default function PCBChapterNineLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 9</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">PCB Assembly, Soldering, Bring-Up and Debugging</h2>
          <p className="mt-4 leading-8 text-slate-600">The first assembled board converts design assumptions into measurable evidence. This chapter explains controlled assembly, solder-joint inspection, current-limited power-up, staged functional bring-up, instrument use, fault isolation, safe rework and the records needed for the next hardware revision.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold">Learning objectives</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {["Prepare components, tools, ESD controls and assembly documentation.", "Create reliable hand-soldered and reflowed connections.", "Inspect polarity, orientation, bridges, opens and workmanship.", "Power a prototype safely and verify rails in sequence.", "Use a multimeter, oscilloscope and logic tools correctly.", "Debug by hypothesis, measurement and controlled rework."].map((item) => <div key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</div>)}
          </div>
        </section>

        <Section icon={ClipboardCheck} title="Prepare before assembly">
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Controlled documents" text="Use the released BOM, assembly drawings, polarity marks, do-not-fit list and PCB revision." />
            <Card title="Component verification" text="Check part number, value, package, quantity, moisture or storage needs and orientation." />
            <Card title="Tools and materials" text="Use temperature-controlled soldering, suitable tips, flux, solder, magnification, cleaning and extraction." />
            <Card title="ESD control" text="Use grounded work surfaces and handling procedures appropriate to sensitive devices." />
          </div>
        </Section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><Wrench className="text-sky-300" /><h3 className="text-2xl font-bold">Soldering fundamentals</h3></div>
          <p className="mt-4 leading-8 text-slate-200">A reliable joint requires clean surfaces, suitable flux, adequate heat transfer and correct solder volume. Heat pad and lead together, feed solder into the joint, remove solder, then remove heat without disturbing the joint. Excessive time or force can lift pads and damage components.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <DarkCard title="Good joint" text="Proper wetting, smooth profile, correct solder amount and no unintended connection." />
            <DarkCard title="Open or cold joint" text="Poor wetting, insufficient heat, contamination, movement or missing solder causes unreliable contact." />
            <DarkCard title="Bridge or excess" text="Adjacent pads become connected or solder obscures the joint and inspection." />
          </div>
        </section>

        <Section icon={Eye} title="Inspection and cleaning">
          <p>Inspect under suitable magnification after each assembly stage. Check value and orientation, pin alignment, solder wetting, bridges, opens, tombstoning, solder balls, damaged mask, lifted pads and contamination. Follow the material process for flux cleaning; residues can affect leakage, corrosion and inspection.</p>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950"><b>Polarity check:</b> independently verify diodes, LEDs, electrolytic capacitors, IC pin 1, connectors, batteries and protection devices against both the assembly drawing and datasheet.</div>
        </Section>

        <Section icon={ShieldCheck} title="Unpowered checks">
          <ol className="space-y-3">
            {["Confirm board and assembly revision.", "Inspect for damage, wrong parts, orientation errors and solder defects.", "Measure resistance from every supply rail to ground and compare with expectations.", "Use diode or continuity mode only with awareness of components connected to the net.", "Check fuses, polarity paths, isolation barriers and connector pinout.", "Remove or isolate loads that should not be present during initial rail testing."].map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-slate-200 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span>{item}</li>)}
          </ol>
        </Section>

        <Section icon={Zap} title="Controlled first power-up">
          <p>Use a current-limited supply, correct polarity and a conservative current limit derived from expected consumption. Monitor current while raising input to the intended value. Stop immediately if current, smell, sound or temperature is abnormal. Verify input protection, then each rail, power-good, reset and clock before connecting expensive loads.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card title="Record" text="Input voltage and current, every rail voltage, start-up sequence, ripple, reset state and component temperature." />
            <Card title="Stop conditions" text="Unexpected current limit, wrong rail, rapid heating, oscillation, smoke, odour or unstable supply." />
          </div>
        </Section>

        <Section icon={Activity} title="Staged board bring-up">
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="1. Power" text="Validate protection, regulators, sequencing, ripple and thermal behaviour." />
            <Card title="2. Core controller" text="Verify reset, clock, boot mode, programming connection and a minimal diagnostic image." />
            <Card title="3. Communications" text="Test UART, I²C, SPI, USB, CAN or Ethernet one interface at a time." />
            <Card title="4. Inputs and outputs" text="Apply known stimuli, use safe loads and compare measurements with acceptance limits." />
          </div>
        </Section>

        <Section icon={Gauge} title="Measurement tools and technique">
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Digital multimeter" text="DC voltage, resistance, continuity, diode drop and current—with correct jack, range and circuit state." />
            <Card title="Oscilloscope" text="Rail start-up, ripple, clock, reset, ringing and timing using suitable bandwidth and a short ground connection." />
            <Card title="Logic analyser" text="Digital state and protocol timing; verify voltage compatibility before attaching channels." />
            <Card title="Current and thermal tools" text="Bench-supply logging, current probe, thermocouple or thermal camera for load and hot-spot analysis." />
          </div>
        </Section>

        <Section icon={Search} title="Systematic fault isolation">
          <p>First reproduce the fault and write expected versus actual behaviour. Divide the board into blocks and measure at known boundaries. Form one hypothesis, choose a test that can disprove it, record the result and change only one variable at a time. Compare with the schematic, layout, datasheet and a known-good board where available.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Card title="Power fault" text="Check shorts, polarity, enable, feedback, load, stability and thermal shutdown." />
            <Card title="Communication fault" text="Check voltage levels, ground, pull resistors, pin mapping, timing, termination and protocol configuration." />
            <Card title="Intermittent fault" text="Check solder joints, connectors, board flex, temperature, vibration, marginal timing and supply transients." />
          </div>
        </Section>

        <Section icon={Thermometer} title="Rework and post-rework validation">
          <p>Use controlled heat, flux and suitable tools. Protect nearby parts, avoid excessive pad stress and follow package moisture or temperature guidance. After rework, inspect the area, clean as required, verify continuity and isolation, repeat affected power and functional tests, and record the component, reason and result.</p>
        </Section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="text-2xl font-bold text-red-950">Laboratory safety</h3>
          <ul className="mt-4 space-y-2 leading-7 text-red-900">
            <li>• Use fume extraction and eye protection; treat irons and hot-air tools as burn hazards.</li>
            <li>• Disconnect power before resistance checks or physical rework.</li>
            <li>• Discharge capacitors and verify stored energy before handling.</li>
            <li>• Do not probe mains, high voltage or high-energy battery circuits without trained supervision and rated equipment.</li>
            <li>• Secure loose jewellery, cables and tools around energized hardware.</li>
          </ul>
        </section>

        <section className="rounded-2xl bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Wrench className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Practical activity: prototype bring-up report</h3></div>
          <p className="mt-3 leading-8 text-indigo-900">Using a safe low-voltage board, prepare an inspection checklist and expected-current table. Perform unpowered checks, current-limited power-up, rail and reset measurements, controller programming and one interface test. Document setup, readings, photographs, deviations, corrective action and final pass/fail status.</p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• Controlled documents and ESD-safe preparation precede assembly.</li>
            <li>• Inspection checks both component identity and solder-joint quality.</li>
            <li>• First power-up uses current limiting and explicit stop conditions.</li>
            <li>• Bring-up proceeds from power to core control, interfaces and loads.</li>
            <li>• Effective debugging uses reproducible evidence and one controlled change at a time.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the bring-up report, demonstrate safe measurements, document any rework and regression test, and score at least 80% in the quiz.</p>
        </section>
      </article>
      <ChapterQuiz />
    </>
  );
}

function Section({ icon: Icon, title, children }) {
  return <section><div className="flex items-center gap-3"><Icon className="text-blue-700" /><h3 className="text-2xl font-bold">{title}</h3></div><div className="mt-4 leading-8 text-slate-700">{children}</div></section>;
}
function Card({ title, text }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>;
}
function DarkCard({ title, text }) {
  return <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><h4 className="font-bold text-sky-200">{title}</h4><p className="mt-2 leading-7 text-slate-200">{text}</p></div>;
}
function ChapterQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);
  const complete = Object.keys(answers).length === questions.length;
  const passed = score >= 8;
  const reset = () => { setAnswers({}); setSubmitted(false); };
  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 9 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
      <div className="mt-6 space-y-6">
        {questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[index] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={"flex cursor-pointer gap-3 rounded-xl border p-3 " + (correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50")}><input type="radio" name={"pcb-ch9-" + index} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}
      </div>
      {!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={"mt-6 rounded-2xl border p-6 " + (passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50")}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
    </section>
  );
}

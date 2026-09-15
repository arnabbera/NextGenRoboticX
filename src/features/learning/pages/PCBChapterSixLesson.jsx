import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, CircuitBoard, ClipboardCheck, Component, GitBranch, Move, RotateCcw, Route, ShieldCheck, Waves, Wrench, XCircle, Zap } from "lucide-react";

const questions = [
  { question: "Which components should normally be placed first?", options: ["Random resistors", "Mechanically fixed connectors, controls, holes and critical interfaces", "Only decoupling capacitors", "Silkscreen labels"], answer: 1 },
  { question: "Where should a decoupling capacitor be placed?", options: ["Close to the IC supply and ground pins", "At the opposite board edge", "Inside the connector", "Anywhere on the same net"], answer: 0 },
  { question: "Why minimise the area of a high-current switching loop?", options: ["To reduce inductance, noise and emissions", "To increase voltage drop", "To remove protection", "To make traces longer"], answer: 0 },
  { question: "What primarily determines required trace width?", options: ["Silkscreen colour", "Current, permitted temperature rise, copper thickness and geometry", "Net name length", "Board title"], answer: 1 },
  { question: "Why should a signal avoid crossing a split reference plane?", options: ["The return path is forced into a larger loop", "The signal becomes DC", "It deletes the net", "It increases solder mask"], answer: 0 },
  { question: "What should happen when a high-speed signal changes layers?", options: ["Ignore its return current", "Provide a nearby reference-transition path such as a stitching via", "Remove the ground plane", "Add an open stub"], answer: 1 },
  { question: "What is important for differential-pair routing?", options: ["Consistent geometry, coupling and reference path", "Different net lengths without reason", "Routing across plane gaps", "Many branches"], answer: 0 },
  { question: "Why are test points planned during placement?", options: ["To ensure probes and production fixtures can reach critical nets", "To replace the schematic", "To set component cost", "To increase board thickness"], answer: 0 },
  { question: "Which is a good analogue-layout practice?", options: ["Route sensitive inputs beside switching nodes", "Keep sensitive paths short and away from noisy power loops", "Split ground under every signal", "Share high-current returns through sensor traces"], answer: 1 },
  { question: "What should be done before considering routing complete?", options: ["Only run autorouter", "Inspect return paths, constraints, clearances, unrouted nets and manufacturability", "Hide DRC errors", "Delete test points"], answer: 1 },
];

export default function PCBChapterSixLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 6</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Component Placement and PCB Routing</h2>
          <p className="mt-4 leading-8 text-slate-600">Placement creates the electrical and mechanical structure of a PCB; routing completes the current paths. A successful layout keeps critical loops small, preserves return paths, controls heat and noise, supports assembly and test, and satisfies documented constraints.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold">Learning objectives</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {["Place mechanically fixed and electrically critical parts in the correct order.", "Group components by function and current flow.", "Route power, analogue, digital and differential signals appropriately.", "Select traces and vias for current, heat and manufacturing limits.", "Preserve continuous signal-reference return paths.", "Review a layout for DRC, assembly, test and reliability."].map((item) => <div key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</div>)}
          </div>
        </section>

        <Section icon={Move} title="A disciplined placement order">
          <ol className="space-y-3">
            {["Lock the board outline, holes, keep-outs and height restrictions.", "Place connectors, switches, indicators, antennas, sensors and other mechanically fixed parts.", "Place power entry, protection and conversion stages in current-flow order.", "Place processors, memory, clocks, reset and programming circuits.", "Place sensitive analogue and high-speed interface components.", "Place drivers and high-current loads with short controlled loops.", "Add local decoupling, support passives and accessible test points.", "Review density, routing channels, assembly, rework, thermal and enclosure clearances."].map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-slate-200 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span>{item}</li>)}
          </ol>
        </Section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><Component className="text-sky-300" /><h3 className="text-2xl font-bold">Functional grouping and orientation</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <DarkCard title="Follow current and signal flow" text="Place a source, conditioning parts, receiver and return path as a compact functional chain." />
            <DarkCard title="Use consistent orientation" text="Align similar parts where practical and make pin 1, polarity and connector direction easy to inspect." />
            <DarkCard title="Reserve routing channels" text="Avoid packing parts so tightly that power, buses and escape routes become indirect." />
            <DarkCard title="Support manufacture" text="Respect courtyards, nozzle access, soldering, inspection, rework and depanelisation needs." />
          </div>
        </section>

        <Section icon={Zap} title="Power placement and high-current loops">
          <p>Place input protection close to the connector. Keep regulator switching loops—input capacitor, switch, inductor or transformer, rectifier and output capacitor—compact according to the regulator datasheet. Use wide copper, planes or pours for high current and provide direct returns that do not pass through sensitive circuits.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card title="Decoupling loop" text="IC supply pin → local capacitor → ground/reference pin, with minimum connection length and loop area." />
            <Card title="Load loop" text="Supply source → driver → load → return, sized for normal, peak, start-up and fault current." />
          </div>
        </Section>

        <Section icon={Route} title="Trace width, spacing and vias">
          <p>Choose trace geometry from current, copper thickness, allowed temperature rise, voltage drop, manufacturing capability and impedance requirements. Vias add resistance and inductance; size and quantity them for current and thermal needs. Do not rely on a visual guess for power paths—calculate and apply design rules.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Card title="Signal traces" text="Use geometry suitable for edge rate, impedance, crosstalk and fabrication." />
            <Card title="Power traces" text="Check current density, voltage drop, temperature rise, neck-downs and connector bottlenecks." />
            <Card title="Via transitions" text="Provide sufficient drill and annular ring plus nearby reference stitching where required." />
          </div>
        </Section>

        <Section icon={GitBranch} title="Return-current-aware routing">
          <p>A signal and its return form one circuit. Route critical signals over a continuous reference plane. Avoid plane slots, gaps, voids and unnecessary layer changes. If a signal moves between layers referenced to different planes, provide an intentional nearby return transition so current does not take a long uncontrolled detour.</p>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950"><b>Do not split ground casually.</b> Functional placement and controlled current paths are usually safer than forcing analogue and digital returns across separated planes.</div>
        </Section>

        <Section icon={Waves} title="Sensitive and high-speed routing">
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Analogue inputs" text="Keep sensor and reference paths short, clean and away from clocks, switch nodes, motors and high-current returns." />
            <Card title="Clocks and fast digital" text="Route directly over a stable reference, control stubs and spacing, and avoid unnecessary vias." />
            <Card title="Differential pairs" text="Maintain consistent pair geometry, coupling, reference, appropriate impedance and controlled skew." />
            <Card title="Crystal circuits" text="Follow controller guidance, place parts close and keep noisy traces and plane discontinuities away." />
          </div>
        </Section>

        <Section icon={ShieldCheck} title="Clearance, creepage and isolation">
          <p>Apply net classes for voltage, current, impedance and safety. Electrical clearance is the shortest air distance; creepage follows the insulating surface. Required values depend on voltage, transient category, pollution, material and applicable standards. Preserve isolation slots, barriers and keep-outs through copper, vias, components and mounting hardware.</p>
        </Section>

        <Section icon={ClipboardCheck} title="Layout review checklist">
          <div className="grid gap-3 md:grid-cols-2">
            {["All components placed and every net routed", "Critical placement follows datasheet guidance", "Power paths meet current and thermal needs", "Decoupling loops are short and direct", "Signals have continuous reference paths", "Differential and controlled nets meet constraints", "No unintended copper islands or neck-downs", "Connectors, polarity and pin 1 are clear", "Test and programming points are accessible", "DRC findings are resolved or documented", "Assembly courtyards and edge clearance pass", "3D and mechanical fit have been reviewed"].map((item) => <div key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4"><CheckCircle2 className="shrink-0 text-emerald-600" size={20} />{item}</div>)}
          </div>
        </Section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="text-2xl font-bold text-red-950">Common layout mistakes</h3>
          <ul className="mt-4 space-y-2 leading-7 text-red-900">
            <li>• Placing for visual symmetry instead of electrical current flow.</li>
            <li>• Routing signals across reference-plane gaps or through noisy power regions.</li>
            <li>• Using traces or single vias too small for peak current.</li>
            <li>• Leaving long stubs, excessive layer changes or uncontrolled differential geometry.</li>
            <li>• Discovering connector, enclosure or probe-access conflicts after routing.</li>
          </ul>
        </section>

        <section className="rounded-2xl bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Wrench className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Practical activity: place and route the controller PCB</h3></div>
          <p className="mt-3 leading-8 text-indigo-900">Continue the Chapter 5 board. Place the fixed mechanical parts, power section, controller and interfaces in priority order. Define net classes, route power first, preserve reference paths, add ground pours and stitching vias, then route signals. Run DRC and prepare annotated screenshots explaining five important placement or routing decisions.</p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• Placement establishes current paths, noise coupling, heat and routability.</li>
            <li>• Mechanical and electrically critical components are placed first.</li>
            <li>• Trace and via geometry must meet current, thermal, impedance and fabrication needs.</li>
            <li>• Every signal needs a continuous, nearby return path.</li>
            <li>• Layout completion requires engineering review as well as DRC.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete placement and routing, pass DRC, review return paths and thermal bottlenecks, document key decisions, and score at least 80% in the quiz.</p>
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
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 6 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
      <div className="mt-6 space-y-6">
        {questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[index] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={"flex cursor-pointer gap-3 rounded-xl border p-3 " + (correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50")}><input type="radio" name={"pcb-ch6-" + index} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}
      </div>
      {!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={"mt-6 rounded-2xl border p-6 " + (passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50")}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
    </section>
  );
}

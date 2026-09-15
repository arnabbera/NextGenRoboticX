import { useMemo, useState } from "react";
import { BatteryCharging, CheckCircle2, CircleHelp, ClipboardCheck, Gauge, PackageCheck, RotateCcw, Search, ShieldCheck, Thermometer, Wrench, XCircle, Zap } from "lucide-react";

const questions = [
  { question: "Which datasheet value defines a boundary that must never be exceeded?", options: ["Typical application", "Absolute maximum rating", "Package drawing", "Ordering code"], answer: 1 },
  { question: "Where should a designer normally operate a component?", options: ["At its absolute maximum rating", "Inside recommended operating conditions with margin", "Above its power rating", "At any voltage if current is low"], answer: 1 },
  { question: "What determines resistor power dissipation when voltage across it is known?", options: ["P = V²/R", "P = V/R", "P = R/V", "P = V + R"], answer: 0 },
  { question: "Why is capacitor voltage derating important?", options: ["Capacitance never changes", "It improves margin against transients and reliability stress", "It increases the footprint automatically", "It removes polarity"], answer: 1 },
  { question: "What should be verified before assigning a PCB footprint?", options: ["Only the part colour", "Package code, dimensions, pin numbering and land-pattern guidance", "Only the supplier name", "Only the schematic symbol"], answer: 1 },
  { question: "Which source is authoritative for electrical limits?", options: ["A product photograph", "The manufacturer's current datasheet", "An unverified marketplace title", "A forum nickname"], answer: 1 },
  { question: "What is derating?", options: ["Operating below maximum capability to improve margin and reliability", "Removing all tolerances", "Increasing voltage beyond the rating", "Using the smallest package"], answer: 0 },
  { question: "Why check component lifecycle status?", options: ["To know whether the part is active, obsolete or not recommended for new designs", "To determine PCB colour", "To avoid a BOM", "To calculate trace width"], answer: 0 },
  { question: "Which parameter is especially important for a switching MOSFET?", options: ["Gate charge and on-resistance at the intended drive voltage", "Body colour", "Logo position", "Only package height"], answer: 0 },
  { question: "What is the best response to a single-source critical component?", options: ["Ignore availability", "Record the risk and evaluate qualified alternatives", "Delete the datasheet", "Increase every resistor value"], answer: 1 },
];

export default function PCBChapterTwoLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 2</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Electronic Components, Datasheets and Component Selection</h2>
          <p className="mt-4 leading-8 text-slate-600">Reliable hardware depends on selecting parts from verified electrical, thermal, mechanical and supply-chain information. This chapter explains how to read datasheets, calculate ratings and margins, verify packages and footprints, compare alternatives, and build a controlled bill of materials.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold">Learning objectives</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {["Identify passive, semiconductor, electromechanical and protection components.", "Navigate a manufacturer datasheet and locate critical parameters.", "Distinguish absolute maximum ratings from recommended operation.", "Calculate voltage, current, power and thermal design margins.", "Verify packages, symbols, footprints and pin assignments.", "Evaluate availability, lifecycle, cost and approved alternatives."].map((item) => <div key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</div>)}
          </div>
        </section>

        <Section icon={Search} title="Read the datasheet systematically">
          <p>Begin with the exact manufacturer part number and the latest revision. Read the feature summary only for orientation; design decisions must come from the detailed limits, characteristics, graphs, application notes and package drawings.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card title="Part identity" text="Full ordering code, grade, package, temperature range and revision." />
            <Card title="Electrical limits" text="Absolute maximum ratings, recommended conditions and guaranteed characteristics." />
            <Card title="Pin information" text="Pin number, name, direction, function, unused-pin guidance and exposed pad." />
            <Card title="Typical behaviour" text="Graphs showing current, voltage, frequency, temperature and load relationships." />
            <Card title="Application guidance" text="Reference circuits, layout rules, decoupling and stability requirements." />
            <Card title="Mechanical data" text="Package dimensions, tolerances, orientation and recommended land pattern." />
          </div>
        </Section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><ShieldCheck className="text-sky-300" /><h3 className="text-2xl font-bold">Ratings, operating conditions and derating</h3></div>
          <p className="mt-4 leading-8 text-slate-200"><b>Absolute maximum ratings</b> are stress limits, not normal operating targets. Exceeding one may cause immediate damage or reduce lifetime. <b>Recommended operating conditions</b> define the range in which specified behaviour is expected. Derating keeps normal operation below component limits to accommodate tolerance, temperature, transients, ageing and uncertainty.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <DarkCard title="Voltage margin" text="Include supply tolerance, ripple, surge and inductive transients." />
            <DarkCard title="Current margin" text="Consider start-up, stall, inrush, short-circuit and peak duty cycle." />
            <DarkCard title="Temperature margin" text="Account for ambient temperature, self-heating, enclosure and airflow." />
          </div>
        </section>

        <Section icon={Zap} title="Resistors and capacitors">
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Resistors" text="Select resistance, tolerance, power, voltage rating, temperature coefficient, pulse capability and package. Calculate P = VI = I²R = V²/R, then provide margin." />
            <Card title="Capacitors" text="Select capacitance, tolerance, voltage, dielectric, ESR, ripple-current rating, polarity and temperature behaviour. MLCC capacitance may fall substantially with DC bias." />
          </div>
          <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-blue-950"><b>Example:</b> A 1 kΩ resistor with 12 V across it dissipates 12²/1000 = 0.144 W. A 0.25 W resistor may be electrically adequate, but ambient temperature, enclosure heating and transient conditions still require review.</div>
        </Section>

        <Section icon={Gauge} title="Diodes, transistors and integrated circuits">
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Diodes" text="Check reverse-voltage rating, forward current, surge current, forward drop, leakage, recovery time and package thermal limits." />
            <Card title="MOSFETs" text="Check VDS, continuous and pulsed current, RDS(on) at the actual gate voltage, gate charge, safe operating area and thermal resistance." />
            <Card title="BJTs" text="Check VCEO, collector current, gain at the intended operating point, saturation voltage, base drive and power dissipation." />
            <Card title="Integrated circuits" text="Confirm supply range, I/O thresholds, clock limits, accuracy, current consumption, reset state, decoupling and exposed-pad requirements." />
          </div>
        </Section>

        <Section icon={BatteryCharging} title="Power and protection components">
          <p>Regulators, converters, fuses, TVS diodes, reverse-polarity protection and current-limit devices affect both safety and reliability. For regulators, check input/output range, dropout or duty-cycle limits, efficiency, quiescent current, stability, thermal performance and required external-component characteristics.</p>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950"><b>Do not select a fuse only by normal load current.</b> Evaluate voltage rating, breaking capacity, time-current curve, inrush, ambient temperature and applicable safety requirements.</div>
        </Section>

        <Section icon={Thermometer} title="Power dissipation and junction temperature">
          <p>Component reliability depends on junction temperature, not only ambient temperature. A first estimate is Tj = Ta + P × θJA, where Tj is junction temperature, Ta is ambient temperature, P is device dissipation and θJA is junction-to-ambient thermal resistance. The datasheet test board may differ greatly from the real PCB, so copper area, airflow, vias and enclosure conditions must be considered.</p>
        </Section>

        <Section icon={PackageCheck} title="Package, footprint and assembly compatibility">
          <p>The schematic symbol represents electrical function; the footprint represents the physical package. Verify the package suffix, body dimensions, pitch, pad geometry, pin-1 marker, thermal pad, solder-mask and paste recommendations. Compare the footprint against the datasheet drawing before layout release.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card title="Prototype suitability" text="Larger packages may be easier to hand assemble and probe during development." />
            <Card title="Production suitability" text="Confirm the assembler can place, solder, inspect and rework the selected package reliably." />
          </div>
        </Section>

        <Section icon={ClipboardCheck} title="BOM and supply-chain control">
          <p>A useful bill of materials includes reference designators, quantity, value, exact manufacturer part number, package, description, approved supplier information and alternative-part status. Track whether a part is active, mature, not recommended for new designs or obsolete.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card title="Approved alternatives" text="Alternatives must be checked for electrical, mechanical, thermal, firmware and regulatory compatibility." />
            <Card title="Traceability" text="Freeze BOM and datasheet revisions for each hardware release so manufactured units can be reconstructed." />
          </div>
        </Section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="text-2xl font-bold text-red-950">Common selection mistakes</h3>
          <ul className="mt-4 space-y-2 leading-7 text-red-900">
            <li>• Treating absolute maximum ratings as safe continuous conditions.</li>
            <li>• Using a MOSFET RDS(on) value specified at a higher gate voltage than the controller provides.</li>
            <li>• Ignoring tolerance, DC-bias loss, pulse energy, inrush or temperature.</li>
            <li>• Assigning a footprint based only on a package name without checking dimensions and pin numbering.</li>
            <li>• Choosing marketplace availability over manufacturer documentation and lifecycle evidence.</li>
          </ul>
        </section>

        <section className="rounded-2xl bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Wrench className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Practical activity: component selection worksheet</h3></div>
          <p className="mt-3 leading-8 text-indigo-900">For a 5 V microcontroller board, select an LED resistor, input capacitor, 3.3 V regulator, reverse-polarity device and output MOSFET. Record the required value, calculated stress, selected rating, margin, package, exact part number, datasheet link, lifecycle status and one possible alternative. Explain every choice.</p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• Use the current manufacturer datasheet for exact part decisions.</li>
            <li>• Operate within recommended conditions and apply realistic margin.</li>
            <li>• Check electrical, thermal and mechanical parameters together.</li>
            <li>• Verify footprint geometry and pin numbering before board layout.</li>
            <li>• Manage lifecycle, availability and alternatives as engineering risks.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the selection worksheet, calculate resistor power, explain derating, verify one footprint against its package drawing, compare two substitute parts, and score at least 80% in the quiz.</p>
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
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 2 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
      <div className="mt-6 space-y-6">
        {questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[index] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={"flex cursor-pointer gap-3 rounded-xl border p-3 " + (correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50")}><input type="radio" name={"pcb-ch2-" + index} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}
      </div>
      {!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={"mt-6 rounded-2xl border p-6 " + (passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50")}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
    </section>
  );
}

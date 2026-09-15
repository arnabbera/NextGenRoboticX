import { useMemo, useState } from "react";
import { Activity, BatteryCharging, CheckCircle2, CircleHelp, Gauge, GitBranch, RotateCcw, ShieldCheck, Thermometer, Waves, Wrench, XCircle, Zap } from "lucide-react";

const questions = [
  { question: "What should a power budget include?", options: ["Only typical current", "Normal, peak, start-up and fault-related current", "Only PCB area", "Only battery voltage"], answer: 1 },
  { question: "When is an LDO usually preferred over a switching regulator?", options: ["When highest efficiency at a large voltage drop is required", "For simple, low-noise regulation with modest voltage drop and current", "For mains isolation", "To increase input ripple"], answer: 1 },
  { question: "What is the role of a TVS diode?", options: ["Store program code", "Clamp short-duration voltage transients", "Generate a clock", "Replace every fuse"], answer: 1 },
  { question: "Why place decoupling capacitors close to IC supply pins?", options: ["To shorten the high-frequency current loop", "To increase connector length", "To remove the ground plane", "To raise DC voltage"], answer: 0 },
  { question: "What is a signal return path?", options: ["The route current takes back to its source", "A spare signal name", "The component invoice", "Only a chassis wire"], answer: 0 },
  { question: "What can a break in the reference plane cause?", options: ["A longer return path and greater noise or EMI", "Lower loop area", "Guaranteed impedance", "Automatic isolation"], answer: 0 },
  { question: "Which expression estimates LDO power loss?", options: ["(Vin − Vout) × Iout", "Vin + Vout + Iout", "Vout/Iout", "Iout/Vin"], answer: 0 },
  { question: "What does bulk capacitance primarily support?", options: ["Local energy during slower load changes and rail transients", "PCB annotation", "Connector labelling", "Logic translation"], answer: 0 },
  { question: "How should ESD protection be placed for an external connector?", options: ["Near the protected IC after a long trace", "Close to the connector with a short return path", "Anywhere on the board", "Only in software"], answer: 1 },
  { question: "What is the safest first power-up practice?", options: ["Unlimited current at maximum voltage", "Current-limited supply with staged rail checks", "Connect every load immediately", "Ignore thermal behaviour"], answer: 1 },
];

export default function PCBChapterFourLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 4</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Power Supply, Protection and Signal Integrity Fundamentals</h2>
          <p className="mt-4 leading-8 text-slate-600">Power integrity and signal integrity determine whether a circuit works only on the bench or remains dependable in its real environment. This chapter covers power budgets, regulator selection, protection, decoupling, grounding, return paths, edge-rate effects and safe power-up validation.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold">Learning objectives</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {["Create rail-by-rail power and thermal budgets.", "Choose suitable linear or switching regulation.", "Design input, reverse-polarity, overcurrent and transient protection.", "Select and place bulk and high-frequency decoupling.", "Explain current loops, reference planes and return paths.", "Plan safe power-up and integrity measurements."].map((item) => <div key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</div>)}
          </div>
        </section>

        <Section icon={BatteryCharging} title="Build the power budget first">
          <p>List every load by rail and operating mode. Record typical, maximum, start-up, transmit, motor-stall and fault current where relevant. Include regulator efficiency, quiescent current, connector limits, battery resistance and design margin. A rail sized only for typical current may collapse during radio transmission, motor start or capacitive inrush.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Card title="Steady state" text="Normal current after start-up across expected operating modes." />
            <Card title="Transient demand" text="Short peaks from radios, displays, processors, motors and charged capacitors." />
            <Card title="Fault strategy" text="Current limiting, fuse behaviour, thermal shutdown and safe recovery." />
          </div>
        </Section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><Zap className="text-sky-300" /><h3 className="text-2xl font-bold">Linear versus switching regulation</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <DarkCard title="LDO regulator" text="Simple and often low noise, but power loss is approximately (Vin − Vout) × Iout. Check dropout, stability, capacitor requirements and junction temperature." />
            <DarkCard title="Switching converter" text="Efficient for larger voltage differences or current, but requires careful inductor, diode or MOSFET, loop, compensation and layout choices." />
          </div>
          <p className="mt-5 leading-8 text-slate-200">Select using the complete load range, efficiency, heat, ripple, noise sensitivity, size, cost and transient-response requirements—not by topology alone.</p>
        </section>

        <Section icon={ShieldCheck} title="Input and fault protection">
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Overcurrent" text="Fuse, resettable fuse, electronic current limit or protected switch selected from voltage, current, inrush and breaking requirements." />
            <Card title="Reverse polarity" text="Series diode, ideal-diode MOSFET or protected controller chosen for loss, voltage and fault behaviour." />
            <Card title="Transient suppression" text="TVS diode or other clamp selected for working voltage, clamp level, surge energy and connection inductance." />
            <Card title="ESD protection" text="Low-capacitance protection at exposed connectors, placed close to entry with a short path to the reference return." />
          </div>
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-950"><b>Important:</b> a TVS diode limits a transient but does not automatically provide sustained overvoltage or overcurrent protection. Protection elements must work as a coordinated system.</div>
        </Section>

        <Section icon={Activity} title="Decoupling and power-distribution networks">
          <p>Digital ICs draw short current pulses as internal gates switch. Local ceramic capacitors supply high-frequency current while bulk capacitors support slower load changes. Place the high-frequency capacitor close to the supply and ground pins, use short wide connections and minimise the loop through the reference plane.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card title="Local decoupling" text="Usually small ceramic capacitors at each IC supply group, following the device datasheet." />
            <Card title="Bulk support" text="Larger capacitance near power entry, regulators and pulsed loads to limit slower rail movement." />
          </div>
        </Section>

        <Section icon={GitBranch} title="Grounding, loops and return paths">
          <p>Every signal current completes a loop. At high edge rates, return current tends to follow the nearby reference plane beneath the signal. A split, slot or plane change forces a detour, increases loop area and can cause crosstalk, ringing and radiated emissions. Preserve continuous reference paths and provide nearby stitching vias when a signal changes reference layers.</p>
          <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-blue-950"><b>Key idea:</b> signal integrity depends on rise and fall time as well as clock frequency. A low-frequency signal with very fast edges can behave as a high-speed signal.</div>
        </Section>

        <Section icon={Waves} title="Transmission-line effects and termination">
          <p>When interconnect delay is no longer small compared with signal rise time, a trace behaves as a transmission line. Impedance discontinuities at connectors, stubs, vias and loads create reflections. Control geometry and reference planes, avoid unnecessary stubs and use source, end or differential termination when analysis and interface guidance require it.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card title="Single-ended signals" text="Manage reference continuity, source impedance, load capacitance and overshoot." />
            <Card title="Differential pairs" text="Maintain pair coupling, consistent geometry, suitable spacing, reference continuity and controlled skew." />
          </div>
        </Section>

        <Section icon={Thermometer} title="Thermal validation">
          <p>Estimate loss for regulators, MOSFETs, diodes, resistors and connectors. A first-order temperature estimate is Tj = Ta + P × θJA, but actual results depend on copper area, vias, airflow, nearby heat sources and enclosure. Compare measured temperatures across worst-case input, load and ambient conditions with rated limits and margin.</p>
        </Section>

        <Section icon={Gauge} title="Measure power and signal quality">
          <ol className="space-y-3">
            {["Inspect resistance to ground before applying power.", "Use a current-limited supply and begin below the maximum input where appropriate.", "Verify input protection, then check each rail in sequence.", "Measure DC accuracy, start-up, ripple, load transients and shutdown.", "Probe with a short ground spring to avoid adding a large measurement loop.", "Check clocks and critical interfaces for ringing, overshoot and threshold margin.", "Repeat under peak load, minimum and maximum input, and realistic cabling."].map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-slate-200 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span>{item}</li>)}
          </ol>
        </Section>

        <section className="rounded-2xl bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Wrench className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Practical activity: protected dual-rail supply</h3></div>
          <p className="mt-3 leading-8 text-indigo-900">Design a low-voltage input stage that produces 5 V and 3.3 V rails. Include reverse-polarity, overcurrent and transient protection, input and output capacitors, test points and status indication. Prepare a load table, calculate regulator loss at minimum and maximum input, estimate junction temperature, and create a staged power-up test plan.</p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• Power budgets must include peak, transient and start-up conditions.</li>
            <li>• Regulator choice balances efficiency, noise, heat, cost and complexity.</li>
            <li>• Protection devices require coordinated voltage, current and energy ratings.</li>
            <li>• Decoupling works by minimising the high-frequency current loop.</li>
            <li>• Continuous return paths reduce noise, crosstalk and radiation.</li>
            <li>• Safe validation uses current limiting and staged measurements.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the dual-rail design, power and thermal calculations, protection selection, decoupling plan and validation procedure, then score at least 80% in the quiz.</p>
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
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 4 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
      <div className="mt-6 space-y-6">
        {questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[index] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={"flex cursor-pointer gap-3 rounded-xl border p-3 " + (correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50")}><input type="radio" name={"pcb-ch4-" + index} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}
      </div>
      {!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={"mt-6 rounded-2xl border p-6 " + (passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50")}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
    </section>
  );
}

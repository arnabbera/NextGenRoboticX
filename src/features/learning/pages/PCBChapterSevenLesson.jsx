import { useMemo, useState } from "react";
import { Activity, CheckCircle2, CircleHelp, ClipboardCheck, Fan, RotateCcw, ShieldCheck, Thermometer, Waves, Wrench, XCircle, Zap } from "lucide-react";

const questions = [
  { question: "What is the main purpose of a ground/reference plane for fast signals?", options: ["Provide a nearby low-inductance return path", "Set component prices", "Replace solder mask", "Increase trace length"], answer: 0 },
  { question: "What does EMC mean?", options: ["Only reducing emissions", "Equipment operates acceptably without causing or suffering unacceptable electromagnetic disturbance", "Only thermal design", "Only enclosure design"], answer: 1 },
  { question: "Why should a switching current loop be compact?", options: ["To reduce loop inductance and radiated noise", "To increase ringing", "To split the reference plane", "To remove decoupling"], answer: 0 },
  { question: "Where should cable ESD protection be placed?", options: ["Close to the connector entry", "Beside an unrelated IC", "At the board centre after a long trace", "Only in firmware"], answer: 0 },
  { question: "Which expression gives a first-order junction-temperature estimate?", options: ["Tj = Ta + P × θJA", "Tj = P/Ta", "Tj = Ta − P", "Tj = V + I"], answer: 0 },
  { question: "What can thermal vias do?", options: ["Transfer heat between copper layers", "Generate clock signals", "Replace every heatsink", "Increase software speed"], answer: 0 },
  { question: "What is derating used for?", options: ["Operate components with margin below rated stress", "Exceed absolute limits", "Remove tolerances", "Avoid testing"], answer: 0 },
  { question: "Which practice improves reliability?", options: ["Ignoring connector cycles", "Considering temperature, vibration, humidity and expected lifetime", "Operating continuously at maximum ratings", "Removing protection"], answer: 1 },
  { question: "What is pre-compliance testing?", options: ["Early measurements intended to find EMC risks before formal testing", "A replacement for every certification", "Only a schematic check", "A marketing review"], answer: 0 },
  { question: "Why record worst-case test conditions?", options: ["To make results repeatable and traceable", "To hide failures", "To avoid revisions", "To remove acceptance criteria"], answer: 0 },
];

export default function PCBChapterSevenLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 7</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Grounding, EMI/EMC, Thermal and Reliability Design</h2>
          <p className="mt-4 leading-8 text-slate-600">A PCB must work across real cables, loads, temperatures and disturbances—not only under ideal bench conditions. This chapter connects grounding and current return paths with emissions and immunity, then develops thermal and reliability practices that protect performance throughout the product lifetime.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold">Learning objectives</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {["Design intentional ground and return-current paths.", "Identify common conducted and radiated EMI mechanisms.", "Apply layout, filtering, shielding and interface protection.", "Estimate power loss and component junction temperature.", "Use copper, vias, airflow and mechanical paths to manage heat.", "Plan environmental, reliability and pre-compliance verification."].map((item) => <div key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</div>)}
          </div>
        </section>

        <Section icon={Activity} title="Ground is a current path, not a perfect zero">
          <p>Every conductor has resistance and inductance. Load and switching currents create voltage differences across ground paths, so two points labelled GND are not always at the same instantaneous potential. Use solid reference planes, short connections and controlled current flow to prevent noisy currents from sharing sensitive measurement returns.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card title="Signal return" text="Keep a continuous reference beneath fast traces and provide nearby stitching when signals change reference layers." />
            <Card title="Power return" text="Route high-current load and converter returns directly to their source without crossing sensitive analogue regions." />
          </div>
        </Section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><Waves className="text-sky-300" /><h3 className="text-2xl font-bold">EMI and EMC fundamentals</h3></div>
          <p className="mt-4 leading-8 text-slate-200">Electromagnetic compatibility means the product neither produces unacceptable disturbance nor fails under expected disturbance. Every interference problem includes a source, coupling path and victim. Reduce noise at its source, interrupt the coupling path and increase victim immunity.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <DarkCard title="Conducted coupling" text="Noise travels through power, ground and signal conductors." />
            <DarkCard title="Capacitive or inductive coupling" text="Electric or magnetic fields transfer energy between nearby circuits." />
            <DarkCard title="Radiated coupling" text="Traces, loops, cables and openings behave as unintended antennas." />
          </div>
        </section>

        <Section icon={Zap} title="Control noise at switching sources">
          <p>Keep regulator, driver and commutation loops compact. Place bypass and bootstrap parts exactly as recommended. Control excessive edge rate with appropriate gate or series resistance where timing permits. Add snubbers or clamps only after understanding the measured ringing path and component stress.</p>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950"><b>Loop-area rule:</b> high di/dt current multiplied by loop inductance creates voltage disturbance. Short, wide, closely coupled outgoing and return paths reduce inductance.</div>
        </Section>

        <Section icon={ShieldCheck} title="Interfaces, filtering and shielding">
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Connector zoning" text="Place filters, common-mode components and ESD or surge protection near the cable entry." />
            <Card title="Filter placement" text="Separate the noisy and clean sides physically so coupling cannot bypass the filter." />
            <Card title="Chassis strategy" text="Define how shield, protective earth, chassis and circuit reference connect for the product and frequency range." />
            <Card title="Cable awareness" text="External cables can carry common-mode current and dominate both emissions and immunity behaviour." />
          </div>
        </Section>

        <Section icon={Thermometer} title="Power loss and temperature">
          <p>Estimate dissipation in regulators, MOSFETs, diodes, resistors, magnetic parts and connectors. A first-order estimate is Tj = Ta + P × θJA, but θJA depends strongly on the evaluation board and environment. Confirm the real product by measurement at maximum input, load and ambient temperature.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Card title="Conduction loss" text="Examples include I²R in traces, resistors, MOSFETs and connectors." />
            <Card title="Switching loss" text="Energy is dissipated during voltage-current overlap and charging transitions." />
            <Card title="Conversion loss" text="Regulator inefficiency becomes heat that must leave the board and enclosure." />
          </div>
        </Section>

        <Section icon={Fan} title="Thermal paths and layout">
          <p>Spread heat with appropriate copper area and connect exposed thermal pads to internal or opposite-side copper through a suitable via array. Keep heat-sensitive sensors and electrolytic capacitors away from hot devices. Consider airflow, enclosure conduction, thermal interface materials, heatsinks and safe touch temperature.</p>
          <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-blue-950"><b>Avoid thermal surprises:</b> check copper neck-downs, via current, connector contacts and small resistors as well as obvious power semiconductors.</div>
        </Section>

        <Section icon={ClipboardCheck} title="Reliability engineering">
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Electrical stress" text="Derate voltage, current, power and temperature while considering surge and repetitive pulse conditions." />
            <Card title="Environment" text="Define temperature cycling, humidity, condensation, dust, chemicals, altitude and UV exposure." />
            <Card title="Mechanical stress" text="Consider shock, vibration, connector cycles, board flex, mounting strain and heavy-component support." />
            <Card title="Lifecycle" text="Account for component ageing, fan or relay wear, storage, serviceability, obsolescence and expected use." />
          </div>
        </Section>

        <Section icon={Wrench} title="Pre-compliance and validation plan">
          <ol className="space-y-3">
            {["Define applicable product standards and operating modes.", "Identify clocks, converters, drivers and external cables as likely sources.", "Inspect current loops, reference discontinuities, filter placement and enclosure paths.", "Measure rail noise, ringing and near-field hot spots during peak activity.", "Perform available conducted and radiated pre-compliance scans.", "Apply ESD, EFT, surge or RF-immunity tests only with suitable equipment and safe procedures.", "Record configuration, cables, load, firmware, limits, results and corrective action."].map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-slate-200 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span>{item}</li>)}
          </ol>
        </Section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="text-2xl font-bold text-red-950">Common design mistakes</h3>
          <ul className="mt-4 space-y-2 leading-7 text-red-900">
            <li>• Splitting reference planes without controlling signal return paths.</li>
            <li>• Placing protection or filters far from connector entry.</li>
            <li>• Treating cables and enclosures as electrically irrelevant.</li>
            <li>• Using datasheet thermal numbers without checking real copper and airflow.</li>
            <li>• Validating only at room temperature and typical load.</li>
          </ul>
        </section>

        <section className="rounded-2xl bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Wrench className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Practical activity: integrity and reliability review</h3></div>
          <p className="mt-3 leading-8 text-indigo-900">Review the controller PCB from Chapter 6. Mark high-current and high-edge-rate loops, connector protection, sensitive victims, continuous return paths and thermal hot spots. Calculate loss and first-order junction temperature for two devices. Produce five layout improvements and a worst-case test matrix covering supply, load, temperature and cable conditions.</p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• Ground conductors carry current and therefore develop voltage.</li>
            <li>• EMI control addresses source, coupling path and victim.</li>
            <li>• Compact loops and continuous reference paths reduce emissions and susceptibility.</li>
            <li>• Thermal design must follow the full heat path from junction to ambient.</li>
            <li>• Reliability requires worst-case electrical, thermal, environmental and mechanical validation.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the integrity review, thermal estimates, improvement list and validation matrix, then score at least 80% in the quiz.</p>
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
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 7 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
      <div className="mt-6 space-y-6">
        {questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[index] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={"flex cursor-pointer gap-3 rounded-xl border p-3 " + (correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50")}><input type="radio" name={"pcb-ch7-" + index} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}
      </div>
      {!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={"mt-6 rounded-2xl border p-6 " + (passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50")}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
    </section>
  );
}

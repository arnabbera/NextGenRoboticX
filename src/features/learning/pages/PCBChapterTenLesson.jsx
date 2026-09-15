import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, CircuitBoard, ClipboardCheck, Factory, FileCheck2, Flag, RotateCcw, ShieldCheck, TestTube2, Wrench, XCircle, Zap } from "lucide-react";

const questions = [
  { question: "What is the correct starting point for the final PCB project?", options: ["Routing tracks", "Measurable product requirements", "Ordering components", "Generating Gerbers"], answer: 1 },
  { question: "What should a design review produce?", options: ["Only verbal approval", "Recorded findings, owners and closure evidence", "A new board colour", "Only screenshots"], answer: 1 },
  { question: "When should the manufacturing package be generated?", options: ["Before schematic review", "From the approved source after ERC, DRC and DFM closure", "Before footprint assignment", "From mixed revisions"], answer: 1 },
  { question: "What is the purpose of a bring-up plan?", options: ["Apply all power without limits", "Verify the board safely in controlled stages", "Replace inspection", "Avoid measurements"], answer: 1 },
  { question: "What does verification demonstrate?", options: ["The design meets specified requirements", "The logo is attractive", "Every user likes the product", "The PCB has many layers"], answer: 0 },
  { question: "What does validation demonstrate?", options: ["The product satisfies its intended use", "The DRC has zero warnings only", "The board uses an MCU", "All traces are equal length"], answer: 0 },
  { question: "Why include test points in the design?", options: ["To support repeatable measurements, debugging and production tests", "To increase noise intentionally", "To replace connectors", "To change component values"], answer: 0 },
  { question: "What should happen after a hardware modification?", options: ["Update controlled documents and repeat affected regression tests", "Keep the change undocumented", "Ship immediately", "Delete old results"], answer: 0 },
  { question: "Which set is essential for project handover?", options: ["Source, manufacturing files, BOM, test evidence and revision record", "Only a photograph", "Only schematic PDF", "Only firmware binary"], answer: 0 },
  { question: "When is the project complete?", options: ["When routing ends", "When requirements are verified, intended use is validated, risks are addressed and documentation is released", "When the first LED turns on", "When parts are purchased"], answer: 1 },
];

export default function PCBChapterTenLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 10 • Final Project</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Design and Validate a Complete PCB</h2>
          <p className="mt-4 leading-8 text-slate-600">This capstone integrates the complete hardware-development workflow. You will define, design, manufacture, assemble, bring up and validate a safe low-voltage controller PCB while maintaining the evidence and revision control expected in a professional engineering project.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold">Project outcomes</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {["Convert a use case into measurable electrical and product requirements.", "Produce an reviewed schematic and verified component library.", "Complete placement and routing with power, signal and thermal integrity.", "Release controlled fabrication and assembly files.", "Perform safe assembly, bring-up and systematic debugging.", "Deliver verification, validation and handover evidence."].map((item) => <div key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</div>)}
          </div>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><CircuitBoard className="text-sky-300" /><h3 className="text-2xl font-bold">Recommended project: smart low-voltage controller</h3></div>
          <p className="mt-4 leading-8 text-slate-200">Design a USB- or protected DC-powered controller with a 3.3 V microcontroller, programming/debug connector, status LED, push button, I²C sensor connector, UART header and protected MOSFET output for a low-voltage load. Optional additions include a small display, non-volatile memory or another protected sensor input.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <DarkCard title="Safe scope" text="Use extra-low voltage and current-limited bench supplies. Do not use mains circuitry." />
            <DarkCard title="Measurable function" text="Read a sensor, make a decision, report status and control a safe output." />
            <DarkCard title="Manufacturable result" text="Use obtainable parts, verified footprints, test access and standard processes." />
          </div>
        </section>

        <Section icon={ClipboardCheck} title="Phase 1: requirements and architecture">
          <p>Write the user need and at least ten testable requirements covering input voltage, current, rail accuracy, sensing, interfaces, output capability, start-up behaviour, dimensions, temperature and protection. Create a block diagram, power budget, interface table, risk register and acceptance-test outline.</p>
          <Deliverables items={["Product requirements specification", "System block diagram", "Power and interface budgets", "Mechanical constraints", "Initial risk register", "Verification matrix"]} />
        </Section>

        <Section icon={Zap} title="Phase 2: schematic and component selection">
          <p>Select exact components from manufacturer data. Complete input protection, regulation, microcontroller support, reset, programming, connectors, sensor interface and output driver. Calculate critical values and stresses. Run ERC and hold a schematic review before layout.</p>
          <Deliverables items={["Reviewed schematic source and PDF", "Exact BOM with lifecycle status", "Calculation notes", "Symbol and footprint verification record", "ERC report and issue closure", "Updated risk register"]} />
        </Section>

        <Section icon={CircuitBoard} title="Phase 3: PCB planning, placement and routing">
          <p>Define the stack-up, board outline, mounting, keep-outs, test points and rule classes. Place components in mechanical and electrical priority order. Route power and critical loops first, preserve continuous references, manage heat and complete all remaining connections. Run DRC and a layout review.</p>
          <Deliverables items={["Board plan and stack-up", "Verified footprint set", "Placement and routing source", "Power, return-path and thermal review", "3D/mechanical fit review", "DRC report and closure"]} />
        </Section>

        <Section icon={Factory} title="Phase 4: manufacturing release">
          <p>Complete fabrication, assembly and test DFM. Generate layer images, drill data, drawings, BOM, pick-and-place and any stencil notes. Inspect every output in an independent viewer. Freeze a uniquely named revision archive with checks and approval evidence.</p>
          <Deliverables items={["Gerber or agreed fabrication data", "Plated and non-plated drill files", "Fabrication and assembly drawings", "BOM and pick-and-place file", "Independent-viewer inspection record", "Versioned release archive"]} />
        </Section>

        <Section icon={ShieldCheck} title="Phase 5: assembly and safe bring-up">
          <p>Inspect the bare board and components, assemble under ESD control and inspect workmanship. Perform resistance and polarity checks before power. Use a current-limited supply, verify each rail, then test reset, clock, programming, communications, inputs and output stages one block at a time.</p>
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-950"><b>Stop immediately</b> for unexpected current, incorrect rails, fast heating, smoke, odour, unstable power or visibly damaged components. Remove power before investigation or rework.</div>
        </Section>

        <Section icon={TestTube2} title="Phase 6: verification and validation">
          <p>Create a test procedure linked to every requirement. Record equipment, configuration, firmware, environment, expected limit, measured result and pass/fail status. Test nominal and worst-case input, load and operating modes. Validation should demonstrate the complete controller solves its intended use, not merely that individual circuits operate.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card title="Verification evidence" text="Rail accuracy and ripple, current, interfaces, sensor accuracy, output load, start-up, fault response and temperature." />
            <Card title="Validation evidence" text="End-to-end use-case demonstration under realistic supply, cabling, load and environmental conditions." />
          </div>
        </Section>

        <Section icon={Wrench} title="Debugging and revision discipline">
          <p>For each failure, record reproducible conditions, expected and actual behaviour, measurements, hypothesis, change and retest. Update the schematic, PCB, BOM and release notes for every approved hardware modification. Repeat affected regression tests; never allow hand rework to become an undocumented design revision.</p>
        </Section>

        <Section icon={FileCheck2} title="Final submission package">
          <div className="grid gap-3 md:grid-cols-2">
            {["Requirements and system architecture", "Schematics and calculation notes", "Component-selection and footprint checks", "PCB source, stack-up and design rules", "ERC, DRC and DFM reports", "Manufacturing and assembly package", "Assembly and bring-up record", "Verification matrix and test results", "Validation demonstration evidence", "Risk register and issue log", "Hardware and firmware revision record", "Project summary and lessons learned"].map((item) => <div key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4"><CheckCircle2 className="shrink-0 text-emerald-600" size={20} />{item}</div>)}
          </div>
        </Section>

        <section className="rounded-2xl bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Flag className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Suggested evaluation rubric</h3></div>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-indigo-200 bg-white">
            <table className="w-full min-w-[650px] text-left"><thead className="bg-indigo-900 text-white"><tr><th className="p-4">Area</th><th className="p-4">Marks</th><th className="p-4">Evidence</th></tr></thead><tbody className="divide-y divide-slate-200"><Row area="Requirements and architecture" marks="15" evidence="Testable specification, budgets and risks" /><Row area="Schematic and components" marks="20" evidence="Correct circuit, calculations and verified libraries" /><Row area="PCB layout" marks="25" evidence="Placement, routing, integrity, thermal and DRC" /><Row area="Manufacturing release" marks="15" evidence="Complete, inspected and controlled outputs" /><Row area="Bring-up and testing" marks="20" evidence="Safe procedure, measurements and traceable results" /><Row area="Documentation" marks="5" evidence="Clear revisioned handover package" /></tbody></table>
          </div>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Course completion summary</h3>
          <p className="mt-3 leading-7 text-blue-900">You have progressed from product definition through components, schematic design, power and integrity, board planning, placement, routing, EMC, thermal design, DFM, manufacturing outputs, assembly, bring-up and validation. The final measure of success is a traceable design that meets its requirements safely and can be manufactured and tested again.</p>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Submit the complete revision-controlled project package, demonstrate requirement verification and intended-use validation, close safety-critical issues, and score at least 80% in the chapter quiz.</p>
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
function Deliverables({ items }) {
  return <div className="mt-5 grid gap-3 md:grid-cols-2">{items.map((item) => <div key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4"><CheckCircle2 className="shrink-0 text-emerald-600" size={20} />{item}</div>)}</div>;
}
function Row({ area, marks, evidence }) {
  return <tr><th className="p-4 text-slate-900">{area}</th><td className="p-4">{marks}</td><td className="p-4 text-slate-600">{evidence}</td></tr>;
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
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 10 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
      <div className="mt-6 space-y-6">
        {questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[index] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={"flex cursor-pointer gap-3 rounded-xl border p-3 " + (correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50")}><input type="radio" name={"pcb-ch10-" + index} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}
      </div>
      {!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={"mt-6 rounded-2xl border p-6 " + (passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50")}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the project requirements and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
    </section>
  );
}

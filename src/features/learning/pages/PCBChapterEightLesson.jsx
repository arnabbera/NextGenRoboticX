import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, ClipboardCheck, Factory, FileArchive, FileCheck2, PackageCheck, RotateCcw, ScanSearch, ShieldCheck, Wrench, XCircle } from "lucide-react";

const questions = [
  { question: "What is the purpose of DRC?", options: ["Check PCB geometry against defined design rules", "Select marketing colours", "Write firmware", "Replace fabrication drawings"], answer: 0 },
  { question: "How should an intentional DRC exception be handled?", options: ["Ignored silently", "Reviewed, justified and documented", "Deleted from the report", "Hidden by disabling all rules"], answer: 1 },
  { question: "What do Gerber files primarily describe?", options: ["Image data for PCB fabrication layers", "Component prices", "Firmware source", "Test results"], answer: 0 },
  { question: "Which file defines hole locations and sizes?", options: ["Drill file", "BOM", "Pick-and-place file", "README only"], answer: 0 },
  { question: "What does a pick-and-place file contain?", options: ["Component position, rotation and board side", "Only resistor values", "Copper impedance", "Firmware version"], answer: 0 },
  { question: "Why inspect manufacturing outputs in an independent viewer?", options: ["To verify generated files, layer alignment and completeness", "To alter the schematic automatically", "To remove revision control", "To avoid DRC"], answer: 0 },
  { question: "What is panelisation?", options: ["Arranging one or more boards in a manufacturing panel", "Adding a ground plane", "Renaming schematic nets", "Creating a component symbol"], answer: 0 },
  { question: "What must an assembly BOM identify?", options: ["Exact manufacturer part numbers and quantities", "Only generic values", "Only supplier logos", "Only PCB dimensions"], answer: 0 },
  { question: "Why freeze a release package?", options: ["To maintain traceability between approved design and manufactured units", "To prevent any testing", "To hide changes", "To increase board thickness"], answer: 0 },
  { question: "What is DFM?", options: ["Reviewing whether the design can be fabricated and assembled reliably", "Only electrical simulation", "Only software debugging", "Only purchasing"], answer: 0 },
];

export default function PCBChapterEightLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 8</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Design Rule Checks, DFM and Manufacturing Files</h2>
          <p className="mt-4 leading-8 text-slate-600">A visually complete PCB is not ready for manufacture until electrical and geometry checks are closed, fabrication and assembly constraints are reviewed, and a controlled output package is independently verified. This chapter turns the design database into an auditable manufacturing release.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold">Learning objectives</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {["Close ERC and DRC findings systematically.", "Perform design-for-fabrication and design-for-assembly reviews.", "Generate fabrication, drill, BOM and placement outputs.", "Inspect manufacturing data independently before release.", "Communicate stack-up, impedance, tolerances and special processes.", "Create a versioned, traceable production-release package."].map((item) => <div key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</div>)}
          </div>
        </section>

        <Section icon={ScanSearch} title="Close ERC and DRC before release">
          <p>Electrical Rule Check finds likely schematic problems such as conflicting outputs, unpowered pins and missing connections. Design Rule Check tests layout geometry against clearance, width, drill, via, mask, courtyard and other constraints. Both depend on correct rules and do not replace engineering review.</p>
          <ol className="mt-5 space-y-3">
            {["Refresh the PCB from the approved schematic and confirm no unexpected connectivity change.", "Run ERC and DRC with the intended production rule set.", "Classify every finding as a real defect, intentional condition or rule/configuration issue.", "Correct defects at their source instead of hiding symptoms.", "Document intentional exceptions with owner, reason and evidence.", "Rerun checks and archive clean or approved reports."].map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-slate-200 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span>{item}</li>)}
          </ol>
        </Section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><Factory className="text-sky-300" /><h3 className="text-2xl font-bold">DFM: fabrication and assembly</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <DarkCard title="Design for fabrication" text="Check trace/space, drill and annular ring, copper-to-edge, mask slivers, aspect ratio, stack-up, finish, impedance and profile." />
            <DarkCard title="Design for assembly" text="Check package and courtyard spacing, polarity, fiducials, paste apertures, component access, orientation, reflow and inspection." />
            <DarkCard title="Design for test" text="Provide accessible test points, programming connections, fixture clearance, isolation options and measurable acceptance limits." />
            <DarkCard title="Design for service" text="Consider connectors, replaceable items, diagnostics, labels, safe access and revision identification." />
          </div>
        </section>

        <Section icon={FileArchive} title="Fabrication output package">
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Layer images" text="Gerber or another agreed intelligent format for copper, solder mask, paste and silkscreen layers." />
            <Card title="Drill data" text="Plated and non-plated drill or route data with tool sizes and any controlled-depth requirements." />
            <Card title="Fabrication drawing" text="Board dimensions, thickness, material, copper weight, finish, tolerances, profile and special notes." />
            <Card title="Stack-up and impedance" text="Layer order, dielectric targets and controlled-impedance requirements agreed with the fabricator." />
          </div>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950"><b>Do not rely on filenames alone.</b> Load every fabrication layer and drill file into an independent viewer and confirm polarity, alignment, outline, holes, mask, text and intended board revision.</div>
        </Section>

        <Section icon={PackageCheck} title="Assembly output package">
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Controlled BOM" text="Reference designators, quantity, exact manufacturer part number, package, approved alternatives and do-not-fit status." />
            <Card title="Pick-and-place data" text="Component centroid coordinates, rotation, board side and reference designator using an agreed origin and convention." />
            <Card title="Assembly drawings" text="Top and bottom references, polarity, orientation, special installation and hand-assembly notes." />
            <Card title="Paste and stencil data" text="Verified paste openings, reductions, thermal-pad segmentation, stencil thickness notes and special processes." />
          </div>
        </Section>

        <Section icon={ClipboardCheck} title="Manufacturing-file verification">
          <div className="grid gap-3 md:grid-cols-2">
            {["Correct project and hardware revision", "Board outline and routed slots present", "All copper and plane layers aligned", "Plated and non-plated drills correct", "Mask openings and tented vias intentional", "Silkscreen is readable and off exposed pads", "Pin 1 and component polarity are clear", "BOM quantities match fitted references", "Pick-and-place origin and rotations checked", "No obsolete or unresolved parts remain", "Fabrication notes match quoted capability", "Checksums or archive integrity recorded"].map((item) => <div key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4"><CheckCircle2 className="shrink-0 text-emerald-600" size={20} />{item}</div>)}
          </div>
        </Section>

        <Section icon={ShieldCheck} title="Panelisation and production considerations">
          <p>Confirm whether panelisation is performed by the designer, fabricator or assembler. Define tooling rails, fiducials, breakaway tabs or V-score, component-to-edge clearance and depanelisation stress. Consider copper balance, board support during assembly, heavy components and sensitive parts near break lines.</p>
        </Section>

        <Section icon={FileCheck2} title="Release control and traceability">
          <p>Freeze the approved source and outputs under a unique hardware revision. The release record should identify schematic, PCB, BOM, fabrication package, assembly package, firmware compatibility, approved deviations and review signatures. Never overwrite a released package; create a new revision for controlled changes.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card title="Release archive" text="Read-only archive with consistent names, revision, date, generated reports and integrity evidence." />
            <Card title="Change record" text="Reason, affected items, risk, reviewer, verification and disposition of existing inventory." />
          </div>
        </Section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="text-2xl font-bold text-red-950">Common release mistakes</h3>
          <ul className="mt-4 space-y-2 leading-7 text-red-900">
            <li>• Sending files generated before the last schematic or layout change.</li>
            <li>• Suppressing DRC findings without recorded engineering justification.</li>
            <li>• Mixing revisions between Gerbers, drill data, BOM and placement files.</li>
            <li>• Assuming component rotations or fabrication notes without supplier confirmation.</li>
            <li>• Skipping independent output viewing because the PCB editor looks correct.</li>
          </ul>
        </section>

        <section className="rounded-2xl bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Wrench className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Practical activity: create a manufacturing release</h3></div>
          <p className="mt-3 leading-8 text-indigo-900">Use the controller PCB from earlier chapters. Close ERC and DRC, complete fabrication and assembly checklists, generate layer and drill files, BOM, pick-and-place data and drawings, inspect them in an independent viewer, then produce a versioned ZIP archive with a release README and check reports.</p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• ERC and DRC are useful only when rules and source data are correct.</li>
            <li>• DFM covers fabrication, assembly, test and service constraints.</li>
            <li>• Manufacturing requires coordinated fabrication and assembly outputs.</li>
            <li>• Independent viewing catches generation, alignment and revision errors.</li>
            <li>• A released design is immutable and traceable; changes create a new revision.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the DFM review, generate and independently inspect all outputs, build the release archive, document every exception, and score at least 80% in the quiz.</p>
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
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 8 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
      <div className="mt-6 space-y-6">
        {questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[index] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={"flex cursor-pointer gap-3 rounded-xl border p-3 " + (correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50")}><input type="radio" name={"pcb-ch8-" + index} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}
      </div>
      {!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={"mt-6 rounded-2xl border p-6 " + (passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50")}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
    </section>
  );
}

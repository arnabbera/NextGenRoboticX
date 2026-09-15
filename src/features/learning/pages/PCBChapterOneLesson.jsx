import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, ClipboardCheck, Factory, FileCheck2, Layers3, Lightbulb, RotateCcw, Route, ShieldCheck, Wrench, XCircle, Zap } from "lucide-react";

const questions = [
  { question: "What should be completed before detailed schematic capture begins?", options: ["PCB colour selection", "Clear, measurable product requirements", "Gerber generation", "Mass production"], answer: 1 },
  { question: "Which item is a non-functional requirement?", options: ["Measure temperature", "Turn on an alarm", "Operate from −10 °C to 60 °C", "Display battery voltage"], answer: 2 },
  { question: "What is the main purpose of a block diagram?", options: ["Define system functions and interfaces", "Replace all circuit calculations", "Show final copper geometry", "Create a marketing image"], answer: 0 },
  { question: "Why should critical components be evaluated early?", options: ["To avoid documentation", "They influence cost, availability, power and architecture", "To remove testing", "They always use identical footprints"], answer: 1 },
  { question: "Which sequence is correct?", options: ["Layout → requirements → schematic", "Requirements → architecture → schematic → layout", "Production → prototype → concept", "Routing → component selection → specification"], answer: 1 },
  { question: "What does design verification ask?", options: ["Did we build the design correctly against specifications?", "Will the logo be popular?", "Is every track the same width?", "Can testing be skipped?"], answer: 0 },
  { question: "What does design validation ask?", options: ["Does the product solve the intended user need?", "Are all symbols blue?", "Was the PCB routed automatically?", "Is the BOM alphabetical?"], answer: 0 },
  { question: "Why maintain a risk register?", options: ["To hide unresolved issues", "To identify, rank and mitigate technical and supply risks", "To replace the schematic", "To increase layer count"], answer: 1 },
  { question: "What is a design review?", options: ["A structured check before committing to the next stage", "Only a final visual inspection", "A manufacturing advertisement", "A substitute for requirements"], answer: 0 },
  { question: "Which deliverable supports manufacturing traceability?", options: ["Uncontrolled screenshots", "Versioned schematic, BOM and fabrication files", "Verbal instructions only", "A breadboard without notes"], answer: 1 },
];

export default function PCBChapterOneLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 1</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Electronic Product Development and PCB Design Workflow</h2>
          <p className="mt-4 leading-8 text-slate-600">A dependable PCB starts long before copper routing. This chapter explains how an electronic product moves from an idea to measurable requirements, architecture, schematic, layout, prototype, testing and production. It also shows how documentation and design reviews prevent costly mistakes.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold">Learning objectives</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {["Translate a product idea into functional and non-functional requirements.", "Explain the complete hardware-development lifecycle.", "Create a system block diagram and define interfaces.", "Plan component selection, prototyping and design reviews.", "Distinguish verification from validation.", "Identify manufacturing deliverables and common project risks."].map((item) => <div key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</div>)}
          </div>
        </section>

        <Section icon={Lightbulb} title="Start with the problem, not the PCB">
          <p>A product brief should identify the user, operating environment, required functions, power source, interfaces, physical limits, target cost and expected production quantity. “Build a sensor board” is vague. “Measure 0–50 °C with ±0.5 °C accuracy, update once per second and operate for six months from two AA cells” is testable.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card title="Functional requirements" text="What the product must do: sense, calculate, communicate, display, store or control." />
            <Card title="Non-functional requirements" text="How well it must work: accuracy, response time, battery life, size, safety, reliability and cost." />
          </div>
        </Section>

        <Section icon={Layers3} title="System architecture and interface definition">
          <p>Break the product into power, processing, sensing, communication, user-interface and output blocks. Define voltage levels, current needs, signal direction, timing, connector type and fault behaviour at every interface. This exposes missing functions before detailed circuit design begins.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Card title="Power architecture" text="Input source, protection, regulation, sequencing, load current and power budget." />
            <Card title="Data interfaces" text="Analogue signals, GPIO, UART, I²C, SPI, USB, CAN, Ethernet or wireless links." />
            <Card title="Mechanical interfaces" text="Board outline, mounting holes, connectors, controls, displays and enclosure constraints." />
          </div>
        </Section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><Route className="text-sky-300" /><h3 className="text-2xl font-bold">End-to-end development workflow</h3></div>
          <ol className="mt-5 space-y-3">
            {["Define the user need and measurable requirements.", "Create the system architecture, budgets and interface specifications.", "Research and select components; confirm ratings, lifecycle and availability.", "Capture and review the schematic; calculate critical values.", "Assign verified footprints and define mechanical constraints.", "Place components, route the PCB and apply electrical design rules.", "Run ERC, DRC, signal, power, thermal and manufacturability reviews.", "Generate controlled fabrication and assembly files.", "Assemble prototypes and perform current-limited board bring-up.", "Verify specifications, validate the user need and release a documented revision."].map((item, index) => <li key={item} className="flex gap-4 rounded-xl bg-white/10 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500 font-bold">{index + 1}</span><span>{item}</span></li>)}
          </ol>
        </section>

        <Section icon={Zap} title="Component selection and engineering margin">
          <p>Choose parts from datasheets, not from appearance. Check absolute maximum ratings, recommended operating conditions, tolerances, temperature range, power dissipation, package, footprint, availability and lifecycle. Design to normal operating limits with margin instead of operating continuously near absolute maximum values.</p>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950"><b>Supply-chain rule:</b> identify critical or single-source components early and consider approved alternatives before the schematic is frozen.</div>
        </Section>

        <Section icon={ClipboardCheck} title="Design reviews and stage gates">
          <p>A stage gate is a deliberate decision to proceed only when the required evidence is ready. Typical reviews cover requirements, architecture, schematic, layout and production release. Use checklists, record decisions, assign actions and close critical issues before moving forward.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card title="Verification" text="Confirms that the design meets its written specifications through inspection, analysis and testing." />
            <Card title="Validation" text="Confirms that the finished product satisfies the intended user and application need." />
          </div>
        </Section>

        <Section icon={Factory} title="Prototype, bring-up and production">
          <p>Order a small prototype quantity first. Inspect the unpowered board, check for shorts, use a current-limited supply, verify each power rail, confirm reset and clock operation, then test interfaces one block at a time. Record measurements and failures so the next revision is evidence-driven.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card title="Fabrication package" text="Gerber or ODB++ data, drill files, stack-up, board drawing and fabrication notes." />
            <Card title="Assembly package" text="BOM, pick-and-place data, assembly drawings, polarity notes, test procedure and firmware reference." />
          </div>
        </Section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-3"><ShieldCheck className="text-red-700" /><h3 className="text-2xl font-bold text-red-950">Safety and risk management</h3></div>
          <p className="mt-3 leading-8 text-red-900">Use ESD protection, isolated equipment where required and current-limited low-voltage power during early prototypes. High voltage, mains, lithium batteries, high-current loads and RF power require appropriate supervision, standards and protective design. Maintain a risk register covering electrical safety, thermal behaviour, component shortages, schedule, manufacturing yield and test coverage.</p>
        </section>

        <section className="rounded-2xl bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Wrench className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Practical activity: write a product design brief</h3></div>
          <p className="mt-3 leading-8 text-indigo-900">Choose a low-voltage project such as a USB-powered temperature monitor. Prepare a one-page brief containing the user need, five functional requirements, five non-functional requirements, a block diagram, preliminary power budget, key interfaces, three technical risks and acceptance tests.</p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• Product requirements must be specific, measurable and testable.</li>
            <li>• Architecture and interface decisions guide schematic and PCB work.</li>
            <li>• Component ratings, availability and lifecycle are design inputs.</li>
            <li>• Reviews and stage gates reduce expensive late-stage changes.</li>
            <li>• Verification checks specifications; validation checks the user need.</li>
            <li>• Controlled files and recorded test results make revisions traceable.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="flex items-center gap-3"><FileCheck2 className="text-emerald-700" /><h3 className="text-xl font-bold text-emerald-950">Completion checklist</h3></div>
          <p className="mt-3 leading-7 text-emerald-900">Complete the design brief, explain all ten workflow stages, distinguish verification from validation, identify the controlled manufacturing files, and score at least 80% in the quiz.</p>
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
function ChapterQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);
  const complete = Object.keys(answers).length === questions.length;
  const passed = score >= 8;
  const reset = () => { setAnswers({}); setSubmitted(false); };
  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 1 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
      <div className="mt-6 space-y-6">
        {questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[index] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={"flex cursor-pointer gap-3 rounded-xl border p-3 " + (correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50")}><input type="radio" name={"pcb-ch1-" + index} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}
      </div>
      {!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={"mt-6 rounded-2xl border p-6 " + (passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50")}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
    </section>
  );
}

import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, ClipboardCheck, GitBranch, Layers3, Power, RotateCcw, ShieldCheck, Tags, Wrench, XCircle, Zap } from "lucide-react";

const questions = [
  { question: "What is the primary purpose of a schematic?", options: ["Show the PCB's physical copper geometry", "Describe electrical connectivity and circuit intent", "Define enclosure colour", "Replace the BOM"], answer: 1 },
  { question: "How should signal flow normally be arranged?", options: ["Randomly", "Generally left to right, with power from top to bottom", "Only vertically", "Around the page border"], answer: 1 },
  { question: "What does a net label do?", options: ["Changes component value", "Connects electrically identical named nodes without a drawn wire", "Creates a PCB outline", "Runs thermal analysis"], answer: 1 },
  { question: "Where should a decoupling capacitor be connected?", options: ["Far from the circuit", "Between each relevant supply pin and ground, close to the IC", "Only at the input connector", "In series with every signal"], answer: 1 },
  { question: "What is ERC used for?", options: ["Checking likely electrical schematic errors", "Measuring board thickness", "Generating marketing images", "Selecting enclosure screws"], answer: 0 },
  { question: "Why use hierarchical sheets?", options: ["To hide errors", "To organise complex designs into understandable functional blocks", "To eliminate net names", "To change component packages"], answer: 1 },
  { question: "What must be checked for every IC power pin?", options: ["It has an appropriate supply, grounding and decoupling path", "It is left floating", "It shares a signal name", "It is connected to an LED"], answer: 0 },
  { question: "What should an unused input pin normally do?", options: ["Always remain floating", "Follow the datasheet's defined termination guidance", "Connect to any output", "Connect directly to mains"], answer: 1 },
  { question: "Why annotate reference designators?", options: ["To give every component a unique identity", "To set PCB colour", "To calculate enclosure size", "To hide component values"], answer: 0 },
  { question: "What is the best schematic-review practice?", options: ["Review only after manufacturing", "Use a checklist and an independent reviewer before layout", "Ignore warnings", "Depend only on autorouting"], answer: 1 },
];

export default function PCBChapterThreeLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 3</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Schematic Capture and Circuit Design</h2>
          <p className="mt-4 leading-8 text-slate-600">The schematic is the controlled electrical definition of a PCB. A good schematic is electrically correct, readable, reviewable and linked to verified component data. This chapter develops a disciplined process from functional blocks and circuit calculations to electrical-rule checks and design review.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold">Learning objectives</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {["Create readable schematics using accepted symbols and conventions.", "Organise a design into functional and hierarchical sheets.", "Define power, ground, signal names and off-board interfaces clearly.", "Design essential support circuits for controllers and interfaces.", "Apply annotation, footprint assignment and BOM properties.", "Run ERC and conduct a structured schematic review."].map((item) => <div key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</div>)}
          </div>
        </section>

        <Section icon={Layers3} title="From architecture to schematic">
          <p>Begin from the approved block diagram. Create separate functional areas for input power, regulation, controller, sensing, communication, outputs and connectors. Define every interface before drawing details: voltage, direction, protocol, source, destination, protection and expected state during reset or power loss.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Card title="Inputs" text="Sensors, switches and received signals with biasing, filtering and protection." />
            <Card title="Processing" text="Controller, clock, reset, programming interface, memory and local decoupling." />
            <Card title="Outputs" text="Indicators, drivers, relays, motors and transmitted signals with safe default states." />
          </div>
        </Section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><GitBranch className="text-sky-300" /><h3 className="text-2xl font-bold">Readable schematic conventions</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <DarkCard title="Logical flow" text="Arrange inputs on the left, outputs on the right, positive supplies above and ground below where practical." />
            <DarkCard title="Clear connections" text="Avoid ambiguous wire crossings; use junction dots and descriptive net labels consistently." />
            <DarkCard title="Functional grouping" text="Keep supporting parts beside the device they serve and place related circuits together." />
            <DarkCard title="Useful notes" text="State ratings, options, test points, assembly choices and safety-critical requirements." />
          </div>
        </section>

        <Section icon={Tags} title="Symbols, nets and reference designators">
          <p>Use symbols with correct pin numbers, names and electrical types. Give every component a unique reference such as R12, C7 or U3. Use meaningful net names such as +3V3, I2C_SCL, MOTOR_EN and USB_D_P. Global labels should be reserved for genuinely global signals; local labels and hierarchical ports reduce accidental connections.</p>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950"><b>Library rule:</b> never trust a downloaded symbol or footprint without comparing pin numbering, package code and dimensions against the manufacturer's datasheet.</div>
        </Section>

        <Section icon={Power} title="Power entry, regulation and decoupling">
          <p>Show connector polarity, fuse or current limiting, reverse-polarity protection, surge suppression, regulators and power indicators. Name rails consistently and mark power domains. Place a local high-frequency decoupling capacitor at each IC supply pin group, plus suitable bulk capacitance near power entry and changing loads.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card title="Power budget" text="Record normal, peak and start-up current for every rail and preserve regulator and connector margin." />
            <Card title="Sequencing and enable" text="Document required order, rise time, reset relationship, discharge and power-good behaviour." />
          </div>
        </Section>

        <Section icon={Zap} title="Controller support circuits">
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Clock" text="Follow load-capacitance, placement and grounding guidance for crystals or oscillators." />
            <Card title="Reset and boot" text="Define pull resistors, reset timing, boot straps and default states from the datasheet." />
            <Card title="Programming and debug" text="Expose the correct SWD, JTAG, ISP, UART or USB signals, power reference and ground." />
            <Card title="Unused pins" text="Apply the manufacturer's termination guidance; do not assume every unused input may float." />
          </div>
        </Section>

        <Section icon={ShieldCheck} title="Interfaces, protection and level compatibility">
          <p>Verify logic-high and logic-low thresholds, output drive, pull resistors, bus capacitance, common-mode range and voltage-domain compatibility. Add series resistance, level shifting, ESD protection, filtering or isolation where the environment requires it. Off-board connections deserve special attention because they carry cable-induced noise and user-accessible faults.</p>
        </Section>

        <Section icon={ClipboardCheck} title="Annotation, ERC and review">
          <p>Annotate references, assign values and exact part numbers, then associate verified footprints. Run electrical-rule checking to find unconnected pins, conflicting outputs, missing power drivers and other likely mistakes. Review every warning; suppress only with a documented reason.</p>
          <ol className="mt-5 space-y-3">
            {["Confirm requirements and block coverage.", "Check every power pin, rail name and ground return.", "Verify polarities, pin numbering and connector orientation.", "Recalculate critical resistor, timing, filter and protection values.", "Check reset, boot and power-up default states.", "Verify interface voltage compatibility and pull resistors.", "Confirm test points, programming access and measurement access.", "Run ERC, resolve warnings and record the review."].map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-slate-200 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span>{item}</li>)}
          </ol>
        </Section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="text-2xl font-bold text-red-950">Common schematic mistakes</h3>
          <ul className="mt-4 space-y-2 leading-7 text-red-900">
            <li>• Missing IC power pins, decoupling capacitors or ground connections.</li>
            <li>• Incorrect connector pin order or mirrored orientation.</li>
            <li>• Mismatched logic levels or missing pull-up resistors.</li>
            <li>• Floating enables, resets, boot pins or unused inputs.</li>
            <li>• Ambiguous net names, hidden connections and undocumented ERC exclusions.</li>
          </ul>
        </section>

        <section className="rounded-2xl bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Wrench className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Practical activity: controller-board schematic</h3></div>
          <p className="mt-3 leading-8 text-indigo-900">Create a schematic for a low-voltage controller board with USB or DC input, protected 3.3 V regulation, a microcontroller, reset and programming header, status LED, push button, I²C connector and MOSFET-driven output. Include part properties, net labels, test points, decoupling and design notes. Run ERC and prepare a one-page review record.</p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• A schematic communicates electrical intent, not physical PCB geometry.</li>
            <li>• Functional grouping and consistent flow make reviews more effective.</li>
            <li>• Power, reset, clocks and programming interfaces require explicit design.</li>
            <li>• Symbols, footprints and pin assignments must match the exact package.</li>
            <li>• ERC supports review but does not replace engineering judgement.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Finish the controller-board schematic, assign verified footprints, run ERC, complete the review checklist, explain every remaining warning, and score at least 80% in the quiz.</p>
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
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 3 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
      <div className="mt-6 space-y-6">
        {questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[index] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={"flex cursor-pointer gap-3 rounded-xl border p-3 " + (correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50")}><input type="radio" name={"pcb-ch3-" + index} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}
      </div>
      {!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={"mt-6 rounded-2xl border p-6 " + (passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50")}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
    </section>
  );
}

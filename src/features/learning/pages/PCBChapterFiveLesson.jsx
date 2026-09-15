import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, CircuitBoard, ClipboardCheck, Factory, Layers3, Maximize2, PackageCheck, RotateCcw, Ruler, ShieldCheck, Wrench, XCircle } from "lucide-react";

const questions = [
  { question: "What should determine the PCB layer stack-up?", options: ["Only board colour", "Electrical, mechanical, EMC, cost and fabrication needs", "Only schematic page count", "Only component quantity"], answer: 1 },
  { question: "Why is a continuous reference plane valuable?", options: ["It provides short return paths and supports controlled impedance", "It replaces every power trace", "It eliminates all vias", "It sets component values"], answer: 0 },
  { question: "What must be verified when creating a footprint?", options: ["Only the footprint name", "Package dimensions, pin numbering, orientation and land-pattern guidance", "Only 3D colour", "Only supplier price"], answer: 1 },
  { question: "What does courtyard clearance represent?", options: ["Recommended component placement and assembly space", "Copper thickness", "Signal voltage", "Board finish"], answer: 0 },
  { question: "Where should mounting holes be defined?", options: ["After production", "During mechanical board planning", "Only in the schematic notes", "By the component supplier"], answer: 1 },
  { question: "Why define keep-out areas?", options: ["To prevent prohibited copper, vias or components in constrained regions", "To increase BOM quantity", "To rename nets", "To change resistor values"], answer: 0 },
  { question: "What is annular ring?", options: ["Copper surrounding a drilled hole", "Board-edge paint", "A schematic junction", "Solder paste thickness"], answer: 0 },
  { question: "What should be considered for edge connectors?", options: ["Mating geometry, board edge, finish and keep-outs", "Only silkscreen text", "Only board width", "Only component colour"], answer: 0 },
  { question: "Why use fabrication-capability rules early?", options: ["To avoid a design that the chosen manufacturer cannot build reliably", "To replace DRC", "To eliminate documentation", "To increase signal speed"], answer: 0 },
  { question: "What is a footprint-validation best practice?", options: ["Print or measure at 1:1 and compare with the physical part or drawing", "Trust any downloaded library", "Ignore pin 1", "Check only after assembly"], answer: 0 },
];

export default function PCBChapterFiveLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 5</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">PCB Stack-Up, Footprints and Board Planning</h2>
          <p className="mt-4 leading-8 text-slate-600">Before component placement and routing, the designer must define the physical board, fabrication technology, layer arrangement and trustworthy component footprints. Good planning aligns electrical behaviour with enclosure, assembly, testing and manufacturing constraints.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold">Learning objectives</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {["Choose an appropriate layer count and stack-up.", "Explain copper, dielectric, mask, paste and silkscreen layers.", "Create and verify schematic-symbol-to-footprint mapping.", "Define board outline, holes, connectors and keep-outs.", "Set manufacturer-aware clearances, drills and geometry rules.", "Plan placement zones for power, analogue, digital and external interfaces."].map((item) => <div key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</div>)}
          </div>
        </section>

        <Section icon={Layers3} title="Understanding the PCB stack-up">
          <p>A stack-up defines the order and thickness of copper and dielectric layers. It affects board thickness, reference planes, impedance, power distribution, electromagnetic performance, manufacturability and cost. Agree the stack-up with the fabricator before controlled-impedance routing.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Card title="Two-layer board" text="Low cost and suitable for simpler circuits when routing and return paths can remain controlled." />
            <Card title="Four-layer board" text="Commonly provides signal layers plus solid ground and power or secondary signal planes." />
            <Card title="Higher layer count" text="Supports dense escape routing, multiple references and power domains, but raises fabrication complexity and cost." />
          </div>
        </Section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><CircuitBoard className="text-sky-300" /><h3 className="text-2xl font-bold">PCB data layers</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DarkCard title="Copper" text="Conductive tracks, pads, planes, pours and thermal structures." />
            <DarkCard title="Dielectric" text="Insulating core and prepreg controlling spacing and electromagnetic behaviour." />
            <DarkCard title="Solder mask" text="Protective coating with openings for pads and defined exposed copper." />
            <DarkCard title="Paste mask" text="Stencil openings controlling solder-paste deposition for surface-mount assembly." />
            <DarkCard title="Silkscreen" text="Reference labels, polarity, warnings and assembly information." />
            <DarkCard title="Mechanical data" text="Board outline, cut-outs, slots, dimensions, drill and fabrication notes." />
          </div>
        </section>

        <Section icon={PackageCheck} title="Footprint anatomy and creation">
          <p>A footprint must match the exact ordered package. It includes copper pads, plated or non-plated holes, solder-mask openings, paste apertures, courtyard, component outline, reference text, polarity and pin-1 indicators. Use the manufacturer's recommended land pattern when available and adapt only with a documented assembly reason.</p>
          <ol className="mt-5 space-y-3">
            {["Confirm exact package suffix and units.", "Read body, lead, pitch and tolerance dimensions.", "Create pads using the land-pattern recommendation or IPC-based method.", "Set mask and paste behaviour appropriate to the package.", "Add courtyard, fabrication outline and assembly/polarity marks.", "Map every footprint pad to the correct schematic pin.", "Run library checks and validate at actual scale."].map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-slate-200 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span>{item}</li>)}
          </ol>
        </Section>

        <Section icon={Ruler} title="Pads, holes and fabrication geometry">
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Surface-mount pads" text="Define width, length, spacing, mask expansion, paste opening and thermal-pad segmentation." />
            <Card title="Through-hole pads" text="Define finished hole, drill tolerance, copper diameter and adequate annular ring." />
            <Card title="Vias" text="Select drill, finished diameter, annular ring, aspect ratio, tenting or filling based on fabrication capability." />
            <Card title="Clearances" text="Set copper-to-copper, copper-to-edge, hole-to-copper and mask-sliver rules with manufacturing margin." />
          </div>
        </Section>

        <Section icon={Maximize2} title="Board outline and mechanical constraints">
          <p>Import or define the board shape from controlled mechanical data. Locate mounting holes, edge connectors, switches, displays, LEDs, antennas, sensors and cable exits before general placement. Include enclosure walls, standoffs, screw heads, tool access, bend radius, connector mating space and assembly tolerances.</p>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950"><b>Coordinate systems matter:</b> agree datum, origin, units, board side and viewing direction when exchanging data with mechanical and assembly teams.</div>
        </Section>

        <Section icon={ShieldCheck} title="Keep-outs, isolation and sensitive zones">
          <p>Define keep-outs for enclosure features, high-voltage isolation, RF antennas, magnetic components, board edges and tooling. Creepage and clearance must follow the actual voltage, pollution, material and regulatory context. Keep noisy power switching away from sensitive analogue inputs and isolate heat sources from temperature-sensitive components.</p>
        </Section>

        <Section icon={Factory} title="Design for fabrication and assembly">
          <p>Obtain the fabricator's standard capabilities for minimum trace, spacing, drill, annular ring, board thickness, copper weight, layer registration and surface finish. Use standard capability where possible; special processes increase cost and risk. Ask the assembler about package limits, panelisation, fiducials, tooling rails, stencil and inspection requirements.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card title="Fabrication readiness" text="Stack-up, material, copper, drill, impedance, finish, mask and board-profile requirements." />
            <Card title="Assembly readiness" text="Courtyard spacing, orientation, paste, fiducials, component access and inspection." />
          </div>
        </Section>

        <Section icon={ClipboardCheck} title="Pre-placement planning checklist">
          <div className="grid gap-3 md:grid-cols-2">
            {["Board outline and thickness confirmed", "Mounting holes and mechanical datum locked", "Connectors and user-interface parts fixed", "Stack-up agreed with fabricator", "Design rules loaded from capabilities", "All footprints independently verified", "Power and ground strategy documented", "High-current and sensitive zones identified", "Keep-outs and height limits imported", "Test and programming access reserved"].map((item) => <div key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4"><CheckCircle2 className="shrink-0 text-emerald-600" size={20} />{item}</div>)}
          </div>
        </Section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="text-2xl font-bold text-red-950">Common planning mistakes</h3>
          <ul className="mt-4 space-y-2 leading-7 text-red-900">
            <li>• Starting placement before the enclosure and connector locations are stable.</li>
            <li>• Using unverified footprints or confusing similar package suffixes.</li>
            <li>• Selecting a stack-up without consulting the fabricator.</li>
            <li>• Routing signals across plane gaps or leaving no path for return current.</li>
            <li>• Ignoring assembly courtyard, rework, probe and cable-access needs.</li>
          </ul>
        </section>

        <section className="rounded-2xl bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Wrench className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Practical activity: plan the controller PCB</h3></div>
          <p className="mt-3 leading-8 text-indigo-900">Use the Chapter 3 controller schematic. Define a board outline, four mounting holes, power and I/O connector locations, a suitable two- or four-layer stack-up, design rules and placement zones. Create or verify three footprints from datasheets, print them at 1:1 scale, and document the checks.</p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• Stack-up choices affect return paths, impedance, power integrity, cost and fabrication.</li>
            <li>• Every footprint must match the exact package and pin numbering.</li>
            <li>• Mechanical constraints and fixed components are defined before general placement.</li>
            <li>• Keep-outs protect electrical, mechanical, RF and safety requirements.</li>
            <li>• Manufacturer-aware rules prevent avoidable fabrication problems.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the board-planning activity, obtain or define fabrication rules, validate three footprints, document the stack-up and placement zones, and score at least 80% in the quiz.</p>
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
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 5 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
      <div className="mt-6 space-y-6">
        {questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[index] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={"flex cursor-pointer gap-3 rounded-xl border p-3 " + (correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50")}><input type="radio" name={"pcb-ch5-" + index} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}
      </div>
      {!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={"mt-6 rounded-2xl border p-6 " + (passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50")}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
    </section>
  );
}

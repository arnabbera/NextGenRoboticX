import { useMemo, useState } from "react";
import {
  Activity,
  Boxes,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  Cpu,
  Gauge,
  Layers3,
  Lightbulb,
  MemoryStick,
  RefreshCcw,
  RotateCcw,
  ShieldCheck,
  Timer,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";

const questions = [
  { question: "What is an embedded system?", options: ["A computer intended only for browsing", "A purpose-built computing system integrated into a larger product", "Any desktop computer with external speakers", "Only a mechanical device"], answer: 1 },
  { question: "Which combination represents the basic embedded-system information flow?", options: ["Input → processing → output", "Output → decoration → input", "Battery → packaging → marketing", "Keyboard → printer only"], answer: 0 },
  { question: "Why are embedded systems commonly resource constrained?", options: ["They never execute software", "They must meet cost, power, memory, size and timing targets", "They always use unlimited cloud storage", "They cannot contain sensors"], answer: 1 },
  { question: "Which component normally executes the firmware instructions?", options: ["Microcontroller or processor", "Passive resistor", "Connector housing", "Mechanical enclosure"], answer: 0 },
  { question: "What does deterministic behaviour mean in an embedded application?", options: ["The response is always random", "Important operations complete within known timing bounds", "The device needs an internet browser", "The device uses the largest possible memory"], answer: 1 },
  { question: "Which is the best example of a safety-critical embedded system?", options: ["Decorative LED toy", "Airbag controller", "Desktop wallpaper", "USB storage label"], answer: 1 },
  { question: "What is firmware?", options: ["The product enclosure", "Software stored for execution on the embedded hardware", "Only a circuit diagram", "A type of battery"], answer: 1 },
  { question: "Why is a watchdog timer used?", options: ["To increase screen size", "To detect stalled software and support recovery", "To replace all testing", "To measure enclosure colour"], answer: 1 },
  { question: "What should be identified before selecting a microcontroller?", options: ["Only the brand logo", "Functional and non-functional requirements", "Only the PCB colour", "The final advertising slogan"], answer: 1 },
  { question: "Which statement best describes hardware-software co-design?", options: ["Hardware and firmware decisions are made together to meet system requirements", "Firmware is written without considering hardware", "Hardware is selected after production", "Software replaces every physical component"], answer: 0 },
];

export default function EmbeddedSystemsChapterOneLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 1</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Introduction to Embedded Systems and Applications</h2>
          <p className="mt-4 leading-8 text-slate-600">
            Embedded systems are purpose-built computers hidden inside products. They sense conditions, execute firmware, make decisions and control outputs while operating within strict limits of time, cost, energy, memory, size and reliability. This chapter develops the system-level thinking required before selecting a controller or writing code.
          </p>
        </header>

        <section>
          <h3 className="text-2xl font-bold text-slate-900">Learning objectives</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {["Define an embedded system and distinguish it from a general-purpose computer.", "Explain the input, processing, memory, communication and output blocks.", "Recognise real-time, reliability, power, cost and resource constraints.", "Classify embedded systems by complexity, timing and application risk.", "Identify embedded systems in consumer, industrial, automotive and medical products.", "Translate a product idea into initial functional and non-functional requirements."].map((item) => (
              <li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><Cpu className="text-blue-700" /><h3 className="text-2xl font-bold text-blue-950">What makes a system embedded?</h3></div>
          <p className="mt-4 leading-8 text-slate-700">An embedded system combines electronic hardware and firmware to perform one defined function—or a closely related set of functions—inside a larger product. The user normally interacts with the product, not with the computer itself. A washing-machine controller, digital energy meter and anti-lock braking controller are computers, but their computing purpose is built into the equipment.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard title="Dedicated purpose" text="The system is optimised for its product function rather than for arbitrary applications." />
            <InfoCard title="Product integration" text="Sensors, actuators, mechanics, power electronics and firmware work as one complete system." />
            <InfoCard title="Resource constraints" text="Processing power, memory, energy, physical space and unit cost are deliberately limited." />
            <InfoCard title="Dependable response" text="The product must respond correctly and, where required, within a defined time limit." />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><Layers3 className="text-indigo-700" /><h3 className="text-2xl font-bold">General-purpose computer vs embedded system</h3></div>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[680px] text-left">
              <thead className="bg-slate-900 text-white"><tr><th className="p-4">Design aspect</th><th className="p-4">General-purpose computer</th><th className="p-4">Embedded system</th></tr></thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <CompareRow label="Purpose" general="Runs many unrelated applications" embedded="Performs a defined product function" />
                <CompareRow label="User interface" general="Rich display, keyboard and pointer" embedded="May use buttons, LEDs, a small display or no direct interface" />
                <CompareRow label="Resources" general="Relatively abundant and expandable" embedded="Selected to meet tight cost, memory, power and size targets" />
                <CompareRow label="Timing" general="Average responsiveness is often acceptable" embedded="Deadlines may be part of correctness" />
                <CompareRow label="Lifecycle" general="Frequently upgraded or replaced" embedded="May operate unattended for many years" />
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
          <h3 className="text-2xl font-bold text-cyan-950">The five-block model</h3>
          <p className="mt-3 leading-8 text-cyan-900">Most embedded products can be understood as a flow of information and energy. Inputs describe the environment; the controller processes them using firmware and stored data; outputs affect or inform the environment; communication exchanges information with other systems; and the power subsystem supports every block.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <SystemBlock icon={Activity} title="Inputs" text="Sensors, switches, keypads, encoders and received messages." />
            <SystemBlock icon={Cpu} title="Processing" text="Microcontroller, processor, programmable logic and firmware." />
            <SystemBlock icon={MemoryStick} title="Memory" text="Program Flash, RAM, EEPROM and external storage." />
            <SystemBlock icon={RefreshCcw} title="Communication" text="UART, I²C, SPI, CAN, USB, Ethernet or wireless links." />
            <SystemBlock icon={Zap} title="Outputs" text="Displays, indicators, motors, relays, valves and transmitted data." />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Core engineering constraints</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ConstraintCard icon={Timer} title="Timing" text="A result produced too late can be incorrect. Control loops, communication and safety responses may have deadlines." />
            <ConstraintCard icon={Gauge} title="Performance" text="Processing throughput must be adequate without selecting unnecessarily costly or power-hungry hardware." />
            <ConstraintCard icon={MemoryStick} title="Memory" text="Firmware, buffers, stack, heap and stored data must fit with enough margin for dependable operation." />
            <ConstraintCard icon={Zap} title="Energy" text="Battery products need sleep modes and efficient duty cycles; mains products still need thermal and efficiency control." />
            <ConstraintCard icon={Boxes} title="Cost and size" text="Component count, PCB area, enclosure, assembly and test time influence the complete product cost." />
            <ConstraintCard icon={ShieldCheck} title="Reliability and safety" text="The design must handle invalid input, electrical noise, communication loss, software faults and foreseeable misuse." />
          </div>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><Timer className="text-sky-300" /><h3 className="text-2xl font-bold">Real-time does not simply mean fast</h3></div>
          <p className="mt-4 leading-8 text-slate-200">A real-time system produces the correct result within a required time bound. A very fast response with unpredictable delay may be unsuitable, while a slower but guaranteed response may be correct. In a <b>hard real-time</b> system, missing a deadline can cause unacceptable failure. In a <b>soft real-time</b> system, occasional delay reduces quality but is not catastrophic.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <DarkCard title="Hard real-time" text="Airbag deployment, critical motor protection and some medical control functions." />
            <DarkCard title="Firm real-time" text="A late result has no value, although a rare miss may be tolerable within the system risk model." />
            <DarkCard title="Soft real-time" text="Audio, user-interface updates and non-critical telemetry where delay lowers quality." />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Where embedded systems are used</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Application title="Consumer and home" examples="Washing machines, cameras, smart locks, induction cookers, televisions and toys." />
            <Application title="Automotive and transport" examples="Engine control, airbags, instrument clusters, battery management, lighting and driver assistance." />
            <Application title="Industrial automation" examples="Motor drives, PLC modules, robots, condition monitoring, safety interlocks and process instruments." />
            <Application title="Medical and assistive" examples="Infusion pumps, patient monitors, diagnostic instruments, hearing devices and portable sensors." />
            <Application title="Communication and IoT" examples="Routers, gateways, smart meters, tracking devices, environmental nodes and connected controllers." />
            <Application title="Aerospace and defence" examples="Navigation, telemetry, flight control, payload management and health-monitoring subsystems." />
          </div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex items-center gap-3"><Wrench className="text-amber-700" /><h3 className="text-2xl font-bold text-amber-950">Embedded product development workflow</h3></div>
          <ol className="mt-5 space-y-3 text-slate-700">
            {["Define the problem, users, operating environment and measurable requirements.", "Partition the system into sensing, processing, memory, communication, output and power functions.", "Select an architecture and components with realistic performance and design margin.", "Develop hardware and firmware together; define interfaces before detailed implementation.", "Prototype incrementally and test each interface with known inputs and expected outputs.", "Verify functional behaviour, timing, electrical limits, fault handling, safety and environmental performance.", "Prepare production programming, calibration, test, documentation, maintenance and update plans."].map((item, index) => (
              <li key={item} className="flex gap-4 rounded-xl bg-white/80 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">{index + 1}</span><span>{item}</span></li>
            ))}
          </ol>
        </section>

        <section>
          <div className="flex items-center gap-3"><ClipboardCheck className="text-emerald-700" /><h3 className="text-2xl font-bold">Requirements: decide what success means</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard title="Functional requirements" text="Describe what the product must do: measure temperature, control a fan, detect a fault, show status or transmit a record." />
            <InfoCard title="Non-functional requirements" text="Describe how well it must work: response time, accuracy, battery life, operating temperature, cost, safety, security and reliability." />
          </div>
          <div className="mt-5 rounded-2xl bg-emerald-50 p-5 text-emerald-950"><b>Make requirements testable:</b> replace “respond quickly” with “switch the alarm output within 20 ms after a valid over-temperature condition is confirmed.” A measurable requirement guides design and later proves whether the product works.</div>
        </section>

        <section className="rounded-2xl bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Lightbulb className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Hands-on activity: embedded-system product audit</h3></div>
          <p className="mt-3 leading-8 text-indigo-900">Choose one everyday product, such as a microwave oven, printer, digital weighing scale or automatic water-level controller. Create a one-page system diagram identifying its inputs, controller, memory, communication, outputs and power source. Then write five functional requirements, five non-functional requirements, three foreseeable faults and a safe response for each fault.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {["List the user and the product's dedicated purpose.", "Identify at least two sensors or input signals.", "Identify at least two outputs or actuators.", "State one timing requirement and one power constraint.", "Describe what happens after power loss and restoration.", "Propose one watchdog or fault-recovery action."].map((item) => <div key={item} className="flex gap-3 rounded-xl bg-white p-4"><CheckCircle2 className="mt-0.5 shrink-0 text-indigo-600" size={20} /><span>{item}</span></div>)}
          </div>
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-3"><ShieldCheck className="text-red-700" /><h3 className="text-2xl font-bold text-red-950">Safe laboratory practice</h3></div>
          <p className="mt-3 leading-8 text-red-900">Use current-limited, low-voltage supplies for beginner prototypes. Verify polarity and common ground before power-up, disconnect power before changing wiring, protect inputs from voltages beyond device ratings, control ESD when handling boards, and never drive motors, relays or mains loads directly from a microcontroller pin.</p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• An embedded system is a dedicated computer integrated into a larger product.</li>
            <li>• Inputs, processing, memory, communication, outputs and power form the system architecture.</li>
            <li>• Correctness may include meeting a deadline, not only producing the correct value.</li>
            <li>• Hardware and firmware must be designed together against measurable requirements.</li>
            <li>• Reliability comes from validation, margins, fault detection and safe recovery—not from assuming faults will not occur.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Chapter completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the product-audit activity, explain the five-block model, distinguish functional from non-functional requirements, identify one hard and one soft real-time example, and score at least 80% in the quiz.</p>
        </section>
      </article>
      <ChapterQuiz />
    </>
  );
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
        {questions.map((item, index) => (
          <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5">
            <legend className="px-2 font-bold">{index + 1}. {item.question}</legend>
            <div className="mt-3 space-y-2">
              {item.options.map((option, optionIndex) => {
                const selected = answers[index] === optionIndex;
                const correct = submitted && optionIndex === item.answer;
                const incorrect = submitted && selected && optionIndex !== item.answer;
                return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`embedded-ch1-${index}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>;
              })}
            </div>
          </fieldset>
        ))}
      </div>
      {!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
    </section>
  );
}

function CompareRow({ label, general, embedded }) {
  return <tr><th className="p-4 font-bold text-slate-900">{label}</th><td className="p-4">{general}</td><td className="p-4">{embedded}</td></tr>;
}

function InfoCard({ title, text }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>;
}

function SystemBlock({ icon: Icon, title, text }) {
  return <div className="rounded-2xl bg-white p-4 shadow-sm"><Icon className="text-cyan-700" size={25} /><h4 className="mt-3 font-bold text-slate-900">{title}</h4><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>;
}

function ConstraintCard({ icon: Icon, title, text }) {
  return <div className="rounded-2xl border border-slate-200 p-5"><Icon className="text-blue-600" size={27} /><h4 className="mt-3 text-lg font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>;
}

function DarkCard({ title, text }) {
  return <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><h4 className="font-bold text-sky-200">{title}</h4><p className="mt-2 leading-7 text-slate-200">{text}</p></div>;
}

function Application({ title, examples }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><h4 className="text-lg font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{examples}</p></div>;
}

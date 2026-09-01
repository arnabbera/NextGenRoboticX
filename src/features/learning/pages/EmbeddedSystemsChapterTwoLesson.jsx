import { useMemo, useState } from "react";
import {
  Binary,
  Braces,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Cpu,
  Database,
  GitBranch,
  MemoryStick,
  RefreshCcw,
  RotateCcw,
  ShieldCheck,
  Workflow,
  XCircle,
  Zap,
} from "lucide-react";

const questions = [
  { question: "What is the main difference between a microcontroller and a general-purpose microprocessor?", options: ["A microcontroller integrates CPU, memory and peripherals on one chip", "A microcontroller has no CPU", "A microprocessor cannot execute instructions", "A microprocessor always contains sensors"], answer: 0 },
  { question: "Which CPU block performs arithmetic and logical operations?", options: ["Watchdog", "ALU", "GPIO", "Oscillator"], answer: 1 },
  { question: "What does the program counter normally contain?", options: ["The supply voltage", "The address of the next instruction", "The ADC result only", "The clock frequency"], answer: 1 },
  { question: "What is carried by the address bus?", options: ["The location to be accessed", "Only analog voltage", "The enclosure dimensions", "The reset delay"], answer: 0 },
  { question: "What does a memory map describe?", options: ["The physical PCB shape", "The address ranges assigned to memory and peripherals", "The battery discharge curve", "The network password"], answer: 1 },
  { question: "What distinguishes a Harvard architecture?", options: ["It has separate instruction and data paths or memories", "It never uses RAM", "It has no registers", "It can execute only one instruction"], answer: 0 },
  { question: "Why is an interrupt useful?", options: ["It lets an event request timely CPU attention without continuous polling", "It permanently stops the clock", "It replaces program memory", "It increases the supply voltage"], answer: 0 },
  { question: "What is the purpose of a watchdog timer?", options: ["To display time to the user", "To recover from software that stops servicing it", "To convert analog signals", "To store the application"], answer: 1 },
  { question: "What can a brown-out detector do?", options: ["Detect an unsafe fall in supply voltage and hold or reset the system", "Add external RAM", "Increase GPIO current", "Compile firmware"], answer: 0 },
  { question: "What should drive processor selection?", options: ["Only maximum clock speed", "Measured requirements for performance, memory, peripherals, power, safety and cost", "Only package colour", "Only the newest architecture"], answer: 1 },
];

export default function EmbeddedSystemsChapterTwoLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 2</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Microcontrollers, Processors and System Architecture</h2>
          <p className="mt-4 leading-8 text-slate-600">Every embedded product is built around a processing architecture. This chapter explains how a CPU executes instructions, how memory and peripherals are organised, and how engineers choose between microcontrollers, microprocessors and system-on-chip devices.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold text-slate-900">Learning objectives</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {["Distinguish microcontrollers, microprocessors, SoCs and specialised processors.", "Identify the ALU, control unit, registers and program counter inside a CPU.", "Explain the fetch-decode-execute cycle and the purpose of system buses.", "Compare von Neumann, Harvard and modified Harvard architectures.", "Interpret a basic memory map and memory-mapped peripheral registers.", "Select an architecture using performance, timing, power, memory, interface and cost requirements."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><Cpu className="text-blue-700" /><h3 className="text-2xl font-bold text-blue-950">Choosing the processing device</h3></div>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-blue-100 bg-white">
            <table className="w-full min-w-[720px] text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-4">Device</th><th className="p-4">Typical integration</th><th className="p-4">Best suited to</th></tr></thead><tbody className="divide-y divide-slate-200 text-slate-700">
              <DeviceRow device="Microcontroller (MCU)" integration="CPU, Flash, SRAM, timers, GPIO and communication peripherals" use="Deterministic control, sensing, appliances, instruments and battery products" />
              <DeviceRow device="Microprocessor (MPU)" integration="Powerful CPU; usually depends on external RAM, storage and support devices" use="Rich operating systems, displays, networking and complex applications" />
              <DeviceRow device="System on Chip (SoC)" integration="CPU cores plus memory controllers, accelerators, radios or other subsystems" use="Connected products, multimedia, edge computing and highly integrated platforms" />
              <DeviceRow device="DSP / accelerator" integration="Hardware optimised for repeated numerical or parallel operations" use="Audio, motor control, vision, communications and signal processing" />
            </tbody></table>
          </div>
          <p className="mt-4 leading-7 text-blue-950"><b>Important:</b> these categories overlap. A modern MCU may include DSP instructions, while an SoC may contain both application and real-time processor cores. Select from the product requirements, not from the label alone.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Inside the CPU</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Concept icon={Binary} title="ALU" text="Performs arithmetic, comparison, shifting and Boolean operations." />
            <Concept icon={Workflow} title="Control unit" text="Decodes instructions and coordinates transfers and operations." />
            <Concept icon={Database} title="Registers" text="Very fast storage for operands, addresses and intermediate results." />
            <Concept icon={GitBranch} title="Program counter" text="Tracks the address of the next instruction, changing on branches and interrupts." />
            <Concept icon={MemoryStick} title="Stack pointer" text="Tracks the stack used for calls, local data and saved execution context." />
            <Concept icon={Braces} title="Status register" text="Records flags such as zero, carry, negative and interrupt state." />
          </div>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <h3 className="text-2xl font-bold">The fetch-decode-execute cycle</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Step number="1" title="Fetch" text="The CPU uses the program counter to obtain the next instruction from program memory." />
            <Step number="2" title="Decode" text="The control unit determines the operation, operands and addressing method." />
            <Step number="3" title="Execute" text="The CPU performs the operation, stores the result and advances or changes program flow." />
          </div>
          <p className="mt-5 leading-8 text-slate-200">Many processors overlap these stages using a pipeline. Branches, memory waits and interrupts can disturb the flow, so clock frequency alone does not determine application performance.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Buses connect the architecture</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Concept icon={GitBranch} title="Address bus" text="Selects the memory location or peripheral register being accessed." />
            <Concept icon={RefreshCcw} title="Data bus" text="Carries instructions and data between the CPU, memory and peripherals." />
            <Concept icon={Clock3} title="Control bus" text="Carries read, write, clock, interrupt and other coordination signals." />
          </div>
          <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 leading-7 text-slate-700">Bus width affects how much data can be transferred at once; address width limits the directly addressable range. Actual capability also depends on the instruction set, implementation and memory system.</p>
        </section>

        <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
          <h3 className="text-2xl font-bold text-cyan-950">Memory organisation and the memory map</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <MemoryCard title="Flash / ROM" text="Non-volatile storage for program code, constants and startup data." />
            <MemoryCard title="SRAM" text="Fast volatile storage for variables, buffers, stack and sometimes heap." />
            <MemoryCard title="EEPROM / non-volatile data" text="Retains configuration or calibration values through power loss; endurance is finite." />
            <MemoryCard title="Peripheral registers" text="Control GPIO, timers, ADCs and communication hardware through defined addresses." />
          </div>
          <p className="mt-5 leading-8 text-cyan-950">A <b>memory map</b> assigns address ranges to program memory, RAM, peripherals and system control. In memory-mapped I/O, firmware reads and writes peripheral registers using address operations. Reserved bits and access rules in the reference manual must be respected.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Harvard and von Neumann architectures</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Architecture title="Von Neumann" text="Instructions and data share one address space and transfer path. The model is simple, but instruction and data traffic can compete." />
            <Architecture title="Harvard" text="Instructions and data use separate memories or paths, allowing simultaneous access and potentially different widths." />
          </div>
          <p className="mt-4 leading-8 text-slate-600">Many modern devices use a <b>modified Harvard</b> design: separate instruction and data paths near the core, with a unified address model or shared main memory elsewhere. Always consult the specific device architecture.</p>
        </section>

        <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <h3 className="text-2xl font-bold text-indigo-950">Peripherals turn computation into control</h3>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {["GPIO: digital input and output", "Timers: scheduling, capture and PWM", "ADC/DAC: analog conversion", "UART, SPI and I²C: device communication", "CAN, USB or Ethernet: system networking", "DMA: transfers data with less CPU intervention"].map((item) => <div key={item} className="rounded-xl bg-white p-4 font-medium text-indigo-950">{item}</div>)}
          </div>
          <p className="mt-5 leading-8 text-indigo-900">A peripheral normally has configuration, status and data registers. Firmware must configure pins and clocks, select operating modes, handle flags, and respect electrical and timing limits.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Polling, interrupts and DMA</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Concept icon={RefreshCcw} title="Polling" text="Software repeatedly checks status. It is simple but can waste CPU time or miss tight response needs." />
            <Concept icon={Zap} title="Interrupts" text="An event temporarily redirects execution to a handler, enabling timely response to asynchronous events." />
            <Concept icon={Workflow} title="DMA" text="A controller moves blocks between peripherals and memory while the CPU performs other work." />
          </div>
          <p className="mt-4 rounded-2xl bg-amber-50 p-5 leading-7 text-amber-950">Interrupt service routines should normally be short and bounded. Share data with main code carefully, clear the correct event flag, and analyse priority and worst-case response time.</p>
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-3"><ShieldCheck className="text-red-700" /><h3 className="text-2xl font-bold text-red-950">Clock, reset and dependable startup</h3></div>
          <ul className="mt-4 space-y-3 leading-7 text-red-900">
            <li>• The clock source determines timing; configure it within device voltage and frequency limits.</li>
            <li>• Power-on reset holds the device in a known state while supply and clock conditions stabilise.</li>
            <li>• Brown-out detection prevents unreliable execution when supply voltage falls too low.</li>
            <li>• A watchdog can reset or place the system in a safe state if software stops making progress.</li>
            <li>• Startup code should establish safe output states before enabling actuators or power stages.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Architecture selection checklist</h3>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {["Required worst-case execution time and interrupt latency", "Flash, RAM, non-volatile data and external-memory needs", "GPIO count, voltage levels, timers, analog channels and communication interfaces", "Power modes, wake sources, operating voltage and thermal limits", "Safety, security, watchdog, diagnostics and update requirements", "Package, environmental rating, lifecycle, tools, supply availability and total system cost"].map((item) => <div key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={20} /><span>{item}</span></div>)}
          </div>
        </section>

        <section className="rounded-2xl bg-emerald-50 p-6">
          <h3 className="text-2xl font-bold text-emerald-950">Hands-on activity: create an architecture map</h3>
          <p className="mt-3 leading-8 text-emerald-900">Choose a development board or controller datasheet. Record the CPU core and word size, maximum clock, Flash and SRAM, reset and watchdog features, GPIO, timers, ADC, serial interfaces and operating voltage. Sketch the path from one sensor through the CPU to one actuator, then identify which peripheral registers, interrupts and memory buffers the firmware would use.</p>
          <p className="mt-4 rounded-xl bg-white p-4 text-emerald-950"><b>Design challenge:</b> compare the same device against the needs of a battery temperature logger, a motor controller and a touchscreen gateway. Explain why one architecture may not be the best choice for all three.</p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• An MCU integrates the processor, memory and peripherals needed for compact control systems.</li>
            <li>• The CPU repeatedly fetches, decodes and executes instructions using registers and the ALU.</li>
            <li>• Address, data and control paths connect the CPU to memory and peripherals.</li>
            <li>• A memory map defines where code, data, peripherals and system control registers reside.</li>
            <li>• Device selection must be based on verified system requirements and adequate design margin.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Chapter completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the architecture-map activity, explain the CPU execution cycle, compare MCU and MPU designs, interpret a basic memory map, describe polling versus interrupts, and score at least 80% in the quiz.</p>
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
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 2 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
      <div className="mt-6 space-y-6">
        {questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => {
          const selected = answers[index] === optionIndex;
          const correct = submitted && optionIndex === item.answer;
          const incorrect = submitted && selected && optionIndex !== item.answer;
          return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`embedded-ch2-${index}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>;
        })}</div></fieldset>)}
      </div>
      {!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
    </section>
  );
}

function DeviceRow({ device, integration, use }) { return <tr><th className="p-4 font-bold text-slate-900">{device}</th><td className="p-4">{integration}</td><td className="p-4">{use}</td></tr>; }
function Concept({ icon: Icon, title, text }) { return <div className="rounded-2xl border border-slate-200 p-5"><Icon className="text-blue-600" size={27} /><h4 className="mt-3 text-lg font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function Step({ number, title, text }) { return <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 font-bold">{number}</span><h4 className="mt-4 text-lg font-bold text-sky-200">{title}</h4><p className="mt-2 leading-7 text-slate-200">{text}</p></div>; }
function MemoryCard({ title, text }) { return <div className="rounded-2xl bg-white p-5"><h4 className="font-bold text-cyan-950">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function Architecture({ title, text }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><h4 className="text-lg font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }

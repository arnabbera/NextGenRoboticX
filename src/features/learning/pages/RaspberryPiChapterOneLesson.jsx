import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, Cpu, HardDrive, Monitor, Network, RotateCcw, ShieldAlert, XCircle, Zap } from "lucide-react";

const questions = [
  { question: "What is a single-board computer (SBC)?", options: ["A complete computer built mainly on one circuit board", "Only a power supply", "A sensor without a processor", "A mechanical controller"], answer: 0 },
  { question: "Which statement best distinguishes a Raspberry Pi from a typical Arduino Uno?", options: ["A Raspberry Pi cannot run programs", "A Raspberry Pi normally runs an operating system and supports multitasking", "An Arduino Uno always needs a monitor", "They are electrically identical"], answer: 1 },
  { question: "Where is Raspberry Pi OS commonly stored for booting?", options: ["Only in RAM", "Inside an HDMI cable", "On a prepared microSD card or supported storage device", "In a GPIO pin"], answer: 2 },
  { question: "What is the purpose of GPIO pins?", options: ["To connect and control compatible electronic inputs and outputs", "To increase mains voltage", "To replace the processor", "To cool the board"], answer: 0 },
  { question: "Which interface normally carries digital video and audio to a display?", options: ["GPIO ground", "HDMI", "CSI only", "microSD"], answer: 1 },
  { question: "Why should the official or correctly rated power supply be used?", options: ["To change Python syntax", "To avoid undervoltage, instability, and storage corruption", "To provide GPIO with 12 V", "To remove the operating system"], answer: 1 },
  { question: "What is Raspberry Pi OS?", options: ["A physical expansion board", "A Linux-based operating system designed for Raspberry Pi", "A type of resistor", "A camera connector"], answer: 1 },
  { question: "What should you do before disconnecting power from a running Raspberry Pi?", options: ["Short two GPIO pins", "Remove the microSD card immediately", "Shut down the operating system correctly", "Increase CPU load"], answer: 2 },
  { question: "Which connector is intended for supported Raspberry Pi camera modules?", options: ["CSI", "Ethernet only", "Audio output", "Power LED"], answer: 0 },
  { question: "Why must GPIO voltage limits be checked before connecting hardware?", options: ["GPIO is not automatically tolerant of every voltage", "GPIO accepts unlimited current", "It improves Wi-Fi range", "It formats the microSD card"], answer: 0 },
];

export default function RaspberryPiChapterOneLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 1</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Introduction to Raspberry Pi and Single-Board Computers</h2>
          <p className="mt-4 leading-8 text-slate-600">Raspberry Pi is a family of compact single-board computers designed for education, prototyping, automation, networking, media, artificial intelligence, and embedded applications. Unlike a simple microcontroller board, a Raspberry Pi can run a full operating system, execute several programs, connect to networks, and provide a desktop environment.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold text-slate-900">Learning objectives</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {["Define a single-board computer and identify its main functional blocks.", "Explain the difference between a Raspberry Pi and a microcontroller board.", "Recognise common Raspberry Pi ports, connectors, and interfaces.", "Select suitable storage, display, networking, and power accessories.", "Describe the boot process and role of Raspberry Pi OS.", "Apply safe handling and shutdown practices."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><span className="mr-2 font-bold text-emerald-600">✓</span>{item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><Cpu className="text-blue-700" size={28} /><h3 className="text-2xl font-bold">What is a single-board computer?</h3></div>
          <p className="mt-4 leading-8 text-slate-700">An SBC places the processor, memory, input/output controllers, and essential interfaces on one circuit board. With storage, power, and an operating system, it behaves like a general-purpose computer. Its small size and accessible GPIO header also make it useful as the controller inside a larger project.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Feature icon={Cpu} title="System on Chip" text="Combines CPU, graphics, memory controllers, and peripheral interfaces in a compact package." />
            <Feature icon={HardDrive} title="Memory and storage" text="RAM supports active programs, while a microSD card or supported external device stores the operating system and files." />
            <Feature icon={Monitor} title="User interfaces" text="Display, USB, audio on selected models, camera, and display connectors support interactive applications." />
            <Feature icon={Network} title="Connectivity" text="Depending on the model, Ethernet, Wi-Fi, Bluetooth, USB, and GPIO connect the Pi to devices and networks." />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Raspberry Pi versus a microcontroller</h3>
          <div className="mt-5 overflow-x-auto"><table className="w-full border-collapse text-left"><thead><tr className="bg-slate-900 text-white"><th className="p-3">Feature</th><th className="p-3">Raspberry Pi SBC</th><th className="p-3">Typical microcontroller board</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">Software</td><td className="p-3">Usually runs Linux and many processes</td><td className="p-3">Usually runs one firmware application</td></tr><tr><td className="p-3 font-semibold">Boot time</td><td className="p-3">Requires an operating-system boot</td><td className="p-3">Starts firmware quickly</td></tr><tr><td className="p-3 font-semibold">Strength</td><td className="p-3">Networking, files, desktop, databases, vision</td><td className="p-3">Precise direct control and low-power tasks</td></tr><tr><td className="p-3 font-semibold">Storage</td><td className="p-3">External boot/storage media</td><td className="p-3">Program commonly stored in on-chip flash</td></tr><tr><td className="p-3 font-semibold">Examples</td><td className="p-3">Web server, camera system, IoT gateway</td><td className="p-3">Sensor node, motor controller, timing device</td></tr></tbody></table></div>
          <p className="mt-4 leading-7 text-slate-600">Neither category is universally better. A project may use both: the Raspberry Pi handles vision and networking while a microcontroller performs time-critical motor or sensor control.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Know the board</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Feature icon={Zap} title="Power input" text="Use the connector and a regulated supply rated for your exact model and attached peripherals." />
            <Feature icon={Monitor} title="Display output" text="HDMI connects a compatible monitor or television. Connector size varies by model." />
            <Feature icon={HardDrive} title="microSD slot" text="Commonly holds the boot files, operating system, applications, and user data." />
            <Feature icon={Network} title="Ethernet and wireless" text="Model-dependent wired and wireless interfaces provide local and internet connectivity." />
            <Feature icon={Cpu} title="40-pin GPIO header" text="Provides 3.3 V logic GPIO plus power, ground, I2C, SPI, UART, and other alternate functions." />
            <Feature icon={Monitor} title="Camera and display interfaces" text="CSI and DSI connectors support compatible camera and display modules on applicable boards." />
          </div>
        </section>

        <section className="rounded-2xl bg-slate-50 p-6">
          <h3 className="text-2xl font-bold">How a Raspberry Pi starts</h3>
          <ol className="mt-4 space-y-3">{["A regulated power supply energises the board.", "Boot firmware locates valid boot files on configured storage.", "The Linux kernel and device configuration are loaded.", "The operating system starts services, networking, and the login or desktop environment.", "Applications can then access files, networking, and permitted hardware interfaces."].map((item, index) => <li key={item} className="flex gap-4 rounded-xl bg-white p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span><span>{item}</span></li>)}</ol>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Essential starter equipment</h3>
          <div className="mt-5 overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-3">Item</th><th className="p-3">Purpose</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">Raspberry Pi board</td><td className="p-3">Choose a model suitable for performance, interfaces, and budget.</td></tr><tr><td className="p-3 font-semibold">Correct power supply</td><td className="p-3">Provides stable voltage and enough current for board and peripherals.</td></tr><tr><td className="p-3 font-semibold">Quality microSD card</td><td className="p-3">Stores Raspberry Pi OS and project files.</td></tr><tr><td className="p-3 font-semibold">Cooling and case</td><td className="p-3">Protects the board and manages heat when the model or workload requires it.</td></tr><tr><td className="p-3 font-semibold">Display, keyboard, and mouse</td><td className="p-3">Useful for local setup; headless setup can be used later.</td></tr></tbody></table></div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex items-center gap-3"><ShieldAlert className="text-amber-700" size={28} /><h3 className="text-xl font-bold">Safety and good practice</h3></div>
          <ul className="mt-4 space-y-2 text-slate-700"><li>• Handle the board by its edges and avoid conductive surfaces or loose metal objects.</li><li>• Never connect 5 V signals directly to 3.3 V GPIO inputs.</li><li>• Confirm pin numbering, voltage, polarity, and current before wiring.</li><li>• Do not power motors or other high-current loads from a GPIO pin.</li><li>• Shut down Raspberry Pi OS properly before removing power or storage.</li><li>• Keep backups of important code and configuration files.</li></ul>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <h3 className="text-2xl font-bold">Hands-on activity: plan your Raspberry Pi workstation</h3>
          <p className="mt-3 leading-7 text-slate-200">Identify your Raspberry Pi model and locate its processor, RAM, power input, display output, USB, network connection, microSD slot, GPIO header, camera connector, and display connector. Create a table listing the accessories you have, their ratings, and any missing items. Do not connect GPIO hardware yet.</p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-900">Chapter completion checklist</h3>
          <p className="mt-3 leading-7 text-blue-800">Review the video and lesson PDF when available, complete the board-identification activity, understand the SBC/microcontroller comparison, and score at least 80% in the quiz below before continuing.</p>
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

  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 1 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, questionIndex) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{questionIndex + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[questionIndex] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`raspberry-pi-chapter-1-${questionIndex}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p className="mt-1">You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function Feature({ icon: Icon, title, text }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5"><Icon className="text-blue-600" size={26} /><h4 className="mt-3 font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>;
}

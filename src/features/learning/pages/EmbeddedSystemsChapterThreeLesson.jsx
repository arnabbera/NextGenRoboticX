import { useMemo, useState } from "react";
import {
  Activity,
  Cable,
  CheckCircle2,
  CircleHelp,
  Cpu,
  Gauge,
  Lightbulb,
  Radio,
  RefreshCcw,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  ToggleLeft,
  Waves,
  XCircle,
  Zap,
} from "lucide-react";

const questions = [
  { question: "What does GPIO mean?", options: ["General-Purpose Input/Output", "Global Processor Internal Operation", "General Program Interrupt Option", "Grounded Peripheral Input Only"], answer: 0 },
  { question: "Why must logic-voltage compatibility be checked before connecting two devices?", options: ["To match enclosure colours", "An excessive voltage can damage an input and an insufficient HIGH may be misread", "To increase program size", "To remove the need for ground"], answer: 1 },
  { question: "What is the purpose of a pull-up resistor on a digital input?", options: ["Drive a motor", "Hold the un-driven input at a defined HIGH level", "Generate an analog waveform", "Increase CPU frequency"], answer: 1 },
  { question: "What is switch bounce?", options: ["A mechanical contact produces several rapid transitions when operated", "A processor resets on every instruction", "An LED changes colour", "A bus changes voltage standard"], answer: 0 },
  { question: "Which GPIO output configuration normally needs an external pull-up?", options: ["Push-pull", "Open-drain", "Analog input", "High-impedance input"], answer: 1 },
  { question: "Why should a motor not be connected directly to a GPIO pin?", options: ["Motors use no current", "The motor current and inductive voltage can exceed the pin ratings", "GPIO pins cannot switch", "It always slows the clock"], answer: 1 },
  { question: "What does PWM primarily vary?", options: ["The logic supply", "The proportion of time a digital signal is active", "The number of ground wires", "The Flash capacity"], answer: 1 },
  { question: "Which interface commonly uses separate clock, controller-out and controller-in data lines plus chip select?", options: ["UART", "SPI", "Single GPIO", "ADC"], answer: 1 },
  { question: "What is the safest first step before changing prototype wiring?", options: ["Increase the supply voltage", "Disconnect power", "Touch every pin", "Disable all resistors"], answer: 1 },
  { question: "What should firmware do with an unused or temporarily floating input?", options: ["Assume it is always LOW", "Configure a suitable pull resistor or provide an external defined level", "Connect it directly to a motor", "Continuously increase clock speed"], answer: 1 },
];

export default function EmbeddedSystemsChapterThreeLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 3</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Digital Electronics, GPIO and Peripheral Interfacing</h2>
          <p className="mt-4 leading-8 text-slate-600">Embedded controllers interact with the physical world through electrical signals. This chapter connects digital-logic fundamentals with practical GPIO configuration, reliable switch and LED circuits, protected load driving, and the serial interfaces used to connect sensors, displays and other controllers.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold text-slate-900">Learning objectives</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {["Interpret logic LOW, logic HIGH, thresholds and noise margin.", "Apply basic Boolean operations and truth tables.", "Configure GPIO as input, output, alternate-function or analog mode.", "Use pull resistors and debounce mechanical inputs.", "Drive LEDs, relays and motors without exceeding GPIO ratings.", "Choose between UART, SPI and I²C for common peripheral connections."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><ToggleLeft className="text-blue-700" /><h3 className="text-2xl font-bold text-blue-950">Digital signals are voltage ranges</h3></div>
          <p className="mt-4 leading-8 text-slate-700">A digital circuit interprets a range of voltages as LOW and another range as HIGH. Values between the guaranteed input thresholds may be undefined. The exact limits depend on the device, supply voltage and pin type—not simply on the labels “3.3 V” or “5 V.”</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <InfoCard title="Input thresholds" text="VIL(max) is the highest guaranteed LOW input; VIH(min) is the lowest guaranteed HIGH input." />
            <InfoCard title="Output levels" text="VOL(max) and VOH(min) specify guaranteed output voltages at stated source or sink currents." />
            <InfoCard title="Noise margin" text="The separation between guaranteed output and input levels provides tolerance against noise and voltage loss." />
          </div>
          <p className="mt-4 rounded-xl bg-white p-4 text-blue-950"><b>Interface rule:</b> confirm absolute-maximum ratings and logic thresholds in both datasheets. Use a level shifter or divider where appropriate; never assume a 3.3 V input is 5 V tolerant.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Boolean logic and truth tables</h3>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[650px] text-center"><thead className="bg-slate-900 text-white"><tr><th className="p-4">A</th><th className="p-4">B</th><th className="p-4">NOT A</th><th className="p-4">A AND B</th><th className="p-4">A OR B</th><th className="p-4">A XOR B</th></tr></thead><tbody className="divide-y divide-slate-200">
              <LogicRow a="0" b="0" notA="1" and="0" or="0" xor="0" />
              <LogicRow a="0" b="1" notA="1" and="0" or="1" xor="1" />
              <LogicRow a="1" b="0" notA="0" and="0" or="1" xor="1" />
              <LogicRow a="1" b="1" notA="0" and="1" or="1" xor="0" />
            </tbody></table>
          </div>
          <p className="mt-4 leading-8 text-slate-600">Firmware uses the same ideas through logical expressions and bitwise operations. Masks can set, clear, toggle or test selected register bits without disturbing the others.</p>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><Cpu className="text-sky-300" /><h3 className="text-2xl font-bold">GPIO operating modes</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DarkCard title="Digital input" text="Reads an external logic level. An internal or external pull may be needed." />
            <DarkCard title="Digital output" text="Actively drives a LOW or HIGH within the specified current limits." />
            <DarkCard title="Alternate function" text="Connects the pin to a hardware peripheral such as UART, SPI, I²C or timer output." />
            <DarkCard title="Analog mode" text="Connects compatible pins to ADC/DAC circuitry and commonly disables the digital input path." />
          </div>
          <p className="mt-5 leading-8 text-slate-200">A pin multiplexer selects one function from several possibilities. Configuration usually involves enabling the GPIO clock, selecting the mode, setting output type and speed, choosing pulls, and writing or reading the appropriate register.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Input circuits and defined states</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Concept icon={Zap} title="Pull-up" text="A resistor weakly holds the input HIGH. A switch can connect it to ground, producing active-LOW logic." />
            <Concept icon={Activity} title="Pull-down" text="A resistor weakly holds the input LOW. A switch can connect it to the positive logic supply." />
            <Concept icon={Waves} title="Floating input" text="An un-driven high-impedance input can respond unpredictably to noise and may increase power consumption." />
            <Concept icon={ShieldCheck} title="Input protection" text="Series resistance, filtering, clamping or isolation may be required for long wires and harsh environments." />
          </div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="text-2xl font-bold text-amber-950">Mechanical switch debouncing</h3>
          <p className="mt-3 leading-8 text-amber-900">Mechanical contacts can open and close several times for a few milliseconds during one press. Without debouncing, firmware may count one operation as many. A software method detects a transition, waits for or measures a stable interval, and accepts the new state only after it remains stable. Hardware RC filtering or a Schmitt-trigger input can also help.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {['Sample the input', 'Detect a possible change', 'Verify stability for a defined interval', 'Publish one clean state change'].map((item, index) => <div key={item} className="rounded-xl bg-white p-4"><span className="font-bold text-amber-700">{index + 1}.</span> {item}</div>)}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Output structures</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard title="Push-pull output" text="Actively drives both HIGH and LOW. It is suitable for many LEDs and digital signals when voltage and current limits are respected." />
            <InfoCard title="Open-drain output" text="Actively pulls LOW but relies on a pull-up for HIGH. It supports shared lines and voltage-domain interfacing when the device ratings allow it." />
          </div>
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-5 leading-7 text-red-950"><b>Current limits matter:</b> check per-pin and total-port source/sink ratings. The absolute-maximum value is not a normal operating target.</p>
        </section>

        <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Lightbulb className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Interfacing LEDs and high-current loads</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <LoadCard title="LED" text="Use a series resistor. Estimate R = (Vsupply − Vforward) / ILED, then choose a standard value that keeps both LED and pin current within ratings." />
            <LoadCard title="Relay, solenoid or motor" text="Use a transistor or MOSFET driver, a suitable gate/base network, an independent load supply where needed, and a flyback path for inductive energy." />
          </div>
          <p className="mt-4 leading-8 text-indigo-900">Establish a common reference ground for non-isolated interfaces. Add isolation when required by safety, voltage, noise or ground-potential constraints.</p>
        </section>

        <section>
          <div className="flex items-center gap-3"><SlidersHorizontal className="text-blue-700" /><h3 className="text-2xl font-bold">PWM: controlled average power</h3></div>
          <p className="mt-4 leading-8 text-slate-600">Pulse-width modulation switches a digital output at a defined frequency while changing its duty cycle. After averaging by the load or a filter, this controls LED brightness, motor drive or power conversion. PWM is not a true analog voltage at the pin.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Concept icon={Gauge} title="Duty cycle" text="Percentage of one period for which the signal is active." />
            <Concept icon={Waves} title="Frequency" text="Number of PWM periods per second; choose it for the load and application." />
            <Concept icon={RefreshCcw} title="Resolution" text="Number of distinct duty-cycle steps supported by the timer configuration." />
          </div>
        </section>

        <section className="rounded-2xl bg-cyan-50 p-6">
          <div className="flex items-center gap-3"><Cable className="text-cyan-700" /><h3 className="text-2xl font-bold text-cyan-950">Common digital peripheral interfaces</h3></div>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-cyan-100 bg-white">
            <table className="w-full min-w-[760px] text-left"><thead className="bg-cyan-950 text-white"><tr><th className="p-4">Interface</th><th className="p-4">Signals</th><th className="p-4">Strength</th><th className="p-4">Design checks</th></tr></thead><tbody className="divide-y divide-slate-200 text-slate-700">
              <InterfaceRow name="UART" signals="TX, RX, optional handshake" strength="Simple asynchronous point-to-point link" checks="Baud rate, frame format, voltage standard and crossed TX/RX" />
              <InterfaceRow name="SPI" signals="Clock, controller-out, controller-in, chip select" strength="Fast synchronous full-duplex transfers" checks="Clock polarity/phase, bit order, chip selects and signal integrity" />
              <InterfaceRow name="I²C" signals="Open-drain clock and data with pull-ups" strength="Addressed devices share two wires" checks="Address conflicts, pull-up value, capacitance, speed and clock stretching" />
            </tbody></table>
          </div>
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-3"><ShieldCheck className="text-red-700" /><h3 className="text-2xl font-bold text-red-950">Safe interfacing checklist</h3></div>
          <ul className="mt-4 grid gap-3 md:grid-cols-2 text-red-900">
            {["Disconnect power before changing wiring.", "Verify supply voltage, polarity and common reference.", "Check pin absolute maximums and recommended current.", "Never power a board through an unverified signal pin.", "Use a driver and flyback protection for inductive loads.", "Test with a current-limited supply before connecting the final load."].map((item) => <li key={item} className="rounded-xl bg-white p-4">✓ {item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-emerald-50 p-6">
          <h3 className="text-2xl font-bold text-emerald-950">Hands-on activity: button-controlled PWM LED</h3>
          <p className="mt-3 leading-8 text-emerald-900">Build a low-voltage circuit with one push-button input and one current-limited LED output on supported GPIO pins. Configure the input with a suitable pull, debounce it in software, and advance the LED through four PWM brightness levels on each valid press.</p>
          <ol className="mt-5 space-y-3 text-emerald-950">
            {["Confirm the board voltage, pinout and LED polarity before wiring.", "Calculate and install the LED series resistor.", "Verify raw input changes, then add non-blocking debounce logic.", "Configure a hardware timer for PWM and test 0%, 25%, 60% and 100% duty cycles.", "Record the measured HIGH/LOW voltages and explain any active-LOW behaviour.", "Disconnect power and document the final schematic, pin modes and test results."].map((item, index) => <li key={item} className="flex gap-3 rounded-xl bg-white p-4"><span className="font-bold text-emerald-700">{index + 1}.</span><span>{item}</span></li>)}
          </ol>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• Digital LOW and HIGH are guaranteed voltage ranges defined by the datasheet.</li>
            <li>• GPIO pins require deliberate mode, output type, speed and pull configuration.</li>
            <li>• Pull resistors prevent floating inputs; debouncing converts noisy contacts into clean events.</li>
            <li>• GPIO pins control high-current and inductive loads through suitable driver circuits.</li>
            <li>• UART, SPI and I²C solve different communication needs and require compatible electrical levels.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Chapter completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the button-and-PWM activity, explain input thresholds and pull resistors, compare push-pull and open-drain outputs, identify a safe driver for an inductive load, compare UART/SPI/I²C, and score at least 80% in the quiz.</p>
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
  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 3 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => {
    const selected = answers[index] === optionIndex;
    const correct = submitted && optionIndex === item.answer;
    const incorrect = submitted && selected && optionIndex !== item.answer;
    return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`embedded-ch3-${index}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>;
  })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function LogicRow({ a, b, notA, and, or, xor }) { return <tr><td className="p-4">{a}</td><td className="p-4">{b}</td><td className="p-4">{notA}</td><td className="p-4">{and}</td><td className="p-4">{or}</td><td className="p-4">{xor}</td></tr>; }
function InfoCard({ title, text }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function Concept({ icon: Icon, title, text }) { return <div className="rounded-2xl border border-slate-200 p-5"><Icon className="text-blue-600" size={27} /><h4 className="mt-3 text-lg font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function DarkCard({ title, text }) { return <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><h4 className="font-bold text-sky-200">{title}</h4><p className="mt-2 leading-7 text-slate-200">{text}</p></div>; }
function LoadCard({ title, text }) { return <div className="rounded-2xl bg-white p-5"><h4 className="text-lg font-bold text-indigo-950">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function InterfaceRow({ name, signals, strength, checks }) { return <tr><th className="p-4 font-bold text-slate-900">{name}</th><td className="p-4">{signals}</td><td className="p-4">{strength}</td><td className="p-4">{checks}</td></tr>; }

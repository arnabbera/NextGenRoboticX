import { useMemo, useState } from "react";
import {
  Activity,
  Bus,
  Cable,
  CheckCircle2,
  CircleHelp,
  Clock3,
  GitBranch,
  Network,
  Radio,
  RefreshCcw,
  RotateCcw,
  ShieldCheck,
  Split,
  Waves,
  XCircle,
  Zap,
} from "lucide-react";

const questions = [
  { question: "What must both ends of a basic UART link agree on?", options: ["Baud rate and frame format", "I²C address only", "CAN identifier only", "ADC reference"], answer: 0 },
  { question: "How should two UART devices normally be connected?", options: ["TX to TX and RX to RX", "TX to RX, RX to TX, with a compatible reference", "Clock to ground only", "Without checking voltage levels"], answer: 1 },
  { question: "Why does an I²C bus require pull-up resistors?", options: ["SDA and SCL are normally open-drain lines", "The lines are analog outputs", "Pull-ups assign CAN priority", "They generate UART stop bits"], answer: 0 },
  { question: "What does an I²C ACK indicate?", options: ["A receiver acknowledged the transferred byte", "The bus has no clock", "The ADC conversion is complete", "The SPI controller changed mode"], answer: 0 },
  { question: "Which SPI setting must match between communicating devices?", options: ["Clock polarity and phase", "CAN termination only", "UART parity only", "I²C pull-up current only"], answer: 0 },
  { question: "How are several SPI peripherals commonly selected?", options: ["By a separate chip-select signal for each device", "By UART start bits", "By CAN arbitration", "By analog voltage"], answer: 0 },
  { question: "What determines priority during CAN arbitration?", options: ["The dominant/recessive identifier bits; a lower numeric identifier typically wins", "Physical cable length only", "The largest payload", "The newest node"], answer: 0 },
  { question: "Why is CAN termination used?", options: ["To match the bus impedance and reduce reflections", "To increase software stack size", "To provide an I²C address", "To replace transceivers"], answer: 0 },
  { question: "What is a robust response to a receive-buffer overflow?", options: ["Ignore it silently", "Record the fault, preserve framing, and recover according to a defined policy", "Increase output voltage", "Disable every timeout"], answer: 1 },
  { question: "What is the best protocol-selection method?", options: ["Choose the newest protocol", "Compare topology, distance, speed, noise, reliability, pin count and cost requirements", "Always use UART", "Use the protocol with the most wires"], answer: 1 },
];

export default function EmbeddedSystemsChapterSevenLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 7</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">UART, I²C, SPI and CAN Communication</h2>
          <p className="mt-4 leading-8 text-slate-600">Embedded products rarely work alone. Serial interfaces connect sensors, memory, displays, controllers and distributed nodes while reducing wiring. This chapter explains the electrical assumptions, frames, timing, error behaviour and debugging methods behind four widely used communication technologies.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold text-slate-900">Learning objectives</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {["Distinguish asynchronous and synchronous serial communication.", "Configure and diagnose UART baud rate, framing and buffering.", "Explain I²C addressing, start/stop, ACK/NACK and pull-ups.", "Configure SPI clock mode, chip select and full-duplex transfers.", "Explain CAN differential signalling, identifiers, arbitration and fault confinement.", "Select and test an interface using system-level requirements."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><Network className="text-blue-700" /><h3 className="text-2xl font-bold text-blue-950">Serial communication foundations</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard title="Bit rate" text="Number of signalling bits transferred per second; payload throughput is lower because frames include overhead." />
            <InfoCard title="Framing" text="Rules that identify boundaries, addresses, payload, status and error-checking fields." />
            <InfoCard title="Duplex" text="Simplex is one-way, half-duplex alternates direction, and full-duplex supports simultaneous transfer." />
            <InfoCard title="Topology" text="Point-to-point, shared bus, controller-peripheral or multi-controller structure affects wiring and arbitration." />
          </div>
          <p className="mt-4 leading-7 text-blue-950"><b>Electrical compatibility comes first:</b> a protocol name does not guarantee matching voltage levels or physical signalling. TTL/CMOS UART, RS-232, RS-485 and CAN require different electrical interfaces.</p>
        </section>

        <section>
          <div className="flex items-center gap-3"><Radio className="text-indigo-700" /><h3 className="text-2xl font-bold">UART: asynchronous point-to-point communication</h3></div>
          <p className="mt-4 leading-8 text-slate-600">A UART sends data without a shared clock. The receiver estimates bit positions using the agreed baud rate. Each frame normally contains a start bit, data bits, optional parity and one or more stop bits.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Concept icon={Waves} title="Frame format" text="For example, 8-N-1 means eight data bits, no parity and one stop bit." />
            <Concept icon={Clock3} title="Baud tolerance" text="Clock mismatch and accumulated sampling error must remain within device limits." />
            <Concept icon={RefreshCcw} title="Buffers" text="Interrupts or DMA move received bytes into a ring buffer for later parsing." />
          </div>
          <div className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 leading-8 text-indigo-950"><b>Wiring:</b> connect transmitter to receiver and receiver to transmitter, share a compatible ground for a non-isolated link, and verify that the voltage standard matches both devices.</div>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <h3 className="text-2xl font-bold">Reliable UART firmware</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DarkCard title="Receive continuously" text="Move bytes out of the hardware register before it overruns." />
            <DarkCard title="Find boundaries" text="Use length, delimiter, timeout or an explicit framed protocol." />
            <DarkCard title="Validate" text="Check length, type, range and checksum/CRC before accepting a command." />
            <DarkCard title="Recover" text="Handle framing, parity, noise and overflow errors without losing parser state indefinitely." />
          </div>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-black/30 p-5 text-sm leading-7 text-sky-200"><code>{`[SYNC] [TYPE] [LENGTH] [PAYLOAD ...] [CRC]

// Receiver policy:
// find SYNC → validate LENGTH → collect frame
// → verify CRC → dispatch known TYPE`}</code></pre>
        </section>

        <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
          <div className="flex items-center gap-3"><Split className="text-cyan-700" /><h3 className="text-2xl font-bold text-cyan-950">I²C: addressed devices on two shared wires</h3></div>
          <p className="mt-4 leading-8 text-cyan-900">I²C uses serial data (SDA) and serial clock (SCL). Devices normally pull these open-drain lines LOW and external resistors return them HIGH. This wired behaviour supports acknowledgements and arbitration.</p>
          <ol className="mt-5 grid gap-3 md:grid-cols-2">
            {["START condition claims the bus.", "Controller sends address plus direction bit.", "Addressed target responds with ACK when ready.", "Bytes transfer most-significant bit first, each followed by ACK/NACK.", "A repeated START can change direction without releasing the bus.", "STOP condition releases the transaction."].map((item, index) => <li key={item} className="rounded-xl bg-white p-4"><b className="text-cyan-700">{index + 1}.</b> {item}</li>)}
          </ol>
          <p className="mt-4 leading-7 text-cyan-950">Check 7-bit versus 10-bit addressing and whether documentation presents the 7-bit address or an already shifted read/write byte. Address conflicts require configuration, multiplexing or another bus.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold">I²C electrical and timing considerations</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Concept icon={Zap} title="Pull-up selection" text="Resistance must provide adequate rise time without exceeding allowed LOW-state sink current." />
            <Concept icon={Activity} title="Bus capacitance" text="Device pins, traces, connectors and cables slow the rising edge." />
            <Concept icon={Clock3} title="Clock stretching" text="A supported target may hold SCL LOW while it completes work; controller support must be confirmed." />
            <Concept icon={GitBranch} title="Arbitration" text="Multi-controller-capable devices monitor the bus while transmitting and stop if they lose arbitration." />
            <Concept icon={ShieldCheck} title="Bus recovery" text="Define timeouts and a documented recovery sequence for a target holding SDA or SCL LOW." />
            <Concept icon={Cable} title="Physical length" text="I²C is normally for short board-level links; capacitance and noise limit distance and speed." />
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><RefreshCcw className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">SPI: fast synchronous transfers</h3></div>
          <p className="mt-4 leading-8 text-indigo-900">SPI commonly uses a controller-generated clock, controller-out/peripheral-in data, peripheral-out/controller-in data and one active chip-select per peripheral. Data shifts in both directions on every clock, even when one side only sends dummy bytes.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard title="Clock polarity and phase" text="CPOL defines idle clock level; CPHA selects the sampling edge relationship. Both devices must use a compatible mode." />
            <InfoCard title="Transfer format" text="Agree on word length, bit order, chip-select timing, maximum frequency and whether bytes form a command/address/data sequence." />
          </div>
          <p className="mt-4 rounded-xl bg-white p-4 text-indigo-950">SPI provides no universal acknowledgement, address or error check. The peripheral protocol must define validation, status and recovery where required.</p>
        </section>

        <section>
          <div className="flex items-center gap-3"><Bus className="text-red-700" /><h3 className="text-2xl font-bold">CAN: robust multi-node communication</h3></div>
          <p className="mt-4 leading-8 text-slate-600">CAN is a differential, message-based bus designed for reliable communication in electrically noisy systems. Nodes broadcast frames identified by message identifiers rather than destination addresses. Every interested node filters identifiers it needs.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Concept icon={GitBranch} title="Arbitration" text="Nodes transmit while monitoring the bus. Dominant bits overwrite recessive bits; the lower numeric identifier typically wins without corrupting the frame." />
            <Concept icon={ShieldCheck} title="Error detection" text="Bit monitoring, stuffing checks, frame checks, acknowledgement and CRC detect several fault classes." />
            <Concept icon={Activity} title="Fault confinement" text="Transmit and receive error counters can move a faulty node through error-active, error-passive and bus-off states." />
            <Concept icon={Cable} title="Physical layer" text="A CAN controller needs a compatible transceiver connected to the differential CAN_H/CAN_L pair." />
            <Concept icon={Waves} title="Termination" text="A linear bus is typically terminated at both physical ends with values specified for the cable and transceivers." />
            <Concept icon={Gauge} title="Bit timing" text="Nominal rate, sample point, oscillator tolerance and propagation delay must fit the network." />
          </div>
        </section>

        <section className="rounded-2xl bg-amber-50 p-6">
          <h3 className="text-2xl font-bold text-amber-950">Protocol comparison</h3>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-amber-100 bg-white">
            <table className="w-full min-w-[850px] text-left"><thead className="bg-amber-950 text-white"><tr><th className="p-4">Interface</th><th className="p-4">Clocking</th><th className="p-4">Typical topology</th><th className="p-4">Built-in robustness</th><th className="p-4">Common use</th></tr></thead><tbody className="divide-y divide-slate-200 text-slate-700">
              <ProtocolRow name="UART" clock="Asynchronous" topology="Point-to-point" robustness="Optional parity; application framing needed" use="Console, modules and simple device links" />
              <ProtocolRow name="I²C" clock="Shared synchronous clock" topology="Addressed short shared bus" robustness="ACK/NACK and arbitration; no payload CRC in base protocol" use="Board-level sensors and configuration devices" />
              <ProtocolRow name="SPI" clock="Controller clock" topology="Controller with selected peripherals" robustness="Depends on peripheral protocol" use="Fast converters, displays, memory and radios" />
              <ProtocolRow name="CAN" clock="Synchronised from bus edges" topology="Differential multi-node bus" robustness="CRC, acknowledgement, error signalling and fault confinement" use="Automotive, industrial and distributed control" />
            </tbody></table>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Firmware architecture for communication</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard title="Driver" text="Controls registers, interrupts/DMA and electrical peripheral state." />
            <InfoCard title="Transport" text="Buffers bytes or frames, applies timeouts and reports link errors." />
            <InfoCard title="Protocol" text="Encodes messages, validates length/CRC and manages transaction state." />
            <InfoCard title="Application" text="Uses meaningful commands and data without manipulating hardware registers." />
          </div>
          <p className="mt-4 leading-8 text-slate-600">Use bounded queues, define overflow policy, verify every received length before indexing, place time limits on incomplete transactions, and never trust external data until it passes structural and range validation.</p>
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-3"><ShieldCheck className="text-red-700" /><h3 className="text-2xl font-bold text-red-950">Wiring and debugging checklist</h3></div>
          <ul className="mt-4 grid gap-3 md:grid-cols-2 text-red-900">
            {["Confirm pin multiplexing, voltage levels, grounds and transceiver requirements.", "Check baud/bit rate, frame format, address, SPI mode and bit order.", "Place I²C pull-ups and CAN termination according to measured bus conditions.", "Inspect signals with a logic analyser or oscilloscope using a safe reference connection.", "Test missing devices, NACK, timeout, CRC failure, overflow and disconnect recovery.", "Log error counters without allowing diagnostic work to block time-critical communication."].map((item) => <li key={item} className="rounded-xl bg-white p-4">✓ {item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-emerald-50 p-6">
          <h3 className="text-2xl font-bold text-emerald-950">Hands-on activity: multi-interface sensor gateway</h3>
          <p className="mt-3 leading-8 text-emerald-900">Read a safe low-voltage sensor over I²C or SPI and transmit the validated measurement through UART. If a CAN-capable board and transceiver are available, optionally publish the same data with a documented identifier. The application must remain responsive when a sensor is absent.</p>
          <ol className="mt-5 space-y-3 text-emerald-950">
            {["Document voltage, wiring, address/mode, data format and maximum bus rate.", "Scan or read identification safely without treating every NACK as a system crash.", "Build a bounded transaction state machine with timeouts and explicit status codes.", "Frame the UART output with sync, type, length, payload and checksum/CRC.", "Capture and label bus traces for one successful and one failed transaction.", "Demonstrate recovery after disconnecting and reconnecting the peripheral."].map((item, index) => <li key={item} className="flex gap-3 rounded-xl bg-white p-4"><span className="font-bold text-emerald-700">{index + 1}.</span><span>{item}</span></li>)}
          </ol>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• UART is asynchronous and requires matching baud rate, framing and electrical levels.</li>
            <li>• I²C shares open-drain clock/data lines and uses addressing plus ACK/NACK.</li>
            <li>• SPI provides fast synchronous full-duplex transfers with device-specific framing.</li>
            <li>• CAN provides nondestructive arbitration, strong error handling and differential signalling.</li>
            <li>• Robust communication requires bounded buffers, validation, timeouts and tested recovery.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Chapter completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the sensor-gateway activity, explain UART framing, interpret an I²C transaction, select an SPI mode, explain CAN arbitration and termination, demonstrate timeout recovery, and score at least 80% in the quiz.</p>
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
  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 7 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => {
    const selected = answers[index] === optionIndex;
    const correct = submitted && optionIndex === item.answer;
    const incorrect = submitted && selected && optionIndex !== item.answer;
    return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`embedded-ch7-${index}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>;
  })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function InfoCard({ title, text }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function Concept({ icon: Icon, title, text }) { return <div className="rounded-2xl border border-slate-200 p-5"><Icon className="text-blue-600" size={27} /><h4 className="mt-3 text-lg font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function DarkCard({ title, text }) { return <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><h4 className="font-bold text-sky-200">{title}</h4><p className="mt-2 leading-7 text-slate-200">{text}</p></div>; }
function ProtocolRow({ name, clock, topology, robustness, use }) { return <tr><th className="p-4 font-bold text-slate-900">{name}</th><td className="p-4">{clock}</td><td className="p-4">{topology}</td><td className="p-4">{robustness}</td><td className="p-4">{use}</td></tr>; }

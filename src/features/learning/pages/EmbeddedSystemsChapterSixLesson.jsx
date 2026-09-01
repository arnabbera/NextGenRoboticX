import { useMemo, useState } from "react";
import {
  Activity,
  CheckCircle2,
  CircleHelp,
  Cpu,
  Gauge,
  GitCompareArrows,
  RefreshCcw,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Thermometer,
  Waves,
  XCircle,
  Zap,
} from "lucide-react";

const questions = [
  { question: "How many ideal output codes does a 10-bit ADC provide?", options: ["10", "100", "1,024", "10,000"], answer: 2 },
  { question: "For an ideal N-bit ADC, the approximate LSB size is:", options: ["Vref × 2^N", "Vref / 2^N", "2^N / Vref", "Vref / N"], answer: 1 },
  { question: "What can happen if a sensor voltage exceeds an ADC pin's allowed range?", options: ["The reading becomes more accurate", "The input can be damaged or protection current can flow", "The ADC gains resolution", "The timer stops permanently"], answer: 1 },
  { question: "Why is an anti-alias filter used before sampling?", options: ["To attenuate frequency content above the usable sampling band", "To increase motor current", "To store calibration values", "To generate PWM"], answer: 0 },
  { question: "What does calibration correct?", options: ["Known systematic measurement errors such as offset and gain", "Every random fault forever", "The program counter", "The enclosure size"], answer: 0 },
  { question: "What is a DAC used for?", options: ["Convert a digital code into an analog output", "Count external pulses", "Store source code", "Debounce a switch only"], answer: 0 },
  { question: "Why does a motor require a driver rather than direct GPIO connection?", options: ["It requires current and protection beyond the GPIO capability", "GPIO pins are analog only", "Motors require no voltage", "The driver lowers code size"], answer: 0 },
  { question: "What is the purpose of a flyback path across an inductive load?", options: ["Provide a safe path for stored inductive energy when switching off", "Increase ADC resolution", "Eliminate grounding", "Measure temperature"], answer: 0 },
  { question: "What distinguishes closed-loop control?", options: ["It uses measured feedback to adjust the actuator command", "It never uses a sensor", "It always drives 100% duty cycle", "It requires no setpoint"], answer: 0 },
  { question: "What should happen if a safety-critical sensor reading is implausible?", options: ["Use it without checking", "Detect the fault and move to a defined safe or degraded response", "Increase the reference voltage", "Disable all diagnostics"], answer: 1 },
];

export default function EmbeddedSystemsChapterSixLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 6</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">ADC, DAC, Sensors and Actuator Control</h2>
          <p className="mt-4 leading-8 text-slate-600">Sensors translate physical conditions into electrical signals; data converters allow firmware to measure or generate analog quantities; and actuator drivers turn low-power commands into physical action. This chapter develops the complete signal path from measurement to controlled output.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold text-slate-900">Learning objectives</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {["Explain ADC resolution, reference voltage, sampling and conversion error.", "Convert ADC codes into voltage and engineering units.", "Apply filtering, calibration and plausibility checks to sensor data.", "Explain DAC and filtered-PWM analog output methods.", "Select safe drivers for LEDs, relays, solenoids and motors.", "Distinguish open-loop from closed-loop actuator control."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><Waves className="text-blue-700" /><h3 className="text-2xl font-bold text-blue-950">Analog signals and the measurement chain</h3></div>
          <p className="mt-4 leading-8 text-blue-950">A real sensor signal passes through several stages before software uses it. Every stage contributes range, bandwidth, noise, error and delay.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {[["1", "Physical quantity", "Temperature, light, force, pressure or position."], ["2", "Sensor", "Converts the quantity into voltage, current, resistance or digital data."], ["3", "Conditioning", "Amplifies, biases, filters, protects or linearises the signal."], ["4", "ADC", "Samples and quantises the conditioned voltage."], ["5", "Firmware", "Scales, validates, filters and interprets the measurement."]].map(([n, title, text]) => <Step key={n} number={n} title={title} text={text} />)}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><Cpu className="text-indigo-700" /><h3 className="text-2xl font-bold">ADC fundamentals</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Concept icon={SlidersHorizontal} title="Resolution" text="An N-bit converter has 2^N ideal codes. More bits provide finer code steps, not guaranteed accuracy." />
            <Concept icon={Gauge} title="Reference" text="Defines the conversion scale. Reference noise or drift directly affects measurements." />
            <Concept icon={Activity} title="Sample time" text="The input network must charge the internal sampling capacitor sufficiently before conversion." />
            <Concept icon={RefreshCcw} title="Conversion rate" text="Determines how quickly new results become available, subject to settling and bandwidth needs." />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Formula title="Approximate LSB size" expression="LSB ≈ Vref / 2^N" explanation="For a 12-bit ADC with 3.3 V reference, one ideal code step is about 0.806 mV." />
            <Formula title="Approximate input voltage" expression="Vin ≈ code × Vref / (2^N − 1)" explanation="This common endpoint formula is an approximation; use the device transfer definition when precision matters." />
          </div>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <h3 className="text-2xl font-bold">Resolution is not accuracy</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DarkCard title="Offset error" text="A nearly constant code shift across the measurement range." />
            <DarkCard title="Gain error" text="The measured slope differs from the ideal after offset is removed." />
            <DarkCard title="Linearity error" text="The conversion curve deviates from the best ideal line." />
            <DarkCard title="Quantisation" text="Continuous input values map to discrete codes, creating unavoidable uncertainty." />
            <DarkCard title="Noise and reference drift" text="Supply, layout, source and reference behaviour cause code variation." />
            <DarkCard title="Sensor tolerance" text="The complete system error includes the sensor and conditioning circuit, not only the ADC." />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Sampling and aliasing</h3>
          <p className="mt-4 leading-8 text-slate-600">Sampling must be fast enough for the signal bandwidth. Frequency content above half the sampling rate can appear as false lower-frequency content after sampling. In practice, choose a sampling rate with engineering margin and use an analog anti-alias filter before the ADC.</p>
          <div className="mt-5 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 leading-8 text-cyan-950"><b>Nyquist condition:</b> an ideally band-limited signal must be sampled above twice its highest frequency. Real filters do not stop instantly, so the sampling rate and filter transition band must be designed together.</div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="text-2xl font-bold text-amber-950">Signal conditioning and ADC protection</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard title="Scaling" text="A divider or amplifier maps the sensor span into the ADC input range." />
            <InfoCard title="Biasing" text="Adds an offset when a bipolar signal must fit a unipolar ADC range." />
            <InfoCard title="Filtering" text="Reduces unwanted noise and limits bandwidth before sampling." />
            <InfoCard title="Buffering" text="An op-amp buffer can provide the source impedance and settling required by the ADC." />
            <InfoCard title="Protection" text="Series resistance, clamping and isolation must keep pin voltage and current within ratings." />
            <InfoCard title="Grounding/layout" text="Short return paths, decoupling and separation from switching currents reduce coupled noise." />
          </div>
          <p className="mt-4 leading-7 text-amber-950">Never apply a negative voltage or a voltage above the permitted pin range unless the input network and device explicitly support it.</p>
        </section>

        <section>
          <div className="flex items-center gap-3"><Thermometer className="text-red-700" /><h3 className="text-2xl font-bold">From ADC code to engineering units</h3></div>
          <ol className="mt-5 space-y-3 text-slate-700">
            {["Convert the raw code to pin voltage using the measured or specified reference.", "Reverse any divider, gain or bias introduced by signal conditioning.", "Apply the sensor transfer function or lookup table.", "Correct measured offset and gain using calibration coefficients.", "Filter only as much as the response-time requirement permits.", "Check range, rate of change and consistency before using the value for control."].map((item, index) => <li key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4"><span className="font-bold text-red-700">{index + 1}.</span><span>{item}</span></li>)}
          </ol>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-emerald-200"><code>{`voltage_v = ((float)adc_code * vref_v) / 4095.0f;
temperature_c = (voltage_v - offset_v) / sensitivity_v_per_c;

if (!isfinite(temperature_c) ||
    temperature_c < SENSOR_MIN_C ||
    temperature_c > SENSOR_MAX_C) {
  Sensor_ReportFault();
}`}</code></pre>
        </section>

        <section className="rounded-2xl bg-indigo-50 p-6">
          <h3 className="text-2xl font-bold text-indigo-950">Digital filtering and calibration</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <FilterCard title="Moving average" text="Averages a fixed window. It reduces random noise but adds memory use and delay." />
            <FilterCard title="Exponential filter" text="Combines the newest sample with the previous result. It is compact and adjustable." />
            <FilterCard title="Median filter" text="Rejects isolated spikes effectively, but requires sorting or selection work." />
            <FilterCard title="Two-point calibration" text="Uses known low and high references to estimate offset and gain corrections." />
          </div>
          <p className="mt-4 leading-8 text-indigo-900">Filtering cannot recover information lost through clipping, aliasing or poor grounding. Calibration data should include version, validity checks and defined behaviour if the stored record is missing or corrupt.</p>
        </section>

        <section>
          <div className="flex items-center gap-3"><Waves className="text-blue-700" /><h3 className="text-2xl font-bold">DAC and analog-output methods</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Concept icon={SlidersHorizontal} title="Integrated DAC" text="Converts a digital code into a stepped analog voltage or current within its drive limits." />
            <Concept icon={Activity} title="Filtered PWM" text="A low-pass filter averages PWM into a slower analog level; ripple and response time trade off." />
            <Concept icon={GitCompareArrows} title="External DAC" text="An SPI or I²C converter can add channels, resolution, reference quality or output range." />
          </div>
          <Formula title="Ideal DAC output" expression="Vout ≈ code × Vref / (2^N − 1)" explanation="The real output also depends on offset, gain, linearity, settling time and load impedance." />
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-3"><Zap className="text-red-700" /><h3 className="text-2xl font-bold text-red-950">Actuator drivers</h3></div>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-red-100 bg-white">
            <table className="w-full min-w-[760px] text-left"><thead className="bg-red-950 text-white"><tr><th className="p-4">Actuator</th><th className="p-4">Typical driver</th><th className="p-4">Essential checks</th></tr></thead><tbody className="divide-y divide-slate-200 text-slate-700">
              <ActuatorRow name="LED / lamp" driver="Current resistor, constant-current driver or MOSFET" checks="Current, heat, polarity and PWM frequency" />
              <ActuatorRow name="Relay / solenoid" driver="Transistor or MOSFET with flyback path" checks="Coil current, inductive energy, isolation and contact rating" />
              <ActuatorRow name="DC motor" driver="Low-side switch or H-bridge" checks="Start/stall current, direction, braking, flyback and supply noise" />
              <ActuatorRow name="Stepper motor" driver="Current-regulating stepper driver" checks="Phase current, microstepping, acceleration and thermal limits" />
              <ActuatorRow name="Servo" driver="Timed pulse command plus separate power path" checks="Pulse specification, peak current and common reference" />
            </tbody></table>
          </div>
          <p className="mt-4 leading-7 text-red-950">GPIO or DAC pins are command sources, not power outputs. Select a driver for worst-case current and voltage, provide decoupling and protection, and ensure reset or firmware failure leaves the actuator in a defined state.</p>
        </section>

        <section>
          <div className="flex items-center gap-3"><RefreshCcw className="text-emerald-700" /><h3 className="text-2xl font-bold">Open-loop and closed-loop control</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard title="Open-loop" text="The command is applied without measuring the result. It is simple, but cannot automatically correct load, supply or environmental variation." />
            <InfoCard title="Closed-loop" text="A sensor measures the result; firmware compares it with a setpoint and adjusts the actuator command to reduce error." />
          </div>
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 leading-8 text-emerald-950"><b>Control loop:</b> setpoint → error calculation → controller → actuator/plant → sensor feedback. Sampling rate, delay, saturation, noise and stability must be considered together.</div>
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-3"><ShieldCheck className="text-red-700" /><h3 className="text-2xl font-bold text-red-950">Fail-safe sensing and actuation</h3></div>
          <ul className="mt-4 grid gap-3 md:grid-cols-2 text-red-900">
            {["Detect open, shorted, saturated and implausible sensor readings.", "Apply timeouts to sensors and communication-dependent measurements.", "Limit actuator command, slew rate, temperature and operating duration.", "Use hardware interlocks for hazards that software alone must not control.", "Force safe outputs during reset, startup, watchdog recovery and detected faults.", "Log the fault cause and require controlled recovery where appropriate."].map((item) => <li key={item} className="rounded-xl bg-white p-4">✓ {item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-violet-50 p-6">
          <h3 className="text-2xl font-bold text-violet-950">Hands-on activity: temperature-controlled fan simulator</h3>
          <p className="mt-3 leading-8 text-violet-900">Read a low-voltage analog temperature sensor or potentiometer with the ADC. Convert the raw code into engineering units, apply a small filter and drive an LED or properly connected fan driver with PWM. Add a safe response for disconnected or out-of-range input.</p>
          <ol className="mt-5 space-y-3 text-violet-950">
            {["Document ADC range, reference, resolution and expected sensor span.", "Calculate voltage and sensor scaling before writing the conversion function.", "Collect raw samples at known inputs and estimate offset and gain correction.", "Map the valid temperature range to bounded PWM duty cycle with hysteresis.", "Test minimum, midpoint, maximum, open-input and over-range cases.", "Record response time, filtered noise, measurement error and actuator safe state."].map((item, index) => <li key={item} className="flex gap-3 rounded-xl bg-white p-4"><span className="font-bold text-violet-700">{index + 1}.</span><span>{item}</span></li>)}
          </ol>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• ADC resolution defines code size; system accuracy depends on the full signal chain.</li>
            <li>• Sampling rate and analog filtering must prevent aliasing for the required signal bandwidth.</li>
            <li>• Scaling, calibration, filtering and plausibility checks produce usable sensor measurements.</li>
            <li>• DACs and filtered PWM create analog-like outputs within their bandwidth and drive limits.</li>
            <li>• Actuators require rated drivers, protection and defined safe behaviour.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Chapter completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the temperature-control activity, calculate ADC code and voltage, explain aliasing and calibration, compare DAC with filtered PWM, select a protected actuator driver, explain closed-loop feedback, and score at least 80% in the quiz.</p>
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
  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 6 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => {
    const selected = answers[index] === optionIndex;
    const correct = submitted && optionIndex === item.answer;
    const incorrect = submitted && selected && optionIndex !== item.answer;
    return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`embedded-ch6-${index}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>;
  })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function Step({ number, title, text }) { return <div className="rounded-2xl bg-white p-4"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white">{number}</span><h4 className="mt-3 font-bold text-slate-900">{title}</h4><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>; }
function Concept({ icon: Icon, title, text }) { return <div className="rounded-2xl border border-slate-200 p-5"><Icon className="text-blue-600" size={27} /><h4 className="mt-3 text-lg font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function Formula({ title, expression, explanation }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><code className="mt-3 block rounded-lg bg-slate-950 p-3 text-cyan-300">{expression}</code><p className="mt-3 leading-7 text-slate-600">{explanation}</p></div>; }
function DarkCard({ title, text }) { return <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><h4 className="font-bold text-sky-200">{title}</h4><p className="mt-2 leading-7 text-slate-200">{text}</p></div>; }
function InfoCard({ title, text }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function FilterCard({ title, text }) { return <div className="rounded-2xl bg-white p-5"><h4 className="font-bold text-indigo-950">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function ActuatorRow({ name, driver, checks }) { return <tr><th className="p-4 font-bold text-slate-900">{name}</th><td className="p-4">{driver}</td><td className="p-4">{checks}</td></tr>; }

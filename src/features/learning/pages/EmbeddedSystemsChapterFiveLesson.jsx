import { useMemo, useState } from "react";
import {
  Activity,
  BellRing,
  Binary,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Gauge,
  GitCompareArrows,
  RefreshCcw,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Timer,
  Waves,
  XCircle,
  Zap,
} from "lucide-react";

const questions = [
  { question: "What is the purpose of a timer prescaler?", options: ["Divide the timer input clock before counting", "Increase GPIO voltage", "Store the firmware", "Convert analog data"], answer: 0 },
  { question: "A 1 MHz timer clock increments once every:", options: ["1 second", "1 millisecond", "1 microsecond", "1 nanosecond"], answer: 2 },
  { question: "What happens when an up-counter exceeds its maximum value?", options: ["It normally wraps and sets an overflow/update event", "It permanently stops the CPU", "It becomes an ADC", "It erases Flash"], answer: 0 },
  { question: "Which timer feature records the counter value when an external edge arrives?", options: ["Input capture", "Output compare", "Brown-out reset", "Watchdog refresh"], answer: 0 },
  { question: "What does output compare do?", options: ["Compares the counter with a programmed value to create an event or output action", "Compares two supply voltages", "Measures resistance", "Changes program memory"], answer: 0 },
  { question: "A PWM signal is HIGH for 2 ms in a 10 ms period. What is its duty cycle?", options: ["2%", "20%", "50%", "80%"], answer: 1 },
  { question: "Why should an interrupt service routine be kept short?", options: ["To limit latency and timing interference", "To increase blocking delays", "To avoid clearing interrupt flags", "To eliminate timers"], answer: 0 },
  { question: "What is interrupt latency?", options: ["Time from an interrupt event until its handler begins", "The PWM duty cycle", "Timer storage capacity", "ADC resolution"], answer: 0 },
  { question: "What is a common safe use of a timer ISR?", options: ["Update a tick or flag and defer lengthy processing", "Perform indefinite loops", "Rewrite all Flash memory", "Disable every protection mechanism"], answer: 0 },
  { question: "Before using PWM to control a motor, what is required?", options: ["A suitable motor driver and inductive-load protection", "A direct motor connection to the GPIO", "Removal of the common ground", "An unlimited pin current setting"], answer: 0 },
];

export default function EmbeddedSystemsChapterFiveLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 5</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Timers, Counters, Interrupts and PWM</h2>
          <p className="mt-4 leading-8 text-slate-600">Timers give firmware an accurate relationship with time. They schedule periodic work, measure external events, generate waveforms and trigger interrupts without continuous CPU supervision. This chapter develops the calculations and design practices needed to use these peripherals predictably.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold text-slate-900">Learning objectives</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {["Explain timer clocks, prescalers, counter width and overflow.", "Calculate tick time, period, frequency and compare values.", "Use input capture and output compare for measurement and scheduling.", "Design short, deterministic interrupt handlers.", "Calculate PWM frequency, period, duty cycle and resolution.", "Apply timers safely to LED, servo and motor-control applications."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><Timer className="text-blue-700" /><h3 className="text-2xl font-bold text-blue-950">Anatomy of a hardware timer</h3></div>
          <p className="mt-4 leading-8 text-blue-950">A timer receives a clock, optionally divides it with a prescaler, updates a counter, and compares or captures values through channels. Events can change an output, request DMA, or raise an interrupt.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard title="Clock source" text="Internal peripheral clock or an external signal selected by the timer configuration." />
            <InfoCard title="Prescaler" text="Divides the incoming clock to create a slower counter tick." />
            <InfoCard title="Counter and period" text="Tracks ticks and reloads or wraps at the configured limit." />
            <InfoCard title="Channels" text="Provide capture, compare or PWM functions connected to supported pins." />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><Binary className="text-indigo-700" /><h3 className="text-2xl font-bold">Core timing calculations</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Formula title="Counter clock" expression="f_counter = f_timer / (prescaler + 1)" explanation="Confirm whether the device register stores the divider itself or divider minus one." />
            <Formula title="Tick time" expression="T_tick = 1 / f_counter" explanation="One tick is the smallest time step at the selected clock and prescaler." />
            <Formula title="Update period" expression="T_update = (period + 1) × T_tick" explanation="For a zero-based up-counter that reloads after reaching the period value." />
            <Formula title="Update frequency" expression="f_update = f_counter / (period + 1)" explanation="The reciprocal of the update period." />
          </div>
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 leading-8 text-slate-700"><b>Example:</b> A 48 MHz timer with prescaler 47 produces a 1 MHz counter clock, so each tick is 1 μs. A period register of 999 produces an update every 1,000 ticks, or 1 ms (1 kHz).</div>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><RefreshCcw className="text-sky-300" /><h3 className="text-2xl font-bold">Counting modes and overflow</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <DarkCard title="Up-counting" text="Counts from zero to the period value, then reloads or wraps." />
            <DarkCard title="Down-counting" text="Counts from a reload value toward zero before generating an event." />
            <DarkCard title="Centre-aligned" text="Counts upward and downward, producing symmetric PWM useful in some motor-control applications." />
          </div>
          <p className="mt-5 leading-8 text-slate-200">Counter width limits the range. A 16-bit counter has 65,536 distinct values; a 32-bit counter has a much longer natural wrap period. Software that compares free-running timestamps should use wraparound-safe unsigned subtraction.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Timer operating modes</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Concept icon={Clock3} title="Periodic update" text="Generates a regular tick for scheduling, sampling or timeout supervision." />
            <Concept icon={Activity} title="External counter" text="Counts edges from an encoder, flow sensor or event source." />
            <Concept icon={GitCompareArrows} title="Input capture" text="Copies the counter into a capture register when a selected input edge occurs." />
            <Concept icon={BellRing} title="Output compare" text="Creates an event or output change when the counter matches a programmed value." />
            <Concept icon={Waves} title="One-pulse" text="Generates one precisely timed pulse in response to a trigger." />
            <Concept icon={SlidersHorizontal} title="PWM" text="Produces a repetitive waveform whose active time is controlled by a compare value." />
          </div>
        </section>

        <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
          <div className="flex items-center gap-3"><GitCompareArrows className="text-cyan-700" /><h3 className="text-2xl font-bold text-cyan-950">Measuring frequency and pulse width</h3></div>
          <p className="mt-4 leading-8 text-cyan-900">Input capture timestamps signal edges in hardware. Subtract two successive rising-edge captures to obtain a period. Capture a rising and falling edge to measure active pulse width. Extend the calculation across counter overflow and validate that the measured interval lies within the expected range.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Formula title="Measured period" expression="T_signal = Δcapture × T_tick" explanation="Use modular subtraction when the counter may wrap." />
            <Formula title="Measured frequency" expression="f_signal = 1 / T_signal" explanation="Average multiple periods when the application can tolerate the additional delay." />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><BellRing className="text-red-700" /><h3 className="text-2xl font-bold">Interrupts and deterministic response</h3></div>
          <p className="mt-4 leading-8 text-slate-600">An interrupt allows a hardware event to suspend normal execution and invoke a handler. The delay from the event to handler execution is interrupt latency; it is affected by disabled-interrupt regions, higher-priority handlers, instruction completion and architecture-specific entry overhead.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard title="Inside the ISR" text="Identify and clear the source, capture essential data, update a flag/counter/queue, and return quickly." />
            <InfoCard title="Outside the ISR" text="Perform formatting, protocol work, complex calculations and other non-urgent processing in the main context." />
          </div>
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-5 leading-7 text-red-950"><b>Avoid:</b> blocking delays, indefinite loops, large copies, unsafe library calls and unbounded work inside an ISR. Analyse shared data, atomicity, nesting and priority inversion.</p>
        </section>

        <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><SlidersHorizontal className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">PWM calculations</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Formula title="PWM frequency" expression="f_PWM = f_counter / (period + 1)" explanation="For a typical edge-aligned up-counter; consult the timer mode documentation." />
            <Formula title="Duty cycle" expression="Duty (%) = active counts / total counts × 100" explanation="Polarity and compare semantics determine whether active counts equal the compare value." />
          </div>
          <p className="mt-5 leading-8 text-indigo-900"><b>Example:</b> With a 1 MHz counter and 999 period value, PWM frequency is 1 kHz. A compare value representing 250 active counts produces approximately 25% duty cycle in a conventional active-high mode.</p>
          <p className="mt-4 rounded-xl bg-white p-4 text-indigo-950">Frequency and resolution trade off against each other for a fixed timer clock and counter width. Higher frequency leaves fewer counts per period and therefore fewer possible duty-cycle steps.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold">PWM applications and constraints</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Concept icon={Gauge} title="LED dimming" text="Choose a frequency above visible flicker and limit current electrically." />
            <Concept icon={Zap} title="DC motor control" text="Drive a suitable transistor bridge or controller; account for switching loss and inductive energy." />
            <Concept icon={Activity} title="Servo command" text="Generate the pulse width and repetition period specified by the servo, using a separate adequate supply." />
            <Concept icon={Waves} title="Tone generation" text="Use timer toggling or PWM to create a defined audible frequency." />
            <Concept icon={SlidersHorizontal} title="Power conversion" text="Requires complementary outputs, dead time, fault shutdown and device-specific expertise." />
            <Concept icon={ShieldCheck} title="Safe startup" text="Configure inactive output polarity before enabling the driver or timer channel." />
          </div>
        </section>

        <section className="rounded-2xl bg-amber-50 p-6">
          <h3 className="text-2xl font-bold text-amber-950">Scheduling periodic firmware tasks</h3>
          <p className="mt-3 leading-8 text-amber-900">A timer interrupt can increment a monotonic tick or set release flags. The main loop then runs tasks when due. Avoid placing every task directly in the timer ISR, because one slow task would delay all interrupt work.</p>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-amber-200"><code>{`void Timer_ISR(void) {
  timer_ticks++;
  sample_due = true;
  Timer_ClearUpdateFlag();
}

// Main context
if (sample_due) {
  sample_due = false;
  Sensor_ProcessSample();
}`}</code></pre>
          <p className="mt-4 leading-7 text-amber-950">If every tick must be processed, a Boolean flag may lose events; use a bounded counter or queue and define overload behaviour.</p>
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-3"><ShieldCheck className="text-red-700" /><h3 className="text-2xl font-bold text-red-950">Timer and power-stage safety</h3></div>
          <ul className="mt-4 grid gap-3 md:grid-cols-2 text-red-900">
            {["Verify the peripheral clock tree before calculating values.", "Set safe GPIO and compare states before enabling outputs.", "Clear pending flags before enabling an interrupt.", "Protect shared state accessed by both ISR and main code.", "Use rated drivers, current limiting and flyback paths for loads.", "Define behaviour for timer faults, missed deadlines and emergency shutdown."].map((item) => <li key={item} className="rounded-xl bg-white p-4">✓ {item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-emerald-50 p-6">
          <h3 className="text-2xl font-bold text-emerald-950">Hands-on activity: PWM dimmer and frequency meter</h3>
          <p className="mt-3 leading-8 text-emerald-900">Configure one timer channel to produce a 1 kHz PWM signal for a current-limited LED. A debounced button cycles through 10%, 30%, 60% and 100% duty cycle. Connect the PWM output to a second timer input-capture pin if your board permits, then measure its period and active pulse width.</p>
          <ol className="mt-5 space-y-3 text-emerald-950">
            {["Derive the prescaler, period and compare values before coding.", "Confirm timer clock and pin alternate-function mapping in the reference manual.", "Start with the output disabled and verify the LED resistor and polarity.", "Measure PWM frequency and duty cycle with a logic analyser or oscilloscope when available.", "Record interrupt counts and prove the main loop remains responsive.", "Test 0% and 100% boundary cases plus counter wrap and invalid configuration."].map((item, index) => <li key={item} className="flex gap-3 rounded-xl bg-white p-4"><span className="font-bold text-emerald-700">{index + 1}.</span><span>{item}</span></li>)}
          </ol>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• A prescaler and period value convert the peripheral clock into useful timer intervals.</li>
            <li>• Input capture measures event timing; output compare schedules precise events.</li>
            <li>• Interrupt handlers must remain short, bounded and safe when sharing data.</li>
            <li>• PWM controls active time, while frequency and resolution share a design trade-off.</li>
            <li>• Power loads require proper drivers, safe startup states and electrical protection.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Chapter completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the PWM and capture activity, calculate timer tick and update period, distinguish capture from compare, explain interrupt latency and ISR design, identify safe motor-drive requirements, and score at least 80% in the quiz.</p>
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
  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 5 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => {
    const selected = answers[index] === optionIndex;
    const correct = submitted && optionIndex === item.answer;
    const incorrect = submitted && selected && optionIndex !== item.answer;
    return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`embedded-ch5-${index}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>;
  })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function InfoCard({ title, text }) { return <div className="rounded-2xl border border-blue-100 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function Formula({ title, expression, explanation }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><code className="mt-3 block rounded-lg bg-slate-950 p-3 text-cyan-300">{expression}</code><p className="mt-3 leading-7 text-slate-600">{explanation}</p></div>; }
function DarkCard({ title, text }) { return <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><h4 className="font-bold text-sky-200">{title}</h4><p className="mt-2 leading-7 text-slate-200">{text}</p></div>; }
function Concept({ icon: Icon, title, text }) { return <div className="rounded-2xl border border-slate-200 p-5"><Icon className="text-blue-600" size={27} /><h4 className="mt-3 text-lg font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }

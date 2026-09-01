import { useMemo, useState } from "react";
import {
  Binary,
  Blocks,
  Braces,
  Bug,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Code2,
  FileCode2,
  GitBranch,
  Layers3,
  RefreshCcw,
  RotateCcw,
  ShieldCheck,
  Workflow,
  XCircle,
} from "lucide-react";

const questions = [
  { question: "Why are fixed-width integer types such as uint16_t useful in embedded C?", options: ["They guarantee an exact width on supported implementations", "They automatically allocate dynamic memory", "They remove the need for headers", "They make every variable signed"], answer: 0 },
  { question: "What does the volatile qualifier tell the compiler?", options: ["The value can change outside the normal program flow and accesses must not be optimised away", "The variable is always constant", "The variable must be stored in Flash", "The function can never return"], answer: 0 },
  { question: "Which expression sets bit 3 of variable reg without changing the other bits?", options: ["reg = 3", "reg |= (1U << 3)", "reg &= 3", "reg == (1U << 3)"], answer: 1 },
  { question: "What is the main purpose of a header file?", options: ["Store compiled machine code", "Declare shared interfaces, types and constants", "Replace all source files", "Provide electrical power"], answer: 1 },
  { question: "Why should an interrupt service routine normally be short?", options: ["To reduce interrupt latency for other work and keep timing predictable", "To increase heap use", "To prevent all peripheral access", "To disable the compiler"], answer: 0 },
  { question: "What problem does a finite-state machine help solve?", options: ["Organising behaviour into explicit states and transitions", "Selecting resistor wattage", "Increasing the supply voltage", "Replacing source control"], answer: 0 },
  { question: "Why is a blocking delay risky in a responsive embedded application?", options: ["It may stop other work from being serviced during the delay", "It always corrupts Flash", "It changes the C language", "It removes GPIO pins"], answer: 0 },
  { question: "What should a function interface ideally communicate?", options: ["Its inputs, output and responsibility", "Only the programmer's name", "The PCB dimensions", "The compiler installation folder"], answer: 0 },
  { question: "What is the safest approach to shared data modified by an ISR?", options: ["Ignore concurrency", "Use appropriate volatile access and an atomic or protected data-sharing strategy", "Make every variable global", "Read it only during reset"], answer: 1 },
  { question: "What is a good firmware startup sequence?", options: ["Drive actuators first, then configure clocks", "Establish safe outputs, initialise required hardware, validate state, then enable normal operation", "Enable every interrupt before configuration", "Skip error handling"], answer: 1 },
];

export default function EmbeddedSystemsChapterFourLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 4</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Embedded C Programming and Firmware Structure</h2>
          <p className="mt-4 leading-8 text-slate-600">Embedded C turns hardware requirements into deterministic behaviour. This chapter develops the language skills and firmware structure needed to configure registers safely, organise reusable modules, respond to events, manage time without unnecessary blocking, and build code that remains understandable as the product grows.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold text-slate-900">Learning objectives</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {["Use integer types, operators, conditions, loops, functions and arrays appropriately.", "Explain const, volatile, static and fixed-width integer types.", "Set, clear, toggle and test individual register bits.", "Separate drivers, services, application logic and configuration.", "Design a non-blocking super-loop and finite-state machine.", "Apply defensive programming, error handling and testable interfaces."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><Code2 className="text-blue-700" /><h3 className="text-2xl font-bold text-blue-950">Why C is widely used in embedded systems</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard title="Hardware access" text="Pointers and bitwise operations map efficiently to registers and memory." />
            <InfoCard title="Predictable cost" text="Developers can reason about memory use and execution work at a low level." />
            <InfoCard title="Portability" text="Well-separated application logic can move between compilers and devices." />
            <InfoCard title="Mature ecosystem" text="Toolchains, libraries, debuggers and coding standards are broadly available." />
          </div>
          <p className="mt-4 leading-7 text-blue-950">C offers control, not automatic safety. Array bounds, pointer validity, integer conversions, concurrency and resource ownership must be handled deliberately.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Types, range and representation</h3>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[720px] text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-4">Choice</th><th className="p-4">Use</th><th className="p-4">Engineering concern</th></tr></thead><tbody className="divide-y divide-slate-200 text-slate-700">
              <TypeRow choice="uint8_t, int16_t, uint32_t" use="Values requiring a known width" concern="Include stdint.h; confirm arithmetic promotions and range" />
              <TypeRow choice="bool" use="True/false state" concern="Include stdbool.h in C implementations that require it" />
              <TypeRow choice="enum" use="Named states and modes" concern="Underlying size can be implementation-defined" />
              <TypeRow choice="float / double" use="Fractional calculations" concern="Execution time, precision and library size depend on the target" />
            </tbody></table>
          </div>
          <p className="mt-4 rounded-2xl bg-amber-50 p-5 leading-7 text-amber-950"><b>Before an operation:</b> consider the complete intermediate range, signed/unsigned conversion, overflow behaviour and scaling. A destination type large enough for the final value does not protect a narrower intermediate expression.</p>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><Braces className="text-sky-300" /><h3 className="text-2xl font-bold">Important C qualifiers and storage choices</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <DarkCard title="const" text="Prevents modification through that identifier and expresses read-only intent. It does not automatically mean the object is stored in Flash." />
            <DarkCard title="volatile" text="Forces observable accesses when values can change through hardware, interrupts or another execution context. It does not make operations atomic." />
            <DarkCard title="static at file scope" text="Limits a symbol to its source file, reducing unintended coupling between modules." />
            <DarkCard title="static local" text="Preserves a function-local value between calls while restricting its name to that function." />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><Binary className="text-indigo-700" /><h3 className="text-2xl font-bold">Bitwise register operations</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <CodeCard title="Set bit n" code="reg |= (1U << n);" text="OR with a mask containing a 1 at the selected position." />
            <CodeCard title="Clear bit n" code="reg &= ~(1U << n);" text="AND with the inverted mask." />
            <CodeCard title="Toggle bit n" code="reg ^= (1U << n);" text="XOR changes only the selected bit." />
            <CodeCard title="Test bit n" code="if ((reg & (1U << n)) != 0U)" text="Mask the register and compare the result explicitly." />
          </div>
          <p className="mt-4 leading-8 text-slate-600">Prefer named masks supplied by the device header. Read the register access rules: some flags clear by writing one, some registers are write-only, and a read-modify-write sequence can be unsafe when hardware changes other bits concurrently.</p>
        </section>

        <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
          <h3 className="text-2xl font-bold text-cyan-950">Pointers and memory-mapped registers</h3>
          <p className="mt-3 leading-8 text-cyan-900">A pointer stores an address. Peripheral headers usually expose typed, volatile register structures so firmware can access hardware without scattering literal addresses through the application.</p>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-cyan-100"><code>{`typedef struct {
  volatile uint32_t MODE;
  volatile uint32_t INPUT;
  volatile uint32_t OUTPUT;
} GpioRegisters;

#define GPIOA ((GpioRegisters *)GPIOA_BASE)`}</code></pre>
          <p className="mt-4 leading-7 text-cyan-950">Use the vendor device header in production code. Avoid dereferencing unvalidated pointers, respect alignment, and never infer that volatile access alone provides ordering or mutual exclusion.</p>
        </section>

        <section>
          <div className="flex items-center gap-3"><Blocks className="text-blue-700" /><h3 className="text-2xl font-bold">Functions and module boundaries</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Concept icon={FileCode2} title="Header (.h)" text="Public types, constants and function declarations—the contract offered by a module." />
            <Concept icon={Code2} title="Source (.c)" text="Implementation details and file-private state, normally hidden with static." />
            <Concept icon={ShieldCheck} title="Interface discipline" text="Validate inputs, document units and ownership, return explicit status, and minimise global state." />
          </div>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-emerald-200"><code>{`// led.h
bool Led_Init(void);
void Led_Set(bool enabled);

// Application code depends on the interface,
// not directly on device registers.`}</code></pre>
        </section>

        <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Layers3 className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">A maintainable firmware architecture</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Layer title="Application" text="Product states, rules and user-visible behaviour." />
            <Layer title="Services" text="Debouncing, scheduling, diagnostics, storage and communication protocols." />
            <Layer title="Drivers / HAL" text="GPIO, timers, ADC and serial peripheral control." />
            <Layer title="Hardware" text="MCU registers, board wiring and electrical interfaces." />
          </div>
          <p className="mt-5 leading-8 text-indigo-900">Dependencies should generally point downward through narrow interfaces. Board-specific details remain near the drivers, allowing application logic to be tested with substitutes on a host computer.</p>
        </section>

        <section>
          <div className="flex items-center gap-3"><RefreshCcw className="text-emerald-700" /><h3 className="text-2xl font-bold">The super-loop pattern</h3></div>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-sky-100"><code>{`int main(void) {
  System_Init();

  for (;;) {
    Inputs_Update();
    App_Run();
    Outputs_Update();
    Diagnostics_Run();
  }
}`}</code></pre>
          <p className="mt-4 leading-8 text-slate-600">Each task should perform a bounded amount of work and return. The loop then revisits every responsibility frequently. This cooperative structure is simple and effective when worst-case execution time and response requirements are analysed.</p>
        </section>

        <section className="rounded-2xl bg-emerald-50 p-6">
          <div className="flex items-center gap-3"><GitBranch className="text-emerald-700" /><h3 className="text-2xl font-bold text-emerald-950">Finite-state machines</h3></div>
          <p className="mt-3 leading-8 text-emerald-900">A finite-state machine expresses behaviour as named states, events, actions and guarded transitions. It replaces deeply nested conditions with an explicit model that is easier to review and test.</p>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-emerald-200"><code>{`typedef enum { APP_IDLE, APP_ACTIVE, APP_FAULT } AppState;

switch (state) {
  case APP_IDLE:
    if (start_requested) state = APP_ACTIVE;
    break;
  case APP_ACTIVE:
    if (fault_detected) state = APP_FAULT;
    else if (stop_requested) state = APP_IDLE;
    break;
  case APP_FAULT:
    Outputs_SetSafe();
    if (reset_allowed) state = APP_IDLE;
    break;
  default:
    state = APP_FAULT;
    break;
}`}</code></pre>
        </section>

        <section>
          <div className="flex items-center gap-3"><Clock3 className="text-blue-700" /><h3 className="text-2xl font-bold">Non-blocking time management</h3></div>
          <p className="mt-4 leading-8 text-slate-600">Long busy-wait delays prevent the main loop from servicing other work. Instead, record a tick count or deadline and perform the action when the elapsed interval is reached. Use wraparound-safe unsigned arithmetic and define the required timer resolution.</p>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-amber-200"><code>{`if ((uint32_t)(now_ms - last_sample_ms) >= SAMPLE_PERIOD_MS) {
  last_sample_ms = now_ms;
  Sensor_RequestSample();
}`}</code></pre>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="text-2xl font-bold text-amber-950">Interrupt-safe data sharing</h3>
          <p className="mt-3 leading-8 text-amber-900">Keep interrupt handlers short: capture essential data, clear the correct hardware source, update a flag or queue, and defer processing to the main context. A volatile qualifier ensures accesses occur, but does not make a multi-byte operation atomic or prevent races.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {["Use the smallest shared representation that meets the need.", "Protect non-atomic read-modify-write operations.", "Define ownership for buffers and queues.", "Analyse interrupt priority and worst-case execution time."].map((item) => <div key={item} className="rounded-xl bg-white p-4 text-amber-950">✓ {item}</div>)}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><Bug className="text-red-700" /><h3 className="text-2xl font-bold">Defensive firmware and debugging</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Concept icon={ShieldCheck} title="Validate" text="Check ranges, pointers, lengths, states and return codes at system boundaries." />
            <Concept icon={Workflow} title="Recover" text="Use timeouts, safe states, watchdog supervision and explicit fault reporting." />
            <Concept icon={Bug} title="Observe" text="Use debugger watchpoints, assertions, logs and GPIO timing markers without changing critical timing excessively." />
          </div>
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-5 leading-7 text-red-950">Avoid unbounded recursion and uncontrolled dynamic allocation in systems requiring deterministic memory use. Initialise every variable, enable compiler warnings, use static analysis where available, and review all assumptions about integer range and concurrency.</p>
        </section>

        <section className="rounded-2xl bg-violet-50 p-6">
          <h3 className="text-2xl font-bold text-violet-950">Hands-on activity: non-blocking status controller</h3>
          <p className="mt-3 leading-8 text-violet-900">Create a firmware application with a debounced button, status LED and three states: IDLE, ACTIVE and FAULT. A valid press moves between IDLE and ACTIVE. ACTIVE blinks the LED using a timer tick without blocking. Simulate a fault with a second input; FAULT must force a distinct LED pattern and require an allowed reset.</p>
          <ol className="mt-5 space-y-3 text-violet-950">
            {["Define public driver interfaces for the button, LED and system tick.", "Keep device register access inside driver source files.", "Represent application behaviour with an enum and explicit state transitions.", "Use fixed-width types and named constants with units.", "Record test cases for startup, bounce, timer wraparound, fault and recovery.", "Compile with warnings enabled and document RAM/Flash usage from the build output."].map((item, index) => <li key={item} className="flex gap-3 rounded-xl bg-white p-4"><span className="font-bold text-violet-700">{index + 1}.</span><span>{item}</span></li>)}
          </ol>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• Embedded C provides efficient hardware control but requires deliberate handling of memory, range and concurrency.</li>
            <li>• const, volatile and static express different constraints; volatile alone is not thread or interrupt safety.</li>
            <li>• Named masks and device headers make register operations clearer and safer.</li>
            <li>• Layered modules, bounded tasks and finite-state machines keep firmware maintainable.</li>
            <li>• Defensive checks, timeouts, safe states and repeatable tests are part of the design.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Chapter completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the non-blocking state-machine activity, explain fixed-width types and qualifiers, demonstrate four bit-mask operations, separate an application from its drivers, describe safe ISR data sharing, and score at least 80% in the quiz.</p>
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
  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 4 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => {
    const selected = answers[index] === optionIndex;
    const correct = submitted && optionIndex === item.answer;
    const incorrect = submitted && selected && optionIndex !== item.answer;
    return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`embedded-ch4-${index}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>;
  })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function TypeRow({ choice, use, concern }) { return <tr><th className="p-4 font-bold text-slate-900">{choice}</th><td className="p-4">{use}</td><td className="p-4">{concern}</td></tr>; }
function InfoCard({ title, text }) { return <div className="rounded-2xl border border-blue-100 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function DarkCard({ title, text }) { return <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><h4 className="font-bold text-sky-200">{title}</h4><p className="mt-2 leading-7 text-slate-200">{text}</p></div>; }
function CodeCard({ title, code, text }) { return <div className="rounded-2xl border border-slate-200 p-5"><h4 className="font-bold text-slate-900">{title}</h4><code className="mt-3 block rounded-lg bg-slate-950 p-3 text-emerald-300">{code}</code><p className="mt-3 leading-7 text-slate-600">{text}</p></div>; }
function Concept({ icon: Icon, title, text }) { return <div className="rounded-2xl border border-slate-200 p-5"><Icon className="text-blue-600" size={27} /><h4 className="mt-3 text-lg font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function Layer({ title, text }) { return <div className="rounded-2xl bg-white p-5"><h4 className="font-bold text-indigo-950">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }

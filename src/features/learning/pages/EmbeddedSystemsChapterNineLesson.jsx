import { useMemo, useState } from "react";
import {
  AlarmClock,
  Blocks,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Cpu,
  Layers3,
  LockKeyhole,
  Mailbox,
  MemoryStick,
  RefreshCcw,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Workflow,
  XCircle,
} from "lucide-react";

const questions = [
  { question: "What is the main role of an RTOS scheduler?", options: ["Select which ready task runs according to scheduling rules", "Increase the supply voltage", "Program external Flash", "Replace all device drivers"], answer: 0 },
  { question: "Which task state means the task is waiting for time or an event?", options: ["Blocked", "Running", "Deleted only", "Compiled"], answer: 0 },
  { question: "In a typical pre-emptive priority scheduler, what happens when a higher-priority task becomes ready?", options: ["It can pre-empt the lower-priority running task", "It is always ignored", "The system resets", "Every task runs simultaneously on one core"], answer: 0 },
  { question: "What is a queue best suited for?", options: ["Passing copied messages or data items between execution contexts", "Increasing clock frequency", "Replacing power protection", "Storing unlimited data"], answer: 0 },
  { question: "What is a mutex primarily used for?", options: ["Mutual exclusion when accessing a shared resource", "Counting ADC samples only", "Generating PWM", "Resetting the watchdog"], answer: 0 },
  { question: "What is priority inversion?", options: ["A high-priority task waits for a resource held by a lower-priority task", "Every task has the same name", "An interrupt changes voltage polarity", "A queue reverses its bytes"], answer: 0 },
  { question: "How does priority inheritance help?", options: ["Temporarily raises the resource owner's effective priority", "Deletes the high-priority task", "Removes the mutex", "Disables all interrupts"], answer: 0 },
  { question: "Why should an ISR use RTOS APIs specifically documented as ISR-safe?", options: ["Ordinary task APIs may block or violate kernel execution rules", "ISR-safe APIs increase Flash endurance", "They change the PCB layout", "They eliminate task priorities"], answer: 0 },
  { question: "What is deadlock?", options: ["Tasks wait indefinitely for resources in a circular dependency", "A periodic task wakes normally", "A queue receives a message", "A timer reaches its period"], answer: 0 },
  { question: "What should determine task priority?", options: ["Deadline, latency and consequence of delay based on system analysis", "Source-file order", "Task name length", "The developer's favourite number"], answer: 0 },
];

export default function EmbeddedSystemsChapterNineLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 9</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">RTOS Fundamentals, Tasks and Synchronization</h2>
          <p className="mt-4 leading-8 text-slate-600">A real-time operating system organises concurrent activities, but it does not automatically make a product real-time or reliable. Engineers must define task responsibilities, priorities, deadlines, communication and resource ownership so timing remains predictable under worst-case load.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold text-slate-900">Learning objectives</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {["Explain RTOS kernels, schedulers, ticks and context switches.", "Describe task states, priorities, deadlines and periodic release.", "Select queues, semaphores, mutexes and event notifications correctly.", "Recognise races, deadlock, starvation and priority inversion.", "Use ISR-safe kernel interaction and defer lengthy work to tasks.", "Estimate stack, CPU and timing budgets for a multi-task design."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><Layers3 className="text-blue-700" /><h3 className="text-2xl font-bold text-blue-950">What an RTOS provides</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard title="Scheduler" text="Selects a ready task according to priority and configured scheduling policy." />
            <InfoCard title="Tasks" text="Independent execution contexts with entry functions, state and stack space." />
            <InfoCard title="Timing services" text="Delays, timeouts, periodic release and software timers based on kernel time." />
            <InfoCard title="IPC and synchronization" text="Queues, notifications, semaphores, mutexes and event mechanisms coordinate work." />
          </div>
          <p className="mt-4 leading-7 text-blue-950"><b>Use an RTOS when it reduces system complexity:</b> it is valuable for several concurrent activities with different response needs. A small, well-analysed super-loop may remain better for a simple product.</p>
        </section>

        <section>
          <div className="flex items-center gap-3"><Cpu className="text-indigo-700" /><h3 className="text-2xl font-bold">Task states and lifecycle</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StateCard title="Running" text="Currently executing on a CPU core." />
            <StateCard title="Ready" text="Able to execute but waiting for the scheduler to select it." />
            <StateCard title="Blocked" text="Waiting for time, data, a resource or another event." />
            <StateCard title="Suspended" text="Explicitly removed from scheduling until resumed, if supported." />
          </div>
          <p className="mt-4 leading-8 text-slate-600">A well-designed task blocks when it has nothing to do. Repeated polling consumes CPU time and energy while increasing interference with useful work.</p>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><RefreshCcw className="text-sky-300" /><h3 className="text-2xl font-bold">Pre-emption and context switching</h3></div>
          <p className="mt-4 leading-8 text-slate-200">In a typical fixed-priority pre-emptive scheduler, the highest-priority ready task runs. When a higher-priority task becomes ready, the kernel can save the current task context and restore the other task's context.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <DarkCard title="Saved context" text="Registers, stack pointer and processor state required to resume execution." />
            <DarkCard title="Switch cost" text="Kernel work, cache effects and architecture overhead consume measurable CPU time." />
            <DarkCard title="Critical sections" text="Scheduler or interrupt locking delays higher-priority response and must remain bounded." />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><AlarmClock className="text-red-700" /><h3 className="text-2xl font-bold">Timing, periods and deadlines</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Concept icon={Clock3} title="Period" text="Interval between releases of periodic work." />
            <Concept icon={AlarmClock} title="Deadline" text="Latest acceptable completion time measured from the relevant release or event." />
            <Concept icon={Cpu} title="Execution time" text="CPU time required, analysed at worst-case conditions for timing guarantees." />
            <Concept icon={Workflow} title="Response time" text="Time from release or event until the required result completes." />
            <Concept icon={RefreshCcw} title="Jitter" text="Variation in release, start or completion timing." />
            <Concept icon={ShieldAlert} title="Overrun" text="Work exceeds its budget or is released again before the prior instance completes." />
          </div>
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-5 leading-7 text-red-950">High priority does not mean “important in general.” Assign priorities from deadline and blocking analysis. Too many high-priority tasks can starve lower-priority maintenance and diagnostic work.</p>
        </section>

        <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
          <h3 className="text-2xl font-bold text-cyan-950">Periodic task pattern</h3>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-cyan-200"><code>{`void SensorTask(void *context) {
  TickType_t release = Kernel_GetTick();

  for (;;) {
    Sensor_ReadValidateAndPublish();
    Kernel_DelayUntil(&release, SAMPLE_PERIOD_TICKS);
  }
}`}</code></pre>
          <p className="mt-4 leading-8 text-cyan-900">A delay-until operation targets the next absolute release and avoids accumulating task-execution time into the period. Exact names and tick-conversion rules depend on the selected RTOS.</p>
        </section>

        <section>
          <div className="flex items-center gap-3"><Mailbox className="text-emerald-700" /><h3 className="text-2xl font-bold">Queues and message passing</h3></div>
          <p className="mt-4 leading-8 text-slate-600">A queue transfers fixed-size items between tasks or supported ISR contexts. Copying a message establishes clear ownership and can decouple producer timing from consumer work.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard title="Design the message" text="Include type, timestamp, validity and payload with a bounded, documented size." />
            <InfoCard title="Define overload" text="Choose whether a full queue drops newest, drops oldest, blocks with timeout or triggers a fault. Never leave it accidental." />
          </div>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-emerald-200"><code>{`typedef struct {
  uint32_t timestamp_ms;
  int16_t temperature_c_x10;
  bool valid;
} SensorMessage;

// Producer sends a copy; consumer receives a copy.`}</code></pre>
        </section>

        <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><LockKeyhole className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Synchronization tools</h3></div>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-indigo-100 bg-white">
            <table className="w-full min-w-[820px] text-left"><thead className="bg-indigo-950 text-white"><tr><th className="p-4">Primitive</th><th className="p-4">Primary purpose</th><th className="p-4">Important caution</th></tr></thead><tbody className="divide-y divide-slate-200 text-slate-700">
              <SyncRow name="Binary semaphore" purpose="Signal that an event or resource is available" caution="Usually has no ownership; not automatically a mutex substitute" />
              <SyncRow name="Counting semaphore" purpose="Represent multiple identical resources or accumulated events" caution="Define maximum count and overflow behaviour" />
              <SyncRow name="Mutex" purpose="Protect exclusive access to a shared resource" caution="Owner must release it; use priority-inheritance support where needed" />
              <SyncRow name="Event flags/group" purpose="Wait for one or several Boolean conditions" caution="Define whether bits clear on exit and who owns each bit" />
              <SyncRow name="Task notification" purpose="Efficient task-specific event or small-value signalling" caution="Semantics vary by RTOS and are not a general message queue" />
            </tbody></table>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Race conditions and critical sections</h3>
          <p className="mt-4 leading-8 text-slate-600">A race occurs when the result depends on unpredictable execution order. Even a simple increment can be a read-modify-write sequence that another task or ISR interrupts. Protect shared state using ownership, message passing, atomic operations or the smallest appropriate critical section.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Concept icon={ShieldCheck} title="Single owner" text="One task owns a resource; others send requests through a queue." />
            <Concept icon={LockKeyhole} title="Mutex protection" text="Tasks lock before accessing a shared non-ISR resource and release on every path." />
            <Concept icon={Blocks} title="Immutable message" text="Publish a completed value and avoid modifying it while another context reads it." />
          </div>
        </section>

        <section className="rounded-2xl bg-amber-50 p-6">
          <h3 className="text-2xl font-bold text-amber-950">Priority inversion</h3>
          <p className="mt-3 leading-8 text-amber-900">Priority inversion occurs when a high-priority task waits for a mutex owned by a lower-priority task. An unrelated medium-priority task can pre-empt the owner and extend the high-priority task's delay.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <InfoCard title="Priority inheritance" text="Temporarily raises the mutex owner's effective priority so it can finish the protected work sooner." />
            <InfoCard title="Short lock duration" text="Keep protected operations bounded and never wait for unrelated events while holding a mutex." />
            <InfoCard title="Architecture" text="Reduce shared resources or assign one resource-owner task with message-based requests." />
          </div>
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-3"><ShieldAlert className="text-red-700" /><h3 className="text-2xl font-bold text-red-950">Deadlock and starvation</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard title="Deadlock" text="Tasks wait indefinitely in a circular resource dependency. Prevent it with a global lock order, limited lock nesting and timeouts where appropriate." />
            <InfoCard title="Starvation" text="A ready task receives too little CPU or resource access because other work continually wins. Analyse sustained worst-case load, not only average behaviour." />
          </div>
          <p className="mt-4 leading-7 text-red-950">Never delete or suspend a task while it owns a resource. Design cleanup paths and instrument timeout failures so field diagnostics reveal the blocked resource and owner.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Interrupt-to-task communication</h3>
          <ol className="mt-5 space-y-3 text-slate-700">
            {["The peripheral raises an interrupt.", "The ISR captures minimum data and clears the source.", "An ISR-safe API sends a notification, semaphore or queue item.", "The kernel optionally requests a reschedule when a higher-priority task is awakened.", "The task validates and processes the event outside interrupt context."].map((item, index) => <li key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4"><span className="font-bold text-blue-700">{index + 1}.</span><span>{item}</span></li>)}
          </ol>
          <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 leading-7 text-amber-950">Only call APIs explicitly documented for ISR context. ISR priority must also satisfy the RTOS port's rules for invoking kernel services.</p>
        </section>

        <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
          <div className="flex items-center gap-3"><MemoryStick className="text-cyan-700" /><h3 className="text-2xl font-bold text-cyan-950">RTOS memory and stack planning</h3></div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {["Budget one stack for each task plus kernel objects and interrupt stack where applicable.", "Measure high-water marks under worst-case nesting and interrupt load.", "Avoid large automatic arrays and recursive calls in small task stacks.", "Choose static or dynamic object creation according to the product's determinism policy.", "Handle queue, task and semaphore creation failure explicitly.", "Protect stacks with available guards, MPU features and overflow hooks."].map((item) => <div key={item} className="rounded-xl bg-white p-4 text-cyan-950">✓ {item}</div>)}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><Workflow className="text-violet-700" /><h3 className="text-2xl font-bold">Example task architecture</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <TaskCard title="Acquisition" priority="High" text="Periodic sensor sampling with a defined deadline; publishes validated messages." />
            <TaskCard title="Control" priority="High" text="Consumes newest valid data and updates bounded actuator commands." />
            <TaskCard title="Communication" priority="Medium" text="Parses bounded frames and publishes status without holding control resources." />
            <TaskCard title="Diagnostics" priority="Low" text="Records health and statistics while tolerating delay under legitimate peak load." />
          </div>
          <p className="mt-4 leading-8 text-slate-600">These labels are illustrative, not universal. Priority must be derived from the actual execution times, periods, deadlines, blocking and failure consequences.</p>
        </section>

        <section className="rounded-2xl bg-emerald-50 p-6">
          <h3 className="text-2xl font-bold text-emerald-950">Hands-on activity: real-time monitoring application</h3>
          <p className="mt-3 leading-8 text-emerald-900">Create a simulated or low-voltage RTOS application with acquisition, control, communication and diagnostics tasks. Transfer sensor samples through a queue, protect one shared serial resource with a mutex, and signal a fault with an event flag. Use an ISR-safe notification to release acquisition from a timer event.</p>
          <ol className="mt-5 space-y-3 text-emerald-950">
            {["Write a table of each task's period, deadline, priority, stack and worst-case work.", "Define queue length and behaviour for full, empty and stale-data conditions.", "Use one ownership rule for every shared peripheral and buffer.", "Measure task execution time, response time, queue high-water mark and stack high-water mark.", "Inject a slow communication task, queue overflow, missing sensor event and held mutex.", "Demonstrate that control deadlines and safe outputs remain correct under the tested faults."].map((item, index) => <li key={item} className="flex gap-3 rounded-xl bg-white p-4"><span className="font-bold text-emerald-700">{index + 1}.</span><span>{item}</span></li>)}
          </ol>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• The scheduler selects among ready tasks; priorities must follow timing analysis.</li>
            <li>• Tasks should block for time or events instead of continuously polling.</li>
            <li>• Queues transfer data, semaphores signal/count, and mutexes protect owned resources.</li>
            <li>• Priority inversion, deadlock, starvation and races require deliberate prevention.</li>
            <li>• RTOS reliability depends on measured execution, stack, queue and response-time margins.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Chapter completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the multi-task activity, explain task states and pre-emption, select the correct synchronization primitive, prevent priority inversion and deadlock, demonstrate ISR-to-task signalling, document timing/stack evidence, and score at least 80% in the quiz.</p>
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
  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 9 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => {
    const selected = answers[index] === optionIndex;
    const correct = submitted && optionIndex === item.answer;
    const incorrect = submitted && selected && optionIndex !== item.answer;
    return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`embedded-ch9-${index}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>;
  })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function InfoCard({ title, text }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function StateCard({ title, text }) { return <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5"><h4 className="font-bold text-indigo-950">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function DarkCard({ title, text }) { return <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><h4 className="font-bold text-sky-200">{title}</h4><p className="mt-2 leading-7 text-slate-200">{text}</p></div>; }
function Concept({ icon: Icon, title, text }) { return <div className="rounded-2xl border border-slate-200 p-5"><Icon className="text-blue-600" size={27} /><h4 className="mt-3 text-lg font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function SyncRow({ name, purpose, caution }) { return <tr><th className="p-4 font-bold text-slate-900">{name}</th><td className="p-4">{purpose}</td><td className="p-4">{caution}</td></tr>; }
function TaskCard({ title, priority, text }) { return <div className="rounded-2xl border border-slate-200 p-5"><span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-800">{priority} priority</span><h4 className="mt-4 font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }

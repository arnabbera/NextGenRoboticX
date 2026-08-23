import { useMemo, useState } from "react";
import { Activity, CheckCircle2, CircleHelp, Code2, Gauge, Lightbulb, RotateCcw, ShieldAlert, ToggleLeft, XCircle, Zap } from "lucide-react";

const projectCode = `from gpiozero import Button, PWMLED
from signal import pause

# BCM numbering: button GPIO 17, LED GPIO 18
button = Button(17, pull_up=True, bounce_time=0.05)
led = PWMLED(18, frequency=200)

levels = [0.0, 0.25, 0.5, 0.75, 1.0]
level_index = 0

def select_next_level():
    global level_index
    level_index = (level_index + 1) % len(levels)
    led.value = levels[level_index]
    print(f"LED duty level: {led.value * 100:.0f}%")

def safe_exit():
    led.off()
    led.close()
    button.close()

button.when_pressed = select_next_level

print("Press the button to change brightness. Ctrl+C stops.")
try:
    pause()
except KeyboardInterrupt:
    print("\\nStopping safely.")
finally:
    safe_exit()`;

const questions = [
  { question: "What does a GPIO output do?", options: ["Drives a controlled 3.3 V logic state", "Accepts unlimited voltage", "Stores the operating system", "Provides mains power"], answer: 0 },
  { question: "Why does a button input need a pull-up or pull-down?", options: ["To establish a defined state when the switch is open", "To increase CPU speed", "To power a motor", "To format a card"], answer: 0 },
  { question: "With an internal pull-up and a button connected to ground, what is normally read when pressed?", options: ["A high/open state", "A low/active state", "An analogue voltage only", "A network packet"], answer: 1 },
  { question: "What is switch bounce?", options: ["Rapid electrical transitions caused by mechanical contact movement", "A Python import", "A stable PWM signal", "An HDMI fault"], answer: 0 },
  { question: "What does PWM vary to control average output?", options: ["Filesystem permissions", "Duty cycle", "Host name", "Storage capacity"], answer: 1 },
  { question: "What does a 0% PWM duty cycle represent for an active-high LED?", options: ["Always on", "Half brightness", "Off", "Invalid GPIO"], answer: 2 },
  { question: "Why is a resistor placed in series with a standard LED?", options: ["To limit current", "To create Wi-Fi", "To increase GPIO voltage", "To store code"], answer: 0 },
  { question: "Why must a motor use a suitable driver stage?", options: ["It needs more current and protection than GPIO can provide", "It cannot be programmed", "It uses only HDMI", "It has no voltage"], answer: 0 },
  { question: "What does bounce_time in gpiozero help with?", options: ["Debouncing repeated transitions", "Increasing PWM voltage", "Cooling the Pi", "Creating a virtual environment"], answer: 0 },
  { question: "What should cleanup code do when a GPIO program exits?", options: ["Leave outputs in a defined safe state and release resources", "Drive every pin high", "Delete the OS", "Ignore external hardware"], answer: 0 },
];

export default function RaspberryPiChapterFiveLesson() {
  return <><article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
    <header><p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 5</p><h2 className="mt-2 text-3xl font-bold text-slate-900">GPIO Programming: LEDs, Buttons and PWM</h2><p className="mt-4 leading-8 text-slate-600">GPIO allows Raspberry Pi software to interact with the physical world. Reliable circuits require more than toggling a pin: inputs need defined states and debounce handling, LEDs require current limiting, PWM must be understood as timed switching, and power loads require correctly rated driver hardware.</p></header>

    <section><h3 className="text-2xl font-bold">Learning objectives</h3><ul className="mt-4 grid gap-3 md:grid-cols-2">{["Configure GPIO as safe digital inputs and outputs.", "Build current-limited LED circuits using BCM numbering.", "Use internal pull-up or pull-down resistors for buttons.", "Explain and implement hardware/software debouncing.", "Control LED brightness with PWM duty cycle.", "Design event-driven programs with defined cleanup behaviour."].map(item=><li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}</ul></section>

    <section className="rounded-2xl bg-blue-50 p-6"><div className="flex items-center gap-3"><Activity className="text-blue-700"/><h3 className="text-2xl font-bold">Digital GPIO states</h3></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Card icon={Lightbulb} title="Output" text="Software selects a LOW or HIGH logic state. Use it for small compatible signals, not as a general-purpose power supply."/><Card icon={ToggleLeft} title="Input" text="Software reads LOW or HIGH from an external circuit. The input voltage must remain within allowed limits."/><Card icon={Zap} title="Active high" text="The function is active when the signal is HIGH, such as an LED wired from GPIO through a resistor to ground."/><Card icon={Activity} title="Active low" text="The function is active when the signal is LOW, common for a button connected between a pulled-up input and ground."/></div></section>

    <section><h3 className="text-2xl font-bold">LED output circuit</h3><p className="mt-4 leading-8 text-slate-600">Connect the selected GPIO to a suitable series resistor, the resistor to the LED anode, and the cathode to ground. LED polarity matters: the anode is positive and the cathode is negative. Choose the resistor from supply voltage, LED forward voltage, and a conservative current within the board's limits.</p><div className="mt-5 rounded-xl bg-slate-900 p-5 text-center font-mono text-cyan-200">R = (V<sub>GPIO</sub> − V<sub>LED</sub>) ÷ I<sub>LED</sub></div><p className="mt-4 text-slate-600">A common beginner value such as 330 Ω may suit many standard indicator LEDs at 3.3 V, but verify the actual LED data and design requirements.</p></section>

    <section><div className="flex items-center gap-3"><ToggleLeft className="text-indigo-700"/><h3 className="text-2xl font-bold">Button inputs and defined logic</h3></div><p className="mt-4 leading-8 text-slate-600">An unconnected input can float and change unpredictably. A pull resistor gives it a known default state. In a pull-up circuit, the open button reads HIGH and pressing a button connected to ground reads LOW. The <code>gpiozero.Button</code> abstraction can configure the internal pull-up and expose convenient event callbacks.</p><div className="mt-5 grid gap-4 md:grid-cols-2"><Card icon={ToggleLeft} title="Pull-up" text="Default HIGH; switch normally connects the input to ground. This is convenient and common on Raspberry Pi."/><Card icon={ToggleLeft} title="Pull-down" text="Default LOW; switch connects the input to 3.3 V. Never connect it to 5 V."/></div></section>

    <section><h3 className="text-2xl font-bold">Switch debouncing</h3><p className="mt-4 leading-8 text-slate-600">Mechanical contacts do not change state perfectly once. They may make and break several times over a few milliseconds, so one press can appear as several events. Debouncing ignores transitions for a short, deliberate interval after a valid change. The interval must reject bounce without making the user interface feel unresponsive.</p><div className="mt-5 overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-3">Method</th><th className="p-3">Approach</th><th className="p-3">Consideration</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">Library/software</td><td className="p-3">Ignore rapid transitions for a configured time</td><td className="p-3">Simple and adjustable</td></tr><tr><td className="p-3 font-semibold">State/timestamp</td><td className="p-3">Accept a change only after stable time</td><td className="p-3">Good for non-blocking logic</td></tr><tr><td className="p-3 font-semibold">Hardware</td><td className="p-3">RC network or dedicated conditioning</td><td className="p-3">Requires component and threshold design</td></tr></tbody></table></div></section>

    <section><div className="flex items-center gap-3"><Gauge className="text-purple-700"/><h3 className="text-2xl font-bold">PWM and brightness control</h3></div><p className="mt-4 leading-8 text-slate-600">Pulse-width modulation switches a digital output rapidly. Duty cycle is the fraction of each period spent active: 0% is off, 50% is active half the time, and 100% is continuously active. An LED appears dimmer or brighter because the eye averages the pulses.</p><div className="mt-5 grid gap-4 md:grid-cols-3"><Duty value="0%" text="Output always inactive"/><Duty value="50%" text="Equal on and off time"/><Duty value="100%" text="Output continuously active"/></div><p className="mt-4 text-slate-600">PWM does not increase GPIO current capability. Use a suitable transistor/MOSFET or driver for strips, motors, fans, buzzers, and other power loads.</p></section>

    <section><div className="flex items-center gap-3"><Code2 className="text-emerald-700"/><h3 className="text-2xl font-bold">Practical program: button-controlled dimmer</h3></div><p className="mt-3 leading-7 text-slate-600">Wire a current-limited LED to BCM GPIO 18 and a button between BCM GPIO 17 and ground. The program advances through five PWM levels on each debounced press and releases resources when stopped.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{projectCode}</code></pre></section>

    <section className="rounded-2xl border border-red-200 bg-red-50 p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-red-700"/><h3 className="text-xl font-bold">Electrical and software safety</h3></div><ul className="mt-4 space-y-2 text-slate-700"><li>• Shut down and disconnect every supply before changing wiring.</li><li>• Confirm BCM/physical numbering, polarity, and resistor placement independently.</li><li>• Never apply 5 V to a GPIO or connect an output directly to ground or another output.</li><li>• Use a driver and flyback protection for inductive loads.</li><li>• Share ground correctly with compatible externally powered interface circuits.</li><li>• Define the safe state on startup, normal exit, error, and interruption.</li></ul></section>

    <section><h3 className="text-2xl font-bold">Testing plan</h3><div className="mt-5 overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-3">Test</th><th className="p-3">Expected result</th></tr></thead><tbody className="divide-y"><tr><td className="p-3">Program starts</td><td className="p-3">LED remains at the defined initial level</td></tr><tr><td className="p-3">One button press</td><td className="p-3">Exactly one brightness step</td></tr><tr><td className="p-3">Five presses</td><td className="p-3">Cycles through 25%, 50%, 75%, 100%, then 0%</td></tr><tr><td className="p-3">Button held</td><td className="p-3">Does not repeatedly advance as uncontrolled bounce</td></tr><tr><td className="p-3">Ctrl+C</td><td className="p-3">LED turns off and resources close</td></tr></tbody></table></div></section>

    <section className="rounded-2xl bg-slate-900 p-6 text-white"><h3 className="text-2xl font-bold">Hands-on activity</h3><p className="mt-3 leading-7 text-slate-200">Create a labelled pin table and an unpowered wiring diagram, then build and test the button-controlled dimmer. Record the observed brightness at every duty level. Change <code>bounce_time</code> carefully and compare behaviour. Extend the program with a second LED that indicates when brightness is 75% or higher.</p></section>
    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6"><h3 className="text-xl font-bold text-blue-900">Chapter completion checklist</h3><p className="mt-3 leading-7 text-blue-800">Complete the LED and button activity, explain pull resistors, bounce, PWM and driver requirements, review the uploaded video/PDF when available, and score at least 80% below.</p></section>
  </article><ChapterQuiz/></>;
}

function ChapterQuiz(){const [answers,setAnswers]=useState({});const [submitted,setSubmitted]=useState(false);const score=useMemo(()=>questions.reduce((n,q,i)=>n+(answers[i]===q.answer?1:0),0),[answers]);const complete=Object.keys(answers).length===questions.length;const passed=score>=8;const reset=()=>{setAnswers({});setSubmitted(false)};return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30}/><div><h2 className="text-2xl font-bold">Chapter 5 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((q,i)=><fieldset key={q.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{i+1}. {q.question}</legend><div className="mt-3 space-y-2">{q.options.map((o,j)=>{const selected=answers[i]===j;const correct=submitted&&j===q.answer;const incorrect=submitted&&selected&&j!==q.answer;return <label key={o} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct?"border-green-300 bg-green-50":incorrect?"border-red-300 bg-red-50":selected?"border-blue-400 bg-blue-50":"border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`pi-ch5-${i}`} checked={selected} disabled={submitted} onChange={()=>setAnswers(a=>({...a,[i]:j}))} className="mt-1"/><span>{o}</span></label>})}</div></fieldset>)}</div>{!submitted?<button disabled={!complete} onClick={()=>setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button>:<div className={`mt-6 rounded-2xl border p-6 ${passed?"border-green-300 bg-green-50":"border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed?<CheckCircle2 className="text-green-700"/>:<XCircle className="text-red-700"/>}<div><h3 className="text-xl font-bold">{passed?"Chapter quiz passed":"Review the lesson and try again"}</h3><p>You scored {score}/10 ({score*10}%).</p></div></div><button onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18}/> Retake Quiz</button></div>}</section>}

function Card({icon:Icon,title,text}){return <div className="rounded-2xl border border-slate-200 bg-white p-5"><Icon className="text-blue-600" size={26}/><h4 className="mt-3 font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>}
function Duty({value,text}){return <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5 text-center"><p className="text-3xl font-bold text-purple-700">{value}</p><p className="mt-2 text-slate-600">{text}</p></div>}

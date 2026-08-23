import { useMemo, useState } from "react";
import { Braces, CheckCircle2, CircleHelp, Code2, FileText, FunctionSquare, Package, RotateCcw, ShieldAlert, Terminal, XCircle } from "lucide-react";

const fundamentalsCode = `project_name = "Raspberry Pi Monitor"
sample_interval = 5
enabled = True
temperatures = [46.2, 47.1, 49.0, 48.4]

average = sum(temperatures) / len(temperatures)

if enabled and average >= 70:
    status = "ALERT"
elif enabled and average >= 60:
    status = "WARNING"
else:
    status = "NORMAL"

for index, value in enumerate(temperatures, start=1):
    print(f"Sample {index}: {value:.1f} C")

print(f"{project_name}: {average:.1f} C — {status}")`;

const monitorCode = `from datetime import datetime
from pathlib import Path
from time import sleep

THERMAL_FILE = Path("/sys/class/thermal/thermal_zone0/temp")
LOG_FILE = Path.home() / "projects" / "chapter-4" / "temperature.csv"

def read_cpu_temperature():
    """Return CPU temperature in Celsius."""
    raw_value = THERMAL_FILE.read_text(encoding="utf-8").strip()
    return int(raw_value) / 1000

def classify_temperature(value):
    if value >= 80:
        return "HOT"
    if value >= 70:
        return "WARM"
    return "NORMAL"

def append_reading(timestamp, temperature, status):
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    new_file = not LOG_FILE.exists()
    with LOG_FILE.open("a", encoding="utf-8") as log:
        if new_file:
            log.write("timestamp,temperature_c,status\\n")
        log.write(f"{timestamp},{temperature:.1f},{status}\\n")

def main():
    print("Press Ctrl+C to stop safely.")
    try:
        while True:
            temperature = read_cpu_temperature()
            timestamp = datetime.now().isoformat(timespec="seconds")
            status = classify_temperature(temperature)
            append_reading(timestamp, temperature, status)
            print(f"{timestamp} | {temperature:.1f} C | {status}")
            sleep(5)
    except KeyboardInterrupt:
        print("\\nMonitoring stopped.")
    except (OSError, ValueError) as error:
        print(f"Unable to read or save data: {error}")

if __name__ == "__main__":
    main()`;

const questions = [
  { question: "Why is indentation important in Python?", options: ["It defines code blocks", "It changes GPIO voltage", "It installs packages", "It names the computer"], answer: 0 },
  { question: "Which Python type stores an ordered, mutable collection?", options: ["tuple", "list", "bool", "None"], answer: 1 },
  { question: "What does a function provide?", options: ["A reusable named block of behaviour", "A physical GPIO driver", "A storage partition", "An operating system"], answer: 0 },
  { question: "What does range(3) produce for a loop?", options: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "Only 3"], answer: 1 },
  { question: "Why use a with statement when opening a file?", options: ["It manages closing the file even when the block exits", "It gives unlimited permissions", "It prevents every error", "It converts Python to C"], answer: 0 },
  { question: "What is the purpose of try/except?", options: ["Handle expected runtime errors deliberately", "Repeat forever", "Create a network", "Format storage"], answer: 0 },
  { question: "What is a Python virtual environment used for?", options: ["Isolate a project's Python packages", "Increase board voltage", "Cool the processor", "Replace the kernel"], answer: 0 },
  { question: "What does f\"{temperature:.1f}\" do?", options: ["Formats the value with one digit after the decimal", "Reads GPIO 1", "Creates a file automatically", "Installs a module"], answer: 0 },
  { question: "Why is if __name__ == \"__main__\" useful?", options: ["It runs main code when the file is executed directly", "It grants root access", "It disables imports", "It declares a GPIO input"], answer: 0 },
  { question: "Which practice improves a Python hardware project?", options: ["Use meaningful names, small functions, validation, and safe cleanup", "Ignore exceptions", "Run every command with sudo", "Hard-code every secret"], answer: 0 },
];

export default function RaspberryPiChapterFourLesson() {
  return <><article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
    <header><p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 4</p><h2 className="mt-2 text-3xl font-bold text-slate-900">Python Programming on Raspberry Pi</h2><p className="mt-4 leading-8 text-slate-600">Python is widely used on Raspberry Pi because it is readable, expressive, and supported by libraries for files, networking, GPIO, sensors, automation, and computer vision. This chapter builds the programming foundation needed to create reliable Pi applications rather than isolated code fragments.</p></header>

    <section><h3 className="text-2xl font-bold">Learning objectives</h3><ul className="mt-4 grid gap-3 md:grid-cols-2">{["Run Python interactively and execute saved scripts.", "Use variables, core data types, operators, and formatted strings.", "Control program flow with conditions and loops.", "Organise data with lists, tuples, dictionaries, and sets.", "Design reusable functions and import standard modules.", "Read and write files, handle errors, and isolate dependencies."].map(item=><li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}</ul></section>

    <section className="rounded-2xl bg-blue-50 p-6"><div className="flex items-center gap-3"><Terminal className="text-blue-700"/><h3 className="text-2xl font-bold">Python development workflow</h3></div><ol className="mt-5 space-y-3">{["Create a dedicated project directory inside your home folder.", "Create and activate a virtual environment when third-party packages are needed.", "Write a small script using a text editor or IDE.", "Run it with python3 and read the complete error message if it fails.", "Test individual functions with known inputs before connecting hardware.", "Store dependencies and documentation with the project."].map((item,i)=><li key={item} className="flex gap-4 rounded-xl bg-white p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{i+1}</span><span>{item}</span></li>)}</ol><pre className="mt-5 overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-7 text-cyan-200"><code>{`mkdir -p ~/projects/chapter-4
cd ~/projects/chapter-4
python3 -m venv .venv
source .venv/bin/activate
python3 --version`}</code></pre></section>

    <section><div className="flex items-center gap-3"><Braces className="text-indigo-700"/><h3 className="text-2xl font-bold">Variables, values and collections</h3></div><div className="mt-5 overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-3">Type</th><th className="p-3">Example</th><th className="p-3">Use</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">int / float</td><td className="p-3 font-mono">17 / 23.6</td><td className="p-3">Counts and measured numeric values</td></tr><tr><td className="p-3 font-semibold">str</td><td className="p-3 font-mono">\"sensor-1\"</td><td className="p-3">Text, labels, paths, and messages</td></tr><tr><td className="p-3 font-semibold">bool</td><td className="p-3 font-mono">True</td><td className="p-3">On/off and yes/no state</td></tr><tr><td className="p-3 font-semibold">list</td><td className="p-3 font-mono">[21.4, 22.0]</td><td className="p-3">Ordered, mutable sequence</td></tr><tr><td className="p-3 font-semibold">tuple</td><td className="p-3 font-mono">(17, \"output\")</td><td className="p-3">Ordered fixed grouping</td></tr><tr><td className="p-3 font-semibold">dict</td><td className="p-3 font-mono">{`{"pin": 17}`}</td><td className="p-3">Key–value configuration or records</td></tr><tr><td className="p-3 font-semibold">set</td><td className="p-3 font-mono">{`{"ok", "warn"}`}</td><td className="p-3">Unique unordered values</td></tr></tbody></table></div></section>

    <section><div className="flex items-center gap-3"><Code2 className="text-emerald-700"/><h3 className="text-2xl font-bold">Conditions, loops and formatted output</h3></div><p className="mt-3 leading-7 text-slate-600">Python uses indentation to define blocks. Conditions choose a path, while loops repeat work. Use descriptive names and keep measurement units visible.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{fundamentalsCode}</code></pre></section>

    <section><div className="flex items-center gap-3"><FunctionSquare className="text-purple-700"/><h3 className="text-2xl font-bold">Functions and modules</h3></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Card icon={FunctionSquare} title="Single responsibility" text="Give each function one clear job, meaningful parameters, a useful return value, and a short docstring when needed."/><Card icon={Package} title="Modules" text="Import reusable code from Python's standard library, installed packages, or your own project files."/><Card icon={Braces} title="Inputs and outputs" text="Validate values at boundaries and return data instead of relying unnecessarily on global state."/><Card icon={Code2} title="Main entry point" text="Place application startup in main() and guard it with if __name__ == '__main__'."/></div></section>

    <section><div className="flex items-center gap-3"><FileText className="text-orange-700"/><h3 className="text-2xl font-bold">Files and exception handling</h3></div><p className="mt-4 leading-8 text-slate-600">Use <code>pathlib.Path</code> for readable paths and <code>with</code> blocks so files are closed correctly. Catch only errors the program can handle meaningfully. Record the error and leave outputs in a safe state rather than hiding every exception.</p><div className="mt-5 grid gap-4 md:grid-cols-2"><Card icon={FileText} title="Text and CSV" text="Simple formats suit logs and small datasets. Write a header and include timestamps and units."/><Card icon={ShieldAlert} title="Exceptions" text="Handle expected OSError, ValueError, timeout, or device errors at the appropriate boundary."/></div></section>

    <section><div className="flex items-center gap-3"><Terminal className="text-emerald-700"/><h3 className="text-2xl font-bold">Practical program: CPU temperature logger</h3></div><p className="mt-3 leading-7 text-slate-600">This Raspberry Pi OS example reads the Linux thermal interface, classifies the temperature, appends timestamped CSV data, and handles user cancellation and common file/value errors.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{monitorCode}</code></pre></section>

    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-amber-700"/><h3 className="text-xl font-bold">Programming good practice</h3></div><ul className="mt-4 space-y-2 text-slate-700"><li>• Do not run ordinary scripts as root; use only the permissions actually required.</li><li>• Never hard-code passwords, API keys, or private tokens into source files.</li><li>• Validate sensor values before acting and define a safe response for missing data.</li><li>• Avoid broad <code>except:</code> blocks that silently hide programming errors.</li><li>• Use monotonic timing or appropriate libraries for scheduling rather than busy loops.</li><li>• Back up project files and document Python/package versions.</li></ul></section>

    <section className="rounded-2xl bg-slate-900 p-6 text-white"><h3 className="text-2xl font-bold">Hands-on activity</h3><p className="mt-3 leading-7 text-slate-200">Create a Chapter 4 virtual environment and save the temperature logger as <code>monitor.py</code>. Run it for at least one minute, stop it with Ctrl+C, and inspect the CSV file. Add a function that returns the minimum, maximum, and average of the recorded readings. Test the function with a small known list before using the log data.</p></section>
    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6"><h3 className="text-xl font-bold text-blue-900">Chapter completion checklist</h3><p className="mt-3 leading-7 text-blue-800">Complete the Python examples and logger activity, explain functions and exception handling, review the uploaded video/PDF when available, and score at least 80% below.</p></section>
  </article><ChapterQuiz/></>;
}

function ChapterQuiz(){const [answers,setAnswers]=useState({});const [submitted,setSubmitted]=useState(false);const score=useMemo(()=>questions.reduce((n,q,i)=>n+(answers[i]===q.answer?1:0),0),[answers]);const complete=Object.keys(answers).length===questions.length;const passed=score>=8;const reset=()=>{setAnswers({});setSubmitted(false)};return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30}/><div><h2 className="text-2xl font-bold">Chapter 4 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((q,i)=><fieldset key={q.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{i+1}. {q.question}</legend><div className="mt-3 space-y-2">{q.options.map((o,j)=>{const selected=answers[i]===j;const correct=submitted&&j===q.answer;const incorrect=submitted&&selected&&j!==q.answer;return <label key={o} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct?"border-green-300 bg-green-50":incorrect?"border-red-300 bg-red-50":selected?"border-blue-400 bg-blue-50":"border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`pi-ch4-${i}`} checked={selected} disabled={submitted} onChange={()=>setAnswers(a=>({...a,[i]:j}))} className="mt-1"/><span>{o}</span></label>})}</div></fieldset>)}</div>{!submitted?<button disabled={!complete} onClick={()=>setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button>:<div className={`mt-6 rounded-2xl border p-6 ${passed?"border-green-300 bg-green-50":"border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed?<CheckCircle2 className="text-green-700"/>:<XCircle className="text-red-700"/>}<div><h3 className="text-xl font-bold">{passed?"Chapter quiz passed":"Review the lesson and try again"}</h3><p>You scored {score}/10 ({score*10}%).</p></div></div><button onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18}/> Retake Quiz</button></div>}</section>}

function Card({icon:Icon,title,text}){return <div className="rounded-2xl border border-slate-200 bg-white p-5"><Icon className="text-blue-600" size={26}/><h4 className="mt-3 font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>}

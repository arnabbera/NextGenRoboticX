import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, CircleHelp, Cpu, Gauge, HardDrive, Lightbulb, Radio, RotateCcw, ShieldCheck, Terminal, Usb, Wifi, Wrench, XCircle, Zap } from "lucide-react";

const questions = [
  { question: "Which wireless capabilities are commonly integrated into an ESP32?", options: ["Wi-Fi and Bluetooth", "Only satellite radio", "Only Ethernet", "No wireless communication"], answer: 0 },
  { question: "What is the normal logic voltage of ESP32 GPIO?", options: ["12 V", "5 V", "3.3 V", "24 V"], answer: 2 },
  { question: "Why should 5 V not be applied directly to a normal ESP32 GPIO pin?", options: ["It can exceed the pin rating and damage the device", "It makes Wi-Fi faster", "It erases the Arduino IDE", "It improves ADC accuracy"], answer: 0 },
  { question: "Which Arduino sketch function runs once after reset?", options: ["loop()", "setup()", "repeat()", "mainTask()"], answer: 1 },
  { question: "Which Arduino sketch function repeats while the board is running?", options: ["setup()", "install()", "loop()", "upload()"], answer: 2 },
  { question: "What must normally match the connected hardware before uploading?", options: ["Only the editor colour", "Board target and serial port", "Website title", "Cloud database name"], answer: 1 },
  { question: "What is the Serial Monitor mainly used for during development?", options: ["Viewing diagnostic text and exchanging serial data", "Supplying motor power", "Replacing the microcontroller", "Increasing Flash capacity"], answer: 0 },
  { question: "Why are ESP32 strapping pins important?", options: ["Their levels during reset can affect boot mode", "They always output 12 V", "They are only decorative", "They cannot carry digital signals"], answer: 0 },
  { question: "Which practice is best for storing Wi-Fi credentials?", options: ["Publish them in a public repository", "Keep them outside public source code and use a protected configuration method", "Print them on every dashboard", "Use the same default password on all devices"], answer: 1 },
  { question: "What should you check first when an upload fails?", options: ["Correct USB cable, driver, board, port and boot state", "Replace every sensor", "Delete all code", "Increase GPIO voltage"], answer: 0 },
];

const blinkCode = `const int LED_PIN = 2; // Verify the LED pin for your board

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(115200);
  Serial.println("ESP32 started");
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(500);
  digitalWrite(LED_PIN, LOW);
  delay(500);
}`;

const wifiScanCode = `#include <WiFi.h>

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);

  int count = WiFi.scanNetworks();
  Serial.printf("Networks found: %d\\n", count);

  for (int i = 0; i < count; i++) {
    Serial.printf("%2d  %-24s  RSSI %d dBm\\n",
                  i + 1,
                  WiFi.SSID(i).c_str(),
                  WiFi.RSSI(i));
  }

  WiFi.scanDelete();
}

void loop() {}
`;

export default function InternetOfThingsChapterThreeLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header><p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 3</p><h2 className="mt-2 text-3xl font-bold text-slate-900">ESP32 Hardware, Arduino IDE and Development Setup</h2><p className="mt-4 leading-8 text-slate-600">The ESP32 family combines microcontroller processing, digital and analogue peripherals, Wi-Fi and Bluetooth in a low-cost platform suited to connected prototypes. This chapter establishes a safe development environment, explains the board resources that matter to an IoT designer, and guides you through first firmware and wireless diagnostics.</p></header>

        <section><h3 className="text-2xl font-bold">Learning objectives</h3><ul className="mt-4 grid gap-3 md:grid-cols-2">{["Identify the processor, memory, wireless radio, GPIO and peripheral resources of a typical ESP32 board.", "Distinguish the ESP32 chip, module and development board.", "Apply 3.3 V GPIO, power, grounding and current-limit precautions.", "Install ESP32 board support in the Arduino IDE and select the correct target and serial port.", "Build, upload and diagnose a simple sketch using the Serial Monitor.", "Run a Wi-Fi scan without exposing private network credentials."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}</ul></section>

        <section className="rounded-2xl bg-blue-50 p-6"><div className="flex items-center gap-3"><Cpu className="text-blue-700" /><h3 className="text-2xl font-bold text-blue-950">Why ESP32 for IoT?</h3></div><p className="mt-4 leading-8 text-slate-700">An ESP32 can read sensors, control outputs, process data locally and communicate wirelessly without requiring a separate Wi-Fi module. Different ESP32 variants provide different processors, memory, radios and peripherals, so always confirm the exact module and development-board documentation.</p><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3"><Feature icon={Cpu} title="Processing" text="A capable 32-bit microcontroller platform for event handling, communication and local control." /><Feature icon={Wifi} title="Wi-Fi" text="Connects to local IP networks for HTTP, MQTT, time synchronisation and remote services." /><Feature icon={Radio} title="Bluetooth" text="Supports short-range provisioning, local control and compatible low-energy applications." /><Feature icon={HardDrive} title="Memory" text="On-chip SRAM and external Flash store firmware, variables, buffers and persistent data." /><Feature icon={Gauge} title="Peripherals" text="GPIO, ADC, PWM, timers, UART, I2C and SPI support common sensors and actuators." /><Feature icon={Zap} title="Power modes" text="Active, modem-sleep, light-sleep and deep-sleep options support energy-aware designs." /></div></section>

        <section><h3 className="text-2xl font-bold">Chip, module and development board</h3><div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200"><table className="w-full min-w-[720px] text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-4">Level</th><th className="p-4">Contains</th><th className="p-4">Designer responsibility</th></tr></thead><tbody className="divide-y divide-slate-200 text-slate-700"><CompareRow name="ESP32 chip" contains="Processor, radio and internal peripherals" responsibility="RF, Flash, power, clock and PCB integration require specialist design." /><CompareRow name="ESP32 module" contains="Chip plus Flash, crystal and usually an antenna" responsibility="Follow module power, antenna-clearance and certified-use guidance." /><CompareRow name="Development board" contains="Module plus USB interface, regulator, buttons and headers" responsibility="Verify board pinout, supply path and onboard component connections." /></tbody></table></div></section>

        <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6"><h3 className="text-2xl font-bold text-cyan-950">Board anatomy</h3><div className="mt-5 grid gap-4 md:grid-cols-2"><InfoCard title="USB connector and bridge" text="Provides programming and serial communication. Some boards use native USB; others use a USB-to-UART bridge that may need a driver." /><InfoCard title="Voltage regulator" text="Converts the supported board input to 3.3 V. The allowable input and available output current depend on the board design." /><InfoCard title="BOOT and EN buttons" text="BOOT can select download mode on many boards; EN resets or enables the chip. Automatic upload circuitry often controls both." /><InfoCard title="Module and antenna" text="Keep metal, wires and enclosures away from the antenna region when testing wireless range." /><InfoCard title="Header pins" text="Expose power, ground, GPIO and peripheral functions. Labels differ across board models." /><InfoCard title="Indicators" text="A power LED and sometimes a user-addressable LED are fitted, but the LED GPIO is not universal." /></div></section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6"><div className="flex items-center gap-3"><AlertTriangle className="text-red-700" /><h3 className="text-2xl font-bold text-red-950">Electrical and pin safety</h3></div><ul className="mt-4 space-y-3 leading-7 text-red-900"><li>• ESP32 GPIO normally uses <b>3.3 V logic</b> and is generally not 5 V tolerant. Use proper level shifting or voltage division where appropriate.</li><li>• Never power motors, relays, solenoids or high-current LEDs directly from a GPIO pin. Use a driver, protection components and a suitable external supply.</li><li>• Join grounds between interfacing low-voltage circuits unless isolation is intentionally designed.</li><li>• Check input-only pins, reserved Flash pins and pins connected to onboard hardware before assignment.</li><li>• Some strapping pins influence boot mode during reset. External pull-ups, pull-downs or loads can prevent normal startup.</li><li>• Disconnect power before rewiring and verify polarity with a meter before reconnecting.</li></ul></section>

        <section><div className="flex items-center gap-3"><Usb className="text-indigo-700" /><h3 className="text-2xl font-bold">Install and configure the Arduino IDE</h3></div><ol className="mt-5 space-y-3">{["Install the current Arduino IDE from its official source.", "Open Preferences and add Espressif's official ESP32 Boards Manager package URL if it is not already available.", "Open Boards Manager, search for ESP32 and install the package published by Espressif Systems.", "Connect the development board using a USB data cable—not a charge-only cable.", "Select the board model or a compatible generic ESP32 target under Tools → Board.", "Select the serial device under Tools → Port and keep the default upload settings initially.", "Compile a small example before upload; open Serial Monitor at the baud rate used by the sketch."].map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-slate-200 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">{index + 1}</span><span>{item}</span></li>)}</ol></section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white"><div className="flex items-center gap-3"><Terminal className="text-cyan-300" /><h3 className="text-2xl font-bold">Sketch structure and first upload</h3></div><p className="mt-4 leading-8 text-slate-200"><code>setup()</code> executes once after boot or reset; use it to configure pins, serial communication and services. <code>loop()</code> runs repeatedly; it should perform ongoing work without blocking important networking or control for unnecessarily long periods.</p><CodeBlock code={blinkCode} /><p className="mt-4 leading-7 text-slate-200">Compile first, confirm the correct board and port, then upload. The onboard LED pin varies; modify <code>LED_PIN</code> according to the board documentation.</p></section>

        <section><h3 className="text-2xl font-bold">Build, upload and boot sequence</h3><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4"><Step number="1" title="Compile" text="Source and libraries are converted into firmware for the selected ESP32 target." /><Step number="2" title="Enter loader" text="The board resets into its serial download mode automatically or with BOOT/EN assistance." /><Step number="3" title="Transfer" text="The tool writes the firmware image into Flash and verifies the operation." /><Step number="4" title="Run" text="The board resets, loads the application and prints diagnostics through serial output." /></div></section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-center gap-3"><Wrench className="text-amber-700" /><h3 className="text-2xl font-bold text-amber-950">Upload troubleshooting</h3></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Trouble symptom="No serial port" checks="Use a known data cable, try another USB port, inspect Device Manager and install the correct bridge driver if required." /><Trouble symptom="Failed to connect" checks="Confirm board and port, close other serial programs, hold BOOT during connection if required, then reset and retry." /><Trouble symptom="Unreadable serial text" checks="Match Serial Monitor baud rate to Serial.begin(), reset the board and inspect boot messages separately." /><Trouble symptom="Repeated resets" checks="Check supply stability, USB cable, external loads, watchdog messages and incorrect strapping-pin connections." /></div></section>

        <section className="rounded-2xl border border-violet-200 bg-violet-50 p-6"><div className="flex items-center gap-3"><Wifi className="text-violet-700" /><h3 className="text-2xl font-bold text-violet-950">Wireless diagnostic: scan nearby Wi-Fi networks</h3></div><p className="mt-3 leading-8 text-violet-900">A scan confirms that the radio, board package and serial output work without connecting to a network or storing a password.</p><CodeBlock code={wifiScanCode} light /><p className="mt-3 text-sm leading-6 text-violet-900">RSSI is received signal strength in dBm. Values closer to zero generally indicate a stronger received signal. Do not publish nearby private network names in screenshots or logs.</p></section>

        <section><h3 className="text-2xl font-bold">Project organisation for connected firmware</h3><div className="mt-5 grid gap-4 md:grid-cols-2"><InfoCard title="Configuration" text="Keep board pin assignments, sampling intervals and environment settings clearly separated from application logic." /><InfoCard title="Credentials" text="Do not commit Wi-Fi passwords, tokens or private keys. Use ignored local configuration for development and secure provisioning for devices." /><InfoCard title="Diagnostics" text="Print clear startup, connection and error messages without exposing secrets. Include state and failure reason." /><InfoCard title="Non-blocking design" text="Avoid long delays as the project grows. Use time-based state machines so sensing, networking and control can progress cooperatively." /></div></section>

        <section className="rounded-2xl bg-indigo-50 p-6"><div className="flex items-center gap-3"><Lightbulb className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Hands-on laboratory</h3></div><p className="mt-3 leading-8 text-indigo-900">Set up one ESP32 board, upload the LED/serial sketch, run the Wi-Fi scan and produce a short commissioning record.</p><div className="mt-5 grid gap-3 md:grid-cols-2">{["Record the exact board and ESP32 module marking.", "Identify USB interface, regulator, antenna, BOOT, EN, 3V3 and GND.", "Save the selected Arduino board target and serial port.", "Upload the blink sketch and capture the serial startup message.", "Run a Wi-Fi scan and compare RSSI from two board positions.", "Document one upload fault, its evidence and the corrective action."].map((item) => <div key={item} className="flex gap-3 rounded-xl bg-white p-4"><CheckCircle2 className="mt-0.5 shrink-0 text-indigo-600" size={20} /><span>{item}</span></div>)}</div></section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><div className="flex items-center gap-3"><ShieldCheck className="text-emerald-700" /><h3 className="text-xl font-bold text-emerald-950">Commissioning checklist</h3></div><ul className="mt-4 space-y-2 leading-7 text-emerald-900"><li>• Exact board, module and pinout identified.</li><li>• Power source and 3.3 V GPIO limits confirmed.</li><li>• Development package, board target and serial port recorded.</li><li>• Build, upload, reset and Serial Monitor tested.</li><li>• No private credentials stored in public code.</li><li>• External circuits disconnected or verified before first power-up.</li></ul></section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6"><h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3><ul className="mt-4 space-y-2 leading-7 text-blue-900"><li>• ESP32 integrates processing, peripherals and wireless connectivity for connected devices.</li><li>• Chip, module and development board describe different integration levels.</li><li>• ESP32 GPIO operates at 3.3 V; pin capabilities and boot-strapping roles must be checked.</li><li>• Correct board target, serial port, USB path and boot state are essential for upload.</li><li>• Serial diagnostics and small hardware tests should be proven before cloud integration.</li></ul></section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><h3 className="text-xl font-bold text-emerald-950">Chapter completion checklist</h3><p className="mt-3 leading-7 text-emerald-900">Identify the board resources, explain 3.3 V safety, configure the Arduino IDE, upload the first sketch, run and interpret a Wi-Fi scan, complete the commissioning record and score at least 80% in the quiz.</p></section>
      </article>
      <ChapterQuiz />
    </>
  );
}

function ChapterQuiz() {
  const [answers, setAnswers] = useState({}); const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);
  const complete = Object.keys(answers).length === questions.length; const passed = score >= 8; const reset = () => { setAnswers({}); setSubmitted(false); };
  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 3 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[index] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`iot-ch3-${index}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function Feature({ icon: Icon, title, text }) { return <div className="rounded-2xl border border-blue-200 bg-white p-5"><Icon className="text-blue-700" size={27} /><h4 className="mt-3 text-lg font-bold">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function InfoCard({ title, text }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function CompareRow({ name, contains, responsibility }) { return <tr><th className="p-4 font-bold text-slate-900">{name}</th><td className="p-4">{contains}</td><td className="p-4">{responsibility}</td></tr>; }
function CodeBlock({ code, light = false }) { return <pre className={`mt-5 overflow-x-auto rounded-2xl p-5 text-sm leading-7 ${light ? "bg-white text-slate-800" : "bg-black/40 text-cyan-100"}`}><code>{code}</code></pre>; }
function Step({ number, title, text }) { return <div className="rounded-2xl border border-slate-200 p-5"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">{number}</span><h4 className="mt-3 font-bold">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function Trouble({ symptom, checks }) { return <div className="rounded-2xl bg-white p-5"><h4 className="font-bold text-amber-950">{symptom}</h4><p className="mt-2 leading-7 text-slate-700">{checks}</p></div>; }

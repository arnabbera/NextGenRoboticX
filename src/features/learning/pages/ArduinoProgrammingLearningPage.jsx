import { useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Code2,
  Cpu,
  Download,
  Lightbulb,
  PlayCircle,
  RotateCcw,
  ShieldAlert,
  Usb,
  XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { courseContent } from "../../courses/data/courseContent";
import ChapterSidebar from "../components/ChapterSidebar";
import ChapterVideoManager from "../components/ChapterVideoManager";
import LessonHeader from "../components/LessonHeader";

const chapters = courseContent["arduino-programming"]?.chapters || [];

export default function ArduinoProgrammingLearningPage() {
  const { chapterSlug } = useParams();
  const requestedChapter = Number(String(chapterSlug || "chapter-1").replace("chapter-", ""));
  const chapter = chapters.find((item) => item.id === requestedChapter) || chapters[0];
  const previous = chapters.find((item) => item.id === chapter.id - 1);
  const next = chapters.find((item) => item.id === chapter.id + 1);

  return (
    <div className="min-h-screen bg-slate-100">
      <LessonHeader chapter={chapter.id} lesson={1} chapterTitle={chapter.title} />

      <div className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-3">
            <ChapterSidebar currentChapter={chapter.id} />
          </aside>

          <main className="col-span-12 space-y-6 lg:col-span-9">
            <section className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <PlayCircle className="text-blue-600" size={28} />
                <div>
                  <h2 className="text-2xl font-bold">{chapter.title}</h2>
                  <p className="text-slate-500">Chapter {chapter.id} • {chapter.duration} • Video lesson and study material</p>
                </div>
              </div>
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950 to-blue-950 p-8 text-center text-white">
                <div>
                  <PlayCircle className="mx-auto text-cyan-300" size={64} />
                  <h3 className="mt-5 text-2xl font-bold">Video lesson coming soon</h3>
                  <p className="mt-3 text-cyan-100">The administrator can add the YouTube lesson for this chapter below.</p>
                </div>
              </div>
              <ChapterVideoManager chapter={chapter.id} />
            </section>

            {chapter.id === 1 ? (
              <ArduinoIntroductionLesson />
            ) : chapter.id === 2 ? (
              <ArduinoArchitectureLesson />
            ) : (
              <ChapterPlaceholder chapter={chapter} />
            )}

            <nav className="flex flex-col justify-between gap-4 sm:flex-row">
              {previous ? (
                <Link to={chapterPath(previous.id)} className="inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-3 font-semibold hover:bg-slate-50">
                  <ChevronLeft size={18} /> Chapter {previous.id}: {previous.title}
                </Link>
              ) : <span />}
              {next && (
                <Link to={chapterPath(next.id)} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
                  Chapter {next.id}: {next.title} <ChevronRight size={18} />
                </Link>
              )}
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}

const blinkCode = `const int ledPin = LED_BUILTIN;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);
  delay(1000);
  digitalWrite(ledPin, LOW);
  delay(1000);
}`;

const chapterOneQuestions = [
  { question: "What is Arduino?", options: ["A battery", "An open-source electronics prototyping platform", "Only a programming language", "A mechanical tool"], answer: 1 },
  { question: "Which application is commonly used to write and upload Arduino sketches?", options: ["Arduino IDE", "Calculator", "File Explorer", "Media Player"], answer: 0 },
  { question: "Which function runs once after an Arduino starts or resets?", options: ["loop()", "repeat()", "setup()", "upload()"], answer: 2 },
  { question: "Which function runs repeatedly while the board is powered?", options: ["loop()", "setup()", "pinMode()", "compile()"], answer: 0 },
  { question: "What must normally be selected before uploading a sketch?", options: ["Font and theme", "Board and port", "Speaker volume", "Browser tab"], answer: 1 },
  { question: "What is a sketch in Arduino terminology?", options: ["A circuit drawing only", "An Arduino program", "A board defect", "A power supply"], answer: 1 },
  { question: "What does Verify do in the Arduino IDE?", options: ["Compiles and checks the sketch", "Deletes the sketch", "Powers a motor", "Disconnects USB"], answer: 0 },
  { question: "What does LED_BUILTIN refer to?", options: ["A built-in LED pin definition", "An external battery", "The USB cable", "An analogue sensor"], answer: 0 },
  { question: "Which cable is typically used to upload a sketch to an Arduino Uno?", options: ["A suitable USB data cable", "An audio cable", "An HDMI cable only", "No cable or wireless link"], answer: 0 },
  { question: "What is the safest action before changing circuit wiring?", options: ["Increase voltage", "Disconnect power", "Short 5V to GND", "Touch bare conductors"], answer: 1 },
];

function ArduinoIntroductionLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 1</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Introduction to Arduino and the Arduino IDE</h2>
          <p className="mt-4 leading-8 text-slate-600">
            Arduino is an open-source electronics platform that combines programmable microcontroller boards, development software, and a large ecosystem of sensors and modules. It allows beginners and professionals to turn an idea into a working electronic prototype quickly.
          </p>
        </header>

        <section>
          <h3 className="text-2xl font-bold text-slate-900">Learning objectives</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {["Explain what Arduino is and where it is used.", "Identify the main parts of an Arduino Uno.", "Install and navigate the Arduino IDE.", "Describe the structure of an Arduino sketch.", "Select the correct board and communication port.", "Compile, upload, and test the Blink program."].map((item) => (
              <li key={item} className="rounded-xl border border-slate-200 p-4"><span className="mr-2 font-bold text-emerald-600">✓</span>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><Cpu className="text-blue-700" size={28} /><h3 className="text-2xl font-bold">How Arduino works</h3></div>
          <p className="mt-4 leading-8 text-slate-700">You write instructions on a computer, compile them in the Arduino IDE, and upload the resulting program to the microcontroller through USB. The board then reads inputs, processes decisions, and controls outputs independently.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <LessonFeature icon={Lightbulb} title="Input" text="Buttons, switches, temperature sensors, light sensors, and other devices provide information." />
            <LessonFeature icon={Cpu} title="Process" text="The microcontroller executes the uploaded program and makes decisions." />
            <LessonFeature icon={CheckCircle2} title="Output" text="LEDs, displays, buzzers, relays, servos, and motors perform actions." />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Arduino Uno at a glance</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <LessonFeature icon={Cpu} title="ATmega328P microcontroller" text="The main programmable device that executes your sketch." />
            <LessonFeature icon={Usb} title="USB interface" text="Provides programming communication and can power the board during development." />
            <LessonFeature icon={Lightbulb} title="Digital and analogue pins" text="Connect the board to LEDs, switches, sensors, displays, and control modules." />
            <LessonFeature icon={ShieldAlert} title="Power and reset" text="5V, 3.3V, GND, VIN, and RESET support safe power and program restart." />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Getting started with Arduino IDE</h3>
          <ol className="mt-4 space-y-3">
            {["Download Arduino IDE from the official Arduino website for your operating system.", "Install and launch the application.", "Connect the Arduino board using a data-capable USB cable.", "Open Tools → Board and select your Arduino model.", "Open Tools → Port and select the port assigned to the board.", "Open File → Examples → 01.Basics → Blink.", "Click Verify to compile the sketch, then Upload to program the board."].map((item, index) => (
              <li key={item} className="flex gap-4 rounded-xl bg-slate-50 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span><span>{item}</span></li>
            ))}
          </ol>
        </section>

        <section>
          <div className="flex items-center gap-3"><Code2 className="text-emerald-700" size={28} /><h3 className="text-2xl font-bold">Your first sketch: Blink</h3></div>
          <p className="mt-3 leading-7 text-slate-600"><strong>setup()</strong> runs once and prepares the pin. <strong>loop()</strong> repeats continuously, turning the built-in LED on and off every second.</p>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{blinkCode}</code></pre>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex items-center gap-3"><ShieldAlert className="text-amber-700" size={28} /><h3 className="text-xl font-bold">Safety and good practice</h3></div>
          <ul className="mt-4 space-y-2 text-slate-700"><li>• Disconnect power before changing circuit connections.</li><li>• Never connect 5V directly to GND.</li><li>• Check module voltage and polarity before connection.</li><li>• Use resistors with external LEDs and a driver circuit for motors.</li><li>• Keep liquids and conductive objects away from powered boards.</li></ul>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <h3 className="text-2xl font-bold">Hands-on activity</h3>
          <p className="mt-3 leading-7 text-slate-200">Upload Blink and confirm that the built-in LED flashes. Change both delay values from 1000 ms to 250 ms, upload again, and observe the difference. Explain why the LED flashes faster and identify which part of the program repeats.</p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-center gap-3"><Download className="text-blue-700" /><h3 className="text-xl font-bold">Chapter completion checklist</h3></div>
          <p className="mt-3 text-slate-700">Watch the lesson, complete the Blink activity, review the uploaded PDF study material, and score at least 80% in the quiz below before continuing to Chapter 2.</p>
        </section>
      </article>

      <ChapterOneQuiz />
    </>
  );
}

function ChapterOneQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => chapterOneQuestions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);
  const complete = Object.keys(answers).length === chapterOneQuestions.length;
  const passed = score >= 8;
  const reset = () => { setAnswers({}); setSubmitted(false); };

  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 1 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
      <div className="mt-6 space-y-6">
        {chapterOneQuestions.map((item, questionIndex) => (
          <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5">
            <legend className="px-2 font-bold">{questionIndex + 1}. {item.question}</legend>
            <div className="mt-3 space-y-2">
              {item.options.map((option, optionIndex) => {
                const selected = answers[questionIndex] === optionIndex;
                const correct = submitted && optionIndex === item.answer;
                const incorrect = submitted && selected && optionIndex !== item.answer;
                return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`arduino-chapter-1-${questionIndex}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))} className="mt-1" /><span>{option}</span></label>;
              })}
            </div>
          </fieldset>
        ))}
      </div>
      {!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p className="mt-1">You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
    </section>
  );
}

const diagnosticCode = `void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ; // Wait for the serial connection when required
  }

  Serial.println("Arduino development setup is ready");
  Serial.print("Digital pin count: ");
  Serial.println(NUM_DIGITAL_PINS);
  Serial.print("Analogue input count: ");
  Serial.println(NUM_ANALOG_INPUTS);
}

void loop() {
  Serial.println("Board running normally");
  delay(1000);
}`;

const chapterTwoQuestions = [
  { question: "Which microcontroller is used on the classic Arduino Uno R3?", options: ["ATmega328P", "ESP8266", "RP2040", "8051 only"], answer: 0 },
  { question: "What is the typical clock frequency of the Arduino Uno R3?", options: ["1 MHz", "8 MHz", "16 MHz", "100 MHz"], answer: 2 },
  { question: "Which memory stores the uploaded Arduino program?", options: ["SRAM", "Flash memory", "A USB drive", "Cache only"], answer: 1 },
  { question: "Which memory holds variables while a sketch is running?", options: ["SRAM", "Flash only", "EEPROM only", "The computer hard drive"], answer: 0 },
  { question: "Which Uno pins are used as analogue inputs?", options: ["A0 to A5", "Only pin 13", "VIN and GND", "RESET only"], answer: 0 },
  { question: "What does the tilde (~) beside certain digital pins indicate?", options: ["Ground connection", "PWM capability", "Analogue input only", "A damaged pin"], answer: 1 },
  { question: "Which communication interface is used by Serial.begin(9600)?", options: ["UART serial", "HDMI", "Ethernet only", "VGA"], answer: 0 },
  { question: "What should you select in the IDE before uploading?", options: ["Board and port", "Only text colour", "Screen resolution", "A music file"], answer: 0 },
  { question: "Why must Serial Monitor baud rate match Serial.begin()?", options: ["To display readable data correctly", "To increase board voltage", "To erase flash memory", "To select a sensor"], answer: 0 },
  { question: "Which is a safe practice when connecting modules?", options: ["Ignore voltage ratings", "Power motors directly from an I/O pin", "Verify voltage, polarity, and current requirements", "Short output pins together"], answer: 2 },
];

function ArduinoArchitectureLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 2</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Arduino Board Architecture and Development Setup</h2>
          <p className="mt-4 leading-8 text-slate-600">An Arduino board is a small embedded computer. Understanding its processor, memory, pins, power system, and communication interfaces helps you select correct connections, avoid hardware damage, and write reliable programs.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold">Learning objectives</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {["Describe the functional blocks of an Arduino Uno R3.", "Distinguish Flash, SRAM, and EEPROM.", "Identify digital, analogue, PWM, and power pins.", "Explain UART, I2C, and SPI communication.", "Configure the Arduino IDE, board, and serial port.", "Upload and test a Serial Monitor diagnostic sketch."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><span className="mr-2 font-bold text-emerald-600">✓</span>{item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><Cpu className="text-blue-700" size={28} /><h3 className="text-2xl font-bold">Arduino Uno R3 architecture</h3></div>
          <p className="mt-4 leading-8 text-slate-700">The ATmega328P is the main microcontroller. It executes one instruction stream, works with binary data, reads electrical inputs, and changes outputs according to the uploaded sketch. A 16 MHz clock controls the timing of these operations.</p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left">
              <thead><tr className="bg-slate-900 text-white"><th className="p-3">Resource</th><th className="p-3">Typical Uno R3 capacity</th><th className="p-3">Purpose</th></tr></thead>
              <tbody className="divide-y bg-white"><tr><td className="p-3 font-semibold">Flash</td><td className="p-3">32 KB</td><td className="p-3">Stores the uploaded program.</td></tr><tr><td className="p-3 font-semibold">SRAM</td><td className="p-3">2 KB</td><td className="p-3">Stores active variables and runtime data.</td></tr><tr><td className="p-3 font-semibold">EEPROM</td><td className="p-3">1 KB</td><td className="p-3">Retains small data values after power is removed.</td></tr><tr><td className="p-3 font-semibold">Clock</td><td className="p-3">16 MHz</td><td className="p-3">Provides the timing reference for execution.</td></tr></tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Pins and electrical functions</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <LessonFeature icon={CheckCircle2} title="Digital pins 0–13" text="Read HIGH/LOW inputs or produce HIGH/LOW outputs. Pins marked ~ support PWM." />
            <LessonFeature icon={Lightbulb} title="Analogue inputs A0–A5" text="Measure variable voltage using the microcontroller's analogue-to-digital converter." />
            <LessonFeature icon={Usb} title="Power pins" text="5V, 3.3V, GND, VIN, IOREF, and RESET support power distribution and control." />
            <LessonFeature icon={Cpu} title="Built-in indicators" text="Power, transmit, receive, and pin-13 LEDs help diagnose board and upload activity." />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Communication interfaces</h3>
          <div className="mt-4 space-y-3"><div className="rounded-xl border p-4"><strong>UART:</strong> uses serial transmit and receive signals for communication with a computer or module.</div><div className="rounded-xl border p-4"><strong>I2C:</strong> uses SDA and SCL lines so multiple addressed devices can share one bus.</div><div className="rounded-xl border p-4"><strong>SPI:</strong> uses MOSI, MISO, SCK, and chip-select signals for fast peripheral communication.</div></div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Configure the development environment</h3>
          <ol className="mt-4 space-y-3">
            {["Install the current Arduino IDE and connect the Uno using a USB data cable.", "Select Tools → Board → Arduino AVR Boards → Arduino Uno.", "Select the board's serial port under Tools → Port.", "If a third-party board is used, install its platform through Boards Manager.", "Open a known example and click Verify to test the compiler.", "Click Upload and confirm that the IDE reports a successful upload.", "Open Serial Monitor and select the baud rate used by the sketch."].map((item, index) => <li key={item} className="flex gap-4 rounded-xl bg-slate-50 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span><span>{item}</span></li>)}
          </ol>
        </section>

        <section>
          <div className="flex items-center gap-3"><Code2 className="text-emerald-700" size={28} /><h3 className="text-2xl font-bold">Development setup diagnostic</h3></div>
          <p className="mt-3 leading-7 text-slate-600">Upload this sketch, open Serial Monitor at 9600 baud, and confirm that the status message appears every second.</p>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{diagnosticCode}</code></pre>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-amber-700" size={28} /><h3 className="text-xl font-bold">Troubleshooting and safety</h3></div><ul className="mt-4 space-y-2 text-slate-700"><li>• Use a data-capable USB cable; some charging cables cannot upload.</li><li>• Close other applications that may be using the serial port.</li><li>• Confirm the selected board and port after reconnecting hardware.</li><li>• Do not exceed pin voltage or current limits.</li><li>• Use a separate supply and driver for motors and other high-current loads.</li></ul></section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white"><h3 className="text-2xl font-bold">Hands-on activity</h3><p className="mt-3 leading-7 text-slate-200">Locate the microcontroller, USB interface, reset button, power pins, digital pins, analogue pins, and communication labels on your board. Upload the diagnostic sketch, capture the Serial Monitor output, and explain the difference between Flash, SRAM, and EEPROM.</p></section>
      </article>

      <ChapterTwoQuiz />
    </>
  );
}

function ChapterTwoQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => chapterTwoQuestions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);
  const complete = Object.keys(answers).length === chapterTwoQuestions.length;
  const passed = score >= 8;
  const reset = () => { setAnswers({}); setSubmitted(false); };

  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 2 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
      <div className="mt-6 space-y-6">{chapterTwoQuestions.map((item, questionIndex) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{questionIndex + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[questionIndex] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`arduino-chapter-2-${questionIndex}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}</div>
      {!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p className="mt-1">You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
    </section>
  );
}

function ChapterPlaceholder({ chapter }) {
  return (
    <article className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
      <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter {chapter.id}</p>
      <h2 className="mt-2 text-3xl font-bold text-slate-900">{chapter.title}</h2>
      <p className="mt-4 leading-8 text-slate-600">This chapter is part of the Arduino Programming curriculum. Follow the video lesson, review the downloadable PDF study material, practise the concepts on an Arduino board, and complete the chapter quiz.</p>
      <div className="mt-7 grid gap-4 md:grid-cols-2"><LessonFeature icon={BookOpen} title="Study material" text="Chapter PDF is available here after the administrator uploads it." /><LessonFeature icon={CheckCircle2} title="Chapter quiz" text="A knowledge check is included for this chapter with an 80% pass target." /></div>
    </article>
  );
}

function chapterPath(id) {
  return id === 1
    ? "/courses/arduino-programming/learn"
    : `/courses/arduino-programming/learn/chapter-${id}`;
}

function LessonFeature({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <Icon className="text-blue-600" size={26} />
      <h3 className="mt-3 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600">{text}</p>
    </div>
  );
}

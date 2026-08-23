import { useMemo, useState } from "react";
import { Cable, CheckCircle2, CircleHelp, Code2, Network, RotateCcw, ShieldAlert, Terminal, XCircle } from "lucide-react";

const serialCode = `const int ledPin = LED_BUILTIN;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("Enter ON, OFF or STATUS");
}

void loop() {
  if (Serial.available() > 0) {
    String command = Serial.readStringUntil('\\n');
    command.trim();
    command.toUpperCase();

    if (command == "ON") {
      digitalWrite(ledPin, HIGH);
      Serial.println("LED is ON");
    } else if (command == "OFF") {
      digitalWrite(ledPin, LOW);
      Serial.println("LED is OFF");
    } else if (command == "STATUS") {
      Serial.println(digitalRead(ledPin) == HIGH ? "ON" : "OFF");
    } else {
      Serial.println("Unknown command");
    }
  }
}`;

const i2cScannerCode = `#include <Wire.h>

void setup() {
  Wire.begin();
  Serial.begin(9600);
  Serial.println("I2C scanner ready");
}

void loop() {
  byte deviceCount = 0;

  for (byte address = 1; address < 127; address++) {
    Wire.beginTransmission(address);
    byte result = Wire.endTransmission();

    if (result == 0) {
      Serial.print("Device found at 0x");
      if (address < 16) Serial.print("0");
      Serial.println(address, HEX);
      deviceCount++;
    }
  }

  Serial.print("Devices found: ");
  Serial.println(deviceCount);
  delay(3000);
}`;

const questions = [
  { question: "What does UART communication normally use?", options: ["Transmit and receive lines", "SDA and SCL only", "MOSI only", "An analogue pin only"], answer: 0 },
  { question: "Why must communicating UART devices use compatible baud rates?", options: ["To interpret bit timing correctly", "To increase supply voltage", "To enable PWM", "To erase EEPROM"], answer: 0 },
  { question: "What does Serial.available() report?", options: ["The number of received bytes waiting to be read", "The ADC voltage", "The board clock", "The I2C address"], answer: 0 },
  { question: "Which two logical signals form an I2C bus?", options: ["SDA and SCL", "TX and RX", "MOSI and MISO only", "VIN and GND"], answer: 0 },
  { question: "What identifies an I2C peripheral on a shared bus?", options: ["Its bus address", "Its USB cable colour", "Its PWM duty cycle", "Its sketch name"], answer: 0 },
  { question: "What is the purpose of I2C pull-up resistors?", options: ["Hold open-drain bus lines HIGH when no device pulls them LOW", "Drive a motor", "Store code", "Generate analogue voltage"], answer: 0 },
  { question: "Which library is commonly used for Arduino I2C communication?", options: ["Wire", "Servo only", "EEPROM only", "Keyboard only"], answer: 0 },
  { question: "Which SPI signal carries data from controller to peripheral?", options: ["MOSI", "MISO", "SCL only", "RX only"], answer: 0 },
  { question: "How does an SPI controller usually select one peripheral?", options: ["Using its chip-select line", "Using an I2C address", "Changing the USB port", "Changing ADC reference"], answer: 0 },
  { question: "What connection must communicating modules normally share?", options: ["A compatible common ground", "Unrelated grounds only", "A direct mains wire", "No reference connection"], answer: 0 },
];

export default function ArduinoChapterEightLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header><p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 8</p><h2 className="mt-2 text-3xl font-bold text-slate-900">Serial, I2C and SPI Communication</h2><p className="mt-4 leading-8 text-slate-600">Communication protocols allow an Arduino to exchange commands and data with computers, sensors, displays, memory devices, and other controllers. UART, I2C, and SPI solve different connection problems and use different wiring, addressing, and timing methods.</p></header>

        <section><h3 className="text-2xl font-bold">Learning objectives</h3><ul className="mt-4 grid gap-3 md:grid-cols-2">{["Explain UART transmission, reception, framing, and baud rate.", "Read and process commands through Serial Monitor.", "Describe I2C controller/peripheral roles, addressing, SDA, and SCL.", "Find connected I2C addresses using a scanner sketch.", "Identify SPI MOSI, MISO, SCK, and chip-select signals.", "Choose an appropriate protocol and apply safe wiring practices."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><span className="mr-2 font-bold text-emerald-600">✓</span>{item}</li>)}</ul></section>

        <section className="rounded-2xl bg-blue-50 p-6"><div className="flex items-center gap-3"><Terminal className="text-blue-700" size={28} /><h3 className="text-2xl font-bold">UART and Arduino Serial</h3></div><p className="mt-4 leading-8 text-slate-700">UART sends asynchronous frames without a shared clock line. Each side must use compatible settings, especially baud rate. A typical frame contains a start bit, data bits, optional parity, and stop bit. The Uno's main hardware UART is connected to digital pins 0 (RX) and 1 (TX) and is also used by the USB interface.</p><div className="mt-5 grid gap-4 md:grid-cols-3"><InfoCard title="Serial.begin(9600)" text="Initialises communication at 9600 bits per second." /><InfoCard title="Serial.available()" text="Reports received bytes waiting in the input buffer." /><InfoCard title="Serial.print()" text="Sends text or values for monitoring, debugging, or command responses." /></div></section>

        <section><div className="flex items-center gap-3"><Code2 className="text-emerald-700" size={28} /><h3 className="text-2xl font-bold">Program 1: Serial command controller</h3></div><p className="mt-3 leading-7 text-slate-600">Open Serial Monitor at 9600 baud with a newline ending. Type ON, OFF, or STATUS to control and inspect the built-in LED.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{serialCode}</code></pre><p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">Pins 0 and 1 are shared with USB serial on the Uno. Disconnect conflicting external serial devices while uploading or use an appropriate alternate interface.</p></section>

        <section><div className="flex items-center gap-3"><Network className="text-indigo-700" size={28} /><h3 className="text-2xl font-bold">I2C: addressed two-wire bus</h3></div><p className="mt-4 leading-8 text-slate-600">I2C connects multiple addressed peripherals using SDA for data and SCL for clock. On a classic Uno, SDA and SCL correspond to A4 and A5 and may also be duplicated on labelled header pins. The lines use open-drain/open-collector signalling and require suitable pull-up resistors.</p><div className="mt-5 grid gap-4 md:grid-cols-2"><InfoCard title="Controller" text="Generates the clock, starts transactions, selects an address, and coordinates data transfer." /><InfoCard title="Peripheral" text="Responds when its address is selected and sends or receives bytes as directed." /></div><p className="mt-4 text-slate-600">Two modules with the same fixed address cannot normally share one bus without address configuration, a multiplexer, or a separate bus.</p></section>

        <section><div className="flex items-center gap-3"><Code2 className="text-emerald-700" size={28} /><h3 className="text-2xl font-bold">Program 2: I2C address scanner</h3></div><p className="mt-3 leading-7 text-slate-600">The scanner attempts a short transmission to each normal address and reports devices that acknowledge.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{i2cScannerCode}</code></pre></section>

        <section><div className="flex items-center gap-3"><Cable className="text-orange-600" size={28} /><h3 className="text-2xl font-bold">SPI: synchronous high-speed interface</h3></div><p className="mt-4 leading-8 text-slate-600">SPI commonly uses SCK for clock, MOSI for controller-to-peripheral data, MISO for peripheral-to-controller data, and one chip-select line per peripheral. It can transfer data in both directions during each clock cycle and is often used for displays, memory cards, ADCs, and radio modules.</p><div className="mt-5 overflow-x-auto"><table className="w-full border-collapse text-left"><thead><tr className="bg-slate-900 text-white"><th className="p-3">Protocol</th><th className="p-3">Main signals</th><th className="p-3">Device selection</th><th className="p-3">Typical strength</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">UART</td><td className="p-3">TX, RX</td><td className="p-3">Usually point-to-point</td><td className="p-3">Simple terminal/module links</td></tr><tr><td className="p-3 font-semibold">I2C</td><td className="p-3">SDA, SCL</td><td className="p-3">Address</td><td className="p-3">Many low/medium-speed devices on two wires</td></tr><tr><td className="p-3 font-semibold">SPI</td><td className="p-3">MOSI, MISO, SCK, CS</td><td className="p-3">Chip-select line</td><td className="p-3">Fast short-distance peripheral transfer</td></tr></tbody></table></div></section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-amber-700" size={28} /><h3 className="text-xl font-bold">Wiring and troubleshooting</h3></div><ul className="mt-4 space-y-2 text-slate-700"><li>• Verify every module's logic voltage before connecting signals.</li><li>• Connect a compatible common ground and keep bus wires reasonably short.</li><li>• Cross UART TX to RX and RX to TX; do not connect two driven outputs together.</li><li>• Confirm I2C addresses, pull-ups, and the correct SDA/SCL pins.</li><li>• Match SPI mode, clock rate, bit order, and chip-select behaviour to the peripheral datasheet.</li><li>• Use a logic analyser or oscilloscope when software output alone cannot explain a bus failure.</li></ul></section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white"><h3 className="text-2xl font-bold">Hands-on activity</h3><p className="mt-3 leading-7 text-slate-200">Test the Serial command controller. Then connect a compatible I2C module, run the scanner, and record its hexadecimal address. Identify whether the module already contains pull-up resistors. Finally, prepare a protocol-selection note explaining whether UART, I2C, or SPI is best for a terminal, four environmental sensors, and a high-speed display.</p></section>
      </article>

      <ChapterEightQuiz />
    </>
  );
}

function ChapterEightQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);
  const complete = Object.keys(answers).length === questions.length;
  const passed = score >= 8;
  const reset = () => { setAnswers({}); setSubmitted(false); };
  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 8 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, questionIndex) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{questionIndex + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[questionIndex] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`arduino-chapter-8-${questionIndex}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p className="mt-1">You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function InfoCard({ title, text }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>;
}

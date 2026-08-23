import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, Code2, Cpu, ListChecks, RotateCcw, ShieldAlert, XCircle } from "lucide-react";

const projectCode = `#include <Servo.h>

const byte lightPin = A0, trigPin = 7, echoPin = 6;
const byte buttonPin = 2, ledPin = 9, buzzerPin = 8, servoPin = 10;
Servo gate;

enum Mode { NORMAL, WARNING, ALERT, MANUAL };
Mode mode = NORMAL;
unsigned long lastSample = 0, lastPress = 0;
bool manualMode = false;

float distanceCm() {
  digitalWrite(trigPin, LOW); delayMicroseconds(2);
  digitalWrite(trigPin, HIGH); delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  unsigned long duration = pulseIn(echoPin, HIGH, 30000);
  return duration ? duration * 0.0343 / 2.0 : -1;
}

void applyOutputs(Mode current) {
  digitalWrite(ledPin, current == WARNING || current == ALERT);
  digitalWrite(buzzerPin, current == ALERT);
  gate.write(current == ALERT ? 90 : 0);
}

void setup() {
  pinMode(trigPin, OUTPUT); pinMode(echoPin, INPUT);
  pinMode(buttonPin, INPUT_PULLUP); pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT); gate.attach(servoPin);
  Serial.begin(9600); applyOutputs(NORMAL);
}

void loop() {
  unsigned long now = millis();
  if (digitalRead(buttonPin) == LOW && now - lastPress > 250) {
    manualMode = !manualMode; lastPress = now;
  }

  if (now - lastSample >= 200) {
    lastSample = now;
    int light = analogRead(lightPin);
    float distance = distanceCm();

    if (manualMode) mode = MANUAL;
    else if (distance > 0 && distance < 15) mode = ALERT;
    else if (light < 300) mode = WARNING;
    else mode = NORMAL;

    applyOutputs(mode);
    Serial.print("Light="); Serial.print(light);
    Serial.print(" Distance="); Serial.print(distance);
    Serial.print(" Mode="); Serial.println(mode);
  }
}`;

const questions = [
  ["Why should the final project be divided into input, logic, and output blocks?", "It makes design and testing systematic", "It increases supply voltage", "It removes all wiring", "It replaces the sketch"],
  ["Why is millis() preferred over long delay() calls here?", "It lets multiple tasks remain responsive", "It changes the board clock", "It increases servo current", "It stores PDFs"],
  ["What does a state machine provide?", "Explicit operating modes and transitions", "Unlimited analogue pins", "A power supply", "Automatic wiring"],
  ["Why does pulseIn() use a timeout?", "To avoid waiting forever for a missing echo", "To increase baud rate", "To debounce the button", "To rotate the servo"],
  ["What is the purpose of button debouncing?", "Prevent one press being counted many times", "Measure distance", "Filter mains voltage", "Address I2C"],
  ["Why should modules be tested separately first?", "Faults are easier to isolate", "Libraries become unnecessary", "Ground is not required", "Current becomes unlimited"],
  ["Which test best checks the alert threshold?", "Measure just below and just above 15 cm", "Unplug every sensor", "Change the USB cable only", "Erase the sketch"],
  ["What should happen when an ultrasonic echo is invalid?", "Reject it and continue safely", "Treat it as zero distance automatically", "Apply mains voltage", "Stop Serial forever"],
  ["Why may a servo need a separate suitable supply?", "Its current can exceed the Arduino regulator's capacity", "It uses analogueRead", "It has an I2C address", "It cannot share a signal"],
  ["What belongs in final project documentation?", "Requirements, wiring, code, tests, results, and limitations", "Only the project title", "Only a photograph", "Only the board name"],
].map(([question, ...options]) => ({ question, options, answer: 0 }));

export default function ArduinoChapterTenLesson() {
  return <><article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
    <header><p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 10 • Final Project</p><h2 className="mt-2 text-3xl font-bold text-slate-900">Smart Arduino Automation System</h2><p className="mt-4 leading-8 text-slate-600">Bring the complete course together by designing a responsive automation system that senses light and proximity, selects a safe operating state, drives indicators and a servo, supports manual override, and reports live diagnostic data.</p></header>
    <section><h3 className="text-2xl font-bold">Learning outcomes</h3><ul className="mt-4 grid gap-3 md:grid-cols-2">{["Convert a problem statement into testable requirements.", "Build a modular sense–decide–act architecture.", "Use non-blocking scheduling and a state machine.", "Integrate analogue, pulse, digital, LED, buzzer, and servo interfaces.", "Test thresholds, failure cases, and manual override.", "Document and demonstrate a complete Arduino solution."].map(x => <li key={x} className="rounded-xl border p-4"><b className="mr-2 text-emerald-600">✓</b>{x}</li>)}</ul></section>
    <section className="rounded-2xl bg-blue-50 p-6"><div className="flex items-center gap-3"><Cpu className="text-blue-700"/><h3 className="text-2xl font-bold">Project specification</h3></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Card title="Inputs" text="LDR voltage divider, HC-SR04 ultrasonic sensor, and a pull-up push button for manual override."/><Card title="Outputs" text="Status LED, buzzer, servo-operated gate, and Serial Monitor diagnostics."/><Card title="Automatic behaviour" text="Normal in adequate light; warning in darkness; alert and close the gate when an object is nearer than 15 cm."/><Card title="Manual behaviour" text="A debounced button toggles manual mode without freezing sensor sampling."/></div></section>
    <section><div className="flex items-center gap-3"><ListChecks className="text-indigo-700"/><h3 className="text-2xl font-bold">Build plan</h3></div><ol className="mt-4 space-y-3">{["Draw a block diagram and pin table before wiring.", "Test the LDR, ultrasonic sensor, button, servo, LED, and buzzer independently.", "Connect all grounds correctly; power the servo from a suitable supply when required.", "Upload the integrated sketch and inspect Serial data.", "Calibrate the light threshold and verify the 15 cm boundary.", "Record evidence for every acceptance test and one failure test."].map((x,i)=><li key={x} className="rounded-xl border p-4"><b className="mr-3 text-blue-700">{i+1}.</b>{x}</li>)}</ol></section>
    <section><div className="flex items-center gap-3"><Code2 className="text-emerald-700"/><h3 className="text-2xl font-bold">Complete integrated sketch</h3></div><p className="mt-3 leading-7 text-slate-600">The loop remains responsive by scheduling samples with <code>millis()</code>. Explicit states make the behaviour readable and testable.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{projectCode}</code></pre></section>
    <section><h3 className="text-2xl font-bold">Acceptance tests</h3><div className="mt-4 overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-3">Test</th><th className="p-3">Expected result</th></tr></thead><tbody className="divide-y"><tr><td className="p-3">Bright, object beyond 15 cm</td><td className="p-3">NORMAL; outputs off; gate open</td></tr><tr><td className="p-3">Dark, clear path</td><td className="p-3">WARNING; LED on</td></tr><tr><td className="p-3">Object below 15 cm</td><td className="p-3">ALERT; LED/buzzer on; gate closes</td></tr><tr><td className="p-3">No echo</td><td className="p-3">Invalid reading rejected without lock-up</td></tr><tr><td className="p-3">Button press</td><td className="p-3">One clean manual-mode toggle</td></tr></tbody></table></div></section>
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-amber-700"/><h3 className="text-xl font-bold">Safety and troubleshooting</h3></div><ul className="mt-4 space-y-2 text-slate-700"><li>• Disconnect power before changing wiring; verify voltage and polarity first.</li><li>• Never drive motors, solenoids, or high-current loads directly from an I/O pin.</li><li>• If the board resets when the servo moves, improve the supply and grounding.</li><li>• If readings jump, shorten wiring, average samples, and separate sensor wiring from actuator power.</li><li>• Extend the project with an I2C display, data logging, or configurable thresholds only after the core tests pass.</li></ul></section>
    <section className="rounded-2xl bg-slate-900 p-6 text-white"><h3 className="text-2xl font-bold">Final submission</h3><p className="mt-3 leading-7 text-slate-200">Submit the requirement list, block diagram, labelled connection diagram, commented sketch, five acceptance-test results, photographs or a short demonstration, and a reflection describing one limitation and one future improvement.</p></section>
  </article><Quiz/></>;
}

function Quiz(){const [answers,setAnswers]=useState({});const [submitted,setSubmitted]=useState(false);const score=useMemo(()=>questions.reduce((n,q,i)=>n+(answers[i]===q.answer?1:0),0),[answers]);const passed=score>=8;return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b pb-5"><CircleHelp className="text-blue-600"/><div><h2 className="text-2xl font-bold">Chapter 10 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((q,i)=><fieldset key={q.question} className="rounded-2xl border p-5"><legend className="px-2 font-bold">{i+1}. {q.question}</legend><div className="mt-3 space-y-2">{q.options.map((o,j)=><label key={o} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${submitted&&j===0?"border-green-300 bg-green-50":submitted&&answers[i]===j?"border-red-300 bg-red-50":answers[i]===j?"border-blue-400 bg-blue-50":""}`}><input type="radio" name={`ch10-${i}`} checked={answers[i]===j} disabled={submitted} onChange={()=>setAnswers(a=>({...a,[i]:j}))}/><span>{o}</span></label>)}</div></fieldset>)}</div>{!submitted?<button disabled={Object.keys(answers).length<10} onClick={()=>setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button>:<div className={`mt-6 rounded-2xl border p-6 ${passed?"bg-green-50":"bg-red-50"}`}><div className="flex gap-3">{passed?<CheckCircle2 className="text-green-700"/>:<XCircle className="text-red-700"/>}<div><h3 className="text-xl font-bold">{passed?"Final chapter quiz passed":"Review and try again"}</h3><p>You scored {score}/10 ({score*10}%).</p></div></div><button onClick={()=>{setAnswers({});setSubmitted(false)}} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18}/> Retake Quiz</button></div>}</section>}

function Card({title,text}){return <div className="rounded-2xl border border-blue-200 bg-white p-5"><h4 className="font-bold">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>}

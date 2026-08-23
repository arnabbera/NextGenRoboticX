import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, Code2, Gauge, Monitor, RotateCcw, ShieldAlert, SlidersHorizontal, XCircle, Zap } from "lucide-react";

const projectCode = `from gpiozero import AngularServo, Buzzer, DistanceSensor, LED
from time import sleep
import board
import busio
import adafruit_ssd1306
from PIL import Image, ImageDraw, ImageFont

# HC-SR04 echo MUST reach GPIO24 through a correct 5 V-to-3.3 V interface.
sensor = DistanceSensor(echo=24, trigger=23, max_distance=2)
status_led = LED(17)
buzzer = Buzzer(27)
gate = AngularServo(18, min_angle=0, max_angle=90,
                    min_pulse_width=0.0005, max_pulse_width=0.0025)

i2c = busio.I2C(board.SCL, board.SDA)
display = adafruit_ssd1306.SSD1306_I2C(128, 64, i2c)
image = Image.new("1", (display.width, display.height))
draw = ImageDraw.Draw(image)
font = ImageFont.load_default()

def show_status(distance_cm, state):
    draw.rectangle((0, 0, display.width, display.height), fill=0)
    draw.text((0, 8), "PROXIMITY SYSTEM", font=font, fill=255)
    draw.text((0, 28), f"Distance: {distance_cm:.1f} cm", font=font, fill=255)
    draw.text((0, 46), f"State: {state}", font=font, fill=255)
    display.image(image)
    display.show()

try:
    while True:
        # gpiozero reports distance in metres; collect three samples.
        samples = [sensor.distance * 100 for _ in range(3)]
        distance_cm = sum(samples) / len(samples)

        if distance_cm < 15:
            state = "ALERT"
            status_led.on()
            buzzer.on()
            gate.angle = 90
        elif distance_cm < 40:
            state = "WARNING"
            status_led.on()
            buzzer.off()
            gate.angle = 45
        else:
            state = "CLEAR"
            status_led.off()
            buzzer.off()
            gate.angle = 0

        show_status(distance_cm, state)
        print(f"{distance_cm:.1f} cm | {state}")
        sleep(0.2)
except KeyboardInterrupt:
    print("Stopping safely.")
finally:
    status_led.off()
    buzzer.off()
    gate.angle = 0
    display.fill(0)
    display.show()
    sensor.close(); status_led.close(); buzzer.close(); gate.close()`;

const questions = [
  { question: "Why can a Raspberry Pi not read an analogue voltage directly through ordinary GPIO?", options: ["It has no general-purpose built-in ADC on the GPIO header", "Python cannot use numbers", "GPIO is 12 V", "I2C blocks all inputs"], answer: 0 },
  { question: "What component can add analogue-input capability?", options: ["An external ADC", "An LED resistor only", "An HDMI cable", "A relay coil"], answer: 0 },
  { question: "Why must an HC-SR04-style 5 V echo be interfaced before reaching GPIO?", options: ["Raspberry Pi GPIO is 3.3 V and not generally 5 V tolerant", "It improves sound speed", "It changes I2C address", "It powers the servo"], answer: 0 },
  { question: "What is an advantage of I2C?", options: ["Multiple addressed devices can share SDA and SCL", "It supplies unlimited motor current", "It needs no ground reference", "It is analogue only"], answer: 0 },
  { question: "Why average several sensor readings?", options: ["To reduce some random variation", "To increase GPIO voltage", "To change pin numbering", "To replace calibration"], answer: 0 },
  { question: "What should software do with an impossible sensor value?", options: ["Validate and reject or handle it safely", "Always drive every actuator", "Store it as a password", "Apply 5 V to GPIO"], answer: 0 },
  { question: "Why may a servo need a suitable external supply?", options: ["Its current demand can exceed what the Pi should supply", "It has no control signal", "It uses only I2C", "It cannot share a safe reference"], answer: 0 },
  { question: "What does an I2C address identify?", options: ["A device on the shared bus", "A PWM duty cycle", "A Linux user", "A resistor value"], answer: 0 },
  { question: "What is calibration?", options: ["Relating sensor output to known reference values", "Deleting all samples", "Changing Python indentation", "Increasing power voltage"], answer: 0 },
  { question: "What belongs in actuator cleanup?", options: ["Move outputs to defined safe states and release resources", "Leave the buzzer active", "Disconnect ground in software", "Erase the OS"], answer: 0 },
];

export default function RaspberryPiChapterSixLesson() {
  return <><article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
    <header><p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 6</p><h2 className="mt-2 text-3xl font-bold text-slate-900">Interfacing Sensors, Displays and Actuators</h2><p className="mt-4 leading-8 text-slate-600">A complete Raspberry Pi physical-computing system senses the environment, validates and processes measurements, communicates status, and controls a physical output. Reliable integration depends on logic voltage, signal interface, bus configuration, power capacity, timing, calibration, and safe failure behaviour.</p></header>

    <section><h3 className="text-2xl font-bold">Learning objectives</h3><ul className="mt-4 grid gap-3 md:grid-cols-2">{["Classify digital, pulse, bus-based, and analogue sensors.", "Add analogue measurement through a compatible external ADC.", "Configure I2C or SPI displays and identify device addresses.", "Validate, calibrate, filter, and range-check sensor readings.", "Control LEDs, buzzers, servos, relays, and motors through safe interfaces.", "Integrate sensing, display, decision, and actuation in Python."].map(item=><li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}</ul></section>

    <section className="rounded-2xl bg-blue-50 p-6"><h3 className="text-2xl font-bold">Sense–process–communicate–act</h3><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4"><Stage number="1" title="Sense" text="Acquire a voltage, state, pulse duration, or bus message."/><Stage number="2" title="Process" text="Validate, calibrate, filter, compare, and decide."/><Stage number="3" title="Communicate" text="Show status locally or publish it to another system."/><Stage number="4" title="Act" text="Control an output through correctly rated hardware."/></div></section>

    <section><h3 className="text-2xl font-bold">Sensor interface types</h3><div className="mt-5 overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-3">Interface</th><th className="p-3">Example</th><th className="p-3">Raspberry Pi approach</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">Digital state</td><td className="p-3">PIR, limit switch</td><td className="p-3">GPIO input, pull resistor, debounce</td></tr><tr><td className="p-3 font-semibold">Timed pulse</td><td className="p-3">Ultrasonic echo</td><td className="p-3">GPIO timing/library plus timeout and level interface</td></tr><tr><td className="p-3 font-semibold">Analogue voltage</td><td className="p-3">LDR divider, potentiometer</td><td className="p-3">External ADC such as a compatible SPI/I2C device</td></tr><tr><td className="p-3 font-semibold">Data bus</td><td className="p-3">Temperature sensor, IMU</td><td className="p-3">I2C, SPI, or UART library and configured interface</td></tr></tbody></table></div></section>

    <section><div className="flex items-center gap-3"><SlidersHorizontal className="text-indigo-700"/><h3 className="text-2xl font-bold">Measurement quality</h3></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Card icon={Gauge} title="Calibration" text="Compare readings with known references and derive offset, scale, or a calibration curve."/><Card icon={SlidersHorizontal} title="Filtering" text="A moving average or median can reduce noise, but filtering also adds delay and cannot repair bad wiring."/><Card icon={ShieldAlert} title="Validation" text="Reject impossible values, missing echoes, checksum failures, stale data, and unexpected jumps."/><Card icon={Gauge} title="Units and resolution" text="Document measurement units, conversion formula, meaningful precision, range, and sample interval."/></div></section>

    <section><div className="flex items-center gap-3"><Monitor className="text-purple-700"/><h3 className="text-2xl font-bold">Displays: I2C and SPI</h3></div><p className="mt-4 leading-8 text-slate-600">Small OLED and LCD modules frequently use I2C; larger or faster displays may use SPI. Confirm logic voltage, pinout, dimensions, controller, address or chip-select, and supported library. Enable the required interface in system configuration and verify wiring before scanning a bus.</p><div className="mt-5 grid gap-4 md:grid-cols-2"><Card icon={Monitor} title="I2C" text="Uses SDA and SCL with addressed devices. Pull-ups and voltage compatibility are part of the electrical design."/><Card icon={Monitor} title="SPI" text="Uses clock and separate data lines plus chip-select. It typically offers higher throughput at the cost of more wires."/></div></section>

    <section><div className="flex items-center gap-3"><Zap className="text-orange-700"/><h3 className="text-2xl font-bold">Actuator interfaces</h3></div><div className="mt-5 overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-3">Actuator</th><th className="p-3">Required interface</th><th className="p-3">Protection consideration</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">Indicator LED</td><td className="p-3">GPIO plus series resistor</td><td className="p-3">Pin and total-current limits</td></tr><tr><td className="p-3 font-semibold">Buzzer</td><td className="p-3">Compatible low-current type or transistor driver</td><td className="p-3">Voltage/current and polarity</td></tr><tr><td className="p-3 font-semibold">Servo</td><td className="p-3">Control pulse plus suitable external power</td><td className="p-3">Common reference, current surge, mechanical limits</td></tr><tr><td className="p-3 font-semibold">Motor/solenoid/relay</td><td className="p-3">Rated driver or module</td><td className="p-3">Flyback, isolation, current, heat, load voltage</td></tr></tbody></table></div></section>

    <section className="rounded-2xl border border-red-200 bg-red-50 p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-red-700"/><h3 className="text-xl font-bold">Ultrasonic and servo warning</h3></div><ul className="mt-4 space-y-2 text-slate-700"><li>• Many HC-SR04 modules return a 5 V echo; use a correct divider or logic-level interface before Raspberry Pi GPIO.</li><li>• Power a servo from a suitable supply sized for starting/stall current—not from a GPIO pin.</li><li>• Establish the required common ground without joining incompatible power rails.</li><li>• Keep actuator current paths and switching noise away from sensor and bus wiring.</li><li>• Confirm every module's actual pinout; similar-looking boards may differ.</li></ul></section>

    <section><div className="flex items-center gap-3"><Code2 className="text-emerald-700"/><h3 className="text-2xl font-bold">Integrated project: proximity status system</h3></div><p className="mt-3 leading-7 text-slate-600">The example averages ultrasonic readings, applies three distance states, updates an I2C OLED, and controls an LED, buzzer, and servo. Install the required libraries in the project's virtual environment and verify interfaces and wiring first.</p><pre className="mt-5 overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-7 text-cyan-200"><code>{`python3 -m pip install gpiozero adafruit-circuitpython-ssd1306 pillow`}</code></pre><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{projectCode}</code></pre></section>

    <section><h3 className="text-2xl font-bold">Integration test plan</h3><div className="mt-5 overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-3">Test</th><th className="p-3">Expected result</th></tr></thead><tbody className="divide-y"><tr><td className="p-3">Object beyond 40 cm</td><td className="p-3">CLEAR; outputs off; servo at 0°</td></tr><tr><td className="p-3">Object from 15–40 cm</td><td className="p-3">WARNING; LED on; servo at 45°</td></tr><tr><td className="p-3">Object below 15 cm</td><td className="p-3">ALERT; LED and buzzer on; servo at 90°</td></tr><tr><td className="p-3">OLED disconnected</td><td className="p-3">Controlled diagnostic; no unsafe actuator state</td></tr><tr><td className="p-3">Ctrl+C</td><td className="p-3">Outputs return to defined safe states</td></tr></tbody></table></div></section>

    <section className="rounded-2xl bg-slate-900 p-6 text-white"><h3 className="text-2xl font-bold">Hands-on activity</h3><p className="mt-3 leading-7 text-slate-200">Test the display, distance sensor, LED, buzzer, and servo separately before integration. Record distance readings at 10, 25, 50, and 100 cm and compare them with a ruler. Run the integrated system, document all five acceptance tests, and add one software response for an invalid or unavailable sensor reading.</p></section>
    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6"><h3 className="text-xl font-bold text-blue-900">Chapter completion checklist</h3><p className="mt-3 leading-7 text-blue-800">Complete device-by-device and integrated tests, explain voltage interfacing and actuator power, review the uploaded video/PDF when available, and score at least 80% below.</p></section>
  </article><ChapterQuiz/></>;
}

function ChapterQuiz(){const [answers,setAnswers]=useState({});const [submitted,setSubmitted]=useState(false);const score=useMemo(()=>questions.reduce((n,q,i)=>n+(answers[i]===q.answer?1:0),0),[answers]);const complete=Object.keys(answers).length===questions.length;const passed=score>=8;const reset=()=>{setAnswers({});setSubmitted(false)};return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30}/><div><h2 className="text-2xl font-bold">Chapter 6 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((q,i)=><fieldset key={q.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{i+1}. {q.question}</legend><div className="mt-3 space-y-2">{q.options.map((o,j)=>{const selected=answers[i]===j;const correct=submitted&&j===q.answer;const incorrect=submitted&&selected&&j!==q.answer;return <label key={o} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct?"border-green-300 bg-green-50":incorrect?"border-red-300 bg-red-50":selected?"border-blue-400 bg-blue-50":"border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`pi-ch6-${i}`} checked={selected} disabled={submitted} onChange={()=>setAnswers(a=>({...a,[i]:j}))} className="mt-1"/><span>{o}</span></label>})}</div></fieldset>)}</div>{!submitted?<button disabled={!complete} onClick={()=>setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button>:<div className={`mt-6 rounded-2xl border p-6 ${passed?"border-green-300 bg-green-50":"border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed?<CheckCircle2 className="text-green-700"/>:<XCircle className="text-red-700"/>}<div><h3 className="text-xl font-bold">{passed?"Chapter quiz passed":"Review the lesson and try again"}</h3><p>You scored {score}/10 ({score*10}%).</p></div></div><button onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18}/> Retake Quiz</button></div>}</section>}

function Card({icon:Icon,title,text}){return <div className="rounded-2xl border border-slate-200 bg-white p-5"><Icon className="text-blue-600" size={26}/><h4 className="mt-3 font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>}
function Stage({number,title,text}){return <div className="rounded-2xl border border-blue-200 bg-white p-5"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">{number}</span><h4 className="mt-3 font-bold">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>}

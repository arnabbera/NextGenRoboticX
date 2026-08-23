import { useMemo, useState } from "react";
import { BellRing, CheckCircle2, CircleHelp, ClipboardCheck, Cloud, Code2, Database, Gauge, Network, RotateCcw, ShieldCheck, TestTube2, XCircle } from "lucide-react";

const serviceCode = `import json
import logging
import os
import signal
import time
from pathlib import Path

import paho.mqtt.client as mqtt

DEVICE_ID = os.environ.get("DEVICE_ID", "pi-capstone-01")
BROKER = os.environ["MQTT_BROKER"]
PORT = int(os.environ.get("MQTT_PORT", "8883"))
TOPIC = f"nextgenroboticx/capstone/{DEVICE_ID}/telemetry"
CPU_TEMP = Path("/sys/class/thermal/thermal_zone0/temp")
running = True

logging.basicConfig(level=logging.INFO,
                    format="%(asctime)s %(levelname)s %(message)s")

def stop_service(_signum, _frame):
    global running
    running = False

def read_sensors():
    temperature = int(CPU_TEMP.read_text().strip()) / 1000
    if not -20 <= temperature <= 120:
        raise ValueError("Temperature outside the accepted range")
    return {"cpuTemperatureC": round(temperature, 1)}

signal.signal(signal.SIGTERM, stop_service)
signal.signal(signal.SIGINT, stop_service)

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2,
                     client_id=DEVICE_ID)
client.username_pw_set(os.environ["MQTT_USERNAME"],
                       os.environ["MQTT_PASSWORD"])
client.tls_set()  # verifies the broker certificate by default
client.reconnect_delay_set(min_delay=1, max_delay=60)
client.connect(BROKER, PORT, keepalive=60)
client.loop_start()

try:
    while running:
        try:
            payload = {
                "schemaVersion": 1,
                "deviceId": DEVICE_ID,
                "timestamp": int(time.time()),
                **read_sensors(),
            }
            info = client.publish(TOPIC, json.dumps(payload), qos=1)
            info.wait_for_publish(timeout=10)
            logging.info("Telemetry published")
        except (OSError, ValueError, RuntimeError) as error:
            logging.exception("Measurement cycle failed: %s", error)
        time.sleep(10)
finally:
    client.disconnect()
    client.loop_stop()`;

const systemdCode = `[Unit]
Description=NextGenRoboticX Raspberry Pi Capstone
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=pi-capstone
Group=pi-capstone
EnvironmentFile=/etc/nextgenroboticx/capstone.env
ExecStart=/opt/nextgenroboticx/venv/bin/python /opt/nextgenroboticx/app.py
Restart=on-failure
RestartSec=10
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true

[Install]
WantedBy=multi-user.target`;

const questions = [
  { question: "What should be defined before buying or wiring capstone components?", options: ["Requirements and measurable acceptance criteria", "Dashboard colours only", "A public password", "The final photograph"], answer: 0 },
  { question: "Why divide an IoT solution into sensing, edge, communication, storage, and presentation layers?", options: ["It separates responsibilities and makes design and testing clearer", "It removes all failure modes", "It guarantees internet access", "It replaces documentation"], answer: 0 },
  { question: "What is the safest default when cloud connectivity is lost?", options: ["Continue bounded local monitoring and keep outputs in a defined safe state", "Activate every output", "Delete all logs", "Retry continuously without delay"], answer: 0 },
  { question: "Why include a timestamp and device ID in telemetry?", options: ["To identify the source and when the measurement was produced", "To increase GPIO voltage", "To encrypt the payload", "To calibrate the sensor automatically"], answer: 0 },
  { question: "What does MQTT QoS 1 imply for a receiving application?", options: ["A message may arrive more than once, so processing should be idempotent", "Messages can never be duplicated", "TLS is unnecessary", "The broker stores data forever"], answer: 0 },
  { question: "Where should production broker credentials be stored?", options: ["In protected secret configuration outside source code", "In the public repository", "Inside the MQTT topic", "On the dashboard screenshot"], answer: 0 },
  { question: "What is an integration test for this project?", options: ["Verify sensor reading, service, broker, storage, and dashboard work together", "Check one pure calculation only", "Choose a project name", "Read the component datasheet"], answer: 0 },
  { question: "Why use a dedicated least-privilege service account?", options: ["To limit damage if the application is compromised or faulty", "To make every file writable", "To disable logging", "To avoid authentication"], answer: 0 },
  { question: "Which metric helps identify a growing offline-data problem?", options: ["Queue depth or oldest queued message age", "CSS font size", "HDMI resolution", "SSH banner text"], answer: 0 },
  { question: "What makes a capstone demonstration credible?", options: ["Measured results, failure tests, known limitations, reproducible setup, and evidence", "Claims without tests", "Only a wiring photograph", "Hiding failed cases"], answer: 0 },
];

export default function RaspberryPiChapterTenLesson() {
  return <><article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
    <header><p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 10 • Final Project</p><h2 className="mt-2 text-3xl font-bold text-slate-900">Smart Raspberry Pi IoT System</h2><p className="mt-4 leading-8 text-slate-600">The capstone combines Linux, Python, GPIO and sensors, networking, MQTT or web APIs, data handling, remote operation, and production-minded security. You will design a Smart Environment Monitor and Alert System that measures approved conditions, publishes validated telemetry, records useful health information, raises bounded alerts, and continues safe local operation when services fail.</p></header>

    <section><h3 className="text-2xl font-bold">Learning objectives</h3><ul className="mt-4 grid gap-3 md:grid-cols-2">{["Translate a project idea into requirements, constraints, interfaces, and acceptance criteria.", "Design sensing, edge, communication, storage, dashboard, and alert layers.", "Build a resilient Python service with validation, logging, shutdown, and reconnect behaviour.", "Apply least privilege, TLS, protected secrets, updates, firewall, and data-minimisation controls.", "Test components, integrations, failures, performance, and user acceptance with recorded evidence.", "Package a reproducible demonstration, report, source code, wiring diagram, and operating guide."].map(item=><li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}</ul></section>

    <section className="rounded-2xl bg-blue-50 p-6"><h3 className="text-2xl font-bold">Capstone architecture</h3><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3"><Card icon={Gauge} title="Sense" text="Read temperature, humidity, light, air-quality, door, or other approved sensors with range and freshness validation."/><Card icon={Code2} title="Edge service" text="Schedule measurements, filter noise, calculate state, control safe local indicators, buffer bounded data, and log health."/><Card icon={Network} title="Communicate" text="Publish versioned JSON through authenticated TLS MQTT or a reviewed HTTPS API with retry and backoff."/><Card icon={Database} title="Store" text="Keep timestamped measurements, alerts, device health, and audit events under an explicit retention policy."/><Card icon={Cloud} title="Present" text="Show current status, history, freshness, connectivity, and alert state without exposing secrets or unnecessary personal data."/><Card icon={BellRing} title="Alert" text="Apply threshold, duration, hysteresis, acknowledgement, rate limit, escalation, and recovery rules to reduce alert noise."/></div></section>

    <section><h3 className="text-2xl font-bold">1. Define the problem before the solution</h3><div className="mt-5 overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-3">Requirement</th><th className="p-3">Example acceptance criterion</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">Measurement</td><td className="p-3">Record approved sensor values every 10 seconds with unit, timestamp, status, and device ID</td></tr><tr><td className="p-3 font-semibold">Dashboard</td><td className="p-3">Display the latest reading and visibly mark data stale after 30 seconds</td></tr><tr><td className="p-3 font-semibold">Alert</td><td className="p-3">Raise one alert only after the threshold persists for a defined duration; clear with hysteresis</td></tr><tr><td className="p-3 font-semibold">Offline mode</td><td className="p-3">Continue safe local monitoring and buffer a bounded amount of telemetry during an outage</td></tr><tr><td className="p-3 font-semibold">Security</td><td className="p-3">Use unique credentials, TLS verification, restricted topics/endpoints, protected secrets, and no public development server</td></tr><tr><td className="p-3 font-semibold">Recovery</td><td className="p-3">Restart after a controlled failure and resume publishing without repeating unsafe actions</td></tr></tbody></table></div></section>

    <section><h3 className="text-2xl font-bold">2. Components and interfaces</h3><div className="mt-5 grid gap-4 md:grid-cols-2"><Card icon={Gauge} title="Suggested hardware" text="Raspberry Pi, approved power supply, microSD, one or more compatible sensors, status LED with resistor, optional buzzer through a suitable driver, enclosure, and labelled wiring."/><Card icon={Network} title="Network" text="Authorised Wi-Fi or Ethernet, a TLS MQTT broker or HTTPS service, DNS and time synchronisation, and a documented offline mode."/><Card icon={Database} title="Software" text="Raspberry Pi OS, virtual environment, sensor library, Paho MQTT or HTTP client, structured logging, systemd service, and an approved datastore/dashboard."/><Card icon={ShieldCheck} title="Electrical safety" text="Verify sensor voltage and current, share ground where required, never feed 5 V into GPIO, power off before rewiring, and isolate higher-power loads."/></div></section>

    <section><h3 className="text-2xl font-bold">3. Data contract and alert rules</h3><pre className="mt-5 overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-7 text-cyan-200"><code>{`Topic: nextgenroboticx/capstone/pi-capstone-01/telemetry
{
  "schemaVersion": 1,
  "deviceId": "pi-capstone-01",
  "timestamp": 1787450000,
  "temperatureC": 27.4,
  "humidityPercent": 61.2,
  "status": "normal"
}`}</code></pre><p className="mt-4 leading-8 text-slate-600">Document types, units, valid ranges, required fields, maximum payload size, update frequency, missing-data behaviour, and schema compatibility. An alert should use persistence and hysteresis—for example, alert only after a high value remains for three samples and recover only below a separate lower limit.</p></section>

    <section><div className="flex items-center gap-3"><Code2 className="text-emerald-700"/><h3 className="text-2xl font-bold">4. Resilient telemetry service</h3></div><p className="mt-3 leading-7 text-slate-600">Adapt the sensor-reading function for your approved hardware. This foundation validates data, uses TLS and protected environment credentials, publishes QoS 1 telemetry, logs failures without secrets, handles termination, and disconnects cleanly.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{serviceCode}</code></pre></section>

    <section><h3 className="text-2xl font-bold">5. Run it as a restricted Linux service</h3><p className="mt-3 leading-7 text-slate-600">Create a dedicated account, protect the environment file so only the service can read it, pin and review dependencies, and run from an owned application directory. Test the unit file in the lab before enabling it at boot.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-cyan-200"><code>{systemdCode}</code></pre><pre className="mt-5 overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-7 text-emerald-300"><code>{`sudo systemctl daemon-reload
sudo systemctl enable --now nextgen-capstone.service
sudo systemctl status nextgen-capstone.service
sudo journalctl -u nextgen-capstone.service -f`}</code></pre></section>

    <section className="rounded-2xl border border-red-200 bg-red-50 p-6"><div className="flex items-center gap-3"><ShieldCheck className="text-red-700"/><h3 className="text-xl font-bold">6. Security and privacy review</h3></div><ul className="mt-4 space-y-2 text-slate-700"><li>• Use a dedicated, least-privilege account and topic/API permissions for each device.</li><li>• Verify TLS certificates; rotate protected credentials and never commit them to Git or logs.</li><li>• Patch the OS and dependencies, disable unused services, restrict firewall rules, and secure SSH keys.</li><li>• Validate sensor and remote-command data, bound queues and payloads, rate-limit alerts, and reject stale messages.</li><li>• Collect only required data, define retention and deletion, and avoid cameras or personal data unless explicitly justified and authorised.</li><li>• Document threat assumptions, backups, restore steps, incident response, and the safe state for every controllable output.</li></ul></section>

    <section><div className="flex items-center gap-3"><TestTube2 className="text-purple-700"/><h3 className="text-2xl font-bold">7. Verification plan</h3></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Card icon={ClipboardCheck} title="Unit tests" text="Test conversion, validation, threshold, hysteresis, payload, and retry calculations with normal and boundary values."/><Card icon={Network} title="Integration tests" text="Verify sensor-to-service, broker/API, storage, dashboard, alert, acknowledgement, and recovery interfaces together."/><Card icon={TestTube2} title="Failure tests" text="Disconnect network, stop broker, corrupt a reading, fill the bounded queue, restart the process, and reboot the Pi."/><Card icon={Gauge} title="Performance tests" text="Measure sampling jitter, publish latency, end-to-end delay, CPU, memory, temperature, disk growth, and queue depth."/></div><p className="mt-5 leading-8 text-slate-600">Record the test input, expected result, actual result, evidence, date, environment, and pass/fail status. Fix important defects and repeat the affected tests rather than changing acceptance criteria after observing results.</p></section>

    <section><h3 className="text-2xl font-bold">8. Observability and maintenance</h3><div className="mt-5 grid gap-4 md:grid-cols-2"><Card icon={Gauge} title="Device health" text="Report uptime, application version, last measurement, last successful publish, CPU temperature, disk use, and connectivity state."/><Card icon={Database} title="Data health" text="Monitor freshness, invalid-reading count, missing samples, duplicate IDs, queue depth, oldest queued message, and storage growth."/><Card icon={BellRing} title="Alert health" text="Track alert creation, delivery, acknowledgement, recovery, suppression, and rate-limit events."/><Card icon={Cloud} title="Lifecycle" text="Define update, backup, restore, credential rotation, log retention, dependency review, and decommission procedures."/></div></section>

    <section className="rounded-2xl bg-slate-900 p-6 text-white"><h3 className="text-2xl font-bold">Final project build sequence</h3><ol className="mt-4 space-y-2 text-slate-200"><li>1. Write the use case, constraints, architecture, risk register, data contract, and acceptance criteria.</li><li>2. Draw and independently verify the powered-off connection diagram before wiring.</li><li>3. Validate each sensor and output separately with range checks and safe limits.</li><li>4. Integrate the Python service, local state, MQTT/API, storage, dashboard, and alert logic incrementally.</li><li>5. Apply service hardening, TLS, least privilege, secret protection, firewall, updates, retention, and backups.</li><li>6. Run unit, integration, failure, performance, security, and user-acceptance tests with evidence.</li><li>7. Demonstrate normal operation, alert and recovery, network loss, service restart, and stale-data indication.</li><li>8. Submit source code without secrets, dependency list, wiring diagram, test report, screenshots, operating guide, limitations, and future improvements.</li></ol></section>

    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6"><h3 className="text-xl font-bold text-blue-900">Capstone completion checklist</h3><p className="mt-3 leading-7 text-blue-800">Complete and document the project, demonstrate both normal and failure behaviour, review the uploaded video/PDF when available, submit reproducible evidence without credentials or unnecessary personal data, and score at least 80% below.</p></section>
  </article><ChapterQuiz/></>;
}

function ChapterQuiz(){const [answers,setAnswers]=useState({});const [submitted,setSubmitted]=useState(false);const score=useMemo(()=>questions.reduce((n,q,i)=>n+(answers[i]===q.answer?1:0),0),[answers]);const complete=Object.keys(answers).length===questions.length;const passed=score>=8;const reset=()=>{setAnswers({});setSubmitted(false)};return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30}/><div><h2 className="text-2xl font-bold">Chapter 10 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((q,i)=><fieldset key={q.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{i+1}. {q.question}</legend><div className="mt-3 space-y-2">{q.options.map((o,j)=>{const selected=answers[i]===j;const correct=submitted&&j===q.answer;const incorrect=submitted&&selected&&j!==q.answer;return <label key={o} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct?"border-green-300 bg-green-50":incorrect?"border-red-300 bg-red-50":selected?"border-blue-400 bg-blue-50":"border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`pi-ch10-${i}`} checked={selected} disabled={submitted} onChange={()=>setAnswers(a=>({...a,[i]:j}))} className="mt-1"/><span>{o}</span></label>})}</div></fieldset>)}</div>{!submitted?<button disabled={!complete} onClick={()=>setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button>:<div className={`mt-6 rounded-2xl border p-6 ${passed?"border-green-300 bg-green-50":"border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed?<CheckCircle2 className="text-green-700"/>:<XCircle className="text-red-700"/>}<div><h3 className="text-xl font-bold">{passed?"Capstone quiz passed":"Review the project chapter and try again"}</h3><p>You scored {score}/10 ({score*10}%).</p></div></div><button onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18}/> Retake Quiz</button></div>}</section>}

function Card({icon:Icon,title,text}){return <div className="rounded-2xl border border-slate-200 bg-white p-5"><Icon className="text-blue-600" size={26}/><h4 className="mt-3 font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>}

import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, Cloud, Code2, Database, Network, RotateCcw, Router, ShieldAlert, Webhook, XCircle } from "lucide-react";

const mqttCode = `import json
import os
import ssl
import time
from pathlib import Path
import paho.mqtt.client as mqtt

DEVICE_ID = os.environ.get("DEVICE_ID", "pi-lab-01")
BROKER = os.environ["MQTT_BROKER"]
PORT = int(os.environ.get("MQTT_PORT", "8883"))
USERNAME = os.environ["MQTT_USERNAME"]
PASSWORD = os.environ["MQTT_PASSWORD"]
TOPIC = f"nextgenroboticx/lab/{DEVICE_ID}/telemetry"
THERMAL_FILE = Path("/sys/class/thermal/thermal_zone0/temp")

def read_temperature():
    value = int(THERMAL_FILE.read_text().strip()) / 1000
    if not -20 <= value <= 120:
        raise ValueError("Temperature outside accepted range")
    return round(value, 1)

def on_connect(client, userdata, flags, reason_code, properties):
    print(f"MQTT connected: {reason_code}")

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2,
                     client_id=DEVICE_ID, clean_session=True)
client.username_pw_set(USERNAME, PASSWORD)
client.tls_set(cert_reqs=ssl.CERT_REQUIRED)
client.on_connect = on_connect
client.reconnect_delay_set(min_delay=1, max_delay=60)
client.connect(BROKER, PORT, keepalive=60)
client.loop_start()

try:
    while True:
        payload = {
            "deviceId": DEVICE_ID,
            "timestamp": int(time.time()),
            "cpuTemperatureC": read_temperature(),
        }
        result = client.publish(TOPIC, json.dumps(payload), qos=1, retain=False)
        result.wait_for_publish(timeout=10)
        print(payload)
        time.sleep(10)
except (KeyboardInterrupt, OSError, ValueError) as error:
    print(f"Stopping: {error}")
finally:
    client.disconnect()
    client.loop_stop()`;

const apiCode = `from datetime import datetime, timezone
from pathlib import Path
from flask import Flask, jsonify

app = Flask(__name__)
thermal_file = Path("/sys/class/thermal/thermal_zone0/temp")

@app.get("/api/status")
def status():
    temperature = int(thermal_file.read_text().strip()) / 1000
    return jsonify({
        "status": "ok",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "cpuTemperatureC": round(temperature, 1),
    })

if __name__ == "__main__":
    # Local lab only. Use a production server and reviewed security for deployment.
    app.run(host="127.0.0.1", port=5000, debug=False)`;

const questions = [
  { question: "What is the role of an MQTT broker?", options: ["Receive and route messages between publishers and subscribers", "Supply motor current", "Format GPIO pins", "Replace DNS"], answer: 0 },
  { question: "What identifies an MQTT message channel?", options: ["A topic", "A resistor", "An HDMI port", "A filesystem owner"], answer: 0 },
  { question: "What does MQTT QoS 1 provide?", options: ["At least once delivery", "Exactly once under every failure", "No acknowledgement", "Encryption by itself"], answer: 0 },
  { question: "What does a retained MQTT message do?", options: ["Gives a new subscriber the broker's last retained value for that topic", "Stores every message forever", "Creates TLS", "Changes the device ID"], answer: 0 },
  { question: "Which HTTP method is normally used to retrieve a resource without modifying it?", options: ["GET", "DELETE", "PATCH", "POST only"], answer: 0 },
  { question: "What is JSON?", options: ["A structured text data-interchange format", "A GPIO voltage", "A network cable", "An SSH private key"], answer: 0 },
  { question: "Why use TLS with MQTT or HTTP?", options: ["Protect traffic confidentiality and integrity and authenticate the server", "Increase GPIO current", "Replace validation", "Avoid all passwords"], answer: 0 },
  { question: "Where should API and broker secrets be kept?", options: ["Outside source code in protected configuration or secret storage", "In a public repository", "In topic names", "In screenshots"], answer: 0 },
  { question: "Why validate incoming commands and telemetry?", options: ["Untrusted or faulty data may be unsafe or malformed", "JSON is always correct", "TLS validates sensor range", "MQTT removes errors"], answer: 0 },
  { question: "What should an IoT client do after a network interruption?", options: ["Reconnect with controlled backoff and preserve safe local behaviour", "Retry continuously with no delay", "Disable authentication", "Drive all outputs active"], answer: 0 },
];

export default function RaspberryPiChapterEightLesson() {
  return <><article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
    <header><p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 8</p><h2 className="mt-2 text-3xl font-bold text-slate-900">IoT Communication with MQTT and Web APIs</h2><p className="mt-4 leading-8 text-slate-600">IoT applications move measurements, events, commands, and configuration between devices and services. Raspberry Pi can publish lightweight MQTT telemetry, subscribe to approved commands, and expose or consume HTTP APIs. A production design must also address identity, encryption, authorisation, validation, reliability, and safe offline behaviour.</p></header>

    <section><h3 className="text-2xl font-bold">Learning objectives</h3><ul className="mt-4 grid gap-3 md:grid-cols-2">{["Explain IoT device, gateway, broker, API, database, and dashboard roles.", "Use MQTT publishers, subscribers, topics, QoS, and retained state.", "Describe HTTP methods, status codes, endpoints, and JSON payloads.", "Publish validated Raspberry Pi telemetry securely.", "Build a small local read-only status API.", "Apply TLS, credentials, authorisation, retry, logging, and offline-safety practices."].map(item=><li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}</ul></section>

    <section className="rounded-2xl bg-blue-50 p-6"><h3 className="text-2xl font-bold">IoT architecture</h3><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3"><Card icon={Network} title="Device" text="Measures or controls the physical system and maintains a safe local mode when connectivity fails."/><Card icon={Router} title="Gateway/broker" text="Aggregates devices or routes MQTT publications to authorised subscribers."/><Card icon={Webhook} title="Web API" text="Provides request/response endpoints for status, commands, configuration, or integration."/><Card icon={Database} title="Storage" text="Persists time-series data, events, device state, and audit records with retention controls."/><Card icon={Cloud} title="Application" text="Displays dashboards, applies rules, sends alerts, and supports authorised users."/><Card icon={ShieldAlert} title="Security boundary" text="Authenticates devices/users, authorises actions, protects traffic, validates input, and records events."/></div></section>

    <section><h3 className="text-2xl font-bold">MQTT publish/subscribe model</h3><p className="mt-4 leading-8 text-slate-600">A publisher sends a payload to a hierarchical topic. The broker checks policy and forwards it to matching subscribers. Publishers and subscribers are decoupled, which suits intermittent devices and event-driven telemetry.</p><div className="mt-5 overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-3">Concept</th><th className="p-3">Meaning</th><th className="p-3">Design guidance</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">Topic</td><td className="p-3 font-mono">site/device/telemetry</td><td className="p-3">Use stable hierarchy; avoid secrets and personal data in names</td></tr><tr><td className="p-3 font-semibold">QoS 0</td><td className="p-3">At most once</td><td className="p-3">Low overhead; loss possible</td></tr><tr><td className="p-3 font-semibold">QoS 1</td><td className="p-3">At least once</td><td className="p-3">Duplicates possible; make processing idempotent</td></tr><tr><td className="p-3 font-semibold">QoS 2</td><td className="p-3">Exactly once protocol flow</td><td className="p-3">Higher overhead; use only when justified</td></tr><tr><td className="p-3 font-semibold">Retain</td><td className="p-3">Broker stores the last retained value</td><td className="p-3">Useful for current state, not every event</td></tr><tr><td className="p-3 font-semibold">Last Will</td><td className="p-3">Broker-published unexpected-disconnect status</td><td className="p-3">Supports presence monitoring; not a safety guarantee</td></tr></tbody></table></div></section>

    <section><h3 className="text-2xl font-bold">Topic and payload design</h3><div className="mt-5 grid gap-4 md:grid-cols-2"><Card icon={Database} title="Telemetry" text="Timestamped measurements with device identity, explicit units, schema version, and quality/status indicators."/><Card icon={Webhook} title="Commands" text="Separate command topics, strict allow-lists, request IDs, expiration, authorisation, acknowledgement, and safe limits."/><Card icon={Cloud} title="State" text="Publish current operating state deliberately, often retained, without confusing it with the event history."/><Card icon={ShieldAlert} title="Validation" text="Check type, length, range, freshness, identity, schema, and permitted transition before acting."/></div><pre className="mt-5 overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-7 text-cyan-200"><code>{`Topic: nextgenroboticx/lab/pi-lab-01/telemetry
Payload: {"deviceId":"pi-lab-01","timestamp":1787450000,"cpuTemperatureC":48.6}`}</code></pre></section>

    <section><h3 className="text-2xl font-bold">HTTP, REST and JSON</h3><p className="mt-4 leading-8 text-slate-600">HTTP APIs use a method and URL to request a resource operation. A response includes a status code, headers, and often JSON. GET reads, POST commonly creates or triggers, PUT replaces, PATCH partially changes, and DELETE removes—subject to the API contract and authorisation.</p><div className="mt-5 overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-3">Status class</th><th className="p-3">Meaning</th><th className="p-3">Example</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">2xx</td><td className="p-3">Successful request</td><td className="p-3">200 OK, 201 Created</td></tr><tr><td className="p-3 font-semibold">4xx</td><td className="p-3">Client/request problem</td><td className="p-3">400 Bad Request, 401/403 auth, 404 Not Found</td></tr><tr><td className="p-3 font-semibold">5xx</td><td className="p-3">Server-side failure</td><td className="p-3">500 Internal Server Error, 503 Unavailable</td></tr></tbody></table></div></section>

    <section className="rounded-2xl border border-red-200 bg-red-50 p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-red-700"/><h3 className="text-xl font-bold">IoT security baseline</h3></div><ul className="mt-4 space-y-2 text-slate-700"><li>• Give every device a unique identity; do not share one unrestricted credential across a fleet.</li><li>• Use TLS and verify certificates/hostnames; never disable verification to make a test pass.</li><li>• Store passwords, tokens, and keys outside source code with restrictive permissions and rotation plans.</li><li>• Authorise exact topics, endpoints, methods, and actions using least privilege.</li><li>• Rate-limit requests, bound payload size, validate all inputs, and reject expired/replayed commands.</li><li>• Do not expose a development Flask server or broker directly to the public internet.</li></ul></section>

    <section><div className="flex items-center gap-3"><Code2 className="text-emerald-700"/><h3 className="text-2xl font-bold">Practical MQTT telemetry publisher</h3></div><p className="mt-3 leading-7 text-slate-600">Use an authorised broker with a valid TLS certificate and device-specific credentials. Install Paho MQTT in the virtual environment, supply secrets through protected environment configuration, and publish validated CPU temperature at QoS 1.</p><pre className="mt-5 overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-7 text-cyan-200"><code>{`python3 -m pip install paho-mqtt
export MQTT_BROKER="broker.example.net"
export MQTT_USERNAME="pi-lab-01"
export MQTT_PASSWORD="use-protected-secret-loading"`}</code></pre><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{mqttCode}</code></pre></section>

    <section><div className="flex items-center gap-3"><Webhook className="text-purple-700"/><h3 className="text-2xl font-bold">Local read-only status API</h3></div><p className="mt-3 leading-7 text-slate-600">This Flask learning example returns JSON only on the local loopback interface. It is not a production deployment. A deployed service needs a production WSGI server, authentication/authorisation where required, TLS termination, input limits, logging, and network access controls.</p><pre className="mt-5 overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-7 text-cyan-200"><code>{`python3 -m pip install flask
python3 status_api.py
curl http://127.0.0.1:5000/api/status`}</code></pre><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{apiCode}</code></pre></section>

    <section><h3 className="text-2xl font-bold">Reliability and observability</h3><div className="mt-5 grid gap-4 md:grid-cols-2"><Card icon={Network} title="Reconnect" text="Use bounded exponential backoff with jitter instead of a tight retry loop. Maintain safe local operation while offline."/><Card icon={Database} title="Buffering" text="If required, queue a bounded amount of timestamped telemetry and define what happens when storage is full."/><Card icon={Cloud} title="Observability" text="Log connection state, publish failures, validation failures, latency, queue depth, and device health without logging secrets."/><Card icon={ShieldAlert} title="Idempotency" text="Use message or request IDs so retries do not repeat an unsafe action or duplicate a transaction."/></div></section>

    <section className="rounded-2xl bg-slate-900 p-6 text-white"><h3 className="text-2xl font-bold">Hands-on activity</h3><p className="mt-3 leading-7 text-slate-200">On an isolated or authorised lab network, run the local status API and validate its JSON with curl. Configure a TLS-enabled MQTT broker account limited to this device's telemetry topic, run the publisher, and confirm payload schema, interval, QoS, and certificate validation. Disconnect the network briefly, verify controlled reconnect and safe local operation, then document logs without exposing credentials.</p></section>
    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6"><h3 className="text-xl font-bold text-blue-900">Chapter completion checklist</h3><p className="mt-3 leading-7 text-blue-800">Complete the local API and authorised MQTT labs, explain QoS, retain, TLS and validation, review the uploaded video/PDF when available, and score at least 80% below.</p></section>
  </article><ChapterQuiz/></>;
}

function ChapterQuiz(){const [answers,setAnswers]=useState({});const [submitted,setSubmitted]=useState(false);const score=useMemo(()=>questions.reduce((n,q,i)=>n+(answers[i]===q.answer?1:0),0),[answers]);const complete=Object.keys(answers).length===questions.length;const passed=score>=8;const reset=()=>{setAnswers({});setSubmitted(false)};return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30}/><div><h2 className="text-2xl font-bold">Chapter 8 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((q,i)=><fieldset key={q.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{i+1}. {q.question}</legend><div className="mt-3 space-y-2">{q.options.map((o,j)=>{const selected=answers[i]===j;const correct=submitted&&j===q.answer;const incorrect=submitted&&selected&&j!==q.answer;return <label key={o} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct?"border-green-300 bg-green-50":incorrect?"border-red-300 bg-red-50":selected?"border-blue-400 bg-blue-50":"border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`pi-ch8-${i}`} checked={selected} disabled={submitted} onChange={()=>setAnswers(a=>({...a,[i]:j}))} className="mt-1"/><span>{o}</span></label>})}</div></fieldset>)}</div>{!submitted?<button disabled={!complete} onClick={()=>setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button>:<div className={`mt-6 rounded-2xl border p-6 ${passed?"border-green-300 bg-green-50":"border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed?<CheckCircle2 className="text-green-700"/>:<XCircle className="text-red-700"/>}<div><h3 className="text-xl font-bold">{passed?"Chapter quiz passed":"Review the lesson and try again"}</h3><p>You scored {score}/10 ({score*10}%).</p></div></div><button onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18}/> Retake Quiz</button></div>}</section>}

function Card({icon:Icon,title,text}){return <div className="rounded-2xl border border-slate-200 bg-white p-5"><Icon className="text-blue-600" size={26}/><h4 className="mt-3 font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>}

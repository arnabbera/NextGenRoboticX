import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, CircleHelp, Code2, Database, Globe2, KeyRound, Lightbulb, LockKeyhole, Network, RefreshCcw, RotateCcw, Router, ShieldCheck, Timer, XCircle } from "lucide-react";

const questions = [
  { question: "What does DHCP normally provide to an ESP32 joining a network?", options: ["IP configuration such as address, gateway and DNS", "A sensor calibration certificate", "A GPIO voltage", "An Arduino sketch"], answer: 0 },
  { question: "What is DNS used for?", options: ["Translate a host name into an IP address", "Drive a relay", "Measure signal voltage", "Generate a device password"], answer: 0 },
  { question: "Which HTTP method is normally used to retrieve a resource without changing it?", options: ["GET", "POST", "DELETE", "PATCH"], answer: 0 },
  { question: "Which status-code class normally indicates a successful HTTP response?", options: ["2xx", "3xx", "4xx", "5xx"], answer: 0 },
  { question: "Why should an IoT device use HTTPS with certificate validation?", options: ["To authenticate the server and protect traffic in transit", "To increase ADC resolution", "To power the Wi-Fi radio", "To avoid all JSON validation"], answer: 0 },
  { question: "What does HTTP status 401 generally mean?", options: ["Authentication is required or failed", "The request succeeded", "The sensor is calibrated", "The device has no Flash"], answer: 0 },
  { question: "What is exponential backoff?", options: ["Increasing the delay between repeated retry attempts", "Sending requests continuously with no delay", "Reducing every payload to zero", "Changing a GET into a GPIO"], answer: 0 },
  { question: "Which REST design is preferable?", options: ["Resource-oriented URLs with correct methods and status codes", "One undocumented URL for every action", "Passwords placed in URLs", "No response validation"], answer: 0 },
  { question: "What should firmware do before using JSON received from an API?", options: ["Check status, size, parse result, schema and ranges", "Trust every field automatically", "Execute it as code", "Store it without a limit"], answer: 0 },
  { question: "Where should permanent API secrets be stored?", options: ["Using a protected provisioning or secret-storage design, not public source code", "In a public GitHub file", "In the URL query string", "Printed in every serial message"], answer: 0 },
];

const connectionCode = `#include <WiFi.h>
#include "secrets.h"  // Keep this file out of public source control

unsigned long nextAttempt = 0;
unsigned long retryMs = 1000;

void maintainWiFi() {
  if (WiFi.status() == WL_CONNECTED || millis() < nextAttempt) return;

  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  nextAttempt = millis() + retryMs;
  retryMs = min(retryMs * 2UL, 60000UL);
}

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
}

void loop() {
  maintainWiFi();
  if (WiFi.status() == WL_CONNECTED) retryMs = 1000;
}`;

const httpsCode = `#include <HTTPClient.h>
#include <WiFiClientSecure.h>

// Use the current CA certificate for your API endpoint.
extern const char ROOT_CA[];

bool sendReading(float temperatureC) {
  WiFiClientSecure client;
  client.setCACert(ROOT_CA);

  HTTPClient http;
  if (!http.begin(client, "https://api.example.com/v1/readings")) return false;

  http.addHeader("Content-Type", "application/json");
  http.addHeader("Authorization", "Bearer " + getProtectedToken());

  String body = String("{\"deviceId\":\"room-node-07\",") +
                "\"temperatureC\":" + String(temperatureC, 1) + "}";
  int status = http.POST(body);
  String response = http.getString();
  http.end();

  Serial.printf("HTTP status: %d\\n", status);
  return status >= 200 && status < 300;
}`;

export default function InternetOfThingsChapterFiveLesson(){return <><article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
  <header><p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 5</p><h2 className="mt-2 text-3xl font-bold">Wi-Fi Networking and HTTP/REST APIs</h2><p className="mt-4 leading-8 text-slate-600">Connecting an ESP32 to Wi-Fi is only the first step. Reliable IoT firmware must understand network configuration, name resolution, secure transport, HTTP behaviour, API contracts, authentication, bounded retries and failure recovery. This chapter builds a secure device-to-service request path without allowing networking to block essential local operation.</p></header>

  <section><h3 className="text-2xl font-bold">Learning objectives</h3><ul className="mt-4 grid gap-3 md:grid-cols-2">{["Explain SSID association, DHCP, IP addresses, gateways, DNS and ports.", "Connect an ESP32 to Wi-Fi using a non-blocking retry strategy.", "Describe HTTP requests, responses, methods, headers, bodies and status codes.", "Design resource-oriented REST endpoints and structured JSON payloads.", "Use HTTPS with server-certificate validation and protected credentials.", "Handle timeouts, invalid responses, rate limits and service outages safely."].map((x)=><li key={x} className="rounded-xl border p-4"><b className="mr-2 text-emerald-600">✓</b>{x}</li>)}</ul></section>

  <section className="rounded-2xl bg-blue-50 p-6"><div className="flex items-center gap-3"><Router className="text-blue-700"/><h3 className="text-2xl font-bold text-blue-950">From radio association to an internet service</h3></div><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4"><Flow title="1. Join Wi-Fi" text="The station discovers an SSID, authenticates and associates with an access point."/><Flow title="2. Obtain configuration" text="DHCP commonly supplies an IP address, subnet, gateway and DNS server."/><Flow title="3. Resolve the host" text="DNS translates an API host name into an address."/><Flow title="4. Open a secure session" text="TCP connects to the service port and TLS authenticates and encrypts the exchange."/></div></section>

  <section><div className="flex items-center gap-3"><Network className="text-indigo-700"/><h3 className="text-2xl font-bold">Essential network concepts</h3></div><div className="mt-5 overflow-x-auto rounded-2xl border"><table className="w-full min-w-[760px] text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-4">Concept</th><th className="p-4">Purpose</th><th className="p-4">Typical diagnostic</th></tr></thead><tbody className="divide-y"><NetworkRow name="IP address" purpose="Identifies an interface on an IP network" diagnostic="Print WiFi.localIP() after connection"/><NetworkRow name="Subnet" purpose="Identifies which destinations are local" diagnostic="Verify address and mask match the network plan"/><NetworkRow name="Gateway" purpose="Routes traffic beyond the local subnet" diagnostic="Test local access before remote access"/><NetworkRow name="DNS" purpose="Resolves names such as api.example.com" diagnostic="Separate name-resolution failure from connection failure"/><NetworkRow name="Port" purpose="Selects a service on a host" diagnostic="HTTPS normally uses 443; confirm endpoint configuration"/></tbody></table></div></section>

  <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6"><div className="flex items-center gap-3"><RefreshCcw className="text-cyan-700"/><h3 className="text-2xl font-bold text-cyan-950">Connection as a state machine</h3></div><p className="mt-3 leading-8 text-cyan-900">Do not trap the application in an endless connection loop. Track states such as disconnected, connecting, connected and backoff. Continue safe local sensing and control while the network is unavailable, and place limits on queued data.</p><CodeBlock code={connectionCode}/><p className="mt-4 rounded-xl bg-white p-4 leading-7 text-slate-700">Add a connection timeout and state transition in production. Calling <code>WiFi.begin()</code> repeatedly without waiting can increase congestion and energy use rather than improve recovery.</p></section>

  <section><div className="flex items-center gap-3"><Globe2 className="text-blue-700"/><h3 className="text-2xl font-bold">Anatomy of HTTP</h3></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Info title="Request" text="Method, URL/path, headers and an optional body. Headers commonly describe content type, accepted format and authorisation."/><Info title="Response" text="Status code, headers and an optional body. Firmware must interpret the status before trusting or parsing the body."/></div><div className="mt-5 overflow-x-auto rounded-2xl border"><table className="w-full min-w-[720px] text-left"><thead className="bg-blue-700 text-white"><tr><th className="p-4">Method</th><th className="p-4">Typical intent</th><th className="p-4">Example</th></tr></thead><tbody className="divide-y"><MethodRow method="GET" intent="Read a resource" example="GET /v1/devices/room-node-07/config"/><MethodRow method="POST" intent="Create or submit data" example="POST /v1/readings"/><MethodRow method="PUT" intent="Replace a known resource" example="PUT /v1/devices/room-node-07/config"/><MethodRow method="PATCH" intent="Partially update a resource" example="PATCH /v1/devices/room-node-07/state"/><MethodRow method="DELETE" intent="Remove a resource" example="DELETE /v1/alerts/123"/></tbody></table></div></section>

  <section className="rounded-2xl bg-slate-900 p-6 text-white"><div className="flex items-center gap-3"><Code2 className="text-cyan-300"/><h3 className="text-2xl font-bold">HTTP status codes are part of the contract</h3></div><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-5"><Status code="2xx" title="Success" text="Request accepted or completed."/><Status code="3xx" title="Redirect" text="Resource or endpoint moved."/><Status code="400" title="Bad request" text="Payload or parameters invalid."/><Status code="401/403" title="Access" text="Authentication or permission failed."/><Status code="429/5xx" title="Retry carefully" text="Rate limit or service-side failure."/></div><p className="mt-5 leading-7 text-slate-200">Retry only operations that are safe to repeat, obey <code>Retry-After</code> when supplied, add exponential backoff with jitter and set a maximum delay. A permanent 400 or 401 normally requires correction, not rapid retry.</p></section>

  <section><h3 className="text-2xl font-bold">Designing a REST API</h3><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3"><Principle title="Use nouns for resources" text="Prefer /devices/07/readings over action-heavy, undocumented endpoint names."/><Principle title="Use methods consistently" text="Let GET read, POST submit/create, PUT replace, PATCH modify and DELETE remove."/><Principle title="Version the contract" text="Use an explicit version and define a compatibility policy before devices are deployed."/><Principle title="Validate on both sides" text="Check types, ranges, required fields, payload size and authorisation."/><Principle title="Return useful errors" text="Provide a stable code and safe explanation without leaking secrets or internals."/><Principle title="Make retries safe" text="Use request identifiers or idempotency controls where duplicate submission would be harmful."/></div></section>

  <section className="rounded-2xl border border-violet-200 bg-violet-50 p-6"><div className="flex items-center gap-3"><Database className="text-violet-700"/><h3 className="text-2xl font-bold text-violet-950">JSON payload design and validation</h3></div><pre className="mt-5 overflow-x-auto rounded-2xl bg-white p-5 text-sm leading-7 text-slate-800"><code>{`{
  "schemaVersion": 1,
  "deviceId": "room-node-07",
  "capturedAt": "2026-09-14T12:30:00Z",
  "measurements": {
    "temperatureC": 28.4,
    "humidityPercent": 67
  },
  "quality": "GOOD"
}`}</code></pre><ul className="mt-4 space-y-2 leading-7 text-violet-900"><li>• Define required and optional fields, types, units, ranges and maximum lengths.</li><li>• Reject oversized or malformed payloads before allocating excessive memory.</li><li>• Never treat received strings as executable code.</li><li>• Version schemas so deployed firmware and services can evolve predictably.</li></ul></section>

  <section className="rounded-2xl border border-red-200 bg-red-50 p-6"><div className="flex items-center gap-3"><LockKeyhole className="text-red-700"/><h3 className="text-2xl font-bold text-red-950">HTTPS and server authentication</h3></div><p className="mt-3 leading-8 text-red-900">Encryption without certificate validation can still connect to an impostor. Provision an appropriate trust anchor, maintain correct device time for certificate checks and plan certificate rotation. Avoid “insecure” client modes in production.</p><CodeBlock code={httpsCode}/><div className="mt-5 flex gap-3 rounded-xl bg-white p-4 text-red-900"><AlertTriangle className="mt-1 shrink-0"/><p>Do not place long-lived tokens, Wi-Fi passwords or private keys directly in committed source code. Also avoid secrets in URLs because URLs may be logged by gateways and services.</p></div></section>

  <section><div className="flex items-center gap-3"><KeyRound className="text-emerald-700"/><h3 className="text-2xl font-bold">Authentication and authorisation</h3></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Info title="Authentication" text="Proves which device or user is communicating using a credential, signed token, certificate or other approved mechanism."/><Info title="Authorisation" text="Restricts that identity to permitted resources and operations. A temperature node should not control every actuator."/></div><p className="mt-5 rounded-2xl bg-emerald-50 p-5 leading-7 text-emerald-900"><b>Lifecycle requirement:</b> credentials must be provisioned, protected, rotated and revoked. Device replacement and ownership transfer need explicit procedures.</p></section>

  <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-center gap-3"><Timer className="text-amber-700"/><h3 className="text-2xl font-bold text-amber-950">Timeouts and resilient retry</h3></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Resilience title="Bound every operation" text="Set connection and response timeouts so a failed service cannot freeze sensing or safety control."/><Resilience title="Classify the failure" text="Distinguish Wi-Fi, DHCP, DNS, TLS, HTTP, parsing and application validation failures."/><Resilience title="Back off with jitter" text="Increase retry delay and randomise it so a fleet does not reconnect simultaneously after an outage."/><Resilience title="Store with limits" text="Buffer essential records with timestamps, a maximum capacity and an intentional overflow policy."/></div></section>

  <section className="rounded-2xl bg-indigo-50 p-6"><div className="flex items-center gap-3"><Lightbulb className="text-indigo-700"/><h3 className="text-2xl font-bold text-indigo-950">Hands-on project: secure telemetry client</h3></div><p className="mt-3 leading-8 text-indigo-900">Extend the Chapter 4 environmental node so it connects to Wi-Fi and submits validated telemetry to an HTTPS test API without blocking local sampling.</p><div className="mt-5 grid gap-3 md:grid-cols-2">{["Keep credentials in an ignored local file and document required variable names.", "Print IP, gateway, DNS and RSSI without printing secrets.", "POST a versioned JSON payload with value, unit, time and quality.", "Validate HTTP status before processing the response body.", "Implement timeout, exponential backoff, jitter and a maximum queue size.", "Test wrong password, DNS failure, rejected token, server error and recovery."].map((x)=><div key={x} className="flex gap-3 rounded-xl bg-white p-4"><CheckCircle2 className="mt-0.5 shrink-0 text-indigo-600" size={20}/><span>{x}</span></div>)}</div></section>

  <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><div className="flex items-center gap-3"><ShieldCheck className="text-emerald-700"/><h3 className="text-xl font-bold text-emerald-950">Verification checklist</h3></div><ul className="mt-4 space-y-2 leading-7 text-emerald-900"><li>• Local sensing and safety behaviour continue during network loss.</li><li>• TLS validates the intended service using a maintained trust configuration.</li><li>• Credentials are absent from public source and diagnostic output.</li><li>• Every request has bounded size and time.</li><li>• Status, content type, payload structure and value ranges are checked.</li><li>• Retry behaviour is rate-limited and tested across a simulated outage.</li></ul></section>

  <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6"><h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3><ul className="mt-4 space-y-2 leading-7 text-blue-900"><li>• Wi-Fi association, IP configuration, DNS, TCP, TLS and HTTP are distinct stages.</li><li>• REST APIs use resource paths, methods, status codes and versioned data contracts.</li><li>• HTTPS requires certificate validation, protected credentials and correct time.</li><li>• Firmware must validate responses and classify failures before retrying.</li><li>• Timeouts, backoff, jitter, bounded storage and offline-safe behaviour make connectivity dependable.</li></ul></section>

  <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><h3 className="text-xl font-bold text-emerald-950">Chapter completion checklist</h3><p className="mt-3 leading-7 text-emerald-900">Explain the complete network path, implement non-blocking connection recovery, submit and validate an HTTPS JSON request, demonstrate protected credentials and certificate validation, test five failure cases and score at least 80% in the quiz.</p></section>
  </article><ChapterQuiz/></>}

function ChapterQuiz(){const[answers,setAnswers]=useState({});const[submitted,setSubmitted]=useState(false);const score=useMemo(()=>questions.reduce((t,q,i)=>t+(answers[i]===q.answer?1:0),0),[answers]);const complete=Object.keys(answers).length===questions.length;const passed=score>=8;const reset=()=>{setAnswers({});setSubmitted(false)};return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b pb-5"><CircleHelp className="text-blue-600" size={30}/><div><h2 className="text-2xl font-bold">Chapter 5 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((q,i)=><fieldset key={q.question} className="rounded-2xl border p-5"><legend className="px-2 font-bold">{i+1}. {q.question}</legend><div className="mt-3 space-y-2">{q.options.map((o,j)=>{const selected=answers[i]===j;const correct=submitted&&j===q.answer;const wrong=submitted&&selected&&j!==q.answer;return <label key={o} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct?"border-green-300 bg-green-50":wrong?"border-red-300 bg-red-50":selected?"border-blue-400 bg-blue-50":"hover:bg-slate-50"}`}><input type="radio" name={`iot-ch5-${i}`} checked={selected} disabled={submitted} onChange={()=>setAnswers(c=>({...c,[i]:j}))} className="mt-1"/><span>{o}</span></label>})}</div></fieldset>)}</div>{!submitted?<button disabled={!complete} onClick={()=>setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button>:<div className={`mt-6 rounded-2xl border p-6 ${passed?"border-green-300 bg-green-50":"border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed?<CheckCircle2 className="text-green-700"/>:<XCircle className="text-red-700"/>}<div><h3 className="text-xl font-bold">{passed?"Chapter quiz passed":"Review the lesson and try again"}</h3><p>You scored {score}/10 ({score*10}%).</p></div></div><button onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18}/> Retake Quiz</button></div>}</section>}

function Flow({title,text}){return <div className="rounded-2xl bg-white p-5"><h4 className="font-bold text-blue-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>}
function NetworkRow({name,purpose,diagnostic}){return <tr><th className="p-4 font-bold">{name}</th><td className="p-4">{purpose}</td><td className="p-4">{diagnostic}</td></tr>}
function Info({title,text}){return <div className="rounded-2xl border bg-white p-5"><h4 className="font-bold">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>}
function MethodRow({method,intent,example}){return <tr><th className="p-4 font-bold">{method}</th><td className="p-4">{intent}</td><td className="p-4 font-mono text-sm">{example}</td></tr>}
function Status({code,title,text}){return <div className="rounded-2xl border border-white/15 bg-white/10 p-4"><p className="text-xl font-bold text-cyan-200">{code}</p><h4 className="mt-2 font-bold">{title}</h4><p className="mt-2 text-sm leading-6 text-slate-200">{text}</p></div>}
function Principle({title,text}){return <div className="rounded-2xl border p-5"><h4 className="font-bold">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>}
function CodeBlock({code}){return <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-cyan-100"><code>{code}</code></pre>}
function Resilience({title,text}){return <div className="rounded-2xl bg-white p-5"><h4 className="font-bold text-amber-950">{title}</h4><p className="mt-2 leading-7 text-slate-700">{text}</p></div>}

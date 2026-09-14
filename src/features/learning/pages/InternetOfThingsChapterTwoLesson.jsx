import { useMemo, useState } from "react";
import {
  Activity,
  Boxes,
  CheckCircle2,
  CircleHelp,
  Cloud,
  Cpu,
  Database,
  GitBranch,
  Layers3,
  Lightbulb,
  Network,
  Radio,
  RotateCcw,
  Router,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Wrench,
  XCircle,
} from "lucide-react";

const questions = [
  { question: "What is the purpose of an IoT architecture?", options: ["Only to select a board colour", "To define components, responsibilities, interfaces and data flow across the system", "To eliminate all networks", "Only to design a mobile screen"], answer: 1 },
  { question: "Which layer directly interacts with sensors and actuators?", options: ["Device or perception layer", "Business layer only", "Presentation layer only", "Billing layer"], answer: 0 },
  { question: "What is a common reason to add an IoT gateway?", options: ["To make every device publicly accessible", "To aggregate devices, translate protocols and perform local processing", "To remove device identity", "To replace all cloud storage"], answer: 1 },
  { question: "In the device-to-cloud model, a device typically does what?", options: ["Communicates directly with a cloud service through an IP network", "Communicates only through paper records", "Has no identity", "Cannot receive configuration"], answer: 0 },
  { question: "Which topology provides multiple alternative paths between nodes?", options: ["Point-to-point", "Star", "Mesh", "Single isolated node"], answer: 2 },
  { question: "Why should device identity be different from a network address?", options: ["Addresses may change while the device must remain uniquely recognisable", "Identity is only decorative", "Every device must share one identity", "Network addresses never change"], answer: 0 },
  { question: "What does a data model define?", options: ["Only the device enclosure", "Meaning, structure, units and relationships of exchanged information", "Only Wi-Fi signal strength", "The product advertisement"], answer: 1 },
  { question: "Which is an application-layer protocol commonly used for lightweight IoT messaging?", options: ["MQTT", "GPIO", "ADC", "PWM"], answer: 0 },
  { question: "What is a key benefit of loose coupling through publish-subscribe communication?", options: ["Publishers and subscribers do not need direct knowledge of each other", "Messages require no security", "Every device must be online forever", "It removes the need for topics"], answer: 0 },
  { question: "Which architecture choice best supports safe operation during an internet outage?", options: ["Move every control decision to the cloud", "Keep essential safety logic and fallback behaviour at the device or edge", "Disable local sensing", "Accept unauthenticated commands"], answer: 1 },
];

export default function InternetOfThingsChapterTwoLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 2</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">IoT Architecture, Devices and Communication Models</h2>
          <p className="mt-4 leading-8 text-slate-600">An IoT product is a distributed system rather than a single board connected to Wi-Fi. Its architecture assigns responsibilities to devices, gateways, networks, platforms and applications; defines how data moves between them; and prepares the system for scale, faults, security and change. This chapter provides the blueprint needed before choosing detailed hardware or protocols.</p>
        </header>

        <section>
          <h3 className="text-2xl font-bold">Learning objectives</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {["Explain three-layer and five-layer IoT reference architectures.", "Identify device, gateway, network, platform, application and business responsibilities.", "Compare device-to-device, device-to-cloud, device-to-gateway and back-end data-sharing models.", "Compare point-to-point, star, tree and mesh network topologies.", "Separate physical connectivity, transport, messaging and application data concerns.", "Create a secure and fault-aware architecture for a practical IoT use case."].map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><Layers3 className="text-blue-700" /><h3 className="text-2xl font-bold text-blue-950">Architecture is a set of responsibilities</h3></div>
          <p className="mt-4 leading-8 text-slate-700">Architecture describes the major building blocks, what each block owns, how blocks communicate and what happens when one is unavailable. A clear architecture prevents device firmware, cloud logic and user interfaces from becoming tightly coupled and difficult to test or replace.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard title="Components" text="Devices, sensors, gateways, networks, brokers, databases, analytics, applications and external systems." />
            <InfoCard title="Responsibilities" text="Where sensing, validation, control, storage, analysis, alerts, identity and authorisation take place." />
            <InfoCard title="Interfaces" text="Messages, APIs, topics, payload schemas, commands, acknowledgements and error behaviour." />
            <InfoCard title="Quality attributes" text="Security, latency, availability, scale, maintainability, power use, privacy and total operating cost." />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><Boxes className="text-indigo-700" /><h3 className="text-2xl font-bold">The three-layer IoT model</h3></div>
          <p className="mt-3 leading-8 text-slate-600">The three-layer model is a useful first view of an IoT system. It keeps the physical world, communication and user-facing service conceptually separate.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <LayerCard icon={Activity} number="1" title="Perception layer" text="Sensors observe physical conditions; identifiers distinguish objects; actuators influence the environment." examples="Temperature probe, RFID reader, relay and motor." />
            <LayerCard icon={Network} number="2" title="Network layer" text="Moves information between field devices, gateways and services using suitable communication technologies." examples="Wi-Fi, BLE, Ethernet, cellular and LPWAN." />
            <LayerCard icon={Smartphone} number="3" title="Application layer" text="Turns data into monitoring, automation, alerts, reports and domain-specific user services." examples="Smart-farm dashboard and irrigation control." />
          </div>
        </section>

        <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
          <h3 className="text-2xl font-bold text-cyan-950">The five-layer model</h3>
          <p className="mt-3 leading-8 text-cyan-900">Larger solutions benefit from a more detailed view that separates data processing and organisational decisions from basic connectivity.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            <CompactLayer icon={Activity} title="Perception" text="Sense and act." />
            <CompactLayer icon={Radio} title="Transport" text="Carry device data." />
            <CompactLayer icon={ServerCog} title="Processing" text="Ingest, store and analyse." />
            <CompactLayer icon={Smartphone} title="Application" text="Deliver domain services." />
            <CompactLayer icon={GitBranch} title="Business" text="Policies, workflows and value." />
          </div>
          <p className="mt-5 rounded-xl bg-white p-4 leading-7 text-slate-700"><b>Important:</b> reference layers help discussion; they are not mandatory products. One gateway may perform transport and processing, while a cloud platform may span processing, application and business functions.</p>
        </section>

        <section>
          <div className="flex items-center gap-3"><Cpu className="text-blue-700" /><h3 className="text-2xl font-bold">Device roles in an IoT system</h3></div>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-slate-900 text-white"><tr><th className="p-4">Role</th><th className="p-4">Responsibility</th><th className="p-4">Example</th><th className="p-4">Key constraint</th></tr></thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <RoleRow role="Sensor node" responsibility="Measure, validate and report conditions" example="Battery soil-moisture node" constraint="Energy and radio range" />
                <RoleRow role="Actuator node" responsibility="Execute authorised commands safely" example="Irrigation-valve controller" constraint="Fail-safe output state" />
                <RoleRow role="Gateway" responsibility="Aggregate, translate, filter and bridge networks" example="Field LoRa-to-IP gateway" constraint="Availability and local capacity" />
                <RoleRow role="Edge controller" responsibility="Coordinate low-latency local decisions" example="Greenhouse automation controller" constraint="Deterministic response" />
                <RoleRow role="Cloud service" responsibility="Manage fleet data, users, rules and integrations" example="Telemetry and alert platform" constraint="Scale, privacy and cost" />
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><Router className="text-cyan-300" /><h3 className="text-2xl font-bold">Four communication models</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <DarkCard title="Device-to-device" text="Nearby devices communicate directly, often for local coordination. Example: a wall switch controlling a lamp over a short-range link." />
            <DarkCard title="Device-to-cloud" text="An IP-capable device connects directly to a cloud endpoint. It is simple but places networking and security responsibilities on every device." />
            <DarkCard title="Device-to-gateway" text="Devices use a local gateway for protocol translation, security mediation, aggregation or edge logic before reaching cloud services." />
            <DarkCard title="Back-end data sharing" text="A cloud service exposes controlled APIs so authorised applications or partner systems can use selected device data." />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Network topology choices</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Topology title="Point-to-point" text="One direct link between two endpoints. Simple and predictable, but it does not naturally scale to many nodes." />
            <Topology title="Star" text="Every device connects to a central access point or gateway. Easy to manage, though the centre becomes important to availability and coverage." />
            <Topology title="Tree" text="Hierarchical branches aggregate traffic. Useful for structured deployments but upstream failures can isolate a branch." />
            <Topology title="Mesh" text="Nodes may relay traffic through multiple paths. Coverage and resilience can improve, while routing, power and troubleshooting become more complex." />
          </div>
        </section>

        <section className="rounded-2xl border border-violet-200 bg-violet-50 p-6">
          <div className="flex items-center gap-3"><Network className="text-violet-700" /><h3 className="text-2xl font-bold text-violet-950">Do not confuse connectivity with messaging</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ProtocolCard title="Link and access" examples="Wi-Fi, Ethernet, BLE, LoRaWAN" text="How a device reaches a network." />
            <ProtocolCard title="Network and transport" examples="IP, TCP, UDP" text="How packets are addressed and delivered." />
            <ProtocolCard title="Application messaging" examples="MQTT, HTTP, CoAP" text="How applications exchange requests and messages." />
            <ProtocolCard title="Payload and meaning" examples="JSON, CBOR, agreed schema" text="How values, units and commands are represented." />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><Database className="text-emerald-700" /><h3 className="text-2xl font-bold">Identity, addressing and data models</h3></div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <InfoCard title="Identity" text="A stable, unique device identity supports authentication, ownership, inventory and audit even when network details change." />
            <InfoCard title="Address" text="An IP address, radio address or broker topic helps route communication and may change across networks or sessions." />
            <InfoCard title="Data model" text="Names fields and defines types, units, timestamps, valid ranges, versioning and relationships so every component interprets data consistently." />
          </div>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-cyan-100"><code>{`{
  "schemaVersion": 1,
  "deviceId": "room-node-07",
  "timestamp": "2026-09-14T10:30:00Z",
  "temperatureC": 28.4,
  "humidityPercent": 67,
  "batteryPercent": 76
}`}</code></pre>
          <p className="mt-3 text-sm leading-6 text-slate-600">A message should include enough context to interpret the measurement. Field names, units and time format must be documented rather than guessed.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Request-response and publish-subscribe</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard title="Request-response" text="A client sends a request to a known service and waits for a response. HTTP APIs commonly use this direct interaction pattern." />
            <InfoCard title="Publish-subscribe" text="Publishers send messages to named topics through a broker; subscribers receive matching topics. This loosely couples producers and consumers." />
          </div>
          <div className="mt-5 rounded-2xl bg-emerald-50 p-5 text-emerald-950"><b>Example topic design:</b> <code className="rounded bg-white px-2 py-1">academy/lab-1/room-node-07/telemetry</code>. Topic permissions should restrict each device to the minimum paths it needs.</div>
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-3"><ShieldCheck className="text-red-700" /><h3 className="text-2xl font-bold text-red-950">Architecture-level security and reliability</h3></div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {["Give every production device a unique identity and revocable credential.", "Encrypt sensitive network traffic and verify the remote endpoint.", "Authorise telemetry, configuration and command paths separately.", "Keep essential safety control local when cloud delay or loss is unacceptable.", "Buffer important data with limits and timestamps during outages.", "Monitor device health, software version, reconnect rate and failed authentication."].map((item) => <div key={item} className="flex gap-3 rounded-xl bg-white p-4"><CheckCircle2 className="mt-0.5 shrink-0 text-red-600" size={20} /><span>{item}</span></div>)}
          </div>
        </section>

        <section className="rounded-2xl bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Lightbulb className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Hands-on architecture exercise: smart irrigation</h3></div>
          <p className="mt-3 leading-8 text-indigo-900">Design an architecture for three battery-powered soil nodes, one weather sensor, two irrigation valves, a local gateway and a cloud dashboard. Irrigation must stop safely if communication fails.</p>
          <ol className="mt-5 space-y-3">
            {["Draw the devices, gateway, network, platform, database and user application.", "Label telemetry, events, commands and configuration with arrows.", "Choose a communication model and topology, then justify both choices.", "Define stable device identities and one example telemetry payload.", "Place immediate valve safety logic at the correct architecture level.", "Describe behaviour during sensor, gateway, internet and cloud failure.", "List authentication, authorisation, encryption and update controls."].map((item, index) => <li key={item} className="flex gap-4 rounded-xl bg-white p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">{index + 1}</span><span>{item}</span></li>)}
          </ol>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex items-center gap-3"><Wrench className="text-amber-700" /><h3 className="text-2xl font-bold text-amber-950">Architecture review checklist</h3></div>
          <p className="mt-3 leading-8 text-amber-900">Before selecting products, verify that every component has a clear responsibility, each interface has a documented contract, data ownership and retention are defined, security boundaries are visible, offline behaviour is safe, and the design can be tested from sensor input to user outcome.</p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• IoT architecture assigns responsibilities and defines interfaces across devices, networks, services and applications.</li>
            <li>• Three-layer and five-layer models provide different levels of architectural detail.</li>
            <li>• Communication can be device-to-device, device-to-cloud, device-to-gateway or back-end data sharing.</li>
            <li>• Connectivity, transport, messaging and payload meaning are separate design concerns.</li>
            <li>• Stable identity, documented data models, least privilege and safe offline behaviour are foundational requirements.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Chapter completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the smart-irrigation architecture, explain both reference models, compare four communication models, distinguish an identity from an address, define one telemetry schema and score at least 80% in the quiz.</p>
        </section>
      </article>
      <ChapterQuiz />
    </>
  );
}

function ChapterQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);
  const complete = Object.keys(answers).length === questions.length;
  const passed = score >= 8;
  const reset = () => { setAnswers({}); setSubmitted(false); };
  return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 2 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((item, index) => <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{index + 1}. {item.question}</legend><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => { const selected = answers[index] === optionIndex; const correct = submitted && optionIndex === item.answer; const incorrect = submitted && selected && optionIndex !== item.answer; return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`iot-ch2-${index}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>; })}</div></fieldset>)}</div>{!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}</section>;
}

function InfoCard({ title, text }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function LayerCard({ icon: Icon, number, title, text, examples }) { return <div className="rounded-2xl border border-slate-200 p-5"><div className="flex items-center justify-between"><Icon className="text-indigo-600" size={28} /><span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">{number}</span></div><h4 className="mt-4 text-lg font-bold">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p><p className="mt-3 text-sm text-indigo-700"><b>Examples:</b> {examples}</p></div>; }
function CompactLayer({ icon: Icon, title, text }) { return <div className="rounded-2xl bg-white p-4 text-center"><Icon className="mx-auto text-cyan-700" size={26} /><h4 className="mt-3 font-bold text-slate-900">{title}</h4><p className="mt-2 text-sm text-slate-600">{text}</p></div>; }
function RoleRow({ role, responsibility, example, constraint }) { return <tr><th className="p-4 font-bold text-slate-900">{role}</th><td className="p-4">{responsibility}</td><td className="p-4">{example}</td><td className="p-4">{constraint}</td></tr>; }
function DarkCard({ title, text }) { return <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><h4 className="font-bold text-cyan-200">{title}</h4><p className="mt-2 leading-7 text-slate-200">{text}</p></div>; }
function Topology({ title, text }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><h4 className="text-lg font-bold">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }
function ProtocolCard({ title, examples, text }) { return <div className="rounded-2xl bg-white p-5"><h4 className="font-bold text-violet-900">{title}</h4><p className="mt-2 text-sm font-semibold text-violet-700">{examples}</p><p className="mt-2 leading-7 text-slate-600">{text}</p></div>; }

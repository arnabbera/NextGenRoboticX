import { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Cloud,
  Cpu,
  Database,
  Gauge,
  Globe2,
  Lightbulb,
  Network,
  Radio,
  RotateCcw,
  Router,
  ShieldCheck,
  Smartphone,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";

const questions = [
  { question: "What best describes the Internet of Things?", options: ["Only websites viewed on phones", "Physical objects that sense, process and exchange data to provide a useful service", "A local circuit with no communication", "Only cloud servers"], answer: 1 },
  { question: "Which component converts a physical condition into data?", options: ["Sensor", "Dashboard", "Actuator", "Router enclosure"], answer: 0 },
  { question: "What is the main role of an actuator in an IoT system?", options: ["Store every cloud record", "Create a user password", "Produce a physical action from a control command", "Assign an IP address"], answer: 2 },
  { question: "Which sequence represents a typical closed-loop IoT system?", options: ["Sense → communicate → process → decide → act", "Act → advertise → package → sell", "Cloud → sensor → battery only", "Dashboard → enclosure → resistor"], answer: 0 },
  { question: "Why might an IoT gateway be used?", options: ["To remove all security", "To aggregate devices, translate protocols or perform local processing", "To replace every sensor", "To increase screen brightness"], answer: 1 },
  { question: "What is telemetry?", options: ["Measurements and status sent from a device", "A device enclosure", "Only a manual switch", "A printed circuit board colour"], answer: 0 },
  { question: "Which is an example of an IoT application?", options: ["A disconnected passive resistor", "A farm sensor network that reports soil moisture and controls irrigation", "A paper notebook", "An unplugged lamp with no electronics"], answer: 1 },
  { question: "Why is local or edge processing useful?", options: ["It guarantees unlimited storage", "It can reduce latency, bandwidth use and dependence on cloud connectivity", "It makes sensors unnecessary", "It removes the need for testing"], answer: 1 },
  { question: "Which security practice should be followed from the beginning?", options: ["Use one public password for every device", "Disable all updates", "Protect credentials, authenticate devices and encrypt sensitive traffic", "Trust every received command"], answer: 2 },
  { question: "What should an IoT device do when connectivity is lost?", options: ["Always enter an unsafe state", "Continue according to a defined offline-safe policy and reconnect carefully", "Delete its firmware", "Accept commands from any source"], answer: 1 },
];

export default function InternetOfThingsChapterOneLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 1</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Introduction to IoT and Connected Systems</h2>
          <p className="mt-4 leading-8 text-slate-600">
            The Internet of Things connects physical objects to digital services. An IoT system observes the real world through sensors, processes and communicates data, presents useful information, and may control an actuator in response. This chapter introduces the complete device-to-cloud-to-user system and the engineering decisions that make it useful, safe and dependable.
          </p>
        </header>

        <section>
          <h3 className="text-2xl font-bold text-slate-900">Learning objectives</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {["Define IoT and distinguish a connected product from a standalone embedded device.", "Explain the roles of sensors, actuators, controllers, gateways, networks, cloud services and applications.", "Describe telemetry, commands, events and closed-loop control.", "Compare device, edge and cloud processing at an introductory level.", "Identify important requirements for connectivity, power, security, privacy and reliability.", "Map a real problem into a basic end-to-end IoT solution."].map((item) => (
              <li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><Globe2 className="text-blue-700" /><h3 className="text-2xl font-bold text-blue-950">What is the Internet of Things?</h3></div>
          <p className="mt-4 leading-8 text-slate-700">
            IoT is a system of identifiable physical devices that use sensors, software, processing and communication to exchange data and deliver a service. Internet connectivity alone does not make a product meaningfully “smart.” A good IoT product uses trustworthy data to improve visibility, automation, safety, efficiency or user experience.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard title="Physical world" text="Temperature, movement, location, pressure, energy use, machine state and other real conditions are measured." />
            <InfoCard title="Digital representation" text="Measurements become structured data with values, units, timestamps, device identity and quality information." />
            <InfoCard title="Communication" text="Devices exchange telemetry, events, configuration and commands through wired or wireless networks." />
            <InfoCard title="Useful service" text="Software stores, analyses and presents information or triggers a safe action that solves a defined problem." />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><Network className="text-indigo-700" /><h3 className="text-2xl font-bold">The end-to-end IoT architecture</h3></div>
          <p className="mt-3 leading-8 text-slate-600">Think beyond the development board. The product includes every stage between the measured condition and the person or system using the result.</p>
          <div className="mt-5 grid gap-3 lg:grid-cols-5">
            <FlowBlock icon={Activity} title="1. Sense & act" text="Sensors measure conditions; actuators change them." />
            <FlowBlock icon={Cpu} title="2. Device" text="Firmware reads, validates, processes and controls." />
            <FlowBlock icon={Router} title="3. Network" text="A wired or wireless link carries data securely." />
            <FlowBlock icon={Cloud} title="4. Platform" text="Services ingest, store, analyse and route information." />
            <FlowBlock icon={Smartphone} title="5. Application" text="Dashboards, alerts and APIs deliver the service." />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 font-semibold text-indigo-950">
            <span>Physical condition</span><ArrowRight size={18} /><span>Trusted data</span><ArrowRight size={18} /><span>Decision</span><ArrowRight size={18} /><span>Safe action</span>
          </div>
        </section>

        <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
          <h3 className="text-2xl font-bold text-cyan-950">Core building blocks</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Feature icon={Gauge} title="Sensors" text="Convert physical quantities into electrical or digital data. Accuracy, range, resolution, calibration and sampling rate matter." />
            <Feature icon={Zap} title="Actuators" text="Create physical effects using motors, relays, valves, heaters or indicators. They require safe driver and power circuits." />
            <Feature icon={Cpu} title="Controller" text="A microcontroller such as an ESP32 runs firmware, interfaces devices and manages local decisions and communication." />
            <Feature icon={Radio} title="Connectivity" text="Wi-Fi, Bluetooth LE, cellular, Ethernet, LoRaWAN and other technologies trade range, bandwidth, energy and cost." />
            <Feature icon={Database} title="Platform and data" text="A backend authenticates devices, receives messages, stores records and makes data available to services." />
            <Feature icon={Smartphone} title="User application" text="Dashboards, mobile apps, alerts and integrations turn device data into understandable and actionable information." />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Important IoT data flows</h3>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-slate-900 text-white"><tr><th className="p-4">Flow</th><th className="p-4">Direction</th><th className="p-4">Purpose</th><th className="p-4">Example</th></tr></thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <DataRow flow="Telemetry" direction="Device → service" purpose="Periodic measurements and health" example="Temperature: 28.4 °C; battery: 76%" />
                <DataRow flow="Event" direction="Device → service" purpose="Report a meaningful change" example="Door opened or vibration threshold exceeded" />
                <DataRow flow="Command" direction="Service → device" purpose="Request a controlled action" example="Set pump mode to automatic" />
                <DataRow flow="Configuration" direction="Service ↔ device" purpose="Manage operating parameters" example="Sampling interval changed to 60 seconds" />
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><Cloud className="text-cyan-300" /><h3 className="text-2xl font-bold">Device, edge and cloud processing</h3></div>
          <p className="mt-4 leading-8 text-slate-200">Processing should happen where it best meets response-time, energy, bandwidth, privacy, cost and availability requirements. Practical systems often divide work across all three levels.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <DarkCard title="Device" text="Fast local reading and control. Essential actions can continue even when the network is unavailable." />
            <DarkCard title="Edge or gateway" text="Aggregates nearby devices, translates protocols, filters data and supports low-latency local coordination." />
            <DarkCard title="Cloud" text="Provides central storage, fleet visibility, analytics, remote access and integration across many locations." />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Connected system vs standalone embedded system</h3>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[680px] text-left">
              <thead className="bg-blue-700 text-white"><tr><th className="p-4">Design aspect</th><th className="p-4">Standalone system</th><th className="p-4">IoT system</th></tr></thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <CompareRow label="Data" standalone="Used locally" connected="May be shared with edge or cloud services" />
                <CompareRow label="Control" standalone="Local inputs and logic" connected="Local logic plus authorised remote commands" />
                <CompareRow label="Dependencies" standalone="Primarily device hardware and firmware" connected="Device, network, platform, identity and application" />
                <CompareRow label="Security surface" standalone="Physical and local interfaces" connected="Physical, firmware, network, APIs, cloud and user accounts" />
                <CompareRow label="Failure planning" standalone="Power and component faults" connected="Also connectivity, backend, time sync and remote-service faults" />
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Common IoT applications</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Application title="Smart homes and buildings" text="Energy monitoring, lighting, air quality, access control, occupancy and equipment automation." />
            <Application title="Industrial IoT" text="Machine condition monitoring, production visibility, predictive maintenance and remote diagnostics." />
            <Application title="Agriculture" text="Soil and weather sensing, irrigation control, livestock monitoring and greenhouse automation." />
            <Application title="Healthcare and assisted living" text="Connected measurements, medication support and alerts designed with strong privacy and safety controls." />
            <Application title="Cities and infrastructure" text="Water, waste, street lighting, parking, environmental sensing and asset monitoring." />
            <Application title="Logistics and retail" text="Location, temperature, inventory, cold-chain condition and supply-chain visibility." />
          </div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex items-center gap-3"><Wrench className="text-amber-700" /><h3 className="text-2xl font-bold text-amber-950">Design from the problem, not from the gadget</h3></div>
          <ol className="mt-5 space-y-3 text-slate-700">
            {["Define the user, physical problem and measurable benefit.", "Identify what must be sensed, how accurately and how often.", "Decide which action, alert or decision will use the data.", "Choose device, edge and cloud responsibilities, including offline behaviour.", "Estimate range, bandwidth, latency, energy, installation and operating costs.", "Define device identity, access control, encryption, data retention and update requirements.", "Prototype the smallest end-to-end path and test it under normal and failure conditions."].map((item, index) => (
              <li key={item} className="flex gap-4 rounded-xl bg-white/80 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">{index + 1}</span><span>{item}</span></li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-3"><ShieldCheck className="text-red-700" /><h3 className="text-2xl font-bold text-red-950">Security, privacy and safety are system requirements</h3></div>
          <p className="mt-3 leading-8 text-red-900">Every device needs a unique identity and controlled access. Protect credentials, authenticate devices and users, encrypt sensitive traffic, validate all commands, minimise collected personal data, support secure updates and define a safe response when communication fails. Do not expose development passwords, API keys or private certificates in public source code.</p>
        </section>

        <section className="rounded-2xl bg-indigo-50 p-6">
          <div className="flex items-center gap-3"><Lightbulb className="text-indigo-700" /><h3 className="text-2xl font-bold text-indigo-950">Hands-on activity: design a smart room monitor</h3></div>
          <p className="mt-3 leading-8 text-indigo-900">Design an IoT system that measures room temperature and humidity, reports readings to a dashboard, warns the user when limits are exceeded and continues to indicate unsafe conditions locally if the internet connection is lost.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {["Name the sensor, controller and local indicator or actuator.", "Draw the path from measurement to dashboard and alert.", "Define the telemetry fields, units and reporting interval.", "Write one normal rule and one threshold-alert rule.", "Specify what is stored locally during a network outage.", "List three security controls and two acceptance tests."].map((item) => <div key={item} className="flex gap-3 rounded-xl bg-white p-4"><CheckCircle2 className="mt-0.5 shrink-0 text-indigo-600" size={20} /><span>{item}</span></div>)}
          </div>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter revision summary</h3>
          <ul className="mt-4 space-y-2 leading-7 text-blue-900">
            <li>• IoT connects physical devices, communication, digital services and applications to deliver a useful outcome.</li>
            <li>• Sensors create data, controllers process it, networks transport it, platforms manage it and actuators carry out safe actions.</li>
            <li>• Telemetry flows upward, commands flow downward, and events report meaningful state changes.</li>
            <li>• Device, edge and cloud computing should be divided according to latency, bandwidth, privacy, energy and availability needs.</li>
            <li>• Connectivity adds failure modes and security risks that must be addressed from the first design decision.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-xl font-bold text-emerald-950">Chapter completion checklist</h3>
          <p className="mt-3 leading-7 text-emerald-900">Complete the smart-room architecture activity, explain the end-to-end data path, distinguish telemetry from commands, describe one offline-safe behaviour, identify three security controls and score at least 80% in the quiz.</p>
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

  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30} /><div><h2 className="text-2xl font-bold">Chapter 1 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div>
      <div className="mt-6 space-y-6">
        {questions.map((item, index) => (
          <fieldset key={item.question} className="rounded-2xl border border-slate-200 p-5">
            <legend className="px-2 font-bold">{index + 1}. {item.question}</legend>
            <div className="mt-3 space-y-2">
              {item.options.map((option, optionIndex) => {
                const selected = answers[index] === optionIndex;
                const correct = submitted && optionIndex === item.answer;
                const incorrect = submitted && selected && optionIndex !== item.answer;
                return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`iot-ch1-${index}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>;
              })}
            </div>
          </fieldset>
        ))}
      </div>
      {!submitted ? <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button> : <div className={`mt-6 rounded-2xl border p-6 ${passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-red-700" />}<div><h3 className="text-xl font-bold">{passed ? "Chapter quiz passed" : "Review the lesson and try again"}</h3><p>You scored {score}/10 ({score * 10}%).</p></div></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18} /> Retake Quiz</button></div>}
    </section>
  );
}

function InfoCard({ title, text }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>;
}

function FlowBlock({ icon: Icon, title, text }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"><Icon className="mx-auto text-indigo-700" size={27} /><h4 className="mt-3 font-bold text-slate-900">{title}</h4><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>;
}

function Feature({ icon: Icon, title, text }) {
  return <div className="rounded-2xl border border-cyan-200 bg-white p-5"><Icon className="text-cyan-700" size={27} /><h4 className="mt-3 text-lg font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>;
}

function DataRow({ flow, direction, purpose, example }) {
  return <tr><th className="p-4 font-bold text-slate-900">{flow}</th><td className="p-4">{direction}</td><td className="p-4">{purpose}</td><td className="p-4">{example}</td></tr>;
}

function CompareRow({ label, standalone, connected }) {
  return <tr><th className="p-4 font-bold text-slate-900">{label}</th><td className="p-4">{standalone}</td><td className="p-4">{connected}</td></tr>;
}

function DarkCard({ title, text }) {
  return <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><h4 className="font-bold text-cyan-200">{title}</h4><p className="mt-2 leading-7 text-slate-200">{text}</p></div>;
}

function Application({ title, text }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><h4 className="text-lg font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>;
}

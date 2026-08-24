import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BatteryCharging,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  CloudSun,
  ExternalLink,
  Eye,
  MapPinned,
  Plane,
  RotateCcw,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";

const questions = [
  { question: "What best describes an unmanned aircraft system (UAS)?", options: ["Only the aircraft frame", "The aircraft together with its control and supporting systems", "Only a camera carried by an aircraft", "Any radio-controlled ground vehicle"], answer: 1 },
  { question: "Which force must increase for a multirotor to climb steadily?", options: ["Drag only", "Combined rotor thrust relative to weight", "Frame colour", "GPS accuracy"], answer: 1 },
  { question: "What is the safest first response when the operating area contains uninvolved people?", options: ["Fly higher over them", "Establish a safe area or postpone the flight", "Disable the return-to-home function", "Increase aircraft speed"], answer: 1 },
  { question: "Why must the Digital Sky airspace map be checked before each operation in India?", options: ["Airspace conditions and restrictions can affect whether and how a flight may be conducted", "It balances the propellers", "It charges the battery", "It replaces the aircraft inspection"], answer: 0 },
  { question: "What does visual line of sight help the remote pilot maintain?", options: ["Awareness of the aircraft and surrounding hazards", "Automatic battery charging", "Motor calibration", "Video recording quality only"], answer: 0 },
  { question: "Which weather condition is a reason to postpone a beginner training flight?", options: ["Stable light wind within limits", "Good visibility", "Strong gusts or an approaching storm", "A clear open training area"], answer: 2 },
  { question: "What should be done with a swollen or damaged LiPo battery?", options: ["Fly it once more", "Puncture it", "Isolate it safely and follow approved disposal guidance", "Charge it unattended"], answer: 2 },
  { question: "Why is a deliberate arming procedure important?", options: ["It prevents unintended motor activation", "It increases GPS satellite count", "It changes propeller size", "It replaces pilot training"], answer: 0 },
  { question: "What is the purpose of a pre-flight checklist?", options: ["Provide a repeatable way to detect hazards and configuration errors", "Guarantee that no failure can occur", "Remove the need to follow regulations", "Increase camera resolution"], answer: 0 },
  { question: "Who has the final responsibility to stop a flight when conditions are unsafe?", options: ["Only the battery manufacturer", "The responsible remote pilot/operator", "Only the camera operator", "A social-media viewer"], answer: 1 },
];

export default function DroneChapterOneLesson() {
  return (
    <>
      <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <header>
          <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 1</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Introduction to Drones and Aviation Safety</h2>
          <p className="mt-4 leading-8 text-slate-600">
            A drone is an aircraft, not merely a flying gadget. Safe operation begins with understanding the complete unmanned aircraft system, the basic forces that keep it airborne, the people and property that may be affected, and the disciplined decision to postpone a flight whenever conditions are unsuitable.
          </p>
        </header>

        <section>
          <h3 className="text-2xl font-bold text-slate-900">Learning objectives</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {["Define a drone, UAV and unmanned aircraft system.", "Identify common civil drone types and applications.", "Explain lift, weight, thrust and drag at an introductory level.", "Recognise people, airspace, weather, battery and equipment hazards.", "Use a structured site survey and pre-flight checklist.", "Know when to stop, postpone or safely terminate an operation."].map((item) => (
              <li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-6">
          <div className="flex items-center gap-3"><Plane className="text-blue-700" /><h3 className="text-2xl font-bold">Drone, UAV and UAS</h3></div>
          <p className="mt-4 leading-8 text-slate-700">The word <b>drone</b> is commonly used for an aircraft operated without an onboard pilot. <b>UAV</b> refers to the unmanned aerial vehicle itself. <b>UAS</b> is broader: it includes the aircraft, remote controller or ground station, command-and-control link, software, payload, pilot, procedures and supporting equipment.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <InfoCard title="Multirotor" text="Hovers precisely and is widely used for training, photography, inspection and short-range mapping." />
            <InfoCard title="Fixed wing" text="Uses aerodynamic wings for efficient forward flight and longer-area coverage but normally cannot hover." />
            <InfoCard title="Hybrid VTOL" text="Combines vertical takeoff and landing with efficient wing-borne forward flight; control and transition are more complex." />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold">How a multirotor flies</h3>
          <p className="mt-4 leading-8 text-slate-600">Rotating propellers accelerate air and create thrust. The aircraft climbs when total upward thrust exceeds its weight, descends when it is lower, and holds altitude when the forces are balanced. Controlled differences in motor speed create roll, pitch and yaw. Drag and wind oppose or disturb motion, so the flight controller continuously measures and corrects the aircraft&apos;s attitude.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard title="Thrust" text="Force created by the propulsion system." />
            <InfoCard title="Weight" text="Gravity acting on the complete aircraft mass." />
            <InfoCard title="Drag" text="Aerodynamic resistance opposing motion." />
            <InfoCard title="Control" text="Managed motor-speed changes produce roll, pitch and yaw." />
          </div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex items-center gap-3"><AlertTriangle className="text-amber-700" /><h3 className="text-2xl font-bold text-amber-950">The safety hierarchy</h3></div>
          <ol className="mt-5 space-y-3 text-slate-700">
            {["Avoid the hazard: choose a permitted, open location and suitable time.", "Reduce exposure: establish a clear takeoff/landing area and keep uninvolved people away.", "Use technical protection: configure arming controls, limits, warnings and appropriate fail-safe actions.", "Use disciplined procedures: inspection, briefing, checklist, communication and controlled flight plan.", "Use personal protection where appropriate, but never treat it as a substitute for the controls above."].map((item, index) => (
              <li key={item} className="flex gap-4 rounded-xl bg-white/80 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">{index + 1}</span><span>{item}</span></li>
            ))}
          </ol>
        </section>

        <section>
          <h3 className="text-2xl font-bold">Five areas to assess before flight</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <SafetyCard icon={MapPinned} title="Airspace and location" text="Confirm the site is permitted, identify nearby aerodromes, restricted areas, buildings, roads, power lines, trees and emergency landing space." />
            <SafetyCard icon={Users} title="People and property" text="Keep uninvolved people outside the operating area. Plan barriers, observers and a safe direction for takeoff, landing and contingency action." />
            <SafetyCard icon={CloudSun} title="Weather and visibility" text="Review wind, gusts, rain, temperature, visibility and changing conditions against aircraft and operator limits. Postpone when uncertain." />
            <SafetyCard icon={BatteryCharging} title="Aircraft and energy" text="Inspect the frame, fasteners, propellers, motors, battery condition and charge, connectors, antennas, payload security and storage capacity." />
            <SafetyCard icon={Eye} title="Pilot readiness" text="Operate only when trained, attentive and unimpaired. Maintain orientation and visual awareness; use an observer when the plan requires one." />
            <SafetyCard icon={ShieldCheck} title="Controls and contingencies" text="Verify firmware/configuration, controller inputs, home position, limits, alerts, return or landing behaviour, and a clear abort plan." />
          </div>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3"><MapPinned className="text-sky-300" /><h3 className="text-2xl font-bold">India: verify current requirements before every flight</h3></div>
          <p className="mt-4 leading-8 text-slate-200">Drone rules, airspace status, registration, certification and permission requirements can change and may depend on the aircraft and operation. Use the official DGCA and Digital Sky services—not an old screenshot or a training note—as the authoritative pre-flight reference. The Digital Sky airspace map distinguishes operational zones; a zone indication never removes the operator&apos;s duty to comply with all other applicable conditions.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="https://digitalsky.dgca.gov.in/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 font-semibold hover:bg-sky-400">Open Digital Sky <ExternalLink size={17} /></a>
            <a href="https://www.dgca.gov.in/digigov-portal/?page=jsp/dgca/InventoryList/headerblock/drones/RPAS.html" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-semibold hover:bg-white/10">DGCA drone resources <ExternalLink size={17} /></a>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3"><ClipboardCheck className="text-emerald-700" /><h3 className="text-2xl font-bold">Beginner pre-flight checklist</h3></div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {["Operation is lawful and the current airspace map has been checked.", "Site survey completed; takeoff, flight and emergency areas are clear.", "Weather and visibility are within conservative limits.", "Pilot, observer and team roles are understood.", "Frame, arms, landing gear and payload are secure.", "Propellers are undamaged, correctly fitted and tightened as specified.", "Battery is healthy, secured and sufficiently charged; voltage warnings are set.", "Controller, antennas, telemetry and control directions are verified.", "Home position, navigation status and fail-safe behaviour are confirmed.", "The aircraft is armed only in the clear takeoff area; stop criteria are agreed."].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={21} /><span>{item}</span></div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-indigo-50 p-6">
          <h3 className="text-2xl font-bold text-indigo-950">Hands-on activity: plan a flight without launching</h3>
          <p className="mt-3 leading-8 text-indigo-900">Choose a hypothetical open training site. Prepare a one-page site survey showing the operating boundary, takeoff/landing point, pilot position, spectator exclusion area, obstacles, wind direction and two emergency landing areas. Check the current Digital Sky map, record the date and time of the check, list five go/no-go criteria, and brief another learner as if they were your observer. No aircraft needs to be powered for this activity.</p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-xl font-bold text-blue-950">Chapter completion checklist</h3>
          <p className="mt-3 leading-7 text-blue-900">Explain the UAS as a complete system, identify the four introductory flight forces, complete the no-launch site-planning activity, review the current official DGCA/Digital Sky guidance, and score at least 80% in the chapter quiz.</p>
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
                return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct ? "border-green-300 bg-green-50" : incorrect ? "border-red-300 bg-red-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`drone-ch1-${index}`} checked={selected} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1" /><span>{option}</span></label>;
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

function SafetyCard({ icon: Icon, title, text }) {
  return <div className="rounded-2xl border border-slate-200 p-5"><Icon className="text-blue-600" size={27} /><h4 className="mt-3 text-lg font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>;
}

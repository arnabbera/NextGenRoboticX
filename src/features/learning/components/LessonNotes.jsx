import { Bot, Cpu, FileText, Lightbulb, Radio, Settings } from "lucide-react";

const robotElements = [
  {
    icon: Radio,
    title: "Sensors",
    text: "Measure the environment—distance, light, temperature, sound, position, motion or touch.",
  },
  {
    icon: Cpu,
    title: "Controller",
    text: "Processes sensor data and makes decisions using programmed instructions.",
  },
  {
    icon: Settings,
    title: "Actuators",
    text: "Create physical action through motors, servos, relays, grippers and other mechanisms.",
  },
];

const applications = [
  "Manufacturing and industrial automation",
  "Healthcare, surgery and rehabilitation",
  "Agriculture and crop monitoring",
  "Warehousing and logistics",
  "Space, underwater and disaster exploration",
  "Education, research and entertainment",
  "Domestic service and assistive technology",
  "Defence and public-safety operations",
];

export default function LessonNotes() {
  return (
    <article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
      <header className="border-b border-slate-200 pb-6">
        <div className="mb-4 flex items-center gap-3">
          <FileText className="text-blue-600" size={30} aria-hidden="true" />
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            Chapter 1
          </p>
        </div>
        <h2 className="text-3xl font-bold text-slate-900">
          Introduction to Robotics
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          Robotics combines mechanical engineering, electronics, computer
          science and control systems to create machines that can sense, decide
          and act in the physical world.
        </p>
      </header>

      <section>
        <h3 className="text-2xl font-bold text-slate-900">Learning objectives</h3>
        <p className="mt-2 text-slate-600">After completing this chapter, you should be able to:</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            "Define a robot and the field of robotics.",
            "Explain the sense–think–act cycle.",
            "Identify the main components of a robotic system.",
            "Distinguish autonomous, semi-autonomous and teleoperated robots.",
            "Recognise major robot types and real-world applications.",
            "Describe basic benefits, limitations, safety and ethical concerns.",
          ].map((item) => (
            <li key={item} className="rounded-xl border border-slate-200 p-4 text-slate-700">
              <span className="mr-2 font-bold text-green-600">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-blue-50 p-6">
        <div className="flex items-center gap-3">
          <Bot className="text-blue-700" size={28} aria-hidden="true" />
          <h3 className="text-2xl font-bold text-slate-900">What is a robot?</h3>
        </div>
        <p className="mt-4 leading-7 text-slate-700">
          A robot is a programmable machine designed to perform tasks by
          interacting with its environment. A typical robot receives
          information through sensors, processes that information using a
          controller, and produces an action through actuators. A robot does
          not have to look human; an industrial arm, an autonomous mobile
          vehicle and a robotic vacuum are all robots.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-slate-900">The sense–think–act cycle</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {robotElements.map(({ icon: Icon, title, text }, index) => (
            <div key={title} className="rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                  {index + 1}
                </span>
                <Icon className="text-blue-700" size={24} aria-hidden="true" />
              </div>
              <h4 className="mt-4 text-xl font-bold text-slate-900">{title}</h4>
              <p className="mt-2 leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-slate-900">Essential robot components</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-3">Component</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">Examples</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                ["Mechanical structure", "Supports and moves the robot", "Frame, wheels, joints, links"],
                ["Power source", "Supplies electrical energy", "Battery, regulated power supply"],
                ["Sensors", "Observe internal or external conditions", "Ultrasonic, IR, encoder, camera"],
                ["Controller", "Runs the robot program", "Arduino, ESP32, Raspberry Pi, PLC"],
                ["Actuators", "Convert energy into movement or action", "DC motor, servo, stepper, pneumatic cylinder"],
                ["Software", "Defines behaviour and decision logic", "Embedded C, Python, ROS programs"],
                ["Communication", "Exchanges data with users or systems", "Bluetooth, Wi-Fi, radio, CAN"],
              ].map(([component, purpose, examples]) => (
                <tr key={component} className="align-top">
                  <td className="p-3 font-semibold text-slate-900">{component}</td>
                  <td className="p-3 text-slate-600">{purpose}</td>
                  <td className="p-3 text-slate-600">{examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-slate-900">Common types of robots</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            ["Industrial robots", "Fixed manipulators used for welding, assembly, painting and material handling."],
            ["Mobile robots", "Wheeled, tracked, legged, aerial or underwater robots that move through an environment."],
            ["Humanoid robots", "Robots whose body structure or behaviour resembles aspects of a human."],
            ["Service robots", "Robots that assist people outside traditional industrial automation."],
            ["Collaborative robots", "Robots designed to work near people with appropriate safety controls."],
            ["Autonomous robots", "Robots that perceive conditions and perform tasks with limited human intervention."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl border border-slate-200 p-5">
              <h4 className="font-bold text-slate-900">{title}</h4>
              <p className="mt-2 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-slate-900">Applications of robotics</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {applications.map((item) => (
            <li key={item} className="flex gap-3 rounded-xl bg-slate-50 p-4 text-slate-700">
              <span className="text-blue-600">●</span>{item}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-center gap-3">
          <Lightbulb className="text-amber-700" size={26} aria-hidden="true" />
          <h3 className="text-xl font-bold text-slate-900">Benefits and responsible use</h3>
        </div>
        <p className="mt-3 leading-7 text-slate-700">
          Robots can improve precision, productivity and safety, especially in
          repetitive or hazardous work. They also introduce limitations and
          responsibilities: cost, maintenance, sensing errors, cybersecurity,
          privacy, human oversight and the effect of automation on work. A safe
          robot must be designed, tested and operated within defined limits.
        </p>
      </section>

      <section className="rounded-2xl bg-slate-900 p-6 text-white">
        <h3 className="text-2xl font-bold">Chapter summary</h3>
        <ul className="mt-4 space-y-3 text-slate-200">
          <li>• Robotics is an interdisciplinary field involving mechanics, electronics, control and computing.</li>
          <li>• A robot follows a sense–think–act cycle.</li>
          <li>• Sensors provide input, controllers process it, and actuators generate output.</li>
          <li>• Robots may be autonomous, semi-autonomous or remotely operated.</li>
          <li>• Safety, reliability, privacy and human oversight are central to responsible robotics.</li>
        </ul>
      </section>
    </article>
  );
}

import { Link } from "react-router-dom";
import { CheckCircle2, Target, Wrench } from "lucide-react";
import courses from "../../features/courses/data/courses";

const COURSE_OUTCOMES = {
  "robotics-foundation": {
    audience: "School students, beginners and parents seeking a structured first robotics course.",
    build: "A multi-mode mobile robot using sensors, motors and Arduino control.",
    skills: ["Electronics", "Arduino", "Sensors", "Motor control"],
  },
  "arduino-programming": {
    audience: "Beginners who want to turn electronic ideas into working prototypes.",
    build: "A smart Arduino automation system with sensors, outputs and communication.",
    skills: ["Embedded C", "GPIO", "PWM", "I2C & SPI"],
  },
  "raspberry-pi": {
    audience: "Learners ready to combine Python, Linux and physical computing.",
    build: "A connected Raspberry Pi application using GPIO, APIs and computer vision.",
    skills: ["Python", "Linux", "GPIO", "Networking"],
  },
  "internet-of-things": {
    audience: "Students and makers who want to connect devices securely to the cloud.",
    build: "An ESP32 monitoring and control system with MQTT and a live dashboard.",
    skills: ["ESP32", "MQTT", "Cloud dashboards", "IoT security"],
  },
  "embedded-systems": {
    audience: "Electronics learners moving from Arduino projects to product-level firmware.",
    build: "Microcontroller firmware that reads peripherals and responds in real time.",
    skills: ["Embedded C", "MCU architecture", "Peripherals", "Debugging"],
  },
  "pcb-design-hardware-development": {
    audience: "Makers and electronics students who want to turn circuits into manufacturable boards.",
    build: "A complete PCB package from schematic through layout and fabrication files.",
    skills: ["Schematics", "PCB layout", "DFM", "Bring-up"],
  },
  "artificial-intelligence": {
    audience: "Beginners interested in understanding and applying practical AI workflows.",
    build: "Guided AI applications that progress from data preparation to evaluation.",
    skills: ["Python", "Data preparation", "Model basics", "Evaluation"],
  },
  "drone-technology": {
    audience: "Robotics learners interested in flight hardware, control and autonomous systems.",
    build: "A documented drone system plan covering propulsion, control and safe operation.",
    skills: ["Flight systems", "Electronics", "Telemetry", "Navigation"],
  },
  "sensors-and-actuators": {
    audience: "Beginners who need a practical foundation in electronic input and output devices.",
    build: "Interactive circuits that sense the environment and control physical movement.",
    skills: ["Sensor interfacing", "Signal reading", "Actuators", "Calibration"],
  },
};

export default function FeaturedCourses() {
  return (
    <section id="courses" className="scroll-mt-24 bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Choose by outcome
          </span>
          <h2 className="mt-6 text-4xl font-bold text-slate-800">
            What do you want to build?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Every course identifies who it is for, the practical outcome you will work toward,
            and the skills you will take away.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => {
            const available = course.status === "Available";
            const outcome = COURSE_OUTCOMES[course.id];
            const coursePath = `/courses/${course.id}`;

            return (
              <article
                key={course.id}
                className="flex overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="flex w-full flex-col">
                  <img src={course.image} alt={course.title} className="h-56 w-full object-cover" />

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                        {course.level}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        available ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                      }`}>
                        {course.status}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-800">{course.title}</h3>

                    {outcome && (
                      <div className="mt-5 space-y-4">
                        <div>
                          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-blue-700">
                            <Target size={17} /> Best for
                          </p>
                          <p className="mt-1 text-sm leading-6 text-slate-600">{outcome.audience}</p>
                        </div>
                        <div>
                          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-blue-700">
                            <Wrench size={17} /> You&apos;ll build
                          </p>
                          <p className="mt-1 text-sm leading-6 text-slate-600">{outcome.build}</p>
                        </div>
                        <div>
                          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-blue-700">
                            <CheckCircle2 size={17} /> Skills gained
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {outcome.skills.map((skill) => (
                              <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex justify-between border-t border-slate-100 pt-5 text-sm text-slate-500">
                      <span>📚 {course.chapters} Chapters</span>
                      <span>⏳ {course.duration}</span>
                    </div>

                    {available ? (
                      <Link to={coursePath} className="mt-6 block rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700">
                        See curriculum and outcomes
                      </Link>
                    ) : (
                      <button type="button" disabled className="mt-6 block w-full cursor-not-allowed rounded-xl bg-slate-300 py-3 text-center font-semibold text-slate-600">
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

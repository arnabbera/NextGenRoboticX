import { motion } from "framer-motion";

const projects = [
  {
    title: "Obstacle Avoiding Robot",
    image: "/images/projects/obstacle.png",
    tech: ["Arduino", "Ultrasonic", "C++"],
    level: "Beginner",
    duration: "6 Hours",
  },
  {
    title: "Line Following Robot",
    image: "/images/projects/linefollower.png",
    tech: ["Arduino", "IR Sensors", "Embedded C"],
    level: "Beginner",
    duration: "5 Hours",
  },
  {
    title: "IoT Smart Monitoring",
    image: "/images/projects/iot.png",
    tech: ["ESP32", "MQTT", "Firebase"],
    level: "Intermediate",
    duration: "8 Hours",
  },
  {
    title: "Smart Home Automation",
    image: "/images/projects/smarthome.png",
    tech: ["ESP32", "Relay", "WiFi"],
    level: "Intermediate",
    duration: "10 Hours",
  },
  {
    title: "Drone Technology",
    image: "/images/projects/drone.png",
    tech: ["Flight Controller", "GPS", "Telemetry"],
    level: "Advanced",
    duration: "20 Hours",
  },
  {
    title: "AI Face Recognition Robot",
    image: "/images/projects/facerecognition.png",
    tech: ["Python", "OpenCV", "AI"],
    level: "Advanced",
    duration: "15 Hours",
  },
  {
    title: "Humanoid Robot",
    image: "/images/projects/humanoid.png",
    tech: ["Servo", "Arduino Mega", "AI"],
    level: "Advanced",
    duration: "30 Hours",
  },
  {
    title: "Robotic Arm Automation",
    image: "/images/projects/roboticarm.png",
    tech: ["Servo", "Arduino", "Automation"],
    level: "Intermediate",
    duration: "12 Hours",
  },
  {
    title: "Smart Agriculture",
    image: "/images/projects/agriculture.png",
    tech: ["ESP32", "IoT", "Sensors"],
    level: "Advanced",
    duration: "18 Hours",
  },
];

export default function StudentProjects() {
  return (
    <section className="bg-slate-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            Student Projects
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Learn by Building Real Projects
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            Every student builds practical robotics and AI projects throughout
            the course. Learn by doing, not just watching videos.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {projects.map((project, index) => (

            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >

              <img
                src={project.image}
                alt={project.title}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold text-slate-900">
                  {project.title}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">

                  {project.tech.map((item) => (

                    <span
                      key={item}
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                    >
                      {item}
                    </span>

                  ))}

                </div>

                <div className="mt-5 flex items-center justify-between text-sm text-slate-500">

                  <span>
                    🎯 {project.level}
                  </span>

                  <span>
                    ⏱ {project.duration}
                  </span>

                </div>

                <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
                  View Project
                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}
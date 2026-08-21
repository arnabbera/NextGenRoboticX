import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "Obstacle Avoiding Robot",
    image: "/images/projects/obstacle.png",
    level: "Beginner",
    duration: "6 Hours",
    tech: ["Arduino", "Ultrasonic", "Embedded C"],
    path: "/projects/obstacle-avoiding-robot",
  },
  {
    title: "Line Following Robot",
    image: "/images/projects/linefollower.png",
    level: "Beginner",
    duration: "5 Hours",
    tech: ["Arduino", "IR Sensor", "Embedded C"],
    path: "/projects/line-following-robot",
  },
  {
    title: "IoT Smart Monitoring",
    image: "/images/projects/iot.png",
    level: "Intermediate",
    duration: "8 Hours",
    tech: ["ESP32", "MQTT", "Firebase"],
    path: "/projects/iot-smart-monitoring",
  },
  {
    title: "Smart Home Automation",
    image: "/images/projects/smarthome.png",
    level: "Intermediate",
    duration: "10 Hours",
    tech: ["ESP32", "Relay", "WiFi"],
    path: "/projects/smart-home-automation",
  },
  {
    title: "Drone Technology",
    image: "/images/projects/drone.png",
    level: "Advanced",
    duration: "20 Hours",
    tech: ["Flight Controller", "GPS", "Telemetry"],
    path: "/projects/arduino-drone",
  },
  {
    title: "AI Face Recognition Robot",
    image: "/images/projects/facerecognition.png",
    level: "Advanced",
    duration: "15 Hours",
    tech: ["Python", "OpenCV", "AI"],
    path: "/projects/face-recognition-robot",
  },
  {
    title: "Humanoid Robot",
    image: "/images/projects/humanoid.png",
    level: "Advanced",
    duration: "30 Hours",
    tech: ["Servo", "Arduino Mega", "AI"],
    path: "/projects/humanoid-robot",
  },
  {
    title: "Robotic Arm Automation",
    image: "/images/projects/roboticarm.png",
    level: "Intermediate",
    duration: "12 Hours",
    tech: ["Servo", "Automation", "Arduino"],
    path: "/projects/robotic-arm-automation",
  },
  {
    title: "Smart Agriculture System",
    image: "/images/projects/agriculture.png",
    level: "Advanced",
    duration: "18 Hours",
    tech: ["ESP32", "IoT", "Sensors"],
    path: "/projects/smart-agriculture",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="mx-auto max-w-7xl">

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-slate-900">
            Student Projects
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Explore robotics, AI and IoT projects built during the
            NextGenRoboticX learning journey.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {projects.map((project, index) => (

            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.05,
              }}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >

              <img
                src={project.image}
                alt={project.title}
                className="h-60 w-full object-cover"
              />

              <div className="p-6">

                <h2 className="text-2xl font-bold">
                  {project.title}
                </h2>

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

                <div className="mt-5 flex justify-between text-sm text-slate-500">

                  <span>🎯 {project.level}</span>

                  <span>⏱ {project.duration}</span>

                </div>

                <Link
                  to={project.path}
                  className="mt-6 block w-full rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                  aria-label={`View ${project.title}`}
                >
                  View Project
                </Link>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>
  );
}
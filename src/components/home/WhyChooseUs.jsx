import {
  Bot,
  Brain,
  Cpu,
  Plane,
  Award,
  GraduationCap,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Robotics Projects",
    description:
      "Build real robots using Arduino, Raspberry Pi and embedded systems.",
  },
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description:
      "Learn Machine Learning, Computer Vision and practical AI applications.",
  },
  {
    icon: Cpu,
    title: "IoT & Embedded",
    description:
      "Master ESP32, Embedded C, sensors, MQTT and cloud connectivity.",
  },
  {
    icon: Plane,
    title: "Drone Technology",
    description:
      "Design, build and program autonomous drones from scratch.",
  },
  {
    icon: Award,
    title: "Industry Certification",
    description:
      "Earn certification after completing projects and online assessments.",
  },
  {
    icon: GraduationCap,
    title: "Expert Mentorship",
    description:
      "Learn from experienced engineers with real industry exposure.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Why Choose Us
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Why Learn with NextGenRoboticX?
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            Learn Robotics, Artificial Intelligence, Embedded Systems,
            IoT and Drone Technology through practical projects,
            expert guidance and industry-oriented certification.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
              >

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 transition group-hover:bg-blue-600">

                  <Icon
                    size={32}
                    className="text-blue-600 group-hover:text-white"
                  />

                </div>

                <h3 className="text-2xl font-bold text-slate-800">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}
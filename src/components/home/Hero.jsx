import { PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 text-white">
      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center gap-12 px-5 py-14 sm:px-6 sm:py-16 lg:flex-row">
        <div className="flex-1">
          <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm text-blue-300">
            Robotics • AI • IoT • Embedded Systems
          </span>

          <h1 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Build Robots.
            <br />
            Learn AI.
            <br />
            Create the Future.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Learn Robotics, Artificial Intelligence, Arduino, Raspberry Pi,
            Drone Technology and IoT through hands-on projects and
            industry-oriented certification.
          </p>

          <a
            href="#courses"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            <PlayCircle size={21} />
            Explore Courses
          </a>
        </div>

        <div className="flex flex-1 justify-center">
          <img
            src="/images/project.png"
            alt="NextGenRoboticX robotics, AI, IoT and embedded systems courses"
            className="max-h-[650px] w-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

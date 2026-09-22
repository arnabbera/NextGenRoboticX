import { Award, FolderKanban, Headphones, PlayCircle, Wrench } from "lucide-react";

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
            Go from curious beginner to confident builder. Follow structured
            lessons, create working hardware projects, complete assessments,
            and earn a personalized course-completion certificate.
          </p>

          <div className="mt-8 grid max-w-2xl gap-3 text-sm text-slate-200 sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 p-3">
              <Wrench className="shrink-0 text-amber-300" size={20} />
              Build practical projects
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 p-3">
              <Award className="shrink-0 text-amber-300" size={20} />
              Assessment and certificate
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 p-3">
              <Headphones className="shrink-0 text-amber-300" size={20} />
              Help when you get stuck
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#courses" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700">
              <PlayCircle size={21} />
              Explore Courses
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-xl border border-blue-300/60 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20">
              <FolderKanban size={21} />
              Explore Projects
            </a>
          </div>
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

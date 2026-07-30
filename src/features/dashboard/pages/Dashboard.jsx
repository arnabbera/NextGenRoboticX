import Courses from "../../courses/pages/Courses";
import {
  BookOpen,
  GraduationCap,
  Award,
  Clock,
  TrendingUp,
  PlayCircle,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Enrolled Courses",
      value: "6",
      icon: <BookOpen className="h-7 w-7 text-blue-600" />,
    },
    {
      title: "Completed",
      value: "2",
      icon: <GraduationCap className="h-7 w-7 text-green-600" />,
    },
    {
      title: "Certificates",
      value: "2",
      icon: <Award className="h-7 w-7 text-amber-600" />,
    },
    {
      title: "Learning Hours",
      value: "42",
      icon: <Clock className="h-7 w-7 text-purple-600" />,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome to NextGenRoboticX
            </h1>

            <p className="mt-3 max-w-2xl text-blue-100">
              Continue your Robotics & AI journey with hands-on projects,
              embedded systems, IoT, drone technology and certification.
            </p>

            <button className="mt-6 flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-slate-100">
              <PlayCircle size={20} />
              Continue Learning
            </button>
          </div>

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <div className="text-sm uppercase tracking-wide text-blue-100">
              Overall Progress
            </div>

            <div className="mt-2 text-5xl font-bold">68%</div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: "68%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                  {item.value}
                </h2>
              </div>

              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Continue Learning */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">
              Continue Learning
            </h2>

            <TrendingUp className="text-blue-600" />
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h3 className="text-xl font-semibold">
              Robotics Foundation
            </h3>

            <p className="mt-2 text-slate-600">
              Chapter 4 • Sensors & Actuators
            </p>

            <div className="mt-5 h-3 rounded-full bg-blue-100">
              <div
                className="h-3 rounded-full bg-blue-600"
                style={{ width: "68%" }}
              />
            </div>

            <p className="mt-2 text-sm text-slate-600">
              68% Completed
            </p>

            <button className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
              Resume Course
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold text-slate-800">
            Upcoming Goals
          </h2>

          <ul className="mt-5 space-y-4">
            <li>✅ Finish Chapter 4</li>
            <li>⬜ Complete Quiz 4</li>
            <li>⬜ Upload Arduino Project</li>
            <li>⬜ Schedule Certification Exam</li>
          </ul>
        </div>
      </div>

      {/* Available Courses */}
      <Courses />
    </div>
  );
}
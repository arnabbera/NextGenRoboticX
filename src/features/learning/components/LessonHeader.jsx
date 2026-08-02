import { Award, BookOpen, Clock } from "lucide-react";

export default function LessonHeader({ course }) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {course.category}
          </span>

          <h1 className="mt-4 text-4xl font-bold">
            {course.title}
          </h1>

          <p className="mt-3 max-w-3xl text-slate-600">
            {course.description}
          </p>

        </div>

        <div className="grid grid-cols-3 gap-4">

          <Stat
            icon={<BookOpen size={20} />}
            title="Chapters"
            value={course.chapters}
          />

          <Stat
            icon={<Clock size={20} />}
            title="Duration"
            value={course.duration}
          />

          <Stat
            icon={<Award size={20} />}
            title="Certificate"
            value="Yes"
          />

        </div>

      </div>

    </div>
  );
}

function Stat({ icon, title, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5 text-center">

      <div className="mb-3 flex justify-center text-blue-600">
        {icon}
      </div>

      <div className="text-2xl font-bold">
        {value}
      </div>

      <div className="mt-1 text-sm text-slate-500">
        {title}
      </div>

    </div>
  );
}
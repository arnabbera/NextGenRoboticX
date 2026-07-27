import { BookOpen, Clock, Layers, Award } from "lucide-react";

export default function CourseInfoCards({ course }) {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <BookOpen className="mb-3 text-blue-600" size={24} />
        <h3 className="font-semibold text-slate-800">Chapters</h3>
        <p className="mt-1 text-slate-600">{course.chapters}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <Clock className="mb-3 text-blue-600" size={24} />
        <h3 className="font-semibold text-slate-800">Duration</h3>
        <p className="mt-1 text-slate-600">{course.duration}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <Layers className="mb-3 text-blue-600" size={24} />
        <h3 className="font-semibold text-slate-800">Level</h3>
        <p className="mt-1 text-slate-600">{course.level}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <Award className="mb-3 text-blue-600" size={24} />
        <h3 className="font-semibold text-slate-800">Certificate</h3>
        <p className="mt-1 text-slate-600">
          {course.certificate ? "Included" : "Not Available"}
        </p>
      </div>
    </div>
  );
}
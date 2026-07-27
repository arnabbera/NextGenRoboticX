import { courseContent } from "../data/courseContent";
import { BookOpen, Lock, CheckCircle } from "lucide-react";

export default function ChapterList({ courseId }) {
  const course = courseContent[courseId];

  if (!course || !course.chapters.length) {
    return (
      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-2 text-xl font-bold">Course Curriculum</h2>
        <p className="text-slate-500">
          Curriculum will be available soon.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">Course Curriculum</h2>

      <div className="space-y-4">
        {course.chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-4">
              <BookOpen className="text-blue-600" size={22} />

              <div>
                <h3 className="font-semibold">
                  Chapter {chapter.id}: {chapter.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {chapter.duration}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {chapter.completed ? (
                <CheckCircle className="text-green-600" size={22} />
              ) : (
                <Lock className="text-slate-400" size={20} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
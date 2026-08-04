import { BookOpen, Clock, Trophy } from "lucide-react";
import { useParams } from "react-router-dom";

export default function LessonHeader() {
  const { courseId } = useParams();

  // Temporary values (will come from Firestore later)
  const courseTitle =
    courseId === "robotics-foundation"
      ? "Robotics Foundation"
      : "Course";

  const chapter = 1;
  const lesson = 1;
  const progress = 0;
  const duration = "2 Months";

  return (
    <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white shadow-lg">

      <div className="mx-auto max-w-7xl px-6 py-6">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              {courseTitle}
            </h1>

            <p className="mt-2 text-blue-100">
              Chapter {chapter} • Lesson {lesson}
            </p>

          </div>

          <div className="grid grid-cols-3 gap-4">

            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">

              <div className="flex items-center gap-2">

                <BookOpen size={18} />

                <span className="text-sm">
                  Progress
                </span>

              </div>

              <div className="mt-2 text-2xl font-bold">
                {progress}%
              </div>

            </div>

            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">

              <div className="flex items-center gap-2">

                <Clock size={18} />

                <span className="text-sm">
                  Duration
                </span>

              </div>

              <div className="mt-2 text-lg font-semibold">
                {duration}
              </div>

            </div>

            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">

              <div className="flex items-center gap-2">

                <Trophy size={18} />

                <span className="text-sm">
                  Certificate
                </span>

              </div>

              <div className="mt-2 text-lg font-semibold">
                Included
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
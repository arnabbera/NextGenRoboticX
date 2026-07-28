import {
  CheckCircle,
  Lock,
  PlayCircle,
} from "lucide-react";

export default function ChapterSidebar({
  lessons,
  activeLessonId,
  onSelect,
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow">

      <h2 className="mb-5 text-xl font-bold">
        Chapters
      </h2>

      <div className="space-y-3">

        {lessons.map((lesson, index) => {

          const active = lesson.id === activeLessonId;

          return (
            <button
              key={lesson.id}
              disabled={lesson.locked}
              onClick={() => onSelect(lesson.id)}
              className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all

              ${
                active
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
              }

              ${
                lesson.locked
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
            >

              <div>

                {lesson.completed ? (
                  <CheckCircle
                    className="text-green-600"
                    size={22}
                  />
                ) : lesson.locked ? (
                  <Lock
                    className="text-slate-400"
                    size={20}
                  />
                ) : (
                  <PlayCircle
                    className="text-blue-600"
                    size={22}
                  />
                )}

              </div>

              <div className="flex-1">

                <p className="font-semibold">

                  Chapter {index + 1}

                </p>

                <p className="text-sm text-slate-500">

                  {lesson.title}

                </p>

              </div>

            </button>
          );
        })}

      </div>
    </div>
  );
}
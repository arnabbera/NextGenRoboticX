import {
  CheckCircle2,
  Lock,
  PlayCircle,
  FileQuestion,
  Hammer,
} from "lucide-react";

export default function ChapterSidebar({
  chapters,
  activeChapter,
  setActiveChapter,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Course Curriculum
      </h2>

      <div className="space-y-4">

        {chapters.map((chapter, index) => {
          const completed = index < activeChapter;
          const current = index === activeChapter;
          const locked = index > activeChapter + 1;

          return (
            <button
              key={chapter.id}
              disabled={locked}
              onClick={() => setActiveChapter(index)}
              className={`w-full rounded-2xl border p-4 text-left transition

              ${
                current
                  ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                  : completed
                  ? "border-green-500 bg-green-50"
                  : locked
                  ? "cursor-not-allowed bg-slate-100 opacity-60"
                  : "hover:border-blue-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">

                <div className="font-semibold">
                  Chapter {index + 1}
                </div>

                {completed ? (
                  <CheckCircle2
                    size={18}
                    className="text-green-600"
                  />
                ) : locked ? (
                  <Lock size={18} />
                ) : (
                  <PlayCircle size={18} />
                )}

              </div>

              <div className="mt-2 text-sm">
                {chapter.title}
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">

                {chapter.duration && (
                  <span className="rounded-full bg-slate-200 px-2 py-1">
                    {chapter.duration}
                  </span>
                )}

                {chapter.quiz && (
                  <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-orange-700">
                    <FileQuestion size={12} />
                    Quiz
                  </span>
                )}

                {chapter.project && (
                  <span className="flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-purple-700">
                    <Hammer size={12} />
                    Project
                  </span>
                )}

              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
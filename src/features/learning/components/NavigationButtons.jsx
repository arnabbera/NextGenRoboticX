import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NavigationButtons({
  activeChapter,
  totalChapters,
  setActiveChapter,
}) {
  const previousDisabled = activeChapter === 0;
  const nextDisabled = activeChapter === totalChapters - 1;

  return (
    <div className="rounded-3xl bg-white p-6 shadow">

      <div className="flex items-center justify-between">

        <button
          disabled={previousDisabled}
          onClick={() => setActiveChapter(activeChapter - 1)}
          className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition
            ${
              previousDisabled
                ? "cursor-not-allowed bg-slate-200 text-slate-400"
                : "bg-slate-800 text-white hover:bg-slate-900"
            }`}
        >
          <ChevronLeft size={18} />
          Previous Lesson
        </button>

        <div className="text-center">

          <div className="text-sm text-slate-500">
            Current Lesson
          </div>

          <div className="text-xl font-bold text-blue-600">
            {activeChapter + 1} / {totalChapters}
          </div>

        </div>

        <button
          disabled={nextDisabled}
          onClick={() => setActiveChapter(activeChapter + 1)}
          className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition
            ${
              nextDisabled
                ? "cursor-not-allowed bg-slate-200 text-slate-400"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
          Next Lesson
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
}
export default function NavigationButtons({
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex items-center justify-between">

      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={`rounded-lg px-5 py-2 font-medium transition-all ${
          hasPrevious
            ? "border border-slate-300 hover:bg-slate-100"
            : "cursor-not-allowed border border-slate-200 text-slate-400"
        }`}
      >
        ← Previous
      </button>

      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`rounded-lg px-5 py-2 font-medium text-white transition-all ${
          hasNext
            ? "bg-blue-600 hover:bg-blue-700"
            : "cursor-not-allowed bg-slate-400"
        }`}
      >
        Next →
      </button>

    </div>
  );
}
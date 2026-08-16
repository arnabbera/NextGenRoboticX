import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NavigationButtons() {
  return (
    <div className="mt-6 flex justify-between">

      <button className="flex items-center gap-2 rounded-xl border px-6 py-3 hover:bg-slate-100">

        <ChevronLeft size={18} />

        Previous Lesson

      </button>

      <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">

        Next Lesson

        <ChevronRight size={18} />

      </button>

    </div>
  );
}
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavigationButtons() {
  return (
    <div className="mt-6 flex justify-between gap-4">
      <span className="flex items-center gap-2 rounded-xl border bg-slate-100 px-6 py-3 text-slate-400">
        <ChevronLeft size={18} />
        Previous Lesson
      </span>

      <Link
        to="/courses/robotics-foundation/learn/chapter-2"
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Chapter 2: Arduino Basics
        <ChevronRight size={18} />
      </Link>
    </div>
  );
}

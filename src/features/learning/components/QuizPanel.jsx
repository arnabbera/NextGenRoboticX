import { CircleHelp } from "lucide-react";

export default function QuizPanel() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <div className="flex items-center gap-3">

        <CircleHelp
          className="text-blue-600"
          size={28}
        />

        <h2 className="text-2xl font-bold">
          Quiz
        </h2>

      </div>

      <div className="mt-6 rounded-xl border border-dashed p-10 text-center">

        <h3 className="text-xl font-semibold">
          Quiz Coming Soon
        </h3>

        <p className="mt-2 text-slate-500">
          Chapter quizzes will appear here after completing the lesson.
        </p>

      </div>

    </div>
  );
}
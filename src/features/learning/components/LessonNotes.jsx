import {
  BookOpen,
  Lightbulb,
  TriangleAlert,
} from "lucide-react";

export default function LessonNotes({ lesson }) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow">

      <div className="flex items-center gap-3">

        <BookOpen
          size={28}
          className="text-blue-600"
        />

        <h2 className="text-3xl font-bold">
          Lesson Notes
        </h2>

      </div>

      <p className="mt-6 leading-8 text-slate-700">
        {lesson.notes ||
          "Lesson notes will be available soon. These notes will explain the concepts covered in this lesson with diagrams, examples and practical implementation steps."}
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">

          <div className="mb-3 flex items-center gap-2">

            <Lightbulb
              size={22}
              className="text-blue-600"
            />

            <h3 className="text-xl font-bold">
              Key Concepts
            </h3>

          </div>

          <ul className="space-y-2 text-slate-700">

            <li>• Understand the theory.</li>

            <li>• Observe the demonstration.</li>

            <li>• Build the project yourself.</li>

            <li>• Complete the quiz.</li>

          </ul>

        </div>

        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">

          <div className="mb-3 flex items-center gap-2">

            <TriangleAlert
              size={22}
              className="text-orange-600"
            />

            <h3 className="text-xl font-bold">
              Important
            </h3>

          </div>

          <ul className="space-y-2 text-slate-700">

            <li>• Watch the complete video.</li>

            <li>• Finish the assignment.</li>

            <li>• Practice before moving ahead.</li>

            <li>• Ask questions if stuck.</li>

          </ul>

        </div>

      </div>

    </div>
  );
}
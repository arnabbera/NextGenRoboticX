import { CheckCircle } from "lucide-react";

export default function LearningOutcomes({ course }) {
  if (
    !course.learningOutcomes ||
    course.learningOutcomes.length === 0
  ) {
    return null;
  }

  return (
    <section className="mt-10 rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">
        What You'll Learn
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {course.learningOutcomes.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg border border-slate-200 p-4"
          >
            <CheckCircle
              className="mt-1 text-green-600"
              size={22}
            />

            <p className="text-slate-700">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
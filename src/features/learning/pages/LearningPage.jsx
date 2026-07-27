import { useParams } from "react-router-dom";
import courses from "../../courses/data/courses";

export default function LearningPage() {
  const { courseId } = useParams();

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">
          Course not found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl p-6">

        <h1 className="mb-2 text-4xl font-bold">
          {course.title}
        </h1>

        <p className="mb-8 text-slate-600">
          Welcome to your learning workspace.
        </p>

        <div className="grid grid-cols-12 gap-6">

          {/* Sidebar */}

          <div className="col-span-3 rounded-xl bg-white p-5 shadow">

            <h2 className="mb-4 font-bold">
              Chapters
            </h2>

            {Array.from({ length: course.chapters }).map((_, i) => (

              <button
                key={i}
                className="mb-2 w-full rounded-lg border p-3 text-left hover:bg-blue-50"
              >
                Chapter {i + 1}
              </button>

            ))}

          </div>

          {/* Content */}

          <div className="col-span-9 rounded-xl bg-white p-8 shadow">

            <h2 className="text-3xl font-bold">
              Chapter 1
            </h2>

            <p className="mt-5 leading-8 text-slate-700">

              This is where your interactive eNotes will appear.

            </p>

            <div className="mt-8 aspect-video rounded-xl bg-slate-200 flex items-center justify-center">

              YouTube Video

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
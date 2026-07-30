import VideoPlayer from "./VideoPlayer";
import NavigationButtons from "./NavigationButtons";

export default function LessonViewer({
  lesson,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}) {
  if (!lesson) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow">
        <h2 className="text-2xl font-bold">
          No lesson selected
        </h2>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">

      {/* Header */}
      <div className="border-b bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">

        <h1 className="text-3xl font-bold">
          {lesson.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-3">

          <span className="rounded-full bg-white/20 px-4 py-1 text-sm">
            ⏱ {lesson.duration}
          </span>

          <span className="rounded-full bg-white/20 px-4 py-1 text-sm">
            📖 Lesson
          </span>

          {lesson.completed && (
            <span className="rounded-full bg-green-500 px-4 py-1 text-sm">
              ✅ Completed
            </span>
          )}

        </div>

      </div>

      {/* Description */}

      <section className="border-b p-6">

        <h2 className="mb-3 text-xl font-semibold">
          Overview
        </h2>

        <p className="text-slate-600">
          {lesson.description}
        </p>

      </section>

      {/* Video */}

      <section className="border-b p-6">

        <h2 className="mb-4 text-xl font-semibold">
          Video Lesson
        </h2>

        <VideoPlayer
          url={lesson.video}
          title={lesson.title}
        />

      </section>

      {/* Notes */}

      <section className="border-b p-6">

        <h2 className="mb-4 text-xl font-semibold">
          Lesson Notes
        </h2>

        <div className="rounded-xl bg-slate-50 p-5 whitespace-pre-wrap leading-8 text-slate-700">
          {lesson.notes}
        </div>

      </section>

      {/* Code Example */}

      {lesson.codeExample && (

        <section className="border-b p-6">

          <h2 className="mb-4 text-xl font-semibold">
            Arduino Example
          </h2>

          <pre className="overflow-auto rounded-xl bg-slate-900 p-5 text-sm text-green-400">

            <code>
              {lesson.codeExample}
            </code>

          </pre>

        </section>

      )}

      {/* Resources */}

      {lesson.resources?.length > 0 && (

        <section className="border-b p-6">

          <h2 className="mb-4 text-xl font-semibold">
            Resources
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            {lesson.resources.map((resource) => (

              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border p-5 transition hover:border-blue-500 hover:bg-blue-50"
              >

                <div className="text-lg font-semibold">

                  📄 {resource.title}

                </div>

                <div className="mt-2 text-sm uppercase text-slate-500">

                  {resource.type}

                </div>

              </a>

            ))}

          </div>

        </section>

      )}

      {/* Navigation */}

      <section className="p-6">

        <NavigationButtons
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          onPrevious={onPrevious}
          onNext={onNext}
        />

      </section>

    </div>
  );
}
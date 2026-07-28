import VideoPlayer from "./VideoPlayer";
import NavigationButtons from "./NavigationButtons";

export default function LessonViewer({ lesson }) {
  if (!lesson) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow">
        <h2 className="text-2xl font-bold">No lesson selected</h2>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white shadow">

      {/* Header */}
      <div className="border-b p-6">

        <h1 className="text-3xl font-bold">
          {lesson.title}
        </h1>

        <div className="mt-2 flex gap-4 text-sm text-slate-500">

          <span>⏱ {lesson.duration}</span>

          <span>
            {lesson.completed ? "✅ Completed" : "📖 In Progress"}
          </span>

        </div>

      </div>

      {/* Video */}
      <div className="p-6">
        <VideoPlayer url={lesson.video} title={lesson.title}/>
      </div>

      {/* Notes */}
      <div className="border-t p-6">

        <h2 className="mb-4 text-xl font-bold">
          Lesson Notes
        </h2>

        <div className="prose max-w-none whitespace-pre-wrap text-slate-700">
          {lesson.notes}
        </div>

      </div>

      {/* Resources */}
      {lesson.resources?.length > 0 && (
        <div className="border-t p-6">

          <h2 className="mb-4 text-xl font-bold">
            Resources
          </h2>

          <div className="grid gap-3 md:grid-cols-2">

            {lesson.resources.map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border p-4 transition hover:border-blue-500 hover:bg-blue-50"
              >
                <div className="font-semibold">
                  {resource.title}
                </div>

                <div className="text-sm text-slate-500">
                  {resource.type.toUpperCase()}
                </div>
              </a>
            ))}

          </div>

        </div>
      )}

      {/* Navigation */}
      <div className="border-t p-6">
        <NavigationButtons />
      </div>

    </div>
  );
}
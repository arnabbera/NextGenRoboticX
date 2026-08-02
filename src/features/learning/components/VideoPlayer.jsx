import {
  PlayCircle,
  FileText,
  Download,
  Code2,
} from "lucide-react";

export default function VideoPlayer({ url }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-5">

        <div className="flex items-center gap-3">

          <PlayCircle
            size={26}
            className="text-blue-600"
          />

          <div>

            <h2 className="text-2xl font-bold">
              Lesson Video
            </h2>

            <p className="text-sm text-slate-500">
              Watch the lesson before continuing.
            </p>

          </div>

        </div>

        <div className="hidden gap-3 md:flex">

          <button className="rounded-xl border px-4 py-2 hover:bg-slate-100">
            <FileText className="inline mr-2" size={16} />
            Notes
          </button>

          <button className="rounded-xl border px-4 py-2 hover:bg-slate-100">
            <Download className="inline mr-2" size={16} />
            PDF
          </button>

          <button className="rounded-xl border px-4 py-2 hover:bg-slate-100">
            <Code2 className="inline mr-2" size={16} />
            Source Code
          </button>

        </div>

      </div>

      {/* Video */}

      {url ? (
        <iframe
          className="aspect-video w-full"
          src={url}
          title="Lesson Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="flex aspect-video items-center justify-center bg-slate-100">

          <div className="text-center">

            <PlayCircle
              size={70}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-5 text-2xl font-bold">
              Video Coming Soon
            </h3>

            <p className="mt-2 text-slate-500">
              The instructor hasn't uploaded this lesson yet.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}
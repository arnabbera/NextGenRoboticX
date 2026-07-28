import { PlayCircle } from "lucide-react";

export default function VideoPlayer({ url, title = "Lesson Video" }) {
  if (!url) {
    return (
      <div className="flex aspect-video flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100">
        <PlayCircle
          size={70}
          className="mb-4 text-slate-400"
        />

        <h3 className="text-xl font-semibold text-slate-600">
          Video Coming Soon
        </h3>

        <p className="mt-2 text-center text-sm text-slate-500">
          The instructor hasn't uploaded this lesson yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-black shadow-lg">

      <div className="aspect-video">

        <iframe
          className="h-full w-full"
          src={url}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />

      </div>

    </div>
  );
}
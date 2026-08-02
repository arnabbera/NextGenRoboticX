import { FileText, ExternalLink, Download } from "lucide-react";

export default function PdfViewer({ pdf }) {
  return (
    <div className="rounded-3xl bg-white shadow overflow-hidden">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-6">

        <div className="flex items-center gap-3">

          <FileText
            size={26}
            className="text-red-600"
          />

          <div>

            <h2 className="text-2xl font-bold">
              Lesson Notes (PDF)
            </h2>

            <p className="text-sm text-slate-500">
              Read the lesson notes while watching the video.
            </p>

          </div>

        </div>

        {pdf && (
          <div className="flex gap-3">

            <a
              href={pdf}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border px-4 py-2 hover:bg-slate-100"
            >
              <ExternalLink
                className="inline mr-2"
                size={16}
              />
              Open
            </a>

            <a
              href={pdf}
              download
              className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <Download
                className="inline mr-2"
                size={16}
              />
              Download
            </a>

          </div>
        )}

      </div>

      {/* PDF */}

      {pdf ? (
        <iframe
          src={pdf}
          title="Lesson PDF"
          className="h-[700px] w-full"
        />
      ) : (
        <div className="flex h-[500px] items-center justify-center bg-slate-100">

          <div className="text-center">

            <FileText
              size={80}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-6 text-3xl font-bold">
              PDF Coming Soon
            </h3>

            <p className="mt-3 text-slate-500">
              Lesson notes will be uploaded by the instructor.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}
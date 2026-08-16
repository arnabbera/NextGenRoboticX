import { FileText } from "lucide-react";

export default function PDFViewer() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
          <FileText className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Lesson PDF
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Downloadable lesson material will appear here when it is available.
          </p>
        </div>
      </div>
    </section>
  );
}

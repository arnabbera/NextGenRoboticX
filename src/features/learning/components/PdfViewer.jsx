import { File } from "lucide-react";

export default function PDFViewer() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <div className="mb-5 flex items-center gap-3">

        <File
          className="text-red-600"
          size={28}
        />

        <h2 className="text-2xl font-bold">
          PDF Resources
        </h2>

      </div>

      <div className="flex h-80 items-center justify-center rounded-xl border border-dashed">

        PDF Viewer will appear here

      </div>

    </div>
  );
}
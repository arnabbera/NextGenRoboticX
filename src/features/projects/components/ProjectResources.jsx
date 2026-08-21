import { useEffect, useState } from "react";
import { FileText, Image as ImageIcon, LoaderCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function ProjectResources() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").filter(Boolean).pop();
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetch(`/api/projects/${slug}/resources`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
      })
      .then((data) => {
        if (active) setMetadata(data);
      })
      .catch(() => {
        if (active) setMetadata(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <section className="bg-slate-100 py-10">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-3 px-5 text-slate-500">
          <LoaderCircle className="animate-spin" size={20} /> Loading project resources...
        </div>
      </section>
    );
  }

  if (!metadata?.summary && !metadata?.diagramUrl && !metadata?.pdfUrl) {
    return null;
  }

  return (
    <section className="bg-slate-100 py-14" aria-labelledby="project-resources-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 id="project-resources-heading" className="text-3xl font-bold text-slate-900">
          {metadata.title || "Project Resources"}
        </h2>

        {metadata.summary && (
          <div className="mt-5 whitespace-pre-wrap rounded-2xl bg-white p-6 leading-7 text-slate-700 shadow">
            {metadata.summary}
          </div>
        )}

        <div className="mt-8 grid gap-8">
          {metadata.diagramUrl && (
            <article className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-center gap-3">
                <ImageIcon className="text-blue-700" />
                <h3 className="text-2xl font-bold">Connection Diagram</h3>
              </div>
              <div className="mt-5 overflow-hidden rounded-2xl border bg-slate-50 p-3">
                <img
                  src={metadata.diagramUrl}
                  alt={`${metadata.title || slug} connection diagram`}
                  draggable="false"
                  className="mx-auto max-h-[900px] w-auto max-w-full object-contain"
                />
              </div>
              <p className="mt-3 text-sm text-slate-500">View-only learning resource. Download access may be offered separately later.</p>
            </article>
          )}

          {metadata.pdfUrl && (
            <article className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-center gap-3">
                <FileText className="text-red-700" />
                <h3 className="text-2xl font-bold">Project PDF Guide</h3>
              </div>
              <div className="mt-5 overflow-hidden rounded-2xl border bg-slate-200">
                <iframe
                  title={`${metadata.title || slug} project PDF`}
                  src={`${metadata.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                  className="h-[75vh] min-h-[600px] w-full"
                />
              </div>
              <p className="mt-3 text-sm text-slate-500">Displayed for online reading. The download control is intentionally hidden.</p>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

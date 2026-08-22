import { FileText, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function ChapterPdfCard({ chapter }) {
  const { courseId = "robotics-foundation" } = useParams();
  const { user } = useAuth();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    let active = true;
    (async () => {
      try {
        const token = await user.getIdToken();
        const response = await fetch(`/api/courses/${courseId}/chapters/${chapter}/resource`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to load lesson PDF information.");
        if (active) setResource(data.resource || null);
      } catch (loadError) {
        if (active) setError(loadError.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [chapter, courseId, user]);

  async function openPdf() {
    setOpening(true);
    setError("");
    try {
      const token = await user.getIdToken();
      const response = await fetch(`/api/courses/${courseId}/chapters/${chapter}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Unable to open lesson PDF.");
      }
      const pdfUrl = URL.createObjectURL(await response.blob());
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
      window.setTimeout(() => URL.revokeObjectURL(pdfUrl), 60000);
    } catch (openError) {
      setError(openError.message);
    } finally {
      setOpening(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pt-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600"><FileText className="h-6 w-6" /></div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Lesson PDF</h2>
              <p className="mt-1 text-sm text-slate-600">
                {loading ? "Checking lesson material..." : resource ? resource.fileName : "Lesson material will appear here when the administrator uploads it."}
              </p>
            </div>
          </div>
          {resource && (
            <button type="button" onClick={openPdf} disabled={opening} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
              {opening && <LoaderCircle size={18} className="animate-spin" />}
              {opening ? "Opening..." : "View Lesson PDF"}
            </button>
          )}
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </section>
    </div>
  );
}

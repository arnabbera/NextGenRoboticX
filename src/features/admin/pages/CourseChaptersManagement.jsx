import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, FileText, LoaderCircle, Upload } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import courses from "../../courses/data/courses";
import { courseContent } from "../../courses/data/courseContent";

const MAX_PDF_SIZE = 10 * 1024 * 1024;

export default function CourseChaptersManagement() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const course = courses.find((item) => item.id === courseId);
  const [resources, setResources] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState("");
  const [error, setError] = useState("");

  const chapters = useMemo(() => {
    if (!course) return [];
    const configured = courseContent[course.id]?.chapters || [];
    return Array.from({ length: course.chapters }, (_, index) => {
      const chapter = configured.find((item) => Number(item.id) === index + 1);
      return { id: index + 1, title: chapter?.title || `Chapter ${index + 1}` };
    });
  }, [course]);

  useEffect(() => {
    if (!user || !course) return;
    let active = true;
    (async () => {
      try {
        const token = await user.getIdToken();
        const response = await fetch(`/api/admin/courses/${course.id}/chapters`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to load chapter PDFs.");
        if (active) setResources(data.resources || {});
      } catch (loadError) {
        if (active) setError(loadError.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [course, user]);

  async function uploadPdf(chapterId, file) {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Please select a PDF file.");
      return;
    }
    if (file.size > MAX_PDF_SIZE) {
      setError("PDF size must not exceed 10 MB.");
      return;
    }
    setUploading(String(chapterId));
    setError("");
    try {
      const token = await user.getIdToken(true);
      const response = await fetch(`/api/admin/courses/${course.id}/chapters/${chapterId}/pdf`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/pdf",
          "X-File-Name": file.name,
        },
        body: file,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "PDF upload failed.");
      setResources((current) => ({ ...current, [chapterId]: data.resource }));
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setUploading("");
    }
  }

  async function viewPdf(chapterId) {
    setError("");
    try {
      const token = await user.getIdToken();
      const response = await fetch(`/api/courses/${course.id}/chapters/${chapterId}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Unable to open PDF.");
      }
      const pdfUrl = URL.createObjectURL(await response.blob());
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
      window.setTimeout(() => URL.revokeObjectURL(pdfUrl), 60000);
    } catch (viewError) {
      setError(viewError.message);
    }
  }

  if (!course) return <div className="rounded-xl bg-red-50 p-5 text-red-700">Course not found.</div>;

  return (
    <div className="space-y-6">
      <Link to="/admin/courses" className="inline-flex items-center gap-2 font-semibold text-blue-700">
        <ArrowLeft size={18} /> Back to courses
      </Link>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{course.title}: Chapters & PDFs</h1>
        <p className="mt-2 text-slate-500">Upload or replace the PDF available for each chapter. Maximum 10 MB per file.</p>
      </div>
      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}
      {loading ? (
        <div className="flex items-center gap-2 rounded-xl bg-white p-6 text-slate-600"><LoaderCircle className="animate-spin" /> Loading chapters...</div>
      ) : (
        <div className="space-y-3">
          {chapters.map((chapter) => {
            const resource = resources[chapter.id];
            const busy = uploading === String(chapter.id);
            return (
              <div key={chapter.id} className="flex flex-col gap-4 rounded-2xl border bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-3">
                  <FileText className="mt-1 text-blue-600" />
                  <div>
                    <h2 className="font-bold text-slate-900">Chapter {chapter.id}: {chapter.title}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {resource ? `${resource.fileName} • uploaded ${new Date(resource.updatedAt).toLocaleString()}` : "No PDF uploaded"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {resource && (
                    <button type="button" onClick={() => viewPdf(chapter.id)} className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-semibold text-slate-700">
                      <CheckCircle2 size={17} className="text-emerald-600" /> View PDF
                    </button>
                  )}
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                    {busy ? <LoaderCircle size={17} className="animate-spin" /> : <Upload size={17} />}
                    {busy ? "Uploading..." : resource ? "Replace PDF" : "Upload PDF"}
                    <input type="file" accept="application/pdf,.pdf" className="hidden" disabled={busy} onChange={(event) => uploadPdf(chapter.id, event.target.files?.[0])} />
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

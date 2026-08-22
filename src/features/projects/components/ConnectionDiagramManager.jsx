import { Image as ImageIcon, LoaderCircle, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { isAdministrator } from "../../../components/auth/AdminRoute";
import { useAuth } from "../../../context/AuthContext";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

export default function ConnectionDiagramManager() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").filter(Boolean).pop();
  const { user, profile } = useAuth();
  const admin = isAdministrator(user, profile);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const loadDiagram = useCallback(async (active = true) => {
    try {
      const response = await fetch(`/api/projects/${slug}/resources`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load the connection diagram.");
      if (active) setMetadata(data);
    } catch (loadError) {
      if (active) setError(loadError.message);
    } finally {
      if (active) setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    loadDiagram(active);
    return () => { active = false; };
  }, [loadDiagram]);

  async function uploadDiagram(file) {
    if (!file) return;
    if (!ALLOWED_TYPES.has(file.type)) {
      setError("Select a PNG, JPG, or WebP image.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError("Connection diagram size must not exceed 5 MB.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const token = await user.getIdToken(true);
      const response = await fetch(`/api/admin/projects/${slug}/resource/diagram`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": file.type,
          "X-File-Name": file.name,
        },
        body: file,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to upload the connection diagram.");
      await loadDiagram();
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setUploading(false);
    }
  }

  if (loading || (!metadata?.diagramUrl && !admin)) return null;

  return (
    <section className="bg-slate-50 py-12" aria-labelledby={`${slug}-diagram-heading`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <ImageIcon className="text-blue-700" size={28} />
              <h2 id={`${slug}-diagram-heading`} className="text-3xl font-bold text-slate-900">Connection Diagram</h2>
            </div>
            <p className="mt-2 text-slate-600">View-only wiring reference for this project.</p>
          </div>
          {admin && (
            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 has-[:disabled]:opacity-60">
              {uploading ? <LoaderCircle size={18} className="animate-spin" /> : <Upload size={18} />}
              {uploading ? "Uploading..." : metadata?.diagramUrl ? "Replace Diagram" : "Upload Diagram"}
              <input type="file" accept="image/png,image/jpeg,image/webp" disabled={uploading} className="hidden" onChange={(event) => { uploadDiagram(event.target.files?.[0]); event.target.value = ""; }} />
            </label>
          )}
        </div>

        {metadata?.diagramUrl ? (
          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow" onContextMenu={(event) => { if (!admin) event.preventDefault(); }}>
            <img src={metadata.diagramUrl} alt={`${metadata.title || slug} connection diagram`} draggable="false" className={`mx-auto max-h-[900px] w-auto max-w-full select-none object-contain ${admin ? "" : "pointer-events-none"}`} />
            <p className="mt-3 text-center text-sm text-slate-500">Online viewing only. No download control is provided.</p>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">No connection diagram uploaded yet.</div>
        )}
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </section>
  );
}

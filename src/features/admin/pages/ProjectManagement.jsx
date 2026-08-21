import { useEffect, useMemo, useState } from "react";
import {
  ExternalLink,
  FileText,
  Image as ImageIcon,
  LoaderCircle,
  Save,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const projects = [
  ["obstacle-avoiding-robot", "Obstacle Avoiding Robot"],
  ["line-following-robot", "Line Following Robot"],
  ["iot-smart-monitoring", "IoT Smart Monitoring"],
  ["smart-home-automation", "Smart Home Automation"],
  ["arduino-drone", "Build Your First Drone"],
  ["face-recognition-robot", "AI Face Recognition Robot"],
  ["humanoid-robot", "Humanoid Robot"],
  ["robotic-arm-automation", "Robotic Arm Automation"],
  ["smart-agriculture", "Smart Agriculture"],
];

export default function ProjectManagement() {
  const { user } = useAuth();
  const [slug, setSlug] = useState(projects[0][0]);
  const defaultTitle = useMemo(
    () => projects.find(([id]) => id === slug)?.[1] || "",
    [slug]
  );
  const [title, setTitle] = useState(defaultTitle);
  const [summary, setSummary] = useState("");
  const [metadata, setMetadata] = useState(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function authHeaders(extra = {}) {
    const token = await user.getIdToken();
    return { Authorization: `Bearer ${token}`, ...extra };
  }

  async function loadProject() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/projects/${slug}/resources`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load project.");
      setMetadata(data);
      setTitle(data.title || defaultTitle);
      setSummary(data.summary || "");
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadProject();
  }, [slug]);

  async function saveDetails(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(`/api/admin/projects/${slug}`, {
        method: "PUT",
        headers: await authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ title, summary }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save project.");
      setMessage("Project details saved.");
      await loadProject();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setBusy(false);
    }
  }

  async function uploadResource(kind, file) {
    if (!file) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(
        `/api/admin/projects/${slug}/resource/${kind}`,
        {
          method: "PUT",
          headers: await authHeaders({
            "Content-Type": file.type,
            "X-File-Name": file.name,
          }),
          body: file,
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to upload file.");
      setMessage(kind === "diagram" ? "Connection diagram uploaded." : "Project PDF uploaded.");
      await loadProject();
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Project Management</h1>
          <p className="mt-2 text-slate-500">Edit public project information and manage view-only resources.</p>
        </div>
        <Link to={`/projects/${slug}`} className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2 font-semibold">
          <ExternalLink size={18} /> View Project
        </Link>
      </div>

      <div className="grid gap-7 xl:grid-cols-[300px_1fr]">
        <aside className="rounded-2xl bg-white p-3 shadow">
          {projects.map(([id, name]) => (
            <button
              key={id}
              type="button"
              onClick={() => setSlug(id)}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold ${slug === id ? "bg-blue-600 text-white" : "hover:bg-slate-100"}`}
            >
              {name}
            </button>
          ))}
        </aside>

        <div className="space-y-6">
          {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}
          {message && <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">{message}</div>}

          <form onSubmit={saveDetails} className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Editable Project Details</h2>
            <label className="mt-5 block font-semibold">
              Display title
              <input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} className="mt-2 w-full rounded-xl border p-3 font-normal" />
            </label>
            <label className="mt-5 block font-semibold">
              Additional project notes
              <textarea value={summary} onChange={(event) => setSummary(event.target.value)} rows={10} maxLength={4000} className="mt-2 w-full rounded-xl border p-3 font-normal" placeholder="Add or update information shown in the public Project Resources section." />
            </label>
            <button disabled={busy} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50">
              {busy ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />} Save Project
            </button>
          </form>

          <div className="grid gap-6 md:grid-cols-2">
            <ResourceUploader
              icon={ImageIcon}
              title="Connection Diagram"
              accept="image/png,image/jpeg,image/webp"
              current={metadata?.diagram}
              onUpload={(file) => uploadResource("diagram", file)}
              busy={busy}
            />
            <ResourceUploader
              icon={FileText}
              title="Project PDF"
              accept="application/pdf"
              current={metadata?.pdf}
              onUpload={(file) => uploadResource("pdf", file)}
              busy={busy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceUploader({ icon: Icon, title, accept, current, onUpload, busy }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow">
      <Icon className="text-blue-700" size={30} />
      <h2 className="mt-3 text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">Maximum size: 5 MB</p>
      {current && (
        <div className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-800">
          Current: {current.fileName}<br />
          Uploaded: {new Date(current.uploadedAt).toLocaleString()}
        </div>
      )}
      <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white">
        <Upload size={18} /> {current ? "Replace File" : "Upload File"}
        <input
          type="file"
          accept={accept}
          disabled={busy}
          className="hidden"
          onChange={(event) => {
            onUpload(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </label>
    </section>
  );
}

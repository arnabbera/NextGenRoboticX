import { LoaderCircle, PlayCircle, Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { isAdministrator } from "../../../components/auth/AdminRoute";
import { useAuth } from "../../../context/AuthContext";

function getYouTubeId(value) {
  try {
    const url = new URL(value);
    if (url.hostname === "youtu.be") return url.pathname.slice(1).split("/")[0];
    if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)) {
      if (url.pathname === "/watch") return url.searchParams.get("v");
      if (url.pathname.startsWith("/embed/") || url.pathname.startsWith("/shorts/")) {
        return url.pathname.split("/")[2];
      }
    }
  } catch {
    return "";
  }
  return "";
}

export default function CourseSummaryVideo({ courseId }) {
  const { user, profile } = useAuth();
  const admin = isAdministrator(user, profile);
  const [videoUrl, setVideoUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const videoId = useMemo(() => getYouTubeId(videoUrl), [videoUrl]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}/summary-video`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to load the course video.");
        if (active) {
          setVideoUrl(data.videoUrl || "");
          setInputUrl(data.videoUrl || "");
        }
      } catch (loadError) {
        if (active) setError(loadError.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [courseId]);

  async function saveVideo(event) {
    event.preventDefault();
    if (!getYouTubeId(inputUrl.trim())) {
      setError("Enter a valid YouTube video, Shorts, or youtu.be link.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const token = await user.getIdToken(true);
      const response = await fetch(`/api/admin/courses/${courseId}/summary-video`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl: inputUrl.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save the course video.");
      setVideoUrl(data.videoUrl);
      setInputUrl(data.videoUrl);
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="mt-6 flex items-center gap-2 text-blue-100"><LoaderCircle className="animate-spin" size={18} /> Loading course video...</div>;
  }

  if (!videoId && !admin) return null;

  return (
    <section className="mt-6 space-y-4" aria-label="Course introduction video">
      {videoId && (
        <div className="aspect-video overflow-hidden rounded-2xl border border-white/20 bg-slate-950 shadow-lg">
          <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${videoId}`} title="Course introduction video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        </div>
      )}
      {admin && (
        <form onSubmit={saveVideo} className="rounded-2xl border border-white/20 bg-white/10 p-4 text-left backdrop-blur">
          <label htmlFor={`${courseId}-summary-video`} className="flex items-center gap-2 font-bold text-white"><PlayCircle size={20} /> Course YouTube video</label>
          <p className="mt-1 text-sm text-blue-100">Administrator only: add or replace the video shown on this course summary page.</p>
          <div className="mt-3 flex flex-col gap-3">
            <input id={`${courseId}-summary-video`} type="url" value={inputUrl} onChange={(event) => setInputUrl(event.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="min-w-0 flex-1 rounded-xl border border-white/30 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-200" />
            <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-400 disabled:opacity-60">
              {saving ? <LoaderCircle size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Saving..." : videoUrl ? "Replace Course Video" : "Add Course Video"}
            </button>
          </div>
        </form>
      )}
      {error && <p className="rounded-xl bg-red-950/70 px-4 py-3 text-sm text-red-100">{error}</p>}
    </section>
  );
}

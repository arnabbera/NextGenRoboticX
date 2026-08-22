import { LoaderCircle, PlayCircle, Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { isAdministrator } from "../../../components/auth/AdminRoute";
import { useAuth } from "../../../context/AuthContext";

function getYoutubeId(value) {
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

export default function ChapterVideoManager({ chapter }) {
  const { courseId = "robotics-foundation" } = useParams();
  const { user, profile } = useAuth();
  const admin = isAdministrator(user, profile);
  const [videoUrl, setVideoUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const videoId = useMemo(() => getYoutubeId(videoUrl), [videoUrl]);

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
        if (!response.ok) throw new Error(data.error || "Unable to load the video lesson.");
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
  }, [chapter, courseId, user]);

  async function saveVideo(event) {
    event.preventDefault();
    if (!getYoutubeId(inputUrl.trim())) {
      setError("Enter a valid YouTube video, Shorts, or youtu.be link.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const token = await user.getIdToken(true);
      const response = await fetch(`/api/admin/courses/${courseId}/chapters/${chapter}/video`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl: inputUrl.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save the YouTube link.");
      setVideoUrl(data.videoUrl);
      setInputUrl(data.videoUrl);
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return null;

  return (
    <div className="mt-4 space-y-4">
      {videoId && (
        <div className="aspect-video overflow-hidden rounded-2xl bg-slate-950">
          <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${videoId}`} title={`Chapter ${chapter} video lesson`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        </div>
      )}
      {admin && (
        <form onSubmit={saveVideo} className="rounded-2xl border border-red-100 bg-red-50 p-4 text-left">
          <label htmlFor={`chapter-${chapter}-youtube`} className="flex items-center gap-2 font-bold text-slate-900"><PlayCircle className="text-red-600" /> YouTube video link</label>
          <p className="mt-1 text-sm text-slate-600">Administrator only: add or replace this chapter&apos;s video lesson.</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input id={`chapter-${chapter}-youtube`} type="url" value={inputUrl} onChange={(event) => setInputUrl(event.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" />
            <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60">
              {saving ? <LoaderCircle size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Saving..." : videoUrl ? "Replace Video" : "Add Video"}
            </button>
          </div>
        </form>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

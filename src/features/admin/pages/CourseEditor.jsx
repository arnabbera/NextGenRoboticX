import { useEffect, useState } from "react";
import { ArrowLeft, LoaderCircle, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
  createCourse,
  getCourse,
  updateCourse,
} from "../../../services/firebase/courseService";

const emptyCourse = {
  slug: "",
  title: "",
  category: "Robotics",
  level: "Beginner",
  language: "English",
  duration: "",
  price: 0,
  thumbnail: "",
  shortDescription: "",
  description: "",
  freeLearning: true,
  certificateAvailable: true,
};

export default function CourseEditor() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const editing = Boolean(courseId);
  const [form, setForm] = useState(emptyCourse);
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!editing) return;
    getCourse(courseId)
      .then((course) => {
        if (!course) throw new Error("Course not found.");
        setForm({ ...emptyCourse, ...course });
      })
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, [courseId, editing]);

  function setField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        slug: form.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
        price: Number(form.price || 0),
      };
      if (editing) {
        const { id, createdAt, updatedAt, ...updates } = payload;
        await updateCourse(courseId, updates);
      } else {
        await createCourse({ ...payload, createdBy: user?.uid || "" });
      }
      navigate("/admin/courses");
    } catch (saveError) {
      setError(saveError.message || "Unable to save course.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="flex min-h-64 items-center justify-center"><LoaderCircle className="animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <button type="button" onClick={() => navigate("/admin/courses")} className="mb-5 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900">
        <ArrowLeft size={18} /> Back to courses
      </button>
      <h1 className="text-3xl font-bold">{editing ? "Edit Course" : "Create Course"}</h1>
      <p className="mt-2 text-slate-500">Administrators can update course details, visibility and pricing.</p>

      {error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

      <form onSubmit={submit} className="mt-6 space-y-6 rounded-2xl bg-white p-6 shadow">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Course title" value={form.title} onChange={(v) => setField("title", v)} required />
          <Field label="Slug" value={form.slug} onChange={(v) => setField("slug", v)} required disabled={editing} />
          <Field label="Category" value={form.category} onChange={(v) => setField("category", v)} />
          <Field label="Level" value={form.level} onChange={(v) => setField("level", v)} />
          <Field label="Language" value={form.language} onChange={(v) => setField("language", v)} />
          <Field label="Duration" value={form.duration} onChange={(v) => setField("duration", v)} placeholder="10 hours" />
          <Field label="Price (₹)" type="number" min="0" value={form.price} onChange={(v) => setField("price", v)} />
          <Field label="Thumbnail URL" value={form.thumbnail} onChange={(v) => setField("thumbnail", v)} />
        </div>
        <TextArea label="Short description" rows={3} value={form.shortDescription} onChange={(v) => setField("shortDescription", v)} />
        <TextArea label="Full description" rows={8} value={form.description} onChange={(v) => setField("description", v)} />
        <div className="flex flex-wrap gap-6">
          <Check label="Free learning" checked={form.freeLearning} onChange={(v) => setField("freeLearning", v)} />
          <Check label="Certificate available" checked={form.certificateAvailable} onChange={(v) => setField("certificateAvailable", v)} />
        </div>
        <button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50">
          {saving ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}
          {editing ? "Save Changes" : "Create Course"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, onChange, ...props }) {
  return <label className="block font-semibold">{label}<input {...props} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border p-3 font-normal disabled:bg-slate-100" /></label>;
}
function TextArea({ label, onChange, ...props }) {
  return <label className="block font-semibold">{label}<textarea {...props} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border p-3 font-normal" /></label>;
}
function Check({ label, checked, onChange }) {
  return <label className="flex items-center gap-3 font-semibold"><input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5" />{label}</label>;
}

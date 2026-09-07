import { BookOpen, Camera, CheckCircle2, GraduationCap, IdCard, LoaderCircle, LockKeyhole, Mail, MapPin, Save, UserRound } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Link } from "react-router-dom";
import { isAdministrator } from "../../../components/auth/AdminRoute";
import { useAuth } from "../../../context/AuthContext";
import { storage } from "../../../services/firebase/firebase";
import { updateProfile } from "../../../services/firebase/userService";

const EMPTY_FORM = {
  title: "", firstName: "", lastName: "", dateOfBirth: "",
  educationCourse: "", educationInstitution: "", educationStatus: "", passingYear: "", finalMarks: "",
  addressLine1: "", addressLine2: "", city: "", state: "", postalCode: "", country: "India",
};

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const [form, setForm] = useState(EMPTY_FORM);
  const [enrollment, setEnrollment] = useState({ loading: true, count: 0, error: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const fileInput = useRef(null);
  const admin = isAdministrator(user, profile);

  useEffect(() => {
    if (!profile && !user) return;
    const nameParts = String(profile?.displayName || user?.displayName || "").trim().split(/\s+/).filter(Boolean);
    setForm({
      ...EMPTY_FORM,
      title: profile?.title || "", firstName: profile?.firstName || nameParts[0] || "",
      lastName: profile?.lastName || nameParts.slice(1).join(" ") || "", dateOfBirth: profile?.dateOfBirth || "",
      educationCourse: profile?.education?.course || "", educationInstitution: profile?.education?.institution || "",
      educationStatus: profile?.education?.status || "", passingYear: profile?.education?.passingYear || "",
      finalMarks: profile?.education?.finalMarks || "", addressLine1: profile?.address?.line1 || "",
      addressLine2: profile?.address?.line2 || "", city: profile?.address?.city || "", state: profile?.address?.state || "",
      postalCode: profile?.address?.postalCode || "", country: profile?.address?.country || "India",
    });
    setImagePreview(profile?.profileImageURL || profile?.photoURL || user?.photoURL || "");
  }, [profile, user]);

  useEffect(() => {
    let active = true;
    async function checkEnrollment() {
      if (admin) { setEnrollment({ loading: false, count: 1, error: "" }); return; }
      try {
        const token = await user.getIdToken();
        const response = await fetch("/api/course-access/enrollments", { headers: { Authorization: `Bearer ${token}` } });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to verify course enrollment.");
        if (active) setEnrollment({ loading: false, count: Number(data.count || 0), error: "" });
      } catch (error) {
        if (active) setEnrollment({ loading: false, count: 0, error: error.message });
      }
    }
    if (user) checkEnrollment();
    return () => { active = false; };
  }, [admin, user]);

  useEffect(() => () => { if (imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview); }, [imagePreview]);

  const canEdit = admin || enrollment.count > 0;
  const completion = useMemo(() => {
    const values = [form.firstName, form.lastName, form.educationCourse, form.educationInstitution, form.educationStatus, form.passingYear, form.addressLine1, form.city, form.state, form.postalCode, form.country];
    return Math.round((values.filter((value) => String(value).trim()).length / values.length) * 100);
  }, [form]);

  function change(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setMessage({ type: "", text: "" });
  }

  function selectImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setMessage({ type: "error", text: "Please choose a JPG, PNG or WebP image." }); return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: "error", text: "The profile image must not exceed 2 MB." }); return;
    }
    if (imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    setImageFile(file); setImagePreview(URL.createObjectURL(file)); setMessage({ type: "", text: "" });
  }

  async function saveProfile(event) {
    event.preventDefault();
    if (!canEdit || saving) return;
    setSaving(true); setMessage({ type: "", text: "" });
    try {
      let profileImageURL = profile?.profileImageURL || profile?.photoURL || user.photoURL || "";
      if (imageFile) {
        const extension = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
        const imageRef = ref(storage, `student-profiles/${user.uid}/profile.${extension}`);
        await uploadBytes(imageRef, imageFile, { contentType: imageFile.type });
        profileImageURL = await getDownloadURL(imageRef);
      }
      await updateProfile(user.uid, {
        title: form.title, firstName: form.firstName.trim(), lastName: form.lastName.trim(),
        displayName: [form.title, form.firstName.trim(), form.lastName.trim()].filter(Boolean).join(" "),
        dateOfBirth: form.dateOfBirth, profileImageURL,
        education: { course: form.educationCourse.trim(), institution: form.educationInstitution.trim(), status: form.educationStatus, passingYear: form.passingYear.trim(), finalMarks: form.finalMarks.trim() },
        address: { line1: form.addressLine1.trim(), line2: form.addressLine2.trim(), city: form.city.trim(), state: form.state.trim(), postalCode: form.postalCode.trim(), country: form.country.trim() },
        profileCompleted: completion === 100,
      });
      await refreshProfile(); setImageFile(null);
      setMessage({ type: "success", text: "Your student profile has been updated successfully." });
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Unable to update your profile." });
    } finally { setSaving(false); }
  }

  if (enrollment.loading) return <div className="flex min-h-64 items-center justify-center gap-3 text-slate-600"><LoaderCircle className="animate-spin" /> Checking your enrollment...</div>;

  if (!canEdit) return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700"><LockKeyhole size={30} /></div>
      <h1 className="mt-5 text-3xl font-bold text-slate-900">Student profile unlocks after enrollment</h1>
      <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">Enroll in at least one course using this Gmail account. You can then add your personal details, education, address and profile image.</p>
      {enrollment.error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-red-700">{enrollment.error}</p>}
      <Link to="/courses/available" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"><BookOpen size={19} /> Browse Courses</Link>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 p-6 text-white shadow-lg md:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div><p className="font-semibold uppercase tracking-[0.18em] text-blue-200">Student learning portal</p><h1 className="mt-2 text-3xl font-bold">My Student Profile</h1><p className="mt-2 text-blue-100">Keep your academic and contact information accurate.</p></div>
          <div className="rounded-2xl bg-white/15 px-5 py-3"><p className="text-sm text-blue-100">Profile completion</p><p className="text-2xl font-bold">{completion}%</p></div>
        </div>
      </header>

      <form onSubmit={saveProfile} className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mx-auto h-36 w-36 overflow-hidden rounded-3xl border-4 border-blue-100 bg-slate-100">{imagePreview ? <img src={imagePreview} alt="Student profile" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-slate-400"><UserRound size={64} /></div>}</div>
          <h2 className="mt-5 text-center text-xl font-bold text-slate-900">Profile Image</h2>
          <p className="mt-2 text-center text-sm leading-6 text-slate-500">JPG, PNG or WebP. Maximum 2 MB. A square image is recommended.</p>
          <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={selectImage} className="hidden" />
          <button type="button" onClick={() => fileInput.current?.click()} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-700"><Camera size={18} /> Upload Image</button>
          <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-sm text-slate-600">
            <p className="flex items-center gap-2"><Mail size={17} className="text-blue-600" /><span className="truncate">{user.email}</span></p>
            <p className="flex items-center gap-2"><IdCard size={17} className="text-blue-600" />{profile?.studentId || "Student ID pending"}</p>
            <p className="flex items-center gap-2"><BookOpen size={17} className="text-blue-600" />{admin ? "Administrator access" : `${enrollment.count} enrolled course${enrollment.count === 1 ? "" : "s"}`}</p>
          </div>
        </aside>

        <div className="space-y-6">
          <FormSection icon={UserRound} title="Personal Details"><div className="grid gap-5 md:grid-cols-6">
            <SelectField label="Title" name="title" value={form.title} onChange={change} className="md:col-span-1" options={["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."]} />
            <InputField required label="First Name" name="firstName" value={form.firstName} onChange={change} className="md:col-span-2" />
            <InputField required label="Last Name" name="lastName" value={form.lastName} onChange={change} className="md:col-span-3" />
            <InputField label="Date of Birth (Optional)" name="dateOfBirth" value={form.dateOfBirth} onChange={change} type="date" className="md:col-span-3" />
            <InputField label="Email (Linked account)" value={user.email || ""} disabled className="md:col-span-3" />
          </div></FormSection>

          <FormSection icon={GraduationCap} title="Education — Graduation"><div className="grid gap-5 md:grid-cols-2">
            <InputField required label="Course" name="educationCourse" value={form.educationCourse} onChange={change} placeholder="For example: B.Tech, B.Sc, Diploma" />
            <InputField required label="University / Institution" name="educationInstitution" value={form.educationInstitution} onChange={change} />
            <SelectField required label="Status" name="educationStatus" value={form.educationStatus} onChange={change} options={["Pursuing", "Completed"]} />
            <InputField required label={form.educationStatus === "Pursuing" ? "Expected Passing Year" : "Passing Year"} name="passingYear" value={form.passingYear} onChange={change} inputMode="numeric" maxLength={4} />
            <InputField label="Final Year Marks / CGPA" name="finalMarks" value={form.finalMarks} onChange={change} placeholder="Optional" />
          </div></FormSection>

          <FormSection icon={MapPin} title="Address"><div className="grid gap-5 md:grid-cols-2">
            <InputField required label="Address Line 1" name="addressLine1" value={form.addressLine1} onChange={change} className="md:col-span-2" />
            <InputField label="Address Line 2" name="addressLine2" value={form.addressLine2} onChange={change} className="md:col-span-2" />
            <InputField required label="City" name="city" value={form.city} onChange={change} />
            <InputField required label="State" name="state" value={form.state} onChange={change} />
            <InputField required label="PIN / Postal Code" name="postalCode" value={form.postalCode} onChange={change} inputMode="numeric" />
            <InputField required label="Country" name="country" value={form.country} onChange={change} />
          </div></FormSection>

          {message.text && <div className={`flex items-center gap-3 rounded-xl border p-4 ${message.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"}`}>{message.type === "success" && <CheckCircle2 size={20} />}{message.text}</div>}
          <div className="flex justify-end"><button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-bold text-white disabled:opacity-60">{saving ? <LoaderCircle className="animate-spin" size={19} /> : <Save size={19} />}{saving ? "Saving Profile..." : "Save Profile"}</button></div>
        </div>
      </form>
    </div>
  );
}

function FormSection({ icon: Icon, title, children }) {
  return <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7"><div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-4"><Icon className="text-blue-700" size={23} /><h2 className="text-xl font-bold text-slate-900">{title}</h2></div>{children}</section>;
}

function InputField({ label, className = "", ...props }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-sm font-semibold text-slate-700">{label}{props.required && <span className="text-red-500"> *</span>}</span><input {...props} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100 disabled:text-slate-500" /></label>;
}

function SelectField({ label, options, className = "", ...props }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-sm font-semibold text-slate-700">{label}{props.required && <span className="text-red-500"> *</span>}</span><select {...props} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"><option value="">Select</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

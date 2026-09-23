import { useCallback, useEffect, useState } from "react";
import { Award, CalendarDays, Download, LoaderCircle, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import CertificateLogo from "../../../components/CertificateLogo";

const CERTIFICATE_COURSES = [
  "robotics-foundation",
  "arduino-programming",
  "raspberry-pi",
  "internet-of-things",
  "pcb-design-hardware-development",
  "drone-technology",
];

export default function Certificates() {
  const { user, profile } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCertificates = useCallback(async () => {
    try {
      const token = await user.getIdToken();
      const results = await Promise.all(CERTIFICATE_COURSES.map(async (courseId) => {
        const response = await fetch(`/api/certification/${courseId}/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to load certificates.");
        return data.certificate;
      }));
      const earned = results.filter(Boolean);
      setCertificates(earned);
      setSelectedCourse((current) => earned.some((item) => item.courseId === current) ? current : earned[0]?.courseId || "");
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadCertificates();
  }, [loadCertificates]);

  const certificate = certificates.find((item) => item.courseId === selectedCourse);
  const profileName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ").trim();
  const learnerName = certificate?.studentName === user?.email && profileName ? profileName : certificate?.studentName;

  if (loading) {
    return (
      <div className="flex items-center gap-3 p-8 text-slate-600">
        <LoaderCircle className="animate-spin" /> Loading certificates...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900">Certificates</h1>
      <p className="mt-2 text-slate-600">Certificates earned through completed course assessments.</p>

      {error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

      {!certificate ? (
        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <Award className="mx-auto text-slate-400" size={54} />
          <h2 className="mt-4 text-2xl font-bold">No certificate earned yet</h2>
          <p className="mt-3 text-slate-600">Pass a course's final assessment with at least 80/100 marks to generate its certificate.</p>
          <Link to="/courses/available" className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">Browse Courses</Link>
        </div>
      ) : (
        <div className="mt-8">
          {certificates.length > 1 && (
            <label className="mb-5 block font-semibold text-slate-800">Choose an earned certificate
              <select value={selectedCourse} onChange={(event) => setSelectedCourse(event.target.value)} className="mt-2 block w-full max-w-md rounded-xl border border-slate-300 bg-white px-4 py-3">
                {certificates.map((item) => <option key={item.id} value={item.courseId}>{item.courseTitle}</option>)}
              </select>
            </label>
          )}
          <div id="robotics-certificate" className="rounded-3xl border-[10px] border-double border-blue-800 bg-gradient-to-br from-white via-blue-50 to-amber-50 p-8 text-center shadow-2xl md:p-14">
            <CertificateLogo className="w-56 md:w-72" />
            <Award className="mx-auto mt-5 text-yellow-500" size={62} />
            <h2 className="mt-5 font-serif text-4xl font-bold text-slate-900 md:text-5xl">Certificate of Completion</h2>
            <p className="mt-7 text-lg text-slate-600">This certificate is presented to</p>
            <p className="mt-3 border-b-2 border-slate-400 pb-2 font-serif text-3xl font-bold text-blue-900">{learnerName}</p>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-700">
              for successfully completing the <strong>{certificate.courseTitle}</strong> course and passing the certification assessment with a score of <strong>{certificate.score}/100</strong>.
            </p>
            <div className="mt-10 grid gap-5 text-left text-sm md:grid-cols-3">
              <div><CalendarDays className="mb-2 text-blue-700" /><strong>Issued</strong><br />{new Date(certificate.issuedAt).toLocaleDateString()}</div>
              <div><ShieldCheck className="mb-2 text-blue-700" /><strong>Certificate ID</strong><br />{certificate.id}</div>
              <div><Award className="mb-2 text-blue-700" /><strong>Assessment Attempt</strong><br />{certificate.passedAttempt}</div>
            </div>
            <p className="mt-10 text-xs leading-5 text-slate-500">This is a private appreciation/completion certificate for personal learning. It is not an accredited degree, diploma, professional licence or government qualification.</p>
          </div>

          <button onClick={() => window.print()} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">
            <Download size={19} /> Print / Save as PDF
          </button>
        </div>
      )}
    </div>
  );
}

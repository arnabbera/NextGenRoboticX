import { BookOpen, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import CourseGrid from "../components/CourseGrid";
import courses from "../data/courses";

export default function EnrolledCourses() {
  const { user } = useAuth();
  const [courseIds, setCourseIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function loadEnrollments() {
      try {
        const token = await user.getIdToken();
        const response = await fetch("/api/course-access/enrollments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to load enrolled courses.");
        if (active) setCourseIds(data.courseIds || []);
      } catch (loadError) {
        if (active) setError(loadError.message);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadEnrollments();
    return () => { active = false; };
  }, [user]);

  const enrolled = courses
    .filter((course) => courseIds.includes(course.id))
    .map((course) => ({ ...course, enrolled: true, progress: course.progress || 0 }));

  if (loading) {
    return <div className="flex min-h-64 items-center justify-center gap-3 text-slate-600"><LoaderCircle className="animate-spin" /> Loading your courses...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Enrolled Courses</h1>
        <p className="mt-2 text-slate-600">Courses purchased using your signed-in Gmail account.</p>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

      {!error && enrolled.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <BookOpen className="mx-auto text-slate-400" size={52} />
          <h2 className="mt-5 text-2xl font-bold text-slate-900">No enrolled courses yet</h2>
          <p className="mt-3 text-slate-600">After a successful ₹99 payment, the selected course will appear here automatically.</p>
          <Link to="/courses/available" className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">Browse Available Courses</Link>
        </div>
      ) : (
        <CourseGrid courses={enrolled} />
      )}
    </div>
  );
}

import { LoaderCircle, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { isAdministrator } from "../../../components/auth/AdminRoute";
import courses from "../data/courses";

export default function CourseAccessRoute() {
  const { user, profile } = useAuth();
  const { pathname } = useLocation();
  const courseId = pathname.match(/^\/courses\/([^/]+)/)?.[1];
  const course = courses.find((item) => item.id === courseId);
  const unavailable = course?.status === "Coming Soon" && !isAdministrator(user, profile);
  const [state, setState] = useState({ loading: true, active: false, error: "" });

  useEffect(() => {
    if (unavailable) {
      setState({ loading: false, active: false, error: "" });
      return undefined;
    }
    let current = true;
    async function verifyAccess() {
      try {
        const token = await user.getIdToken();
        const response = await fetch(`/api/course-access/${courseId}/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to verify course access.");
        if (current) setState({ loading: false, active: data.active === true, error: "" });
      } catch (error) {
        if (current) setState({ loading: false, active: false, error: error.message });
      }
    }
    verifyAccess();
    return () => { current = false; };
  }, [courseId, unavailable, user]);

  if (unavailable) {
    return (
      <div className="mx-auto mt-12 max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl">
        <LockKeyhole className="mx-auto text-orange-500" size={52} />
        <h1 className="mt-5 text-3xl font-bold">Course Coming Soon</h1>
        <p className="mt-4 text-slate-600">This course is still being prepared. Lessons and enrollment are not available yet.</p>
        <Link to="/courses" className="mt-7 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">Back to Courses</Link>
      </div>
    );
  }

  if (state.loading) {
    return <div className="flex min-h-[50vh] items-center justify-center gap-3 text-slate-600"><LoaderCircle className="animate-spin" /> Verifying course enrollment...</div>;
  }

  if (!state.active) {
    return (
      <div className="mx-auto mt-12 max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl">
        <LockKeyhole className="mx-auto text-amber-500" size={52} />
        <h1 className="mt-5 text-3xl font-bold">Course Enrollment Required</h1>
        <p className="mt-4 text-slate-600">This learning material is available after a successful ₹99 payment linked to your signed-in Gmail account.</p>
        {state.error && <p className="mt-3 text-sm text-red-600">{state.error}</p>}
        <Link to={`/courses/${courseId}`} className="mt-7 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">View Course & Enroll</Link>
      </div>
    );
  }

  return <Outlet />;
}

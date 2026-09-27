import { Link, useSearchParams } from "react-router-dom";
import courses from "../data/courses";
import CourseGrid from "../components/CourseGrid";
import { Footer, Navbar } from "../../../components/home";
import { useAuth } from "../../../context/AuthContext";
import { isAdministrator } from "../../../components/auth/AdminRoute";
import useCourseEnrollments from "../hooks/useCourseEnrollments";

function CatalogueContent({ publicView }) {
  const { user, profile } = useAuth();
  const admin = isAdministrator(user, profile);
  const { courseIds, loading, error } = useCourseEnrollments(!publicView && !admin);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const availableCourses = publicView || admin ? courses : courses.filter((course) => !courseIds.includes(course.id));
  const visibleCourses = availableCourses.filter((course) =>
    `${course.title} ${course.description || ""}`.toLowerCase().includes(search.trim().toLowerCase())
  );
  return (
    <div className={publicView ? "mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:py-16" : "space-y-8"}>
      <div className={publicView ? "mb-10 text-center" : ""}>
        {publicView && (
          <p className="font-bold uppercase tracking-[0.2em] text-blue-700">
            Learn • Build • Certify
          </p>
        )}
        <h1 className={publicView ? "mt-3 text-4xl font-black text-slate-900 sm:text-5xl" : "text-3xl font-bold text-slate-800"}>
          {publicView || admin ? "Robotics and Technology Courses" : "Available Courses"}
        </h1>
        <p className={publicView ? "mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600" : "mt-2 text-slate-600"}>
          {publicView || admin
            ? "Explore practical courses in robotics, Arduino, Raspberry Pi, embedded systems, IoT, PCB design and drone technology. View every course before signing in or paying."
            : "Browse courses you have not enrolled in yet. Your purchased courses are under Enrolled Courses."}
        </p>
      </div>

      <div className="mb-8 rounded-2xl bg-white p-6 shadow">
        <input
          type="text"
          placeholder="Search courses..."
          aria-label="Search courses"
          value={search}
          onChange={(event) => {
            const next = new URLSearchParams(searchParams);
            if (event.target.value) next.set("search", event.target.value);
            else next.delete("search");
            setSearchParams(next, { replace: true });
          }}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p role="status" className="text-slate-600">Loading available courses...</p>
      ) : error ? (
        <p role="alert" className="rounded-xl bg-red-50 p-5 text-red-700">{error}</p>
      ) : !publicView && !admin && availableCourses.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center text-slate-700">
          <p>All courses are in your enrolled list.</p>
          <Link to="/courses/enrolled" className="mt-4 inline-block font-semibold text-blue-700 underline">View Enrolled Courses</Link>
        </div>
      ) : (
        <CourseGrid courses={visibleCourses} />
      )}
    </div>
  );
}

export default function Courses({ publicView = false }) {
  if (!publicView) {
    return <CatalogueContent publicView={false} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-5 py-14 text-center text-white sm:px-6 lg:py-20">
          <p className="font-bold uppercase tracking-[0.2em] text-blue-200">
            NextGenRoboticX Academy
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Choose a course and start building
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-blue-100">
            Compare complete curricula, projects, assessments and course fees without creating an account.
          </p>
        </section>
        <CatalogueContent publicView />
      </main>
      <Footer />
    </div>
  );
}

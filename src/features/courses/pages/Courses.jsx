import { useSearchParams } from "react-router-dom";
import courses from "../data/courses";
import CourseGrid from "../components/CourseGrid";
import { Footer, Navbar } from "../../../components/home";

function CatalogueContent({ publicView }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const visibleCourses = courses.filter((course) =>
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
          Robotics and Technology Courses
        </h1>
        <p className={publicView ? "mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600" : "mt-2 text-slate-600"}>
          Explore practical courses in robotics, Arduino, Raspberry Pi, embedded systems, IoT, PCB design and drone technology. View every course before signing in or paying.
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

      <CourseGrid courses={visibleCourses} />
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

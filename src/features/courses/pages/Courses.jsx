import courses from "../data/courses";
import CourseGrid from "../components/CourseGrid";

export default function Courses() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Courses
        </h1>

        <p className="mt-2 text-slate-600">
          Explore robotics, AI, embedded systems, IoT and drone technology
          courses.
        </p>
      </div>

      {/* Search (UI only for now) */}
      <div className="rounded-2xl bg-white p-6 shadow">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Course Grid */}
      <CourseGrid courses={courses} />
    </div>
  );
}
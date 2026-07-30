import CourseCard from "./CourseCard";

export default function CourseGrid({ courses = [] }) {
  if (courses.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white px-8 py-16 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
            />
          </svg>
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-800">
          No Courses Found
        </h2>

        <p className="mt-3 text-slate-500">
          We couldn't find any courses matching your search or selected
          category. Try using different keywords or choose another category.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-8
        sm:grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
        items-stretch
      "
    >
      {courses.map((course) => (
        <div key={course.id} className="flex h-full">
          <div className="w-full">
            <CourseCard course={course} />
          </div>
        </div>
      ))}
    </div>
  );
}
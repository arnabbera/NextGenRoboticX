import CourseCard from "./CourseCard";

export default function CourseGrid({ courses }) {
  if (!courses || courses.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow">
        <h2 className="text-xl font-semibold text-slate-700">
          No courses found
        </h2>

        <p className="mt-2 text-slate-500">
          Try changing your search or category filter.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        gap-6
        sm:grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
      "
    >
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
        />
      ))}
    </div>
  );
}
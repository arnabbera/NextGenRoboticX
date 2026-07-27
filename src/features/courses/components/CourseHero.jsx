export default function CourseHero({ course }) {
  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <img
        src={course.image}
        alt={course.title}
        className="w-full rounded-t-2xl"
      />

      <div className="p-8">
        <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
          {course.category}
        </span>

        <h1 className="mt-4 text-4xl font-bold text-slate-800">
          {course.title}
        </h1>

        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
          {course.description}
        </p>
      </div>
    </section>
  );
}
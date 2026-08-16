import { Link } from "react-router-dom";
import courses from "../../features/courses/data/courses";

export default function FeaturedCourses() {
  const featuredCourses = courses.slice(0, 6);

  return (
    <section id="courses" className="scroll-mt-24 bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-slate-800">
            Featured Courses
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Learn Robotics, AI, IoT and Embedded Systems through practical,
            project-based learning.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {featuredCourses.map((course, index) => (

            <div
              key={course.id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >

              <img
                src={course.image}
                alt={course.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">

                <div className="mb-4 flex items-center justify-between">

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                    {course.level}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      course.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {course.status}
                  </span>

                </div>

                <h3 className="text-2xl font-bold text-slate-800">
                  {course.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-slate-600">
                  {course.description}
                </p>

                <div className="mt-6 flex justify-between text-sm text-slate-500">

                  <span>📚 {course.chapters} Chapters</span>

                  <span>⏳ {course.duration}</span>

                </div>

                <Link
                  to={`/courses/${course.id}`}
                  className="mt-8 block rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                >
                  View Course
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
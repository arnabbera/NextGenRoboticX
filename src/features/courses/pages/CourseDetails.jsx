import { Link, useParams } from "react-router-dom";
import courses from "../data/courses";

export default function CourseDetails() {
  const { courseId } = useParams();

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-red-600">
          Course Not Found
        </h1>

        <p className="mt-4 text-slate-600">
          The requested course does not exist.
        </p>

        <Link
          to="/courses"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* Hero Section */}

      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 shadow-xl">

        <div className="grid items-center gap-10 p-10 lg:grid-cols-2">

          <div className="text-white">

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
              {course.category}
            </span>

            <h1 className="mt-6 text-5xl font-bold">
              {course.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-blue-100">
              {course.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <span className="rounded-full bg-white/20 px-4 py-2">
                🎓 {course.level}
              </span>

              <span className="rounded-full bg-white/20 px-4 py-2">
                ⏱ {course.duration}
              </span>

              <span className="rounded-full bg-white/20 px-4 py-2">
                📚 {course.chapters} Chapters
              </span>

            </div>

            <Link
              to={`/learn/${course.id}`}
              className="mt-10 inline-flex rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:scale-105"
            >
              Start Learning →
            </Link>

          </div>

          <div>

            <img
              src={course.image}
              alt={course.title}
              className="w-full rounded-2xl shadow-2xl"
            />

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="mt-10 grid gap-6 md:grid-cols-4">

        <StatCard
          title="Level"
          value={course.level}
        />

        <StatCard
          title="Duration"
          value={course.duration}
        />

        <StatCard
          title="Chapters"
          value={course.chapters}
        />

        <StatCard
          title="Certificate"
          value={course.certificate ? "Yes" : "No"}
        />

      </div>

      {/* Learning Outcomes */}

      <div className="mt-10 rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-3xl font-bold">

          What You'll Learn

        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          {course.learningOutcomes.map((item, index) => (

            <div
              key={index}
              className="flex items-start gap-3 rounded-xl border p-4"
            >

              <div className="text-green-600 text-xl">

                ✔

              </div>

              <div>{item}</div>

            </div>

          ))}

        </div>

      </div>

      {/* Course Information */}

      <div className="mt-10 rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-3xl font-bold">

          Course Information

        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <Info label="Category" value={course.category} />

          <Info label="Level" value={course.level} />

          <Info label="Duration" value={course.duration} />

          <Info label="Chapters" value={course.chapters} />

          <Info label="Students Enrolled" value={course.students} />

          <Info label="Status" value={course.status} />

        </div>

      </div>

      {/* Instructor */}

      <div className="mt-10 rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-3xl font-bold">

          Instructor

        </h2>

        <div className="flex flex-col gap-6 md:flex-row md:items-center">

          <img
            src="/images/instructor.jpg"
            alt="Instructor"
            className="h-28 w-28 rounded-full border object-cover"
          />

          <div>

            <h3 className="text-2xl font-bold">

              Arnab Bera

            </h3>

            <p className="mt-2 text-slate-600">

              M.Tech • Electronics Engineer • AI & Robotics Trainer

            </p>

            <p className="mt-4 leading-7 text-slate-600">

              20+ years of experience in Embedded Systems,
              OSS Solutions, Artificial Intelligence,
              IoT, Robotics and Software Engineering.

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow">

      <div className="text-3xl font-bold text-blue-700">

        {value}

      </div>

      <div className="mt-2 text-slate-500">

        {title}

      </div>

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border p-5">

      <div className="text-sm text-slate-500">

        {label}

      </div>

      <div className="mt-2 text-lg font-semibold">

        {value}

      </div>

    </div>
  );
}
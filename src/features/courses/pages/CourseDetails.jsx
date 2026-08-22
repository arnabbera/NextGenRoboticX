import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import courses from "../data/courses";
import CourseEnrollment from "../components/CourseEnrollment";
import { isAdministrator } from "../../../components/auth/AdminRoute";
import { useAuth } from "../../../context/AuthContext";

const ROBOTICS_CHAPTERS = [
  "Introduction to Robotics",
  "Arduino Basics",
  "Sensors & Actuators",
  "Motor Driver (L298N)",
  "Bluetooth Robot",
  "Obstacle Avoiding Robot",
  "Line Following Robot",
  "Voice Controlled Robot",
  "AI Robot Integration",
  "Final Project: Multi-Mode Mobile Robot",
];

export default function CourseDetails() {
  const { courseId } = useParams();
  const { user, profile } = useAuth();
  const [enrolled, setEnrolled] = useState(false);

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

  if (course.status === "Coming Soon" && !isAdministrator(user, profile)) {
    return (
      <div className="mx-auto mt-12 max-w-2xl rounded-3xl bg-white p-10 text-center shadow-xl">
        <img src={course.image} alt={course.title} className="mx-auto h-56 w-full max-w-lg rounded-2xl object-cover opacity-70" />
        <span className="mt-7 inline-flex rounded-full bg-orange-100 px-4 py-2 font-semibold text-orange-700">Coming Soon</span>
        <h1 className="mt-5 text-4xl font-bold text-slate-900">{course.title}</h1>
        <p className="mt-4 text-lg text-slate-600">This course is currently being prepared and cannot be viewed or enrolled in yet.</p>
        <Link to="/courses" className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Back to Courses</Link>
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

      {course.id === "robotics-foundation" && (
        <section className="mt-10 space-y-8 rounded-3xl bg-white p-7 shadow-xl md:p-10" aria-labelledby="robotics-course-overview">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">Review before enrollment</span>
            <h2 id="robotics-course-overview" className="mt-5 text-3xl font-bold text-slate-900 md:text-4xl">Robotics Foundation Course Summary</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Learn the fundamentals of robotics, electronics, Arduino, sensors, actuators, motor control, robot design, and intelligent robotic systems through structured lessons and hands-on projects.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900">Complete 10-Chapter Curriculum</h3>
            <p className="mt-2 text-slate-600">Every chapter includes structured learning notes, a chapter quiz, and downloadable PDF study material after enrollment.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {ROBOTICS_CHAPTERS.map((title, index) => (
                <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">{index + 1}</span>
                    <div>
                      <h4 className="font-bold text-slate-900">{title}</h4>
                      <p className="mt-2 text-sm text-slate-600">✓ Chapter quiz &nbsp; • &nbsp; ✓ PDF study material</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900">Tests, Assessment and Certificate</h3>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              <SummaryCard title="Chapter Quizzes" value="10 quizzes" text="Each chapter includes a knowledge quiz to check understanding before moving forward." />
              <SummaryCard title="Mock Test" value="50 questions • 100 marks" text="Each question carries 2 marks. Use the mock test to prepare for the final assessment." />
              <SummaryCard title="Final Assessment" value="50 questions • 100 marks" text="Score at least 80 marks (80%) to pass and receive the course certificate." />
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h3 className="text-xl font-bold text-emerald-900">Certificate requirement</h3>
            <p className="mt-2 leading-7 text-emerald-800">Complete the course and obtain at least 80 out of 100 marks in the final assessment. After passing, the certificate will be generated and added to your Certificates section.</p>
          </div>
        </section>
      )}

      <section className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-7 text-white shadow-xl md:p-10">
        <h2 className="text-3xl font-bold">Ready to begin?</h2>
        <p className="mt-3 max-w-3xl text-lg leading-8 text-blue-100">Review the complete course structure above, then enroll for a one-time fee of ₹99. Access is permanently linked to your signed-in Gmail account.</p>
        <CourseEnrollment course={course} onStatusChange={setEnrolled} />
        {enrolled && (
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={`/courses/${course.id}/learn`} className="inline-flex rounded-xl bg-white px-6 py-4 font-semibold text-blue-700 transition hover:scale-105 hover:shadow-xl">🚀 Start Learning</Link>
            {course.id === "robotics-foundation" && (
              <>
                <Link to="/courses/robotics-foundation/mock-test" className="inline-flex rounded-xl border border-white/40 bg-white/15 px-6 py-4 font-semibold text-white transition hover:bg-white/25">📝 Mock Test</Link>
                <Link to="/courses/robotics-foundation/assessment" className="inline-flex rounded-xl bg-emerald-500 px-6 py-4 font-semibold text-white transition hover:bg-emerald-400">🎓 Assessment</Link>
              </>
            )}
          </div>
        )}
      </section>

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

              <div className="text-xl text-green-600">
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
            src="/images/instructor.png"
            alt="Instructor"
            className="h-28 w-28 rounded-full border object-cover"
          />

          <div>

            <h3 className="text-2xl font-bold">
              Sona Bera
            </h3>

            <p className="mt-2 text-slate-600">
              M.Tech in VLSI & Embedded Systems	• Electronics Engineer • AI & Robotics Trainer
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              10+ years of experience in Embedded Systems,
              Artificial Intelligence, IoT, Robotics and Software Engineering.
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

function SummaryCard({ title, value, text }) {
  return (
    <article className="rounded-2xl border border-slate-200 p-6">
      <h4 className="font-bold text-blue-700">{title}</h4>
      <p className="mt-3 text-xl font-bold text-slate-900">{value}</p>
      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </article>
  );
}

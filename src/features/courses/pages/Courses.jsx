import { Link, useParams } from "react-router-dom";
import { ArrowLeft, PlayCircle } from "lucide-react";

import courses from "../data/courses";
import CourseHero from "../components/CourseHero";
import CourseInfoCards from "../components/CourseInfoCards";
import LearningOutcomes from "../components/LearningOutcomes";
import ChapterList from "../components/ChapterList";

export default function CourseDetails() {
  const { courseId } = useParams();

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-2xl font-bold text-red-600">
          Course not found
        </h2>

        <Link
          to="/dashboard"
          className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <Link
        to="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>

      <CourseHero course={course} />

      <CourseInfoCards course={course} />

      {/* Start Learning Button */}
      <div className="my-8 flex justify-center">
        <Link
          to={`/courses/${course.id}/learn`}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
        >
          <PlayCircle size={22} />
          Start Learning
        </Link>
      </div>

      <LearningOutcomes course={course} />

      <ChapterList courseId={course.id} />
    </div>
  );
}
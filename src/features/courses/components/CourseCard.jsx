import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Users,
  Award,
  ArrowRight,
  Tag,
} from "lucide-react";

export default function CourseCard({ course }) {
  const {
    id,
    title,
    level,
    duration,
    chapters,
    students,
    progress,
    description,
    image,
    status,
    certificate,
  } = course;

  const levelColors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-red-100 text-red-700",
  };

  const isComingSoon = status === "Coming Soon";

  const card = (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Course Image */}

      <div className="relative bg-white">

        <img
          src={image}
          alt={title}
          className="w-full h-auto"
        />

        <div className="absolute top-4 right-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold shadow ${
              levelColors[level] || "bg-gray-100 text-gray-700"
            }`}
          >
            {level}
          </span>
        </div>

      </div>

      {/* Content */}

      <div className="p-6">

        <h2 className="min-h-[64px] text-2xl font-bold leading-tight text-slate-800">
          {title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
          {description}
        </p>

        {/* Statistics */}

        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">

          <div className="flex items-center gap-2 text-slate-700">
            <BookOpen size={18} />
            <span>{chapters} Chapters</span>
          </div>

          <div className="flex items-center gap-2 text-slate-700">
            <Clock size={18} />
            <span>{duration}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-700">
            <Users size={18} />
            <span>{students}</span>
          </div>

          {certificate && (
            <div className="flex items-center gap-2 text-slate-700">
              <Award size={18} />
              <span>Certificate</span>
            </div>
          )}

        </div>

        {/* Status */}

        <div className="mt-6 flex items-center justify-between">

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              isComingSoon
                ? "bg-orange-100 text-orange-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {status}
          </span>

          <div className="flex items-center gap-2 text-slate-500">
            <Tag size={16} />
            <span>{progress}% Complete</span>
          </div>

        </div>

        {/* Progress */}

        <div className="mt-4">

          <div className="mb-2 flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>

          <div className="h-2 rounded-full bg-slate-200">

            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />

          </div>

        </div>

        {/* Button */}

        <button
          disabled={isComingSoon}
          className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold transition ${
            isComingSoon
              ? "cursor-not-allowed bg-slate-300 text-slate-600"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isComingSoon
            ? "Coming Soon"
            : progress > 0
            ? "Continue Learning"
            : "View Course · ₹99 Access"}

          {!isComingSoon && <ArrowRight size={18} />}
        </button>

      </div>

    </div>
  );

  if (isComingSoon) {
    return card;
  }

  return (
    <Link to={`/courses/${id}`} className="block">
      {card}
    </Link>
  );
}
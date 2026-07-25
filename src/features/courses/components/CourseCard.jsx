import { BookOpen, Clock, Users, Award } from "lucide-react";

export default function CourseCard({ course }) {
  const {
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

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Course Image */}
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover"
      />

      <div className="p-6">
        {/* Title */}
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              levelColors[level] || "bg-gray-100 text-gray-700"
            }`}
          >
            {level}
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {description}
        </p>

        {/* Course Info */}
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <BookOpen size={18} />
            <span>{chapters} Chapters</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>{duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>{students} Students</span>
          </div>

          {certificate && (
            <div className="flex items-center gap-2">
              <Award size={18} />
              <span>Certificate</span>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium">Progress</span>
            <span>{progress}%</span>
          </div>

          <div className="h-2 rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Button */}
        <button
          disabled={status === "Coming Soon"}
          className={`mt-6 w-full rounded-xl py-3 font-semibold transition ${
            status === "Coming Soon"
              ? "cursor-not-allowed bg-slate-300 text-slate-600"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {status === "Coming Soon"
            ? "Coming Soon"
            : progress > 0
            ? "Continue Learning"
            : "Enroll Now"}
        </button>
      </div>
    </div>
  );
}
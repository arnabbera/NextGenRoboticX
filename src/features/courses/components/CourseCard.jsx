import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Users,
  Award,
  ArrowRight,
  Tag,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { isAdministrator } from "../../../components/auth/AdminRoute";

export default function CourseCard({ course }) {
  const { user, profile } = useAuth();
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
    enrolled,
    price = 199,
    regularPrice = 499,
    launchLimit,
  } = course;

  const levelColors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-red-100 text-red-700",
  };

  const isComingSoon = status === "Coming Soon";
  const administrator = isAdministrator(user, profile);
  const canOpen = !isComingSoon || administrator;
  const [offer, setOffer] = useState({
    price,
    regularPrice,
    launchLimit,
    remaining: launchLimit,
    launchActive: Boolean(launchLimit),
  });

  useEffect(() => {
    if (isComingSoon || !launchLimit) return undefined;
    let cancelled = false;
    fetch(`/api/course-access/${id}/offer`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to load offer.");
        return data;
      })
      .then((data) => {
        if (!cancelled) setOffer(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [id, isComingSoon, launchLimit]);

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

        {!isComingSoon && launchLimit && (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            {offer.launchActive ? (
              <>
                <div className="flex items-baseline gap-2">
                  <strong className="text-xl text-slate-900">Launch offer ₹{offer.price}</strong>
                  <span className="text-sm text-slate-500 line-through">₹{offer.regularPrice}</span>
                </div>
                <p className="mt-1 text-sm text-amber-800">
                  First {offer.launchLimit} students · Complete course, assessments and certificate included
                </p>
              </>
            ) : (
              <strong className="text-xl text-slate-900">Course fee ₹{offer.price}</strong>
            )}
          </div>
        )}

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
          disabled={!canOpen}
          className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold transition ${
            !canOpen
              ? "cursor-not-allowed bg-slate-300 text-slate-600"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isComingSoon && administrator
            ? "View Course Details"
            : isComingSoon
            ? "Coming Soon"
            : enrolled || progress > 0
            ? "Continue Learning"
            : `Enroll for ₹${offer.price}`}

          {canOpen && <ArrowRight size={18} />}
        </button>

      </div>

    </div>
  );

  if (!canOpen) {
    return card;
  }

  return (
    <Link to={`/courses/${id}`} className="block">
      {card}
    </Link>
  );
}

import { useMemo, useState } from "react";
import courses from "../data/courses";
import CourseGrid from "../components/CourseGrid";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "Robotics",
    "Embedded",
    "IoT",
    "Electronics",
    "AI",
    "Drone",
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        filter === "All" || course.category === filter;

      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, filter]);

  const totalCourses = courses.length;

  const availableCourses = courses.filter(
    (course) => course.status === "Available"
  ).length;

  const upcomingCourses = courses.filter(
    (course) => course.status === "Coming Soon"
  ).length;

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Explore Courses
          </h1>

          <p className="mt-2 text-slate-600">
            Learn Robotics, Embedded Systems, IoT, AI and Drone Technology
            through practical, project-based learning.
          </p>

        </div>

        <div className="grid grid-cols-3 gap-4">

          <StatCard
            value={totalCourses}
            label="Courses"
          />

          <StatCard
            value={availableCourses}
            label="Available"
          />

          <StatCard
            value={upcomingCourses}
            label="Upcoming"
          />

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white p-6 shadow">

        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Category Filter */}

      <div className="flex flex-wrap gap-3">

        {categories.map((category) => (

          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              filter === category
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700 shadow hover:bg-slate-100"
            }`}
          >
            {category}
          </button>

        ))}

      </div>

      {/* Results */}

      <div className="flex items-center justify-between">

        <h2 className="text-lg font-semibold text-slate-700">
          {filteredCourses.length} Course
          {filteredCourses.length !== 1 ? "s" : ""} Found
        </h2>

      </div>

      {/* Course Grid */}

      <CourseGrid courses={filteredCourses} />

    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="rounded-2xl bg-white px-6 py-4 text-center shadow">

      <div className="text-3xl font-bold text-blue-700">
        {value}
      </div>

      <div className="mt-1 text-sm text-slate-500">
        {label}
      </div>

    </div>
  );
}
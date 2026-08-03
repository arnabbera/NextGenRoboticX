import {
  BookOpen,
  GraduationCap,
  Award,
  Clock,
} from "lucide-react";

import { useAuth } from "../../../context/AuthContext";

export default function StatsCards() {
  const { profile } = useAuth();

  const dashboard = profile?.dashboard || {};

  const stats = [
    {
      title: "Enrolled Courses",
      value: dashboard.enrolledCourses ?? 0,
      icon: <BookOpen className="h-7 w-7 text-blue-600" />,
      bg: "bg-blue-50",
      color: "text-blue-700",
    },
    {
      title: "Completed Courses",
      value: dashboard.completedCourses ?? 0,
      icon: <GraduationCap className="h-7 w-7 text-green-600" />,
      bg: "bg-green-50",
      color: "text-green-700",
    },
    {
      title: "Certificates",
      value: dashboard.certificates ?? 0,
      icon: <Award className="h-7 w-7 text-amber-600" />,
      bg: "bg-amber-50",
      color: "text-amber-700",
    },
    {
      title: "Learning Hours",
      value: dashboard.learningHours ?? 0,
      icon: <Clock className="h-7 w-7 text-purple-600" />,
      bg: "bg-purple-50",
      color: "text-purple-700",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-3xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                {item.title}
              </p>

              <h2 className={`mt-2 text-3xl font-bold ${item.color}`}>
                {item.value}
              </h2>

            </div>

            <div className={`${item.bg} rounded-2xl p-4`}>
              {item.icon}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
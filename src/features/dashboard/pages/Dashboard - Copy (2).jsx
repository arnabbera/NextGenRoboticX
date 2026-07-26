import {
  Users,
  BookOpen,
  FolderKanban,
  GraduationCap,
  Rocket,
  CalendarDays,
  Activity,
} from "lucide-react";

import Layout from "../../../components/layout/Layout";
import StatCard from "../../../components/ui/StatCard";
import SectionCard from "../../../components/ui/SectionCard";
import { useAuth } from "../../../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Students",
      value: 126,
      icon: Users,
      color: "bg-blue-600",
      change: "+12 this month",
    },
    {
      title: "Courses",
      value: 12,
      icon: BookOpen,
      color: "bg-emerald-600",
      change: "3 new courses",
    },
    {
      title: "Projects",
      value: 28,
      icon: FolderKanban,
      color: "bg-orange-500",
      change: "8 active",
    },
    {
      title: "Certificates",
      value: 54,
      icon: GraduationCap,
      color: "bg-purple-600",
      change: "15 issued",
    },
  ];

  return (
    <Layout>
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.displayName || "Student"} 👋
        </h1>

        <p className="mt-2 text-blue-100 text-lg">
          NextGenRoboticX Mission Control
        </p>

        <p className="mt-4 max-w-2xl text-blue-100">
          Learn Robotics, Artificial Intelligence, Embedded Systems,
          IoT and Drone Technology through practical projects and
          industry-focused certification.
        </p>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
            change={item.change}
          />
        ))}
      </div>

      {/* Activity + Events */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Recent Activity">
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <Activity className="text-blue-600" size={18} />
              Rahul enrolled in Robotics Foundation
            </li>

            <li className="flex items-center gap-3">
              <Activity className="text-emerald-600" size={18} />
              Drone Project submitted successfully
            </li>

            <li className="flex items-center gap-3">
              <Activity className="text-orange-500" size={18} />
              AI Quiz completed
            </li>

            <li className="flex items-center gap-3">
              <Activity className="text-purple-600" size={18} />
              Certificate generated
            </li>
          </ul>
        </SectionCard>

        <SectionCard title="Upcoming Events">
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <CalendarDays className="text-blue-600" size={18} />
              Arduino Workshop
            </li>

            <li className="flex items-center gap-3">
              <CalendarDays className="text-emerald-600" size={18} />
              Drone Bootcamp
            </li>

            <li className="flex items-center gap-3">
              <CalendarDays className="text-orange-500" size={18} />
              AI Seminar
            </li>

            <li className="flex items-center gap-3">
              <CalendarDays className="text-purple-600" size={18} />
              Embedded Systems Lab
            </li>
          </ul>
        </SectionCard>
      </div>

      {/* Quick Launch */}
      <div className="mt-8">
        <SectionCard title="Quick Launch">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Robotics Lab",
              "Embedded Lab",
              "Start Learning",
              "Take Exam",
            ].map((item) => (
              <button
                key={item}
                className="rounded-xl bg-blue-600 px-4 py-5 text-white transition hover:bg-blue-700"
              >
                <Rocket className="mx-auto mb-2" size={26} />
                {item}
              </button>
            ))}
          </div>
        </SectionCard>
      </div>
    </Layout>
  );
}
import {
  LayoutDashboard,
  BookOpen,
  FolderKanban,
  Users,
  GraduationCap,
  Briefcase,
  Settings,
  ChevronLeft,
  ChevronRight,
  Trophy,
  FileText,
  Download,
  Cpu,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Courses",
    path: "/courses",
    icon: BookOpen,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    name: "Assessments",
    path: "/assessments",
    icon: FileText,
  },
  {
    name: "Certificates",
    path: "/certifications",
    icon: GraduationCap,
  },
  {
    name: "Leaderboard",
    path: "/leaderboard",
    icon: Trophy,
  },
  {
    name: "Downloads",
    path: "/downloads",
    icon: Download,
  },
  {
    name: "Careers",
    path: "/careers",
    icon: Briefcase,
  },
  {
    name: "Students",
    path: "/students",
    icon: Users,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-72"
      } bg-slate-900 text-white transition-all duration-300 flex flex-col shadow-2xl`}
    >
      {/* Logo */}

      <div className="border-b border-slate-800 p-5">

        <div className="flex items-center justify-between">

          {!collapsed && (

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">

                <Cpu size={24} />

              </div>

              <div>

                <h1 className="text-lg font-bold">
                  NextGenRoboticX
                </h1>

                <p className="text-xs text-slate-400">
                  Robotics Learning Platform
                </p>

              </div>

            </div>

          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-2 hover:bg-slate-800"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto py-5">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `mx-3 mb-2 flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              {!collapsed && (
                <span className="font-medium">
                  {item.name}
                </span>
              )}
            </NavLink>
          );
        })}

      </nav>

      {/* Student Progress */}

      {!collapsed && (

        <div className="mx-4 mb-4 rounded-2xl bg-slate-800 p-4">

          <p className="text-sm font-semibold">
            Learning Progress
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Overall Completion
          </p>

          <div className="mt-3 h-2 rounded-full bg-slate-700">

            <div
              className="h-2 rounded-full bg-blue-500"
              style={{ width: "68%" }}
            />

          </div>

          <p className="mt-2 text-sm font-semibold text-blue-400">
            68%
          </p>

        </div>

      )}

      {/* Footer */}

      {!collapsed && (

        <div className="border-t border-slate-800 p-5">

          <div className="rounded-xl bg-slate-800 p-4">

            <h3 className="font-semibold">
              NextGenRoboticX
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              AI • Robotics • IoT • Embedded Systems
            </p>

            <p className="mt-4 text-xs text-slate-500">
              Version 2.0
            </p>

          </div>

        </div>

      )}

    </aside>
  );
}
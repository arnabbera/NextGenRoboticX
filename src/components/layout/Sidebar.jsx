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
    name: "Programs",
    path: "/programs",
    icon: BookOpen,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    name: "Students",
    path: "/students",
    icon: Users,
  },
  {
    name: "Certificates",
    path: "/certifications",
    icon: GraduationCap,
  },
  {
    name: "Careers",
    path: "/careers",
    icon: Briefcase,
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
        collapsed ? "w-20" : "w-64"
      } bg-slate-900 text-white transition-all duration-300 flex flex-col shadow-xl`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-6 border-b border-slate-700">
        {!collapsed && (
          <div>
            <h1 className="text-xl font-bold text-blue-400">
              NextGenRoboticX
            </h1>
            <p className="text-xs text-slate-400">
              Mission Control
            </p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 hover:bg-slate-700"
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `mx-3 mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
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

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-slate-700 p-4">
          <p className="text-xs text-slate-400">
            NextGenRoboticX
          </p>
          <p className="text-xs text-slate-500">
            Version 2.0
          </p>
        </div>
      )}
    </aside>
  );
}
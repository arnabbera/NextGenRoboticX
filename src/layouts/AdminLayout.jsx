import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Award,
  BarChart3,
  Settings,
  Users,
  LogOut,
} from "lucide-react";

import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const menuItems = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    path: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Students",
    path: "/admin/students",
    icon: GraduationCap,
  },
  {
    title: "Certificates",
    path: "/admin/certificates",
    icon: Award,
  },
  {
    title: "Analytics",
    path: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout() {
  const { profile, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <aside className="w-72 bg-slate-900 text-white">

        <div className="border-b border-slate-700 p-6">

          <h1 className="text-2xl font-bold">
            NextGenRoboticX
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Admin CMS
          </p>

        </div>

        <nav className="mt-4">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `mx-3 mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <Icon size={20} />

                <span>{item.title}</span>
              </NavLink>
            );
          })}

        </nav>

      </aside>

      {/* Main */}

      <div className="flex flex-1 flex-col">

        {/* Header */}

        <header className="flex items-center justify-between border-b bg-white px-8 py-5 shadow-sm">

          <div>

            <h2 className="text-2xl font-bold">
              Admin Dashboard
            </h2>

            <p className="text-sm text-slate-500">
              Welcome back
            </p>

          </div>

          <div className="flex items-center gap-5">

            <div className="text-right">

              <div className="font-semibold">
                {profile?.displayName}
              </div>

              <div className="text-sm text-slate-500">
                {profile?.email}
              </div>

            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-slate-100"
            >
              <LogOut size={18} />

              Logout
            </button>

          </div>

        </header>

        {/* Page Content */}

        <main className="flex-1 p-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
}
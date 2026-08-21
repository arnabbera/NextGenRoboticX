import {
  LayoutDashboard,
  BookOpen,
  FolderKanban,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const menuItems = [
  { title: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { title: "Courses", path: "/admin/courses", icon: BookOpen },
  { title: "Projects", path: "/admin/projects", icon: FolderKanban },
];

export default function AdminLayout() {
  const { user, profile, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        className="fixed left-4 top-4 z-50 rounded-xl bg-slate-900 p-3 text-white shadow lg:hidden"
        aria-label="Toggle admin menu"
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-white transition-transform lg:sticky lg:top-0 lg:h-screen ${menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="border-b border-slate-700 p-6">
          <h1 className="text-2xl font-bold">NextGenRoboticX</h1>
          <p className="mt-2 text-sm text-slate-400">Admin CMS</p>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.title}
                to={item.path}
                end={item.path === "/admin"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `mx-3 mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`
                }
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b bg-white px-5 py-5 pl-20 shadow-sm lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <p className="text-sm text-slate-500">Manage courses and projects</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <div className="font-semibold">{profile?.displayName || user?.displayName || "Administrator"}</div>
              <div className="text-sm text-slate-500">{profile?.email || user?.email}</div>
            </div>
            <button onClick={logout} className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-slate-100">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </header>
        <main className="p-5 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}

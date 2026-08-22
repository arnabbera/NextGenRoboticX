import { BookOpen, ChevronLeft, ChevronRight, Cpu, FolderKanban, LayoutDashboard, Settings2, Wrench } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
  { name: "All Courses", path: "/admin/all-courses", icon: BookOpen },
  { name: "Projects", path: "/admin/all-projects", icon: FolderKanban },
  { name: "Course Management", path: "/admin/courses", icon: Settings2 },
  { name: "Project Management", path: "/admin/projects", icon: Wrench },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={`${collapsed ? "w-20" : "w-72"} flex min-h-screen flex-col bg-slate-900 text-white shadow-2xl transition-all duration-300`}>
      <div className="border-b border-slate-800 p-5">
        <div className="flex items-center justify-between">
          {!collapsed && <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600"><Cpu size={24} /></div><div><h1 className="text-lg font-bold">NextGenRoboticX</h1><p className="text-xs text-slate-400">Administrator Portal</p></div></div>}
          <button type="button" onClick={() => setCollapsed(!collapsed)} className="rounded-lg p-2 hover:bg-slate-800" aria-label={collapsed ? "Expand menu" : "Collapse menu"}>{collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}</button>
        </div>
      </div>
      <nav className="flex-1 py-5" aria-label="Administrator dashboard">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return <NavLink key={item.name} to={item.path} end={item.end} title={collapsed ? item.name : undefined} className={({ isActive }) => `mx-3 mb-2 flex items-center gap-4 rounded-xl px-4 py-3 transition ${isActive ? "bg-blue-600 text-white shadow-lg" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}><Icon size={20} className="shrink-0" />{!collapsed && <span className="font-medium">{item.name}</span>}</NavLink>;
        })}
      </nav>
      {!collapsed && <div className="border-t border-slate-800 p-5"><p className="text-xs leading-5 text-slate-400">Administrators have full access to every course, project, chapter, and protected lesson resource.</p></div>}
    </aside>
  );
}

import { BookOpen, FolderKanban, Settings2, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import WelcomeBanner from "../../dashboard/components/WelcomeBanner";

const sections = [
  { title: "All Courses", description: "Open every course and chapter with administrator access. No enrollment payment is required for administrators.", path: "/admin/all-courses", icon: BookOpen, color: "bg-blue-600" },
  { title: "Projects", description: "View every practical robotics, IoT, AI, drone, and automation project with full administrator permissions.", path: "/admin/all-projects", icon: FolderKanban, color: "bg-cyan-600" },
  { title: "Course Management", description: "Manage the course catalog, chapters, and upload or replace lesson PDFs.", path: "/admin/courses", icon: Settings2, color: "bg-emerald-600" },
  { title: "Project Management", description: "Edit project details and manage connection diagrams and project PDF resources.", path: "/admin/projects", icon: Wrench, color: "bg-amber-500" },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  return (
    <div className="space-y-8">
      <WelcomeBanner />
      <div><h1 className="text-3xl font-bold text-slate-900">Administrator Dashboard</h1><p className="mt-2 text-slate-600">Signed in as {user?.email}</p></div>
      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return <Link key={section.path} to={section.path} className="group rounded-3xl bg-white p-7 shadow transition hover:-translate-y-1 hover:shadow-xl"><div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white ${section.color}`}><Icon size={28} /></div><h2 className="mt-5 text-2xl font-bold text-slate-900 group-hover:text-blue-700">{section.title}</h2><p className="mt-3 leading-7 text-slate-600">{section.description}</p></Link>;
        })}
      </div>
    </div>
  );
}

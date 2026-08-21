import { Award, BookOpen, GraduationCap, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import WelcomeBanner from "../components/WelcomeBanner";

const sections = [
  {
    title: "Available Courses",
    description: "Browse all available robotics and technology courses. Enroll for ₹99 per course.",
    path: "/courses/available",
    icon: BookOpen,
    color: "bg-blue-600",
  },
  {
    title: "Enrolled Courses",
    description: "Continue courses unlocked through successful payment on this Gmail account.",
    path: "/courses/enrolled",
    icon: GraduationCap,
    color: "bg-emerald-600",
  },
  {
    title: "Certificates",
    description: "View certificates generated after passing the required course assessment.",
    path: "/certificates",
    icon: Award,
    color: "bg-amber-500",
  },
  {
    title: "Student Profile",
    description: "Your student profile section. Full profile editing will be added later.",
    path: "/profile",
    icon: UserRound,
    color: "bg-purple-600",
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <WelcomeBanner />
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="mt-2 text-slate-600">Signed in as {user?.email}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.path} to={section.path} className="group rounded-3xl bg-white p-7 shadow transition hover:-translate-y-1 hover:shadow-xl">
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white ${section.color}`}><Icon size={28} /></div>
              <h2 className="mt-5 text-2xl font-bold text-slate-900 group-hover:text-blue-700">{section.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{section.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

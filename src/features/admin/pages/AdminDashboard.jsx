import { BookOpen, Users, Award, GraduationCap } from "lucide-react";
import Card from "../../../components/ui/Card";

const stats = [
  {
    title: "Courses",
    value: "0",
    icon: BookOpen,
  },
  {
    title: "Students",
    value: "0",
    icon: Users,
  },
  {
    title: "Certificates",
    value: "0",
    icon: Award,
  },
  {
    title: "Enrollments",
    value: "0",
    icon: GraduationCap,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome to the NextGenRoboticX Administration Portal.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title} hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {item.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-blue-100 p-3">
                  <Icon
                    size={28}
                    className="text-blue-600"
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card
        title="Recent Activity"
        subtitle="Latest administration activities"
      >
        <div className="py-12 text-center text-slate-500">
          No activity available.
        </div>
      </Card>
    </div>
  );
}
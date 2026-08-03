import { PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function WelcomeBanner() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";

    try {
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleString();
      }

      return new Date(timestamp).toLocaleString();
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-8 text-white shadow-xl">

      <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:items-center">

        <div className="flex-1">

          <h1 className="text-4xl font-bold">
            Welcome {profile?.displayName || "Student"} 👋
          </h1>

          <p className="mt-3 max-w-2xl text-blue-100">
            Continue your Robotics & AI journey with hands-on projects,
            Embedded Systems, Arduino, IoT, Machine Learning,
            Drone Technology and Professional Certification.
          </p>

          <button
            onClick={() =>
              navigate("/courses/robotics-foundation/learn")
            }
            className="mt-6 flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-slate-100"
          >
            <PlayCircle size={20} />
            Continue Learning
          </button>

        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <div className="text-sm text-blue-100">
              Student ID
            </div>

            <div className="mt-1 text-xl font-bold">
              {profile?.studentId || "Loading..."}
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <div className="text-sm text-blue-100">
              Role
            </div>

            <div className="mt-1 text-xl font-bold capitalize">
              {profile?.role || "Student"}
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <div className="text-sm text-blue-100">
              Login Count
            </div>

            <div className="mt-1 text-xl font-bold">
              {profile?.loginCount ?? 0}
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <div className="text-sm text-blue-100">
              Last Login
            </div>

            <div className="mt-1 text-sm">
              {formatDate(profile?.lastLogin)}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
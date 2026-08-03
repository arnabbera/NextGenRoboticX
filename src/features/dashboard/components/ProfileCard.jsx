import {
  Mail,
  User,
  ShieldCheck,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";

import { useAuth } from "../../../context/AuthContext";

export default function ProfileCard() {
  const { profile } = useAuth();

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";

    try {
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleDateString();
      }

      return new Date(timestamp).toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="rounded-3xl bg-white shadow-lg p-6">

      <div className="flex flex-col md:flex-row items-center gap-6">

        <img
          src={
            profile?.photoURL ||
            "https://ui-avatars.com/api/?name=Student&background=2563eb&color=fff"
          }
          alt="Profile"
          className="h-28 w-28 rounded-full border-4 border-blue-500 object-cover"
        />

        <div className="flex-1">

          <h2 className="text-2xl font-bold text-slate-800">
            {profile?.displayName || "Student"}
          </h2>

          <p className="mt-1 flex items-center gap-2 text-slate-600">
            <Mail size={16} />
            {profile?.email}
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-slate-100 p-4">
              <div className="flex items-center gap-2 text-blue-700">
                <User size={18} />
                <span className="text-sm font-medium">
                  Student ID
                </span>
              </div>

              <div className="mt-2 font-bold text-slate-800">
                {profile?.studentId}
              </div>
            </div>

            <div className="rounded-xl bg-slate-100 p-4">
              <div className="flex items-center gap-2 text-green-700">
                <ShieldCheck size={18} />
                <span className="text-sm font-medium">
                  Role
                </span>
              </div>

              <div className="mt-2 font-bold capitalize text-slate-800">
                {profile?.role}
              </div>
            </div>

            <div className="rounded-xl bg-slate-100 p-4">
              <div className="flex items-center gap-2 text-purple-700">
                <CalendarDays size={18} />
                <span className="text-sm font-medium">
                  Member Since
                </span>
              </div>

              <div className="mt-2 font-bold text-slate-800">
                {formatDate(profile?.createdAt)}
              </div>
            </div>

            <div className="rounded-xl bg-slate-100 p-4">
              <div className="flex items-center gap-2 text-amber-700">
                <BadgeCheck size={18} />
                <span className="text-sm font-medium">
                  Status
                </span>
              </div>

              <div className="mt-2 font-bold text-green-600">
                {profile?.isActive ? "Active" : "Inactive"}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
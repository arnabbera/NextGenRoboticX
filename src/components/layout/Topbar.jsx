import { Bell, Search, Moon, UserCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-6">

      {/* Search */}
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search courses, students..."
            className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        <button className="relative text-slate-600 hover:text-blue-600">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <button className="text-slate-600 hover:text-blue-600">
          <Moon size={22} />
        </button>

        <div className="flex items-center gap-3">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-10 h-10 rounded-full border"
            />
          ) : (
            <UserCircle
              size={38}
              className="text-slate-500"
            />
          )}

          <div className="hidden md:block">
            <p className="font-semibold text-slate-800">
              {user?.displayName || "User"}
            </p>

            <p className="text-xs text-slate-500">
              {user?.email}
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Moon,
  User,
  Settings,
  LogOut,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { logout } from "../../features/auth/services/authService";

export default function Topbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
      {/* Search */}
      <div className="relative w-full max-w-xl">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search courses, students..."
          className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative rounded-lg p-2 transition hover:bg-slate-100">
          <Bell size={24} className="text-slate-600" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Dark Mode */}
        <button className="rounded-lg p-2 transition hover:bg-slate-100">
          <Moon size={22} className="text-slate-600" />
        </button>

        {/* Profile */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-100"
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="h-12 w-12 rounded-full border"
              />
            ) : (
              <User size={42} className="text-slate-500" />
            )}

            <div className="hidden text-left lg:block">
              <h3 className="font-semibold text-slate-800">
                {user?.displayName}
              </h3>

              <p className="text-sm text-slate-500">
                {user?.email}
              </p>
            </div>

            <ChevronDown size={18} />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <button className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-slate-100">
                <User size={18} />
                My Profile
              </button>

              <button className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-slate-100">
                <Settings size={18} />
                Settings
              </button>

              <button className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-slate-100">
                <Moon size={18} />
                Dark Mode
              </button>

              <button className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-slate-100">
                <HelpCircle size={18} />
                Help
              </button>

              <hr />

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-5 py-3 text-left text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
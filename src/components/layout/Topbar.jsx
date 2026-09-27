import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  ChevronDown,
  HelpCircle,
  Menu,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Topbar({ darkMode, toggleDarkMode }) {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const menuRef = useRef(null);
  const notificationsRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(event.target)) {
        setMobileOpen(false);
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

  function openPage(path) {
    setMenuOpen(false);
    setMobileOpen(false);
    navigate(path);
  }

  return (
    <header className="relative flex h-20 items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 shadow-sm sm:px-8">
      <div className="relative lg:hidden" ref={mobileRef}>
        <button type="button" aria-label="Student navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"><Menu size={25} /></button>
        {mobileOpen && (
          <nav aria-label="Student navigation" className="absolute left-0 top-full z-50 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
            {[
              ["Dashboard", "/dashboard"],
              ["Available Courses", "/courses/available"],
              ["Enrolled Courses", "/courses/enrolled"],
              ["Available Projects", "/projects/available"],
              ["Enrolled Projects", "/projects/enrolled"],
              ["Certificates", "/certificates"],
              ["My Profile", "/profile"],
            ].map(([label, path]) => (
              <Link key={path} to={path} onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-3 font-medium text-slate-800 hover:bg-slate-100">{label}</Link>
            ))}
          </nav>
        )}
      </div>
      {/* Search */}
      <form className="relative hidden w-full max-w-xl sm:block" onSubmit={(event) => {
        event.preventDefault();
        navigate(`/courses/available?search=${encodeURIComponent(query.trim())}`);
      }}>
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search courses..."
          aria-label="Search courses"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-6">
        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button type="button" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen(!notificationsOpen)} className="rounded-lg p-2 transition hover:bg-slate-100"><Bell size={24} className="text-slate-600" /></button>
          {notificationsOpen && <div className="absolute right-0 z-50 mt-3 w-64 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-xl">No new notifications.</div>}
        </div>

        {/* Dark Mode */}
        <button type="button" onClick={toggleDarkMode} aria-label={darkMode ? "Turn off dark mode" : "Turn on dark mode"} className="rounded-lg p-2 transition hover:bg-slate-100">
          {darkMode ? <Sun size={22} className="text-slate-600" /> : <Moon size={22} className="text-slate-600" />}
        </button>

        {/* Profile */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            aria-label="Account menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-100"
          >
            {(profile?.profileImageURL || user?.photoURL) ? (
              <img
                src={profile?.profileImageURL || user.photoURL}
                alt={profile?.displayName || user?.displayName || "Profile"}
                className="h-12 w-12 rounded-full border"
              />
            ) : (
              <User size={42} className="text-slate-500" />
            )}

            <div className="hidden text-left lg:block">
              <h3 className="font-semibold text-slate-800">
                {profile?.displayName || user?.displayName || "Student"}
              </h3>

              <p className="text-sm text-slate-500">
                {user?.email}
              </p>
            </div>

            <ChevronDown size={18} />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <button type="button" onClick={() => openPage("/profile")} className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-slate-100">
                <User size={18} />
                My Profile
              </button>

              <button type="button" onClick={() => openPage("/settings")} className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-slate-100">
                <Settings size={18} />
                Settings
              </button>

              <button type="button" onClick={() => { toggleDarkMode(); setMenuOpen(false); }} className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-slate-100">
                <Moon size={18} />
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>

              <button type="button" onClick={() => openPage("/help")} className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-slate-100">
                <HelpCircle size={18} />
                Help
              </button>

              <hr />

          <button
            type="button"
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

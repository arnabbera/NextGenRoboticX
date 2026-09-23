import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("nextgen-student-theme") === "dark");
  function toggleDarkMode() {
    setDarkMode((current) => {
      localStorage.setItem("nextgen-student-theme", current ? "light" : "dark");
      return !current;
    });
  }
  return (
    <div className={`flex min-h-screen bg-slate-100 ${darkMode ? "student-dark" : ""}`}>
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
          <Topbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-screen-2xl p-6 lg:p-8">
            <Outlet context={{ darkMode, toggleDarkMode }} />
          </div>
        </main>
      </div>
    </div>
  );
}

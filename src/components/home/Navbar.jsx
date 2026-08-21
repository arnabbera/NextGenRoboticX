import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const items = [
  ["Home", "top"],
  ["Courses", "courses"],
  ["Projects", "projects"],
  ["Why Us", "why-us"],
  ["Contact", "contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function scrollTo(sectionId) {
    setOpen(false);
    if (sectionId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex items-center justify-between py-4">
          <Link
            to="/"
            onClick={() => scrollTo("top")}
            className="text-xl font-bold tracking-tight text-blue-700 sm:text-2xl"
          >
            NextGenRoboticX
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {items.map(([label, sectionId]) => (
              <button
                key={sectionId}
                type="button"
                onClick={() => scrollTo(sectionId)}
                className="font-medium text-slate-700 transition hover:text-blue-600"
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="rounded-xl border border-slate-200 p-2 text-slate-700 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <nav id="mobile-navigation" className="border-t border-slate-200 py-3 md:hidden" aria-label="Mobile navigation">
            {items.map(([label, sectionId]) => (
              <button
                key={sectionId}
                type="button"
                onClick={() => scrollTo(sectionId)}
                className="block w-full rounded-xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
              >
                {label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

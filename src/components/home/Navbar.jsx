import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-blue-700"
        >
          NextGenRoboticX
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <a
            href="#courses"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Courses
          </a>

          <a
            href="#projects"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Projects
          </a>

          <a
            href="#why-us"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Why Us
          </a>

          <a
            href="#contact"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

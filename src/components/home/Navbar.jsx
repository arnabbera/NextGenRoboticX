import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          NextGenRoboticX
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/courses" className="hover:text-blue-600">
            Courses
          </Link>

          <Link to="/projects" className="hover:text-blue-600">
            Projects
          </Link>

          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>

          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 transition hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
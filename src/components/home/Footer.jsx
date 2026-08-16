import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <Link to="/" className="text-2xl font-bold text-white">
            NextGenRoboticX
          </Link>
          <p className="mt-4 max-w-sm leading-7 text-slate-400">
            Practical robotics, AI, IoT, embedded systems and drone technology
            education through hands-on learning.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>
          <nav className="mt-4 flex flex-col gap-3">
            <a href="#courses" className="transition hover:text-blue-400">
              Courses
            </a>
            <a href="#projects" className="transition hover:text-blue-400">
              Projects
            </a>
            <a href="#why-us" className="transition hover:text-blue-400">
              Why Us
            </a>
            <a href="#contact" className="transition hover:text-blue-400">
              Contact
            </a>
          </nav>
        </div>

        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <div className="mt-4 space-y-3 text-slate-400">
            <p>Kolkata, West Bengal, India</p>
            <a
              href="tel:+919830068336"
              className="block transition hover:text-blue-400"
            >
              +91 98300 68336
            </a>
            <a
              href="mailto:info@nextgenroboticx.com"
              className="block transition hover:text-blue-400"
            >
              info@nextgenroboticx.com
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 px-6 py-6 text-center text-sm text-slate-500">
        © {year} NextGenRoboticX. All rights reserved.
      </div>
    </footer>
  );
}

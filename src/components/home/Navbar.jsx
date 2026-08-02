import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../services/firebase/authService";

export default function Navbar() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Unable to sign in with Google. Please try again.");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-blue-700"
        >
          NextGenRoboticX
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/courses"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Courses
          </Link>

          <Link
            to="/projects"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Projects
          </Link>

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

        {/* Google Sign In */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-blue-500 hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-5 w-5"
          >
            <path
              fill="#FFC107"
              d="M43.6,20.5H42V20H24v8h11.3C33.6,32.7,29.2,36,24,36
              c-6.6,0-12-5.4-12-12s5.4-12,12-12c3,0,5.7,1.1,7.8,2.9l5.7-5.7
              C34.1,6.1,29.3,4,24,4C12.9,4,4,12.9,4,24s8.9,20,20,20
              s20-8.9,20-20C44,22.7,43.9,21.6,43.6,20.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3,14.7l6.6,4.8C14.7,15,18.9,12,24,12
              c3,0,5.7,1.1,7.8,2.9l5.7-5.7C34.1,6.1,29.3,4,24,4
              C16.3,4,9.7,8.3,6.3,14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.2,0,10-2,13.5-5.2l-6.2-5.2
              C29.3,35.2,26.8,36,24,36c-5.2,0-9.6-3.3-11.2-8l-6.6,5.1
              C9.6,39.5,16.2,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.6,20.5H42V20H24v8h11.3
              c-1.1,3.1-3.3,5.6-6.2,7.2l6.2,5.2C39.1,37.3,44,31.2,44,24
              C44,22.7,43.9,21.6,43.6,20.5z"
            />
          </svg>

          Continue with Google
        </button>

      </div>
    </header>
  );
}
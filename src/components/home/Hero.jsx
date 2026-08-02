import { useNavigate } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react";
import { auth } from "../../services/firebase/firebase";
import { signInWithGoogle } from "../../services/firebase/authService";

export default function Hero() {
  const navigate = useNavigate();

  const navigateAfterLogin = async (destination) => {
    try {
      if (!auth.currentUser) {
        await signInWithGoogle();
      }

      navigate(destination);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 text-white">
      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center gap-12 px-6 py-16 lg:flex-row">

        {/* Left */}
        <div className="flex-1">

          <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm text-blue-300">
            Robotics • AI • IoT • Embedded Systems
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-6xl">
            Build Robots.
            <br />
            Learn AI.
            <br />
            Create the Future.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Learn Robotics, Artificial Intelligence, Arduino,
            Raspberry Pi, Drone Technology and IoT through
            hands-on projects and industry-oriented certification.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <button
              onClick={() => navigateAfterLogin("/projects")}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold transition hover:bg-blue-700"
            >
              Start Learning
              <ArrowRight size={20} />
            </button>

            <button
              onClick={() => navigateAfterLogin("/courses")}
              className="flex items-center gap-2 rounded-xl border border-white px-6 py-4 transition hover:bg-white hover:text-slate-900"
            >
              <PlayCircle size={20} />
              Explore Courses
            </button>

          </div>

        </div>

        {/* Right */}
        <div className="flex flex-1 justify-center">
          <img
            src="/images/instructor.png"
            alt="Instructor"
            className="max-h-[650px] w-auto drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}
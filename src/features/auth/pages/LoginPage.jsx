import { Bot, GraduationCap, Rocket } from "lucide-react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function getSafeRedirect(value) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
}

export default function LoginPage() {
  const { user, loading, loginWithGoogle } = useAuth();
  const [searchParams] = useSearchParams();
  const redirectPath = getSafeRedirect(searchParams.get("redirect"));

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <h2 className="text-xl font-semibold text-slate-700">
          Loading...
        </h2>
      </div>
    );
  }

  if (user) {
    if (
      user.email === "beraarnab@gmail.com" ||
      user.email === "sona2desai@gmail.com"
    ) {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to={redirectPath} replace />;
  }

  async function handleLogin() {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Google sign-in failed:", error);
      alert(error.message || "Unable to sign in with Google. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-5 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto grid w-full max-w-6xl gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <section className="rounded-3xl bg-white p-7 text-center shadow-2xl sm:p-10">
          <Link to="/" className="text-3xl font-bold text-blue-600 sm:text-4xl">
            NextGenRoboticX
          </Link>

          <h1 className="mt-7 text-2xl font-bold text-slate-900 sm:text-3xl">
            Sign in to continue learning
          </h1>

          <p className="mt-3 text-slate-600">
            Use your Google account to access course details, learning materials,
            projects and certification progress.
          </p>

          <div className="mt-8 space-y-4 rounded-2xl bg-slate-50 p-5 text-left sm:p-6">
            <div className="flex items-center gap-3">
              <Bot className="shrink-0 text-blue-600" />
              <span>Learn Robotics and Embedded Systems</span>
            </div>

            <div className="flex items-center gap-3">
              <Rocket className="shrink-0 text-blue-600" />
              <span>Build AI, IoT and Drone Projects</span>
            </div>

            <div className="flex items-center gap-3">
              <GraduationCap className="shrink-0 text-blue-600" />
              <span>Track Learning and Certification</span>
            </div>
          </div>

          <details
            open
            className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 text-left lg:hidden"
          >
            <summary className="cursor-pointer px-5 py-4 font-bold text-slate-900">
              Terms &amp; Disclaimer
            </summary>

            <div className="space-y-5 border-t border-slate-200 px-5 py-5 text-sm leading-6 text-slate-600">
              <article>
                <h2 className="font-bold text-slate-900">
                  1. Independent Entity Disclaimer
                </h2>
                <p className="mt-1">
                  NextGenRoboticX is an independent, private educational portal.
                  We are not affiliated with, endorsed by, accredited by, or
                  connected to any government agency, university, or official
                  educational board.
                </p>
              </article>

              <article>
                <h2 className="font-bold text-slate-900">
                  2. Free Course Access
                </h2>
                <p className="mt-1">
                  Accessing and studying course content is 100% free. There are
                  no hidden fees or mandatory charges for learning materials.
                </p>
              </article>

              <article>
                <h2 className="font-bold text-slate-900">
                  3. Optional Certification &amp; Fees
                </h2>
                <p className="mt-1">
                  Certification is optional. The ₹499 fee covers administrative
                  costs, downloadable course PDFs, practice mock tests and a
                  digital Certificate of Completion.
                </p>
                <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-950">
                  <strong>Important Notice:</strong> The NextGenRoboticX
                  certificate is an appreciation/completion document for
                  personal learning only. It is not an accredited degree,
                  official diploma, professional licence or government
                  qualification.
                </p>
              </article>
            </div>
          </details>

          <button
            onClick={handleLogin}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-4 text-lg font-semibold text-slate-700 shadow-sm transition hover:border-blue-500 hover:bg-blue-50"
          >
            <svg viewBox="0 0 48 48" className="h-6 w-6" aria-hidden="true">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5Z" />
              <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z" />
              <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.3 35.2 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.6 5.1C9.6 39.5 16.2 44 24 44Z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.6-6.2 7.2l6.2 5.2C39.1 37.3 44 31.2 44 24c0-1.3-.1-2.4-.4-3.5Z" />
            </svg>
            Continue with Google
          </button>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            By continuing, you acknowledge the Terms &amp; Disclaimer displayed
            on this page.
          </p>

          <Link
            to="/#courses"
            className="mt-5 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Return to courses
          </Link>

          <p className="mt-7 text-sm text-slate-500">
            Learn • Build • Certify • Work
          </p>
        </section>

        <section
          aria-labelledby="terms-heading"
          className="hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl sm:p-10 lg:block"
        >
          <h2
            id="terms-heading"
            className="text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            Terms &amp; Disclaimer
          </h2>

          <div className="mt-7 space-y-7 text-sm leading-7 text-slate-600 sm:text-base">
            <article>
              <h3 className="font-bold text-slate-900">
                1. Independent Entity Disclaimer
              </h3>
              <p className="mt-2">
                NextGenRoboticX is an independent, private educational portal.
                We are not affiliated with, endorsed by, accredited by, or
                connected to any government agency, university, or official
                educational board.
              </p>
            </article>

            <article>
              <h3 className="font-bold text-slate-900">
                2. Free Course Access
              </h3>
              <p className="mt-2">
                Accessing and studying course content on this platform is 100%
                free. There are no hidden fees or mandatory charges required to
                access the learning materials.
              </p>
            </article>

            <article>
              <h3 className="font-bold text-slate-900">
                3. Optional Certification &amp; Fees
              </h3>
              <p className="mt-2">
                Obtaining a certificate is completely optional. The ₹499 fee
                solely covers administrative costs, access to downloadable
                course PDFs, practice mock tests, and a digital Certificate of
                Completion.
              </p>

              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
                <strong>Important Notice:</strong> The certificate issued by
                NextGenRoboticX is an appreciation/completion document for
                personal learning only. It does not constitute an accredited
                academic degree, official diploma, professional licence, or
                government qualification.
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

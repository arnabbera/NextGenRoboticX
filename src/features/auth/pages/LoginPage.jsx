import {
  Bot,
  CheckCircle2,
  GraduationCap,
  Headphones,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import courses from "../../courses/data/courses";
import { trackEvent } from "../../../services/analytics";
import BrandLogo from "../../../components/BrandLogo";

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
  const courseRedirect = redirectPath.startsWith("/courses/");
  const redirectedCourseId = redirectPath.match(/^\/courses\/([^/]+)/)?.[1];
  const redirectedCourse = courses.find((course) => course.id === redirectedCourseId);
  const enrollmentPrice = redirectedCourse?.price ?? 99;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <h2 className="text-xl font-semibold text-slate-700">Loading...</h2>
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
      trackEvent("google_login_complete", { courseId: redirectedCourseId });
    } catch (error) {
      console.error("Google sign-in failed:", error);
      alert(error.message || "Unable to sign in with Google. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-5 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto grid w-full max-w-6xl gap-7 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <section className="rounded-3xl bg-white p-7 text-center shadow-2xl sm:p-10">
          <BrandLogo className="w-60 sm:w-80" />

          <span className="mt-7 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
            Secure learner access
          </span>

          <h1 className="mt-5 text-3xl font-black text-slate-900 sm:text-4xl">
            {courseRedirect ? "Access your course and start learning" : "Welcome to your learning portal"}
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            {courseRedirect
              ? `Continue with the Google email used for your ₹${enrollmentPrice} enrollment. You will return directly to ${redirectedCourse?.title || "the selected course"}.`
              : "Sign in to manage your courses, continue lessons, track assessments and access earned certificates."}
          </p>

          <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            <Benefit icon={Bot} text="Practical robotics and embedded-systems lessons" />
            <Benefit icon={Rocket} text="Hands-on AI, IoT and engineering projects" />
            <Benefit icon={GraduationCap} text="Progress, assessments and certificates in one place" />
            <Benefit icon={ShieldCheck} text="Secure access linked to your verified email" />
          </div>

          <button
            onClick={handleLogin}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-blue-200 bg-blue-600 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
          >
            <svg viewBox="0 0 48 48" className="h-6 w-6 rounded-full bg-white p-0.5" aria-hidden="true">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5Z" />
              <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z" />
              <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.3 35.2 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.6 5.1C9.6 39.5 16.2 44 24 44Z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.6-6.2 7.2l6.2 5.2C39.1 37.3 44 31.2 44 24c0-1.3-.1-2.4-.4-3.5Z" />
            </svg>
            Continue Securely with Google
          </button>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Google sign-in protects your course ownership and lets you return on any device.
            Your payment details are handled securely by Razorpay.
          </p>

          <details className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 text-left">
            <summary className="cursor-pointer px-5 py-4 font-bold text-slate-800">
              View Terms, certificate status and important disclosures
            </summary>
            <LegalDisclosures />
          </details>

          <Link
            to="/courses"
            className="mt-6 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Return to public course catalogue
          </Link>
        </section>

        <aside className="rounded-3xl border border-blue-800/50 bg-white/10 p-7 text-white shadow-2xl backdrop-blur sm:p-10">
          <ShieldCheck className="text-emerald-300" size={46} />
          <h2 className="mt-5 text-3xl font-black">Your learning access is protected</h2>
          <p className="mt-4 leading-7 text-blue-100">
            Sign-in connects your verified enrollment, course progress, assessment results and certificates to one account.
          </p>

          <div className="mt-7 space-y-4">
            <TrustItem title="One-time course access" text="Pay the displayed fee once and return to your course using the same verified email." />
            <TrustItem title="Clear certificate pathway" text="Complete the lessons and score at least 80% in the final assessment to generate your completion certificate." />
            <TrustItem title="Secure Razorpay checkout" text="NextGenRoboticX does not collect or store your card, UPI or banking credentials." />
            <TrustItem title="Help when you need it" text="Course and enrollment support is available through the contact options on NextGenRoboticX." icon={Headphones} />
          </div>

          <div className="mt-8 rounded-2xl border border-emerald-300/25 bg-emerald-400/10 p-5">
            <p className="font-bold text-emerald-200">What happens next?</p>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-blue-50">
              <li>1. Choose your verified Google account.</li>
              <li>2. Return automatically to the selected course.</li>
              <li>3. Start or continue learning immediately when access is active.</li>
            </ol>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Benefit({ icon: Icon, text }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
      <Icon className="mt-0.5 shrink-0 text-blue-600" size={21} />
      <span className="text-sm font-semibold leading-6 text-slate-700">{text}</span>
    </div>
  );
}

function TrustItem({ title, text, icon: Icon = CheckCircle2 }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-1 shrink-0 text-emerald-300" size={21} />
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-blue-100">{text}</p>
      </div>
    </div>
  );
}

function LegalDisclosures() {
  return (
    <div className="space-y-5 border-t border-slate-200 px-5 py-5 text-sm leading-6 text-slate-600">
      <article>
        <h2 className="font-bold text-slate-900">Independent educational portal</h2>
        <p className="mt-1">
          NextGenRoboticX is an independent private educational portal. It is not affiliated with,
          endorsed by, accredited by or connected to a government agency, university or official educational board.
        </p>
      </article>

      <article>
        <h2 className="font-bold text-slate-900">Course access and secure payment</h2>
        <p className="mt-1">
          Each available course requires the one-time enrollment fee shown on its course page.
          Access is activated after successful Razorpay payment verification and is linked to the verified email used for enrollment.
        </p>
      </article>

      <article>
        <h2 className="font-bold text-slate-900">Assessment and certificate</h2>
        <p className="mt-1">
          Enrollment includes the selected course materials and the tests offered with that course.
          Learners who satisfy the published passing requirements can generate a NextGenRoboticX completion certificate.
        </p>
        <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-950">
          The certificate records completion of independent learning on NextGenRoboticX. It is not an accredited degree,
          official diploma, professional licence or government qualification.
        </p>
      </article>
    </div>
  );
}

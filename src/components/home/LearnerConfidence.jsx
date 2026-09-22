import {
  Award,
  BookOpenCheck,
  CheckCircle2,
  Headphones,
  MessageCircle,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const REASONS = [
  {
    icon: Wrench,
    title: "Learn by building",
    text: "Lessons connect concepts to circuits, code, testing and complete project workflows—not isolated theory.",
  },
  {
    icon: BookOpenCheck,
    title: "A visible learning path",
    text: "Review the curriculum before paying, then progress through chapters, quizzes, mock tests and the final assessment.",
  },
  {
    icon: ShieldCheck,
    title: "Clear completion standard",
    text: "Certificate eligibility is tied to the published assessment and passing requirements, not simply to payment.",
  },
];

export default function LearnerConfidence() {
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="learner-confidence-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="text-center">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
            Know what you receive
          </span>
          <h2 id="learner-confidence-title" className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl">
            Practical learning, a clear certificate path, and real assistance
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            NextGenRoboticX is designed for learners who want to understand how systems work,
            build them step by step, and demonstrate completion through assessment.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <Icon className="text-blue-700" size={30} />
              <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-6 text-white shadow-xl sm:p-9">
            <div className="flex items-center gap-3">
              <Award className="text-amber-300" size={32} />
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200">Certificate preview</p>
                <h3 className="text-2xl font-bold">See what successful completion earns</h3>
              </div>
            </div>

            <div className="relative mt-7 overflow-hidden rounded-2xl border-[7px] border-double border-amber-300 bg-gradient-to-br from-white via-blue-50 to-amber-50 p-6 text-center text-slate-900 shadow-2xl sm:p-8">
              <div className="pointer-events-none absolute inset-0 flex -rotate-12 items-center justify-center text-6xl font-black text-slate-900/5 sm:text-7xl">
                SAMPLE
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-800">NextGenRoboticX</p>
              <Award className="mx-auto mt-4 text-amber-500" size={42} />
              <p className="mt-3 font-serif text-3xl font-bold">Certificate of Completion</p>
              <p className="mt-5 text-sm text-slate-600">Presented to</p>
              <p className="mx-auto mt-2 max-w-sm border-b border-slate-400 pb-2 font-serif text-2xl font-bold text-blue-900">
                Sample Learner
              </p>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-slate-700">
                for completing the selected course and meeting its published assessment requirement.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-left text-xs text-slate-600">
                <div><strong className="text-slate-900">Course</strong><br />Selected course title</div>
                <div><strong className="text-slate-900">Certificate ID</strong><br />Unique completion ID</div>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-blue-100">
              The final certificate is personalized with the learner name, course, score,
              issue date and certificate ID. It is a private course-completion certificate,
              not an accredited degree, diploma or professional licence.
            </p>
          </div>

          <div className="flex flex-col rounded-3xl border border-blue-200 bg-blue-50 p-7 sm:p-9">
            <Headphones className="text-blue-700" size={38} />
            <h3 className="mt-5 text-3xl font-bold text-slate-900">Stuck on a lesson or project?</h3>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              Assistance is available for course-access questions and learning difficulties.
              Share the course name, chapter, error message, code or a clear photo of the circuit
              so the problem can be understood efficiently.
            </p>

            <ul className="mt-6 space-y-3 text-slate-700">
              {[
                "Clarification on lessons and assessment requirements",
                "Guidance for debugging code, wiring and project steps",
                "Help with enrollment, payment confirmation and course access",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 shrink-0 text-emerald-600" size={19} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <a
                href="https://wa.me/919830068336?text=Hello%20NextGenRoboticX%2C%20I%20need%20help%20with%20a%20course."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700"
              >
                <MessageCircle size={20} /> Ask on WhatsApp
              </a>
              <a
                href="mailto:info@nextgenroboticx.com?subject=Course%20assistance"
                className="inline-flex items-center gap-2 rounded-xl border border-blue-300 bg-white px-5 py-3 font-bold text-blue-800 transition hover:bg-blue-100"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

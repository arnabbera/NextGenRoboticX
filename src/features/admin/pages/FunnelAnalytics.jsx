import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleDollarSign,
  CreditCard,
  LoaderCircle,
  LogIn,
  MousePointerClick,
  TrendingDown,
  Users,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import coursesData from "../../courses/data/courses";

const FUNNEL = [
  { key: "homepage_view", label: "Homepage visitors", icon: Users, color: "bg-blue-600" },
  { key: "course_page_view", label: "Course-page visitors", icon: Users, color: "bg-indigo-600" },
  { key: "enrollment_click", label: "Enrollment clicks", icon: MousePointerClick, color: "bg-violet-600" },
  { key: "razorpay_open", label: "Razorpay checkouts opened", icon: CreditCard, color: "bg-amber-500" },
  { key: "payment_success", label: "Payments successful", icon: CheckCircle2, color: "bg-emerald-600" },
  { key: "google_login_complete", label: "Google logins completed", icon: LogIn, color: "bg-cyan-600" },
  { key: "payment_failure", label: "Payments failed/cancelled", icon: TrendingDown, color: "bg-red-500" },
];

const count = (events, key) => Number(events?.[key] || 0);
const percent = (part, whole) => (whole > 0 ? `${((part / whole) * 100).toFixed(1)}%` : "—");

export default function FunnelAnalytics() {
  const { user } = useAuth();
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setData(null);
    setError("");
    user.getIdToken()
      .then((token) => fetch(`/api/admin/analytics?days=${days}`, {
        headers: { Authorization: `Bearer ${token}` },
      }))
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error || "Unable to load analytics.");
        return body;
      })
      .then((body) => {
        if (!cancelled) setData(body);
      })
      .catch((loadError) => {
        if (!cancelled) setError(loadError.message);
      });
    return () => {
      cancelled = true;
    };
  }, [days, user]);

  const courseRows = useMemo(() => coursesData
    .filter((course) => course.status === "Available")
    .map((course) => ({
      ...course,
      events: data?.courses?.[course.id] || {},
    })), [data]);

  if (error) {
    return <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>;
  }

  if (!data) {
    return <div className="flex items-center gap-3 rounded-2xl bg-white p-8 text-slate-600 shadow"><LoaderCircle className="animate-spin" /> Loading enrollment analytics...</div>;
  }

  const starts = count(data.totals, "course_page_view");
  const successes = count(data.totals, "payment_success");

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">Admin only</span>
          <h1 className="mt-5 text-3xl font-black text-slate-900">Enrollment Funnel Analytics</h1>
          <p className="mt-2 max-w-3xl leading-7 text-slate-600">
            Privacy-safe first-party counts show whether the constraint is traffic, course interest,
            checkout abandonment or payment failure. Repeat actions from the same browser session are counted once per day.
          </p>
        </div>
        <label className="font-semibold text-slate-700">
          Reporting period
          <select value={days} onChange={(event) => setDays(Number(event.target.value))} className="ml-3 rounded-xl border border-slate-300 bg-white px-4 py-2">
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {FUNNEL.map(({ key, label, icon: Icon, color }) => (
          <div key={key} className="rounded-3xl bg-white p-6 shadow">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${color}`}><Icon size={22} /></div>
            <p className="mt-5 text-sm font-bold uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-1 text-4xl font-black text-slate-900">{count(data.totals, key)}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <section className="overflow-hidden rounded-3xl bg-white shadow">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900">Overall funnel</h2>
            <p className="mt-1 text-slate-600">Each stage is compared with the stage immediately above it.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead className="bg-slate-50 text-sm uppercase tracking-wide text-slate-500">
                <tr><th className="px-6 py-4">Stage</th><th className="px-6 py-4">Count</th><th className="px-6 py-4">From previous stage</th></tr>
              </thead>
              <tbody>
                {FUNNEL.slice(0, 6).map((stage, index) => {
                  const value = count(data.totals, stage.key);
                  const previous = index ? count(data.totals, FUNNEL[index - 1].key) : 0;
                  return (
                    <tr key={stage.key} className="border-t border-slate-100">
                      <td className="px-6 py-4 font-semibold text-slate-800">{stage.label}</td>
                      <td className="px-6 py-4 text-2xl font-black text-slate-900">{value}</td>
                      <td className="px-6 py-4 font-bold text-blue-700">{index ? percent(value, previous) : "Starting point"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-800 p-7 text-white shadow">
          <CircleDollarSign size={40} className="text-amber-300" />
          <h2 className="mt-5 text-2xl font-bold">Course-page to payment</h2>
          <p className="mt-3 text-5xl font-black">{percent(successes, starts)}</p>
          <p className="mt-4 leading-7 text-blue-100">
            {starts === 0
              ? "No measured course traffic yet. Promote the course links before judging checkout performance."
              : successes === 0
                ? "Traffic is reaching course pages, but no verified payment has completed in this period. Inspect the stage-by-stage drop-off."
                : `${successes} verified payment${successes === 1 ? "" : "s"} from ${starts} measured course-page visitor${starts === 1 ? "" : "s"}.`}
          </p>
        </aside>
      </div>

      <section className="overflow-hidden rounded-3xl bg-white shadow">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-2xl font-bold text-slate-900">Performance by course</h2>
          <p className="mt-1 text-slate-600">Compare interest and checkout movement for each available course.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Course</th><th className="px-5 py-4">Views</th><th className="px-5 py-4">Clicks</th>
                <th className="px-5 py-4">Logins</th><th className="px-5 py-4">Checkout</th><th className="px-5 py-4">Paid</th><th className="px-5 py-4">View → paid</th>
              </tr>
            </thead>
            <tbody>
              {courseRows.map((course) => (
                <tr key={course.id} className="border-t border-slate-100">
                  <td className="px-5 py-4 font-bold text-slate-900">{course.title}</td>
                  <td className="px-5 py-4">{count(course.events, "course_page_view")}</td>
                  <td className="px-5 py-4">{count(course.events, "enrollment_click")}</td>
                  <td className="px-5 py-4">{count(course.events, "google_login_complete")}</td>
                  <td className="px-5 py-4">{count(course.events, "razorpay_open")}</td>
                  <td className="px-5 py-4 font-bold text-emerald-700">{count(course.events, "payment_success")}</td>
                  <td className="px-5 py-4 font-bold text-blue-700">{percent(count(course.events, "payment_success"), count(course.events, "course_page_view"))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl bg-white shadow">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-2xl font-bold text-slate-900">Traffic sources</h2>
          <p className="mt-1 text-slate-600">Based on UTM source tags or the referring website hostname.</p>
        </div>
        <div className="grid gap-3 p-6 md:grid-cols-2 xl:grid-cols-3">
          {Object.keys(data.sources || {}).length ? Object.entries(data.sources)
            .sort(([, left], [, right]) => count(right, "homepage_view") - count(left, "homepage_view"))
            .map(([source, events]) => (
              <div key={source} className="rounded-2xl border border-slate-200 p-4">
                <p className="font-bold text-slate-900">{source}</p>
                <p className="mt-2 text-sm text-slate-600">Homepage: {count(events, "homepage_view")} · Course pages: {count(events, "course_page_view")}</p>
              </div>
            )) : <p className="text-slate-500">Traffic-source data will appear after new visitors arrive.</p>}
        </div>
      </section>
    </div>
  );
}

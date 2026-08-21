import { useEffect, useState } from "react";
import {
  collection,
  count,
  getAggregateFromServer,
  sum,
} from "firebase/firestore";
import { db } from "../../services/firebase/firebase";

const initialStats = {
  students: 0,
  courses: 0,
  projects: 0,
  certificates: 0,
};

export default function Stats() {
  const [values, setValues] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadStats() {
      try {
        const [userSnapshot, courseSnapshot] = await Promise.all([
          getAggregateFromServer(collection(db, "users"), {
            students: count(),
            projects: sum("totalProjects"),
            certificates: sum("totalCertificates"),
          }),
          getAggregateFromServer(collection(db, "courses"), {
            courses: count(),
          }),
        ]);

        if (!active) return;
        const users = userSnapshot.data();
        const courseData = courseSnapshot.data();

        setValues({
          students: Number(users.students || 0),
          courses: Number(courseData.courses || 0),
          projects: Number(users.projects || 0),
          certificates: Number(users.certificates || 0),
        });
      } catch (error) {
        console.error("Unable to load platform statistics:", error);
        if (active) setUnavailable(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadStats();
    return () => {
      active = false;
    };
  }, []);

  const stats = [
    { number: values.students, label: "Registered Students" },
    { number: values.projects, label: "Projects Completed" },
    { number: values.courses, label: "Database Courses" },
    { number: values.certificates, label: "Certificates Awarded" },
  ];

  return (
    <section className="bg-white py-20" aria-labelledby="platform-stats-title">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 id="platform-stats-title" className="text-4xl font-bold text-slate-800">
            Empowering Future Innovators
          </h2>
          <p className="mt-4 text-slate-600">
            Live learning activity recorded by the NextGenRoboticX platform.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-3xl bg-slate-50 p-8 text-center shadow transition-shadow hover:shadow-xl">
              <div className="text-5xl font-bold text-blue-600" aria-busy={loading}>
                {loading ? (
                  <span className="mx-auto block h-12 w-20 animate-pulse rounded-lg bg-slate-200" />
                ) : unavailable ? (
                  <span title="Statistics are temporarily unavailable">—</span>
                ) : (
                  item.number.toLocaleString("en-IN")
                )}
              </div>
              <p className="mt-3 text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>

        {unavailable && (
          <p className="mt-6 text-center text-sm text-slate-500">
            Live statistics are temporarily unavailable. No estimated figures are being displayed.
          </p>
        )}
      </div>
    </section>
  );
}

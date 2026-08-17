import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const ADMIN_EMAILS = new Set([
  "beraarnab@gmail.com",
  "sona2desai@gmail.com",
]);

export default function ProjectPassRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [access, setAccess] = useState({ loading: true, active: false, error: "" });

  useEffect(() => {
    let cancelled = false;

    async function checkAccess() {
      if (!user) {
        setAccess({ loading: false, active: false, error: "" });
        return;
      }

      if (ADMIN_EMAILS.has(user.email)) {
        setAccess({ loading: false, active: true, error: "" });
        return;
      }

      try {
        const token = await user.getIdToken();
        const response = await fetch("/api/project-pass/status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to verify project access.");
        }

        if (!cancelled) {
          setAccess({ loading: false, active: data.active === true, error: "" });
        }
      } catch (error) {
        if (!cancelled) {
          setAccess({
            loading: false,
            active: false,
            error: error.message || "Unable to verify project access.",
          });
        }
      }
    }

    checkAccess();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading || access.loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="mt-4 text-slate-600">Checking project access...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  if (access.error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
        <section className="max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl">
          <h1 className="text-2xl font-bold text-slate-900">Access check unavailable</h1>
          <p className="mt-4 text-slate-600">{access.error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
          >
            Try again
          </button>
        </section>
      </main>
    );
  }

  if (!access.active) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/projects-pass?redirect=${redirect}`} replace />;
  }

  return <Outlet />;
}

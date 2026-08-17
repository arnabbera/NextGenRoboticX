import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const PROJECTS = [
  "Obstacle Avoiding Robot",
  "Line Following Robot",
  "IoT Smart Monitoring",
  "Smart Home Automation",
  "Build Your First Arduino Drone",
  "AI Face Recognition Robot",
  "Humanoid Robot",
  "Robotic Arm Automation",
  "Smart Agriculture",
];

function safeRedirect(value) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/#projects";
  }
  return value;
}

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function ProjectsPassPage() {
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectPath = useMemo(
    () => safeRedirect(searchParams.get("redirect")),
    [searchParams]
  );
  const [status, setStatus] = useState({ loading: true, active: false });
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function checkStatus() {
      if (!user) {
        setStatus({ loading: false, active: false });
        return;
      }

      try {
        const token = await user.getIdToken();
        const response = await fetch("/api/project-pass/status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Unable to check access.");
        if (!cancelled) setStatus({ loading: false, active: data.active === true });
      } catch (error) {
        if (!cancelled) {
          setStatus({ loading: false, active: false });
          setMessage(error.message || "Unable to check access.");
        }
      }
    }

    checkStatus();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading || status.loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </main>
    );
  }

  if (!user) {
    const loginRedirect = encodeURIComponent(
      `/projects-pass?redirect=${encodeURIComponent(redirectPath)}`
    );
    return <Navigate to={`/login?redirect=${loginRedirect}`} replace />;
  }

  if (status.active) {
    return <Navigate to={redirectPath} replace />;
  }

  async function startPayment() {
    setPaying(true);
    setMessage("");

    try {
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Unable to load Razorpay Checkout.");

      const token = await user.getIdToken(true);
      const orderResponse = await fetch("/api/project-pass/order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: "all-nine-projects-lifetime" }),
      });
      const order = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(order.error || "Unable to create payment order.");
      }

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "NextGenRoboticX",
        description: "Lifetime access to all 9 project guides",
        order_id: order.orderId,
        prefill: {
          name: user.displayName || "",
          email: user.email || "",
        },
        notes: {
          product: "All 9 Projects Lifetime Pass",
        },
        theme: { color: "#2563eb" },
        modal: {
          ondismiss: () => {
            setPaying(false);
            setMessage("Payment window closed. No access charge was confirmed.");
          },
        },
        handler: async (payment) => {
          try {
            const latestToken = await user.getIdToken(true);
            const verifyResponse = await fetch("/api/project-pass/verify", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${latestToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payment),
            });
            const result = await verifyResponse.json();

            if (!verifyResponse.ok || !result.active) {
              throw new Error(result.error || "Payment verification failed.");
            }

            setStatus({ loading: false, active: true });
            setMessage("Payment verified. Your lifetime project access is active.");
            window.setTimeout(() => navigate(redirectPath, { replace: true }), 900);
          } catch (error) {
            setMessage(
              error.message ||
                "Payment was received but access verification is pending. Please contact support."
            );
          } finally {
            setPaying(false);
          }
        },
      });

      checkout.on("payment.failed", (response) => {
        setPaying(false);
        setMessage(
          response.error?.description ||
            "Payment failed. No project access was activated."
        );
      });

      checkout.open();
    } catch (error) {
      setPaying(false);
      setMessage(error.message || "Unable to start payment.");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-5 py-10 text-white sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <Link to="/#projects" className="inline-flex items-center gap-2 font-semibold text-blue-200">
          <ArrowLeft size={20} /> Back to projects
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section>
            <span className="rounded-full bg-blue-500/15 px-4 py-2 text-sm font-semibold text-blue-200">
              One-Time Project Pass
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-6xl">
              Unlock All 9 Projects
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Get lifetime access to every current NextGenRoboticX project guide,
              including components, connections, source code, build steps and
              troubleshooting.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {PROJECTS.map((project) => (
                <div key={project} className="flex items-start gap-3 rounded-xl bg-white/5 p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-400" size={20} />
                  <span>{project}</span>
                </div>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-3xl bg-white p-7 text-slate-900 shadow-2xl sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Lifetime access
            </p>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-6xl font-extrabold">₹99</span>
              <span className="pb-2 text-slate-500">one time</span>
            </div>

            <ul className="mt-7 space-y-4 text-slate-700">
              <li className="flex gap-3"><LockKeyhole className="shrink-0 text-blue-600" size={21} />Access linked to your Google account</li>
              <li className="flex gap-3"><ShieldCheck className="shrink-0 text-blue-600" size={21} />Payment verified securely by the server</li>
              <li className="flex gap-3"><CreditCard className="shrink-0 text-blue-600" size={21} />Razorpay Test Mode during integration</li>
            </ul>

            <button
              type="button"
              onClick={startPayment}
              disabled={paying}
              className="mt-8 w-full rounded-xl bg-blue-600 px-5 py-4 text-lg font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {paying ? "Preparing secure checkout..." : "Unlock All 9 Projects — ₹99"}
            </button>

            {message && (
              <p className="mt-4 rounded-xl bg-slate-100 p-4 text-sm leading-6 text-slate-700">
                {message}
              </p>
            )}

            <p className="mt-5 text-xs leading-5 text-slate-500">
              This pass covers the nine project guides listed here. Course
              certification and future paid products are not included. Test Mode
              does not collect real money.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

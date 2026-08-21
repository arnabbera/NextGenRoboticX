import { CheckCircle2, LoaderCircle, LockKeyhole } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CourseEnrollment({ course, onStatusChange }) {
  const { user } = useAuth();
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  const authHeaders = useCallback(async () => ({
    Authorization: `Bearer ${await user.getIdToken()}`,
    "Content-Type": "application/json",
  }), [user]);

  const checkStatus = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/course-access/${course.id}/status`, {
        headers: await authHeaders(),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to check enrollment.");
      setActive(data.active === true);
      onStatusChange?.(data.active === true);
    } catch (statusError) {
      setError(statusError.message);
      setActive(false);
      onStatusChange?.(false);
    } finally {
      setLoading(false);
    }
  }, [authHeaders, course.id, onStatusChange]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  async function enroll() {
    setPaying(true);
    setError("");
    try {
      const ready = await loadRazorpay();
      if (!ready) throw new Error("Unable to load Razorpay checkout.");

      const orderResponse = await fetch("/api/course-access/order", {
        method: "POST",
        headers: await authHeaders(),
        body: JSON.stringify({ courseId: course.id }),
      });
      const order = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(order.error || "Unable to create payment order.");

      await new Promise((resolve, reject) => {
        const checkout = new window.Razorpay({
          key: order.keyId,
          amount: order.amount,
          currency: order.currency,
          order_id: order.orderId,
          name: "NextGenRoboticX",
          description: `${course.title} course access`,
          prefill: {
            name: user.displayName || "",
            email: user.email || "",
          },
          notes: { course_id: course.id },
          theme: { color: "#2563eb" },
          handler: async (payment) => {
            try {
              const verifyResponse = await fetch("/api/course-access/verify", {
                method: "POST",
                headers: await authHeaders(),
                body: JSON.stringify({ ...payment, courseId: course.id }),
              });
              const result = await verifyResponse.json();
              if (!verifyResponse.ok) throw new Error(result.error || "Payment verification failed.");
              resolve(result);
            } catch (verifyError) {
              reject(verifyError);
            }
          },
          modal: {
            ondismiss: () => reject(new Error("Payment was cancelled.")),
          },
        });
        checkout.on("payment.failed", (event) => {
          reject(new Error(event.error?.description || "Payment failed."));
        });
        checkout.open();
      });

      setActive(true);
      onStatusChange?.(true);
    } catch (paymentError) {
      setError(paymentError.message);
    } finally {
      setPaying(false);
    }
  }

  if (loading) {
    return <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-3 text-white"><LoaderCircle className="animate-spin" size={19} /> Checking enrollment...</div>;
  }

  if (course.status === "Coming Soon") {
    return <div className="mt-8 inline-flex rounded-xl bg-white/15 px-5 py-3 font-semibold text-white">Enrollment will open when this course becomes available.</div>;
  }

  if (active) {
    return <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white"><CheckCircle2 size={20} /> Course enrolled for {user.email}</div>;
  }

  return (
    <div className="mt-8 max-w-xl rounded-2xl border border-white/20 bg-slate-950/25 p-5 text-white">
      <div className="flex items-center gap-3"><LockKeyhole /><strong className="text-xl">Enroll to unlock this course</strong></div>
      <p className="mt-3 text-blue-100">Pay ₹99 once. Access is linked permanently to your signed-in Gmail account: <strong>{user.email}</strong>.</p>
      <button type="button" disabled={paying} onClick={enroll} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 hover:bg-amber-300 disabled:opacity-60">
        {paying && <LoaderCircle className="animate-spin" size={18} />}
        {paying ? "Processing..." : "Pay ₹99 & Enroll"}
      </button>
      {error && <p className="mt-3 rounded-lg bg-red-950/50 p-3 text-sm text-red-100">{error}</p>}
    </div>
  );
}

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ADMIN_EMAILS = new Set([
  "beraarnab@gmail.com",
  "sona2desai@gmail.com",
]);

export function isAdministrator(user, profile) {
  return (
    profile?.role === "admin" ||
    ADMIN_EMAILS.has(String(user?.email || "").trim().toLowerCase())
  );
}

export default function AdminRoute({ children }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!isAdministrator(user, profile)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

import { Bot, Rocket, GraduationCap } from "lucide-react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {
  const {
    user,
    loading,
    loginWithGoogle,
  } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

if (user) {
  if (user.email === "beraarnab@gmail.com") {
    return <Navigate to="/admin" replace />;
  }

  if (user.email === "sona2desai@gmail.com") {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}

  async function handleLogin() {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center">

        <h1 className="text-5xl font-bold text-blue-600">
          NextGenRoboticX
        </h1>

        <p className="mt-4 text-gray-600">
          Empowering the Next Generation of Innovators
        </p>

        <div className="mt-10 space-y-5 text-left">

          <div className="flex items-center gap-3">
            <Bot className="text-blue-600" />
            <span>Learn Robotics</span>
          </div>

          <div className="flex items-center gap-3">
            <Rocket className="text-blue-600" />
            <span>Build AI Projects</span>
          </div>

          <div className="flex items-center gap-3">
            <GraduationCap className="text-blue-600" />
            <span>Professional Certification</span>
          </div>

        </div>

        <button
          onClick={handleLogin}
          className="mt-10 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
        >
          Continue with Google
        </button>

        <p className="mt-8 text-sm text-gray-500">
          Learn • Build • Certify • Work
        </p>

      </div>

    </div>
  );
}
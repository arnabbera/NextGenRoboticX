import { Bot, Rocket, GraduationCap } from "lucide-react";
import { Navigate } from "react-router-dom";

import { loginWithGoogle } from "../services/authService";
import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {
  const { user } = useAuth();

  // Automatically redirect if already authenticated
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      // Don't navigate here.
      // AuthContext will update automatically.
    } catch (error) {
      // Ignore this common error if the popup was simply interrupted
      if (error.code !== "auth/cancelled-popup-request") {
        console.error(error);
        alert(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center">

        <h1 className="text-5xl font-bold text-blue-600">
          NextGenRoboticX
        </h1>

        <p className="text-gray-600 mt-4">
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
          className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition"
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
import { LogOut, User, Mail, Shield, GraduationCap } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { logout } from "../../auth/services/authService";

export default function Dashboard() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              NextGenRoboticX
            </h1>

            <p className="text-gray-500">
              Mission Control Dashboard
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto p-6">

        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="flex flex-col md:flex-row items-center gap-8">

            {/* Profile Photo */}
            <div>
              <img
                src={
                  user?.photoURL ||
                  "https://placehold.co/120x120?text=User"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-600"
              />
            </div>

            {/* User Details */}
            <div className="flex-1">

              <h2 className="text-3xl font-bold">
                Welcome,
                <span className="text-blue-600">
                  {" "}
                  {user?.displayName}
                </span>
              </h2>

              <p className="text-gray-500 mt-2">
                You are successfully authenticated using Firebase Google Login.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">
                  <User className="text-blue-600" />
                  <span>{user?.displayName}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-blue-600" />
                  <span>{user?.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Shield className="text-blue-600" />
                  <span className="break-all">
                    {user?.uid}
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-2xl shadow-md p-6">
            <GraduationCap
              className="text-blue-600 mb-4"
              size={40}
            />

            <h3 className="text-xl font-semibold">
              Learning Programs
            </h3>

            <p className="text-gray-500 mt-2">
              Coming Soon
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <GraduationCap
              className="text-green-600 mb-4"
              size={40}
            />

            <h3 className="text-xl font-semibold">
              Projects
            </h3>

            <p className="text-gray-500 mt-2">
              Coming Soon
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <GraduationCap
              className="text-purple-600 mb-4"
              size={40}
            />

            <h3 className="text-xl font-semibold">
              Certifications
            </h3>

            <p className="text-gray-500 mt-2">
              Coming Soon
            </p>
          </div>

        </div>

      </main>

    </div>
  );
}
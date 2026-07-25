import { Bot, Rocket, GraduationCap } from "lucide-react";
import { loginWithGoogle } from "../services/authService";

export default function LoginPage() {
  const handleLogin = async () => {
    try {
      const user = await loginWithGoogle();

      console.log("User Logged In");
      console.log(user);

      alert(`Welcome ${user.displayName}`);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center">

        {/* Logo */}
        <h1 className="text-5xl font-bold text-blue-600">
          NextGenRoboticX
        </h1>

        {/* Tagline */}
        <p className="text-gray-600 mt-4">
          Empowering the Next Generation of Innovators
        </p>

        {/* Features */}
        <div className="mt-10 space-y-5 text-left">

          <div className="flex items-center gap-3">
            <Bot className="text-blue-600" size={24} />
            <span className="text-lg">Learn Robotics</span>
          </div>

          <div className="flex items-center gap-3">
            <Rocket className="text-blue-600" size={24} />
            <span className="text-lg">Build AI Projects</span>
          </div>

          <div className="flex items-center gap-3">
            <GraduationCap className="text-blue-600" size={24} />
            <span className="text-lg">Professional Certification</span>
          </div>

        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition duration-300"
        >
          Continue with Google
        </button>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-500">
          Learn • Build • Certify • Work
        </p>

      </div>
    </div>
  );
}
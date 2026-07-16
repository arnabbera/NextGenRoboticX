import { loginWithGoogle } from "../services/authService";

export default function Login() {
  const handleLogin = async () => {
    try {
      await loginWithGoogle();

      // Redirect to Student Dashboard
      window.location.href = "/student";
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-xl rounded-xl p-10 w-[420px] text-center">

        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          NextGenRoboticX
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Learn for Free.
          <br />
          Master New Skills.
          <br />
          Get Professionally Certified.
        </p>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Continue with Google
        </button>

      </div>
    </div>
  );
}
import { useAuth } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <div className="flex items-center gap-5">

            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-20 h-20 rounded-full"
            />

            <div>
              <h1 className="text-3xl font-bold">
                Welcome, {user.displayName} 👋
              </h1>

              <p className="text-gray-500">
                {user.email}
              </p>
            </div>

          </div>

          <div className="mt-10">

            <h2 className="text-2xl font-semibold">
              Learn for Free.
              Master New Skills.
              Get Professionally Certified.
            </h2>

          </div>

        </div>

      </div>
    </div>
  );
}
import { PlayCircle, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function ContinueLearning() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  // Temporary values until enrollment/progress services are built
  const currentCourse =
    profile?.dashboard?.currentCourse || "Robotics Foundation";

  const currentChapter =
    profile?.dashboard?.currentChapter || "Introduction to Robotics";

  const progress =
    profile?.dashboard?.progress ?? 0;

  const handleResume = () => {
    navigate("/courses/robotics-foundation/learn");
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow lg:col-span-2">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-slate-800">
          Continue Learning
        </h2>

        <TrendingUp className="text-blue-600" />

      </div>

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">

        <h3 className="text-2xl font-semibold text-slate-800">
          {currentCourse}
        </h3>

        <p className="mt-2 text-slate-600">
          Current Lesson : {currentChapter}
        </p>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-blue-100">

          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <div className="mt-3 flex justify-between text-sm text-slate-600">

          <span>
            Progress
          </span>

          <span>
            {progress}%
          </span>

        </div>

        <button
          onClick={handleResume}
          className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <PlayCircle size={20} />
          Resume Learning
        </button>

      </div>

    </div>
  );
}
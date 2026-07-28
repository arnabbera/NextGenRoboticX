export default function ProgressBar({ completed, total }) {
  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow">

      <div className="mb-3 flex items-center justify-between">

        <div>
          <h3 className="text-lg font-semibold">
            Learning Progress
          </h3>

          <p className="text-sm text-slate-500">
            {completed} of {total} lessons completed
          </p>
        </div>

        <div className="text-2xl font-bold text-blue-600">
          {percentage}%
        </div>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">

        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-700"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}
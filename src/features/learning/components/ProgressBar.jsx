export default function ProgressBar({
  completed = 0,
  total = 0,
}) {
  const percent =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (
    <div className="rounded-xl bg-white p-5 shadow">

      <div className="mb-3 flex justify-between">

        <span className="font-semibold">
          Course Progress
        </span>

        <span className="font-bold text-blue-600">
          {percent}%
        </span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">

        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

      <p className="mt-3 text-sm text-slate-600">

        {completed} of {total} chapters completed

      </p>

    </div>
  );
}
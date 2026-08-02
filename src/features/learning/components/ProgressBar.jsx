export default function ProgressBar({ progress }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <div className="mb-3 flex justify-between">

        <span className="font-semibold">
          Course Progress
        </span>

        <span className="font-bold text-blue-600">
          {progress}%
        </span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">

        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  );
}
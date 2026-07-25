import { TrendingUp } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-600",
  change = "",
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            {value}
          </h2>

          {change && (
            <div className="mt-3 flex items-center gap-2 text-sm text-emerald-600">
              <TrendingUp size={16} />
              <span>{change}</span>
            </div>
          )}
        </div>

        <div
          className={`${color} flex h-16 w-16 items-center justify-center rounded-2xl text-white`}
        >
          <Icon size={30} />
        </div>
      </div>
    </div>
  );
}
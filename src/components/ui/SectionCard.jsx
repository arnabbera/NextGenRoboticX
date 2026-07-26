export default function SectionCard({
  title,
  children,
}) {
  return (
    <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">
          {title}
        </h2>
      </div>

      {children}

    </div>
  );
}
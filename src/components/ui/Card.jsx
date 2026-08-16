import clsx from "clsx";

export default function Card({
  children,
  title,
  subtitle,
  footer,
  className = "",
  padding = "md",
  hover = false,
}) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={clsx(
        "rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200",
        hover && "hover:-translate-y-1 hover:shadow-lg",
        paddings[padding],
        className
      )}
    >
      {(title || subtitle) && (
        <div className="mb-6 border-b border-slate-100 pb-4">
          {title && (
            <h2 className="text-xl font-bold text-slate-900">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div>{children}</div>

      {footer && (
        <div className="mt-6 border-t border-slate-100 pt-4">
          {footer}
        </div>
      )}
    </div>
  );
}
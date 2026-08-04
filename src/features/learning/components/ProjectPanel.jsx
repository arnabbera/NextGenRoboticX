import { Rocket } from "lucide-react";

export default function ProjectPanel() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <div className="flex items-center gap-3">

        <Rocket
          className="text-blue-600"
          size={28}
        />

        <h2 className="text-2xl font-bold">
          Project
        </h2>

      </div>

      <div className="mt-6 rounded-xl border border-dashed p-10 text-center">

        <h3 className="text-xl font-semibold">
          Project Workspace
        </h3>

        <p className="mt-2 text-slate-500">
          Project instructions, GitHub submission and uploads will be available here.
        </p>

      </div>

    </div>
  );
}
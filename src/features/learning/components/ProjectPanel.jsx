import { Rocket } from "lucide-react";

export default function ProjectPanel() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
      <div className="flex items-center gap-3">
        <Rocket className="text-blue-600" size={28} aria-hidden="true" />
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Chapter Activity</h2>
          <p className="text-sm text-slate-500">Robot observation worksheet</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6">
        <h3 className="text-xl font-bold text-slate-900">
          Analyse one robot around you
        </h3>
        <p className="mt-2 leading-7 text-slate-700">
          Choose a familiar robot—for example a robotic vacuum, industrial arm,
          drone, line-following robot or automatic guided vehicle—and answer
          these questions in your notebook.
        </p>
        <ol className="mt-5 space-y-3 text-slate-700">
          <li><strong>1.</strong> What task is the robot designed to perform?</li>
          <li><strong>2.</strong> Which sensors might it use?</li>
          <li><strong>3.</strong> What controller processes its inputs?</li>
          <li><strong>4.</strong> Which actuators create its movement or action?</li>
          <li><strong>5.</strong> Is it autonomous, semi-autonomous or teleoperated?</li>
          <li><strong>6.</strong> Identify one benefit, one limitation and one safety consideration.</li>
        </ol>
      </div>
    </section>
  );
}

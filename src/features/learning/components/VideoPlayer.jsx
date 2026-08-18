import { PlayCircle } from "lucide-react";

export default function VideoPlayer() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center gap-3">
        <PlayCircle className="text-blue-600" size={28} aria-hidden="true" />
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Introduction to Robotics
          </h2>
          <p className="text-slate-500">Chapter 1 • Reading lesson and assessment</p>
        </div>
      </div>

      <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-8 text-center text-white">
        <div className="max-w-xl">
          <PlayCircle className="mx-auto text-blue-300" size={64} aria-hidden="true" />
          <h3 className="mt-5 text-2xl font-bold">Video lesson coming soon</h3>
          <p className="mt-3 leading-7 text-blue-100">
            Complete the structured chapter notes below and then take the
            10-question assessment. An official NextGenRoboticX video will be
            added here when available.
          </p>
        </div>
      </div>
    </section>
  );
}

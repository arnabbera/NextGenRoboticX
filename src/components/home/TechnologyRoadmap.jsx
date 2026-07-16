export default function TechnologyRoadmap() {
  const roadmap = [
    "Robotics Foundation",
    "Embedded Systems",
    "IoT & Smart Systems",
    "Drone Technology",
    "Artificial Intelligence",
    "Computer Vision",
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">

        <h2 className="text-center text-4xl font-bold text-slate-900">
          Your Learning Journey
        </h2>

        <p className="mt-4 text-center text-slate-600">
          Follow a structured path from beginner to advanced robotics and AI.
        </p>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">

          {roadmap.map((item, index) => (
            <div key={item} className="flex items-center">

              <div className="rounded-xl bg-blue-600 px-6 py-4 text-white font-semibold shadow-lg">
                {item}
              </div>

              {index < roadmap.length - 1 && (
                <span className="mx-4 text-3xl text-blue-600">→</span>
              )}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
export default function Hero() {
  return (
    <section className="min-h-screen bg-slate-100 flex flex-col justify-center items-center text-center px-6">

      <p className="uppercase tracking-widest text-blue-600 font-semibold">
        Robotics • AI • Innovation
      </p>

      <h1 className="mt-4 text-6xl font-extrabold text-slate-900">
        Learn Robotics &
        <br />
        Artificial Intelligence
      </h1>

      <p className="mt-8 max-w-3xl text-xl leading-8 text-slate-600">
        India's next-generation learning platform for Robotics,
        Embedded Systems, IoT, Drone Technology and Artificial Intelligence.
      </p>

      <div className="mt-10 flex gap-5">

        <button className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700">
          Start Free Learning
        </button>

        <button className="rounded-xl border border-slate-400 px-8 py-4 text-lg font-semibold hover:bg-slate-200">
          Explore Courses
        </button>

      </div>

      <div className="mt-16 grid grid-cols-3 gap-10 text-center">

        <div>
          <h2 className="text-4xl font-bold text-blue-600">500+</h2>
          <p className="text-slate-600">Projects</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-blue-600">20+</h2>
          <p className="text-slate-600">Technologies</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-blue-600">100%</h2>
          <p className="text-slate-600">Practical Learning</p>
        </div>

      </div>

    </section>
  );
}
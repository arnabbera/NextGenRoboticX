import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    number: 500,
    suffix: "+",
    label: "Students Trained",
  },
  {
    number: 25,
    suffix: "+",
    label: "Robotics Projects",
  },
  {
    number: 15,
    suffix: "+",
    label: "Courses",
  },
  {
    number: 95,
    suffix: "%",
    label: "Success Rate",
  },
];

export default function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-slate-800">
            Empowering Future Innovators
          </h2>

          <p className="mt-4 text-slate-600">
            Practical Robotics, AI, IoT and Embedded Systems training.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => (

            <div
              key={item.label}
              className="rounded-3xl bg-slate-50 p-8 text-center shadow hover:shadow-xl"
            >

              <div className="text-5xl font-bold text-blue-600">

                {inView && (
                  <CountUp
                    end={item.number}
                    duration={2}
                  />
                )}

                {item.suffix}

              </div>

              <p className="mt-3 text-slate-600">
                {item.label}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
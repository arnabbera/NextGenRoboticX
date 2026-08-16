import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import features from "../../features/marketing/data/features";

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-12 text-center sm:mb-16">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Why Choose Us
          </span>

          <h2 className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl">
            Why Learn with NextGenRoboticX?
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Learn Robotics, Artificial Intelligence, Embedded Systems, IoT and
            Drone Technology through practical projects, expert guidance and
            industry-oriented certification.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.slug}
              to={`/features/${feature.slug}`}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
              aria-label={`Learn more about ${feature.title}`}
            >
              <img
                src={feature.image}
                alt={`${feature.title} at NextGenRoboticX`}
                className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-slate-800">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600">
                  Explore this program
                  <ArrowRight
                    size={19}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

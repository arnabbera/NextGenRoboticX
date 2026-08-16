import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98300 68336",
    href: "tel:+919830068336",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@nextgenroboticx.com",
    href: "mailto:info@nextgenroboticx.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kolkata, West Bengal, India",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-slate-900 py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="rounded-full bg-blue-500/15 px-4 py-2 text-sm font-semibold text-blue-300">
            Contact Us
          </span>

          <h2 className="mt-6 text-4xl font-bold">
            Start Your Robotics Journey
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
            Contact NextGenRoboticX for robotics, artificial intelligence,
            Arduino, IoT, embedded systems, drone technology, courses and
            engineering project guidance.
          </p>

          <a
            href="https://wa.me/919830068336"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700"
          >
            <MessageCircle size={22} />
            Chat on WhatsApp
          </a>
        </div>

        <div className="grid gap-5">
          {contactItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <div className="rounded-xl bg-blue-600/20 p-3 text-blue-300">
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              </>
            );

            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-5 transition hover:border-blue-500"
              >
                {content}
              </a>
            ) : (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-5"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import {
  Check,
  Copy,
  Facebook,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
} from "lucide-react";

const whatsappUrl =
  "https://wa.me/919830068336?text=Hello%20NextGenRoboticX%2C%20I%20am%20interested%20in%20your%20robotics%20and%20technology%20courses.%20Please%20share%20the%20course%20details%2C%20fees%2C%20schedule%20and%20enrollment%20process.";

const shareUrl = "https://www.nextgenroboticx.com/#contact";
const shareTitle =
  "NextGenRoboticX — Robotics, AI, Arduino, IoT and Drone Technology Learning";
const encodedShareUrl = encodeURIComponent(shareUrl);
const encodedShareTitle = encodeURIComponent(shareTitle);

const shareLinks = [
  {
    label: "Facebook",
    icon: Facebook,
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`,
    className: "bg-[#1877F2] hover:bg-[#166FE5]",
  },
  {
    label: "X (Twitter)",
    icon: Share2,
    href: `https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedShareTitle}`,
    className: "bg-black hover:bg-slate-950",
  },
  {
    label: "WhatsApp",
    icon: MessageCircle,
    href: `https://wa.me/?text=${encodedShareTitle}%20${encodedShareUrl}`,
    className: "bg-green-600 hover:bg-green-700",
  },
];

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
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

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
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700"
          >
            <MessageCircle size={22} />
            Chat on WhatsApp
          </a>

          <div className="mt-10 border-t border-slate-700 pt-7">
            <h3 className="text-lg font-semibold text-white">
              Share NextGenRoboticX
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Help students discover robotics and technology learning.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {shareLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Share NextGenRoboticX on ${item.label}`}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${item.className}`}
                  >
                    <Icon size={19} aria-hidden="true" />
                    {item.label}
                  </a>
                );
              })}

              <button
                type="button"
                onClick={copyLink}
                aria-label="Copy NextGenRoboticX contact link"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:border-blue-400 hover:bg-slate-700"
              >
                {copied ? (
                  <Check size={19} aria-hidden="true" />
                ) : (
                  <Copy size={19} aria-hidden="true" />
                )}
                {copied ? "Link Copied" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          {contactItems.map((item) => {
            const Icon = item.icon;
            const itemContent = (
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
                {itemContent}
              </a>
            ) : (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-5"
              >
                {itemContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

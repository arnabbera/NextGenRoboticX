import { useState } from "react";
import { Check, Copy, Facebook, Instagram, Share2 } from "lucide-react";

export default function ProjectShare({ title, description }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => window.location.href.split("#")[0];
  const encodedUrl = () => encodeURIComponent(getUrl());
  const encodedText = () =>
    encodeURIComponent(description || `Learn how to build ${title} with NextGenRoboticX.`);

  const copyLink = async () => {
    await navigator.clipboard.writeText(getUrl());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const shareAnywhere = async () => {
    if (navigator.share) {
      await navigator.share({
        title,
        text: description,
        url: getUrl(),
      });
      return;
    }
    await copyLink();
  };

  const shareInstagram = async () => {
    if (navigator.share) {
      await shareAnywhere();
      return;
    }
    await copyLink();
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
  };

  const buttons = [
    {
      label: "Facebook",
      icon: Facebook,
      className: "bg-[#1877F2] hover:bg-[#1264cf]",
      href: () => `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl()}`,
    },
    {
      label: "X / Twitter",
      icon: () => <span className="text-lg font-bold">𝕏</span>,
      className: "bg-black hover:bg-slate-800",
      href: () => `https://twitter.com/intent/tweet?url=${encodedUrl()}&text=${encodedText()}`,
    },
  ];

  return (
    <section aria-labelledby="share-project-title" className="border-y border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
        <h2 id="share-project-title" className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Share this project
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Help other robotics learners discover this beginner-friendly guide.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {buttons.map(({ label, icon: Icon, className, href }) => (
            <a
              key={label}
              href={href()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share ${title} on ${label}`}
              className={`inline-flex min-h-12 items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition ${className}`}
            >
              <Icon size={20} />
              {label}
            </a>
          ))}

          <button
            type="button"
            onClick={shareInstagram}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 px-5 py-3 font-semibold text-white transition hover:opacity-90"
            aria-label={`Share ${title} using Instagram`}
          >
            <Instagram size={20} />
            Instagram
          </button>

          <button
            type="button"
            onClick={shareAnywhere}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Share2 size={20} />
            More apps
          </button>

          <button
            type="button"
            onClick={copyLink}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
            {copied ? "Link copied" : "Copy link"}
          </button>
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          Instagram does not provide direct web link sharing. On mobile, the Instagram button opens your device share menu; on desktop, it copies the project link before opening Instagram.
        </p>
      </div>
    </section>
  );
}

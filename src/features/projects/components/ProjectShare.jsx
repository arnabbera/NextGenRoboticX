import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.5 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.8 1.8-1.8H17V2.4c-.8-.1-1.7-.2-2.5-.2-2.6 0-4.4 1.6-4.4 4.6v2.7H7V13h3.1v9h3.4Z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export default function ProjectShare({ title, description, contentType = "project" }) {
  const [copied, setCopied] = useState(false);
  const isCourse = contentType === "course";
  const shareHeading = isCourse ? "Share this course" : "Share this project";
  const sharePrompt = isCourse
    ? "Help other learners discover this robotics and technology course."
    : "Help other robotics learners discover this beginner-friendly guide.";

  const getUrl = () => window.location.href.split("#")[0];
  const encodedUrl = () => encodeURIComponent(getUrl());
  const encodedText = () =>
    encodeURIComponent(description || (isCourse
      ? `Explore the ${title} course from NextGenRoboticX.`
      : `Learn how to build ${title} with NextGenRoboticX.`));

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
      icon: FacebookIcon,
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
    <section aria-labelledby="share-content-title" className="border-y border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
        <h2 id="share-content-title" className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {shareHeading}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          {sharePrompt}
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
            <InstagramIcon size={20} />
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
          Instagram does not provide direct web link sharing. On mobile, the Instagram button opens your device share menu; on desktop, it copies the {contentType} link before opening Instagram.
        </p>
      </div>
    </section>
  );
}

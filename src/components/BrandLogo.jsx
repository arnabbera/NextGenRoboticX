import { Link } from "react-router-dom";

export default function BrandLogo({ className = "w-52", imageClassName = "" }) {
  return (
    <Link
      to="/"
      aria-label="NextGenRoboticX home"
      className={`inline-block shrink-0 overflow-hidden rounded-lg bg-white align-middle ${className}`}
    >
      <img
        src="/images/nextgenroboticx-logo.png"
        alt="NextGen RoboticX — Explore, Innovate, Inspire"
        width="1536"
        height="1024"
        className={`aspect-[2.75/1] w-full object-cover object-[center_38%] ${imageClassName}`}
      />
    </Link>
  );
}

import {
  Navbar,
  Hero,
  Stats,
  FeaturedCourses,
} from "../components/home";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <FeaturedCourses />
    </div>
  );
}
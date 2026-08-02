import {
  Navbar,
  Hero,
  Stats,
  FeaturedCourses,
  StudentProjects,
  WhyChooseUs,
} from "../components/home";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <FeaturedCourses />
      <StudentProjects />
      <WhyChooseUs />
    </div>
  );
}
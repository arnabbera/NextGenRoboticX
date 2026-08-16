import {
  Navbar,
  Hero,
  Stats,
  FeaturedCourses,
  StudentProjects,
  WhyChooseUs,
  Contact,
  Footer,
} from "../components/home";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <FeaturedCourses />
        <StudentProjects />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

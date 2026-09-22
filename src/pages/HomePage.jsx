import {
  Navbar,
  Hero,
  FeaturedCourses,
  LearnerConfidence,
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
        <FeaturedCourses />
        <LearnerConfidence />
        <StudentProjects />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

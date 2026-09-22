import { useEffect } from "react";
import { trackEvent } from "../services/analytics";
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
  useEffect(() => {
    trackEvent("homepage_view");
  }, []);

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

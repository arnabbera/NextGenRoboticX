import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
    </div>
  );
}
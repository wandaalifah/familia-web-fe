import Navbar from "../Navbar";
import HeroSection from "../HeroSection";
import AboutSection from "../AboutSection";
import ServicesSection from "../ServicesSection";
import VetsSection from "../VetsSection";
import FacilitiesSection from "../FacilitiesSection";
import FooterSection from "../FooterSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <VetsSection />
      <FacilitiesSection />
      {/* <TestimonialsSection /> */}
      {/* <BlogSection /> */}
      <FooterSection />
    </div>
  );
}

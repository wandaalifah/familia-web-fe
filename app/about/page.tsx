import type { Metadata } from "next";
import Navbar from "@/src/components/organisms/Navbar";
import AboutSection from "@/src/components/organisms/AboutSection";
import FooterSection from "@/src/components/organisms/FooterSection";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kenali lebih dekat Familia Vet & Care, klinik hewan terpercaya di Solo Surakarta. Kami menghadirkan layanan kesehatan hewan profesional dengan suasana hangat, nyaman, dan penuh kepedulian.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="pt-16">
        <AboutSection />
      </main>
      <FooterSection />
    </div>
  );
}

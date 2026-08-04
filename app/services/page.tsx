import type { Metadata } from "next";
import Navbar from "@/src/components/organisms/Navbar";
import ServicesSection from "@/src/components/organisms/ServicesSection";
import FooterSection from "@/src/components/organisms/FooterSection";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Layanan lengkap kesehatan hewan di Familia Vet & Care Solo Surakarta: pemeriksaan, konsultasi, vaksinasi, operasi, sterilisasi, perawatan gigi, grooming, home visit, pet hotel, dan rawat inap.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="pt-16">
        <ServicesSection />
      </main>
      <FooterSection />
    </div>
  );
}

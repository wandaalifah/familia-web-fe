import type { Metadata } from "next";
import Navbar from "@/src/components/organisms/Navbar";
import FacilitiesSection from "@/src/components/organisms/FacilitiesSection";
import FooterSection from "@/src/components/organisms/FooterSection";

export const metadata: Metadata = {
  title: "Fasilitas",
  description:
    "Lihat fasilitas lengkap Familia Vet & Care Solo Surakarta: ruang pemeriksaan, ruang grooming, ruang rawat inap, pet hotel, ruang tindakan & operasi, dan area tunggu yang nyaman.",
};

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="pt-16">
        <FacilitiesSection />
      </main>
      <FooterSection />
    </div>
  );
}

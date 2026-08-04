import type { Metadata } from "next";
import Navbar from "@/src/components/organisms/Navbar";
import VetsSection from "@/src/components/organisms/VetsSection";
import FooterSection from "@/src/components/organisms/FooterSection";

export const metadata: Metadata = {
  title: "Tim Dokter",
  description:
    "Kenali tim dokter hewan profesional Familia Vet & Care Solo Surakarta: drh. Ade, drh. Arief, dan drh. Grace. Berpengalaman dalam pemeriksaan, operasi, vaksinasi, dan perawatan hewan.",
};

export default function VetsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="pt-16">
        <VetsSection />
      </main>
      <FooterSection />
    </div>
  );
}

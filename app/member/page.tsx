import { FooterSection, Navbar, MemberLoginSection } from "@/src/components/organisms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk Akun Pelanggan | Familia Vet & Care Solo",
  description:
    "Masuk ke akun pelanggan Familia Vet & Care Solo Surakarta untuk mengakses riwayat rekam medis, jadwal vaksinasi, pemesanan pet hotel, serta konsultasi online anabul kesayangan Anda.",
  openGraph: {
    title: "Masuk Akun Pelanggan | Familia Vet & Care Solo",
    description:
      "Masuk ke akun pelanggan Familia Vet & Care Solo Surakarta untuk mengakses riwayat rekam medis, jadwal vaksinasi, serta konsultasi online anabul kesayangan Anda.",
  },
};

export default function MemberPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />
      <MemberLoginSection />
      <FooterSection />
    </div>
  );
}
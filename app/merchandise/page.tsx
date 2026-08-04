import type { Metadata } from "next";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Navbar from "@/src/components/organisms/Navbar";
import FooterSection from "@/src/components/organisms/FooterSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Merchandise",
  description:
    "Merchandise resmi Familia Vet & Care Solo Surakarta. Segera hadir! Dapatkan koleksi eksklusif untuk Anda dan hewan peliharaan kesayangan Anda.",
  openGraph: {
    title: "Merchandise | Familia Vet & Care Solo",
    description:
      "Merchandise resmi Familia Vet & Care Solo Surakarta. Segera hadir!",
  },
};

export default function MerchandisePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center max-w-lg mx-auto space-y-8">
          {/* Icon */}
          <div className="mx-auto w-24 h-24 rounded-full bg-[#d6c3a5]/20 flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-[#d6c3a5]" />
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Coming Soon
            </h1>
            <p className="text-lg text-slate-500">
              Kami sedang menyiapkan merchandise eksklusif untuk Anda dan hewan
              peliharaan kesayangan. Nantikan koleksi segera!
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 justify-center">
            <div className="h-px w-16 bg-slate-200" />
            <span className="text-[#d6c3a5] text-2xl">🐾</span>
            <div className="h-px w-16 bg-slate-200" />
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <p className="text-sm text-slate-400">
              Ingin tahu saat merchandise kami tersedia? Hubungi kami melalui
              WhatsApp untuk mendapatkan informasi terbaru.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://wa.me/6281227662988?text=Halo%2C%20saya%20tertarik%20dengan%20merchandise%20Familia%20Vet%20%26%20Care"
                className="inline-flex items-center justify-center rounded-full text-base font-medium transition-colors bg-[#1a1a1a] text-white hover:bg-[#333333] h-12 px-8 shadow-lg"
              >
                <ShoppingBag className="mr-2 h-5 w-5" /> Hubungi Kami
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full text-base font-medium transition-colors border border-slate-200 text-slate-700 hover:bg-slate-100 h-12 px-8"
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

import { ArrowLeft, Phone } from "lucide-react";
import Navbar from "@/src/components/organisms/Navbar";
import FooterSection from "@/src/components/organisms/FooterSection";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center max-w-lg mx-auto space-y-8">
          {/* 404 Number */}
          <div className="text-8xl md:text-9xl font-extrabold text-[#d6c3a5] select-none">
            404
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Halaman Tidak Ditemukan
            </h1>
            <p className="text-lg text-slate-500">
              Maaf, halaman yang Anda cari tidak tersedia atau mungkin telah
              dipindahkan. Silakan kembali ke beranda atau hubungi kami untuk
              bantuan.
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
              Butuh bantuan? Hubungi kami melalui WhatsApp untuk informasi lebih
              lanjut.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full text-base font-medium transition-colors bg-[#1a1a1a] text-white hover:bg-[#333333] h-12 px-8 shadow-lg"
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> Kembali ke Beranda
              </Link>
              <Link
                href="https://wa.me/6281227662988?text=Halo%2C%20saya%20membutuhkan%20bantuan"
                className="inline-flex items-center justify-center rounded-full text-base font-medium transition-colors border border-slate-200 text-slate-700 hover:bg-slate-100 h-12 px-8"
              >
                <Phone className="mr-2 h-5 w-5" /> Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

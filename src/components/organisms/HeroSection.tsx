import { Phone, Calendar, Cross, Scissors } from "lucide-react";
import { FloatingBadge } from "@/src/components/atoms";

export default function HeroSection() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center rounded-full border border-[#e5e7eb] bg-[#d6c3a5]/20 px-3 py-1 text-sm font-medium text-[#1a1a1a]/60">
            🐾 Treat Your Pets Like Your Own Familia
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Merawat dengan hati, karena Mereka adalah{" "}
            <span className="text-[#d6c3a5]">Keluarga</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-lg">
            Familia Vet & Care menghadirkan layanan kesehatan
            hewan yang profesional, nyaman, dan penuh kasih.
            Mulai dari konsultasi, pemeriksaan, vaksinasi, operasi, grooming,
            hingga homevisit, semua kami lakukan dengan satu tujuan: memberikan perawatan terbaik bagi setiap anggota keluarga berbulu
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full text-base font-medium transition-colors bg-[#1a1a1a] text-white hover:bg-[#333333] h-12 px-8 shadow-lg shadow-blue-500/20"
            >
              <Phone className="mr-2 h-5 w-5" /> Hubungi Kami
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50 transform translate-x-10 translate-y-10"></div>
          <img
            src="https://images.unsplash.com/photo-1599443015574-be5fe8c0bf04?auto=format&fit=crop&q=80&w=800"
            alt="Veterinarian holding a dog"
            className="relative z-10 rounded-full w-full max-w-md mx-auto object-cover aspect-square border-8 border-white shadow-2xl"
          />
          <FloatingBadge
            icon={Cross}
            label="Medical"
            position="top-left"
            animationDuration="3s"
          />
          <FloatingBadge
            icon={Scissors}
            label="Salon"
            position="bottom-right"
            animationDuration="4s"
          />
        </div>
      </div>
    </section>
  );
}

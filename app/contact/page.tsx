import type { Metadata } from "next";
import Navbar from "@/src/components/organisms/Navbar";
import FooterSection from "@/src/components/organisms/FooterSection";
import InstagramIcon from "@/src/components/atoms/InstagramIcon";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description:
    "Hubungi Familia Vet & Care Solo Surakarta. Alamat: Gg. Nanas I No.11, Jajar, Laweyan, Surakarta. Telp: +62 812 2766 2988. Email: familiavetandcare@gmail.com",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Hubungi Kami
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Kami siap membantu Anda dan hewan peliharaan kesayangan. Jangan
              ragu untuk menghubungi kami melalui informasi di bawah ini.
            </p>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="pb-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Address */}
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#d6c3a5]/20 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-[#d6c3a5]" />
                </div>
                <h3 className="text-xl font-bold">Alamat</h3>
                <p className="text-slate-600">
                  Gg. Nanas I No.11, RT.01/RW.07
                  <br />
                  Jajar, Kec. Laweyan
                  <br />
                  Kota Surakarta, Jawa Tengah 57144
                </p>
                <a
                  href="https://maps.google.com/?q=Familia+Vet+%26+Care+Surakarta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-[#d6c3a5] hover:underline"
                >
                  Buka di Google Maps →
                </a>
              </div>

              {/* Phone */}
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Telepon & WhatsApp</h3>
                <p className="text-slate-600">
                  Hubungi kami untuk reservasi, konsultasi, atau informasi
                  layanan.
                </p>
                <a
                  href="https://wa.me/6281227662988"
                  className="inline-flex items-center justify-center rounded-full text-base font-medium transition-colors bg-[#1a1a1a] text-white hover:bg-[#333333] h-12 px-8 shadow-lg"
                >
                  <Phone className="mr-2 h-5 w-5" /> +62 812 2766 2988
                </a>
              </div>

              {/* Email */}
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Email</h3>
                <p className="text-slate-600">
                  Kirimkan pertanyaan atau masukan Anda melalui email.
                </p>
                <a
                  href="mailto:familiavetandcare@gmail.com"
                  className="text-[#d6c3a5] hover:underline font-medium"
                >
                  familiavetandcare@gmail.com
                </a>
              </div>

              {/* Hours */}
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 space-y-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold">Jam Operasional</h3>
                <ul className="text-slate-600 space-y-2">
                  <li className="flex justify-between">
                    <span>Senin - Sabtu</span>
                    <span className="font-medium text-slate-900">
                      10:00 - 18:00 WIB
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Minggu & Hari Libur</span>
                    <span className="font-medium text-slate-900">
                      12:00 - 18:00 WIB
                    </span>
                  </li>
                </ul>
                <div className="mt-2 p-3 rounded-lg bg-amber-50 border border-amber-100">
                  <p className="text-amber-700 text-xs font-semibold mb-1">
                    Butuh pemeriksaan di luar jam praktik?
                  </p>
                  <p className="text-amber-600 text-xs">
                    Silakan reservasi terlebih dahulu. Kami tetap dapat melayani
                    sesuai ketersediaan dokter.
                  </p>
                </div>
              </div>

              {/* Instagram */}
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 space-y-4 md:col-span-2">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                  <InstagramIcon className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold">Instagram</h3>
                <p className="text-slate-600">
                  Ikuti kami di Instagram untuk tips perawatan hewan, promo, dan
                  momen lucu dari klien kami.
                </p>
                <a
                  href="https://www.instagram.com/familiavetandcare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full text-base font-medium transition-colors bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 h-12 px-8 shadow-lg"
                >
                  <InstagramIcon className="mr-2 h-5 w-5 text-white" /> @familiavetandcare
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="mt-12 rounded-2xl overflow-hidden border border-slate-100 h-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.2293046459795!2d110.78999407574709!3d-7.5499560745440855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a152baede49f9%3A0xa707119baefc71b4!2sFamilia%20Vet%20%26%20Care!5e0!3m2!1sen!2sid!4v1785669424922!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}

'use client'

import { Award, CheckCircle2, Star, Sparkle, HeartHandshake } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tentang Familia Vet & Care
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Lebih dari sekadar klinik hewan, Familia Vet & Care adalah tempat di mana setiap hewan diperlakukan seperti keluarga. 
            Kami menghadirkan layanan kesehatan yang profesional dengan suasana yang hangat, nyaman, dan penuh kepedulian, sehingga setiap kunjungan menjadi pengalaman yang menenangkan bagi 
            hewan maupun pemiliknya.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <HeartHandshake className="h-10 w-10 text-[#d6c3a5] mb-4" />
            <h3 className="text-xl font-bold mb-2">Pelayanan Penuh Kepedulian</h3>
            <p className="text-slate-600 text-sm">
              Kami percaya setiap hewan peliharaan adalah bagian dari keluarga. 
              Karena itu, setiap pasien kami tangani dengan kasih sayang, kesabaran, dan perhatian.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <Award className="h-10 w-10 text-[#d6c3a5] mb-4" />
            <h3 className="text-xl font-bold mb-2">Dokter Berpengalaman</h3>
            <p className="text-slate-600 text-sm">
              Ditangani oleh dokter hewan profesional yang 
              siap memberikan pemeriksaan, diagnosis, dan perawatan sesuai 
              kebutuhan setiap pasien.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <Sparkle className="h-10 w-10 text-[#d6c3a5] mb-4" />
            <h3 className="text-xl font-bold mb-2">Layanan Lengkap dalam Satu Tempat</h3>
            <p className="text-slate-600 text-sm">
              Mulai dari konsultasi, vaksinasi, tindakan bedah, rawat inap, grooming, 
              hingga home visit untuk memenuhi kebutuhan kesehatan hewan kesayangan Anda.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 md:col-start-2">
            <Star className="h-10 w-10 text-[#d6c3a5] mb-4" />
            <h3 className="text-xl font-bold mb-4">Mengapa Memilih Familia?</h3>
            <ul className="space-y-4 text-slate-600 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#d6c3a5] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Pendekatan Seperti Keluarga</p>
                  <p>Kami memperlakukan setiap hewan seperti keluarga kami sendiri.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#d6c3a5] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Perawatan yang Tepat</p>
                  <p>Pemeriksaan menyeluruh dengan penanganan yang sesuai kebutuhan pasien.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#d6c3a5] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Nyaman & Terpercaya</p>
                  <p>Klinik yang bersih, nyaman, dengan pelayanan yang ramah dan profesional.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

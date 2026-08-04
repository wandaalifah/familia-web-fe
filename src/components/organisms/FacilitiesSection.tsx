'use client'

import { FacilityImage } from "@/src/components/molecules";

export default function FacilitiesSection() {
  return (
    <section id="facilities" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Fasilitas Kami
          </h2>
          <p className="text-slate-600">
            Lingkungan yang nyaman dan fasilitas yang mendukung kesehatan serta kenyamanan hewan kesayangan Anda.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[250px]">
          <FacilityImage
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800"
            alt="Ruang Pemeriksaan"
            label="Ruang Pemeriksaan"
            description="Nyaman untuk konsultasi dan pemeriksaan."
          />
          <FacilityImage
            src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400"
            alt="Ruang Grooming"
            label="Ruang Grooming"
            description="Perawatan kebersihan dan kesehatan kulit."
          />
          <FacilityImage
            src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400"
            alt="Ruang Rawat Inap"
            label="Ruang Rawat Inap"
            description="Untuk observasi dan perawatan pasien."
          />
          <FacilityImage
            src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800"
            alt="Pet Hotel"
            label="Pet Hotel"
            description="Penitipan yang aman dan nyaman."
          />
          <FacilityImage
            src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800"
            alt="Ruang Tindakan & Operasi"
            label="Ruang Tindakan & Operasi"
            description="Dilengkapi untuk tindakan medis dan bedah."
          />
          <FacilityImage
            src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800"
            alt="Area Tunggu"
            label="Area Tunggu"
            description="Ruang tunggu yang bersih, nyaman, dan ramah bagi pemilik maupun hewan peliharaan."
          />
        </div>
      </div>
    </section>
  );
}

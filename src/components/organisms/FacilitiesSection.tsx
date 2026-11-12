'use client'

import { FacilityImage } from "@/src/components/molecules";
import poliImg from "@/src/assets/fasilitas/Poli-4.jpg";
import groomingImg from "@/src/assets/fasilitas/Ruang Grooming-2.jpg";
import operasiImg from "@/src/assets/fasilitas/Ruang Oprasi-1.jpg";
import petHotelAnjing1 from "@/src/assets/fasilitas/Pet Hotel Anjing-1.jpg";
import petHotelAnjing4 from "@/src/assets/fasilitas/Pet Hotel Anjing-4.jpg";
import petHotelKucing1 from "@/src/assets/fasilitas/Pet Hotel kucing-1.jpg";
import tungguImg2 from "@/src/assets/fasilitas/Admin dan Ruang tunggu-2.jpg";
import tungguImg4 from "@/src/assets/fasilitas/Admin dan Ruang tunggu-4.jpg";

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
            images={[poliImg]}
            alt="Ruang Pemeriksaan"
            label="Ruang Pemeriksaan"
            description="Nyaman untuk konsultasi dan pemeriksaan."
          />
          <FacilityImage
            images={[groomingImg]}
            alt="Ruang Grooming"
            label="Ruang Grooming"
            description="Perawatan kebersihan dan kesehatan kulit."
          />
          <FacilityImage
            images={[petHotelKucing1, petHotelAnjing4]}
            alt="Ruang Rawat Inap"
            label="Ruang Rawat Inap"
            description="Untuk observasi dan perawatan pasien."
          />
          <FacilityImage
            images={[petHotelAnjing1, petHotelAnjing4, petHotelKucing1]}
            alt="Pet Hotel"
            label="Pet Hotel"
            description="Penitipan yang aman dan nyaman."
          />
          <FacilityImage
            images={[operasiImg]}
            alt="Ruang Tindakan & Operasi"
            label="Ruang Tindakan & Operasi"
            description="Dilengkapi untuk tindakan medis dan bedah."
          />
          <FacilityImage
            images={[tungguImg2, tungguImg4]}
            alt="Area Tunggu"
            label="Area Tunggu"
            description="Ruang tunggu yang bersih, nyaman, dan ramah bagi pemilik maupun hewan peliharaan."
          />
        </div>
      </div>
    </section>
  );
}

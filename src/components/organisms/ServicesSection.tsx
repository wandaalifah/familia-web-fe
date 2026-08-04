'use client'

import {
  Stethoscope,
  Syringe,
  Activity,
  Heart,
  Scissors,
  HouseHeart,
  Cross,
  Pill,
} from "lucide-react";
import { ServiceCard } from "@/src/components/molecules";

const services = [
  { icon: Stethoscope, title: "Pemeriksaan & Konsultasi", description: "Diagnosis dan konsultasi kesehatan." },
  { icon: Syringe, title: "Vaksinasi", description: "Perlindungan dari penyakit menular." },
  { icon: Activity, title: "Operasi & Sterilisasi", description: "Tindakan bedah yang aman." },
  { icon: Heart, title: "Perawatan Gigi", description: "Scaling dan kesehatan gigi." },
  { icon: Scissors, title: "Grooming", description: "Perawatan kebersihan dan kesehatan kulit." },
  { icon: HouseHeart, title: "Home Visit", description: "Layanan dokter ke rumah." },
  { icon: Cross, title: "Pet Hotel", description: "Penitipan yang nyaman dan terpantau." },
  { icon: Pill, title: "Rawat Inap", description: "Perawatan intensif sesuai kebutuhan." },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Layanan Kami
          </h2>
          <p className="text-slate-600">Solusi lengkap untuk kesehatan dan kenyamanan hewan kesayangan Anda.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

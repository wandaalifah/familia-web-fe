'use client'

import { VetCard } from "@/src/components/molecules";

const vets = [
  {
    name: "drh. Ade",
    role: "Veterinarian",
    // image: "",
    intro:
      "Berfokus pada pemeriksaan, tindakan medis, bedah, dan pengembangan layanan untuk memberikan pengalaman terbaik bagi pasien dan pemilik hewan.",
  },
  {
    name: "drh. Arief",
    role: "Veterinarian",
    // image: "",
    intro:
      "Menangani konsultasi, pemeriksaan, tindakan medis, serta operasi dengan pendekatan yang profesional dan penuh perhatian.",
  },
  {
    name: "drh. Grace",
    role: "Veterinarian",
    // image: "",
    intro:
      "Berfokus pada kesehatan preventif, pemeriksaan rutin, vaksinasi, serta edukasi kepada pemilik hewan agar tetap sehat sepanjang hidupnya.",
  },
];

export default function VetsSection() {
  return (
    <section id="vets" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Tim Dokter Kami
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {vets.map((vet, idx) => (
            <VetCard key={idx} {...vet} />
          ))}
        </div>
      </div>
    </section>
  );
}

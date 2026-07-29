import { VetCard } from "@/src/components/molecules";

const vets = [
  {
    name: "Dr. Sarah Jenkins",
    role: "Lead Veterinarian",
    experience: "15 Years Experience",
    focus: "Soft Tissue Surgery",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    intro:
      "Dr. Jenkins has dedicated her life to improving surgical outcomes for small animals. She loves hiking with her golden retriever, Max.",
  },
  {
    name: "Dr. Michael Chen",
    role: "Specialist Feline Medicine",
    experience: "10 Years Experience",
    focus: "Feline Internal Medicine",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    intro:
      "A self-proclaimed 'cat whisperer', Dr. Chen specializes in managing chronic conditions in senior felines in a stress-free manner.",
  },
  {
    name: "Dr. Emily Rostova",
    role: "Emergency & Critical Care",
    experience: "8 Years Experience",
    focus: "Trauma & Diagnostics",
    image:
      "https://images.unsplash.com/photo-1594824432258-f9e42c263725?auto=format&fit=crop&q=80&w=400",
    intro:
      "Calm under pressure, Dr. Rostova leads our emergency response team. She is passionate about advanced ultrasound diagnostics.",
  },
];

export default function VetsSection() {
  return (
    <section id="vets" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Meet Our Veterinarians
          </h2>
          <p className="text-slate-400">
            Expert care from passionate professionals.
          </p>
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

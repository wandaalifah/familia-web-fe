import {
  Stethoscope,
  Syringe,
  Activity,
  Heart,
  Scissors,
  TestTube,
  Cross,
  Pill,
} from "lucide-react";
import { ServiceCard } from "@/src/components/molecules";

const services = [
  { icon: Stethoscope, title: "Health Checkups", description: "Routine wellness exams." },
  { icon: Syringe, title: "Vaccinations", description: "Essential immunizations." },
  { icon: Activity, title: "Surgery", description: "Safe, monitored operations." },
  { icon: Heart, title: "Dental Care", description: "Cleaning and extractions." },
  { icon: Scissors, title: "Grooming", description: "Baths, cuts, and nail trims." },
  { icon: TestTube, title: "Laboratory", description: "In-house bloodwork & diagnostics." },
  { icon: Cross, title: "Emergency Care", description: "Urgent medical interventions." },
  { icon: Pill, title: "Pet Pharmacy", description: "Prescriptions and supplements." },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Our Services
          </h2>
          <p className="text-slate-600">Comprehensive care under one roof.</p>
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

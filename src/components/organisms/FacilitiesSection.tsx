import { FacilityImage } from "@/src/components/molecules";

export default function FacilitiesSection() {
  return (
    <section id="facilities" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Our Facilities
          </h2>
          <p className="text-slate-600">
            Equipped with state-of-the-art technology for your pet&apos;s
            comfort and health.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          <FacilityImage
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800"
            alt="Consultation Room"
            label="Consultation Rooms"
            span="col-span-2 row-span-2"
          />
          <FacilityImage
            src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400"
            alt="Laboratory"
            label="In-house Lab"
          />
          <FacilityImage
            src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400"
            alt="Surgery Room"
            label="Surgery Room"
          />
          <FacilityImage
            src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800"
            alt="Grooming Area"
            label="Grooming & Salon"
            span="col-span-2"
          />
        </div>
      </div>
    </section>
  );
}

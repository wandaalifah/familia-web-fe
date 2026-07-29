import { TestimonialCard } from "@/src/components/molecules";

const testimonials = [
  {
    text: "My dog broke his leg and the team here was incredible. The surgery went perfectly and the before/after recovery care was exceptional. I wouldn't trust anyone else.",
    author: "Sarah M.",
    rating: 5,
    pet: "Owner of Max (Golden Retriever)",
  },
  {
    text: "I was so worried when my cat stopped eating. Dr. Chen found the issue immediately. The facilities are incredibly clean and the staff is so empathetic.",
    author: "David L.",
    rating: 5,
    pet: "Owner of Luna (Domestic Shorthair)",
  },
  {
    text: "We use their pet hotel and grooming services regularly. It's the only place my anxious rescue dog actually wags his tail when we walk in!",
    author: "Elena R.",
    rating: 5,
    pet: "Owner of Buster (Mixed Breed)",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-amber-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12">
          Happy Pets, Happy Clients
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((review, idx) => (
            <TestimonialCard key={idx} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}

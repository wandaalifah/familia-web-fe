import { StarIcon } from "@/src/components/atoms";

interface TestimonialCardProps {
  text: string;
  author: string;
  rating: number;
  pet: string;
}

export default function TestimonialCard({
  text,
  author,
  rating,
  pet,
}: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm text-left relative">
      <div className="flex gap-1 mb-4 text-amber-500">
        {Array.from({ length: rating }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <p className="text-slate-600 mb-6 italic">&ldquo;{text}&rdquo;</p>
      <div>
        <p className="font-bold text-slate-900">{author}</p>
        <p className="text-xs text-slate-500">{pet}</p>
      </div>
    </div>
  );
}

import Image from "next/image";

interface VetCardProps {
  name: string;
  role: string;
  image?: string;
  intro: string;
}

export default function VetCard({
  name,
  role,
  image,
  intro,
}: VetCardProps) {
  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
      {image && (
        <div className="relative w-full h-64">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
      )}
      <div className="p-6 space-y-3">
        <div>
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-amber-400 font-medium">{role}</p>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed pt-2">{intro}</p>
      </div>
    </div>
  );
}

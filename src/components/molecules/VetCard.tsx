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
      <img src={image} alt={name} className="w-full h-64 object-cover" />
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

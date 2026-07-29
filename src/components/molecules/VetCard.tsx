interface VetCardProps {
  name: string;
  role: string;
  experience: string;
  focus: string;
  image: string;
  intro: string;
}

export default function VetCard({
  name,
  role,
  experience,
  focus,
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
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-slate-700 px-2 py-1 rounded">{experience}</span>
          <span className="bg-slate-700 px-2 py-1 rounded">{focus}</span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed pt-2">{intro}</p>
      </div>
    </div>
  );
}

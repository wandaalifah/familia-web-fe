import { type LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <div className="group p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-[#1a1a1a]/10 hover:border-[#e5e7eb] transition-all text-center">
      <Icon className="h-12 w-12 mx-auto text-[#d6c3a5] mb-4 group-hover:scale-110 transition-transform" />
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  );
}

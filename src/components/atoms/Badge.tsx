import { type LucideIcon } from "lucide-react";

interface BadgeProps {
  icon: LucideIcon;
  label: string;
  className?: string;
}

export default function Badge({ icon: Icon, label, className = "" }: BadgeProps) {
  return (
    <div className={`inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-600 ${className}`}>
      <Icon className="h-4 w-4 mr-1" />
      {label}
    </div>
  );
}

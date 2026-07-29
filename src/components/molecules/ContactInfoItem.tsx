import { type LucideIcon } from "lucide-react";

interface ContactInfoItemProps {
  icon: LucideIcon;
  iconColor?: string;
  children: React.ReactNode;
}

export default function ContactInfoItem({
  icon: Icon,
  iconColor = "text-amber-500",
  children,
}: ContactInfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon className={`h-5 w-5 ${iconColor} shrink-0 mt-0.5`} />
      {children}
    </div>
  );
}

import { type LucideIcon } from "lucide-react";

interface FloatingBadgeProps {
  icon: LucideIcon;
  label: string;
  position?: "top-left" | "bottom-right";
  animationDuration?: string;
}

export default function FloatingBadge({
  icon: Icon,
  label,
  position = "top-left",
  animationDuration = "3s",
}: FloatingBadgeProps) {
  const positionClasses =
    position === "top-left"
      ? "absolute top-10 -left-4 z-20"
      : "absolute bottom-10 -right-4 z-20";

  return (
    <div
      className={`${positionClasses} bg-white p-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce`}
      style={{ animationDuration }}
    >
      <Icon className="h-5 w-5 text-amber-500" />
      <span className="font-bold text-sm">{label}</span>
    </div>
  );
}

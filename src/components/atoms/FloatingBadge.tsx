import { type LucideIcon } from "lucide-react";

interface FloatingBadgeProps {
  icon: LucideIcon;
  label: string;
  angle?: number;       
  radius?: number | string;
  animationDuration?: string;
  delay?: string;       
}

export default function FloatingBadge({
  icon: Icon,
  label,
  angle = 0,
  radius = "65%",
  animationDuration = "3s",
  delay = "0s",
}: FloatingBadgeProps) {
  const rad = (angle * Math.PI) / 180;
  
  const sin = Math.sin(rad).toFixed(4);
  const cos = Math.cos(rad).toFixed(4);

  const radiusValue = typeof radius === "number" ? `${radius}px` : radius;

  return (
    <div
      className="absolute z-20 bg-white p-2 md:p-2.5 rounded-lg md:rounded-xl shadow-lg flex items-center gap-1.5 md:gap-2 animate-float whitespace-nowrap"
      style={{
        top: `calc(50% - (${cos} * ${radiusValue}))`,
        left: `calc(50% + (${sin} * ${radiusValue}))`,
        transform: "translate(-50%, -50%)",
        animationDuration,
        animationDelay: delay,
      }}
    >
      <Icon className="h-3 w-3 md:h-4 md:w-4 text-[#d6c3a5]" />
      <span className="font-bold text-[10px] md:text-xs">{label}</span>
    </div>
  );
}

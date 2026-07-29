import { type LucideIcon } from "lucide-react";

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
}

export default function SocialLink({ href, icon: Icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      className="bg-slate-800 p-2 rounded-full hover:bg-amber-500 hover:text-white transition-colors"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, PawPrint, Ticket, User } from "lucide-react";
import { useMemberMembershipStore } from "@/src/store/member/membership";

const TABS = [
  { href: "/profile", label: "Profil & Ringkasan", icon: User },
  { href: "/pets", label: "Anabul Saya", icon: PawPrint, showPetCount: true },
  { href: "/coupons", label: "Kupon Rewards", icon: Ticket },
  { href: "/history", label: "Riwayat Poin", icon: History },
];

const MembershipTabs = () => {
  const pathname = usePathname();
  const pets = useMemberMembershipStore((state) => state.pets);

  return (
    <nav className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200 scrollbar-none">
      {TABS.map((tab) => {
        const isActive =
          pathname === tab.href || pathname.startsWith(`${tab.href}/`);
        const Icon = tab.icon;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`py-3 px-5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              isActive
                ? "bg-slate-900 text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <Icon className="w-4 h-4 text-amber-400" />
            <span>
              {tab.label}
              {tab.showPetCount ? ` (${pets.length})` : ""}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MembershipTabs;

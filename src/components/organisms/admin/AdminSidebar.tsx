"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Star,
  Gift,
  Layers,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLogoutUserMutation } from "@/src/services/mutation/login/user";
import { clearSession } from "@/src/services/session/session";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Membership", href: "/admin/membership", icon: Users },
  { label: "Points", href: "/admin/points", icon: Star },
  { label: "Coupon", href: "/admin/coupons", icon: Gift },
  { label: "Tiers", href: "/admin/tiers", icon: Layers },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mutate: logoutUser } = useLogoutUserMutation();

  const handleLogout = async () => {
    logoutUser(undefined, {
      onSuccess: async () => {
        await clearSession();
        router.push("/login");
      },
      onError: async () => {
        // Even if API call fails, clear local session
        await clearSession();
        router.push("/login");
      },
    });
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-4 py-3 lg:hidden">
        <span className="text-base font-bold tracking-tight text-[#1A1A1A]">
          Admin Panel
        </span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-1.5 text-[#6B7280] hover:bg-[#F3F4F6] transition-colors"
          aria-label="Toggle sidebar"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-screen w-60 flex-col border-r border-[#E5E7EB] bg-white transition-transform duration-200 lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center border-b border-[#E5E7EB] px-5">
          <span className="text-base font-bold tracking-tight text-[#1A1A1A]">
            Admin Panel
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[#1A1A1A] text-white"
                        : "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1A1A1A]"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-[#E5E7EB] p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#6B7280] transition-colors hover:bg-[#FEF2F2] hover:text-[#DC2626]"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

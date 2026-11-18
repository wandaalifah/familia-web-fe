"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { useLogoutUserMutation } from "@/src/services/mutation/login/user";
import { clearSession } from "@/src/services/session/session";
import { useMemberMembershipStore } from "@/src/store/member/membership";
import QrMemberCardModal from "@/src/components/molecules/membership/QrMemberCardModal";

const MemberHeader = () => {
  const router = useRouter();
  const [showQrModal, setShowQrModal] = useState(false);
  const memberId = useMemberMembershipStore((state) => state.user.memberId);

  const { mutate: logoutUser } = useLogoutUserMutation();

  const handleLogout = () => {
    logoutUser(undefined, {
      onSettled: async () => {
        await clearSession();
        router.push("/member");
      },
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/profile" className="flex items-center gap-3">
          <Image
            src="/small-icon.png"
            alt="Familia Vet & Care"
            width={80}
            height={80}
            className="w-14 h-auto"
            priority
          />
          <div>
            <h1 className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none">
              Familia <span className="text-[#B88E39]">Vet & Care</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-0.5">
              Portal Pelanggan & Member
            </p>
          </div>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3">
          {/* <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[#8C6B28] text-xs font-bold transition-all shadow-xs"
          >
            <QrCode className="w-4 h-4 text-[#B88E39]" />
            <span>Kartu Member QR</span>
          </button> */}

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-200/70 hover:bg-stone-300 text-slate-700 text-xs font-semibold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>

      <QrMemberCardModal
        open={showQrModal}
        memberId={memberId}
        onOpenChange={setShowQrModal}
      />
    </header>
  );
};

export default MemberHeader;

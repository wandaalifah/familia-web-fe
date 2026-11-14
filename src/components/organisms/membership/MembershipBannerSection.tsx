"use client";

import { Award, PawPrint } from "lucide-react";
import { useMemberMembershipStore } from "@/src/store/member/membership";
import { useUserProfileQuery } from "@/src/services/query/user/profile";

const MembershipBannerSection = () => {
  const user = useMemberMembershipStore((state) => state.user);
  const { data: profile } = useUserProfileQuery();

  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-amber-950/90 to-slate-900 border border-amber-500/30 p-6 sm:p-8 text-white shadow-2xl">
      {/* Background Decorative Gold Orbits & Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Realistic Metallic VIP Card */}
        <div className="lg:col-span-7">
          <div className="relative bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 rounded-2xl p-6 shadow-xl border border-amber-400/40 text-amber-50 overflow-hidden flex flex-col justify-between min-h-[220px]">
            {/* Subtle Card Shimmer Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-300/20 via-transparent to-black/40 pointer-events-none" />
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

            {/* Card Header: Brand & VIP Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-950/80 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-md">
                  <PawPrint className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base tracking-wide text-white">
                    Familia <span className="text-amber-300">Vet & Care</span>
                  </h3>
                  <p className="text-[9px] uppercase tracking-widest text-amber-200/80 font-bold">
                    Official Member Card
                  </p>
                </div>
              </div>
            </div>

            {/* Card Body: Chip Graphic & Member Info */}
            <div className="relative z-10 my-4 flex items-center justify-between">
              {/* Golden SIM Chip Visual */}
              <div className="w-11 h-8 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-100/60 p-1 flex flex-col justify-between shadow-xs">
                <div className="w-full h-1 bg-amber-800/40 rounded-xs" />
                <div className="w-2/3 h-1 bg-amber-800/40 rounded-xs" />
                <div className="w-full h-1 bg-amber-800/40 rounded-xs" />
              </div>
            </div>

            {/* Card Footer: Member Name & ID */}
            <div className="relative z-10 flex items-end justify-between border-t border-amber-400/20 pt-3">
              <div>
                <p className="text-[9px] text-amber-200/70 uppercase font-semibold tracking-wider">
                  Nama Pemilik
                </p>
                <h4 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white">
                  {profile?.first_name} {profile?.last_name}
                </h4>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-amber-200/70 uppercase font-semibold tracking-wider">
                  Phone
                </p>
                <p className="font-mono text-xs sm:text-sm font-extrabold text-amber-200 tracking-widest">
                  {profile?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Tier Points Balance & Progress Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-amber-500/20 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 font-medium block">
                  Total Poin Rewards
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-3xl font-black text-amber-400 tracking-tight">
                    {user.points}
                  </span>
                  <span className="text-xs font-bold text-amber-200">Pts</span>
                </div>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Award className="w-6 h-6" />
              </div>
            </div>

            {/* Tier Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-stone-300">
                  Level Saat Ini:{" "}
                  <strong className="text-amber-400">{user.tier}</strong>
                </span>
                <span className="text-amber-300">
                  {user.nextTierPoints - user.points} Pts ke {user.nextTierName}
                </span>
              </div>

              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-stone-700/60">
                <div
                  className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 h-full rounded-full transition-all duration-700 shadow-xs"
                  style={{
                    width: `${Math.min(
                      (user.points / user.nextTierPoints) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-stone-400">
              <span>
                Terdaftar Sejak:{" "}
                <strong className="text-stone-200">{user.joinDate}</strong>
              </span>
              <span>
                Total Transaksi:{" "}
                <strong className="text-amber-400">{user.totalVisits} Kali</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipBannerSection;

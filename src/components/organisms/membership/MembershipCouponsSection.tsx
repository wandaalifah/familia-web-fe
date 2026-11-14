"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useMemberMembershipStore } from "@/src/store/member/membership";
import { ICoupon } from "@/src/interfaces/member/membership";
import CouponCard from "@/src/components/molecules/membership/CouponCard";
import RedeemCouponModal from "@/src/components/molecules/membership/RedeemCouponModal";

const MembershipCouponsSection = () => {
  const { user, coupons, redeemCoupon } = useMemberMembershipStore();
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);

  const handleConfirmRedeem = () => {
    if (!selectedCoupon) return;

    const success = redeemCoupon(selectedCoupon);
    setSelectedCoupon(null);

    if (success) {
      toast.success("Berhasil menukarkan kupon!");
    } else {
      toast.error("Poin Anda tidak mencukupi untuk penukaran kupon ini.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-50 to-amber-100/60 rounded-3xl p-6 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Kupon & Rewards Poin Pelanggan
          </h3>
          <p className="text-xs text-slate-600">
            Tukarkan poin reward dari setiap kunjungan & grooming dengan promo
            menarik.
          </p>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-2xl border border-amber-300 shadow-xs text-center">
          <span className="text-[10px] text-slate-400 block font-bold uppercase">
            Saldo Poin Aktif
          </span>
          <span className="text-xl font-extrabold text-[#B88E39]">
            {user.points} Pts
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <CouponCard
            key={coupon.id}
            coupon={coupon}
            canRedeem={user.points >= coupon.pointsCost}
            onRedeem={setSelectedCoupon}
          />
        ))}
      </div>

      <RedeemCouponModal
        coupon={selectedCoupon}
        currentPoints={user.points}
        onConfirm={handleConfirmRedeem}
        onOpenChange={(open) => {
          if (!open) setSelectedCoupon(null);
        }}
      />
    </div>
  );
};

export default MembershipCouponsSection;

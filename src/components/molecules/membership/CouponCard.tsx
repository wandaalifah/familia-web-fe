"use client";

import { LucideIcon } from "lucide-react";

export interface CouponCardData {
  id: string;
  title: string;
  pointsCost: number;
  category: string;
  description: string;
  expiryDays: string;
  badge: string;
  icon: LucideIcon;
}

interface CouponCardProps {
  coupon: CouponCardData;
  canRedeem: boolean;
  onRedeem: (coupon: CouponCardData) => void;
}

const CouponCard = ({ coupon, canRedeem, onRedeem }: CouponCardProps) => {
  const IconComp = coupon.icon;

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all relative overflow-hidden">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#B88E39] flex items-center justify-center">
            <IconComp className="w-5 h-5" />
          </div>
          <span className="px-2.5 py-1 rounded-full bg-slate-900 text-amber-400 text-[10px] font-extrabold">
            {coupon.badge}
          </span>
        </div>

        <h4 className="text-base font-extrabold text-slate-900 mb-1">
          {coupon.title}
        </h4>
        <p className="text-xs text-slate-500 mb-4">{coupon.description}</p>
      </div>

      <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">
            Biaya Penukaran
          </span>
          <span className="text-sm font-extrabold text-[#B88E39]">
            {coupon.pointsCost} Pts
          </span>
        </div>

        <button
          type="button"
          onClick={() => onRedeem(coupon)}
          disabled={!canRedeem}
          className={`py-2 px-4 rounded-full text-xs font-bold transition-all ${
            canRedeem
              ? "bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
              : "bg-stone-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {canRedeem ? "Tukarkan Kupon" : "Poin Kurang"}
        </button>
      </div>
    </div>
  );
};

export default CouponCard;

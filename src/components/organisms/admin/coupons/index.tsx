"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import ManageCouponsTitle from "@/src/components/molecules/admin/coupons/title";
import CouponCatalogTab from "@/src/components/molecules/admin/coupons/coupon-tab";
import RedemptionHistoryTab from "@/src/components/molecules/admin/coupons/redemption-tab";

type TabKey = "catalog" | "history";

const TABS: { key: TabKey; label: string }[] = [
  { key: "catalog", label: "Coupon Catalog" },
  { key: "history", label: "Redemption History" },
];

const ManageCoupons = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("catalog");

  return (
    <div className="flex flex-col gap-6">
      <ManageCouponsTitle />

      <div role="tablist" aria-label="Coupons" className="flex gap-1 border-b border-[#E5E7EB]">
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "relative -mb-px cursor-pointer px-4 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "text-[#1A1A1A]"
                  : "text-[#6B7280] hover:text-[#1A1A1A]",
              )}
            >
              {tab.label}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#1A1A1A]"
                />
              )}
            </button>
          );
        })}
      </div>

      <div role="tabpanel">
        {activeTab === "catalog" ? <CouponCatalogTab /> : <RedemptionHistoryTab />}
      </div>
    </div>
  );
};

export default ManageCoupons;

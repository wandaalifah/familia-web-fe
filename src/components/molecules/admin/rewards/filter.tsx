"use client";

import { BaseButton } from "@/src/components/atoms/button";
import { Plus } from "lucide-react";

const CouponsTableHeaderFilter = () => {
  return (
    <div className="flex justify-end gap-3">
      <BaseButton className="h-12 px-5">
        <div className="flex items-center gap-2">
          <Plus />
          New Coupon
        </div>
      </BaseButton>
    </div>
  );
};

export default CouponsTableHeaderFilter;

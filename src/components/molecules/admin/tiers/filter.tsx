"use client";

import { BaseButton } from "@/src/components/atoms/button";
import { Plus } from "lucide-react";
import { useManageTiersModal } from "@/src/store/admin/tiers/modal";
import { ITierItem } from "@/src/interfaces/admin/tiers/list";

const TiersTableHeaderFilter = () => {
  const { setOpenedTiers } = useManageTiersModal();

  const handleAddNew = () => {
    setOpenedTiers({} as ITierItem);
  };

  return (
    <div className="flex justify-end gap-3">
      <BaseButton className="h-12 px-5" onClick={handleAddNew}>
        <div className="flex items-center gap-2">
          <Plus />
          New Tier
        </div>
      </BaseButton>
    </div>
  );
};

export default TiersTableHeaderFilter;

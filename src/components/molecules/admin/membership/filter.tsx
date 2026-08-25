"use client";

import { BaseButton } from "@/src/components/atoms/button";
import { Plus } from "lucide-react";
import { useManageMembershipModal } from "@/src/store/admin/membership/modal";
import { IMembership } from "@/src/interfaces/admin/membership/list";

const MembershipTableHeaderFilter = () => {
  const { setOpenedMembership } = useManageMembershipModal();

  const handleAddNew = () => {
    setOpenedMembership({} as IMembership);
  };

  return (
    <div className="flex justify-end gap-3">
      <BaseButton className="h-12 px-5" onClick={handleAddNew}>
        <div className="flex items-center gap-2">
          <Plus />
          New Membership
        </div>
      </BaseButton>
    </div>
  );
};

export default MembershipTableHeaderFilter;
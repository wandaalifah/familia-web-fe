"use client";

import { useQuery } from "@tanstack/react-query";
import { apiSearchMembershipOptions } from "../../../api/admin/coupons/membership-options";
import { isApiError } from "@/src/utils/common/server-action";

export const useMembershipOptionsQuery = (search: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["admin-membership-options", search],
    enabled,
    queryFn: async () => {
      const response = await apiSearchMembershipOptions(search);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data.map((item) => ({
        value: item.userId,
        membershipId: item.id,
        label: `${item.users.first_name} ${item.users.last_name}`.trim(),
        currentPoints: item.points,
      }));
    },
  });
};

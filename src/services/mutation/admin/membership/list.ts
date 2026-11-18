"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiCreateMembership,
  apiUpdateMembershipTier,
} from "../../../api/admin/membership/list";
import { ICreateMembershipRequest } from "@/src/interfaces/admin/membership/list";
import { isApiError } from "@/src/utils/common/server-action";
import { MEMBERSHIP_LIST_KEY } from "../../../query/admin/membership/list";

export const useCreateMembershipMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    meta: { successMessage: "Member created." },
    mutationFn: async (body: ICreateMembershipRequest) => {
      const response = await apiCreateMembership(body);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MEMBERSHIP_LIST_KEY] });
    },
  });
};

export const useUpdateMembershipTierMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    meta: { successMessage: "Tier updated." },
    mutationFn: async ({ id, tierId }: { id: string; tierId: string }) => {
      const response = await apiUpdateMembershipTier(id, tierId);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MEMBERSHIP_LIST_KEY] });
    },
  });
};

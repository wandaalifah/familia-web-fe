"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiCreateTier,
  apiDeleteTier,
  apiUpdateTier,
} from "../../../api/admin/tiers/list";
import {
  ICreateTierRequest,
  IUpdateTierRequest,
} from "@/src/interfaces/admin/tiers/list";
import { isApiError } from "@/src/utils/common/server-action";
import { TIER_LIST_KEY } from "../../../query/admin/tiers/list";

const useInvalidateTiers = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: [TIER_LIST_KEY] });
};

export const useCreateTierMutation = () => {
  const invalidate = useInvalidateTiers();

  return useMutation({
    meta: { successMessage: "Tier created." },
    mutationFn: async (body: ICreateTierRequest) => {
      const response = await apiCreateTier(body);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
    onSuccess: invalidate,
  });
};

export const useUpdateTierMutation = () => {
  const invalidate = useInvalidateTiers();

  return useMutation({
    meta: {
      successMessage: (result: { resync?: { changed: number; evaluated: number } } | undefined) =>
        result?.resync
          ? `Tier updated. ${result.resync.changed} of ${result.resync.evaluated} members re-evaluated.`
          : "Tier updated.",
    },
    mutationFn: async ({
      id,
      body,
    }: {
      id: string;
      body: IUpdateTierRequest;
    }) => {
      const response = await apiUpdateTier(id, body);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
    onSuccess: invalidate,
  });
};

export const useDeleteTierMutation = () => {
  const invalidate = useInvalidateTiers();

  return useMutation({
    meta: {
      successMessage: (result: { warning?: string } | undefined) =>
        result?.warning ?? "Tier deleted.",
    },
    mutationFn: async (id: string) => {
      const response = await apiDeleteTier(id);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
    onSuccess: invalidate,
  });
};

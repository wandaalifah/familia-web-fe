"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiGetTierDetail, apiGetTierList } from "../../../api/admin/tiers/list";
import { IGetListTierQuery } from "@/src/interfaces/admin/tiers/list";
import { isApiError } from "@/src/utils/common/server-action";

export const TIER_LIST_KEY = "admin-tiers";
export const TIER_DETAIL_KEY = "admin-tier-detail";

export const useTierListQuery = (query: IGetListTierQuery) => {
  return useQuery({
    queryKey: [TIER_LIST_KEY, query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await apiGetTierList(query);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return { items: response.data, pagination: response.pagination ?? null };
    },
  });
};

export const useTierDetailQuery = (id?: string) => {
  return useQuery({
    queryKey: [TIER_DETAIL_KEY, id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await apiGetTierDetail(id!);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
  });
};

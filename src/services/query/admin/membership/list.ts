"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  apiGetMembershipDetail,
  apiGetMembershipList,
  apiGetTierOptions,
} from "../../../api/admin/membership/list";
import { IGetListMembershipQuery } from "@/src/interfaces/admin/membership/list";
import { isApiError } from "@/src/utils/common/server-action";

export const MEMBERSHIP_LIST_KEY = "admin-membership-list";
export const TIER_OPTIONS_KEY = "admin-membership-tier-options";

export const useMembershipListQuery = (query: IGetListMembershipQuery) => {
  return useQuery({
    queryKey: [MEMBERSHIP_LIST_KEY, query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await apiGetMembershipList(query);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return { items: response.data, pagination: response.pagination ?? null };
    },
  });
};

export const useMembershipDetailQuery = (id?: string) => {
  return useQuery({
    queryKey: ["admin-membership-detail", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await apiGetMembershipDetail(id!);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
  });
};

// Tier catalog for the tier filter and the "change tier" dropdown.
export const useTierOptionsQuery = () => {
  return useQuery({
    queryKey: [TIER_OPTIONS_KEY],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const response = await apiGetTierOptions();

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
  });
};

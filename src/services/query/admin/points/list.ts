"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiGetPointHistory } from "../../../api/admin/points/list";
import { apiSearchMembershipOptions } from "../../../api/admin/points/membership-options";
import { IGetListPointQuery } from "@/src/interfaces/admin/points/list";
import { isApiError } from "@/src/utils/common/server-action";

export const POINT_HISTORY_KEY = "admin-point-history";
export const MEMBERSHIP_OPTIONS_KEY = "admin-membership-options";

export const usePointHistoryQuery = (query: IGetListPointQuery) => {
  return useQuery({
    queryKey: [POINT_HISTORY_KEY, query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await apiGetPointHistory(query);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return { items: response.data, pagination: response.pagination ?? null };
    },
  });
};

// Member search for the Adjust Points picker — disabled until the admin types
// at least 2 characters to avoid pulling the whole membership list.
export const useMembershipOptionsQuery = (search: string) => {
  return useQuery({
    queryKey: [MEMBERSHIP_OPTIONS_KEY, search],
    enabled: search.trim().length >= 2,
    queryFn: async () => {
      const response = await apiSearchMembershipOptions(search);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
  });
};

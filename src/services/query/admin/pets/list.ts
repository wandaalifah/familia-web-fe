"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  apiGetPetDetail,
  apiGetPetList,
  apiSearchPetOwners,
} from "../../../api/admin/pets/list";
import { IGetListPetQuery } from "@/src/interfaces/admin/pets/list";
import { isApiError } from "@/src/utils/common/server-action";

export const PET_LIST_KEY = "admin-pets";
export const PET_DETAIL_KEY = "admin-pet-detail";
export const PET_OWNERS_KEY = "admin-pet-owners";

export const usePetListQuery = (query: IGetListPetQuery) => {
  return useQuery({
    queryKey: [PET_LIST_KEY, query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await apiGetPetList(query);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return { items: response.data, pagination: response.pagination ?? null };
    },
  });
};

export const usePetDetailQuery = (id?: string) => {
  return useQuery({
    queryKey: [PET_DETAIL_KEY, id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await apiGetPetDetail(id!);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
  });
};

// Backs the owner picker in the pet form modal.
export const usePetOwnerOptionsQuery = (search?: string) => {
  return useQuery({
    queryKey: [PET_OWNERS_KEY, search],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await apiSearchPetOwners(search);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return (response.data ?? []).map((membership) => ({
        id: membership.users.id,
        label: `${membership.users.first_name} ${membership.users.last_name}`.trim(),
      }));
    },
  });
};

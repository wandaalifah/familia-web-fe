"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGetVaccineCatalog } from "../../../api/admin/medical-records/vaccines";
import { isApiError } from "@/src/utils/common/server-action";

// Vaccine master data filtered by species; disabled until a species is known.
export const useVaccineCatalogQuery = (species?: string | null) => {
  return useQuery({
    queryKey: ["vaccine-catalog", species],
    enabled: Boolean(species),
    staleTime: 1000 * 60 * 60,
    queryFn: async () => {
      const response = await apiGetVaccineCatalog({ species: species ?? undefined });

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
  });
};

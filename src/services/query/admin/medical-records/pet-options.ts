"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGetMedicalRecordPetOptions } from "../../../api/admin/medical-records/pet-options";
import { isApiError } from "@/src/utils/common/server-action";

// Patient picker options for the medical record form, filtered by a debounced search term.
export const useMedicalRecordPetOptionsQuery = (
  search: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["medical-record-pet-options", search],
    enabled,
    queryFn: async () => {
      const response = await apiGetMedicalRecordPetOptions(search);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data ?? [];
    },
  });
};

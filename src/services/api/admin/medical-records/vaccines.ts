"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import { IVaccineCatalogItem } from "@/src/interfaces/admin/medical-records/list";
import { api } from "../../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";

// Vaccine master data for a pet's species (Rabies is offered for dogs and cats).
// Pass either the pet id or its free-text species (e.g. "Anjing", "Kucing").
export const apiGetVaccineCatalog = async (params: {
  petId?: string;
  species?: string;
}) => {
  try {
    const response = await api.get<IGlobalResponseDto<IVaccineCatalogItem[]>>(
      "/admin/medical-history/vaccines",
      { params },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

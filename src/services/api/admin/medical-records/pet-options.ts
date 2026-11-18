"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import { api } from "../../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";

// Minimal, module-local pet lookup for the record form's patient picker.
// Intentionally does not depend on the Pets admin module's files/types.
export interface IMedicalRecordPetOption {
  id: string;
  name: string;
  species: string | null;
  users: { first_name: string; last_name: string };
}

export const apiGetMedicalRecordPetOptions = async (search?: string) => {
  try {
    const response = await api.get<IGlobalResponseDto<IMedicalRecordPetOption[]>>(
      "/admin/pet/list",
      {
        params: {
          page: 1,
          limit: 50,
          search_by: search ? "name" : undefined,
          search: search || undefined,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

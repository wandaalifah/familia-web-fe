"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import {
  ICreatePetPayload,
  IGetListPetQuery,
  IPet,
  IPetDetail,
  IUpdatePetPayload,
} from "@/src/interfaces/admin/pets/list";
import { api } from "../../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";

export const apiGetPetList = async (query: IGetListPetQuery) => {
  try {
    const { is_neutered, ...rest } = query;
    const response = await api.get<IGlobalResponseDto<IPet[]>>(
      "/admin/pet/list",
      {
        params: {
          ...rest,
          is_neutered:
            is_neutered === undefined ? undefined : String(is_neutered),
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiGetPetDetail = async (id: string) => {
  try {
    const response = await api.get<IGlobalResponseDto<IPetDetail>>(
      `/admin/pet/detail/${id}`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiCreatePet = async (body: ICreatePetPayload) => {
  try {
    const response = await api.post<IGlobalResponseDto<IPet>>(
      "/admin/pet/create",
      body,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiUpdatePet = async (id: string, body: IUpdatePetPayload) => {
  try {
    const response = await api.patch<IGlobalResponseDto<IPet>>(
      `/admin/pet/update/${id}`,
      body,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

// DELETE is the archive action: the backend soft-deletes the pet and it
// disappears from list/detail — there is no separate restore endpoint.
export const apiArchivePet = async (id: string) => {
  try {
    const response = await api.delete<IGlobalResponseDto<IPet>>(
      `/admin/pet/delete/${id}`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

// Minimal owner lookup for the pet-form owner picker. Kept local to the Pets
// module (instead of importing the Membership module's service files) to
// keep the two admin modules decoupled; hits the same /admin/membership/list
// endpoint directly.
export const apiSearchPetOwners = async (search?: string) => {
  try {
    const response = await api.get<
      IGlobalResponseDto<
        Array<{
          id: string;
          users: { id: string; first_name: string; last_name: string };
        }>
      >
    >("/admin/membership/list", {
      params: search
        ? { page: 1, limit: 10, search_by: "name", search }
        : { page: 1, limit: 10 },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

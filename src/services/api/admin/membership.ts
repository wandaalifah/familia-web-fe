"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import { IMembership, IGetListMembershipQuery } from "@/src/interfaces/admin/membership/list";
import { ICreateMembership } from "@/src/interfaces/admin/membership/create";
import { api } from "../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";

export const apiGetMembershipList = async (
  query?: IGetListMembershipQuery,
) => {
  try {
    const response = await api.get<
      IGlobalResponseDto<IMembership[]>
    >("/admin/membership/list", { params: query });

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiCreateMembership = async (
  body: ICreateMembership,
) => {
  try {
    const response = await api.post<
      IGlobalResponseDto<IMembership>
    >("/admin/membership/create", body);

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};


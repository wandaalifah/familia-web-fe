"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import { IRegisterAdminRequest, IRegisterAdminResponse } from "@/src/interfaces/user/register";
import { api } from "../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";

// Register Admin
export const apiRegisterAdmin = async (body: IRegisterAdminRequest) => {
  try {
    const response = await api.post<IGlobalResponseDto<IRegisterAdminResponse>>(
      "/auth/register-admin",
      body,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

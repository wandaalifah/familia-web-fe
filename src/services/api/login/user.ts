"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import { api } from "../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";
import { ILoginUserRequest, ILoginUserResponse, ITokenResponse, IUpdatePasswordRequest, IUpdatePasswordResponse } from "@/src/interfaces/user/login";

export const apiUpdatePassword = async (
  body: IUpdatePasswordRequest,
  userId: number,
) => {
  try {
    const response = await api.put<
      IGlobalResponseDto<IUpdatePasswordResponse | null>
    >("/auth/update-password", body, {
      headers: {
        " app-token": `${userId}:1:1`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiLoginUser = async (body: ILoginUserRequest) => {
  try {
    const response = await api.post<IGlobalResponseDto<ILoginUserResponse>>(
      "/auth/login",
      body,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

// logout
export const apiLogoutUser = async () => {
  try {
    const response = await api.post<
      IGlobalResponseDto<{
        message: string;
      }>
    >("/auth/logout");

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

// refresh-token
export const apiRefreshToken = async (refreshToken: string) => {
  try {
    const response = await api.post<
      IGlobalResponseDto<{ token: ITokenResponse }>
    >("/auth/refresh-token", {
      token: refreshToken,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw handleAxiosError(error);
  }
};

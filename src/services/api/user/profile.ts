"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import { api } from "../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";
import {
  IUpdateUserProfileRequest,
  IUserProfile,
} from "@/src/interfaces/user/profile";

// Get current user profile
// Bearer access token is attached automatically by the satellite request
// interceptor (Authorization: Bearer <access_token> from the session cookies).
export const apiGetUserProfile = async () => {
  try {
    const response = await api.get<IGlobalResponseDto<IUserProfile>>(
      "/user/profile",
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

// Update current user profile (partial: first name, last name, and/or phone)
export const apiUpdateUserProfile = async (
  body: IUpdateUserProfileRequest,
) => {
  try {
    const response = await api.patch<IGlobalResponseDto<IUserProfile | null>>(
      "/user/profile",
      body,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

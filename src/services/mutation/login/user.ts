import { ILoginUserRequest } from "@/src/interfaces/user/login";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiLoginUser, apiLogoutUser } from "../../api/login/user";
import { isApiError } from "@/src/utils/common/server-action";
import { setSession } from "../../session/session";

// Login User
export const useLoginUserMutation = () => {
  return useMutation({
    mutationFn: async (body: ILoginUserRequest) => {
      const response = await apiLoginUser(body);
      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }
      // Store tokens in cookies
      if (response.status && response.data) {
        await setSession({
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
        });
      }
      return response;
    },
  });
};

export const useLogoutUserMutation = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await apiLogoutUser();
      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }
      return response;
    },
    // clear all query client cache when logout
    onSuccess: () => {
      queryclient.clear();
    },
  });
};
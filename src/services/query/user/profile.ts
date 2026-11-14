"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGetUserProfile } from "../../api/user/profile";
import { isApiError } from "@/src/utils/common/server-action";

// Get current user profile
export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await apiGetUserProfile();

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
  });
};

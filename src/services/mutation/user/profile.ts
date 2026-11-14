"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpdateUserProfile } from "../../api/user/profile";
import { IUpdateUserProfileRequest } from "@/src/interfaces/user/profile";
import { isApiError } from "@/src/utils/common/server-action";

// Update current user profile (first name, last name, and/or phone)
export const useUpdateUserProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: IUpdateUserProfileRequest) => {
      const response = await apiUpdateUserProfile(body);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response;
    },
    onSuccess: () => {
      // Refetch the profile so the UI shows server-confirmed data
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
};

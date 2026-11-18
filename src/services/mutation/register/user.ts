import { IRegisterAdminRequest } from "@/src/interfaces/user/register";
import { useMutation } from "@tanstack/react-query";
import { apiRegisterAdmin } from "../../api/register/user";
import { isApiError } from "@/src/utils/common/server-action";

// Register Admin
export const useRegisterAdminMutation = () => {
  return useMutation({
    meta: { successMessage: "Admin registered successfully." },
    mutationFn: async (body: IRegisterAdminRequest) => {
      const response = await apiRegisterAdmin(body);
      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }
      return response;
    },
  });
};

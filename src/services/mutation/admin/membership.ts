import { ICreateMembership } from "@/src/interfaces/admin/membership/create";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCreateMembership } from "../../api/admin/membership";
import { isApiError } from "@/src/utils/common/server-action";

export const useCreateMembershipMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: ICreateMembership) => {
      const response = await apiCreateMembership(body);
      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }
      return response;
    },
    onSuccess: () => {
      // Invalidate and refetch membership list
      queryClient.invalidateQueries({ queryKey: ["membership", "list"] });
    },
  });
};

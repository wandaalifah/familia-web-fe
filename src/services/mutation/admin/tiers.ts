import { ICreateTier } from "@/src/interfaces/admin/tiers/create";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCreateTier } from "../../api/admin/tiers";
import { isApiError } from "@/src/utils/common/server-action";

export const useCreateTierMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: ICreateTier) => {
      const response = await apiCreateTier(body);
      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }
      return response;
    },
    onSuccess: () => {
      // Invalidate and refetch tiers list
      queryClient.invalidateQueries({ queryKey: ["tiers", "list"] });
    },
  });
};

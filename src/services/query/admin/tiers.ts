import { IGetListTiersQuery } from "@/src/interfaces/admin/tiers/list";
import { apiGetTiersList } from "../../api/admin/tiers";
import { useQuery } from "@tanstack/react-query";
import { isApiError } from "@/src/utils/common/server-action";

export const useGetTiersListQuery = (
  params: IGetListTiersQuery,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["tiers", "list", params],
    queryFn: async () => {
      const response = await apiGetTiersList(params);
      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }
      return response;
    },
    enabled,
  });
};

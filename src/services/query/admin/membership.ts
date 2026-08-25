import { IGetListMembershipQuery } from "@/src/interfaces/admin/membership/list";
import { apiGetMembershipList } from "../../api/admin/membership";
import { useQuery } from "@tanstack/react-query";
import { isApiError } from "@/src/utils/common/server-action";

export const useGetMembershipListQuery = (
  params?: IGetListMembershipQuery,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["membership", "list", params],
    queryFn: async () => {
      const response = await apiGetMembershipList(params);
      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }
      return response;
    },
    enabled,
  });
};
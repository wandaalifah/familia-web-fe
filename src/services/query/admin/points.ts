import { IGetListPointsQuery } from "@/src/interfaces/admin/points/list";
import { apiGetPointsList } from "../../api/admin/points";
import { useQuery } from "@tanstack/react-query";
import { isApiError } from "@/src/utils/common/server-action";

export const useGetPointsListQuery = (
  params: IGetListPointsQuery,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["points", "list", params],
    queryFn: async () => {
      const response = await apiGetPointsList(params);
      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }
      return response;
    },
    enabled,
  });
};

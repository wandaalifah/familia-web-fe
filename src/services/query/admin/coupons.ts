import { IGetListCouponsQuery } from "@/src/interfaces/admin/rewards/list";
import { apiGetCouponsList } from "../../api/admin/coupons";
import { useQuery } from "@tanstack/react-query";
import { isApiError } from "@/src/utils/common/server-action";

export const useGetCouponsListQuery = (
  params: IGetListCouponsQuery,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["coupons", "list", params],
    queryFn: async () => {
      const response = await apiGetCouponsList(params);
      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }
      return response;
    },
    enabled,
  });
};

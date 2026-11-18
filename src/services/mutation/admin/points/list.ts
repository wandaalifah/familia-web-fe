"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAdjustPoints } from "../../../api/admin/points/list";
import { POINT_HISTORY_KEY } from "../../../query/admin/points/list";
import { IAdjustPointsRequest } from "@/src/interfaces/admin/points/list";
import { isApiError } from "@/src/utils/common/server-action";

export const useAdjustPointsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    meta: { successMessage: "Point entry saved." },
    mutationFn: async (body: IAdjustPointsRequest) => {
      const response = await apiAdjustPoints(body);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POINT_HISTORY_KEY] });
    },
  });
};

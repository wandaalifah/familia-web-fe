"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import { IPointsHistoryItem, IGetListPointsQuery } from "@/src/interfaces/admin/points/list";
import { api } from "../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";

export const apiGetPointsList = async (
  query: IGetListPointsQuery,
) => {
  try {
    const response = await api.get<
      IGlobalResponseDto<IPointsHistoryItem[]>
    >("/admin/points/history", { params: query });

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

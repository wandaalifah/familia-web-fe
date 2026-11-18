"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import {
  IAdjustPointsRequest,
  IAdjustPointsResponse,
  IGetListPointQuery,
  IPointTransaction,
} from "@/src/interfaces/admin/points/list";
import { api } from "../../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";

export const apiGetPointHistory = async (query: IGetListPointQuery) => {
  try {
    const response = await api.get<IGlobalResponseDto<IPointTransaction[]>>(
      "/admin/points/history",
      { params: query },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiAdjustPoints = async (body: IAdjustPointsRequest) => {
  try {
    const response = await api.post<IGlobalResponseDto<IAdjustPointsResponse>>(
      "/admin/points/adjust",
      body,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

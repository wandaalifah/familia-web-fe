"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import { api } from "../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";
import {
  IGetUserNotificationQuery,
  IUnreadNotificationCount,
  IUserNotification,
} from "@/src/interfaces/user/notification";

// Reminder notifications of the logged-in customer (newest first)
export const apiGetUserNotifications = async (
  query: IGetUserNotificationQuery,
) => {
  try {
    const response = await api.get<IGlobalResponseDto<IUserNotification[]>>(
      "/user/notifications/list",
      { params: query },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiGetUnreadNotificationCount = async () => {
  try {
    const response = await api.get<IGlobalResponseDto<IUnreadNotificationCount>>(
      "/user/notifications/unread-count",
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiMarkNotificationRead = async (id: string) => {
  try {
    const response = await api.patch<
      IGlobalResponseDto<{ id: string; is_read: boolean }>
    >(`/user/notifications/read/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiMarkAllNotificationsRead = async () => {
  try {
    const response = await api.patch<IGlobalResponseDto<{ updated: number }>>(
      "/user/notifications/read-all",
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

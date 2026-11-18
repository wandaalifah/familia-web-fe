"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  apiGetUnreadNotificationCount,
  apiGetUserNotifications,
} from "../../api/user/notification";
import { IGetUserNotificationQuery } from "@/src/interfaces/user/notification";
import { isApiError } from "@/src/utils/common/server-action";

export const USER_NOTIFICATIONS_KEY = "user-notifications";
export const UNREAD_NOTIFICATIONS_KEY = "user-notifications-unread";

const UNREAD_POLL_INTERVAL_MS = 60_000;

// Paginated notification list of the logged-in customer
export const useUserNotificationsQuery = (query: IGetUserNotificationQuery) => {
  return useQuery({
    queryKey: [USER_NOTIFICATIONS_KEY, query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await apiGetUserNotifications(query);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return { items: response.data, pagination: response.pagination ?? null };
    },
  });
};

// Unread badge count, refreshed every minute
export const useUnreadNotificationCountQuery = () => {
  return useQuery({
    queryKey: [UNREAD_NOTIFICATIONS_KEY],
    refetchInterval: UNREAD_POLL_INTERVAL_MS,
    // Background badge polling: an error toast every minute would be noise
    meta: { silentError: true },
    queryFn: async () => {
      const response = await apiGetUnreadNotificationCount();

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data.unread;
    },
  });
};

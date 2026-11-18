"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiMarkAllNotificationsRead,
  apiMarkNotificationRead,
} from "../../api/user/notification";
import {
  UNREAD_NOTIFICATIONS_KEY,
  USER_NOTIFICATIONS_KEY,
} from "../../query/user/notification";
import { isApiError } from "@/src/utils/common/server-action";

// Refetch both the list and the unread badge so the UI shows server-confirmed state
const useInvalidateNotifications = () => {
  const queryClient = useQueryClient();

  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: [USER_NOTIFICATIONS_KEY] }),
      queryClient.invalidateQueries({ queryKey: [UNREAD_NOTIFICATIONS_KEY] }),
    ]);
};

export const useMarkNotificationReadMutation = () => {
  const invalidate = useInvalidateNotifications();

  return useMutation({
    meta: { successMessage: "Notification marked as read." },
    mutationFn: async (id: string) => {
      const response = await apiMarkNotificationRead(id);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response;
    },
    onSuccess: invalidate,
  });
};

export const useMarkAllNotificationsReadMutation = () => {
  const invalidate = useInvalidateNotifications();

  return useMutation({
    meta: { successMessage: "All notifications marked as read." },
    mutationFn: async () => {
      const response = await apiMarkAllNotificationsRead();

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response;
    },
    onSuccess: invalidate,
  });
};

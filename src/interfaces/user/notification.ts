export type NotificationCategory =
  | "PRE_VACCINE_DEWORMING"
  | "VACCINE_REMINDER"
  | "DEWORMING_ROUTINE";

export interface IGetUserNotificationQuery {
  page: number;
  limit: number;
  category?: NotificationCategory;
  is_read?: boolean;
}

export interface IUserNotification {
  id: string;
  petId: string;
  userId: string;
  category: NotificationCategory;
  /** Due date (start of day, Asia/Jakarta) the reminder is about. */
  target_due_date: string;
  title: string;
  message: string;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
  pet: {
    id: string;
    name: string;
    species: string | null;
  };
}

export interface IUnreadNotificationCount {
  unread: number;
}

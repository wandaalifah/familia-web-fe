"use client";

import { useState } from "react";
import { Bell, BellRing, CheckCheck, Pill, Syringe } from "lucide-react";
import {
  IUserNotification,
  NotificationCategory,
} from "@/src/interfaces/user/notification";
import { useUserNotificationsQuery } from "@/src/services/query/user/notification";
import {
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/src/services/mutation/user/notification";

type ReadFilter = "all" | "unread";

const PAGE_SIZE = 10;

const FILTERS: { value: ReadFilter; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "unread", label: "Belum Dibaca" },
];

const CATEGORY_META: Record<
  NotificationCategory,
  { label: string; icon: typeof Syringe; className: string }
> = {
  VACCINE_REMINDER: {
    label: "Jadwal Vaksin",
    icon: Syringe,
    className: "bg-sky-100 text-sky-800",
  },
  PRE_VACCINE_DEWORMING: {
    label: "Obat Cacing & Kutu",
    icon: Pill,
    className: "bg-amber-100 text-amber-900",
  },
  DEWORMING_ROUTINE: {
    label: "Obat Cacing Rutin",
    icon: Pill,
    className: "bg-emerald-100 text-emerald-800",
  },
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });

interface NotificationItemProps {
  notification: IUserNotification;
  isMarking: boolean;
  onMarkRead: (id: string) => void;
}

const NotificationItem = ({
  notification,
  isMarking,
  onMarkRead,
}: NotificationItemProps) => {
  const meta = CATEGORY_META[notification.category];
  const Icon = meta.icon;

  return (
    <div
      className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs ${
        notification.is_read
          ? "bg-[#FAF8F5] border-stone-200/70"
          : "bg-white border-amber-300 shadow-xs"
      }`}
    >
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase inline-flex items-center gap-1 ${meta.className}`}
          >
            <Icon className="w-3 h-3" />
            {meta.label}
          </span>
          {!notification.is_read && (
            <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-bold">
              Baru
            </span>
          )}
        </div>
        <h4 className="font-extrabold text-slate-900 text-sm">
          {notification.title}
        </h4>
        <p className="text-slate-600 leading-relaxed">{notification.message}</p>
        <p className="text-[11px] text-slate-400">
          Jatuh tempo {formatDate(notification.target_due_date)}
        </p>
      </div>

      {!notification.is_read && (
        <button
          type="button"
          disabled={isMarking}
          onClick={() => onMarkRead(notification.id)}
          className="shrink-0 px-3 py-1.5 rounded-lg bg-stone-100 text-slate-700 font-semibold hover:bg-stone-200 transition-all disabled:opacity-60"
        >
          Tandai dibaca
        </button>
      )}
    </div>
  );
};

const MembershipNotificationsSection = () => {
  const [filter, setFilter] = useState<ReadFilter>("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useUserNotificationsQuery({
    page,
    limit: PAGE_SIZE,
    ...(filter === "unread" ? { is_read: false } : {}),
  });
  const markRead = useMarkNotificationReadMutation();
  const markAllRead = useMarkAllNotificationsReadMutation();

  const items = data?.items ?? [];
  const totalPages = data?.pagination?.total_page ?? 1;

  const changeFilter = (next: ReadFilter) => {
    setFilter(next);
    setPage(1);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BellRing className="w-5 h-5 text-amber-500" />
            Pengingat Kesehatan Anabul
          </h3>
          <p className="text-xs text-slate-500">
            Pengingat vaksin dan obat cacing &amp; kutu untuk hewan peliharaan Anda.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => changeFilter(item.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === item.value
                  ? "bg-slate-900 text-white"
                  : "bg-stone-100 text-slate-600"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            disabled={markAllRead.isPending}
            onClick={() => markAllRead.mutate()}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 text-slate-600 hover:bg-stone-200 transition-all inline-flex items-center gap-1 disabled:opacity-60"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Tandai semua
          </button>
        </div>
      </div>

      {isLoading && (
        <p className="text-xs text-slate-500">Memuat notifikasi…</p>
      )}

      {isError && (
        <p className="text-xs text-red-700">
          Gagal memuat notifikasi. Silakan coba lagi.
        </p>
      )}

      {!isLoading && !isError && items.length === 0 && (
        <div className="py-10 flex flex-col items-center gap-2 text-center text-slate-500">
          <Bell className="w-8 h-8 text-stone-300" />
          <p className="text-sm font-semibold">Belum ada pengingat</p>
          <p className="text-xs">
            Pengingat akan muncul saat jadwal vaksin atau obat cacing anabul Anda mendekat.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {items.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            isMarking={markRead.isPending}
            onMarkRead={(id) => markRead.mutate(id)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 text-xs">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
            className="px-3 py-1.5 rounded-lg bg-stone-100 text-slate-700 font-semibold disabled:opacity-40"
          >
            Sebelumnya
          </button>
          <span className="text-slate-500">
            Halaman {page} dari {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((current) => current + 1)}
            className="px-3 py-1.5 rounded-lg bg-stone-100 text-slate-700 font-semibold disabled:opacity-40"
          >
            Berikutnya
          </button>
        </div>
      )}
    </div>
  );
};

export default MembershipNotificationsSection;

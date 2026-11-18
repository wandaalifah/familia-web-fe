"use client";

import { MessageCircle } from "lucide-react";
import { useUpcomingDuesQuery } from "@/src/services/query/admin/medical-records/list";

const DUE_WINDOW_DAYS = 14;

const buildWhatsAppLink = (phone: string, message: string) => {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
};

const UpcomingDuesBanner = () => {
  const { data } = useUpcomingDuesQuery({
    page: 1,
    limit: 5,
    days: DUE_WINDOW_DAYS,
  });
  const upcoming = data ?? [];

  if (upcoming.length === 0) return null;

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
      <p className="text-sm font-semibold text-amber-900">
        {upcoming.length} upcoming due date{upcoming.length === 1 ? "" : "s"} in the next {DUE_WINDOW_DAYS} days
      </p>
      <ul className="mt-2 flex flex-col gap-2">
        {upcoming.map((row) => (
          <li
            key={row.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 text-sm"
          >
            <span className="text-[#1A1A1A]">
              <strong className="font-medium">{row.pet.name}</strong> — {row.title} due{" "}
              {new Date(row.next_due_date as Date).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
              })}{" "}
              <span className="text-[#6B7280]">
                ({row.pet.users.first_name} {row.pet.users.last_name})
              </span>
            </span>
            <a
              href={buildWhatsAppLink(
                row.pet.users.phone,
                `Halo ${row.pet.users.first_name}, pengingat jadwal ${row.title} untuk ${row.pet.name} akan datang. Terima kasih! — Familia Vet & Care`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
            >
              <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
              Remind via WhatsApp
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingDuesBanner;

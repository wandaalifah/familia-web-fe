import { MedicalRecordType } from "@/src/interfaces/admin/medical-records/list";

// Mirrors the backend rules (familia-be: common/vaccines/vaccine-schedule.ts).
// The backend is the source of truth; this only powers the form preview.
export const BASIC_VACCINE_DOSES = 3;
export const ROUTINE_DEWORMING_INTERVAL_DAYS = 30;

const pad = (value: number) => String(value).padStart(2, "0");

const toDateInput = (date: Date) =>
  `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;

// Adds calendar months in UTC, clamping to the last day (31 Jan + 1 month = 28/29 Feb).
const addMonths = (date: Date, months: number): Date => {
  const target = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1),
  );
  const lastDay = new Date(
    Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0),
  ).getUTCDate();
  target.setUTCDate(Math.min(date.getUTCDate(), lastDay));
  return target;
};

/** Whether next_due_date is derived automatically for this record type. */
export const hasAutoNextDueDate = (type: MedicalRecordType): boolean =>
  type === "VACCINE" || type === "DEWORMING";

/**
 * Next due date as a `YYYY-MM-DD` string, or null when it cannot be derived yet.
 * VACCINE: dose 1-3 -> +1 month, dose 4+ -> +12 months. DEWORMING: +30 days.
 */
export const calculateNextDueDate = (
  type: MedicalRecordType,
  administeredAt: string,
  doseNumber?: number | null,
): string | null => {
  // Accepts both `YYYY-MM-DD` and datetime-local `YYYY-MM-DDTHH:mm`; only the date part matters.
  const base = new Date(`${administeredAt.slice(0, 10)}T00:00:00Z`);
  if (!administeredAt || Number.isNaN(base.getTime())) return null;

  if (type === "VACCINE") {
    if (!doseNumber || doseNumber < 1) return null;
    return toDateInput(addMonths(base, doseNumber <= BASIC_VACCINE_DOSES ? 1 : 12));
  }

  if (type === "DEWORMING") {
    const next = new Date(base);
    next.setUTCDate(next.getUTCDate() + ROUTINE_DEWORMING_INTERVAL_DAYS);
    return toDateInput(next);
  }

  return null;
};

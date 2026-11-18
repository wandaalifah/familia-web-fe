const pad = (value: number) => String(value).padStart(2, "0");

/** Formats a Date as the local `YYYY-MM-DDTHH:mm` string used by <input type="datetime-local">. */
const formatLocalInput = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
  `T${pad(date.getHours())}:${pad(date.getMinutes())}`;

/** Current local time as a datetime-local input value. */
export const nowDateTimeLocal = (): string => formatLocalInput(new Date());

/** API ISO datetime (UTC) -> datetime-local input value in the browser's timezone. */
export const toDateTimeLocalInput = (value: Date | string | null): string => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : formatLocalInput(date);
};

/** datetime-local input value (browser timezone) -> ISO datetime ending in Z for the API. */
export const localInputToIso = (value: string): string =>
  new Date(value).toISOString();

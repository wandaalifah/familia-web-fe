export const calculateAge = (birthdateStr: string): string => {
  const birth = new Date(birthdateStr);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  if (years === 0) return `${months} Bulan`;
  return `${years} Thn ${months > 0 ? `${months} Bln` : ""}`;
};

/** Formats an API date (ISO string/Date) like "15 Jan 2022" in Indonesian locale; "-" when missing. */
export const formatShortDate = (value?: Date | string | null): string => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
};

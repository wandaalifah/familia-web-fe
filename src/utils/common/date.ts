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

export function normalizeDateValue(value: unknown): string {
  if (value === undefined || value === null) return "";

  const str = String(value).trim();
  if (!str) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

  const slashMatch = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (slashMatch) {
    const day = Number(slashMatch[1]);
    const month = Number(slashMatch[2]);
    const yearPart = slashMatch[3];
    const year = yearPart.length === 2 ? 2000 + Number(yearPart) : Number(yearPart);

    const date = new Date(Date.UTC(year, month - 1, day));
    const yyyy = String(date.getUTCFullYear());
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(date.getUTCDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  const parsed = new Date(str);
  if (!Number.isNaN(parsed.getTime())) {
    const yyyy = String(parsed.getUTCFullYear());
    const mm = String(parsed.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(parsed.getUTCDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  return str;
}

export function parseDateValue(value: unknown): Date | null {
  const normalized = normalizeDateValue(value);
  if (!normalized) return null;

  const [year, month, day] = normalized.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return Number.isNaN(date.getTime()) ? null : date;
}

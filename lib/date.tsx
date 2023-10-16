import { format, isThisYear } from "date-fns";
import { cs } from "date-fns/locale";

const formatRelativeLocale = {
  lastWeek: "'Poslední' eeee",
  yesterday: "'Včera'",
  today: "'Dnes'",
  tomorrow: "'Zítra'",
  nextWeek: "'Další' eeee",
  other: "d. MMMM yyyy",
};

export const locale = {
  ...cs,
  formatRelative: (
    token:
      | "lastWeek"
      | "yesterday"
      | "today"
      | "tomorrow"
      | "nextWeek"
      | "other"
  ) => formatRelativeLocale[token],
};

export function formattedDate(date: Date) {
  return format(date, isThisYear(date) ? "d. MMM" : "d. MMM yyyy", { locale });
}

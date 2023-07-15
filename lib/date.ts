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

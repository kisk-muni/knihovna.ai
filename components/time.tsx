"use client";
import { formatRelative, format } from "date-fns";
import { locale } from "@/lib/date";

export default function Time({
  date,
  relative = false,
  className,
}: {
  date: Date;
  className?: string;
  relative?: boolean;
}) {
  return (
    <time className={className}>
      {relative
        ? formatRelative(date, new Date(), {
            locale,
          })
        : format(date, "d. MMMM yyyy")}
    </time>
  );
}

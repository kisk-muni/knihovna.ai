"use client";
import { formatRelative, format } from "date-fns";
import { formattedDate, locale } from "@/lib/date";

export default function FormatedDate({
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
        : formattedDate(date)}
    </time>
  );
}

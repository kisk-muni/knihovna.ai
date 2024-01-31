"use client";
import { formatRelative, format } from "date-fns";
import { formattedDate, locale } from "@/lib/date";
import cs from "date-fns/locale/cs";

export default function FormatedDate({
  date,
  relative = false,
  originalRelative = false,
  className,
}: {
  date: Date;
  className?: string;
  relative?: boolean;
  originalRelative?: boolean;
}) {
  return (
    <time className={className}>
      {relative || originalRelative
        ? formatRelative(date, new Date(), {
            locale: relative ? locale : originalRelative ? cs : undefined,
          })
        : formattedDate(date)}
    </time>
  );
}

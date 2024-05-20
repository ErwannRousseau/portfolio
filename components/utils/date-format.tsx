"use client";

import type { Locale } from "@/i18n.config";
import type { Duration } from "@/sanity";
import { useParams } from "next/navigation";

type DateFormatProps = {
  date?: Duration;
  current?: string;
};

export const DateFormat = ({ date, current }: DateFormatProps) => {
  const { lang } = useParams<{ lang: Locale }>();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };

  return (
    <div className="text-right text-sm">
      <time dateTime={date?.start}>
        {date?.start &&
          new Intl.DateTimeFormat(lang, options).format(new Date(date.start))}
      </time>
      {date?.current || (date?.end ? " - " : null)}
      {date?.current && <span className="whitespace-nowrap"> - {current}</span>}
      {date?.end && (
        <time dateTime={date?.end} className="whitespace-nowrap">
          -{" "}
          {date?.end &&
            new Intl.DateTimeFormat(lang).format(new Date(date.end))}
        </time>
      )}
    </div>
  );
};

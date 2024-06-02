"use client";

import type { Locale } from "@/i18n.config";
import type { Duration } from "@/sanity.types";
import { useParams } from "next/navigation";

type DateFormatProps = {
  date: Duration | string | undefined;
  dict?: string;
  isDuration?: boolean;
};

export const DateFormat = ({
  date,
  dict,
  isDuration = false,
}: DateFormatProps) => {
  const { lang } = useParams<{ lang: Locale }>();

  const options: Intl.DateTimeFormatOptions = isDuration
    ? {
        year: "numeric",
        month: "short",
      }
    : {
        year: "numeric",
        month: "long",
        day: "numeric",
      };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat(lang, options).format(new Date(date));
  };

  if (isDuration) {
    const duration = date as Duration;
    return (
      <div className="text-right text-sm">
        <time dateTime={duration.start}>
          {duration.start && formatDate(duration.start)}
        </time>
        {duration.current || (duration.end ? " - " : null)}
        {duration.current && (
          <span className="whitespace-nowrap"> - {dict}</span>
        )}
        {duration.end && (
          <time dateTime={duration.end} className="whitespace-nowrap">
            - {duration.end && formatDate(duration.end)}
          </time>
        )}
      </div>
    );
  }

  const dateString = date as string;
  return (
    <div className="text-muted-foreground text-xs">
      <time dateTime={dateString}>{formatDate(dateString)}</time>
    </div>
  );
};

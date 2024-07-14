"use server";

import { getCurrentLocale, getI18n } from "@/lib/locales/server";
import type { Duration } from "@/sanity.types";

type DateFormatProps = {
  date: Duration | string | undefined;
  isDuration?: boolean;
};

export const DateFormat = async ({
  date,
  isDuration = false,
}: DateFormatProps) => {
  const t = await getI18n();
  const lang = getCurrentLocale();

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
          <span className="whitespace-nowrap"> - {t("Works.current")}</span>
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

"use client";

import { useState } from "react";

import { CalendarDate, type DateValue, getLocalTimeZone, startOfMonth, today } from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type CalendarDateRange<T extends DateValue = DateValue> = { start: T; end: T };
export type RangeCalendarProps<T extends DateValue = DateValue> = {
  value?: CalendarDateRange<T> | null;
  defaultValue?: CalendarDateRange<T> | null;
  onChange?: (value: CalendarDateRange<T> | null) => void;
  minValue?: T;
  maxValue?: T;
  disabled?: boolean;
  isDateUnavailable?: (date: T) => boolean;
  visibleDuration?: { months: number };
  locale?: string;
  dir?: "ltr" | "rtl";
  className?: string;
  "aria-label"?: string;
};

function asCalendarDate(value: DateValue) {
  return new CalendarDate(value.calendar, value.era, value.year, value.month, value.day);
}

function weekStart(locale: string) {
  return locale === "en-US" || locale === "ja-JP" || locale === "zh-CN" ? 0 : 1;
}

export function RangeCalendar<T extends DateValue = DateValue>({
  value,
  defaultValue = null,
  onChange,
  minValue,
  maxValue,
  disabled = false,
  isDateUnavailable,
  visibleDuration = { months: 1 },
  locale = "en-US",
  dir = "ltr",
  className,
  "aria-label": ariaLabel,
}: RangeCalendarProps<T>) {
  const [internal, setInternal] = useState<CalendarDateRange<T> | null>(defaultValue);
  const range = value === undefined ? internal : value;
  const [month, setMonth] = useState(() => startOfMonth(asCalendarDate(range?.start ?? today(getLocalTimeZone()))));
  const [anchor, setAnchor] = useState<CalendarDate | null>(null);
  const count = Math.max(1, visibleDuration.months);

  const chooseDate = (date: CalendarDate) => {
    const typedDate = date as T;
    if (!anchor) {
      setAnchor(date);
      const next = { start: typedDate, end: typedDate };
      if (value === undefined) setInternal(next);
      onChange?.(next);
      return;
    }
    const start = anchor.compare(date) <= 0 ? anchor : date;
    const end = anchor.compare(date) <= 0 ? date : anchor;
    const next = { start: start as T, end: end as T };
    if (value === undefined) setInternal(next);
    onChange?.(next);
    setAnchor(null);
  };

  const months = Array.from({ length: count }, (_, index) => month.add({ months: index }));

  return (
    <div data-slot="range-calendar" dir={dir} className={cn("w-fit", className)}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label="Previous month"
          disabled={disabled}
          onClick={() => setMonth((current) => current.subtract({ months: 1 }))}
          className="grid size-8 place-content-center rounded-md hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        >
          {dir === "rtl" ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
        <div className="flex gap-8" aria-live="polite">
          {months.map((current) => (
            <h2 key={current.toString()} className="text-sm font-medium">
              {new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: getLocalTimeZone() }).format(
                current.toDate(getLocalTimeZone()),
              )}
            </h2>
          ))}
        </div>
        <button
          type="button"
          aria-label="Next month"
          disabled={disabled}
          onClick={() => setMonth((current) => current.add({ months: 1 }))}
          className="grid size-8 place-content-center rounded-md hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        >
          {dir === "rtl" ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
        </button>
      </div>
      <div className="flex flex-wrap items-start gap-6 sm:gap-10">
        {months.map((current) => {
          const days = current.add({ months: 1 }).subtract({ days: 1 }).day;
          const offset = (current.toDate("UTC").getUTCDay() - weekStart(locale) + 7) % 7;
          const cells = Math.ceil((offset + days) / 7) * 7;
          const headings = Array.from({ length: 7 }, (_, index) => {
            const date = new Date(Date.UTC(2024, 0, 7 + ((weekStart(locale) + index) % 7)));
            return new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(date);
          });
          return (
            <table
              key={current.toString()}
              role="grid"
              aria-label={ariaLabel ?? "Choose date range"}
              className="border-collapse"
            >
              <thead>
                <tr>
                  {headings.map((day, index) => (
                    <th
                      key={`${day}-${index}`}
                      scope="col"
                      className="pb-2 text-center text-xs font-medium text-muted-foreground"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: cells / 7 }, (_, week) => (
                  <tr key={week}>
                    {Array.from({ length: 7 }, (_, column) => {
                      const day = week * 7 + column - offset + 1;
                      if (day < 1 || day > days) return <td key={column} />;
                      const date = current.set({ day });
                      const isStart = Boolean(range && range.start.compare(date) === 0);
                      const isEnd = Boolean(range && range.end.compare(date) === 0);
                      const isInRange = Boolean(
                        range && date.compare(range.start) >= 0 && date.compare(range.end) <= 0,
                      );
                      const dateDisabled =
                        disabled ||
                        Boolean(minValue && date.compare(minValue) < 0) ||
                        Boolean(maxValue && date.compare(maxValue) > 0) ||
                        Boolean(isDateUnavailable?.(date as T));
                      return (
                        <td key={date.toString()} role="gridcell" aria-selected={isInRange} className="p-0.5">
                          <button
                            type="button"
                            disabled={dateDisabled}
                            aria-pressed={isInRange}
                            onClick={() => chooseDate(date)}
                            className={cn(
                              "grid size-9 place-content-center rounded-lg text-sm tabular-nums outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40",
                              isInRange && "bg-primary/15",
                              (isStart || isEnd) && "bg-primary text-primary-foreground hover:bg-primary/90",
                            )}
                          >
                            {date.day}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

import { CalendarDate, type DateValue, getLocalTimeZone, startOfMonth, today } from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface CalendarProps<T extends DateValue = CalendarDate> {
  value?: T | null;
  defaultValue?: T | null;
  onChange?: (value: T | null) => void;
  focusedValue?: T;
  onFocusChange?: (value: T) => void;
  minValue?: T;
  maxValue?: T;
  disabled?: boolean;
  isDateUnavailable?: (date: T) => boolean;
  locale?: string;
  dir?: "ltr" | "rtl";
  className?: string;
  "aria-label"?: string;
}

function asCalendarDate(value: DateValue) {
  return new CalendarDate(value.calendar, value.era, value.year, value.month, value.day);
}

function sameDate(left: DateValue | null | undefined, right: DateValue) {
  return Boolean(left && left.compare(right) === 0);
}

function firstDayOffset(date: CalendarDate, locale: string) {
  const jsDay = date.toDate("UTC").getUTCDay();
  const weekStartsSunday = locale === "en-US" || locale === "ja-JP" || locale === "zh-CN";
  return weekStartsSunday ? jsDay : (jsDay + 6) % 7;
}

export function Calendar<T extends DateValue = CalendarDate>({
  value,
  defaultValue = null,
  onChange,
  focusedValue,
  onFocusChange,
  minValue,
  maxValue,
  disabled = false,
  isDateUnavailable,
  locale = "en-US",
  dir = "ltr",
  className,
  "aria-label": ariaLabel,
}: CalendarProps<T>) {
  const [internalValue, setInternalValue] = useState<T | null>(defaultValue);
  const selectedDate = value === undefined ? internalValue : value;
  const [month, setMonth] = useState(() =>
    startOfMonth(asCalendarDate(focusedValue ?? selectedDate ?? today(getLocalTimeZone()))),
  );
  const [focused, setFocused] = useState(() => asCalendarDate(focusedValue ?? selectedDate ?? month));
  const visibleMonth = startOfMonth(asCalendarDate(focusedValue ?? month));
  const dayCount = visibleMonth.add({ months: 1 }).subtract({ days: 1 }).day;
  const leadingDays = firstDayOffset(visibleMonth, locale);
  const totalCells = Math.ceil((leadingDays + dayCount) / 7) * 7;
  const dates = Array.from({ length: totalCells }, (_, index) => {
    const day = index - leadingDays + 1;
    return day > 0 && day <= dayCount ? visibleMonth.set({ day }) : null;
  });
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: getLocalTimeZone(),
  }).format(visibleMonth.toDate(getLocalTimeZone()));
  const weekStart = locale === "en-US" || locale === "ja-JP" || locale === "zh-CN" ? 0 : 1;
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(Date.UTC(2024, 0, 7 + ((weekStart + index) % 7)));
    return new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(date);
  });

  const setFocusedDate = (date: CalendarDate) => {
    setFocused(date);
    onFocusChange?.(date as T);
    if (date.month !== visibleMonth.month || date.year !== visibleMonth.year) setMonth(startOfMonth(date));
  };

  const selectDate = (date: CalendarDate) => {
    const typedDate = date as T;
    if (value === undefined) setInternalValue(typedDate);
    onChange?.(typedDate);
    setFocusedDate(date);
  };

  return (
    <div data-slot="calendar" dir={dir} className={cn("w-fit", className)}>
      <div data-slot="calendar-header" className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label="Previous month"
          disabled={disabled}
          onClick={() => setFocusedDate(visibleMonth.subtract({ months: 1 }).set({ day: 1 }))}
          className="grid size-8 place-content-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        >
          {dir === "rtl" ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
        <h2 className="text-sm font-medium" aria-live="polite">
          {monthLabel}
        </h2>
        <button
          type="button"
          aria-label="Next month"
          disabled={disabled}
          onClick={() => setFocusedDate(visibleMonth.add({ months: 1 }).set({ day: 1 }))}
          className="grid size-8 place-content-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        >
          {dir === "rtl" ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
        </button>
      </div>
      <table role="grid" aria-label={ariaLabel ?? "Calendar"} className="border-collapse">
        <thead>
          <tr>
            {weekDays.map((day, index) => (
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
          {Array.from({ length: totalCells / 7 }, (_, week) => (
            <tr key={week}>
              {dates.slice(week * 7, week * 7 + 7).map((date, index) => {
                if (!date) return <td key={`${week}-${index}`} />;
                const isSelected = sameDate(selectedDate, date);
                const isToday = sameDate(today(getLocalTimeZone()), date);
                const dateDisabled =
                  disabled ||
                  Boolean(minValue && date.compare(minValue) < 0) ||
                  Boolean(maxValue && date.compare(maxValue) > 0) ||
                  Boolean(isDateUnavailable?.(date as T));
                return (
                  <td key={date.toString()} role="gridcell" aria-selected={isSelected} className="p-0.5">
                    <button
                      type="button"
                      disabled={dateDisabled}
                      aria-label={new Intl.DateTimeFormat(locale, {
                        dateStyle: "full",
                        timeZone: getLocalTimeZone(),
                      }).format(date.toDate(getLocalTimeZone()))}
                      aria-current={isToday ? "date" : undefined}
                      tabIndex={sameDate(focused, date) ? 0 : -1}
                      onFocus={() => setFocusedDate(date)}
                      onKeyDown={(event) => {
                        const offsets: Record<string, number> = {
                          ArrowLeft: -1,
                          ArrowRight: 1,
                          ArrowUp: -7,
                          ArrowDown: 7,
                        };
                        if (offsets[event.key]) {
                          event.preventDefault();
                          setFocusedDate(focused.add({ days: offsets[event.key] }));
                          document
                            .getElementById(
                              `${ariaLabel ?? "calendar"}-${focused.add({ days: offsets[event.key] }).toString()}`,
                            )
                            ?.focus();
                        }
                      }}
                      id={`${ariaLabel ?? "calendar"}-${date.toString()}`}
                      onClick={() => selectDate(date)}
                      className={cn(
                        "relative grid size-9 place-content-center rounded-lg text-sm tabular-nums outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40",
                        isSelected && "bg-primary text-primary-foreground hover:bg-primary/90",
                        isToday &&
                          "after:absolute after:bottom-1 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-primary",
                        isToday && isSelected && "after:bg-primary-foreground",
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
    </div>
  );
}

export const CalendarPrimitive = Calendar;

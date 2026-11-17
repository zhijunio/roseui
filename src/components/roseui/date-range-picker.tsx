"use client";

import { type ReactNode, useMemo, useState } from "react";

import {
  CalendarDate,
  endOfMonth,
  endOfYear,
  getLocalTimeZone,
  startOfMonth,
  startOfYear,
  today,
} from "@internationalized/date";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DateRangeValue {
  start: CalendarDate;
  end: CalendarDate;
}

export interface DateRangePickerProps {
  value?: DateRangeValue | null;
  defaultValue?: DateRangeValue | null;
  onChange?: (value: DateRangeValue | null) => void;
  disabled?: boolean;
  invalid?: boolean;
  errorMessage?: string;
  description?: string;
  className?: string;
  placeholder?: string;
  label?: string;
  minValue?: CalendarDate;
  maxValue?: CalendarDate;
  isDateUnavailable?: (date: CalendarDate) => boolean;
  locale?: string;
  dir?: "ltr" | "rtl";
  icon?: ReactNode;
  startName?: string;
  endName?: string;
  "aria-label"?: string;
}

function usePresets() {
  return useMemo(() => {
    const now = today(getLocalTimeZone());
    const previousMonth = now.subtract({ months: 1 });
    const previousYear = now.subtract({ years: 1 });
    return [
      { label: "Today", range: { start: now, end: now } },
      { label: "Yesterday", range: { start: now.subtract({ days: 1 }), end: now.subtract({ days: 1 }) } },
      { label: "Last week", range: { start: now.subtract({ days: 7 }), end: now.subtract({ days: 1 }) } },
      { label: "This month", range: { start: startOfMonth(now), end: endOfMonth(now) } },
      { label: "Last month", range: { start: startOfMonth(previousMonth), end: endOfMonth(previousMonth) } },
      { label: "This year", range: { start: startOfYear(now), end: endOfYear(now) } },
      { label: "Last year", range: { start: startOfYear(previousYear), end: endOfYear(previousYear) } },
      { label: "All time", range: { start: now.subtract({ years: 10 }), end: now } },
    ];
  }, []);
}

function formatDate(date: CalendarDate, locale: string) {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: getLocalTimeZone() }).format(
    date.toDate(getLocalTimeZone()),
  );
}

function isRangeSelectable(
  range: DateRangeValue,
  minValue?: CalendarDate,
  maxValue?: CalendarDate,
  isDateUnavailable?: (date: CalendarDate) => boolean,
) {
  if (range.start.compare(range.end) > 0) return false;
  for (let date = range.start; date.compare(range.end) <= 0; date = date.add({ days: 1 })) {
    if (
      (minValue && date.compare(minValue) < 0) ||
      (maxValue && date.compare(maxValue) > 0) ||
      isDateUnavailable?.(date)
    )
      return false;
  }
  return true;
}

function parseDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  try {
    return new CalendarDate(year, month, day);
  } catch {
    return null;
  }
}

export function DateRangePicker({
  value,
  defaultValue = null,
  onChange,
  disabled = false,
  invalid = false,
  errorMessage,
  description,
  className,
  placeholder,
  label,
  minValue,
  maxValue,
  isDateUnavailable,
  locale = "en-US",
  dir = "ltr",
  icon,
  startName,
  endName,
  "aria-label": ariaLabel,
}: DateRangePickerProps) {
  const presets = usePresets();
  const controlled = value !== undefined;
  const [internal, setInternal] = useState<DateRangeValue | null>(defaultValue);
  const committed = controlled ? (value ?? null) : internal;
  const [draft, setDraft] = useState<DateRangeValue | null>(committed);
  const [open, setOpen] = useState(false);
  const groupLabel = ariaLabel ?? label ?? "Date range";

  const commit = (next: DateRangeValue | null) => {
    if (!controlled) setInternal(next);
    setDraft(next);
    onChange?.(next);
  };
  const updateDraft = (field: "start" | "end", input: string) => {
    const nextDate = parseDate(input);
    if (!nextDate) {
      setDraft(null);
      return;
    }
    const next = {
      start: field === "start" ? nextDate : (draft?.start ?? nextDate),
      end: field === "end" ? nextDate : (draft?.end ?? nextDate),
    };
    setDraft(next);
  };
  const draftIsCommitted =
    draft === committed ||
    Boolean(draft && committed && draft.start.compare(committed.start) === 0 && draft.end.compare(committed.end) === 0);

  return (
    <div className="grid min-w-0 gap-1.5" dir={dir}>
      {label && <span className="w-fit text-sm font-medium text-foreground">{label}</span>}
      {startName && <input type="hidden" name={startName} value={committed?.start.toString() ?? ""} />}
      {endName && <input type="hidden" name={endName} value={committed?.end.toString() ?? ""} />}
      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (nextOpen) setDraft(committed);
        }}
      >
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-label={groupLabel}
            aria-invalid={invalid || undefined}
            className={cn(
              "flex min-h-11 w-full min-w-0 items-center gap-2 rounded-lg border border-input bg-background px-3 text-left text-sm shadow-sm transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:min-h-10",
              invalid && "border-destructive",
              disabled && "cursor-not-allowed opacity-60",
              className,
            )}
          >
            {icon ?? <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />}
            <span className="truncate">
              {committed
                ? `${formatDate(committed.start, locale)} – ${formatDate(committed.end, locale)}`
                : (placeholder ?? "Select date range")}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[min(34rem,calc(100vw-1rem))] p-3">
          <div className="grid gap-4">
            <fieldset className="grid grid-cols-2 gap-3">
              <legend className="sr-only">{groupLabel}</legend>
              <label className="grid gap-1.5 text-xs font-medium text-muted-foreground">
                Start date
                <input
                  type="date"
                  value={draft?.start.toString() ?? ""}
                  min={minValue?.toString()}
                  max={maxValue?.toString()}
                  disabled={disabled}
                  onChange={(event) => updateDraft("start", event.currentTarget.value)}
                  className="h-9 min-w-0 rounded-md border border-input bg-background px-2 text-sm font-normal text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>
              <label className="grid gap-1.5 text-xs font-medium text-muted-foreground">
                End date
                <input
                  type="date"
                  value={draft?.end.toString() ?? ""}
                  min={minValue?.toString() ?? draft?.start.toString()}
                  max={maxValue?.toString()}
                  disabled={disabled}
                  onChange={(event) => updateDraft("end", event.currentTarget.value)}
                  className="h-9 min-w-0 rounded-md border border-input bg-background px-2 text-sm font-normal text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>
            </fieldset>
            <div className="flex flex-wrap gap-1.5 border-t pt-3">
              {presets.map(({ label: presetLabel, range }) => {
                const isSelectable = isRangeSelectable(range, minValue, maxValue, isDateUnavailable);
                return (
                  <Button
                    key={presetLabel}
                    variant="outline"
                    size="sm"
                    disabled={disabled || !isSelectable}
                    onClick={() => setDraft(range)}
                  >
                    {presetLabel}
                  </Button>
                );
              })}
              <Button
                className="ms-auto"
                variant="ghost"
                size="sm"
                disabled={disabled || !draft}
                onClick={() => setDraft(null)}
              >
                Clear
              </Button>
            </div>
            <div className="flex justify-end gap-2 border-t pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDraft(committed);
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                disabled={
                  disabled ||
                  draftIsCommitted ||
                  Boolean(draft && !isRangeSelectable(draft, minValue, maxValue, isDateUnavailable))
                }
                onClick={() => {
                  commit(draft);
                  setOpen(false);
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {invalid && (
        <p role="alert" className="px-1 text-xs text-destructive">
          {errorMessage ?? "Please select a valid date range."}
        </p>
      )}
      {!invalid && description && <p className="px-1 text-xs text-muted-foreground">{description}</p>}
    </div>
  );
}

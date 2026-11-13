"use client";

import { type ReactNode, useId, useState } from "react";

import { CalendarDate, getLocalTimeZone, type DateValue } from "@internationalized/date";
import { CalendarDays as IconCalendarEvent } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const triggerButtonClassName =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-left text-sm shadow-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:text-[GrayText] forced-colors:border-[ButtonBorder] md:min-h-10";

function toCalendarDate(date: DateValue) {
  return new CalendarDate(date.calendar, date.era, date.year, date.month, date.day);
}

function formatTriggerDate(date: CalendarDate, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: getLocalTimeZone(),
  }).format(date.toDate(getLocalTimeZone()));
}

function DateChipInput({
  date,
  label,
  onCommit,
  disabled,
}: {
  date: CalendarDate;
  label: string;
  onCommit: (date: CalendarDate) => void;
  disabled?: boolean;
}) {
  const formatted = `${String(date.day).padStart(2, "0")}/${String(date.month).padStart(2, "0")}/${date.year}`;
  const [draft, setDraft] = useState({ source: formatted, text: formatted });
  const text = draft.source === formatted ? draft.text : formatted;
  const commit = () => {
    const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(text.trim());
    let parsed: CalendarDate | undefined;
    if (match) {
      try {
        parsed = new CalendarDate(Number(match[3]), Number(match[2]), Number(match[1]));
      } catch {
        parsed = undefined;
      }
    }
    if (parsed) onCommit(parsed);
    setDraft({
      source: formatted,
      text: parsed
        ? `${String(parsed.day).padStart(2, "0")}/${String(parsed.month).padStart(2, "0")}/${parsed.year}`
        : formatted,
    });
  };
  return (
    <input
      type="text"
      dir="ltr"
      inputMode="numeric"
      disabled={disabled}
      value={text}
      onChange={(event) => setDraft({ source: formatted, text: event.currentTarget.value })}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === "Enter") event.currentTarget.blur();
        if (event.key === "Escape") setDraft({ source: formatted, text: formatted });
      }}
      aria-label={label}
      className="h-9 w-[108px] rounded-md border border-input bg-background px-2 text-sm tabular-nums shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}

function sameDate(left: CalendarDate | null, right: CalendarDate | null) {
  if (!left || !right) return left === right;
  return left.compare(right) === 0;
}

function isDateSelectable(
  date: CalendarDate,
  minValue: CalendarDate | undefined,
  maxValue: CalendarDate | undefined,
  isDateUnavailable: ((date: CalendarDate) => boolean) | undefined,
) {
  return (
    !(minValue && date.compare(minValue) < 0) && !(maxValue && date.compare(maxValue) > 0) && !isDateUnavailable?.(date)
  );
}

export interface DatePickerProps {
  value?: CalendarDate | null;
  defaultValue?: CalendarDate | null;
  onChange?: (date: CalendarDate | null) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  minValue?: CalendarDate;
  maxValue?: CalendarDate;
  isDateUnavailable?: (date: CalendarDate) => boolean;
  locale?: string;
  dir?: "ltr" | "rtl";
  name?: string;
  icon?: ReactNode;
  "aria-label"?: string;
}

export function DatePicker({
  value,
  defaultValue = null,
  onChange,
  placeholder,
  className,
  label,
  description,
  errorMessage,
  disabled = false,
  isInvalid = false,
  minValue,
  maxValue,
  isDateUnavailable,
  locale = "en-US",
  dir,
  name,
  icon,
  "aria-label": ariaLabel,
}: DatePickerProps) {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const controlled = value !== undefined;
  const [internal, setInternal] = useState<CalendarDate | null>(defaultValue);
  const committed = controlled ? (value ?? null) : internal;
  const [pending, setPending] = useState<CalendarDate | null>(committed);
  const [open, setOpen] = useState(false);
  const [focusedDate, setFocusedDate] = useState(
    () => committed ?? new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, 1),
  );

  const commit = (next: CalendarDate | null) => {
    if (!controlled) setInternal(next);
    onChange?.(next);
  };
  const commitPendingDate = (next: CalendarDate) => {
    if (isDateSelectable(next, minValue, maxValue, isDateUnavailable)) setPending(next);
  };

  return (
    <div className="grid min-w-0 gap-1.5">
      {label && (
        <label htmlFor={id} className="w-fit text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      {name && <input type="hidden" name={name} value={committed?.toString() ?? ""} />}
      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (nextOpen) {
            setPending(committed);
            setFocusedDate(committed ?? new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, 1));
          }
        }}
      >
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            disabled={disabled}
            aria-label={ariaLabel ?? (label ? undefined : "Date")}
            aria-describedby={isInvalid ? errorId : description ? descriptionId : undefined}
            data-invalid={isInvalid ? "true" : undefined}
            data-state={open ? "open" : "closed"}
            className={cn(
              triggerButtonClassName,
              "w-full",
              isInvalid && "border-destructive focus-visible:ring-destructive/30",
              className,
            )}
          >
            {icon ?? <IconCalendarEvent aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />}
            <span className="truncate">
              {committed ? formatTriggerDate(committed, locale) : (placeholder ?? "Select date")}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="max-h-[min(24rem,calc(100dvh-2rem))] w-auto max-w-[calc(100vw-1rem)] overflow-y-auto p-0"
        >
          <div className="p-3">
            <Calendar<CalendarDate>
              aria-label="Choose date"
              focusedValue={focusedDate}
              onFocusChange={setFocusedDate}
              value={pending}
              onChange={(date) => {
                if (date) commitPendingDate(toCalendarDate(date));
              }}
              isDisabled={disabled}
              isDateUnavailable={(date) => !isDateSelectable(toCalendarDate(date), minValue, maxValue, isDateUnavailable)}
              dir={dir}
            />
            <div className="mt-3 flex items-center justify-between gap-3 border-t pt-3">
              <div>
                {pending && (
                  <DateChipInput date={pending} label="Date" onCommit={commitPendingDate} disabled={disabled} />
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" isDisabled={disabled || !pending} onPress={() => setPending(null)}>
                  Clear
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onPress={() => {
                    setPending(committed);
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  isDisabled={disabled || sameDate(pending, committed)}
                  onPress={() => {
                    commit(pending);
                    setOpen(false);
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {isInvalid && (
        <p id={errorId} role="alert" className="px-1 text-xs text-destructive">
          {errorMessage ?? "Please select a valid date."}
        </p>
      )}
      {!isInvalid && description && (
        <p id={descriptionId} className="px-1 text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

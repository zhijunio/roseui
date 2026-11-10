"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CalendarDate,
  CalendarDateTime,
  endOfMonth,
  endOfYear,
  getLocalTimeZone,
  isSameDay,
  startOfMonth,
  startOfYear,
  today,
  type DateValue,
} from "@internationalized/date";
import {
  IconCalendarEvent,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import {
  Button as AriaButton,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
  DateInput,
  DateRangePicker as AriaDateRangePicker,
  DateSegment,
  Dialog,
  FieldError,
  Group,
  I18nProvider,
  Label,
  Popover as AriaPopover,
  RangeCalendar,
  Text,
} from "react-aria-components";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface DateRangeValue {
  start: CalendarDate;
  end: CalendarDate;
}

interface DateRangePreset {
  label: string;
  range: DateRangeValue;
}

export interface DateRangePickerProps {
  value?: DateRangeValue | null;
  defaultValue?: DateRangeValue | null;
  onChange?: (value: DateRangeValue | null) => void;
  disabled?: boolean;
  isInvalid?: boolean;
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

function usePresets(): DateRangePreset[] {
  return useMemo(() => {
    const now = today(getLocalTimeZone());
    const previousMonth = now.subtract({ months: 1 });
    const previousYear = now.subtract({ years: 1 });
    return [
      { label: "Today", range: { start: now, end: now } },
      {
        label: "Yesterday",
        range: {
          start: now.subtract({ days: 1 }),
          end: now.subtract({ days: 1 }),
        },
      },
      {
        label: "Last week",
        range: {
          start: now.subtract({ days: 7 }),
          end: now.subtract({ days: 1 }),
        },
      },
      {
        label: "This month",
        range: { start: startOfMonth(now), end: endOfMonth(now) },
      },
      {
        label: "Last month",
        range: {
          start: startOfMonth(previousMonth),
          end: endOfMonth(previousMonth),
        },
      },
      {
        label: "This year",
        range: { start: startOfYear(now), end: endOfYear(now) },
      },
      {
        label: "Last year",
        range: {
          start: startOfYear(previousYear),
          end: endOfYear(previousYear),
        },
      },
      {
        label: "All time",
        range: { start: now.subtract({ years: 10 }), end: now },
      },
    ];
  }, []);
}

function sameRange(left: DateRangeValue | null, right: DateRangeValue) {
  return Boolean(
    left &&
    isSameDay(left.start, right.start) &&
    isSameDay(left.end, right.end),
  );
}

function sameCommitted(
  left: DateRangeValue | null,
  right: DateRangeValue | null,
) {
  if (!left || !right) return left === right;
  return isSameDay(left.start, right.start) && isSameDay(left.end, right.end);
}

function daysInRange(range: DateRangeValue) {
  return (
    Math.round(
      (range.end.toDate(getLocalTimeZone()).getTime() -
        range.start.toDate(getLocalTimeZone()).getTime()) /
        86400000,
    ) + 1
  );
}

function isRangeSelectable(
  range: DateRangeValue,
  minValue: CalendarDate | undefined,
  maxValue: CalendarDate | undefined,
  isDateUnavailable: ((date: CalendarDate) => boolean) | undefined,
) {
  if (range.start.compare(range.end) > 0) return false;
  for (
    let date = range.start;
    date.compare(range.end) <= 0;
    date = date.add({ days: 1 })
  ) {
    if (
      (minValue && date.compare(minValue) < 0) ||
      (maxValue && date.compare(maxValue) > 0) ||
      isDateUnavailable?.(date)
    ) {
      return false;
    }
  }
  return true;
}

function asCalendarDate(value: DateValue | null): CalendarDate | null {
  if (!value) return null;
  if (value instanceof CalendarDate) return value;
  if (value instanceof CalendarDateTime)
    return new CalendarDate(
      value.calendar,
      value.era,
      value.year,
      value.month,
      value.day,
    );
  return new CalendarDate(
    value.calendar,
    value.era,
    value.year,
    value.month,
    value.day,
  );
}

export function DateRangePicker({
  value,
  defaultValue = null,
  onChange,
  disabled = false,
  isInvalid = false,
  errorMessage,
  description,
  className,
  placeholder,
  label,
  minValue,
  maxValue,
  isDateUnavailable,
  locale = "en-US",
  dir,
  icon,
  startName,
  endName,
  "aria-label": ariaLabel,
}: DateRangePickerProps) {
  const presets = usePresets();
  const controlled = value !== undefined;
  const [internal, setInternal] = useState<DateRangeValue | null>(defaultValue);
  const committed = controlled ? (value ?? null) : internal;
  const [pending, setPending] = useState<DateRangeValue | null>(committed);
  const [open, setOpen] = useState(false);
  const [twoMonths, setTwoMonths] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const updateTwoMonths = () => setTwoMonths(media.matches);
    updateTwoMonths();
    media.addEventListener("change", updateTwoMonths);
    return () => media.removeEventListener("change", updateTwoMonths);
  }, []);

  const commit = (next: DateRangeValue | null) => {
    if (!controlled) setInternal(next);
    onChange?.(next);
  };
  const setDraft = (next: { start: DateValue; end: DateValue } | null) => {
    const start = asCalendarDate(next?.start ?? null);
    const end = asCalendarDate(next?.end ?? null);
    const converted = start && end ? { start, end } : null;
    setPending(converted);
    if (!open) commit(converted);
  };
  const choosePreset = (range: DateRangeValue) => {
    if (isRangeSelectable(range, minValue, maxValue, isDateUnavailable))
      setPending(range);
  };
  const fieldRange = open ? pending : committed;
  const pendingValue = pending
    ? { start: pending.start, end: pending.end }
    : null;
  const fieldValue = fieldRange
    ? { start: fieldRange.start, end: fieldRange.end }
    : null;
  const groupLabel = ariaLabel ?? label ?? "Date range";
  const unavailableDate = (date: DateValue) => {
    const calendarDate = asCalendarDate(date);
    return Boolean(calendarDate && isDateUnavailable?.(calendarDate));
  };

  return (
    <div className="grid min-w-0 gap-1.5">
      {startName && (
        <input
          type="hidden"
          name={startName}
          value={committed?.start.toString() ?? ""}
        />
      )}
      {endName && (
        <input
          type="hidden"
          name={endName}
          value={committed?.end.toString() ?? ""}
        />
      )}
      <I18nProvider locale={locale}>
        <AriaDateRangePicker
          value={fieldValue}
          defaultValue={
            value === undefined ? (defaultValue ?? undefined) : undefined
          }
          onChange={setDraft}
          isOpen={open}
          onOpenChange={(nextOpen) => {
            if (nextOpen) setPending(committed);
            setOpen(nextOpen);
          }}
          isDisabled={disabled}
          isInvalid={isInvalid}
          minValue={minValue}
          maxValue={maxValue}
          isDateUnavailable={unavailableDate}
          shouldCloseOnSelect={false}
          validationBehavior="aria"
          dir={dir}
          aria-label={groupLabel}
          className="grid min-w-0 gap-1.5"
        >
          {label && (
            <Label className="w-fit text-sm font-medium text-foreground">
              {label}
            </Label>
          )}
          <Group
            className={cn(
              "flex h-10 min-w-0 items-center gap-1.5 rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm transition-colors",
              "hover:bg-accent/40",
              isInvalid && "border-destructive",
              disabled && "cursor-not-allowed bg-muted/50 opacity-60",
              className,
            )}
            data-slot="date-range-picker-group"
          >
            <DateInput
              slot="start"
              aria-label={`${groupLabel} start date`}
              className="flex min-w-0 flex-1 items-center gap-0.5 outline-none"
            >
              {(segment) => (
                <DateSegment
                  segment={segment}
                  className="rounded-sm px-0.5 tabular-nums outline-none focus:bg-accent focus:text-secondary-foreground data-[placeholder]:text-muted-foreground data-[type=literal]:px-0"
                />
              )}
            </DateInput>
            <span aria-hidden="true" className="shrink-0 text-muted-foreground">
              –
            </span>
            <DateInput
              slot="end"
              aria-label={`${groupLabel} end date`}
              className="flex min-w-0 flex-1 items-center gap-0.5 outline-none"
            >
              {(segment) => (
                <DateSegment
                  segment={segment}
                  className="rounded-sm px-0.5 tabular-nums outline-none focus:bg-accent focus:text-secondary-foreground data-[placeholder]:text-muted-foreground data-[type=literal]:px-0"
                />
              )}
            </DateInput>
            <AriaButton
              aria-label={placeholder ?? "Choose date range"}
              className="ml-auto inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              isDisabled={disabled}
            >
              {icon ?? (
                <IconCalendarEvent aria-hidden="true" className="size-4" />
              )}
            </AriaButton>
          </Group>
          <AriaPopover className="max-w-[calc(100vw-1rem)] overflow-auto rounded-xl border border-border bg-popover p-0 text-popover-foreground shadow-lg motion-reduce:animate-none">
            <Dialog aria-label="Choose a date range" className="outline-none">
              <div className="flex flex-col gap-3 p-3 md:flex-row md:gap-4">
                <div className="grid grid-cols-2 gap-1 md:flex md:w-[118px] md:shrink-0 md:flex-col">
                  {presets.map((preset) => {
                    const selectable = isRangeSelectable(
                      preset.range,
                      minValue,
                      maxValue,
                      isDateUnavailable,
                    );
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        disabled={disabled || !selectable}
                        aria-pressed={sameRange(pending, preset.range)}
                        onClick={() => choosePreset(preset.range)}
                        className={cn(
                          "rounded-md px-2.5 py-1.5 text-left text-xs hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                          sameRange(pending, preset.range) &&
                            "bg-muted font-medium",
                        )}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
                <div className="min-w-0">
                  <RangeCalendar
                    aria-label="Select a date range"
                    minValue={minValue}
                    maxValue={maxValue}
                    isDateUnavailable={unavailableDate}
                    isDisabled={disabled}
                    value={pendingValue}
                    onChange={setDraft}
                    visibleDuration={{ months: twoMonths ? 2 : 1 }}
                    className="grid gap-3"
                  >
                    <div
                      className={cn(
                        "grid gap-3",
                        twoMonths && "md:grid-cols-2",
                      )}
                    >
                      <section className="w-[296px] max-w-full rounded-xl border border-border bg-card p-3 shadow-sm">
                        <header className="mb-3 flex items-center justify-between">
                          <AriaButton
                            slot="previous"
                            aria-label="Previous month"
                            className="inline-flex size-8 items-center justify-center rounded-md outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <IconChevronLeft className="size-4" />
                          </AriaButton>
                          <CalendarHeading className="text-sm font-semibold" />
                          {twoMonths && (
                            <span aria-hidden="true" className="size-8" />
                          )}
                        </header>
                        <CalendarGrid
                          weekdayStyle="short"
                          className="w-full table-fixed border-collapse text-center"
                        >
                          <CalendarGridHeader>
                            {(day) => (
                              <CalendarHeaderCell className="pb-1 text-xs font-medium text-muted-foreground">
                                {day}
                              </CalendarHeaderCell>
                            )}
                          </CalendarGridHeader>
                          <CalendarGridBody>
                            {(date) => (
                              <CalendarCell
                                date={date}
                                className={({
                                  isSelected,
                                  isSelectionStart,
                                  isSelectionEnd,
                                  isOutsideMonth,
                                  isDisabled: isCellDisabled,
                                  isUnavailable,
                                  isToday,
                                }) =>
                                  cn(
                                    "mx-auto flex size-8 items-center justify-center rounded-md text-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
                                    isSelected &&
                                      !isSelectionStart &&
                                      !isSelectionEnd &&
                                      "bg-primary/10 text-foreground",
                                    (isSelectionStart || isSelectionEnd) &&
                                      "bg-primary text-primary-foreground hover:bg-primary/90",
                                    isOutsideMonth &&
                                      "text-muted-foreground/40",
                                    isToday && "font-semibold",
                                    isCellDisabled &&
                                      "cursor-not-allowed opacity-40 hover:bg-transparent",
                                    isUnavailable &&
                                      "text-muted-foreground line-through",
                                  )
                                }
                              />
                            )}
                          </CalendarGridBody>
                        </CalendarGrid>
                      </section>
                      {twoMonths && (
                        <section className="w-[296px] max-w-full rounded-xl border border-border bg-card p-3 shadow-sm">
                          <header className="mb-3 flex items-center justify-between">
                            <span aria-hidden="true" className="size-8" />
                            <CalendarHeading
                              offset={{ months: 1 }}
                              className="text-sm font-semibold"
                            />
                            <AriaButton
                              slot="next"
                              aria-label="Next month"
                              className="inline-flex size-8 items-center justify-center rounded-md outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              <IconChevronRight className="size-4" />
                            </AriaButton>
                          </header>
                          <CalendarGrid
                            offset={{ months: 1 }}
                            weekdayStyle="short"
                            className="w-full table-fixed border-collapse text-center"
                          >
                            <CalendarGridHeader>
                              {(day) => (
                                <CalendarHeaderCell className="pb-1 text-xs font-medium text-muted-foreground">
                                  {day}
                                </CalendarHeaderCell>
                              )}
                            </CalendarGridHeader>
                            <CalendarGridBody>
                              {(date) => (
                                <CalendarCell
                                  date={date}
                                  className={({
                                    isSelected,
                                    isSelectionStart,
                                    isSelectionEnd,
                                    isOutsideMonth,
                                    isDisabled: isCellDisabled,
                                    isUnavailable,
                                    isToday,
                                  }) =>
                                    cn(
                                      "mx-auto flex size-8 items-center justify-center rounded-md text-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
                                      isSelected &&
                                        !isSelectionStart &&
                                        !isSelectionEnd &&
                                        "bg-primary/10 text-foreground",
                                      (isSelectionStart || isSelectionEnd) &&
                                        "bg-primary text-primary-foreground hover:bg-primary/90",
                                      isOutsideMonth &&
                                        "text-muted-foreground/40",
                                      isToday && "font-semibold",
                                      isCellDisabled &&
                                        "cursor-not-allowed opacity-40 hover:bg-transparent",
                                      isUnavailable &&
                                        "text-muted-foreground line-through",
                                    )
                                  }
                                />
                              )}
                            </CalendarGridBody>
                          </CalendarGrid>
                        </section>
                      )}
                    </div>
                  </RangeCalendar>
                  <div className="mt-3 flex flex-col gap-3 border-t pt-3 sm:flex-row sm:items-center sm:justify-between">
                    <div
                      className="flex min-h-9 flex-wrap items-center gap-1.5"
                      aria-live="polite"
                    >
                      {pending ? (
                        <>
                          <span className="text-sm tabular-nums">
                            {pending.start.toString()}
                          </span>
                          <span aria-hidden="true">–</span>
                          <span className="text-sm tabular-nums">
                            {pending.end.toString()}
                          </span>
                          <span className="rounded-md bg-muted px-2 py-2 text-xs text-muted-foreground">
                            {daysInRange(pending) === 1
                              ? "1 day selected"
                              : `${daysInRange(pending)} days selected`}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Select a start and end date
                        </span>
                      )}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={disabled || !pending}
                        onClick={() => setPending(null)}
                      >
                        Clear
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setPending(committed);
                          setOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        disabled={disabled || sameCommitted(pending, committed)}
                        onClick={() => {
                          commit(pending);
                          setOpen(false);
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog>
          </AriaPopover>
          {description && (
            <Text
              slot="description"
              className="px-1 text-xs text-muted-foreground"
            >
              {description}
            </Text>
          )}
          {isInvalid && (
            <FieldError className="px-1 text-xs text-destructive">
              {errorMessage ?? "Please select a valid date range."}
            </FieldError>
          )}
        </AriaDateRangePicker>
      </I18nProvider>
    </div>
  );
}

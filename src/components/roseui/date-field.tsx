"use client";

import { type ReactNode, useId, useState } from "react";

import { CalendarDate } from "@internationalized/date";

import { FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type DateFieldGranularity = "day" | "month" | "year";
type DateFieldRenderState = {
  disabled: boolean;
  invalid: boolean;
  readOnly: boolean;
  required: boolean;
  isFocused: boolean;
  isFocusWithin: boolean;
  isFocusVisible: boolean;
};

export interface DateFieldProps {
  label: string;
  value?: CalendarDate | null;
  defaultValue?: CalendarDate | null;
  onChange?: (value: CalendarDate | null) => void;
  description?: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  minValue?: CalendarDate;
  maxValue?: CalendarDate;
  isDateUnavailable?: (date: CalendarDate) => boolean;
  validate?: (date: CalendarDate) => string | true | null | undefined;
  granularity?: DateFieldGranularity;
  name?: string;
  autoComplete?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  className?: string | ((state: DateFieldRenderState) => string);
  inputClassName?: string;
  "aria-label"?: string;
}

function dateInputValue(value: CalendarDate | null, granularity: DateFieldGranularity) {
  if (!value) return "";
  return granularity === "year"
    ? String(value.year)
    : granularity === "month"
      ? value.toString().slice(0, 7)
      : value.toString();
}

function parseDateInput(value: string, granularity: DateFieldGranularity): CalendarDate | null {
  if (!value) return null;
  const normalizedValue = granularity === "year" ? `${value}-01-01` : granularity === "month" ? `${value}-01` : value;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(normalizedValue);
  if (!match) return null;
  try {
    return new CalendarDate(Number(match[1]), Number(match[2]), Number(match[3]));
  } catch {
    return null;
  }
}

export function DateField({
  label,
  value,
  defaultValue = null,
  onChange,
  description,
  errorMessage,
  required = false,
  disabled = false,
  readOnly = false,
  invalid = false,
  minValue,
  maxValue,
  isDateUnavailable,
  validate,
  granularity = "day",
  name,
  autoComplete,
  prefix,
  suffix,
  variant = "primary",
  fullWidth = false,
  className,
  inputClassName,
  "aria-label": ariaLabel,
}: DateFieldProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const current = value === undefined ? internalValue : value;
  const currentError = current ? validate?.(current) : undefined;
  const dateUnavailable = current ? isDateUnavailable?.(current) : false;
  const hasInvalid = invalid || Boolean(currentError && currentError !== true) || Boolean(dateUnavailable);
  const shownError =
    errorMessage ??
    (typeof currentError === "string" ? currentError : undefined) ??
    (dateUnavailable ? "This date is unavailable." : undefined);
  const state = {
    disabled,
    invalid: hasInvalid,
    readOnly,
    required,
    isFocused: focused,
    isFocusWithin: focused,
    isFocusVisible: focused && keyboardFocus,
  };
  const rootClassName = typeof className === "function" ? className(state) : className;
  const dateType = granularity === "year" ? "number" : granularity === "month" ? "month" : "date";
  const min = minValue ? dateInputValue(minValue, granularity) : undefined;
  const max = maxValue ? dateInputValue(maxValue, granularity) : undefined;

  return (
    <div
      data-slot="date-field"
      data-invalid={hasInvalid || undefined}
      data-required={required || undefined}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      className={cn("flex min-w-0 flex-col gap-1.5", fullWidth && "w-full", rootClassName)}
    >
      <Label htmlFor={id} className="w-fit text-sm font-medium text-foreground">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-destructive">
            *
          </span>
        )}
      </Label>
      <div
        data-slot="date-field-group"
        data-variant={variant}
        data-invalid={hasInvalid || undefined}
        data-disabled={disabled || undefined}
        data-focus-within={focused || undefined}
        className={cn(
          "flex h-10 min-w-0 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm text-foreground transition-colors hover:bg-accent/40",
          variant === "primary" && "shadow-sm",
          variant === "secondary" && "bg-muted/40 shadow-none",
          hasInvalid && "border-destructive",
          disabled && "cursor-not-allowed bg-muted/50 opacity-60",
        )}
      >
        {prefix && (
          <span className="shrink-0 text-muted-foreground" aria-hidden="true">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={dateType}
          name={name}
          autoComplete={autoComplete}
          aria-label={ariaLabel ?? label}
          aria-required={required || undefined}
          aria-disabled={disabled || undefined}
          aria-readonly={readOnly || undefined}
          aria-invalid={hasInvalid || undefined}
          min={min}
          max={max}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          value={dateInputValue(current, granularity)}
          onChange={(event) => {
            const next = parseDateInput(event.currentTarget.value, granularity);
            if (value === undefined) setInternalValue(next);
            onChange?.(next);
          }}
          onFocus={(event) => {
            setFocused(true);
            if (event.currentTarget.matches(":focus-visible")) setKeyboardFocus(true);
          }}
          onBlur={() => setFocused(false)}
          onKeyDown={() => setKeyboardFocus(true)}
          onPointerDown={() => setKeyboardFocus(false)}
          data-slot="date-field-input"
          className={cn("h-full min-w-0 flex-1 bg-transparent outline-none focus-visible:ring-0", inputClassName)}
        />
        {suffix && (
          <span className="shrink-0 text-muted-foreground" aria-hidden="true">
            {suffix}
          </span>
        )}
      </div>
      {!hasInvalid && description && <p className="px-1 text-xs text-muted-foreground">{description}</p>}
      {hasInvalid && shownError && <FieldError className="px-1 text-xs">{shownError}</FieldError>}
    </div>
  );
}

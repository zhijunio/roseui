"use client";

import { type ReactNode, useId, useState } from "react";

import { Time as TimeValue } from "@internationalized/date";

import { FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type TimeFieldRenderState = { disabled: boolean; invalid: boolean; readOnly: boolean; required: boolean };
export interface TimeFieldProps {
  label: string;
  value?: TimeValue | null;
  defaultValue?: TimeValue | null;
  onChange?: (value: TimeValue | null) => void;
  description?: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  minValue?: TimeValue;
  maxValue?: TimeValue;
  granularity?: "hour" | "minute" | "second";
  hourCycle?: 12 | 24;
  name?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  className?: string | ((state: TimeFieldRenderState) => string);
  "aria-label"?: string;
}

function toInputValue(value: TimeValue | null, granularity: TimeFieldProps["granularity"]) {
  if (!value) return "";
  const base = `${String(value.hour).padStart(2, "0")}:${String(value.minute).padStart(2, "0")}`;
  return granularity === "second" ? `${base}:${String(value.second).padStart(2, "0")}` : base;
}

function fromInputValue(value: string): TimeValue | null {
  if (!value) return null;
  const [hour, minute, second] = value.split(":").map(Number);
  return new TimeValue(hour ?? 0, minute ?? 0, second ?? 0);
}

export function TimeField({
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
  granularity = "minute",
  hourCycle,
  name,
  prefix,
  suffix,
  variant = "primary",
  fullWidth = false,
  className,
  "aria-label": ariaLabel,
}: TimeFieldProps) {
  const id = useId();
  const [internal, setInternal] = useState(defaultValue);
  const current = value === undefined ? internal : value;
  const state = { disabled, invalid, readOnly, required };
  const rootClassName = typeof className === "function" ? className(state) : className;
  const hasInvalid =
    invalid ||
    Boolean(current && ((minValue && current.compare(minValue) < 0) || (maxValue && current.compare(maxValue) > 0)));
  return (
    <div
      data-slot="time-field"
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
        data-slot="time-field-group"
        data-variant={variant}
        data-invalid={hasInvalid || undefined}
        data-disabled={disabled || undefined}
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
          type="time"
          name={name}
          step={granularity === "second" ? 1 : 60}
          min={minValue ? toInputValue(minValue, granularity) : undefined}
          max={maxValue ? toInputValue(maxValue, granularity) : undefined}
          value={toInputValue(current, granularity)}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-label={ariaLabel ?? label}
          aria-required={required || undefined}
          aria-disabled={disabled || undefined}
          aria-readonly={readOnly || undefined}
          aria-invalid={hasInvalid || undefined}
          data-hour-cycle={hourCycle}
          data-slot="time-field-input"
          onChange={(event) => {
            const next = fromInputValue(event.currentTarget.value);
            if (value === undefined) setInternal(next);
            onChange?.(next);
          }}
          className="h-full min-w-0 flex-1 bg-transparent outline-none focus-visible:ring-0"
        />
        {suffix && (
          <span className="shrink-0 text-muted-foreground" aria-hidden="true">
            {suffix}
          </span>
        )}
      </div>
      {!hasInvalid && description && <p className="px-1 text-xs text-muted-foreground">{description}</p>}
      {hasInvalid && errorMessage && <FieldError className="px-1 text-xs">{errorMessage}</FieldError>}
    </div>
  );
}

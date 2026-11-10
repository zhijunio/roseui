"use client";

import { useId, type ReactNode } from "react";
import type { Time as TimeValue } from "@internationalized/date";
import {
  DateInput as AriaDateInput,
  DateSegment,
  FieldError,
  Label,
  Text,
  TimeField as AriaTimeField,
} from "react-aria-components";
import { cn } from "@/lib/utils";

type TimeFieldRenderState = {
  isDisabled: boolean;
  isInvalid: boolean;
  isReadOnly: boolean;
  isRequired: boolean;
};

export interface TimeFieldProps {
  label: string;
  value?: TimeValue | null;
  defaultValue?: TimeValue | null;
  onChange?: (value: TimeValue | null) => void;
  description?: string;
  errorMessage?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
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

export function TimeField({
  label,
  value,
  defaultValue,
  onChange,
  description,
  errorMessage,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  isInvalid = false,
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
  const state = { isDisabled, isInvalid, isReadOnly, isRequired };
  const rootClassName = typeof className === "function" ? className(state) : className;
  const invalid = isInvalid;

  return (
    <AriaTimeField
      id={id}
      value={value}
      defaultValue={value === undefined ? defaultValue ?? undefined : undefined}
      onChange={onChange}
      minValue={minValue}
      maxValue={maxValue}
      granularity={granularity}
      hourCycle={hourCycle}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isInvalid={invalid}
      name={name}
      aria-label={ariaLabel}
      validationBehavior="native"
      className={cn("flex min-w-0 flex-col gap-1.5", fullWidth && "w-full", rootClassName)}
      data-slot="time-field"
      data-invalid={invalid ? "true" : undefined}
      data-required={isRequired ? "true" : undefined}
      data-disabled={isDisabled ? "true" : undefined}
      data-readonly={isReadOnly ? "true" : undefined}
    >
      <Label className="w-fit text-sm font-medium text-foreground">
        {label}{isRequired && <span aria-hidden="true" className="ml-1 text-destructive">*</span>}
      </Label>
      <div
        className={cn(
          "flex h-10 min-w-0 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm text-foreground transition-colors",
          "hover:bg-accent/40",
          variant === "primary" && "shadow-sm",
          variant === "secondary" && "bg-muted/40 shadow-none",
          invalid && "border-destructive",
          isDisabled && "cursor-not-allowed bg-muted/50 opacity-60",
        )}
        data-slot="time-field-group"
        data-variant={variant}
        data-invalid={invalid ? "true" : undefined}
        data-disabled={isDisabled ? "true" : undefined}
        aria-disabled={isDisabled || undefined}
        aria-invalid={invalid || undefined}
      >
        {prefix && <span className="shrink-0 text-muted-foreground" aria-hidden="true">{prefix}</span>}
        <AriaDateInput
          aria-label={ariaLabel}
          className={cn("flex h-full min-w-0 flex-1 items-center gap-0.5 bg-transparent outline-none", isDisabled && "cursor-not-allowed")}
          data-slot="time-field-input"
        >
          {(segment) => (
            <DateSegment
              segment={segment}
              className={cn(
                "rounded-sm px-0.5 tabular-nums outline-none focus:bg-accent focus:text-secondary-foreground",
                "data-[placeholder]:text-muted-foreground data-[type=literal]:px-0 data-[invalid]:text-destructive",
              )}
            />
          )}
        </AriaDateInput>
        {suffix && <span className="shrink-0 text-muted-foreground" aria-hidden="true">{suffix}</span>}
      </div>
      {!invalid && description && <Text slot="description" className="px-1 text-xs text-muted-foreground">{description}</Text>}
      {invalid && errorMessage && <FieldError className="px-1 text-xs text-destructive">{errorMessage}</FieldError>}
    </AriaTimeField>
  );
}

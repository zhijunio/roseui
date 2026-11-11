"use client";

import { useId, useState, type ReactNode } from "react";
import { CalendarDate, type DateValue } from "@internationalized/date";
import {
  DateField as AriaDateField,
  DateInput as AriaDateInput,
  DateSegment,
  FieldError,
  Label,
  Text,
} from "react-aria-components";
import { cn } from "@/lib/utils";

type DateFieldGranularity = "day" | "month" | "year";
type DateFieldRenderState = {
  isDisabled: boolean;
  isInvalid: boolean;
  isReadOnly: boolean;
  isRequired: boolean;
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
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
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

export function DateField({
  label,
  value,
  defaultValue = null,
  onChange,
  description,
  errorMessage,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  isInvalid = false,
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
  const controlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const current = controlled ? value : internalValue;
  const currentError = current ? validate?.(current) : undefined;
  const dateUnavailable = current ? isDateUnavailable?.(current) : false;
  const invalid = isInvalid || Boolean(currentError && currentError !== true) || Boolean(dateUnavailable);
  const shownError = errorMessage
    ?? (typeof currentError === "string" ? currentError : undefined)
    ?? (dateUnavailable ? "This date is unavailable." : undefined);
  const rootClassName = typeof className === "function"
    ? className({
      isDisabled,
      isInvalid: invalid,
      isReadOnly,
      isRequired,
      isFocused: focused,
      isFocusWithin: focused,
      isFocusVisible: focused && keyboardFocus,
    })
    : className;
  const handleChange = (next: DateValue | null) => {
    const nextDate = next as CalendarDate | null;
    if (!controlled) setInternalValue(nextDate);
    onChange?.(nextDate);
  };

  return (
    <AriaDateField
      id={id}
      value={value}
      defaultValue={value === undefined ? defaultValue ?? undefined : undefined}
      onChange={handleChange}
      minValue={minValue}
      maxValue={maxValue}
      granularity="day"
      isRequired={isRequired}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isInvalid={invalid}
      validate={(next) => {
        const date = next as CalendarDate;
        if (isDateUnavailable?.(date)) return "This date is unavailable.";
        return validate?.(date) ?? true;
      }}
      name={name}
      autoComplete={autoComplete}
      aria-label={ariaLabel}
      validationBehavior="native"
      className={cn("flex min-w-0 flex-col gap-1.5", fullWidth && "w-full", rootClassName)}
      data-slot="date-field"
      data-invalid={invalid ? "true" : undefined}
      data-required={isRequired ? "true" : undefined}
      data-disabled={isDisabled ? "true" : undefined}
      data-readonly={isReadOnly ? "true" : undefined}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={() => setKeyboardFocus(true)}
      onPointerDown={() => setKeyboardFocus(false)}
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
        data-slot="date-field-group"
        data-variant={variant}
        data-invalid={invalid ? "true" : undefined}
        data-disabled={isDisabled ? "true" : undefined}
        data-focus-within={focused ? "true" : undefined}
        aria-disabled={isDisabled || undefined}
        aria-invalid={invalid || undefined}
      >
        {prefix && <span className="shrink-0 text-muted-foreground" aria-hidden="true">{prefix}</span>}
        <AriaDateInput
          aria-label={ariaLabel}
          className={cn(
            "flex h-full min-w-0 flex-1 items-center gap-0.5 bg-transparent outline-none",
            isDisabled && "cursor-not-allowed",
            inputClassName,
          )}
          data-slot="date-field-input"
        >
          {(segment) => {
            const visibleTypes = granularity === "year" ? ["year"] : granularity === "month" ? ["month", "year"] : null;
            return (
            <DateSegment
              segment={segment}
              className={cn(
                visibleTypes && !visibleTypes.includes(segment.type) && "hidden",
                "rounded-sm px-0.5 tabular-nums outline-none",
                "focus:bg-accent focus:text-secondary-foreground",
                "data-[placeholder]:text-muted-foreground data-[type=literal]:px-0",
                "data-[invalid]:text-destructive",
              )}
            />
            );
          }}
        </AriaDateInput>
        {suffix && <span className="shrink-0 text-muted-foreground" aria-hidden="true">{suffix}</span>}
      </div>
      {!invalid && description && <Text slot="description" className="px-1 text-xs text-muted-foreground">{description}</Text>}
      {invalid && shownError && <FieldError className="px-1 text-xs text-destructive">{shownError}</FieldError>}
    </AriaDateField>
  );
}

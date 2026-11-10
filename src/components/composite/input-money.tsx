"use client";

import * as React from "react";
import { IconMinus, IconPlus } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type MoneyInputDetails = {
  currency: string;
  major: number | null;
  formatted: string;
};

type InputMoneyProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "value" | "defaultValue" | "onChange" | "size"
> & {
  label: string;
  hideLabel?: boolean;
  value?: number | null;
  defaultValue?: number | null;
  onValueChange?: (value: number | null, details: MoneyInputDetails) => void;
  currency?: string;
  locale?: string;
  min?: number;
  max?: number;
  quickAdd?: number[];
  description?: string;
  error?: string;
};

function getCurrencyDigits(currency: string, locale: string): number {
  return (
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).resolvedOptions().maximumFractionDigits ?? 2
  );
}

function getCurrencyParts(currency: string, locale: string, digits: number) {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  const parts = formatter.formatToParts(0);
  return {
    formatter,
    symbol: parts
      .filter((part) => part.type === "currency")
      .map((part) => part.value)
      .join(""),
    symbolBefore:
      parts.findIndex((part) => part.type === "currency") <
      parts.findIndex((part) => part.type === "integer"),
  };
}

function parseAmount(text: string, locale: string) {
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  const group = parts.find((part) => part.type === "group")?.value;
  const decimal = parts.find((part) => part.type === "decimal")?.value ?? ".";
  const digitFormatter = new Intl.NumberFormat(locale, { useGrouping: false });
  let normalized = text.trim();
  for (let digit = 0; digit <= 9; digit += 1) {
    const localized = digitFormatter.format(digit);
    if (localized !== String(digit))
      normalized = normalized.replaceAll(localized, String(digit));
  }
  if (group) normalized = normalized.replaceAll(group, "");
  if (decimal !== ".") normalized = normalized.replaceAll(decimal, ".");
  normalized = normalized
    .replace(/[\s\u00a0\u202f]/g, "")
    .replace(/[^\d+\-.]/g, "");
  if (
    !normalized ||
    normalized === "." ||
    normalized === "-" ||
    normalized === "-."
  )
    return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function InputMoney({
  id: providedId,
  label,
  hideLabel = false,
  value,
  defaultValue = null,
  onValueChange,
  currency = "USD",
  locale = "en-US",
  min,
  max,
  quickAdd = [],
  description,
  error,
  disabled,
  className,
  onBlur,
  ...inputProps
}: InputMoneyProps) {
  const generatedId = React.useId();
  const id = providedId ?? generatedId;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const digits = getCurrencyDigits(currency, locale);
  const scale = 10 ** digits;
  const { formatter, symbol, symbolBefore } = getCurrencyParts(
    currency,
    locale,
    digits,
  );
  const numberFormatter = new Intl.NumberFormat(locale, {
    useGrouping: true,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  const [internalValue, setInternalValue] = React.useState<number | null>(
    defaultValue,
  );
  const [draft, setDraft] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const currentValue = value === undefined ? internalValue : value;
  const majorValue = currentValue === null ? null : currentValue / scale;
  const currentText =
    majorValue === null ? "" : numberFormatter.format(majorValue);
  const renderedValue = focused ? draft : currentText;
  const describedBy =
    [
      inputProps["aria-describedby"],
      description ? descriptionId : undefined,
      error ? errorId : undefined,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  function emit(next: number | null) {
    const nextValue = next === null ? null : Math.round(next);
    if (value === undefined) setInternalValue(nextValue);
    const major = nextValue === null ? null : nextValue / scale;
    onValueChange?.(nextValue, {
      currency,
      major,
      formatted: major === null ? "" : formatter.format(major),
    });
  }

  function applyMajor(nextMajor: number) {
    const bounded = Math.min(
      max ?? Infinity,
      Math.max(min ?? -Infinity, Math.round(nextMajor * scale)),
    );
    emit(bounded);
    setDraft(numberFormatter.format(bounded / scale));
  }

  function handleChange(nextText: string) {
    setDraft(nextText);
    const parsed = parseAmount(nextText, locale);
    if (parsed === null) {
      if (!nextText.trim()) emit(null);
      return;
    }
    const minor = Math.round(parsed * scale);
    const bounded = Math.min(
      max ?? Infinity,
      Math.max(min ?? -Infinity, minor),
    );
    emit(bounded);
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    setFocused(false);
    const parsed = parseAmount(draft, locale);
    if (parsed !== null) {
      const minor = Math.round(parsed * scale);
      emit(Math.min(max ?? Infinity, Math.max(min ?? -Infinity, minor)));
    } else if (!draft.trim()) {
      emit(null);
    }
    onBlur?.(event);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    inputProps.onKeyDown?.(event);
    if (
      event.defaultPrevented ||
      disabled ||
      inputProps.readOnly ||
      currentValue === null
    )
      return;
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const step = Number(inputProps.step) > 0 ? Number(inputProps.step) : 1;
      const direction = event.key === "ArrowUp" ? 1 : -1;
      applyMajor(majorValue! + direction * step * (event.shiftKey ? 10 : 1));
    }
  }

  const prefix = symbolBefore ? symbol : "";
  const suffix = symbolBefore ? "" : symbol;

  return (
    <div className={cn("grid min-w-0 gap-2", className)}>
      <Label
        htmlFor={id}
        className={hideLabel ? "sr-only" : undefined}
        isRequired={inputProps.required}
        isDisabled={disabled}
        isInvalid={Boolean(error)}
      >
        {label}
      </Label>
      <div
        className={cn(
          "flex h-9 min-w-0 items-center rounded-[var(--radius-control)] border border-input bg-background focus-within:ring-3 focus-within:ring-ring/50",
          disabled && "opacity-50",
          error && "border-destructive focus-within:ring-destructive/20",
        )}
      >
        {prefix && (
          <span
            aria-hidden="true"
            className="pl-3 text-sm text-muted-foreground"
          >
            {prefix}
          </span>
        )}
        <Input
          {...inputProps}
          id={id}
          type="text"
          inputMode={digits === 0 ? "numeric" : "decimal"}
          role="spinbutton"
          value={renderedValue}
          disabled={disabled}
          aria-label={hideLabel ? label : inputProps["aria-label"]}
          aria-invalid={error ? true : inputProps["aria-invalid"]}
          aria-valuenow={majorValue ?? undefined}
          aria-valuemin={min === undefined ? undefined : min / scale}
          aria-valuemax={max === undefined ? undefined : max / scale}
          aria-valuetext={
            majorValue === null ? "No amount" : formatter.format(majorValue)
          }
          aria-describedby={describedBy}
          className="h-full min-w-0 flex-1 rounded-none border-0 px-2 shadow-none focus-visible:ring-0"
          onFocus={(event) => {
            setDraft(
              currentValue === null
                ? ""
                : numberFormatter.format(currentValue / scale),
            );
            setFocused(true);
            inputProps.onFocus?.(event);
          }}
          onChange={(event) => handleChange(event.currentTarget.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        {suffix && (
          <span
            aria-hidden="true"
            className="pr-3 text-sm text-muted-foreground"
          >
            {suffix}
          </span>
        )}
      </div>
      {description && (
        <p id={descriptionId} className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
      {quickAdd.length > 0 && (
        <div
          className="flex flex-wrap gap-2"
          aria-label={`${label} quick adjustments`}
        >
          {quickAdd.map((amount) => (
            <Button
              key={amount}
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled || inputProps.readOnly}
              onClick={() => applyMajor((majorValue ?? 0) + amount)}
              aria-label={`Add ${formatter.format(amount)}`}
            >
              <IconPlus aria-hidden="true" />
              {formatter.format(amount)}
            </Button>
          ))}
          {currentValue !== null && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={disabled || inputProps.readOnly}
              onClick={() =>
                applyMajor((majorValue ?? 0) - (Number(inputProps.step) || 1))
              }
              aria-label="Decrease amount"
            >
              <IconMinus aria-hidden="true" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export { InputMoney, type InputMoneyProps };

"use client";

import { type ReactNode, useState } from "react";

import { Minus as IconMinus, Plus as IconPlus } from "lucide-react";

import { cn } from "@/lib/utils";

type NumberStepperProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  value?: number;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  disabled?: boolean;
  readOnly?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  locale?: string;
  size?: "sm" | "default" | "lg";
  reversed?: boolean;
  incrementIcon?: ReactNode;
  decrementIcon?: ReactNode;
  incrementLabel?: string;
  decrementLabel?: string;
  onChange?: (value: number) => void;
  onValueChange?: (value: number) => void;
};

export function NumberStepper({
  value,
  defaultValue = 0,
  onChange,
  onValueChange,
  minValue,
  maxValue,
  step = 1,
  disabled = false,
  readOnly = false,
  formatOptions,
  locale = "en-US",
  size = "default",
  reversed = false,
  incrementIcon,
  decrementIcon,
  incrementLabel = "Increase value",
  decrementLabel = "Decrease value",
  className,
  ...props
}: NumberStepperProps) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  const formatter = new Intl.NumberFormat(locale, formatOptions);
  const update = (next: number) => {
    const bounded = Math.max(
      minValue ?? Number.NEGATIVE_INFINITY,
      Math.min(maxValue ?? Number.POSITIVE_INFINITY, next),
    );
    if (value === undefined) setInternal(bounded);
    onChange?.(bounded);
    onValueChange?.(bounded);
  };
  const decrease = () => update(current - step);
  const increase = () => update(current + step);
  return (
    <div
      {...props}
      role="group"
      className={cn(
        "inline-flex min-w-0 items-center rounded-lg border border-input bg-card shadow-xs outline-none transition-colors focus-within:ring-2 focus-within:ring-ring/50 disabled:opacity-50",
        size === "sm" && "h-8",
        size === "default" && "h-9",
        size === "lg" && "h-11",
        disabled && "opacity-50",
        className,
      )}
    >
      <button
        type="button"
        aria-label={reversed ? incrementLabel : decrementLabel}
        disabled={disabled || readOnly || (minValue !== undefined && current <= minValue)}
        onClick={reversed ? increase : decrease}
        className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {reversed
          ? (incrementIcon ?? <IconPlus aria-hidden="true" className="size-4" />)
          : (decrementIcon ?? <IconMinus aria-hidden="true" className="size-4" />)}
      </button>
      <span
        role="spinbutton"
        aria-valuenow={current}
        aria-valuemin={minValue}
        aria-valuemax={maxValue}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(event) => {
          if (readOnly || disabled) return;
          if (event.key === "ArrowUp") {
            event.preventDefault();
            increase();
          }
          if (event.key === "ArrowDown") {
            event.preventDefault();
            decrease();
          }
        }}
        className={cn(
          "min-w-10 px-2 text-center text-sm tabular-nums outline-none",
          size === "sm" && "text-xs",
          size === "lg" && "min-w-14 text-base",
        )}
      >
        {formatter.format(current)}
      </span>
      <input
        type="number"
        tabIndex={-1}
        aria-hidden="true"
        value={current}
        min={minValue}
        max={maxValue}
        step={step}
        readOnly
        className="sr-only"
      />
      <button
        type="button"
        aria-label={reversed ? decrementLabel : incrementLabel}
        disabled={disabled || readOnly || (maxValue !== undefined && current >= maxValue)}
        onClick={reversed ? decrease : increase}
        className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {reversed
          ? (decrementIcon ?? <IconMinus aria-hidden="true" className="size-4" />)
          : (incrementIcon ?? <IconPlus aria-hidden="true" className="size-4" />)}
      </button>
    </div>
  );
}

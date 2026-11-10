import { useId, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type MeterTone = "accent" | "success" | "warning" | "error";
export type MeterSize = "sm" | "md" | "lg";

const toneClasses: Record<MeterTone, string> = {
  accent: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-destructive",
};

const sizeClasses: Record<MeterSize, string> = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2.5",
};

export function Meter({
  label,
  value,
  minValue = 0,
  maxValue = 100,
  valueLabel,
  description,
  tone = "accent",
  size = "md",
  formatOptions,
  ariaLabel,
  className,
  trackClassName,
}: {
  value: number;
  minValue?: number;
  maxValue?: number;
  valueLabel?: string;
  description?: ReactNode;
  tone?: MeterTone;
  size?: MeterSize;
  formatOptions?: Intl.NumberFormatOptions;
  className?: string;
  trackClassName?: string;
} & ({ label: string; ariaLabel?: string } | { label?: never; ariaLabel: string })) {
  const id = useId();
  const minimum = Number.isFinite(minValue) ? minValue : 0;
  const maximum = Number.isFinite(maxValue) && maxValue > minimum ? maxValue : minimum + 100;
  const currentValue = Number.isFinite(value) ? value : minimum;
  const range = maximum - minimum;
  const clampedValue = Math.min(maximum, Math.max(minimum, currentValue));
  const percentage = ((clampedValue - minimum) / range) * 100;
  const formattedValue = formatOptions
    ? new Intl.NumberFormat("en-US", formatOptions).format(currentValue)
    : `${Math.round(percentage)}%`;
  const displayValue = valueLabel ?? formattedValue;

  return (
    <div
      role="meter"
      aria-labelledby={label ? `${id}-label` : undefined}
      aria-label={!label ? ariaLabel : undefined}
      aria-describedby={description ? `${id}-description` : undefined}
      aria-valuemin={minimum}
      aria-valuemax={maximum}
      aria-valuenow={clampedValue}
      aria-valuetext={valueLabel ?? formattedValue}
      className={cn("grid w-full gap-2", className)}
    >
      <div className="flex items-center justify-between gap-4 text-sm">
        {label && <span id={`${id}-label`} className="font-medium text-foreground">{label}</span>}
        <span className="shrink-0 tabular-nums text-muted-foreground">
          {displayValue}
        </span>
      </div>
      <div
        aria-hidden="true"
        className={cn("flex w-full overflow-hidden rounded-full bg-muted", sizeClasses[size], trackClassName)}
      >
        <div
          className={cn("h-full shrink-0 rounded-full transition-[width] duration-300 ease-out motion-reduce:!transition-none", toneClasses[tone])}
          style={{ width: `${percentage}%`, marginInlineEnd: "auto" }}
        />
      </div>
      {description && (
        <p id={`${id}-description`} className="text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

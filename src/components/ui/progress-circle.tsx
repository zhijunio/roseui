import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ProgressCircleTone = "neutral" | "accent" | "success" | "warning" | "error";
export type ProgressCircleSize = "sm" | "md" | "lg";

export type ProgressCircleRenderProps = {
  percentage: number;
  valueText: string;
  isIndeterminate: boolean;
};

type ProgressCircleProps = Omit<
  ComponentProps<"div">,
  "children" | "role" | "aria-valuemin" | "aria-valuemax" | "aria-valuenow"
> & {
  value?: number;
  minValue?: number;
  maxValue?: number;
  isIndeterminate?: boolean;
  size?: ProgressCircleSize;
  tone?: ProgressCircleTone;
  strokeWidth?: number;
  formatOptions?: Intl.NumberFormatOptions;
  children?: ReactNode | ((values: ProgressCircleRenderProps) => ReactNode);
};

const sizeClasses: Record<ProgressCircleSize, string> = {
  sm: "size-5",
  md: "size-7",
  lg: "size-9",
};

const toneClasses: Record<ProgressCircleTone, string> = {
  neutral: "text-foreground",
  accent: "text-primary",
  success: "text-success",
  warning: "text-warning",
  error: "text-destructive",
};

export function ProgressCircle({
  value = 0,
  minValue = 0,
  maxValue = 100,
  isIndeterminate = false,
  size = "md",
  tone = "accent",
  strokeWidth = 4,
  formatOptions,
  className,
  children,
  "aria-valuetext": ariaValueText,
  ...props
}: ProgressCircleProps) {
  const minimum = Number.isFinite(minValue) ? minValue : 0;
  const maximum = Number.isFinite(maxValue) && maxValue > minimum ? maxValue : minimum + 100;
  const currentValue = Number.isFinite(value) ? Math.min(maximum, Math.max(minimum, value)) : minimum;
  const percentage = ((currentValue - minimum) / (maximum - minimum)) * 100;
  const valueText = new Intl.NumberFormat(undefined, {
    style: "percent",
    ...formatOptions,
  }).format(percentage / 100);
  const renderProps = { percentage, valueText, isIndeterminate };
  const content = typeof children === "function" ? children(renderProps) : children;
  const normalizedStrokeWidth = Number.isFinite(strokeWidth) && strokeWidth > 0 && strokeWidth < 32
    ? strokeWidth
    : 4;
  const radius = 18 - normalizedStrokeWidth / 2 - 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = isIndeterminate
    ? circumference * 0.75
    : circumference * (1 - percentage / 100);

  return (
    <div
      {...props}
      data-slot="progress-circle"
      data-size={size}
      data-tone={tone}
      data-indeterminate={isIndeterminate || undefined}
      role="progressbar"
      aria-valuemin={minimum}
      aria-valuemax={maximum}
      aria-valuenow={isIndeterminate ? undefined : currentValue}
      aria-valuetext={isIndeterminate ? ariaValueText : ariaValueText ?? valueText}
      className={cn("relative inline-flex shrink-0 items-center justify-center", sizeClasses[size], toneClasses[tone], className)}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 36 36"
        className={cn("size-full", isIndeterminate && "motion-safe:animate-spin")}
      >
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={normalizedStrokeWidth}
          className="text-border/70"
        />
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={normalizedStrokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 18 18)"
          className={cn("transition-[stroke-dashoffset] duration-300 ease-out motion-reduce:!transition-none", isIndeterminate && "transition-none")}
        />
      </svg>
      {content != null && (
        <span className="absolute inset-0 flex items-center justify-center text-center">
          {content}
        </span>
      )}
    </div>
  );
}

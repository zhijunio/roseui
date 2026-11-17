"use client";

import { createContext, type ReactNode, useContext, useId } from "react";

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

type MeterContextValue = {
  percentage: number;
  displayValue: string;
  labelId?: string;
  descriptionId?: string;
  tone: MeterTone;
  size: MeterSize;
};

const MeterContext = createContext<MeterContextValue | null>(null);

function useMeterContext() {
  const context = useContext(MeterContext);
  if (!context) {
    throw new Error("Meter subcomponents must be used within Meter");
  }
  return context;
}

export function Meter({
  label,
  value,
  minValue = 0,
  maxValue = 100,
  valueLabel,
  description,
  tone,
  size = "md",
  formatOptions,
  ariaLabel,
  className,
  trackClassName,
  children,
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
  children?: ReactNode | ((values: MeterContextValue) => ReactNode);
} & ({ label: string; ariaLabel?: string } | { label?: never; ariaLabel: string })) {
  const id = useId();
  const minimum = Number.isFinite(minValue) ? minValue : 0;
  const maximum = Number.isFinite(maxValue) && maxValue > minimum ? maxValue : minimum + 100;
  const currentValue = Number.isFinite(value) ? value : minimum;
  const range = maximum - minimum;
  const clampedValue = Math.min(maximum, Math.max(minimum, currentValue));
  const percentage = ((clampedValue - minimum) / range) * 100;
  const resolvedTone = tone ?? getMeterTone(percentage);
  const formattedValue = formatOptions
    ? new Intl.NumberFormat("en-US", formatOptions).format(clampedValue)
    : `${Math.round(percentage)}%`;
  const displayValue = valueLabel ?? formattedValue;
  const labelId = label ? `${id}-label` : undefined;
  const descriptionId = description ? `${id}-description` : undefined;
  const contextValue: MeterContextValue = {
    percentage,
    displayValue,
    labelId,
    descriptionId,
    tone: resolvedTone,
    size,
  };

  return (
    <div
      role="meter"
      aria-labelledby={labelId}
      aria-label={!label ? ariaLabel : undefined}
      aria-describedby={descriptionId}
      aria-valuemin={minimum}
      aria-valuemax={maximum}
      aria-valuenow={clampedValue}
      aria-valuetext={valueLabel ?? formattedValue}
      data-slot="meter"
      className={cn(
        "w-full",
        "[&>[data-slot=meter-header]+[data-slot=meter-track]]:mt-2 [&>[data-slot=meter-header]+[data-slot=meter-track]]:mt-2",
        "[&>[data-slot=meter-header]+[slot=description]]:mt-1 [&>[slot=description]+[data-slot=meter-track]]:mt-2",
        "[&>[data-slot=meter-track]+[slot=description]]:mt-2 [&>[data-slot=meter-track]+[slot=errorMessage]]:mt-2",
        "*:data-[slot=meter-header]:font-medium",
        className,
      )}
    >
      <MeterContext.Provider value={contextValue}>
        {children === undefined ? (
          <>
            <MeterHeader>
              {label && (
                <span id={labelId} className="font-medium text-foreground">
                  {label}
                </span>
              )}
              <MeterValue />
            </MeterHeader>
            <MeterTrack className={trackClassName} />
            {description && <MeterDescription>{description}</MeterDescription>}
          </>
        ) : typeof children === "function" ? (
          children(contextValue)
        ) : (
          children
        )}
        {children !== undefined && description && descriptionId && <MeterDescription>{description}</MeterDescription>}
      </MeterContext.Provider>
    </div>
  );
}

export function MeterHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="meter-header"
      className={cn("flex items-center justify-between gap-4 text-sm", className)}
      {...props}
    />
  );
}

export function MeterValue({ className, ...props }: Omit<React.ComponentProps<"span">, "children">) {
  const { displayValue } = useMeterContext();
  return (
    <span data-slot="meter-value" className={cn("shrink-0 tabular-nums text-muted-foreground", className)} {...props}>
      {displayValue}
    </span>
  );
}

export function MeterTrack({ className, ...props }: React.ComponentProps<"div">) {
  const { percentage, tone, size } = useMeterContext();
  return (
    <div
      data-slot="meter-track"
      aria-hidden="true"
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-secondary outline outline-transparent -outline-offset-1 forced-colors:border forced-colors:border-[ButtonBorder] forced-colors:bg-[Canvas]",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      <div
        data-slot="meter-indicator"
        className={cn(
          "absolute start-0 top-0 h-full rounded-full transition-[width] duration-200 ease-linear motion-reduce:transition-none forced-colors:bg-[Highlight]",
          toneClasses[tone],
        )}
        style={{ width: `${percentage}%`, marginInlineEnd: "auto" }}
      />
    </div>
  );
}

export function MeterDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { descriptionId } = useMeterContext();
  return (
    <p
      id={descriptionId}
      slot="description"
      data-slot="meter-description"
      className={cn("text-xs leading-5 text-muted-foreground", className)}
      {...props}
    />
  );
}

export type { MeterContextValue };

function getMeterTone(percentage: number): MeterTone {
  if (percentage < 50) return "success";
  if (percentage < 80) return "warning";
  return "error";
}

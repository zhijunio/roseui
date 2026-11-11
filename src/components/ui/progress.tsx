"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type ProgressSize = "sm" | "md" | "lg"
type ProgressTone = "neutral" | "accent" | "success" | "warning" | "error"

const sizeClasses: Record<ProgressSize, string> = {
  sm: "h-1 rounded-sm",
  md: "h-2 rounded-full",
  lg: "h-3 rounded-md",
}

const toneClasses: Record<ProgressTone, string> = {
  neutral: "bg-foreground",
  accent: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-destructive",
}

function Progress({
  className,
  value,
  minValue = 0,
  maxValue,
  max = 100,
  size = "md",
  tone = "accent",
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  minValue?: number
  maxValue?: number
  size?: ProgressSize
  tone?: ProgressTone
}) {
  const minimum = Number.isFinite(minValue) ? minValue : 0
  const requestedMaximum = maxValue ?? max
  const maximum = Number.isFinite(requestedMaximum) && requestedMaximum > minimum
    ? requestedMaximum
    : minimum + 100
  const currentValue = typeof value === "number" && Number.isFinite(value)
    ? Math.min(maximum, Math.max(minimum, value))
    : null
  const isIndeterminate = currentValue === null
  const percentage = isIndeterminate
    ? 0
    : ((currentValue - minimum) / (maximum - minimum)) * 100

  return (
    <ProgressPrimitive.Root
      {...props}
      data-slot="progress"
      data-size={size}
      data-tone={tone}
      data-indeterminate={isIndeterminate || undefined}
      value={currentValue}
      max={maximum}
      aria-valuemin={minimum}
      aria-valuemax={maximum}
      aria-valuenow={isIndeterminate ? undefined : currentValue}
      className={cn(
        "relative flex w-full items-center overflow-hidden bg-muted",
        sizeClasses[size],
        className
      )}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "absolute inset-y-0 left-0 rounded-[inherit] motion-safe:transition-[width] motion-safe:duration-300 motion-safe:ease-out motion-reduce:!transition-none",
          toneClasses[tone],
          isIndeterminate && "w-2/5 motion-safe:animate-progress-bar-indeterminate"
        )}
        style={isIndeterminate ? undefined : { width: `${percentage}%` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }

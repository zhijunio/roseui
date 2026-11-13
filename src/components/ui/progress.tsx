"use client"

import * as React from "react"
import {
  ProgressBar as ProgressPrimitive,
  type ProgressBarProps as ProgressPrimitiveProps,
  type ProgressBarRenderProps,
} from "react-aria-components/ProgressBar"

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

type ProgressContextValue = ProgressBarRenderProps & {
  size: ProgressSize
  tone: ProgressTone
}

const ProgressContext = React.createContext<ProgressContextValue | null>(null)

function useProgressContext() {
  const context = React.useContext(ProgressContext)
  if (!context) {
    throw new Error("Progress subcomponents must be used within Progress")
  }
  return context
}

function ProgressIndicator({
  percentage,
  isIndeterminate,
  tone,
  className,
}: {
  percentage: number
  isIndeterminate: boolean
  tone: ProgressTone
  className?: string
}) {
  return (
    <span
      data-slot="progress-indicator"
      className={cn(
        "absolute inset-y-0 start-0 rounded-[inherit] motion-safe:transition-[width] motion-safe:duration-300 motion-safe:ease-out motion-reduce:!transition-none forced-colors:bg-[Highlight]",
        toneClasses[tone],
        isIndeterminate && "w-2/5 motion-safe:animate-progress-bar-indeterminate",
        className,
      )}
      style={isIndeterminate ? undefined : { width: `${percentage}%` }}
    />
  )
}

function Progress({
  className,
  value,
  minValue = 0,
  maxValue,
  max = 100,
  size = "md",
  tone = "accent",
  children,
  ...props
}: Omit<ProgressPrimitiveProps, "value" | "minValue" | "maxValue" | "children"> & {
  value?: number | null
  minValue?: number
  maxValue?: number
  max?: number
  size?: ProgressSize
  tone?: ProgressTone
  children?: React.ReactNode | ((values: ProgressBarRenderProps) => React.ReactNode)
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

  if (children !== undefined) {
    return (
      <ProgressPrimitive
        {...props}
        data-slot="progress"
        data-size={size}
        data-tone={tone}
        data-indeterminate={isIndeterminate || undefined}
        value={currentValue ?? undefined}
        minValue={minimum}
        maxValue={maximum}
        className={cn("flex w-full flex-col gap-2", className)}
      >
        {(values) => {
          const contextValue = { ...values, size, tone }
          return (
            <ProgressContext.Provider value={contextValue}>
              {typeof children === "function" ? children(contextValue) : children}
            </ProgressContext.Provider>
          )
        }}
      </ProgressPrimitive>
    )
  }

  return (
    <ProgressPrimitive
      {...props}
      data-slot="progress"
      data-size={size}
      data-tone={tone}
      data-indeterminate={isIndeterminate || undefined}
      value={currentValue ?? undefined}
      minValue={minimum}
      maxValue={maximum}
      className={cn(
        "relative flex w-full items-center overflow-hidden bg-muted forced-colors:border forced-colors:border-[ButtonBorder] forced-colors:bg-[Canvas]",
        sizeClasses[size],
        className
      )}
    >
      <ProgressIndicator percentage={percentage ?? 0} isIndeterminate={isIndeterminate} tone={tone} />
    </ProgressPrimitive>
  )
}

function ProgressHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="progress-header"
      className={cn("flex items-center justify-between gap-4 text-sm", className)}
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: Omit<React.ComponentProps<"span">, "children">) {
  const { valueText } = useProgressContext()
  return (
    <span
      data-slot="progress-value"
      className={cn("shrink-0 tabular-nums text-muted-foreground", className)}
      {...props}
    >
      {valueText}
    </span>
  )
}

function ProgressTrack({ className, ...props }: React.ComponentProps<"div">) {
  const { percentage, isIndeterminate, size, tone } = useProgressContext()
  return (
    <div
      data-slot="progress-track"
      className={cn("relative flex w-full items-center overflow-hidden bg-muted forced-colors:border forced-colors:border-[ButtonBorder] forced-colors:bg-[Canvas]", sizeClasses[size], className)}
      {...props}
    >
      <ProgressIndicator percentage={percentage ?? 0} isIndeterminate={isIndeterminate} tone={tone} />
    </div>
  )
}

export { Progress, ProgressHeader, ProgressValue, ProgressTrack }
export type { ProgressSize, ProgressTone }

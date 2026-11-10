"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type TimelineOrientation = "vertical" | "horizontal"
export type TimelineStatus = "default" | "current" | "success" | "warning" | "danger" | "muted"
type TimelineContextValue = { activeStep: number; orientation: TimelineOrientation }
const TimelineContext = React.createContext<TimelineContextValue>({ activeStep: 0, orientation: "vertical" })

export function Timeline({
  children,
  className,
  orientation = "vertical",
  value = 1,
  ...props
}: React.ComponentProps<"ol"> & {
  orientation?: TimelineOrientation
  value?: number
}) {
  return (
    <TimelineContext.Provider value={{ activeStep: value, orientation }}>
      <ol
        data-orientation={orientation}
        data-slot="timeline"
        className={cn(
          "group/timeline flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </ol>
    </TimelineContext.Provider>
  )
}

export function TimelineItem({ step, status = "default", children, className, ...props }: React.ComponentProps<"li"> & { step: number; status?: TimelineStatus }) {
  const { activeStep, orientation } = React.useContext(TimelineContext)
  const horizontal = orientation === "horizontal"
  const complete = step <= activeStep
  return (
    <li
      data-step={step}
      data-status={status}
      aria-current={status === "current" ? "true" : undefined}
      data-completed={complete || undefined}
      data-slot="timeline-item"
      className={cn(
        "group/timeline-item has-[+[data-completed]]:**:data-[slot=timeline-separator]:bg-primary relative flex min-w-0 flex-col gap-0.5",
        horizontal
          ? "mt-8 flex-1 px-2 group-data-[orientation=horizontal]/timeline:not-last:pe-8"
          : "ms-8 group-data-[orientation=vertical]/timeline:not-last:pb-6 group-data-[orientation=vertical]/timeline:last:pb-0",
        status === "success" && "[&_[data-slot=timeline-indicator]]:border-success [&_[data-slot=timeline-indicator]]:bg-success/10 [&_[data-slot=timeline-indicator]]:text-success",
        status === "current" && "[&_[data-slot=timeline-indicator]]:border-primary [&_[data-slot=timeline-indicator]]:bg-primary/10 [&_[data-slot=timeline-indicator]]:text-primary",
        status === "warning" && "[&_[data-slot=timeline-indicator]]:border-warning [&_[data-slot=timeline-indicator]]:bg-warning/10 [&_[data-slot=timeline-indicator]]:text-warning",
        status === "danger" && "[&_[data-slot=timeline-indicator]]:border-destructive [&_[data-slot=timeline-indicator]]:bg-destructive/10 [&_[data-slot=timeline-indicator]]:text-destructive",
        status === "muted" && "[&_[data-slot=timeline-indicator]]:border-muted-foreground/40 [&_[data-slot=timeline-indicator]]:bg-muted [&_[data-slot=timeline-indicator]]:text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </li>
  )
}

export function TimelineHeader({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("relative flex min-w-0 flex-col gap-0.5", className)} data-slot="timeline-header" {...props}>
      {children}
    </div>
  )
}

export function TimelineTitle({ children, className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3 className={cn("text-sm font-medium text-foreground", className)} data-slot="timeline-title" {...props}>
      {children}
    </h3>
  )
}

export function TimelineDate({ children, className, ...props }: React.ComponentProps<"time">) {
  return (
    <time className={cn("mb-1 block text-xs font-medium text-muted-foreground", className)} data-slot="timeline-date" {...props}>
      {children}
    </time>
  )
}

export function TimelineIndicator({ children, className, ...props }: React.ComponentProps<"span">) {
  const { orientation } = React.useContext(TimelineContext)
  const horizontal = orientation === "horizontal"
  return (
    <span
      aria-hidden="true"
      data-slot="timeline-indicator"
      className={cn(
        "absolute z-10 size-4 shrink-0 rounded-full border-2 border-primary/20 bg-transparent group-data-completed/timeline-item:border-primary",
        horizontal
          ? "-top-6 left-0 -translate-y-1/2 group-data-[orientation=horizontal]/timeline:-top-6"
          : "top-0 -left-6 -translate-x-1/2 group-data-[orientation=vertical]/timeline:-left-6",
        "[&>svg]:size-2.5 [&>svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export function TimelineSeparator({ className, ...props }: React.ComponentProps<"span">) {
  const { orientation } = React.useContext(TimelineContext)
  const horizontal = orientation === "horizontal"
  return (
    <span
      aria-hidden="true"
      data-slot="timeline-separator"
      className={cn(
        "absolute self-start bg-primary/10 group-last/timeline-item:hidden",
        horizontal
          ? "-top-6 left-0 h-0.5 w-[calc(100%-1rem-0.25rem)] translate-x-4.5 -translate-y-1/2 group-data-[orientation=horizontal]/timeline:-top-6"
          : "-left-6 top-4 h-[calc(100%-1rem-0.25rem)] w-0.5 -translate-x-1/2 translate-y-4.5 group-data-[orientation=vertical]/timeline:-left-6",
        className,
      )}
      {...props}
    />
  )
}

export function TimelineContent({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("text-sm text-muted-foreground", className)} data-slot="timeline-content" {...props}>
      {children}
    </div>
  )
}

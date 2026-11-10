"use client"

import * as React from "react"
import { IconGripHorizontal, IconGripVertical } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

type ResizableHandleType = "line" | "drag" | "pill" | "handle"
type ResizableHandleVariant = "default" | "primary" | "secondary" | "tertiary"

/** A dependency-free, keyboard accessible two-panel splitter. */
export function Resizable({
  first,
  second,
  orientation = "horizontal",
  initialSize = 50,
  minSize = 15,
  maxSize = 85,
  onSizeChange,
  disabled = false,
  handleType = "pill",
  handleVariant = "default",
  withIndicator = false,
  className,
  handleClassName,
}: {
  first: React.ReactNode
  second: React.ReactNode
  orientation?: "horizontal" | "vertical"
  initialSize?: number
  minSize?: number
  maxSize?: number
  onSizeChange?: (size: number) => void
  disabled?: boolean
  handleType?: ResizableHandleType
  handleVariant?: ResizableHandleVariant
  withIndicator?: boolean
  className?: string
  handleClassName?: string
}) {
  const minimum = Number.isFinite(minSize) ? minSize : 15
  const maximum = Number.isFinite(maxSize) ? Math.max(minimum, maxSize) : Math.max(minimum, 85)
  const [size, setSize] = React.useState(() => Math.max(minimum, Math.min(maximum, Number.isFinite(initialSize) ? initialSize : 50)))
  const rootRef = React.useRef<HTMLDivElement>(null)
  const vertical = orientation === "vertical"
  const indicatorClassName = {
    default: "bg-muted/50 group-hover:bg-foreground/80 group-focus-visible:bg-foreground/80",
    primary: "bg-primary",
    secondary: "bg-secondary-foreground/55",
    tertiary: "bg-muted/35",
  }[handleVariant]
  const showGrip = handleType === "drag" || withIndicator

  const updateSize = React.useCallback((next: number) => {
    if (disabled || !Number.isFinite(next)) return
    const value = Math.max(minimum, Math.min(maximum, next))
    setSize(value)
    onSizeChange?.(value)
  }, [disabled, minimum, maximum, onSizeChange])

  const resizeFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return
    event.preventDefault()
    const root = rootRef.current
    if (!root) return
    const rect = root.getBoundingClientRect()
    const coordinate = vertical ? event.clientY : event.clientX
    const origin = vertical ? rect.top : rect.left
    const extent = vertical ? rect.height : rect.width
    if (extent <= 0) return
    const move = (pointer: PointerEvent) => {
      const point = vertical ? pointer.clientY : pointer.clientX
      updateSize(((point - origin) / extent) * 100)
    }
    const pointerId = event.pointerId
    const stop = (pointer: PointerEvent) => {
      if (pointer.pointerId !== pointerId) return
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", stop)
      window.removeEventListener("pointercancel", stop)
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    move({ clientX: event.clientX, clientY: event.clientY } as PointerEvent)
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", stop)
    window.addEventListener("pointercancel", stop)
    void coordinate
  }

  return (
    <div
      ref={rootRef}
      data-orientation={orientation}
      className={cn("flex min-h-48 min-w-0 overflow-hidden rounded-lg border border-border", vertical ? "flex-col" : "flex-row", className)}
    >
      <div className="min-h-0 min-w-0 overflow-auto" style={{ flexBasis: `${size}%`, flexGrow: 0, flexShrink: 0 }}>{first}</div>
      <div
        role="separator"
        aria-label="Resize panels"
        aria-orientation={vertical ? "horizontal" : "vertical"}
        aria-valuemin={minimum}
        aria-valuemax={maximum}
        aria-valuenow={Math.round(size)}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onPointerDown={resizeFromPointer}
        onKeyDown={(event) => {
          const negative = vertical ? "ArrowUp" : "ArrowLeft"
          const positive = vertical ? "ArrowDown" : "ArrowRight"
          if (disabled) return
          if (event.key === negative) { event.preventDefault(); updateSize(size - 3) }
          if (event.key === positive) { event.preventDefault(); updateSize(size + 3) }
          if (event.key === "Home") { event.preventDefault(); updateSize(minimum) }
          if (event.key === "End") { event.preventDefault(); updateSize(maximum) }
        }}
        className={cn(
          "group relative z-10 flex shrink-0 touch-none items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          handleType === "pill" || handleType === "handle"
            ? "bg-transparent"
            : handleVariant === "primary"
              ? "bg-primary/40"
              : handleVariant === "secondary"
                ? "bg-secondary"
                : handleVariant === "tertiary"
                  ? "bg-muted/20"
                  : "bg-border",
          vertical ? "h-px w-full cursor-row-resize" : "w-px cursor-col-resize",
          handleType === "handle" && (vertical ? "-my-1 h-2" : "-mx-1 w-2"),
          disabled && "cursor-not-allowed opacity-50",
          handleClassName,
        )}
      >
        {showGrip ? (
          <span className={cn("relative z-10 grid place-items-center rounded-full border border-border bg-background p-1 text-muted-foreground shadow-xs", vertical ? "h-4 w-8" : "h-8 w-4")}>
            {vertical
              ? <IconGripHorizontal aria-hidden="true" className="size-3" />
              : <IconGripVertical aria-hidden="true" className="size-3" />}
          </span>
        ) : handleType !== "line" ? (
          <span className={cn(
            "rounded-full motion-safe:transition-[width,height] duration-200",
            indicatorClassName,
            vertical ? handleType === "pill" ? "h-1 w-10" : "h-1.5 w-12" : handleType === "pill" ? "h-10 w-1" : "h-12 w-1.5",
          )} />
        ) : null}
      </div>
      <div className="min-h-0 min-w-0 flex-1 overflow-auto">{second}</div>
    </div>
  )
}

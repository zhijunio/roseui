"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { Slider as SliderPrimitive } from "radix-ui"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type ElasticSliderProps = {
  label: string
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  onValueCommit?: (value: number) => void
  formatValue?: (value: number) => string
  marks?: number[]
  startIcon?: ReactNode
  endIcon?: ReactNode
  disabled?: boolean
  className?: string
}

export function ElasticSlider({ label, min = 0, max = 100, step = 1, value, defaultValue = min, onValueChange, onValueCommit, formatValue = String, marks = [], startIcon, endIcon, disabled, className }: ElasticSliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [dragging, setDragging] = React.useState(false)
  const [overshoot, setOvershoot] = React.useState(0)
  const trackRef = React.useRef<HTMLSpanElement>(null)
  const current = value ?? internalValue
  const reducedMotion = useReducedMotion()
  const safeRange = Math.max(1, max - min)
  const clamped = Math.min(max, Math.max(min, current))
  const atEdge = clamped === min || clamped === max
  const safeMarks = marks.filter((mark) => mark >= min && mark <= max)

  function change(values: number[]) {
    const next = values[0] ?? min
    if (value === undefined) setInternalValue(next)
    onValueChange?.(next)
  }

  function updateOvershoot(event: React.PointerEvent<HTMLSpanElement>) {
    if (!dragging || !trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const excess = event.clientX < rect.left
      ? -(rect.left - event.clientX)
      : event.clientX > rect.right
        ? event.clientX - rect.right
        : 0
    setOvershoot(Math.sign(excess) * Math.min(0.32, Math.abs(excess) / Math.max(1, rect.width)))
  }

  return (
    <div data-slot="elastic-slider" className={cn("grid w-full gap-3", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-medium">{label}</span>
        <output className="text-lg font-semibold tabular-nums text-foreground" aria-live="off">{formatValue(clamped)}</output>
      </div>
      <div className="flex items-center gap-3">
      {startIcon && <span aria-hidden="true" className="shrink-0 text-muted-foreground">{startIcon}</span>}
      <SliderPrimitive.Root
        min={min} max={max} step={step} value={[clamped]} disabled={disabled}
        onValueChange={change} onValueCommit={(values) => onValueCommit?.(values[0] ?? min)}
        onPointerDown={() => { setDragging(true); setOvershoot(0) }} onPointerMove={updateOvershoot} onPointerUp={() => { setDragging(false); setOvershoot(0) }} onPointerCancel={() => { setDragging(false); setOvershoot(0) }}
        className="relative flex w-full touch-none select-none items-center py-3 disabled:opacity-50"
      >
        <SliderPrimitive.Track ref={trackRef} className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary" />
        </SliderPrimitive.Track>
        {safeMarks.map((mark) => <span key={mark} aria-hidden="true" className="pointer-events-none absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background ring-1 ring-border" style={{ left: `${((mark - min) / safeRange) * 100}%` }} />)}
        <SliderPrimitive.Thumb aria-label={label} aria-valuetext={formatValue(clamped)} className="relative z-10 block size-6 rounded-full border-2 border-primary bg-background shadow-sm outline-none focus-visible:ring-4 focus-visible:ring-ring/30 disabled:pointer-events-none">
          <motion.span aria-hidden="true" animate={{ scaleX: !reducedMotion && dragging ? 1.15 + Math.abs(overshoot) : 1, scaleY: !reducedMotion && dragging ? 1.15 : 1, x: reducedMotion ? 0 : overshoot * 26, rotate: !reducedMotion && dragging && atEdge ? (clamped === min ? -5 : 5) : 0 }} style={{ transformOrigin: overshoot < 0 ? "right center" : "left center" }} transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 24 }} className="block size-full rounded-full bg-primary/10" />
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
      {endIcon && <span aria-hidden="true" className="shrink-0 text-muted-foreground">{endIcon}</span>}
      </div>
      {safeMarks.length > 0 && <div aria-hidden="true" className="flex justify-between text-[11px] text-muted-foreground">{safeMarks.map((mark) => <span key={mark}>{formatValue(mark)}</span>)}</div>}
    </div>
  )
}

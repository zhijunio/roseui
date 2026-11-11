"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type RulerSliderProps = {
  label: string
  min?: number
  max?: number
  step?: number
  majorEvery?: number
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  onValueCommit?: (value: number) => void
  unit?: string
  formatValue?: (value: number) => string
  disabled?: boolean
  className?: string
}

export function RulerSlider({ label, min = 0, max = 100, step = 1, majorEvery = 10, value, defaultValue = min, onValueChange, onValueCommit, unit = "", formatValue = (number) => `${number}${unit}`, disabled, className }: RulerSliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const current = Math.min(max, Math.max(min, value ?? internalValue))
  const increment = Math.max(step, majorEvery * step)
  const labelId = React.useId()
  const dragRef = React.useRef<{ pointerId: number; startX: number; startValue: number; latestValue: number } | null>(null)
  const lastCommitRef = React.useRef(current)
  const firstTick = min + (Math.floor((current - min) / increment) - 5) * increment
  const ticks = Array.from({ length: 11 }, (_, index) => firstTick + index * increment).filter((tick) => tick >= min && tick <= max)

  function change(nextValue: number) {
    if (value === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  function commit(nextValue = current) {
    if (lastCommitRef.current === nextValue) return
    lastCommitRef.current = nextValue
    onValueCommit?.(nextValue)
  }

  function snap(nextValue: number) {
    const stepped = min + Math.round((nextValue - min) / step) * step
    return Math.min(max, Math.max(min, Number(stepped.toFixed(8))))
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (disabled || event.button !== 0) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startValue: current, latestValue: current }
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const nextValue = snap(drag.startValue + ((drag.startX - event.clientX) / 48) * increment)
    drag.latestValue = nextValue
    change(nextValue)
  }

  function handlePointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    dragRef.current = null
    commit(drag.latestValue)
  }

  return (
    <div data-slot="ruler-slider" className={cn("grid w-full gap-4", className)}>
      <div className="text-center">
        <label htmlFor={labelId} className="text-sm font-medium text-muted-foreground">{label}</label>
        <output className="mt-1 block text-3xl font-semibold tracking-tight tabular-nums text-foreground" aria-live="off">{formatValue(current)}</output>
      </div>
      <div
        className="group/ruler relative isolate h-[88px] overflow-hidden rounded-xl border bg-background shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        style={{ touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <div aria-hidden="true" className="absolute inset-0">
          {ticks.map((tick) => <span key={tick} className="absolute top-3 grid -translate-x-1/2 justify-items-center text-[10px] tabular-nums text-muted-foreground" style={{ left: `calc(50% + ${((tick - current) / increment) * 48}px)` }}><span className="h-5 border-l border-foreground/35" />{tick}</span>)}
        </div>
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-primary after:absolute after:-left-1 after:top-1/2 after:size-2.5 after:-translate-y-1/2 after:rotate-45 after:rounded-[2px] after:bg-primary" />
        <input
          id={labelId} type="range" min={min} max={max} step={step} value={current} disabled={disabled}
          aria-valuetext={formatValue(current)}
          onChange={(event) => change(Number(event.currentTarget.value))}
          onKeyUp={() => commit(current)} onBlur={() => commit(current)}
          className="pointer-events-none absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0 disabled:cursor-not-allowed"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-between px-2 text-[10px] text-muted-foreground"><span>{formatValue(min)}</span><span>{formatValue(max)}</span></div>
      </div>
      <p className="text-xs text-muted-foreground">Use arrow keys for fine adjustments. Page Up and Page Down move by larger increments.</p>
    </div>
  )
}

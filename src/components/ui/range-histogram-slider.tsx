"use client"

import * as React from "react"
import { RangeSlider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

export type RangeHistogramSliderProps = {
  label: string
  data: number[]
  min?: number
  max?: number
  step?: number
  bins?: number
  value?: [number, number]
  defaultValue?: [number, number]
  onValueChange?: (value: [number, number]) => void
  onValueCommit?: (value: [number, number]) => void
  formatValue?: (value: number) => string
  className?: string
  disabled?: boolean
}

export function RangeHistogramSlider({ label, data, min = 0, max = 100, step = 1, bins = 20, value, defaultValue = [min, max], onValueChange, onValueCommit, formatValue = String, className, disabled }: RangeHistogramSliderProps) {
  const [internal, setInternal] = React.useState<[number, number]>(defaultValue)
  const current = value ?? internal
  const count = Math.max(2, Math.min(60, Math.floor(bins)))
  const width = Math.max(1, max - min)
  const histogram = React.useMemo(() => {
    const buckets = Array.from({ length: count }, () => 0)
    data.forEach((sample) => {
      if (!Number.isFinite(sample) || sample < min || sample > max) return
      const index = Math.min(count - 1, Math.floor(((sample - min) / width) * count))
      buckets[index] += 1
    })
    const highest = Math.max(1, ...buckets)
    return buckets.map((items, index) => ({ items, index, height: Math.max(4, (items / highest) * 100) }))
  }, [count, data, max, min, width])
  const inRangeCount = React.useMemo(() => data.filter((sample) => Number.isFinite(sample) && sample >= current[0] && sample <= current[1]).length, [current, data])

  function change(next: number[]) {
    const range: [number, number] = [next[0] ?? min, next[1] ?? max]
    if (value === undefined) setInternal(range)
    onValueChange?.(range)
  }

  return (
    <div data-slot="range-histogram-slider" className={cn("grid w-full gap-3", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-sm font-medium">{label}</span>
        <output className="text-sm font-semibold tabular-nums text-foreground" aria-live="off">{formatValue(current[0])} – {formatValue(current[1])}</output>
      </div>
      <div className="relative px-1 pt-1">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-1 bottom-2 z-0 flex h-16 items-end gap-px">
          {histogram.map(({ index, height }) => {
            const lowerBound = min + (index / count) * width
            const upperBound = min + ((index + 1) / count) * width
            const selected = upperBound >= current[0] && lowerBound <= current[1]
            return <span key={index} data-selected={selected || undefined} className="min-w-0 flex-1 rounded-t-[2px] bg-muted-foreground/15 transition-colors data-[selected=true]:bg-foreground/75 motion-reduce:transition-none" style={{ height: `${height}%` }} />
          })}
        </div>
        <RangeSlider
          label={label}
          min={min}
          max={max}
          step={step}
          value={current}
          onValueChange={change}
          onValueCommit={(next) => onValueCommit?.([next[0] ?? min, next[1] ?? max])}
          formatValue={formatValue}
          showTooltip={false}
          disabled={disabled}
          className="relative z-10 py-6"
          aria-label={label}
        />
      </div>
      <p className="text-xs text-muted-foreground" aria-live="off">{inRangeCount} of {data.length} records in this range.</p>
    </div>
  )
}

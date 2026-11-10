"use client"

import { useId } from "react"

export type MapRegion = { key: string; label: string; value: number; share: string; path: string; color?: string }
export type MapChartProps = { regions: readonly [MapRegion, ...MapRegion[]]; label: string }

function colorFor(index: number) { return `var(--chart-${(index % 5) + 1})` }

export function MapChart({ regions, label }: MapChartProps) {
  const id = useId()
  return <figure className="grid w-full gap-3 sm:grid-cols-[minmax(0,1.3fr)_minmax(8rem,0.7fr)]" aria-labelledby={`${id}-title`}>
    <figcaption className="sr-only" id={`${id}-title`}>{label}</figcaption>
    <svg viewBox="0 0 500 190" role="img" aria-label={label} className="h-48 w-full">
      {regions.map((region, index) => <path key={region.key} d={region.path} fill={region.color ?? colorFor(index)} fillOpacity={0.55} stroke="var(--background)" strokeWidth={1.2}><title>{`${region.label}: ${region.value.toLocaleString("en-US")} visitors`}</title></path>)}
    </svg>
    <ul className="grid content-center gap-2 text-xs">{regions.map((region, index) => <li key={region.key} className="flex items-center gap-2"><span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: region.color ?? colorFor(index) }} /><span className="min-w-0 flex-1 truncate">{region.label}</span><span className="tabular-nums text-muted-foreground">{region.share}</span></li>)}</ul>
  </figure>
}

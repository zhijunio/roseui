"use client"

import { useId, useState } from "react"

export type FunnelChartDatum = { key: string; label: string; value: number; color?: string }
export type FunnelChartProps = { data: readonly [FunnelChartDatum, ...FunnelChartDatum[]]; label: string; height?: number }
type DeviceView = "all" | "mobile" | "desktop"

function colorFor(index: number) {
  return `var(--chart-${(index % 5) + 1})`
}

function formatValue(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`
  return value.toLocaleString()
}

export function FunnelChart({ data, label, height = 330 }: FunnelChartProps) {
  const id = useId()
  const [device, setDevice] = useState<DeviceView>("all")
  const [split, setSplit] = useState(false)
  const [flow, setFlow] = useState(true)
  const max = data[0].value
  const values = data.map((item) => {
    const factor = device === "mobile" ? 0.58 : device === "desktop" ? 0.42 : 1
    return Math.round(item.value * factor)
  })
  const dropOffs = values.map((value, index) => index === 0 ? null : Math.round((1 - value / Math.max(values[index - 1], 1)) * 100))
  const width = 900
  const center = 142
  const xPositions = data.map((_, index) => 28 + index * ((width - 56) / Math.max(data.length - 1, 1)))
  const halfHeights = values.map((value) => 18 + (value / Math.max(max, 1)) * 92)
  const segmentPath = (index: number, offset = 0, scale = 1) => {
    const startX = xPositions[index]
    const endX = xPositions[index + 1]
    const startHalf = halfHeights[index] * scale
    const endHalf = halfHeights[index + 1] * scale
    const curve = Math.max(32, (endX - startX) * 0.34)
    const topStart = center - startHalf + offset
    const topEnd = center - endHalf + offset
    const bottomEnd = center + endHalf + offset
    const bottomStart = center + startHalf + offset
    return `M${startX} ${topStart} C${startX + curve} ${topStart}, ${endX - curve} ${topEnd}, ${endX} ${topEnd} L${endX} ${bottomEnd} C${endX - curve} ${bottomEnd}, ${startX + curve} ${bottomStart}, ${startX} ${bottomStart} Z`
  }

  return <figure className="grid w-full gap-5" aria-labelledby={`${id}-title`}>
    <figcaption className="sr-only" id={`${id}-title`}>{label}</figcaption>
    <div className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h3 className="text-lg font-semibold tracking-tight">Checkout funnel</h3>
        <p className="mt-1 text-sm text-muted-foreground">Last 30 days, {((values.at(-1) ?? 0) / Math.max(values[0], 1) * 100).toFixed(1)}% convert</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-full border bg-muted/40 p-1" role="group" aria-label="Funnel device view">
          {(["all", "mobile", "desktop"] as const).map((option) => <button key={option} type="button" aria-pressed={device === option} onClick={() => setDevice(option)} className={`rounded-full px-3 py-1.5 text-sm capitalize transition-colors ${device === option ? "bg-background font-medium text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{option}</button>)}
        </div>
        <button type="button" role="switch" aria-checked={split} onClick={() => setSplit((value) => !value)} className="inline-flex h-8 items-center gap-2 text-sm text-foreground">
          <span className={`relative h-6 w-11 rounded-full transition-colors ${split ? "bg-primary" : "bg-muted-foreground/30"}`}><span className={`absolute top-1 size-4 rounded-full bg-background shadow-sm transition-transform ${split ? "translate-x-6" : "translate-x-1"}`} /></span>Split
        </button>
        <button type="button" role="switch" aria-checked={flow} onClick={() => setFlow((value) => !value)} className="inline-flex h-8 items-center gap-2 text-sm text-foreground">
          <span className={`relative h-6 w-11 rounded-full transition-colors ${flow ? "bg-primary" : "bg-muted-foreground/30"}`}><span className={`absolute top-1 size-4 rounded-full bg-background shadow-sm transition-transform ${flow ? "translate-x-6" : "translate-x-1"}`} /></span>Flow
        </button>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-5">
      {data.map((item, index) => <button key={item.key} type="button" onClick={() => setDevice(device === "all" ? "all" : device)} className="min-w-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <span className="block truncate text-sm text-muted-foreground">{item.label}</span>
        <span className="mt-1 block text-3xl font-medium tracking-tight tabular-nums">{formatValue(values[index])}</span>
        <span className="mt-1 block truncate text-sm text-muted-foreground">{index === 0 ? "Start" : `${Math.round(values[index] / Math.max(values[0], 1) * 100)}% of start`}</span>
      </button>)}
    </div>
    <div className="min-w-0 overflow-hidden rounded-lg bg-muted/10 px-1 sm:px-3">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label} className="block h-auto min-h-[16rem] w-full" preserveAspectRatio="none">
        {data.slice(0, -1).map((item, index) => <g key={item.key}>
          <path d={segmentPath(index)} fill={item.color ?? colorFor(index)} fillOpacity="0.18"><title>{`${item.label}: ${values[index].toLocaleString()}`}</title></path>
          {split ? <path d={segmentPath(index, 0, 0.48)} fill="var(--chart-3)" fillOpacity="0.25" /> : null}
          {flow ? Array.from({ length: 9 }, (_, particle) => <circle key={`${item.key}-${particle}`} cx={xPositions[index] + 22 + ((particle * 37 + index * 11) % Math.max(30, xPositions[index + 1] - xPositions[index] - 30))} cy={center + ((particle * 29 + index * 17) % 120) - 60} r="2" fill="var(--foreground)" opacity={particle % 3 === 0 ? 0.28 : 0.62}><animate attributeName="opacity" values="0.2;0.75;0.2" dur={`${1.8 + particle * 0.08}s`} repeatCount="indefinite" /></circle>) : null}
        </g>)}
      </svg>
    </div>
    <div className="grid grid-cols-2 gap-4 px-[calc(20%+0.25rem)] text-center text-sm text-muted-foreground sm:grid-cols-4 sm:px-[10%]">
      {dropOffs.slice(1).map((dropOff, index) => <span key={data[index + 1].key} className="tabular-nums">↓ {dropOff}%</span>)}
    </div>
  </figure>
}

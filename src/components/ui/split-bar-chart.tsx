"use client"

import { useState } from "react"

export type SplitBarDatum = {
  key: string
  label: string
  value: number
  color: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"
}

const colors: Record<SplitBarDatum["color"], string> = {
  "chart-1": "var(--chart-1)",
  "chart-2": "var(--chart-2)",
  "chart-3": "var(--chart-3)",
  "chart-4": "var(--chart-4)",
  "chart-5": "var(--chart-5)",
}

const numberFormat = new Intl.NumberFormat("en-US")

export function SplitBarChart({ data, title = "Traffic by source", description = "Sessions on northwind.shop", unit = "sessions" }: {
  data: readonly SplitBarDatum[]
  title?: string
  description?: string
  unit?: string
}) {
  const [hidden, setHidden] = useState<ReadonlySet<string>>(() => new Set())
  const [active, setActive] = useState<string | null>(null)
  const visible = data.filter((item) => !hidden.has(item.key))
  const total = visible.reduce((sum, item) => sum + Math.max(0, item.value), 0)
  const activeItem = data.find((item) => item.key === active)
  const activeShare = activeItem && total > 0 ? activeItem.value / total : null
  const shares = new Map(data.map((item) => [item.key, total > 0 ? item.value / total : 0]))
  const outside = visible.filter((item) => (shares.get(item.key) ?? 0) < 0.12)

  function toggle(key: string) {
    if (visible.length === 1 && !hidden.has(key)) return
    setHidden((current) => {
      const next = new Set(current)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div className="grid w-full gap-5 text-foreground">
      <div className="flex min-w-0 flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-medium leading-tight">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <p className="m-0 shrink-0 text-sm text-muted-foreground">Total <strong className="ml-2 text-2xl font-medium tracking-normal text-foreground tabular-nums">{numberFormat.format(total)}</strong> {unit}</p>
      </div>

      <div className="grid gap-2">
        <div className="flex h-20 min-w-0 overflow-hidden rounded-xl bg-muted/60" role="group" aria-label={`${title}: ${visible.map((item) => `${item.label} ${((shares.get(item.key) ?? 0) * 100).toFixed(1)}%`).join(", ")}`}>
          {visible.map((item) => {
            const share = shares.get(item.key) ?? 0
            const isActive = active === item.key
            return <button key={item.key} type="button" aria-label={`${item.label}: ${(share * 100).toFixed(1)}%`} aria-pressed={isActive} onClick={() => setActive(isActive ? null : item.key)} onMouseEnter={() => setActive(item.key)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(item.key)} onBlur={() => setActive(null)} className="relative min-w-1 shrink-0 border-r-2 border-background/80 px-4 text-left transition-[filter,transform,opacity] duration-200 last:border-r-0 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" style={{ width: `${share * 100}%`, minWidth: share > 0 ? "12px" : 0, backgroundColor: colors[item.color], filter: active && !isActive ? "saturate(.55) opacity(.38)" : undefined, transform: isActive ? "scaleY(1.08)" : undefined }}>{share >= 0.12 && <span className="block truncate text-sm font-medium text-foreground">{item.label} <span className="tabular-nums">{(share * 100).toFixed(1)}%</span></span>}</button>
          })}
        </div>
        {outside.length > 0 && <div className="flex flex-wrap justify-end gap-x-6 gap-y-1 pr-1 text-sm text-muted-foreground">{outside.map((item) => <span key={item.key} className="inline-flex items-center gap-2"><span className="size-2.5 rounded-sm" style={{ backgroundColor: colors[item.color] }} />{item.label} <strong className="font-medium text-foreground tabular-nums">{((shares.get(item.key) ?? 0) * 100).toFixed(1)}%</strong></span>)}</div>}
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3 border-t pt-4 text-sm text-muted-foreground">
        {data.map((item) => {
          const isHidden = hidden.has(item.key)
          const share = shares.get(item.key) ?? 0
          return <button key={item.key} type="button" aria-pressed={!isHidden} onClick={() => toggle(item.key)} onMouseEnter={() => setActive(item.key)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(item.key)} onBlur={() => setActive(null)} className={`inline-flex items-center gap-2 transition-colors hover:text-foreground ${isHidden ? "opacity-45 line-through" : ""}`}><span className={`size-2.5 rounded-sm ${isHidden ? "border border-muted-foreground bg-transparent" : ""}`} style={isHidden ? undefined : { backgroundColor: colors[item.color] }} />{item.label} <strong className="font-medium text-foreground tabular-nums">{(share * 100).toFixed(1)}%</strong></button>
        })}
      </div>

      <p className="sr-only" aria-live="polite">{activeItem && activeShare !== null ? `${activeItem.label} is ${(activeShare * 100).toFixed(1)} percent of ${numberFormat.format(total)} ${unit}.` : `${numberFormat.format(total)} ${unit} total.`}</p>
    </div>
  )
}

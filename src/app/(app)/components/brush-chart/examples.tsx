"use client"

import { useMemo, useState } from "react"
import { BrushChart, type BrushChartDatum } from "@/components/ui/brush-chart"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const DAY = 86_400_000
const end = Date.UTC(2026, 8, 20)
const periods = [
  { key: "30d", label: "30D", days: 30 },
  { key: "90d", label: "90D", days: 90 },
  { key: "1y", label: "1Y", days: 365 },
  { key: "all", label: "All", days: 365 },
] as const

const data = Array.from({ length: 365 }, (_, index): BrushChartDatum => {
  const date = end - (364 - index) * DAY
  const day = new Date(date).getUTCDay()
  const baseline = 15_900 + index * 12
  const weekday = day === 0 || day === 6 ? -3_250 : day === 1 ? 850 : 0
  const variation = Math.round(Math.sin(index * 0.47) * 420 + Math.cos(index * 0.16) * 260)
  return { date, value: Math.max(8_000, baseline + weekday + variation) }
})

const shortDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
const grouped = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 })

export function BrushChartExample() {
  const [period, setPeriod] = useState("90d")
  const [range, setRange] = useState<[number, number]>(() => [end - 89 * DAY, end])
  const summary = useMemo(() => {
    const values = data.filter((item) => { const timestamp = typeof item.date === "number" ? item.date : item.date.getTime(); return timestamp >= range[0] && timestamp <= range[1] }).map((item) => item.value)
    const average = values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0
    return `${grouped.format(average)} a day, ${shortDate.format(range[0])} to ${shortDate.format(range[1])}`
  }, [range])
  function selectPeriod(next: string) {
    const match = periods.find((item) => item.key === next)
    if (!match) return
    setPeriod(next)
    setRange([end - (match.days - 1) * DAY, end])
  }
  return <div className="grid gap-5">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <h2 className="text-lg font-medium leading-tight tracking-normal sm:text-xl sm:leading-7">Daily active users</h2>
        <p className="mt-1 text-sm leading-5 text-muted-foreground tabular-nums sm:text-base sm:leading-6">{summary}</p>
      </div>
      <ToggleGroup type="single" value={period} onValueChange={selectPeriod} variant="outline" size="sm" aria-label="Chart time range" className="shrink-0 rounded-xl border border-border bg-muted/45 p-1 shadow-none">
        {periods.map((item) => <ToggleGroupItem key={item.key} value={item.key} className="h-8 border-0 px-2.5 text-sm text-muted-foreground shadow-none data-[state=on]:bg-background data-[state=on]:text-accent-strong data-[state=on]:shadow-[0_1px_3px_color-mix(in_oklab,var(--foreground)_12%,transparent)] sm:h-9 sm:px-3">{item.label}</ToggleGroupItem>)}
      </ToggleGroup>
    </div>
    <BrushChart data={data} label="Daily active users" unit="users" range={range} onRangeChange={(next) => { setRange(next); setPeriod("custom") }} annotations={[{ date: Date.UTC(2026, 6, 1), label: "Launch", description: "Shared spaces rollout" }]} height={360} overviewHeight={62} />
  </div>
}

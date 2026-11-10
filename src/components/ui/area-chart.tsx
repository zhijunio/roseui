"use client"

import { useId } from "react"
import { Area, AreaChart as RechartsAreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

export type MetricAreaDatum = {
  key: string
  label: string
  axisLabel?: string
  values: Readonly<Record<string, number>>
}

export type AreaChartSeries = {
  key: string
  label: string
  color?: string
  fillOpacity?: number
}

export type AreaChartProps = {
  data: readonly MetricAreaDatum[]
  series: readonly [AreaChartSeries, ...AreaChartSeries[]]
  label: string
  period: string
  variant?: "overlay" | "stacked" | "percent"
  curve?: "monotone" | "step"
  unit?: string
  averageLabel?: string
  showAverage?: boolean
  showLegend?: boolean
  height?: number
  formatValue?: (value: number) => string
}

function chartColor(index: number) {
  return `var(--chart-${(index % 5) + 1})`
}

function scaleFor(values: readonly number[], variant: AreaChartProps["variant"]) {
  if (variant === "percent") return { domain: [0, 100] as const, ticks: [0, 25, 50, 75, 100] }
  const maximum = Math.max(1, ...values)
  const step = 10 ** Math.floor(Math.log10(maximum / 4))
  const tickStep = [1, 2, 5, 10].find((factor) => Math.ceil(maximum / (factor * step)) <= 5) ?? 10
  const interval = tickStep * step
  const top = Math.ceil(maximum / interval) * interval
  return { domain: [0, top] as const, ticks: Array.from({ length: Math.round(top / interval) + 1 }, (_, index) => index * interval) }
}

export function AreaChart({
  data,
  series,
  label,
  period,
  variant = "overlay",
  curve = "monotone",
  unit = "",
  averageLabel = "Average",
  showAverage = false,
  showLegend = true,
  height = 240,
  formatValue = (value) => value.toLocaleString(),
}: AreaChartProps) {
  const id = useId()
  const dataTableId = `${id}-data`
  const plotData = data.map((point) => {
    const total = series.reduce((sum, item) => sum + (point.values[item.key] ?? 0), 0)
    const values = Object.fromEntries(series.map((item) => [item.key, variant === "percent" ? ((point.values[item.key] ?? 0) / Math.max(total, 1)) * 100 : point.values[item.key] ?? 0]))
    return { ...values, key: point.key, plotLabel: point.axisLabel ?? point.label }
  })
  const totals = data.map((point) => series.reduce((sum, item) => sum + (point.values[item.key] ?? 0), 0))
  const average = totals.length ? totals.reduce((sum, value) => sum + value, 0) / totals.length : 0
  const rawValues = data.flatMap((point) => series.map((item) => point.values[item.key] ?? 0))
  const scale = scaleFor(rawValues, variant)
  const config: ChartConfig = Object.fromEntries(series.map((item, index) => [item.key, { label: item.label, color: item.color ?? chartColor(index) }]))
  const unitSuffix = unit ? ` ${unit}` : ""
  const displayAverage = variant === "percent" ? Math.round(average / Math.max(series.length, 1)) : Math.round(average)

  return (
    <figure className="grid w-full gap-4" aria-labelledby={`${id}-title`} aria-describedby={`${id}-summary`}>
      <figcaption className="sr-only" id={`${id}-title`}>{label}, {period}</figcaption>
      <p className="sr-only" id={`${id}-summary`}>{label} for {period}. {averageLabel} {formatValue(displayAverage)}{variant === "percent" ? "%" : unitSuffix}.</p>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-border/60 pb-3" aria-hidden="true">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{averageLabel}</p>
          <p className="mt-1.5 text-3xl font-semibold leading-none tracking-[-0.04em] tabular-nums">
            {formatValue(displayAverage)}
            <span className="ml-1.5 text-sm font-medium tracking-normal text-muted-foreground">{variant === "percent" ? "%" : unit}</span>
          </p>
        </div>
        <p className="rounded-full border border-border/70 bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">{period}</p>
      </div>
      <ChartContainer config={config} className="w-full aspect-auto [&_.recharts-cartesian-axis-tick_text]:text-[10px]" style={{ height }} aria-hidden="true">
        <RechartsAreaChart accessibilityLayer data={plotData} margin={{ top: 12, right: 20, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" strokeOpacity={0.55} />
          <XAxis dataKey="plotLabel" interval="preserveEnd" minTickGap={16} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis width={44} domain={scale.domain} ticks={scale.ticks} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `${formatValue(Number(value))}${variant === "percent" ? "%" : ""}`} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          {showLegend && series.length > 1 && <ChartLegend content={<ChartLegendContent />} />}
          {showAverage && <ReferenceLine y={variant === "percent" ? displayAverage : average} stroke="var(--muted-foreground)" strokeDasharray="3 4" strokeOpacity={0.7} label={{ value: `Avg ${formatValue(displayAverage)}${variant === "percent" ? "%" : ""}`, position: "insideRight", fill: "var(--foreground)", fontSize: 11 }} />}
          {series.map((item, index) => <Area key={item.key} dataKey={item.key} type={curve} stackId={variant === "overlay" ? undefined : "area"} stroke={item.color ?? chartColor(index)} fill={item.color ?? chartColor(index)} fillOpacity={item.fillOpacity ?? 0.24} strokeWidth={2} dot={false} isAnimationActive={false} />)}
        </RechartsAreaChart>
      </ChartContainer>
      <table className="sr-only" id={dataTableId}>
        <caption>{label}, {period}</caption>
        <thead><tr><th scope="col">Period</th>{series.map((item) => <th key={item.key} scope="col">{item.label}</th>)}</tr></thead>
        <tbody>{data.map((point) => <tr key={point.key}><th scope="row">{point.label}</th>{series.map((item) => <td key={item.key}>{formatValue(point.values[item.key] ?? 0)}{unitSuffix}</td>)}</tr>)}</tbody>
      </table>
    </figure>
  )
}

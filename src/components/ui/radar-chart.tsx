"use client"

import { useId, useState } from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart as RechartsRadarChart, Tooltip } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

export type RadarChartDatum = { key: string; label: string; values: Readonly<Record<string, number>> }
export type RadarChartSeries = { key: string; label: string; color?: string }
export type RadarChartProps = { data: readonly RadarChartDatum[]; series: readonly RadarChartSeries[]; label: string; max?: number; height?: number }

function colorFor(index: number) { return `var(--chart-${(index % 5) + 1})` }

export function RadarChart({ data, series, label, max, height = 280 }: RadarChartProps) {
  const id = useId()
  const [activeAxis, setActiveAxis] = useState(0)
  const [activeSeries, setActiveSeries] = useState<string | null>(null)
  const config: ChartConfig = Object.fromEntries(series.map((item, index) => [item.key, { label: item.label, color: item.color ?? colorFor(index) }]))
  const plotData = data.map((item) => ({ ...item.values, category: item.label }))
  return (
    <figure className="grid w-full gap-3" aria-labelledby={`${id}-title`}>
      <figcaption className="sr-only" id={`${id}-title`}>{label}</figcaption>
      <ChartContainer config={config} className="w-full aspect-auto" style={{ height }} aria-label={label} tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); setActiveAxis((current) => (current + 1) % data.length); } if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); setActiveAxis((current) => (current - 1 + data.length) % data.length); } }}>
        <RechartsRadarChart accessibilityLayer data={plotData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" tick={({ payload, x, y, textAnchor }) => <text x={x} y={y} textAnchor={textAnchor} fill={payload.index === activeAxis ? "var(--foreground)" : "var(--muted-foreground)"} fontSize={14} fontWeight={payload.index === activeAxis ? 600 : 400}>{payload.value}</text>} />
          {series.map((item, index) => <Radar key={item.key} dataKey={item.key} stroke={item.color ?? colorFor(index)} fill={item.color ?? colorFor(index)} fillOpacity={activeSeries === null || activeSeries === item.key ? 0.2 : 0.04} strokeWidth={activeSeries === item.key ? 3 : 2} isAnimationActive animationDuration={520} animationEasing="ease-out" {...(max === undefined ? {} : { dot: false })} />)}
          <Tooltip content={<ChartTooltipContent />} />
          {series.length > 1 && <ChartLegend content={<ChartLegendContent />} onMouseEnter={(entry) => { if (entry && "dataKey" in entry && typeof entry.dataKey === "string") setActiveSeries(entry.dataKey); }} onMouseLeave={() => setActiveSeries(null)} />}
        </RechartsRadarChart>
      </ChartContainer>
      <div className="overflow-x-auto rounded-md border border-border"><table className="w-full min-w-[30rem] text-left text-xs"><caption className="sr-only">{label} data</caption><thead><tr className="border-b bg-muted/40 text-muted-foreground"><th className="px-3 py-2 font-medium">Axis</th>{series.map((item) => <th key={item.key} className="px-3 py-2 text-right font-medium">{item.label}</th>)}</tr></thead><tbody>{data.map((datum, index) => <tr key={datum.key} className={index === activeAxis ? "bg-primary/5" : undefined}><th className="px-3 py-2 font-medium">{datum.label}</th>{series.map((item) => <td key={item.key} className="px-3 py-2 text-right tabular-nums">{datum.values[item.key] ?? 0}</td>)}</tr>)}</tbody></table></div>
    </figure>
  )
}

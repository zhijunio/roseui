"use client"

import { useId } from "react"
import { Area, Bar, CartesianGrid, ComposedChart as RechartsComposedChart, Line, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

export type ComposedChartDatum = { key: string; label: string; values: Readonly<Record<string, number>> }
export type ComposedChartSeries = { key: string; label: string; kind: "bar" | "line" | "area"; color?: string; axis?: "primary" | "secondary" }
export type ComposedChartProps = { data: readonly [ComposedChartDatum, ...ComposedChartDatum[]]; series: readonly [ComposedChartSeries, ...ComposedChartSeries[]]; label: string; secondaryUnit?: string; height?: number }

function colorFor(index: number) { return `var(--chart-${(index % 5) + 1})` }

export function ComposedChart({ data, series, label, secondaryUnit, height = 240 }: ComposedChartProps) {
  const id = useId()
  const config: ChartConfig = Object.fromEntries(series.map((item, index) => [item.key, { label: item.label, color: item.color ?? colorFor(index) }]))
  const plotData = data.map((item) => ({ ...item.values, label: item.label }))
  return <figure className="grid w-full" aria-labelledby={`${id}-title`}>
    <figcaption className="sr-only" id={`${id}-title`}>{label}</figcaption>
    <ChartContainer config={config} className="w-full aspect-auto" style={{ height }} aria-label={label}>
      <RechartsComposedChart accessibilityLayer data={plotData} margin={{ top: 12, right: 20, bottom: 0, left: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis yAxisId="primary" tickLine={false} axisLine={false} width={36} />
        {series.some((item) => item.axis === "secondary") && <YAxis yAxisId="secondary" orientation="right" tickLine={false} axisLine={false} width={42} tickFormatter={(value) => `${value}${secondaryUnit ?? ""}`} />}
        <Tooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {series.map((item, index) => {
          const color = item.color ?? colorFor(index)
          const yAxisId = item.axis ?? "primary"
          if (item.kind === "bar") return <Bar key={item.key} yAxisId={yAxisId} dataKey={item.key} fill={color} radius={4} isAnimationActive={false} />
          if (item.kind === "area") return <Area key={item.key} yAxisId={yAxisId} dataKey={item.key} type="monotone" stroke={color} fill={color} fillOpacity={0.2} strokeWidth={2} isAnimationActive={false} />
          return <Line key={item.key} yAxisId={yAxisId} dataKey={item.key} type="monotone" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
        })}
      </RechartsComposedChart>
    </ChartContainer>
  </figure>
}

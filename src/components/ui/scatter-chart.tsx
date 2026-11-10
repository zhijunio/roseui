"use client"

import { useId } from "react"
import { CartesianGrid, Scatter, ScatterChart as RechartsScatterChart, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

export type ScatterChartDatum = { key: string; label: string; x: number; y: number }
export type ScatterChartProps = { data: readonly [ScatterChartDatum, ...ScatterChartDatum[]]; label: string; xLabel: string; yLabel: string; height?: number }

export function ScatterChart({ data, label, xLabel, yLabel, height = 240 }: ScatterChartProps) {
  const id = useId()
  const config: ChartConfig = { points: { label, color: "var(--chart-1)" } }
  return <figure className="grid w-full" aria-labelledby={`${id}-title`}>
    <figcaption className="sr-only" id={`${id}-title`}>{label}</figcaption>
    <ChartContainer config={config} className="w-full aspect-auto" style={{ height }} aria-label={label}>
      <RechartsScatterChart accessibilityLayer margin={{ top: 16, right: 16, bottom: 16, left: 8 }}>
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name={xLabel} tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis type="number" dataKey="y" name={yLabel} tickLine={false} axisLine={false} width={40} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<ChartTooltipContent labelFormatter={(_, payload) => payload[0]?.payload?.label ?? ""} />} />
        <Scatter name={label} data={data} fill="var(--color-points)" isAnimationActive={false} />
      </RechartsScatterChart>
    </ChartContainer>
  </figure>
}

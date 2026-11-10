"use client"

import { useId } from "react"
import { Cell, Pie, PieChart as RechartsPieChart, Tooltip } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

export type PieChartDatum = { key: string; label: string; value: number; color?: string }
export type PieChartProps = { data: readonly [PieChartDatum, ...PieChartDatum[]]; label: string; centerLabel?: string; showLegend?: boolean; height?: number }

function colorFor(index: number) { return `var(--chart-${(index % 5) + 1})` }

export function PieChart({ data, label, centerLabel, showLegend = true, height = 240 }: PieChartProps) {
  const id = useId()
  const config: ChartConfig = Object.fromEntries(data.map((item, index) => [item.key, { label: item.label, color: item.color ?? colorFor(index) }]))
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <figure className="grid w-full gap-3" aria-labelledby={`${id}-title`}>
      <figcaption className="sr-only" id={`${id}-title`}>{label}</figcaption>
      <ChartContainer config={config} className="w-full aspect-auto" style={{ height }} aria-label={label}>
        <RechartsPieChart accessibilityLayer>
          <Tooltip content={<ChartTooltipContent nameKey="key" hideLabel />} />
          <Pie data={data} dataKey="value" nameKey="key" innerRadius={0} outerRadius={88} paddingAngle={2} isAnimationActive={false}>
            {data.map((item, index) => <Cell key={item.key} fill={item.color ?? colorFor(index)} />)}
          </Pie>
          {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        </RechartsPieChart>
      </ChartContainer>
      <p className="text-center text-xs text-muted-foreground">{centerLabel ?? `${formatPercentage(data[0].value, total)} of total`}</p>
    </figure>
  )
}

function formatPercentage(value: number, total: number) {
  return `${Math.round(value / Math.max(total, 1) * 100)}%`
}

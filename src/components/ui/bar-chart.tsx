"use client"

import { useId, useRef, useState, type ComponentProps, type KeyboardEvent, type PointerEvent } from "react"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, Cell, Rectangle, ReferenceLine, XAxis, YAxis } from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

export type MetricBarDatum = {
  key: string
  label: string
  axisLabel?: string
  values: Readonly<Record<string, number>>
}

export type BarChartSeries = {
  key: string
  label: string
  color?: string
}

export type BarChartMark = "bar" | "depth" | "lollipop"

export type BarChartProps = {
  data: readonly MetricBarDatum[]
  series: readonly [BarChartSeries, ...BarChartSeries[]]
  variant?: "single" | "grouped" | "stacked" | "diverging"
  orientation?: "vertical" | "horizontal"
  mark?: BarChartMark
  label: string
  period: string
  unit?: string
  averageLabel?: string
  valueLabel?: string
  categoryLabel?: string
  showAverage?: boolean
  height?: number
  formatValue?: (value: number) => string
  valueFormat?: "default" | "signed"
}

function chartColor(index: number) {
  return `var(--chart-${(index % 5) + 1})`
}

function valueScale(maximum: number) {
  const safeMaximum = Math.max(maximum, 1)
  const magnitude = 10 ** Math.floor(Math.log10(safeMaximum / 4))

  for (const factor of [1, 2, 3, 5, 10]) {
    const step = factor * magnitude
    const rows = Math.ceil(safeMaximum / step)
    if (rows <= 4) return { top: rows * step, ticks: Array.from({ length: rows + 1 }, (_, index) => index * step) }
  }

  return { top: safeMaximum, ticks: [0, safeMaximum] }
}

function DepthMark({ x, y, width, height, fill, ...props }: ComponentProps<typeof Rectangle>) {
  const left = Number(x)
  const top = Number(y)
  const barWidth = Number(width)
  const barHeight = Number(height)
  const depth = Math.min(8, barWidth / 3)

  return <g>
    <Rectangle {...props} x={left} y={top} width={barWidth} height={barHeight} fill={fill} />
    <path d={`M${left},${top} l${depth},-${depth} h${barWidth} l-${depth},${depth} Z`} fill={fill} opacity={0.65} />
    <path d={`M${left + barWidth},${top} l${depth},-${depth} v${barHeight} l-${depth},${depth} Z`} fill={fill} opacity={0.45} />
  </g>
}

function LollipopMark({ x, y, width, height, fill, ...props }: ComponentProps<typeof Rectangle>) {
  const left = Number(x)
  const top = Number(y)
  const barWidth = Number(width)
  const barHeight = Number(height)
  const stem = Math.max(2, barWidth * 0.16)

  return <g>
    <Rectangle {...props} x={left + (barWidth - stem) / 2} y={top} width={stem} height={barHeight} fill={fill} radius={0} />
    <circle cx={left + barWidth / 2} cy={top} r={5} fill={fill} />
  </g>
}

export function BarChart({
  data,
  label,
  period,
  unit = "",
  averageLabel = "Average",
  valueLabel = "Value",
  categoryLabel = "Period",
  showAverage,
  height,
  formatValue = (value) => value.toLocaleString(),
  valueFormat = "default",
  series,
  variant = "single",
  orientation = "vertical",
  mark = "bar",
}: BarChartProps) {
  const id = useId()
  const plotRef = useRef<HTMLDivElement>(null)
  const dataSignature = JSON.stringify(data.map((point) => point.key))
  const [selection, setSelection] = useState<{ signature: string; index: number } | null>(null)
  const activeIndex = selection?.signature === dataSignature ? selection.index : null
  const showMean = showAverage ?? variant !== "grouped"
  const rowTotal = (point: MetricBarDatum) => series.reduce((total, item) => total + (point.values[item.key] ?? 0), 0)
  const totals = data.map(rowTotal)
  const average = totals.length ? totals.reduce((total, value) => total + value, 0) / totals.length : 0
  const maximum = variant === "diverging"
    ? Math.max(0, ...data.flatMap((point) => series.map((item) => Math.abs(point.values[item.key] ?? 0))))
    : Math.max(0, ...totals)
  const scale = valueScale(maximum)
  const ticks = variant === "diverging"
    ? [...scale.ticks.slice(1).reverse().map((tick) => -tick), ...scale.ticks]
    : scale.ticks
  const domain: [number, number] = variant === "diverging" ? [-scale.top, scale.top] : [0, scale.top]
  const lastIndex = data.length - 1
  const safeActiveIndex = activeIndex === null || lastIndex < 0 ? null : Math.min(activeIndex, lastIndex)
  const activePoint = safeActiveIndex === null ? undefined : data[safeActiveIndex]
  const plotData = data.map((point) => ({ ...point.values, key: point.key, plotLabel: point.axisLabel ?? point.label }))
  const config: ChartConfig = Object.fromEntries(series.map((item, index) => [item.key, {
    label: item.label,
    color: item.color ?? chartColor(index),
  }]))
  const displayValue = valueFormat === "signed"
    ? (value: number) => `${value > 0 ? "+" : ""}${formatValue(value)}`
    : formatValue
  const unitSuffix = unit ? ` ${unit}` : ""
  const highestIndex = totals.reduce((best, value, index) => value > (totals[best] ?? -Infinity) ? index : best, -1)
  const lowestIndex = totals.reduce((best, value, index) => value < (totals[best] ?? Infinity) ? index : best, -1)
  const highest = data[highestIndex]
  const lowest = data[lowestIndex]
  const summary = `${label}, ${period}. ${averageLabel} ${displayValue(Math.round(average))}${unitSuffix}.${highest ? ` Highest ${highest.label}, ${displayValue(totals[highestIndex] ?? 0)}${unitSuffix}.` : ""}${lowest && lowest !== highest ? ` Lowest ${lowest.label}, ${displayValue(totals[lowestIndex] ?? 0)}${unitSuffix}.` : ""}`
  const defaultPoint = data[lastIndex]
  const currentDescription = activePoint
    ? `${activePoint.label}: ${series.map((item) => `${item.label} ${displayValue(activePoint.values[item.key] ?? 0)}${unitSuffix}`).join(", ")}. Total ${displayValue(rowTotal(activePoint))}${unitSuffix}`
    : defaultPoint
      ? `${defaultPoint.label}: ${series.map((item) => `${item.label} ${displayValue(defaultPoint.values[item.key] ?? 0)}${unitSuffix}`).join(", ")}. Total ${displayValue(rowTotal(defaultPoint))}${unitSuffix}`
    : "No data"

  function selectIndex(index: number | null) {
    setSelection(index === null ? null : { signature: dataSignature, index })
  }

  function pointAt(clientX: number, clientY: number) {
    const bounds = plotRef.current?.getBoundingClientRect()
    const length = orientation === "horizontal" ? bounds?.height : bounds?.width
    if (!bounds || !length || !data.length) return null
    const offset = orientation === "horizontal" ? clientY - bounds.top : clientX - bounds.left
    return Math.max(0, Math.min(lastIndex, Math.floor((offset / length) * data.length)))
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    selectIndex(pointAt(event.clientX, event.clientY))
    if (event.pointerType !== "mouse") event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" || event.buttons > 0) selectIndex(pointAt(event.clientX, event.clientY))
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && activeIndex !== null) {
      event.preventDefault()
      selectIndex(null)
      return
    }

    const current = safeActiveIndex ?? lastIndex
    const page = Math.min(7, Math.max(1, data.length))
    const next = ({
      ArrowLeft: current - 1,
      ArrowUp: orientation === "horizontal" ? current - 1 : current + 1,
      ArrowDown: orientation === "horizontal" ? current + 1 : current - 1,
      ArrowRight: current + 1,
      PageDown: current - page,
      PageUp: current + page,
      Home: 0,
      End: lastIndex,
    } as Record<string, number>)[event.key]

    if (next === undefined || lastIndex < 0) return
    event.preventDefault()
    selectIndex(Math.max(0, Math.min(lastIndex, next)))
  }

  function barFill(point: MetricBarDatum, item: BarChartSeries, index: number) {
    const value = point.values[item.key] ?? 0
    const color = variant === "diverging" && value < 0
      ? "var(--chart-3)"
      : item.color ?? `var(--color-${item.key})`
    if (index === safeActiveIndex) return color
    const mix = safeActiveIndex === null ? "var(--bar-idle-mix)" : "var(--bar-hover-mix)"
    return `color-mix(in oklab, ${color} ${mix}, var(--card))`
  }

  const headlineLabel = activePoint ? valueLabel : averageLabel
  const headlineValue = activePoint ? rowTotal(activePoint) : Math.round(average)
  const headlinePeriod = activePoint?.label ?? period
  const dataTableId = `${id}-data`
  const chartHeight = height ?? (orientation === "horizontal" ? Math.max(208, data.length * 34 + 48) : 192)
  const barMark = orientation === "horizontal" ? "bar" : mark
  const plotInsets = orientation === "horizontal"
    ? { left: 64, right: 20, top: 12, bottom: 32 }
    : { left: 48, right: 20, top: 12, bottom: 32 }
  const touchAction = orientation === "horizontal" ? "pan-x" : "pan-y"

  return (
    <figure className="grid w-full gap-4 [--bar-idle-mix:62%] [--bar-hover-mix:24%] dark:[--bar-idle-mix:76%] dark:[--bar-hover-mix:34%]" aria-labelledby={`${id}-title`} aria-describedby={`${id}-summary`}>
      <figcaption className="sr-only" id={`${id}-title`}>{label}, {period}</figcaption>
      <p className="sr-only" id={`${id}-summary`}>{summary}</p>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-border/60 pb-3" aria-hidden="true">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{headlineLabel}</p>
          <p className="mt-1.5 text-3xl font-semibold leading-none tracking-[-0.04em] tabular-nums">
            {displayValue(headlineValue)}{unit && <span className="ml-1.5 text-sm font-medium tracking-normal text-muted-foreground">{unit}</span>}
          </p>
        </div>
        <p className="rounded-full border border-border/70 bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">{headlinePeriod}</p>
      </div>
      {series.length > 1 && <div className="flex flex-wrap gap-x-4 gap-y-2" aria-hidden="true">
        {series.map((item, index) => <span key={item.key} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-2 rounded-[2px]" style={{ backgroundColor: item.color ?? chartColor(index) }} />
          <span>{item.label}</span>
          {activePoint && <span className="font-medium tabular-nums text-foreground">{displayValue(activePoint.values[item.key] ?? 0)}{unit && ` ${unit}`}</span>}
        </span>)}
      </div>}

      <div className="relative isolate" style={{ touchAction }}>
        <ChartContainer
          config={config}
          className="w-full aspect-auto [&_.recharts-cartesian-axis-tick_text]:text-[10px]"
          style={{ height: chartHeight }}
          aria-hidden="true"
        >
          <RechartsBarChart
            accessibilityLayer
            data={plotData}
            layout={orientation === "horizontal" ? "vertical" : "horizontal"}
            margin={{ top: 12, right: 20, bottom: 0, left: 0 }}
            barCategoryGap={variant === "single" ? "42%" : "24%"}
            barGap={variant === "grouped" ? 4 : 0}
          >
          <CartesianGrid horizontal={orientation === "vertical"} vertical={orientation === "horizontal"} stroke="var(--border)" strokeDasharray="3 4" strokeOpacity={0.55} />
            {orientation === "vertical" ? <>
              <XAxis dataKey="plotLabel" interval="preserveEnd" minTickGap={16} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis width={44} domain={domain} ticks={ticks} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => displayValue(Number(value))} />
            </> : <>
              <XAxis type="number" domain={domain} ticks={ticks} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => displayValue(Number(value))} />
              <YAxis type="category" dataKey="plotLabel" width={72} interval="preserveEnd" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickLine={false} axisLine={false} tickMargin={10} />
            </>}
            {variant === "diverging" && <ReferenceLine
              {...(orientation === "horizontal" ? { x: 0 } : { y: 0 })}
              stroke="var(--border)"
            />}
            {showMean && <ReferenceLine
              {...(orientation === "horizontal" ? { x: average } : { y: average })}
              stroke="var(--muted-foreground)"
              strokeDasharray="3 4"
              strokeOpacity={0.7}
              label={{ value: `Avg ${displayValue(Math.round(average))}`, position: "insideRight", fill: "var(--foreground)", fontSize: 11, fontWeight: 500 }}
            />}
            {activePoint && <ReferenceLine
              {...(orientation === "horizontal" ? { y: activePoint.axisLabel ?? activePoint.label } : { x: activePoint.axisLabel ?? activePoint.label })}
              stroke="var(--primary)"
              strokeDasharray="2 4"
              strokeOpacity={0.65}
            />}
            {series.map((item, seriesIndex) => <Bar
              key={item.key}
              dataKey={item.key}
              stackId={variant === "stacked" ? "series" : undefined}
              fill={item.color ?? `var(--color-${item.key})`}
              shape={barMark === "depth" ? <DepthMark /> : barMark === "lollipop" ? <LollipopMark /> : undefined}
              radius={orientation === "horizontal"
                ? variant === "diverging" ? [4, 0, 0, 4] : [0, 4, 4, 0]
                : variant === "stacked" && series.length > 1
                ? seriesIndex === 0 ? [0, 0, 4, 4] : seriesIndex === series.length - 1 ? [4, 4, 0, 0] : 0
                : [4, 4, 0, 0]}
              maxBarSize={28}
              isAnimationActive={false}
            >
              {data.map((point, index) => <Cell
                key={`${point.key}-${item.key}`}
                fill={barFill(point, item, index)}
              />)}
            </Bar>)}
          </RechartsBarChart>
        </ChartContainer>

        <div
          ref={plotRef}
          role="slider"
          tabIndex={data.length ? 0 : -1}
          aria-label={`${label}, explore by ${categoryLabel.toLowerCase()}`}
          aria-orientation={orientation === "horizontal" ? "vertical" : "horizontal"}
          aria-valuemin={1}
          aria-valuemax={Math.max(1, data.length)}
          aria-valuenow={(safeActiveIndex ?? Math.max(0, lastIndex)) + 1}
          aria-valuetext={currentDescription}
          aria-controls={dataTableId}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={(event) => { if (event.pointerType !== "mouse") selectIndex(null) }}
          onPointerCancel={() => selectIndex(null)}
          onPointerLeave={(event) => { if (event.pointerType === "mouse") selectIndex(null) }}
          onKeyDown={handleKeyDown}
          onFocus={() => selectIndex(safeActiveIndex ?? Math.max(0, lastIndex))}
          onBlur={() => selectIndex(null)}
          style={{ ...plotInsets, touchAction }}
          className="absolute z-10 cursor-crosshair rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <table className="sr-only" id={dataTableId}>
        <caption>{label}, {period}</caption>
        <thead><tr><th scope="col">{categoryLabel}</th>{series.map((item) => <th key={item.key} scope="col">{item.label}</th>)}</tr></thead>
        <tbody>{data.map((point) => <tr key={point.key}><th scope="row">{point.label}</th>{series.map((item) => <td key={item.key}>{displayValue(point.values[item.key] ?? 0)}{unitSuffix}</td>)}</tr>)}</tbody>
      </table>
    </figure>
  )
}

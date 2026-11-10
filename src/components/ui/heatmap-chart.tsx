"use client"

import { useId } from "react"

export type HeatmapCell = { key: string; row: string; column: string; value: number; status?: "normal" | "goal" | "warning" }
export type HeatmapChartProps = { data: readonly HeatmapCell[]; rows: readonly string[]; columns: readonly string[]; label: string }

export function HeatmapChart({ data, rows, columns, label }: HeatmapChartProps) {
  const id = useId()
  const maximum = Math.max(1, ...data.map((cell) => cell.value))
  const cellFor = (row: string, column: string) => data.find((cell) => cell.row === row && cell.column === column)
  return <figure className="grid w-full gap-3" aria-labelledby={`${id}-title`}>
    <figcaption className="sr-only" id={`${id}-title`}>{label}</figcaption>
    <div role="grid" aria-label={label} className="grid gap-1" style={{ gridTemplateColumns: `5rem repeat(${columns.length}, minmax(0, 1fr))` }}>
      <span />
      {columns.map((column) => <span key={column} className="text-center text-[10px] text-muted-foreground">{column}</span>)}
      {rows.map((row) => <div key={row} className="contents">
        <span className="self-center text-xs text-muted-foreground">{row}</span>
        {columns.map((column) => {
          const cell = cellFor(row, column)
          const intensity = (cell?.value ?? 0) / maximum
          return <span key={`${row}-${column}`} role="gridcell" title={`${row} ${column}: ${cell?.value ?? 0}`} className={`h-6 rounded-sm border border-background ${cell?.status === "goal" ? "bg-success" : cell?.status === "warning" ? "bg-warning" : "bg-primary"}`} style={{ opacity: 0.15 + intensity * 0.85 }} />
        })}
      </div>)}
    </div>
    <p className="text-xs text-muted-foreground">{label}. Darker cells indicate higher values.</p>
  </figure>
}

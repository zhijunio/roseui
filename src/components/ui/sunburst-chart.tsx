"use client"

import { useMemo, useState } from "react"
import { Cell, Pie, PieChart, Tooltip } from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

export type SunburstGroup = { key: string; label: string; value: number; color: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" }
type SunburstChild = { key: string; name: string; value: number; parent: string; color: SunburstGroup["color"] }

const groups: readonly SunburstGroup[] = [
  { key: "platform", label: "Platform", value: 49.8, color: "chart-3" },
  { key: "data", label: "Data", value: 50.1, color: "chart-2" },
  { key: "ml", label: "ML", value: 61.8, color: "chart-1" },
  { key: "product", label: "Product", value: 17.6, color: "chart-4" },
  { key: "security", label: "Security", value: 8.9, color: "chart-5" },
]
const children: readonly SunburstChild[] = [
  { key: "compute", name: "Compute", value: 25.2, parent: "platform", color: "chart-3" }, { key: "api", name: "API", value: 15.7, parent: "platform", color: "chart-3" }, { key: "cluster", name: "api-cluster", value: 8.9, parent: "platform", color: "chart-3" },
  { key: "warehouse", name: "Warehouse", value: 26.4, parent: "data", color: "chart-2" }, { key: "analytics", name: "Analytics", value: 15.8, parent: "data", color: "chart-2" }, { key: "lake", name: "Data lake", value: 7.9, parent: "data", color: "chart-2" },
  { key: "training", name: "Training", value: 34.2, parent: "ml", color: "chart-1" }, { key: "gpu", name: "gpu-train", value: 17.4, parent: "ml", color: "chart-1" }, { key: "inference", name: "Inference", value: 10.2, parent: "ml", color: "chart-1" },
  { key: "design", name: "Design", value: 9.4, parent: "product", color: "chart-4" }, { key: "research", name: "Research", value: 8.2, parent: "product", color: "chart-4" },
  { key: "iam", name: "IAM", value: 5.1, parent: "security", color: "chart-5" }, { key: "audit", name: "Audit", value: 3.8, parent: "security", color: "chart-5" },
]
const colors: Record<SunburstGroup["color"], string> = { "chart-1": "var(--chart-1)", "chart-2": "var(--chart-2)", "chart-3": "var(--chart-3)", "chart-4": "var(--chart-4)", "chart-5": "var(--chart-5)" }
const config: ChartConfig = { value: { label: "Cloud spend", color: "var(--chart-3)" } }

export function SunburstChart({ month = "September 2026" }: { month?: string }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [focused, setFocused] = useState(0)
  const currentGroup = groups.find((item) => item.key === selected)
  const visibleGroups = selected ? groups.filter((item) => item.key === selected) : groups
  const visibleChildren = selected ? children.filter((item) => item.parent === selected) : children
  const total = currentGroup?.value ?? groups.reduce((sum, item) => sum + item.value, 0)
  const groupRows = useMemo(() => visibleGroups.map((item) => ({ ...item, fill: colors[item.color] })), [visibleGroups])
  const childRows = useMemo(() => visibleChildren.map((item) => ({ ...item, fill: `color-mix(in oklab, ${colors[item.color]} 72%, var(--background))` })), [visibleChildren])
  const leafRows = useMemo(() => visibleChildren.map((item, index) => ({ ...item, key: `${item.key}-leaf`, name: index % 2 ? `${item.name} jobs` : item.name, value: Math.max(1, item.value * (index % 2 ? .38 : .62)), fill: `color-mix(in oklab, ${colors[item.color]} ${index % 2 ? 52 : 88}%, var(--background))` })), [visibleChildren])
  const focusItems = selected ? visibleChildren : groups
  function moveFocus(direction: number) { setFocused((current) => (current + direction + focusItems.length) % focusItems.length) }
  function zoomIn() { const item = focusItems[focused]; if (item && "parent" in item) setSelected(item.parent); else if (item) setSelected(item.key) }
  function zoomOut() { setSelected(null); setFocused(0) }
  return <div className="grid w-full gap-4">
    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"><button type="button" className="font-medium text-foreground hover:underline" onClick={zoomOut}>All teams</button>{currentGroup && <><span aria-hidden="true">/</span><span>{currentGroup.label}</span></>}</div>
    <div className="grid min-w-0 items-center gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,.85fr)]">
      <ChartContainer config={config} className="h-[28rem] min-w-0 w-full aspect-auto" aria-label="Cloud spend by team and service" tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); moveFocus(event.key === "ArrowRight" ? 1 : -1) } if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") { event.preventDefault(); zoomIn() } if (event.key === "ArrowUp" || event.key === "Escape" || event.key === "Backspace") { event.preventDefault(); zoomOut() } }}>
        <PieChart accessibilityLayer>
          <Tooltip cursor={false} content={({ active, payload }) => active && payload?.[0] ? <div className="rounded-xl border border-border bg-popover px-3 py-2 text-xs shadow-lg"><p className="font-medium text-foreground">{String(payload[0].name)}</p><p className="tabular-nums text-muted-foreground">${Number(payload[0].value).toFixed(1)}K</p></div> : null} />
          <Pie data={groupRows} dataKey="value" nameKey="label" innerRadius={58} outerRadius={112} paddingAngle={1.5} stroke="var(--background)" strokeWidth={2} isAnimationActive animationDuration={600} animationEasing="ease-out" label={({ name, x, y, textAnchor }) => <text x={x} y={y} textAnchor={textAnchor} fill="var(--foreground)" fontSize={11} fontWeight={500}>{name}</text>} labelLine={false} onClick={(_, index) => { const row = groupRows[index]; if (row) setSelected(row.key) }}>
            {groupRows.map((item) => <Cell key={item.key} fill={item.fill} />)}
          </Pie>
          <Pie data={childRows} dataKey="value" nameKey="name" innerRadius={116} outerRadius={166} paddingAngle={1.5} stroke="var(--background)" strokeWidth={2} isAnimationActive animationDuration={700} animationEasing="ease-out">
            {childRows.map((item) => <Cell key={item.key} fill={item.fill} />)}
          </Pie>
          <Pie data={leafRows} dataKey="value" nameKey="name" innerRadius={170} outerRadius={198} paddingAngle={1} stroke="var(--background)" strokeWidth={2} isAnimationActive animationDuration={800} animationEasing="ease-out">
            {leafRows.map((item) => <Cell key={item.key} fill={item.fill} />)}
          </Pie>
          <text x="50%" y="45%" textAnchor="middle" className="fill-muted-foreground text-[13px]">{currentGroup?.label ?? "All teams"}</text><text x="50%" y="54%" textAnchor="middle" className="fill-foreground text-[28px] font-semibold">${total.toFixed(1)}K</text><text x="50%" y="62%" textAnchor="middle" className="fill-muted-foreground text-[12px]">{groups.length} groups</text>
        </PieChart>
      </ChartContainer>
      <div className="grid gap-2" aria-live="polite">{groups.map((item) => <button type="button" key={item.key} onClick={() => setSelected(selected === item.key ? null : item.key)} className={`grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected === item.key ? "bg-muted/70" : ""}`} aria-pressed={selected === item.key}><span className="size-3 rounded-full" style={{ backgroundColor: colors[item.color] }} /><span className="text-base text-muted-foreground">{item.label}</span><span className="text-base font-medium tabular-nums">${item.value.toFixed(1)}K</span><span className="w-14 text-right text-base tabular-nums text-muted-foreground">{((item.value / 188.2) * 100).toFixed(1)}%</span></button>)}</div>
    </div>
    <p className="sr-only" aria-live="polite">{month}. {selected ? `${currentGroup?.label} selected.` : "All teams selected."}</p>
  </div>
}

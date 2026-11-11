"use client"

import { useId, useState } from "react"
import { IconDots } from "@tabler/icons-react"

export type SankeyNode = { id: string; label: string; value: number; color?: string }
export type SankeyLink = { from: string; to: string; value: number }
export type SankeyStage = { id: string; label: string; nodes: readonly [SankeyNode, ...SankeyNode[]] }
export type SankeyChartProps = {
  stages?: readonly [SankeyStage, SankeyStage, ...SankeyStage[]]
  sources?: readonly [SankeyNode, ...SankeyNode[]]
  targets?: readonly [SankeyNode, ...SankeyNode[]]
  links: readonly SankeyLink[]
  label: string
  flowLabel?: string
}

type LayoutNode = SankeyNode & { x: number; y: number; height: number; color: string; stage: number }
type LinkSegment = { source: LayoutNode; target: LayoutNode }

function colorFor(index: number) {
  return `var(--chart-${(index % 5) + 1})`
}

export function SankeyChart({ stages, sources, targets, links, label, flowLabel = "Flow" }: SankeyChartProps) {
  const id = useId()
  const [active, setActive] = useState<string | null>(null)
  const [particles, setParticles] = useState(true)
  const [focused, setFocused] = useState(0)
  const chartStages = stages ?? (sources && targets ? [
    { id: "source", label: "Source", nodes: sources },
    { id: "target", label: "Target", nodes: targets },
  ] : [])
  const width = 900
  const height = 430
  const top = 50
  const bottom = 22
  const nodeWidth = 10
  const stageTotal = (stage: SankeyStage) => stage.nodes.reduce((sum, item) => sum + item.value, 0)
  const layoutStage = (stage: SankeyStage, stageIndex: number): LayoutNode[] => {
    const x = chartStages.length === 1 ? width / 2 : 46 + stageIndex * ((width - 126) / (chartStages.length - 1))
    const gap = chartStages.length > 2 ? 14 : 22
    const available = height - top - bottom - gap * (stage.nodes.length - 1)
    const total = Math.max(stageTotal(stage), 1)
    let y = top
    return stage.nodes.map((item, index) => {
      const node = { ...item, x, y, height: Math.max(10, item.value / total * available), color: item.color ?? colorFor(index), stage: stageIndex }
      y += node.height + gap
      return node
    })
  }
  const layout = chartStages.flatMap(layoutStage)
  const nodeById = (nodeId: string) => layout.find((item) => item.id === nodeId)
  const offsets = new Map<string, number>()
  const segments = new Map<string, LinkSegment>()
  links.forEach((link) => {
    const source = nodeById(link.from)
    const target = nodeById(link.to)
    if (!source || !target) return
    const sourceKey = `${source.stage}:${source.id}`
    const targetKey = `${target.stage}:${target.id}`
    const sourceOffset = offsets.get(sourceKey) ?? 0
    const targetOffset = offsets.get(targetKey) ?? 0
    const sourceHeight = link.value / Math.max(source.value, 1) * source.height
    const targetHeight = link.value / Math.max(target.value, 1) * target.height
    offsets.set(sourceKey, sourceOffset + sourceHeight)
    offsets.set(targetKey, targetOffset + targetHeight)
    segments.set(`${link.from}-${link.to}`, {
      source: { ...source, y: source.y + sourceOffset, height: sourceHeight },
      target: { ...target, y: target.y + targetOffset, height: targetHeight },
    })
  })
  const total = links.reduce((sum, link) => sum + link.value, 0)

  return <figure className="grid w-full gap-4" aria-labelledby={`${id}-title`}>
    <figcaption className="sr-only" id={`${id}-title`}>{label}</figcaption>
    <div className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground sm:grid-cols-4">
      {chartStages.map((stage) => <span key={stage.id} className="truncate">{stage.label}</span>)}
    </div>
    <div className="relative min-w-0 overflow-hidden rounded-xl border bg-card p-3 sm:p-5">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label} className="block h-auto min-h-[24rem] w-full" tabIndex={0}
        onKeyDown={(event) => {
          if (!layout.length) return
          if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); setFocused((current) => (current + 1) % layout.length) }
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); setFocused((current) => (current - 1 + layout.length) % layout.length) }
          if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActive(layout[focused]?.id ?? null) }
          if (event.key === "Escape") setActive(null)
        }}>
        {links.map((link) => {
          const segment = segments.get(`${link.from}-${link.to}`)
          if (!segment) return null
          const { source, target } = segment
          const sourceX = source.x + nodeWidth
          const targetX = target.x
          const curve = Math.max(36, (targetX - sourceX) * 0.42)
          const path = `M${sourceX} ${source.y} C${sourceX + curve} ${source.y}, ${targetX - curve} ${target.y}, ${targetX} ${target.y} L${targetX} ${target.y + target.height} C${targetX - curve} ${target.y + target.height}, ${sourceX + curve} ${source.y + source.height}, ${sourceX} ${source.y + source.height} Z`
          const highlighted = !active || link.from === active || link.to === active
          return <g key={`${link.from}-${link.to}`} opacity={highlighted ? 1 : 0.14}>
            <path d={path} fill={source.color} fillOpacity={highlighted ? 0.28 : 0.16}><title>{`${link.value.toLocaleString()} from ${source.label} to ${target.label}`}</title></path>
            {particles && highlighted ? <circle r="2.5" fill="var(--foreground)" opacity="0.65"><animateMotion dur="2.8s" repeatCount="indefinite" path={path} /></circle> : null}
          </g>
        })}
        {layout.map((item, index) => {
          const selected = active === item.id
          const dimmed = active !== null && !selected
          const labelX = item.x + nodeWidth + 14
          const focusedNode = focused === index
          return <g key={item.id} opacity={dimmed ? 0.35 : 1} onMouseEnter={() => setActive(item.id)} onMouseLeave={() => setActive(null)} onClick={() => setActive(selected ? null : item.id)}>
            <rect x={item.x} y={item.y} width={nodeWidth} height={item.height} rx="3" fill={item.color} stroke={focusedNode ? "var(--foreground)" : "none"} strokeWidth="2" />
            <text x={labelX} y={item.y + item.height / 2 - 2} dominantBaseline="middle" className="fill-foreground text-[14px] font-medium">{item.label}</text>
            <text x={labelX} y={item.y + item.height / 2 + 17} dominantBaseline="middle" className="fill-muted-foreground text-[13px] tabular-nums">{item.value.toLocaleString()}</text>
          </g>
        })}
      </svg>
      <button type="button" className="absolute bottom-3 right-3 inline-flex h-9 items-center gap-2 rounded-full border bg-background px-3 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-muted focus-visible:bg-muted sm:bottom-4 sm:right-4" aria-pressed={particles} onClick={() => setParticles((value) => !value)}>
        <IconDots aria-hidden="true" className="size-4 text-foreground" />{flowLabel}
      </button>
    </div>
    <p className="sr-only">Total flow {total.toLocaleString()}. {links.map((link) => `${nodeById(link.from)?.label ?? link.from} to ${nodeById(link.to)?.label ?? link.to}: ${link.value.toLocaleString()}`).join(". ")}</p>
  </figure>
}

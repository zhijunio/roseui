"use client"

import { useEffect, useMemo, useRef, useState, type PointerEvent, type Ref } from "react"
import styles from "./realtime-stream.module.css"

export type StreamPoint = { t: number; value: number; anomaly?: string }

export interface RealtimeStreamProps {
  points: StreamPoint[]
  label: string
  unit?: string
  windowMs?: number
  interval?: number
  height?: number
  formatValue?: (value: number) => string
  formatTime?: (time: number) => string
  paused?: boolean
  defaultPaused?: boolean
  onPausedChange?: (paused: boolean) => void
  pauseOnHover?: boolean
  min?: number
  max?: number
  emptyLabel?: string
  ref?: Ref<HTMLElement>
  className?: string
}

const defaultTime = (time: number) => new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(time)

function cssColor(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

export function RealtimeStream({ points, label, unit = "", windowMs = 30_000, interval = 1_000, height = 200, formatValue = value => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value), formatTime = defaultTime, paused: controlledPaused, defaultPaused = false, onPausedChange, pauseOnHover = true, min, max, emptyLabel = "Waiting for data", ref, className }: RealtimeStreamProps) {
  const [internalPaused, setInternalPaused] = useState(defaultPaused)
  const [hovered, setHovered] = useState<number | null>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; point: StreamPoint } | null>(null)
  const plot = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef(points)
  const paused = controlledPaused ?? internalPaused
  const pausedRef = useRef(paused)
  const hoverRef = useRef(hovered)
  const hoverPausedRef = useRef(false)
  const latestRef = useRef(0)
  const onPaused = (next: boolean) => { if (controlledPaused === undefined) setInternalPaused(next); onPausedChange?.(next) }

  useEffect(() => { pointsRef.current = points }, [points])
  useEffect(() => { pausedRef.current = paused }, [paused])
  useEffect(() => { hoverRef.current = hovered }, [hovered])

  useEffect(() => {
    const node = plot.current
    const target = canvas.current
    if (!node || !target) return
    const context = target.getContext("2d")
    if (!context) return
    let frame = 0
    let width = 0
    let pixelRatio = 1
    let border = "oklch(0.946 0.003 264.542)"
    let muted = "oklch(0.506 0.01 264.477)"
    let foreground = "oklch(0.247 0.006 258.361)"
    let accent = "oklch(0.689 0.179 49.902)"
    let surface = "oklch(1 0 0)"
    let bodyFont = "system-ui, sans-serif"
    const draw = () => {
      const bounds = node.getBoundingClientRect()
      const nextPixelRatio = window.devicePixelRatio || 1
      if (bounds.width !== width || nextPixelRatio !== pixelRatio) {
        width = bounds.width
        pixelRatio = nextPixelRatio
        target.width = Math.max(1, Math.round(width * pixelRatio))
        target.height = Math.max(1, Math.round(height * pixelRatio))
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        border = cssColor("--border", border)
        muted = cssColor("--muted-foreground", muted)
        foreground = cssColor("--foreground", foreground)
        accent = cssColor("--warning", accent)
        surface = cssColor("--card", surface)
        bodyFont = getComputedStyle(document.documentElement).fontFamily || bodyFont
      }
      context.clearRect(0, 0, width, height)
      const currentPoints = pointsRef.current
      if (!currentPoints.length) return
      const latest = currentPoints[currentPoints.length - 1]!.t
      latestRef.current = latest
      const visible = currentPoints.filter(point => point.t >= latest - windowMs)
      const values = visible.map(point => point.value)
      const low = min ?? Math.floor(Math.min(...values) / 20) * 20
      const high = max ?? (Math.ceil(Math.max(...values) / 20) * 20 || low + 1)
      const top = 12, bottom = height - 30, left = 0, right = 52
      const xOf = (time: number) => left + ((time - (latest - windowMs)) / windowMs) * (width - left - right)
      const yOf = (value: number) => bottom - ((value - low) / Math.max(1, high - low)) * (bottom - top)
      context.font = `13px ${bodyFont}`
      context.lineWidth = 1
      context.strokeStyle = border
      context.beginPath()
      context.moveTo(left, yOf(low + (high - low) / 2) + .5)
      context.lineTo(width - right, yOf(low + (high - low) / 2) + .5)
      context.stroke()
      context.fillStyle = muted
      context.textAlign = "left"
      context.fillText(formatValue(low + (high - low) / 2), width - right + 10, yOf(low + (high - low) / 2) + 4)
      context.fillText("−30s", left, height - 4)
      context.fillText("−15s", left + (width - left - right) / 2 - 15, height - 4)
      context.fillText("now", width - right - 25, height - 4)
      if (visible.length < 2) return
      context.beginPath()
      visible.forEach((point, index) => { const x = xOf(point.t), y = yOf(point.value); if (index === 0) context.moveTo(x, y); else context.lineTo(x, y) })
      context.lineTo(xOf(visible[visible.length - 1]!.t), bottom)
      context.lineTo(xOf(visible[0]!.t), bottom)
      context.closePath()
      context.fillStyle = accent
      context.globalAlpha = .1
      context.fill()
      context.globalAlpha = 1
      context.beginPath()
      visible.forEach((point, index) => { const x = xOf(point.t), y = yOf(point.value); if (index === 0) context.moveTo(x, y); else context.lineTo(x, y) })
      context.strokeStyle = accent
      context.lineWidth = 2.5
      context.lineJoin = "round"
      context.lineCap = "round"
      context.stroke()
      visible.forEach(point => { if (!point.anomaly) return; context.beginPath(); context.arc(xOf(point.t), yOf(point.value), 4, 0, Math.PI * 2); context.fillStyle = accent; context.fill(); context.strokeStyle = surface; context.lineWidth = 2; context.stroke() })
      const active = hoverRef.current === null ? null : pointsRef.current[hoverRef.current]
      if (active) { const x = xOf(active.t); context.beginPath(); context.moveTo(x, top); context.lineTo(x, bottom); context.strokeStyle = foreground; context.globalAlpha = .45; context.lineWidth = 1; context.stroke(); context.globalAlpha = 1 }
    }
    const observer = new ResizeObserver(draw)
    observer.observe(node)
    const animate = () => { draw(); frame = window.requestAnimationFrame(animate) }
    frame = window.requestAnimationFrame(animate)
    return () => { observer.disconnect(); window.cancelAnimationFrame(frame) }
  }, [formatValue, height, max, min, windowMs])

  const latest = points[points.length - 1]
  const reading = hovered === null ? latest : points[hovered] ?? latest
  const rows = useMemo(() => points.slice(-20), [points])
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!pauseOnHover) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const position = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width))
    const visibleStart = Math.max(0, points.length - Math.ceil(windowMs / interval) - 1)
    const index = visibleStart + Math.round(position * (points.length - visibleStart - 1))
    const point = points[index]
    if (!point) return
    setHovered(index)
    setTooltip({ x: event.clientX - bounds.left, y: event.clientY - bounds.top, point })
  }
  const onPointerLeave = () => { setHovered(null); setTooltip(null) }
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => { if (event.key === " " || event.key === "Enter") { event.preventDefault(); onPaused(!paused) } }

  return <figure ref={ref} className={[styles.figure, className].filter(Boolean).join(" ")} aria-label={`${label}${unit ? ` ${unit}` : ""}`}>
    <div className={styles.head}>
      <p className={styles.now} aria-label={`${label}, ${reading ? formatValue(reading.value) : emptyLabel}`}><span aria-hidden="true">{reading ? formatValue(reading.value) : "0"}</span>{unit && <span className={styles.unit} aria-hidden="true">{unit}</span>}</p>
      <button type="button" className={styles.status} aria-pressed={paused} onClick={() => onPaused(!paused)}><span className={styles.statusDot} aria-hidden="true" /><span>{paused ? "Resume" : "Pause"}</span></button>
    </div>
    <div ref={plot} className={styles.plot} style={{ height }} role="group" tabIndex={0} aria-roledescription="live chart" aria-label={`${label}, last ${Math.round(windowMs / 1000)} seconds. Focus holds the view. Use left and right arrows to read points, Space to pause or resume.`} onPointerMove={onPointerMove} onPointerEnter={() => { if (pauseOnHover && !paused) { hoverPausedRef.current = true; onPaused(true) } }} onPointerLeave={() => { onPointerLeave(); if (hoverPausedRef.current) { hoverPausedRef.current = false; onPaused(false) } }} onKeyDown={onKeyDown}>
      <canvas ref={canvas} className={styles.canvas} aria-hidden="true" />
      {tooltip && <div className={styles.tooltip} style={{ left: tooltip.x, top: tooltip.y }} aria-hidden="true"><p className={styles.tipValue}>{formatValue(tooltip.point.value)} {unit}</p><p className={styles.tipMeta}>{formatTime(tooltip.point.t)}</p></div>}
      {!points.length && <p>{emptyLabel}</p>}
    </div>
    <div className={styles.srOnly}><table><caption>{label}</caption><tbody>{rows.map(point => <tr key={point.t}><th scope="row">{formatTime(point.t)}</th><td>{formatValue(point.value)} {unit}{point.anomaly ? `, ${point.anomaly}` : ""}</td></tr>)}</tbody></table></div>
  </figure>
}

export default RealtimeStream

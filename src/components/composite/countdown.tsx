"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export type CountdownUnit = "days" | "hours" | "minutes" | "seconds"
export type CountdownVariant = "segments" | "compact"

const unitOrder: readonly CountdownUnit[] = ["days", "hours", "minutes", "seconds"]
const unitSeconds: Record<CountdownUnit, number> = {
  days: 86_400,
  hours: 3_600,
  minutes: 60,
  seconds: 1,
}
const unitLabels: Record<CountdownUnit, readonly [string, string]> = {
  days: ["day", "days"],
  hours: ["hour", "hours"],
  minutes: ["minute", "minutes"],
  seconds: ["second", "seconds"],
}

function resolveTarget(target: Date | number) {
  const timestamp = target instanceof Date ? target.getTime() : target
  return Number.isFinite(timestamp) ? timestamp : null
}

function getUnitValues(totalSeconds: number, units: readonly CountdownUnit[]) {
  let remaining = totalSeconds
  const values = new Map<CountdownUnit, number>()

  for (const unit of unitOrder) {
    if (!units.includes(unit)) continue
    values.set(unit, Math.floor(remaining / unitSeconds[unit]))
    remaining %= unitSeconds[unit]
  }

  return values
}

function pad(value: number) {
  return String(value).padStart(2, "0")
}

function Countdown({
  target,
  label,
  units = unitOrder,
  variant = "segments",
  completeLabel = "Complete",
  onComplete,
  className,
}: {
  target: Date | number
  label: string
  units?: readonly CountdownUnit[]
  variant?: CountdownVariant
  completeLabel?: ReactNode
  onComplete?: () => void
  className?: string
}) {
  const targetTime = resolveTarget(target)
  const [now, setNow] = useState<number | null>(null)
  const completion = useRef({ target: targetTime, fired: false })
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (completion.current.target !== targetTime) {
      completion.current = { target: targetTime, fired: false }
    }
    let timeoutId: number | undefined

    const update = () => {
      const current = Date.now()
      setNow(current)

      if (
        targetTime !== null &&
        current >= targetTime &&
        completion.current.target === targetTime &&
        !completion.current.fired
      ) {
        completion.current.fired = true
        onCompleteRef.current?.()
      }

      if (targetTime !== null && current < targetTime) {
        timeoutId = window.setTimeout(update, 1_000 - (current % 1_000))
      }
    }

    const updateWhenVisible = () => {
      if (document.visibilityState !== "visible") return
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
      update()
    }

    update()
    document.addEventListener("visibilitychange", updateWhenVisible)

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
      document.removeEventListener("visibilitychange", updateWhenVisible)
    }
  }, [targetTime])

  const selectedUnits = unitOrder.filter((unit) => units.includes(unit))
  const isAvailable = targetTime !== null
  const isReady = now !== null
  const isComplete = isAvailable && isReady && now >= targetTime
  const remainingSeconds = isComplete || !isAvailable || !isReady
    ? 0
    : Math.ceil((targetTime - now) / 1_000)
  const values = getUnitValues(remainingSeconds, selectedUnits)

  return (
    <div
      role="timer"
      aria-label={label}
      aria-live="off"
      className={cn("min-w-0", className)}
    >
      {!isAvailable ? (
        <span className="text-sm text-muted-foreground">Countdown unavailable</span>
      ) : isComplete ? (
        <span className="text-sm font-medium text-foreground">{completeLabel}</span>
      ) : variant === "compact" ? (
        <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-border bg-card px-3 py-1.5 text-sm tabular-nums">
          {selectedUnits.map((unit) => (
            <span key={unit} className="whitespace-nowrap">
              {isReady ? values.get(unit) ?? 0 : "--"}{unitLabels[unit][0][0]}
            </span>
          ))}
        </span>
      ) : (
        <div
          className="grid min-w-0 gap-2 sm:gap-3"
          style={{ gridTemplateColumns: `repeat(${Math.max(selectedUnits.length, 1)}, minmax(0, 1fr))` }}
        >
          {selectedUnits.length === 0 ? (
            <span className="text-sm text-muted-foreground">No time units selected</span>
          ) : selectedUnits.map((unit) => (
            <div
              key={unit}
              className="flex min-w-0 flex-col items-center justify-center rounded-lg border border-border bg-card px-2 py-3 sm:px-4 sm:py-4"
            >
              <span className="text-3xl font-semibold tabular-nums tracking-tight sm:text-4xl">
                {isReady
                  ? unit === "days" ? values.get(unit) ?? 0 : pad(values.get(unit) ?? 0)
                  : "--"}
              </span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {unitLabels[unit][1]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { Countdown }

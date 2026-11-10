"use client"

import * as React from "react"
import type { ReactNode } from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  onFocusCapture,
  onKeyDownCapture,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  const arrowNavigationRef = React.useRef(false)
  const arrowNavigationFromRef = React.useRef<HTMLElement | null>(null)
  const arrowNavigationTimeoutRef = React.useRef<number | undefined>(undefined)

  React.useEffect(() => () => {
    window.clearTimeout(arrowNavigationTimeoutRef.current)
  }, [])

  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      onKeyDownCapture={(event) => {
        onKeyDownCapture?.(event)
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.altKey ||
          event.shiftKey ||
          !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
        ) return

        arrowNavigationRef.current = true
        arrowNavigationFromRef.current =
          event.target instanceof HTMLElement && event.target.getAttribute("role") === "radio"
            ? event.target
            : null
        window.clearTimeout(arrowNavigationTimeoutRef.current)
        arrowNavigationTimeoutRef.current = window.setTimeout(() => {
          arrowNavigationRef.current = false
          arrowNavigationFromRef.current = null
        }, 100)
      }}
      onFocusCapture={(event) => {
        onFocusCapture?.(event)
        const target = event.target
        if (
          event.defaultPrevented ||
          !arrowNavigationRef.current ||
          !(target instanceof HTMLElement) ||
          target.getAttribute("role") !== "radio" ||
          target === arrowNavigationFromRef.current
        ) return

        arrowNavigationRef.current = false
        arrowNavigationFromRef.current = null
        window.clearTimeout(arrowNavigationTimeoutRef.current)
        target.click()
      }}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  indicator,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  indicator?: ReactNode
}) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        {indicator ?? (
          <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
        )}
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }

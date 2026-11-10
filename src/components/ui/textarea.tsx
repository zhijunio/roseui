import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  size = "default",
  autoResize = true,
  maxRows,
  style,
  ...props
}: React.ComponentProps<"textarea"> & {
  size?: "default" | "sm"
  autoResize?: boolean
  maxRows?: number
}) {
  return (
    <textarea
      data-slot="textarea"
      data-size={size}
      className={cn(
        "flex min-h-16 w-full rounded-[var(--radius-control)] border border-input bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-ring/70 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        size === "sm" ? "px-2.5" : "px-3",
        autoResize && "field-sizing-content",
        className
      )}
      style={{
        ...style,
        ...(maxRows ? { maxHeight: `calc(${maxRows} * 1.25rem + 1rem + 2px)` } : {}),
      }}
      {...props}
    />
  )
}

export { Textarea }

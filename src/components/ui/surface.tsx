import * as React from "react"

import { cn } from "@/lib/utils"

type SurfaceVariant = "default" | "secondary" | "tertiary" | "transparent"

function Surface({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: SurfaceVariant }) {
  return (
    <div
      data-slot="surface"
      data-variant={variant}
      className={cn(
        "rounded-xl border border-border text-card-foreground",
        variant === "default" && "bg-card",
        variant === "secondary" && "bg-muted/50",
        variant === "tertiary" && "bg-muted",
        variant === "transparent" && "bg-transparent",
        className,
      )}
      {...props}
    />
  )
}

export { Surface }
export type { SurfaceVariant }

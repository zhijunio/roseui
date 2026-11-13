"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "react-aria-components/Separator"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant = "default",
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive> & {
  decorative?: boolean
  variant?: "default" | "secondary" | "tertiary"
}) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      aria-hidden={decorative || undefined}
      orientation={orientation}
      className={cn(
        "shrink-0 orientation-horizontal:h-px orientation-horizontal:w-full orientation-vertical:w-px orientation-vertical:self-stretch",
        variant === "default" && "bg-border",
        variant === "secondary" && "bg-muted/50",
        variant === "tertiary" && "bg-muted/25",
        className
      )}
      {...props}
    />
  )
}

function ContentDivider({ children, align = "center", variant = "single", className }: {
  children: ReactNode
  align?: "start" | "center" | "end"
  variant?: "single" | "double" | "fill"
  className?: string
}) {
  return <div className={cn("flex w-full items-center gap-3 text-xs text-muted-foreground", align === "start" && "justify-start", align === "center" && "justify-center", align === "end" && "justify-end", variant === "fill" && "rounded-md bg-muted px-3 py-2", className)}>
    {align !== "start" && <Separator aria-hidden="true" className={cn("flex-1", variant === "double" && "h-0 border-y border-border bg-transparent")} />}
    <span className="shrink-0">{children}</span>
    {align !== "end" && <Separator aria-hidden="true" className={cn("flex-1", variant === "double" && "h-0 border-y border-border bg-transparent")} />}
  </div>
}

export { Separator, ContentDivider }

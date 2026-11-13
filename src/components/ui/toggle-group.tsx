"use client"

import * as React from "react"
import { ToggleButtonGroup } from "react-aria-components/ToggleButtonGroup"
import { ToggleButton } from "react-aria-components/ToggleButton"
import { composeRenderProps } from "react-aria-components/composeRenderProps"

import { cn } from "@/lib/utils"

const sizeClasses = { sm: "h-8 px-2 text-xs", default: "h-9 px-2.5 text-sm", lg: "h-11 px-3 text-sm" } as const
const ToggleGroupContext = React.createContext<{ variant: "default" | "outline"; size: "sm" | "default" | "lg"; connected: boolean }>({ variant: "default", size: "default", connected: true })

function ToggleGroup({ className, variant = "default", size = "default", spacing = 0, orientation = "horizontal", fullWidth = false, ...props }: React.ComponentProps<typeof ToggleButtonGroup> & {
  variant?: "default" | "outline"
  size?: "sm" | "default" | "lg"
  spacing?: number
  fullWidth?: boolean
}) {
  return <ToggleButtonGroup data-slot="toggle-group" data-variant={variant} data-size={size} data-spacing={spacing} data-full-width={fullWidth || undefined} orientation={orientation} style={{ "--toggle-group-gap": `${spacing * 0.25}rem` } as React.CSSProperties} className={composeRenderProps(className, (className) => cn("group/toggle-group flex w-fit items-center gap-[var(--toggle-group-gap)] orientation-vertical:flex-col", fullWidth && "w-full [&>[data-slot=toggle-group-item]]:flex-1 orientation-vertical:[&>[data-slot=toggle-group-item]]:w-full orientation-vertical:[&>[data-slot=toggle-group-item]]:flex-none", className))} {...props}>{(renderProps) => <ToggleGroupContext.Provider value={{ variant, size, connected: spacing === 0 }}>{typeof props.children === "function" ? props.children(renderProps) : props.children}</ToggleGroupContext.Provider>}</ToggleButtonGroup>
}

function ToggleGroupItem({ className, variant, size, ...props }: React.ComponentProps<typeof ToggleButton> & {
  variant?: React.ComponentProps<typeof ToggleGroup>["variant"]
  size?: React.ComponentProps<typeof ToggleGroup>["size"]
}) {
  const context = React.useContext(ToggleGroupContext)
  const currentVariant = variant ?? context.variant
  const currentSize = size ?? context.size
  return <ToggleButton data-slot="toggle-group-item" data-variant={currentVariant} data-size={currentSize} className={composeRenderProps(className, (className) => cn("inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md font-medium transition-colors outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 selected:bg-primary/10 selected:text-primary [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", sizeClasses[currentSize], currentVariant === "outline" && "border border-input bg-background hover:bg-muted/70", currentVariant === "default" && "hover:bg-muted", context.connected && "rounded-none first:rounded-s-md last:rounded-e-md group-orientation-vertical/toggle-group:first:rounded-t-md group-orientation-vertical/toggle-group:first:rounded-s-none group-orientation-vertical/toggle-group:last:rounded-b-md group-orientation-vertical/toggle-group:last:rounded-e-none group-orientation-horizontal/toggle-group:[&+*]:-ms-px group-orientation-vertical/toggle-group:[&+*]:-mt-px", className))} {...props} />
}

export { ToggleGroup, ToggleGroupItem }

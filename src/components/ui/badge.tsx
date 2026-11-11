import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap motion-safe:transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive: "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-success text-success-foreground",
        info: "bg-info text-info-foreground",
        warning: "bg-warning text-warning-foreground",
        "primary-outline": "border-primary/40 text-primary",
        "destructive-outline": "border-destructive/40 text-destructive",
        "success-outline": "border-success/40 text-success",
        "info-outline": "border-info/40 text-info",
        "warning-outline": "border-warning/40 text-warning",
        "primary-light": "bg-primary/10 text-primary",
        "destructive-light": "bg-destructive-soft text-destructive",
        "success-light": "bg-success-soft text-success",
        "info-light": "bg-info-soft text-info",
        "warning-light": "bg-warning-soft text-warning",
      },
      size: {
        default: "",
        sm: "h-4 px-1.5 text-[10px]",
        lg: "h-6 px-2.5",
      },
      radius: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: { variant: "default", size: "default", radius: null },
  }
)
export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>
export type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>["size"]>
export type BadgePlacement = "top-right" | "top-left" | "bottom-right" | "bottom-left"

const badgePlacementClasses: Record<BadgePlacement, string> = {
  "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  "bottom-right": "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
  "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  size = "default",
  radius,
  placement,
  dot = false,
  ...props
}: React.ComponentProps<"span"> & {
  variant?: BadgeVariant
  asChild?: boolean
  size?: BadgeSize
  radius?: "default" | "full"
  placement?: BadgePlacement
  dot?: boolean
}) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      data-placement={placement}
      data-dot={dot ? "" : undefined}
      className={cn(
        badgeVariants({ variant, size, radius }),
        placement && `absolute z-10 ${badgePlacementClasses[placement]}`,
        dot && "rounded-full border-2 border-background p-0",
        dot && size === "sm" && "size-2",
        dot && size === "default" && "size-2.5",
        dot && size === "lg" && "size-3",
        className,
      )}
      {...props}
    />
  )
}

function BadgeAnchor({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge-anchor"
      className={cn("relative inline-flex w-fit", className)}
      {...props}
    />
  )
}

export { Badge, BadgeAnchor, badgeVariants }

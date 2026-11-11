"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Toggle as TogglePrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "group/toggle inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-pressed:bg-accent aria-pressed:text-secondary-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-muted",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-secondary-foreground",
      },
      size: {
        sm: "h-8 min-w-8 px-2",
        default: "h-9 min-w-9 px-2.5",
        lg: "h-10 min-w-10 px-3",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export type ToggleVariant = NonNullable<VariantProps<typeof toggleVariants>["variant"]>
export type ToggleSize = NonNullable<VariantProps<typeof toggleVariants>["size"]>
export function Toggle({
  className,
  variant = "default",
  size = "default",
  isIconOnly = false,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants> & { isIconOnly?: boolean }) {
  return <TogglePrimitive.Root
    data-slot="toggle"
    data-variant={variant}
    data-size={size}
    data-icon-only={isIconOnly || undefined}
    className={cn(
      toggleVariants({ variant, size }),
      isIconOnly && (size === "sm" ? "w-8 px-0" : size === "lg" ? "w-10 px-0" : "w-9 px-0"),
      className,
    )}
    {...props}
  />
}

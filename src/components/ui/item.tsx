import * as React from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export type ItemVariant = "default" | "card" | "secondary" | "tertiary" | "outline" | "transparent" | "muted"
export type ItemSize = "default" | "sm" | "xs"
export type ItemGroupLayout = "list" | "grid"
export type ItemGroupVariant = "default" | "secondary" | "tertiary" | "outline" | "transparent"

const itemGroupVariants: Record<ItemGroupVariant, string> = {
  default: "rounded-xl bg-card p-2 ring-1 ring-foreground/10",
  secondary: "rounded-xl bg-muted/50 p-2",
  tertiary: "rounded-xl bg-muted p-2",
  outline: "rounded-xl border border-border p-2",
  transparent: "",
}

export function ItemGroup({ className, layout = "list", columns = 2, variant = "transparent", dividers = false, ...props }: React.ComponentProps<"div"> & {
  layout?: ItemGroupLayout
  columns?: 2 | 3
  variant?: ItemGroupVariant
  dividers?: boolean
}) {
  return <div role="list" data-slot="item-group" data-layout={layout} data-columns={layout === "grid" ? columns : undefined} data-variant={variant} className={cn("w-full min-w-0", layout === "list" && "flex flex-col", layout === "grid" && "grid gap-3", layout === "grid" && columns === 2 && "sm:grid-cols-2", layout === "grid" && columns === 3 && "sm:grid-cols-2 xl:grid-cols-3", itemGroupVariants[variant], dividers && layout === "list" && "[&>[data-slot=item]+[data-slot=item]]:border-t [&>[data-slot=item]+[data-slot=item]]:border-border", className)} {...props} />
}

export function ItemGroupHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-group-header" className={cn("mb-3 grid gap-1", className)} {...props} />
}

export function ItemGroupTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 data-slot="item-group-title" className={cn("text-sm font-medium", className)} {...props} />
}

export function ItemGroupDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="item-group-description" className={cn("text-sm text-muted-foreground", className)} {...props} />
}

export function ItemSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator data-slot="item-separator" orientation="horizontal" className={cn("my-1", className)} {...props} />
}

export function Item({ className, variant = "default", size = "default", ...props }: React.ComponentProps<"div"> & {
  variant?: ItemVariant
  size?: ItemSize
}) {
  return <div role="listitem" data-slot="item" data-variant={variant} data-size={size} className={cn("group/item flex min-w-0 flex-wrap items-center gap-3 rounded-lg transition-colors motion-reduce:!transition-none", (variant === "default" || variant === "transparent") && "bg-transparent", variant === "card" && "bg-card ring-1 ring-foreground/10", variant === "secondary" && "bg-muted/50", variant === "tertiary" && "bg-muted", variant === "outline" && "border border-border bg-card", variant === "muted" && "bg-muted/60", size === "default" && "min-h-16 p-3", size === "sm" && "min-h-12 p-2.5", size === "xs" && "min-h-10 gap-2", className)} {...props} />
}

export function ItemMedia({ className, variant = "default", ...props }: React.ComponentProps<"div"> & {
  variant?: "default" | "icon" | "image"
}) {
  return <div data-slot="item-media" data-variant={variant} className={cn("flex shrink-0 items-center justify-center", variant === "default" && "text-muted-foreground", variant === "icon" && "size-9 rounded-md bg-muted text-muted-foreground [&_svg]:size-4", variant === "image" && "size-10 overflow-hidden rounded-full [&_img]:size-full [&_img]:object-cover", className)} {...props} />
}

export function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-content" className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)} {...props} />
}

export function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-title" className={cn("flex min-w-0 items-center gap-2 truncate text-sm font-medium", className)} {...props} />
}

export function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="item-description" className={cn("line-clamp-2 text-sm text-muted-foreground", className)} {...props} />
}

export function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-actions" className={cn("flex shrink-0 items-center gap-2", className)} {...props} />
}

export function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-header" className={cn("flex basis-full items-center justify-between gap-3", className)} {...props} />
}

export function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-footer" className={cn("flex basis-full items-center justify-between gap-3", className)} {...props} />
}

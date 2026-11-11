"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { IconX } from "@tabler/icons-react"

const SheetContext = React.createContext<{ close: () => void } | null>(null)

function Sheet({ open, defaultOpen, onOpenChange, ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false)
  const isControlled = open !== undefined
  const currentOpen = isControlled ? open : internalOpen
  const changeOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }
  return <SheetContext.Provider value={{ close: () => changeOpen(false) }}><SheetPrimitive.Root data-slot="sheet" open={currentOpen} onOpenChange={changeOpen} {...props} /></SheetContext.Provider>
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-overlay duration-200 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 motion-reduce:!animate-none motion-reduce:!transition-none",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  showOverlay = true,
  dismissible = true,
  detached = false,
  disableEscapeClose = false,
  swipeDirection,
  swipeThreshold = 72,
  overlayClassName,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onEscapeKeyDown,
  onPointerDownOutside,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
  showOverlay?: boolean
  dismissible?: boolean
  detached?: boolean
  disableEscapeClose?: boolean
  swipeDirection?: "up" | "right" | "down" | "left"
  swipeThreshold?: number
  overlayClassName?: string
}) {
  const sheet = React.useContext(SheetContext)
  const pointerStart = React.useRef<{ x: number; y: number } | null>(null)
  const handleEscapeKeyDown: NonNullable<React.ComponentProps<typeof SheetPrimitive.Content>["onEscapeKeyDown"]> = (event) => {
    onEscapeKeyDown?.(event)
    if (disableEscapeClose) event.preventDefault()
  }
  const handlePointerDownOutside: NonNullable<React.ComponentProps<typeof SheetPrimitive.Content>["onPointerDownOutside"]> = (event) => {
    onPointerDownOutside?.(event)
    if (!dismissible) event.preventDefault()
  }
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerDown?.(event)
    if (event.defaultPrevented || !dismissible || !swipeDirection || (event.pointerType === "mouse" && event.button !== 0)) return
    const target = event.target as HTMLElement
    if (target.closest("[data-sheet-no-swipe],input,textarea,select,[contenteditable=true]")) return
    pointerStart.current = { x: event.clientX, y: event.clientY }
  }
  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerUp?.(event)
    const start = pointerStart.current
    pointerStart.current = null
    if (!start || !dismissible || !swipeDirection || event.defaultPrevented) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    const distance = swipeDirection === "left" ? -dx : swipeDirection === "right" ? dx : swipeDirection === "up" ? -dy : dy
    const crossAxis = swipeDirection === "left" || swipeDirection === "right" ? Math.abs(dy) : Math.abs(dx)
    if (distance >= swipeThreshold && distance > crossAxis) sheet?.close()
  }
  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStart.current = null
    onPointerCancel?.(event)
  }
  return (
    <SheetPortal>
      {showOverlay && <SheetOverlay className={overlayClassName} />}
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        data-detached={detached || undefined}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onEscapeKeyDown={handleEscapeKeyDown}
        onPointerDownOutside={handlePointerDownOutside}
        className={cn(
          "fixed z-50 flex flex-col gap-4 rounded-[var(--radius)] bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10 data-[detached=true]:rounded-[var(--radius)] data-[side=right]:data-[detached=true]:inset-y-4 data-[side=right]:data-[detached=true]:right-4 data-[side=right]:data-[detached=true]:h-[calc(100%-2rem)] data-[side=right]:data-[detached=true]:w-[calc(100%-2rem)] data-[side=right]:data-[detached=true]:border data-[side=left]:data-[detached=true]:inset-y-4 data-[side=left]:data-[detached=true]:left-4 data-[side=left]:data-[detached=true]:h-[calc(100%-2rem)] data-[side=left]:data-[detached=true]:w-[calc(100%-2rem)] data-[side=left]:data-[detached=true]:border data-[side=top]:data-[detached=true]:inset-x-4 data-[side=top]:data-[detached=true]:top-4 data-[side=top]:data-[detached=true]:max-h-[calc(100%-2rem)] data-[side=top]:data-[detached=true]:border data-[side=bottom]:data-[detached=true]:inset-x-4 data-[side=bottom]:data-[detached=true]:bottom-4 data-[side=bottom]:data-[detached=true]:max-h-[calc(100%-2rem)] data-[side=bottom]:data-[detached=true]:border motion-reduce:!animate-none motion-reduce:!transition-none",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close data-slot="sheet-close" asChild>
            <button type="button" aria-label="Close panel" className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"><IconX className="size-4" /></button>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

"use client"

import * as React from "react"
import { Dialog as AriaDialog, Heading } from "react-aria-components/Dialog"
import { Modal, ModalOverlay } from "react-aria-components/Modal"
import { Text } from "react-aria-components/Text"
import { X as IconX } from "lucide-react";

import { Root as SlotRoot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

type SheetContextValue = {
  close: () => void
  isOpen: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const SheetContext = React.createContext<SheetContextValue | null>(null)

function useSheetContext() {
  const context = React.useContext(SheetContext)
  if (!context) throw new Error("Sheet components must be used within Sheet")
  return context
}

function Sheet({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  modal: _modal,
}: {
  children?: React.ReactNode
  defaultOpen?: boolean
  modal?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isOpen = open ?? uncontrolledOpen
  const setOpen = React.useCallback((nextOpen: boolean) => {
    if (open === undefined) setUncontrolledOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }, [onOpenChange, open])

  const context = React.useMemo<SheetContextValue>(() => ({
    close: () => setOpen(false),
    isOpen,
    setOpen,
    toggle: () => setOpen(!isOpen),
  }), [isOpen, setOpen])

  return <SheetContext.Provider value={context}>{children}</SheetContext.Provider>
}

function SheetTrigger({
  asChild = false,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { isOpen, toggle } = useSheetContext()
  const Component = asChild ? SlotRoot : "button"

  return (
    <Component
      data-slot="sheet-trigger"
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      {...(asChild ? {} : { type: "button" as const })}
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) toggle()
      }}
    >
      {children}
    </Component>
  )
}

function SheetClose({
  asChild = false,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { close } = useSheetContext()
  const Component = asChild ? SlotRoot : "button"

  return (
    <Component
      data-slot="sheet-close"
      {...(asChild ? {} : { type: "button" as const })}
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) close()
      }}
    >
      {children}
    </Component>
  )
}

function SheetPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function SheetOverlay({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-overlay duration-200 supports-backdrop-filter:backdrop-blur-xs entering:animate-in entering:fade-in-0 exiting:animate-out exiting:fade-out-0 motion-reduce:!animate-none motion-reduce:!transition-none",
        className
      )}
      {...props}
    />
  )
}

type SheetContentProps = Omit<React.ComponentProps<"section">, "children" | "role"> & {
  children?: React.ReactNode
  detached?: boolean
  disableEscapeClose?: boolean
  dismissible?: boolean
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onPointerCancel?: React.PointerEventHandler<HTMLDivElement>
  onPointerDown?: React.PointerEventHandler<HTMLDivElement>
  onPointerDownOutside?: (event: Event) => void
  onPointerUp?: React.PointerEventHandler<HTMLDivElement>
  overlayClassName?: string
  role?: "dialog" | "alertdialog"
  showCloseButton?: boolean
  showOverlay?: boolean
  side?: "top" | "right" | "bottom" | "left"
  swipeDirection?: "up" | "right" | "down" | "left"
  swipeThreshold?: number
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
}: SheetContentProps) {
  const { isOpen, setOpen } = useSheetContext()
  const pointerStart = React.useRef<{ x: number; y: number } | null>(null)
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerDown?.(event)
    if (event.defaultPrevented || !dismissible || !swipeDirection || (event.pointerType === "mouse" && event.button !== 0)) return
    const target = event.target
    if (!(target instanceof Element)) return
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
    if (distance >= swipeThreshold && distance > crossAxis) setOpen(false)
  }
  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStart.current = null
    onPointerCancel?.(event)
  }

  return (
    <ModalOverlay
      data-slot="sheet-overlay"
      isOpen={isOpen}
      onOpenChange={setOpen}
      isDismissable={dismissible}
      isKeyboardDismissDisabled={disableEscapeClose}
      shouldCloseOnInteractOutside={() => {
        const event = new Event("pointerdownoutside", { cancelable: true })
        onPointerDownOutside?.(event)
        return dismissible && !event.defaultPrevented
      }}
      className={cn(
        "fixed inset-0 z-50 duration-200 entering:animate-in entering:fade-in-0 exiting:animate-out exiting:fade-out-0 motion-reduce:!animate-none motion-reduce:!transition-none",
        showOverlay ? "bg-overlay supports-backdrop-filter:backdrop-blur-xs" : "bg-transparent",
        overlayClassName,
      )}
    >
      <div
        className="contents"
        onKeyDownCapture={(event) => {
          if (event.key !== "Escape") return
          onEscapeKeyDown?.(event.nativeEvent)
          if (event.nativeEvent.defaultPrevented || disableEscapeClose) {
            event.preventDefault()
            event.stopPropagation()
          }
        }}
      >
        <Modal
        data-slot="sheet-content"
        data-side={side}
        data-detached={detached || undefined}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={cn(
          "fixed z-50 flex flex-col gap-4 rounded-[var(--radius)] bg-background bg-clip-padding text-sm text-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm entering:animate-in entering:fade-in-0 data-[side=bottom]:entering:slide-in-from-bottom-10 data-[side=left]:entering:slide-in-from-left-10 data-[side=right]:entering:slide-in-from-right-10 data-[side=top]:entering:slide-in-from-top-10 exiting:animate-out exiting:fade-out-0 data-[side=bottom]:exiting:slide-out-to-bottom-10 data-[side=left]:exiting:slide-out-to-left-10 data-[side=right]:exiting:slide-out-to-right-10 data-[side=top]:exiting:slide-out-to-top-10 data-[detached=true]:rounded-[var(--radius)] data-[side=right]:data-[detached=true]:inset-y-4 data-[side=right]:data-[detached=true]:right-4 data-[side=right]:data-[detached=true]:h-[calc(100%-2rem)] data-[side=right]:data-[detached=true]:w-[calc(100%-2rem)] data-[side=right]:data-[detached=true]:border data-[side=left]:data-[detached=true]:inset-y-4 data-[side=left]:data-[detached=true]:left-4 data-[side=left]:data-[detached=true]:h-[calc(100%-2rem)] data-[side=left]:data-[detached=true]:w-[calc(100%-2rem)] data-[side=left]:data-[detached=true]:border data-[side=top]:data-[detached=true]:inset-x-4 data-[side=top]:data-[detached=true]:top-4 data-[side=top]:data-[detached=true]:max-h-[calc(100%-2rem)] data-[side=top]:data-[detached=true]:border data-[side=bottom]:data-[detached=true]:inset-x-4 data-[side=bottom]:data-[detached=true]:bottom-4 data-[side=bottom]:data-[detached=true]:max-h-[calc(100%-2rem)] data-[side=bottom]:data-[detached=true]:border motion-reduce:!animate-none motion-reduce:!transition-none",
          className
        )}
      >
        <AriaDialog {...props}>
          {children}
          {showCloseButton && (
            <SheetClose asChild>
              <button
                type="button"
                aria-label="Close panel"
                className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <IconX className="size-4" />
              </button>
            </SheetClose>
          )}
        </AriaDialog>
        </Modal>
      </div>
    </ModalOverlay>
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

function SheetTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <Heading
      slot="title"
      data-slot="sheet-title"
      className={cn("font-heading text-base font-medium text-foreground", className)}
      {...props}
    />
  )
}

function SheetDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <Text
      slot="description"
      elementType="p"
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

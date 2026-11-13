"use client"

import * as React from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { OverlayArrow, Popover } from "react-aria-components/Popover"

import { Root as SlotRoot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

type HoverCardContextValue = {
  cancelClose: () => void
  cancelOpen: () => void
  closeSoon: () => void
  contentRef: React.RefObject<HTMLDivElement | null>
  isOpen: boolean
  openSoon: () => void
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const HoverCardContext = React.createContext<HoverCardContextValue | null>(null)

function useHoverCardContext() {
  const context = React.useContext(HoverCardContext)
  if (!context) throw new Error("HoverCard components must be used within HoverCard")
  return context
}

function HoverCard({
  open,
  defaultOpen = false,
  onOpenChange,
  openDelay = 250,
  closeDelay = 150,
  children,
}: {
  children?: React.ReactNode
  closeDelay?: number
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
  openDelay?: number
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const openTimer = React.useRef<number | null>(null)
  const closeTimer = React.useRef<number | null>(null)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const contentRef = React.useRef<HTMLDivElement | null>(null)
  const isOpen = open ?? uncontrolledOpen

  const setOpen = React.useCallback((nextOpen: boolean) => {
    if (open === undefined) setUncontrolledOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }, [onOpenChange, open])

  const cancelOpen = React.useCallback(() => {
    if (openTimer.current !== null) window.clearTimeout(openTimer.current)
    openTimer.current = null
  }, [])
  const cancelClose = React.useCallback(() => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
    closeTimer.current = null
  }, [])
  const openSoon = React.useCallback(() => {
    cancelClose()
    cancelOpen()
    openTimer.current = window.setTimeout(() => {
      setOpen(true)
      openTimer.current = null
    }, Math.max(0, openDelay))
  }, [cancelClose, cancelOpen, openDelay, setOpen])
  const closeSoon = React.useCallback(() => {
    cancelOpen()
    cancelClose()
    closeTimer.current = window.setTimeout(() => {
      setOpen(false)
      closeTimer.current = null
    }, Math.max(0, closeDelay))
  }, [cancelClose, cancelOpen, closeDelay, setOpen])

  React.useEffect(() => () => {
    cancelOpen()
    cancelClose()
  }, [cancelClose, cancelOpen])

  const context = React.useMemo<HoverCardContextValue>(() => ({
    cancelClose,
    cancelOpen,
    closeSoon,
    contentRef,
    isOpen,
    openSoon,
    setOpen,
    triggerRef,
  }), [cancelClose, cancelOpen, closeSoon, isOpen, openSoon, setOpen])

  return <HoverCardContext.Provider value={context}>{children}</HoverCardContext.Provider>
}

function HoverCardTrigger({
  asChild = false,
  children,
  onBlur,
  onFocus,
  onPointerEnter,
  onPointerLeave,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { cancelClose, cancelOpen, closeSoon, openSoon, triggerRef } = useHoverCardContext()
  const Component = asChild ? SlotRoot : "button"

  return (
    <Component
      ref={triggerRef}
      data-slot="hover-card-trigger"
      {...(asChild ? {} : { type: "button" as const })}
      {...props}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        if (!event.defaultPrevented) openSoon()
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
        if (!event.defaultPrevented) closeSoon()
      }}
      onFocus={(event) => {
        onFocus?.(event)
        cancelClose()
        openSoon()
      }}
      onBlur={(event) => {
        onBlur?.(event)
        cancelOpen()
        closeSoon()
      }}
    >
      {children}
    </Component>
  )
}

type HoverCardContentProps = Omit<React.ComponentProps<"div">, "children"> & {
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  showArrow?: boolean
}

type HoverCardSide = "top" | "right" | "bottom" | "left"
type HoverCardAlignment = "start" | "center" | "end"
type HoverCardPlacement = HoverCardSide | `${"top" | "bottom"} ${"start" | "end"}` | `${"left" | "right"} ${"top" | "bottom"}`

function toPlacement(side: HoverCardSide, align: HoverCardAlignment): HoverCardPlacement {
  if (align === "center") return side
  if (side === "left" || side === "right") return `${side} ${align === "start" ? "top" : "bottom"}`
  return `${side} ${align}`
}

function HoverCardContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "center",
  children,
  showArrow = false,
  ...props
}: HoverCardContentProps) {
  const { cancelClose, closeSoon, contentRef, isOpen, setOpen, triggerRef } = useHoverCardContext()

  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      event.preventDefault()
      event.stopPropagation()
      setOpen(false)
    }

    document.addEventListener("keydown", handleKeyDown, true)
    return () => document.removeEventListener("keydown", handleKeyDown, true)
  }, [isOpen, setOpen])

  return (
    <Popover
      ref={contentRef}
      data-slot="hover-card-content"
      isOpen={isOpen}
      onOpenChange={setOpen}
      triggerRef={triggerRef}
      placement={toPlacement(side, align)}
      offset={sideOffset}
      isNonModal
      onPointerEnter={cancelClose}
      onPointerLeave={closeSoon}
      className={composeRenderProps(className, (className, { isEntering, isExiting }) => cn(
        "z-50 w-64 rounded-[var(--radius)] border border-border bg-popover p-3 text-sm text-popover-foreground shadow-lg outline-none duration-150 ease-out entering:animate-in entering:fade-in-0 entering:zoom-in-95 exiting:animate-out exiting:fade-out-0 motion-reduce:!animate-none motion-reduce:!transition-none",
        isEntering && "data-entering",
        isExiting && "data-exiting",
        className,
      ))}
      {...props}
    >
      {children}
      {showArrow && (
        <OverlayArrow className="group">
          <svg width="12" height="6" viewBox="0 0 12 6" aria-hidden="true" className="block fill-popover group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90">
            <path d="M0 0L6 6L12 0" />
          </svg>
        </OverlayArrow>
      )}
    </Popover>
  )
}

export { HoverCard, HoverCardContent, HoverCardTrigger }

"use client"

import * as React from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { OverlayArrow, Popover as PopoverPrimitive } from "react-aria-components/Popover"

import { Root as SlotRoot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface PopoverPanelProps extends React.ComponentProps<typeof PopoverPrimitive> {
  arrow?: boolean
  ref?: React.Ref<HTMLDivElement>
}

export function PopoverPanel({ children, arrow = false, className, ref, ...props }: PopoverPanelProps) {
  const offset = props.offset ?? (arrow ? 12 : 8)
  return (
    <PopoverPrimitive
      ref={ref}
      offset={offset}
      className={cn(
        "[--visual-viewport-vertical-padding:16px] sm:[--visual-viewport-vertical-padding:32px]",
        "max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding)*2)]",
        "group/popover min-w-(--trigger-width) max-w-xs origin-(--popover-placement) rounded-lg border border-border bg-popover text-popover-foreground shadow-lg outline-hidden transition-transform [--gutter:--spacing(6)] sm:text-sm **:[[role=dialog]]:[--gutter:--spacing(6)]",
        "entering:fade-in exiting:fade-out entering:animate-in exiting:animate-out",
        "placement-left:entering:slide-in-from-right-1 placement-right:entering:slide-in-from-left-1 placement-top:entering:slide-in-from-bottom-1 placement-bottom:entering:slide-in-from-top-1",
        "placement-left:exiting:slide-out-to-right-1 placement-right:exiting:slide-out-to-left-1 placement-top:exiting:slide-out-to-bottom-1 placement-bottom:exiting:slide-out-to-top-1",
        "forced-colors:bg-[Canvas]",
        className,
      )}
      {...props}
    >
      {(values) => (
        <>
          {arrow ? (
            <OverlayArrow className="group">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                className="block fill-overlay stroke-border group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]"
                aria-hidden="true"
              >
                <path d="M0 0 L6 6 L12 0" />
              </svg>
            </OverlayArrow>
          ) : null}
          <div data-slot="popover-inner" className="flex max-h-[inherit] flex-col overflow-y-auto">
            {typeof children === "function" ? children(values) : children}
          </div>
        </>
      )}
    </PopoverPrimitive>
  )
}

type PopoverOpenChange = (open: boolean) => void
type PopoverSide = "top" | "right" | "bottom" | "left"
type PopoverAlign = "start" | "center" | "end"
type PopoverPlacement = NonNullable<React.ComponentProps<typeof PopoverPrimitive>["placement"]>

type PopoverContextValue = {
  close: () => void
  contentRef: React.RefObject<HTMLDivElement | null>
  isOpen: boolean
  open: () => void
  setOpen: (open: boolean) => void
  toggle: () => void
  triggerRef: React.RefObject<Element | null>
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null)

function usePopoverContext() {
  const context = React.useContext(PopoverContext)
  if (!context) throw new Error("Popover components must be used within Popover")
  return context
}

function Popover({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: {
  children?: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: PopoverOpenChange
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isOpen = open ?? uncontrolledOpen
  const triggerRef = React.useRef<Element | null>(null)
  const contentRef = React.useRef<HTMLDivElement | null>(null)

  const setOpen = React.useCallback((nextOpen: boolean) => {
    if (open === undefined) setUncontrolledOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }, [onOpenChange, open])

  const context = React.useMemo<PopoverContextValue>(() => ({
    close: () => setOpen(false),
    contentRef,
    isOpen,
    open: () => setOpen(true),
    setOpen,
    toggle: () => setOpen(!isOpen),
    triggerRef,
  }), [isOpen, setOpen])

  return (
    <PopoverContext.Provider value={context}>{children}</PopoverContext.Provider>
  )
}

function PopoverClose({
  asChild = false,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { close } = usePopoverContext()
  const Component = asChild ? SlotRoot : "button"

  return (
    <Component
      data-slot="popover-close"
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

function PopoverTrigger({
  asChild = false,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { isOpen, toggle, triggerRef } = usePopoverContext()
  const Component = asChild ? SlotRoot : "button"
  const setTriggerElement = React.useCallback((element: HTMLElement | null) => {
    triggerRef.current = element
  }, [triggerRef])

  return (
    <Component
      ref={setTriggerElement}
      data-slot="popover-trigger"
      data-state={isOpen ? "open" : "closed"}
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

type PopoverContentProps = Omit<React.ComponentProps<"div">, "children"> & {
  align?: PopoverAlign
  children?: React.ReactNode
  collisionPadding?: number
  forceMount?: boolean
  onCloseAutoFocus?: (event: Event) => void
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onInteractOutside?: (event: CustomEvent) => void
  onOpenAutoFocus?: (event: Event) => void
  onPointerDownOutside?: (event: CustomEvent) => void
  showArrow?: boolean
  side?: PopoverSide
  sideOffset?: number
  sticky?: "partial" | "always"
}

const placementBySide = {
  bottom: { center: "bottom", end: "bottom end", start: "bottom start" },
  left: { center: "left", end: "left bottom", start: "left top" },
  right: { center: "right", end: "right bottom", start: "right top" },
  top: { center: "top", end: "top end", start: "top start" },
} satisfies Record<PopoverSide, Record<PopoverAlign, PopoverPlacement>>

function toPlacement(side: PopoverSide, align: PopoverAlign): PopoverPlacement {
  return placementBySide[side][align]
}

function PopoverContent({
  className,
  align = "center",
  side = "bottom",
  sideOffset = 4,
  showArrow = false,
  children,
  onEscapeKeyDown,
  onInteractOutside,
  onPointerDownOutside,
  onOpenAutoFocus,
  onCloseAutoFocus,
  onKeyDownCapture,
  collisionPadding = 0,
  forceMount: _forceMount,
  sticky: _sticky,
  ...props
}: PopoverContentProps) {
  const { contentRef, isOpen, setOpen, triggerRef } = usePopoverContext()

  const handlePointerDown = React.useCallback((event: PointerEvent) => {
    if (!isOpen) return
    const target = event.target
    if (!(target instanceof Node)) return
    if (contentRef.current?.contains(target) || triggerRef.current?.contains(target)) return

    let closePrevented = false
    const outsideEvent = new CustomEvent("pointerdownoutside", {
      cancelable: true,
      detail: { originalEvent: event },
    })
    outsideEvent.preventDefault = () => {
      closePrevented = true
    }
    onInteractOutside?.(outsideEvent)
    onPointerDownOutside?.(outsideEvent)
    if (!closePrevented) setOpen(false)
  }, [contentRef, isOpen, onInteractOutside, onPointerDownOutside, setOpen, triggerRef])

  React.useEffect(() => {
    if (!isOpen) return
    document.addEventListener("pointerdown", handlePointerDown, true)
    return () => document.removeEventListener("pointerdown", handlePointerDown, true)
  }, [handlePointerDown, isOpen])

  React.useEffect(() => {
    if (!isOpen) return
    onOpenAutoFocus?.(new Event("openautofocus"))
    return () => onCloseAutoFocus?.(new Event("closeautofocus"))
  }, [isOpen, onCloseAutoFocus, onOpenAutoFocus])

  return (
    <PopoverPrimitive
      ref={contentRef}
      data-slot="popover-content"
      isOpen={isOpen}
      onOpenChange={setOpen}
      triggerRef={triggerRef}
      placement={toPlacement(side, align)}
      offset={sideOffset}
      containerPadding={collisionPadding}
      className={composeRenderProps(className, (className, { isEntering, isExiting, placement }) =>
        cn(
          "z-50 flex w-72 flex-col gap-2.5 rounded-[var(--radius)] bg-popover p-2.5 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/10 outline-hidden duration-150 placement-bottom:slide-in-from-top-2 placement-left:slide-in-from-right-2 placement-right:slide-in-from-left-2 placement-top:slide-in-from-bottom-2 entering:animate-in entering:fade-in-0 entering:zoom-in-95 exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95 motion-reduce:!animate-none motion-reduce:!transition-none",
          isEntering && "data-entering",
          isExiting && "data-exiting",
          placement && `data-placement-${placement}`,
          className,
        ),
      )}
      {...props}
    >
      <div
        className="contents"
        onKeyDownCapture={(event: React.KeyboardEvent<HTMLDivElement>) => {
          onKeyDownCapture?.(event)
          if (event.key !== "Escape") return
          onEscapeKeyDown?.(event.nativeEvent)
          if (event.nativeEvent.defaultPrevented) {
            event.preventDefault()
            event.stopPropagation()
          }
        }}
      >
        {children}
        {showArrow && (
          <OverlayArrow className="group">
            <svg width="12" height="6" viewBox="0 0 12 6" aria-hidden="true" className="block fill-popover group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90">
              <path d="M0 0L6 6L12 0" />
            </svg>
          </OverlayArrow>
        )}
      </div>
    </PopoverPrimitive>
  )
}

function PopoverAnchor({
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const { triggerRef } = usePopoverContext()
  const Component = asChild ? SlotRoot : "div"
  const setTriggerElement = React.useCallback((element: HTMLElement | null) => {
    triggerRef.current = element
  }, [triggerRef])

  return (
    <Component ref={setTriggerElement} data-slot="popover-anchor" {...props}>
      {children}
    </Component>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <div
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverClose,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}

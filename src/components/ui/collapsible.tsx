"use client"

import * as React from "react"

import { Root as SlotRoot } from "@radix-ui/react-slot"

type CollapsibleContextValue = {
  contentId: string
  disabled: boolean
  isOpen: boolean
  toggle: () => void
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null)

function useCollapsible() {
  const context = React.useContext(CollapsibleContext)
  if (!context) throw new Error("Collapsible components must be used within Collapsible")
  return context
}

function Collapsible({
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  asChild?: boolean
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const contentId = React.useId()
  const isOpen = open ?? uncontrolledOpen

  const toggle = React.useCallback(() => {
    if (disabled) return
    const nextOpen = !isOpen
    if (open === undefined) setUncontrolledOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }, [disabled, isOpen, onOpenChange, open])

  const Component = asChild ? SlotRoot : "div"

  return (
    <CollapsibleContext.Provider value={{ contentId, disabled, isOpen, toggle }}>
      <Component
        data-slot="collapsible"
        data-state={isOpen ? "open" : "closed"}
        data-disabled={disabled || undefined}
        {...props}
      />
    </CollapsibleContext.Provider>
  )
}

function CollapsibleTrigger({
  asChild = false,
  onClick,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { contentId, disabled, isOpen, toggle } = useCollapsible()
  const Component = asChild ? SlotRoot : "button"

  return (
    <Component
      data-slot="collapsible-trigger"
      data-state={isOpen ? "open" : "closed"}
      data-disabled={disabled || undefined}
      aria-expanded={isOpen}
      aria-controls={contentId}
      {...(asChild ? {} : { type: "button" })}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) toggle()
      }}
      {...props}
    />
  )
}

function CollapsibleContent({
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { contentId, disabled, isOpen } = useCollapsible()

  return (
    <div
      {...props}
      id={contentId}
      data-slot="collapsible-content"
      data-state={isOpen ? "open" : "closed"}
      data-disabled={disabled || undefined}
      hidden={!isOpen || props.hidden}
    >
      {children}
    </div>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

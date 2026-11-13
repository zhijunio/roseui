"use client"

import * as React from "react"
import { Popover } from "react-aria-components/Popover"
import { ChevronDown as IconChevronDown } from "lucide-react";

import { Root as SlotRoot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

type NavigationMenuContextValue = {
  activeTriggerRef: React.RefObject<HTMLButtonElement | null>
  activeItem: string | null
  rootRef: React.RefObject<HTMLElement | null>
  setActiveItem: (value: string | null) => void
}

const NavigationMenuContext = React.createContext<NavigationMenuContextValue | null>(null)

type NavigationMenuItemContextValue = {
  itemId: string
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const NavigationMenuItemContext = React.createContext<NavigationMenuItemContextValue | null>(null)

function useNavigationMenuContext() {
  const context = React.useContext(NavigationMenuContext)
  if (!context) throw new Error("NavigationMenu components must be used within NavigationMenu")
  return context
}

function useNavigationMenuItemContext() {
  const context = React.useContext(NavigationMenuItemContext)
  if (!context) throw new Error("NavigationMenu trigger and content must be used within NavigationMenuItem")
  return context
}

function NavigationMenu({ className, children, ...props }: React.ComponentProps<"nav">) {
  const [activeItem, setActiveItem] = React.useState<string | null>(null)
  const activeTriggerRef = React.useRef<HTMLButtonElement | null>(null)
  const rootRef = React.useRef<HTMLElement | null>(null)

  return (
    <NavigationMenuContext.Provider value={{ activeItem, activeTriggerRef, rootRef, setActiveItem }}>
      <nav
        ref={rootRef}
        data-slot="navigation-menu"
        className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
        onKeyDown={(event) => {
          if (event.key !== "Escape") return
          setActiveItem(null)
        }}
        {...props}
      >
        {children}
      </nav>
    </NavigationMenuContext.Provider>
  )
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="navigation-menu-list" className={cn("m-0 flex list-none items-center gap-1 p-1", className)} {...props} />
}

function NavigationMenuItem({ className, value, children, ...props }: React.ComponentProps<"li"> & { value?: string }) {
  const generatedId = React.useId()
  const itemId = value ?? generatedId
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)

  return (
    <NavigationMenuItemContext.Provider value={{ itemId, triggerRef }}>
      <li data-slot="navigation-menu-item" data-value={itemId} className={cn("relative", className)} {...props}>
        {children}
      </li>
    </NavigationMenuItemContext.Provider>
  )
}

function NavigationMenuTrigger({
  asChild = false,
  className,
  children,
  onClick,
  onPointerEnter,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { activeItem, activeTriggerRef, setActiveItem } = useNavigationMenuContext()
  const { itemId, triggerRef } = useNavigationMenuItemContext()
  const isOpen = activeItem === itemId
  const Component = asChild ? SlotRoot : "button"
  const openedByPointer = React.useRef(false)
  const openItem = () => {
    activeTriggerRef.current = triggerRef.current
    setActiveItem(itemId)
  }

  return (
    <Component
      ref={triggerRef}
      data-slot="navigation-menu-trigger"
      data-state={isOpen ? "open" : "closed"}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      {...(asChild ? {} : { type: "button" as const })}
      className={cn("group inline-flex h-8 items-center justify-center gap-1 rounded-md px-3 text-sm font-medium outline-none transition-colors motion-reduce:!transition-none hover:bg-accent focus:bg-accent open:bg-accent", className)}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        if (event.defaultPrevented || isOpen) return
        openedByPointer.current = true
        openItem()
      }}
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        if (openedByPointer.current) {
          openedByPointer.current = false
          openItem()
          return
        }
        if (isOpen) setActiveItem(null)
        else openItem()
      }}
    >
      {children}
      <IconChevronDown aria-hidden="true" className="size-3.5 transition-transform duration-200 motion-reduce:!transition-none group-open:rotate-180" />
    </Component>
  )
}

function NavigationMenuContent({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Popover>, "children"> & { children?: React.ReactNode }) {
  const { activeItem, setActiveItem } = useNavigationMenuContext()
  const { itemId, triggerRef } = useNavigationMenuItemContext()
  const isOpen = activeItem === itemId

  return (
    <Popover
      data-slot="navigation-menu-content"
      isOpen={isOpen}
      onOpenChange={(open) => setActiveItem(open ? itemId : null)}
      triggerRef={triggerRef}
      placement="bottom start"
      offset={8}
      isNonModal
      className={({ isEntering, isExiting }) => cn(
        "z-50 w-auto min-w-56 rounded-lg border border-border bg-popover p-2 text-popover-foreground shadow-lg entering:animate-in entering:fade-in-0 exiting:animate-out exiting:fade-out-0 motion-reduce:!animate-none motion-reduce:!transition-none",
        isEntering && "data-entering",
        isExiting && "data-exiting",
        typeof className === "string" ? className : undefined,
      )}
      {...props}
    >
      {children}
    </Popover>
  )
}

function NavigationMenuLink({
  asChild = false,
  className,
  children,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Component = asChild ? SlotRoot : "a"
  return (
    <Component
      data-slot="navigation-menu-link"
      className={cn("block rounded-md p-3 text-sm outline-none transition-colors motion-reduce:!transition-none hover:bg-accent hover:text-secondary-foreground focus:bg-accent focus:text-secondary-foreground", className)}
      {...props}
    >
      {children}
    </Component>
  )
}

function NavigationMenuIndicator({ className, style, ...props }: React.ComponentProps<"div">) {
  const { activeItem, activeTriggerRef, rootRef } = useNavigationMenuContext()
  const [position, setPosition] = React.useState<{ left: number; width: number } | null>(null)

  React.useLayoutEffect(() => {
    if (!activeItem) {
      setPosition(null)
      return
    }

    const trigger = activeTriggerRef.current
    const root = rootRef.current
    if (!trigger || !root) return

    const updatePosition = () => {
      const triggerRect = trigger.getBoundingClientRect()
      const rootRect = root.getBoundingClientRect()
      setPosition({ left: triggerRect.left - rootRect.left, width: triggerRect.width })
    }

    updatePosition()
    const observer = new ResizeObserver(updatePosition)
    observer.observe(trigger)
    observer.observe(root)
    window.addEventListener("resize", updatePosition)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", updatePosition)
    }
  }, [activeItem, activeTriggerRef, rootRef])

  if (!activeItem || !position) return null

  return (
    <div
      data-slot="navigation-menu-indicator"
      className={cn("absolute top-full z-10 flex h-2 items-end justify-center overflow-hidden", className)}
      {...props}
      style={{ left: position.left, width: position.width, ...style }}
    >
      <div className="relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </div>
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
}

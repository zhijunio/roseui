"use client";

import * as React from "react";
import { createContext, use, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ChevronDown, ChevronRight, PanelLeft } from "lucide-react";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import {
  type DisclosurePanelProps,
  type DisclosureProps,
  Disclosure,
  DisclosurePanel,
} from "react-aria-components/Disclosure";
import { DisclosureGroup, type DisclosureGroupProps } from "react-aria-components/DisclosureGroup";
import { Header } from "react-aria-components/Header";
import { Heading } from "react-aria-components/Heading";
import { type LinkProps, type LinkRenderProps, Link as AriaLink } from "react-aria-components/Link";
import {
  type NavigationTreeItemContentProps,
  type NavigationTreeItemContentRenderProps,
  type NavigationTreeItemProps,
  type NavigationTreeProps,
  NavigationTree,
  NavigationTreeItem,
  NavigationTreeItemContent,
} from "react-aria-components/NavigationTree";
import { Button as PrimitiveButton, type ButtonProps as PrimitiveButtonProps } from "react-aria-components/Button";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const SIDEBAR_WIDTH = "17rem";
const SIDEBAR_WIDTH_DOCK = "3.25rem";
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export type SidebarVariant = "default" | "float" | "inset";

export type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  isOpenOnMobile: boolean
  setIsOpenOnMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextProps | null>(null)

export function useSidebar() {
  const context = use(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

export interface SidebarProviderProps extends React.ComponentProps<"div"> {
  defaultOpen?: boolean
  isOpen?: boolean
  shortcut?: string
  onOpenChange?: (open: boolean) => void
}

export function SidebarProvider({
  defaultOpen = true,
  isOpen: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  shortcut = "b",
  ref,
  ...props
}: SidebarProviderProps) {
  const [openMobile, setOpenMobile] = useState(false)

  const [internalOpenState, setInternalOpenState] = useState(defaultOpen)
  const open = openProp ?? internalOpenState
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value

      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        setInternalOpenState(openState)
      }

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  const isMobile = useIsMobile()
  const isMobileRef = useRef(isMobile)
  isMobileRef.current = isMobile

  const toggleSidebar = useCallback(() => {
    if (isMobileRef.current) {
      setOpenMobile((prev) => !prev)
    } else {
      setOpen((prev) => !prev)
    }
  }, [setOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === shortcut && (event.metaKey || event.ctrlKey)) {
        const activeElement = document.activeElement

        const isInTextInput =
          activeElement instanceof HTMLInputElement ||
          activeElement instanceof HTMLTextAreaElement ||
          activeElement?.getAttribute("contenteditable") === "true" ||
          activeElement?.getAttribute("role") === "textbox"

        if (!isInTextInput) {
          event.preventDefault()
          toggleSidebar()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar, shortcut])

  const state = isMobile || open ? "expanded" : "collapsed"

  const contextValue = useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile: isMobile ?? false,
      isOpenOnMobile: openMobile,
      setIsOpenOnMobile: setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar]
  )

  return (
    <SidebarContext value={contextValue}>
      <div
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-dock": SIDEBAR_WIDTH_DOCK,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "@container **:[svg]:shrink-0",
          "flex w-full text-sidebar-foreground",
          "group/sidebar-root peer/sidebar-root has-data-[variant=inset]:bg-sidebar dark:has-data-[variant=inset]:bg-background",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    </SidebarContext>
  )
}

export interface SidebarProps extends React.ComponentProps<"div"> {
  variant?: SidebarVariant
  collapsible?: "hidden" | "dock" | "none"
  side?: "left" | "right"
  closeButton?: boolean
}

export function Sidebar({
  children,
  closeButton = true,
  collapsible = "hidden",
  side = "left",
  variant = "default",
  className,
  ...props
}: SidebarProps) {
  const { isMobile, state, isOpenOnMobile, setIsOpenOnMobile } = useSidebar()
  if (collapsible === "none") {
    return (
      <div
        data-variant={variant}
        data-collapsible="none"
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <>
        <span className="sr-only" aria-hidden="true" data-variant={variant} />
        <Sheet open={isOpenOnMobile} onOpenChange={setIsOpenOnMobile}>
          <SheetContent
            side={side}
            aria-label="Sidebar"
            data-slot="sidebar"
            data-variant="default"
            className="w-(--sidebar-width) max-w-[min(18rem,calc(100vw-3rem))] bg-sidebar p-0 text-sidebar-foreground [--sidebar-width:18rem] has-data-[slot=calendar]:[--sidebar-width:23rem] [&>button]:hidden"
            showCloseButton={closeButton}
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
            </SheetHeader>
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <div
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
      className="group peer text-sidebar-foreground hidden md:block"
      {...props}
    >
      <div
        data-slot="sidebar-gap"
        aria-hidden="true"
        className={cn([
          "w-(--sidebar-width) group-data-[collapsible=hidden]:w-0",
          "group-data-[side=right]:-rotate-180",
          "relative h-svh bg-transparent transition-[width] duration-200 ease-linear",
          variant === "default" && "group-data-[collapsible=dock]:w-(--sidebar-width-dock)",
          variant === "float" &&
            "group-data-[collapsible=dock]:w-[calc(var(--sidebar-width-dock)+(--spacing(4)))]",
          variant === "inset" &&
            "group-data-[collapsible=dock]:w-[calc(var(--sidebar-width-dock)+(--spacing(2)))]",
        ])}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden w-(--sidebar-width) bg-sidebar not-has-data-[slot=sidebar-footer]:pb-2 md:flex",
          "transition-[left,right,width] duration-200 ease-linear",
          side === "left" && "left-0 group-data-[collapsible=hidden]:-left-(--sidebar-width)",
          side === "right" && "right-0 group-data-[collapsible=hidden]:-right-(--sidebar-width)",
          variant === "float" &&
            "bg-background p-2 group-data-[collapsible=dock]:w-[calc(var(--sidebar-width-dock)+(--spacing(4))+2px)]",
          variant === "inset" &&
            "group-data-[collapsible=dock]:w-[calc(var(--sidebar-width-dock)+(--spacing(2))+2px)] dark:bg-background",
          variant === "default" && [
            "group-data-[collapsible=dock]:w-(--sidebar-width-dock)",
            "border-sidebar-border group-data-[side=left]:border-r group-data-[side=right]:border-l",
          ],
          className
        )}
        {...props}
      >
        <div
          data-sidebar="default"
          data-slot="sidebar-inner"
          className="text-sidebar-foreground group-data-[variant=float]:border-sidebar-border group-data-[variant=float]:bg-sidebar flex size-full flex-col group-data-[variant=float]:rounded-lg group-data-[variant=float]:border group-data-[variant=float]:shadow-xs"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export function SidebarHeader({ className, ref, ...props }: React.ComponentProps<"div">) {
  const { state } = useSidebar()
  return (
    <div
      ref={ref}
      data-slot="sidebar-header"
      className={cn(
        "flex flex-col gap-2 p-2.5 [.border-b]:border-sidebar-border",
        "in-data-[variant=inset]:p-4",
        state === "collapsed" ? "items-center p-2.5" : "p-4",
        className
      )}
      {...props}
    />
  )
}

export function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn([
        "mt-auto flex shrink-0 items-center justify-center p-4 **:data-[slot=chevron]:text-muted-foreground",
        "in-data-[variant=inset]:px-6 in-data-[variant=inset]:py-4",
        className,
      ])}
      {...props}
    />
  )
}

export function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  const { state } = useSidebar()
  const [isAtBottom, setIsAtBottom] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const check = () => {
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 1
      setIsAtBottom(atBottom)
    }

    check()
    el.addEventListener("scroll", check, { passive: true })

    const observer = new ResizeObserver(check)
    observer.observe(el)

    return () => {
      el.removeEventListener("scroll", check)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
      data-slot="sidebar-content"
      className={cn(
        "flex min-h-0 flex-1 scroll-mb-96 flex-col overflow-auto *:data-[slot=sidebar-section]:border-l-0",
        state === "collapsed" ? "items-center" : !isAtBottom && "mask-b-from-95%",
        className
      )}
      {...props}
    >
      {props.children}
    </div>
  )
}

export function SidebarSectionGroup({ className, ...props }: React.ComponentProps<"section">) {
  const { state, isMobile } = useSidebar()
  const collapsed = state === "collapsed" && !isMobile
  return (
    <section
      data-slot="sidebar-section-group"
      className={cn(
        "flex w-full min-w-0 flex-col gap-y-0.5",
        collapsed && "items-center justify-center",
        className
      )}
      {...props}
    />
  )
}

export interface SidebarSectionProps extends React.ComponentProps<"div"> {
  label?: string
}

export function SidebarSection({ className, label, children, ...props }: SidebarSectionProps) {
  const { state } = useSidebar()
  return (
    <div
      data-slot="sidebar-section"
      className={cn(
        "col-span-full flex min-w-0 flex-col gap-y-0.5 **:data-[slot=sidebar-section]:**:gap-y-0",
        "in-data-[state=collapsed]:p-2 p-4",
        className
      )}
      {...props}
    >
      {state !== "collapsed" && label && (
        <Header className="text-sidebar-foreground/70 ring-sidebar-ring mb-1 flex shrink-0 items-center rounded-md px-2 text-xs/6 transition-[margin,opa] duration-200 ease-linear outline-none group-data-[collapsible=dock]:-mt-8 group-data-[collapsible=dock]:opacity-0 *:[svg]:size-4 *:[svg]:shrink-0">
          {label}
        </Header>
      )}
      <div
        data-slot="sidebar-section-inner"
        className="grid grid-cols-[auto_1fr] gap-y-0.5 in-data-[state=collapsed]:gap-y-1.5 *:data-[slot=control]:col-span-full"
      >
        {children}
      </div>
    </div>
  )
}

export interface SidebarItemProps extends Omit<React.ComponentProps<typeof AriaLink>, "children"> {
  isCurrent?: boolean
  children?:
    | React.ReactNode
    | ((
        values: LinkRenderProps & { defaultChildren: React.ReactNode; isCollapsed: boolean }
      ) => React.ReactNode)
  tooltip?: string | React.ComponentProps<typeof Tooltip>
}

export function SidebarItem({
  isCurrent,
  tooltip,
  children,
  className,
  ref,
  ...props
}: SidebarItemProps) {
  const { state, isMobile } = useSidebar()
  const isCollapsed = state === "collapsed" && !isMobile
  const link = (
    <AriaLink
      ref={ref}
      data-slot="sidebar-item"
      aria-current={isCurrent ? "page" : undefined}
      className={composeRenderProps(
        className,
        (className, { isFocusVisible, isPressed, isHovered, isDisabled }) =>
          cn(
            "w-full min-w-0 items-center rounded-lg p-2 text-start font-medium text-base/6 text-sidebar-foreground has-[a]:p-0",
            "group/sidebar-item relative col-span-full overflow-hidden focus-visible:outline-hidden",
            "grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] supports-[grid-template-columns:subgrid]:grid-cols-subgrid sm:text-sm/5 **:last:[svg]:ms-auto",
            // icon
            "[&_svg:not([class*='size-'])]:size-5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground **:[svg]:shrink-0",
            "**:last:[svg]:size-5 sm:**:last:[svg]:size-4",
            "[&:has(svg+[data-slot=sidebar-label])_svg:has(+[data-slot=sidebar-label])]:me-2",

            // avatar
            "**:data-[slot=avatar]:[--avatar-size:--spacing(5)]",
            "[&:has([data-slot=avatar]+[data-slot=sidebar-label])_[data-slot=avatar]:has(+[data-slot=sidebar-label])]:me-2",
            "[--sidebar-current-background:var(--color-sidebar-primary)] [--sidebar-current-foreground:var(--color-sidebar-primary-foreground)]",
            isCurrent &&
              "bg-(--sidebar-current-background) font-medium text-(--sidebar-current-foreground) hover:bg-(--sidebar-current-background) hover:text-(--sidebar-current-foreground) [&_.text-muted-foreground]:text-foreground/80 [&_svg:not([class*='text-'])]:text-(--sidebar-current-foreground) hover:[&_svg:not([class*='text-'])]:text-(--sidebar-current-foreground)",
            isFocusVisible && "inset-ring inset-ring-sidebar-ring outline-hidden",
            isPressed && !isCurrent &&
              "bg-sidebar-accent text-sidebar-accent-foreground [&_svg:not([class*='text-'])]:text-sidebar-accent-foreground",
            isHovered && !isCurrent &&
              "bg-sidebar-accent/70 text-sidebar-accent-foreground [&_svg:not([class*='text-'])]:text-sidebar-accent-foreground",
            isDisabled && "opacity-50",
            className
          )
      )}
      {...props}
    >
      {(values) => (
        <>{typeof children === "function" ? children({ ...values, isCollapsed }) : children}</>
      )}
    </AriaLink>
  )
  const resolvedTooltip = typeof tooltip === "string" ? { children: tooltip } : tooltip;
  if (!isCollapsed || isMobile || !resolvedTooltip) return link;

  return (
    <TooltipTrigger delay={0}>
      {link}
      <Tooltip className="**:data-[slot=sidebar-label-mask]:hidden **:[svg]:hidden" placement="right" {...resolvedTooltip} />
    </TooltipTrigger>
  );
}

export function SidebarBadge({ className, ...props }: React.ComponentProps<"span">) {
  const { state, isMobile } = useSidebar()

  if (state === "collapsed" && !isMobile) {
    return (
      <span
        aria-hidden
        data-slot="sidebar-badge"
        className="bg-primary absolute end-1 top-1 size-1.5 rounded-full"
      />
    )
  }

  return (
    <span
      data-slot="sidebar-badge"
      className={cn(
        "absolute inset-ring-1 inset-ring-sidebar-border inset-y-1/2 end-1.5 h-5.5 w-auto -translate-y-1/2 rounded-full bg-foreground/5 px-2 text-[10px]/5.5 group-hover/sidebar-item:inset-ring-muted-foreground/30 group-current:inset-ring-transparent",
        className
      )}
      {...props}
    />
  )
}

export interface SidebarLinkProps extends LinkProps {
  ref?: React.RefObject<HTMLAnchorElement>
}

export function SidebarLink({ className, ref, ...props }: SidebarLinkProps) {
  return (
    <AriaLink
      ref={ref}
      className={cn(
        "col-span-full min-w-0 shrink-0 items-center p-2 focus:outline-hidden",
        "grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] supports-[grid-template-columns:subgrid]:grid-cols-subgrid",
        className
      )}
      {...props}
    />
  )
}

export function SidebarInset({ className, ref, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      ref={ref}
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background lg:min-w-0",
        "md:group-has-data-[variant=inset]/sidebar-root:border group-has-data-[variant=inset]/sidebar-root:border-sidebar-border group-has-data-[variant=inset]/sidebar-root:bg-muted",
        "md:group-has-data-[variant=inset]/sidebar-root:m-2",
        "md:group-has-data-[side=left]:group-has-data-[variant=inset]/sidebar-root:ms-0",
        "md:group-has-data-[side=right]:group-has-data-[variant=inset]/sidebar-root:me-0",
        "md:group-has-data-[variant=inset]/sidebar-root:rounded-2xl",
        "md:group-has-data-[variant=inset]/sidebar-root:peer-data-[state=collapsed]:ms-2",
        className
      )}
      {...props}
    />
  )
}

export type SidebarDisclosureGroupProps = DisclosureGroupProps
export function SidebarDisclosureGroup({
  allowsMultipleExpanded = true,
  className,
  ...props
}: SidebarDisclosureGroupProps) {
  return (
    <DisclosureGroup
      data-slot="sidebar-disclosure-group"
      allowsMultipleExpanded={allowsMultipleExpanded}
      className={cn(
        "col-span-full flex min-w-0 flex-col gap-y-0.5 in-data-[state=collapsed]:gap-y-1.5",
        className
      )}
      {...props}
    />
  )
}

export interface SidebarDisclosureProps extends DisclosureProps {
  ref?: React.Ref<HTMLDivElement>
}

export function SidebarDisclosure({ className, ref, ...props }: SidebarDisclosureProps) {
  const { state } = useSidebar()
  return (
    <Disclosure
      ref={ref}
      data-slot="sidebar-disclosure"
      className={cn("col-span-full min-w-0", state === "collapsed" ? "px-2" : "px-4", className)}
      {...props}
    />
  )
}

export interface SidebarDisclosureTriggerProps extends PrimitiveButtonProps {
  ref?: React.Ref<HTMLButtonElement>
}

export function SidebarDisclosureTrigger({
  className,
  ref,
  ...props
}: SidebarDisclosureTriggerProps) {
  const { state } = useSidebar()
  return (
    <Heading level={3}>
      <PrimitiveButton
        ref={ref}
        slot="trigger"
        className={composeRenderProps(
          className,
          (className, { isPressed, isFocusVisible, isHovered, isDisabled }) =>
            cn(
              "flex w-full min-w-0 items-center rounded-lg text-start font-medium text-base/6 text-sidebar-foreground",
              "group/sidebar-disclosure-trigger relative col-span-full overflow-hidden focus-visible:outline-hidden",
              "**:[svg]:size-5 **:[svg]:shrink-0 **:[svg]:text-muted-foreground sm:**:[svg]:size-4",
              "**:last:[svg]:size-5 sm:**:last:[svg]:size-4",
              "**:data-[slot=avatar]:size-6 sm:**:data-[slot=avatar]:size-5",
              "col-span-full gap-3 p-2 **:data-[slot=chevron]:text-muted-foreground sm:gap-2 sm:text-sm/5 **:last:[svg]:ms-auto",

              isFocusVisible && "inset-ring inset-ring-ring/70",
            (isPressed || isHovered) &&
              "bg-sidebar-accent/70 text-sidebar-accent-foreground **:data-[slot=chevron]:text-sidebar-accent-foreground **:[svg]:text-sidebar-accent-foreground **:last:[svg]:text-sidebar-accent-foreground",
              isDisabled && "opacity-50",
              className
            )
        )}
        {...props}
      >
        {(values) => (
          <>
            {typeof props.children === "function" ? props.children(values) : props.children}
            {state !== "collapsed" && (
              <ChevronDown
                data-slot="chevron"
                className="z-10 ms-auto size-3.5 transition-transform duration-200 group-aria-expanded/sidebar-disclosure-trigger:rotate-180"
              />
            )}
          </>
        )}
      </PrimitiveButton>
    </Heading>
  )
}

export function SidebarDisclosurePanel({ className, ...props }: DisclosurePanelProps) {
  return (
    <DisclosurePanel
      data-slot="sidebar-disclosure-panel"
      className={cn(
        "h-(--disclosure-panel-height) overflow-clip transition-[height] duration-200",
        className
      )}
      {...props}
    >
      <div
        data-slot="sidebar-disclosure-panel-content"
        className="col-span-full grid grid-cols-[auto_1fr] gap-y-0.5 in-data-[state=collapsed]:gap-y-1.5"
      >
        {props.children}
      </div>
    </DisclosurePanel>
  )
}

export function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      orientation="horizontal"
      className={cn(
        "mx-auto h-px w-[calc(var(--sidebar-width)-(--spacing(10)))] border-0 bg-sidebar-border forced-colors:bg-[ButtonBorder]",
        className
      )}
      {...props}
    />
  )
}

export function SidebarTrigger({
  onPress,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()
  return (
    <Button
      aria-label={props["aria-label"] || "Toggle Sidebar"}
      data-slot="sidebar-trigger"
      variant={props.variant || "ghost"}
      size={props.size || "icon-sm"}
      className={cn("shrink-0", className)}
      onPress={(event) => {
        onPress?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      {children || (
        <>
          <PanelLeft aria-hidden="true" />
          <span className="sr-only">Toggle Sidebar</span>
        </>
      )}
    </Button>
  )
}

export function SidebarRail({ className, ref, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return !props.children ? (
    <button
      ref={ref}
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      title="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 outline-hidden transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 hover:after:bg-transparent group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=hidden]:translate-x-0 group-data-[collapsible=hidden]:hover:bg-sidebar-accent group-data-[collapsible=hidden]:after:left-full",
        "[[data-side=left][data-collapsible=hidden]_&]:-right-2 [[data-side=right][data-collapsible=hidden]_&]:-left-2",
        className
      )}
      {...props}
    />
  ) : (
    props.children
  )
}

export function SidebarLabel({ className, ref, ...props }: React.ComponentProps<"span">) {
  const { state, isMobile } = useSidebar()
  const collapsed = state === "collapsed" && !isMobile
  if (!collapsed) {
    return (
      <span
        data-slot="sidebar-label"
        tabIndex={-1}
        ref={ref}
        className={cn("col-start-2 truncate pe-6 outline-hidden", className)}
        {...props}
      />
    )
  }
  return null
}

export interface SidebarNavProps extends React.ComponentProps<"nav"> {
  isSticky?: boolean
}

export function SidebarNav({ isSticky = false, className, ...props }: SidebarNavProps) {
  return (
    <nav
      data-slot="sidebar-nav"
      className={cn(
        "isolate flex items-center justify-between gap-x-2 px-(--container-padding,--spacing(4)) py-2.5 text-navbar-foreground sm:justify-start sm:px-(--gutter,--spacing(4)) md:w-full",
        isSticky && "static top-0 z-40 group-has-data-[variant=default]/sidebar-root:sticky",
        className
      )}
      {...props}
    />
  )
}

export interface SidebarMenuTriggerProps extends ButtonProps {
  alwaysVisible?: boolean
}
export function SidebarMenuTrigger({
  alwaysVisible = false,
  className,
  ...props
}: SidebarMenuTriggerProps) {
  return (
    <PrimitiveButton
      className={cn(
        !alwaysVisible &&
          "pressed:text-foreground text-muted-foreground pressed:opacity-100 hover:text-foreground opacity-0",
        "absolute end-0 flex h-full w-[calc(var(--sidebar-width)-90%)] items-center justify-end pe-2.5 outline-hidden",
        "pressed:[&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='size-'])]:size-5 sm:[&_svg:not([class*='size-'])]:size-4 **:[svg]:shrink-0",
        "group/sidebar-item:pressed:opacity-100 group-hover/sidebar-item:opacity-100 group-focus-visible/sidebar-item:opacity-100",
        "group/tree-item:pressed:opacity-100 group-hover/tree-item:opacity-100 group-focus-visible/tree-item:opacity-100",
        className
      )}
      {...props}
    />
  )
}

export interface SidebarTreeProps<T extends object> extends NavigationTreeProps<T> {}
export function SidebarTree<T extends object>({ className, ...props }: SidebarTreeProps<T>) {
  return (
    <NavigationTree
      className={cn(
        "col-span-full flex w-full min-w-0 cursor-default flex-col gap-y-0.5 p-4 outline-hidden forced-color-adjust-none in-data-[state=collapsed]:p-2",
        className
      )}
      {...props}
    />
  )
}

export function SidebarTreeItem<T extends object>({
  className,
  ...props
}: NavigationTreeItemProps<T>) {
  return (
    <NavigationTreeItem
      className={cn(
        "min-w-0 shrink-0 cursor-default outline-hidden select-none",
        "href" in props && "cursor-pointer",
        className
      )}
      {...props}
    />
  )
}

export interface SidebarTreeContentProps extends NavigationTreeItemContentProps {
  className?: string
  isCurrent?: boolean
}

export function SidebarTreeContent({ className, isCurrent, children }: SidebarTreeContentProps) {
  return (
    <NavigationTreeItemContent>
      {(values) => (
        <div data-slot="sidebar-item-content" className="relative flex w-full min-w-0 items-center">
          <div
            aria-hidden
            className="shrink-0"
            style={{
              width: `calc((var(--tree-item-level) - 1) * 1.25rem)`,
            }}
          />
          <div
            className={cn(
              "group/tree-item flex min-w-0 flex-1 items-center gap-x-2 rounded-lg p-2 font-medium text-base/6 text-sidebar-foreground sm:text-sm/5",
              "[&_svg:not([class*='size-'])]:size-5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground **:[svg]:-mx-0.5 **:[svg]:shrink-0",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:[&_svg:not([class*='text-'])]:text-sidebar-accent-foreground",
              "[--sidebar-current-background:var(--color-sidebar-primary)] [--sidebar-current-foreground:var(--color-sidebar-primary-foreground)]",
              values.isFocusVisible && "inset-ring inset-ring-sidebar-ring",
              values.isPressed &&
                "bg-sidebar-accent text-sidebar-accent-foreground [&_svg:not([class*='text-'])]:text-sidebar-accent-foreground",
              (values.isCurrent || isCurrent) &&
                "font-medium text-(--sidebar-current-foreground) hover:bg-(--sidebar-current-background) hover:text-(--sidebar-current-foreground) [&_.text-muted-foreground]:text-foreground/80 [&_svg:not([class*='text-'])]:text-(--sidebar-current-foreground) hover:[&_svg:not([class*='text-'])]:text-(--sidebar-current-foreground)",
              values.isCurrentAncestor &&
                "text-sidebar-accent-foreground [&_svg:not([class*='text-'])]:text-sidebar-accent-foreground",
              values.isDisabled && "opacity-50",
              className
            )}
          >
            {values.hasChildItems && <SidebarTreeIndicator values={values} />}
            {typeof children === "function" ? children(values) : children}
          </div>
        </div>
      )}
    </NavigationTreeItemContent>
  )
}

function SidebarTreeIndicator({
  values: { isDisabled, isExpanded },
}: {
  values: Pick<NavigationTreeItemContentRenderProps, "isDisabled" | "isExpanded">
}) {
  return (
    <PrimitiveButton
      slot="chevron"
      isDisabled={isDisabled}
      className={cn(
        "text-muted-foreground hover:text-foreground shrink-0 content-center",
        isExpanded && "text-foreground"
      )}
    >
      <ChevronRight
        data-slot="chevron"
        className={cn(
          "size-5 transition-transform duration-200 ease-in-out sm:size-4",
          isExpanded && "rotate-90"
        )}
      />
    </PrimitiveButton>
  )
}

export interface SidebarTreeLinkProps extends Omit<LinkProps, "href"> {}

export function SidebarTreeLink({ className, ...props }: SidebarTreeLinkProps) {
  return (
    <AriaLink
      data-slot="sidebar-tree-link"
      className={cn(
        "flex min-w-0 flex-1 items-center gap-x-2 outline-hidden focus-visible:outline-hidden",
        className
      )}
      {...props}
    />
  )
}

export function SidebarTreeLabel({ className, ...props }: React.ComponentProps<"span">) {
  const { state, isMobile } = useSidebar()

  if (state === "collapsed" && !isMobile) {
    return null
  }

  return (
    <span
      data-slot="sidebar-label"
      className={cn("col-start-2 truncate pe-6 outline-hidden", className)}
      {...props}
    />
  )
}

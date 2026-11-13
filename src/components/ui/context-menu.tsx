"use client"

import * as React from "react"
import { Button } from "react-aria-components/Button"
import {
  Header,
  Menu as MenuPrimitive,
  MenuItem,
  MenuSection,
  Separator,
  MenuTrigger,
  SubmenuTrigger,
} from "react-aria-components/Menu"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { Popover } from "react-aria-components/Popover"
import { Check, ChevronRight, Circle } from "lucide-react";

import { Root as SlotRoot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

function ContextMenu({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: {
  children?: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  return (
    <MenuTrigger trigger="contextMenu" isOpen={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </MenuTrigger>
  )
}

type ContextMenuTriggerProps = Omit<React.ComponentProps<typeof Button>, "children"> & {
  asChild?: boolean
  children?: React.ReactNode
  longPressDuration?: number | null
}

const ContextMenuTrigger = React.forwardRef<HTMLButtonElement, ContextMenuTriggerProps>(
  function ContextMenuTrigger(
    {
      asChild = false,
      className,
      longPressDuration = 500,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      onPointerLeave,
      onContextMenu,
      onClick,
      children,
      ...props
    },
    ref,
  ) {
    const timer = React.useRef<number | null>(null)
    const clickSuppressionTimer = React.useRef<number | null>(null)
    const didLongPress = React.useRef(false)
    const clearTimer = React.useCallback(() => {
      if (timer.current !== null) window.clearTimeout(timer.current)
      timer.current = null
    }, [])
    const clearClickSuppressionTimer = React.useCallback(() => {
      if (clickSuppressionTimer.current !== null) window.clearTimeout(clickSuppressionTimer.current)
      clickSuppressionTimer.current = null
    }, [])

    React.useEffect(() => () => {
      clearTimer()
      clearClickSuppressionTimer()
    }, [clearClickSuppressionTimer, clearTimer])

    return (
      <Button
        ref={ref}
        className={cn("[-webkit-touch-callout:none]", className)}
        {...props}
        data-slot="context-menu-trigger"
        render={asChild ? (renderProps) => <SlotRoot {...renderProps}>{children}</SlotRoot> : undefined}
        onPointerDown={(event) => {
          clearClickSuppressionTimer()
          didLongPress.current = false
          onPointerDown?.(event)
          if (event.defaultPrevented || event.pointerType !== "touch" || longPressDuration === null) return
          clearTimer()
          const trigger = event.currentTarget
          const { clientX, clientY } = event
          timer.current = window.setTimeout(() => {
            didLongPress.current = true
            const view = trigger.ownerDocument.defaultView
            if (!view) return
            trigger.dispatchEvent(new view.MouseEvent("contextmenu", {
              bubbles: true,
              cancelable: true,
              clientX,
              clientY,
              view,
            }))
          }, Math.max(0, longPressDuration))
        }}
        onPointerUp={(event) => {
          clearTimer()
          onPointerUp?.(event)
          if (didLongPress.current) {
            clearClickSuppressionTimer()
            clickSuppressionTimer.current = window.setTimeout(() => {
              didLongPress.current = false
              clickSuppressionTimer.current = null
            }, 750)
          }
        }}
        onPointerCancel={(event) => {
          clearTimer()
          clearClickSuppressionTimer()
          didLongPress.current = false
          onPointerCancel?.(event)
        }}
        onPointerLeave={(event) => {
          clearTimer()
          onPointerLeave?.(event)
        }}
        onContextMenu={(event) => {
          clearTimer()
          onContextMenu?.(event)
        }}
        onClick={(event) => {
          if (didLongPress.current) {
            event.preventDefault()
            event.stopPropagation()
            clearClickSuppressionTimer()
            didLongPress.current = false
            return
          }
          onClick?.(event)
        }}
      >
        {asChild ? null : children}
      </Button>
    )
  },
)

function ContextMenuContent({ className, children, ...props }: Omit<React.ComponentProps<typeof Popover>, "children"> & { children?: React.ReactNode }) {
  return (
    <Popover
      data-slot="context-menu-content"
      placement="bottom start"
      offset={0}
      className={({ isEntering, isExiting }) => cn(
        "z-50 min-w-36 overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-md outline-none entering:animate-in entering:fade-in-0 exiting:animate-out exiting:fade-out-0 motion-reduce:!animate-none motion-reduce:!transition-none",
        isEntering && "data-entering",
        isExiting && "data-exiting",
        typeof className === "string" ? className : undefined,
      )}
      {...props}
    >
      <MenuPrimitive className="outline-hidden">{children}</MenuPrimitive>
    </Popover>
  )
}

function ContextMenuGroup(props: React.ComponentProps<typeof MenuSection>) {
  return <MenuSection data-slot="context-menu-group" {...props} />
}

type ContextMenuItemProps = Omit<React.ComponentProps<typeof MenuItem>, "children" | "isDisabled"> & {
  children?: React.ReactNode
  disabled?: boolean
  inset?: boolean
  isDisabled?: boolean
  variant?: "default" | "destructive"
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  disabled,
  isDisabled,
  ...props
}: ContextMenuItemProps) {
  return (
    <MenuItem
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      isDisabled={disabled ?? isDisabled}
      className={composeRenderProps(className, (resolvedClassName) => cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focused:bg-accent disabled:pointer-events-none disabled:opacity-50 data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focused:bg-destructive/10",
        resolvedClassName
      ))}
      {...props}
    />
  )
}

type ContextCheckboxItemProps = Omit<React.ComponentProps<typeof MenuItem>, "children"> & {
  checked?: boolean | "indeterminate"
  children?: React.ReactNode
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  isDisabled,
  ...props
}: ContextCheckboxItemProps & { disabled?: boolean }) {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked)
  const currentChecked = checked ?? uncontrolledChecked

  return (
    <MenuItem
      data-slot="context-menu-checkbox-item"
      isDisabled={disabled ?? isDisabled}
      onAction={() => {
        const nextChecked = currentChecked === "indeterminate" ? true : !currentChecked
        if (checked === undefined) setUncontrolledChecked(nextChecked)
        onCheckedChange?.(nextChecked)
      }}
      className={composeRenderProps(className, (resolvedClassName) => cn(
        "relative flex cursor-default select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none focused:bg-accent disabled:pointer-events-none disabled:opacity-50",
        resolvedClassName
      ))}
      {...props}
      shouldCloseOnSelect={false}
      render={(renderProps) => {
        const content = (
          <>
          <span className="absolute left-2 flex size-4 items-center justify-center">
            {currentChecked === "indeterminate" ? <span className="h-0.5 w-2 bg-current" /> : currentChecked ? <Check className="size-4" /> : null}
          </span>
          {renderProps.children}
          </>
        )
        if ("href" in renderProps) {
          return <a {...renderProps} role="menuitemcheckbox" aria-checked={currentChecked === "indeterminate" ? "mixed" : currentChecked}>{content}</a>
        }
        return <div {...renderProps} role="menuitemcheckbox" aria-checked={currentChecked === "indeterminate" ? "mixed" : currentChecked}>{content}</div>
      }}
    >
      {children}
    </MenuItem>
  )
}

type ContextRadioGroupProps = Omit<React.ComponentProps<typeof MenuSection>, "children"> & {
  children?: React.ReactNode
  defaultValue?: string
  onValueChange?: (value: string) => void
  value?: string
}

type ContextRadioGroupContextValue = {
  setValue: (value: string) => void
  value?: string
}

const ContextRadioGroupContext = React.createContext<ContextRadioGroupContextValue | null>(null)

function ContextMenuRadioGroup({
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: ContextRadioGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const currentValue = value ?? uncontrolledValue
  const setValue = React.useCallback((nextValue: string) => {
    if (value === undefined) setUncontrolledValue(nextValue)
    onValueChange?.(nextValue)
  }, [onValueChange, value])

  return (
    <ContextRadioGroupContext.Provider value={{ setValue, value: currentValue }}>
      <MenuSection data-slot="context-menu-radio-group" {...props}>{children}</MenuSection>
    </ContextRadioGroupContext.Provider>
  )
}

function ContextMenuRadioItem({
  className,
  children,
  value,
  disabled,
  isDisabled,
  onAction,
  ...props
}: Omit<React.ComponentProps<typeof MenuItem>, "children"> & { children?: React.ReactNode; disabled?: boolean; value: string }) {
  const group = React.useContext(ContextRadioGroupContext)
  if (!group) throw new Error("ContextMenuRadioItem must be used within ContextMenuRadioGroup")
  const checked = group.value === value

  return (
    <MenuItem
      data-slot="context-menu-radio-item"
      isDisabled={disabled ?? isDisabled}
      onAction={() => {
        onAction?.()
        group.setValue(value)
      }}
      className={composeRenderProps(className, (resolvedClassName) => cn(
        "relative flex cursor-default select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none focused:bg-accent disabled:pointer-events-none disabled:opacity-50",
        resolvedClassName
      ))}
      {...props}
      shouldCloseOnSelect={false}
      render={(renderProps) => {
        const content = (
          <>
          <span className="absolute left-2 flex size-4 items-center justify-center">
            {checked && <Circle className="size-2 fill-current" />}
          </span>
          {renderProps.children}
          </>
        )
        if ("href" in renderProps) {
          return <a {...renderProps} role="menuitemradio" aria-checked={checked}>{content}</a>
        }
        return <div {...renderProps} role="menuitemradio" aria-checked={checked}>{content}</div>
      }}
    >
      {children}
    </MenuItem>
  )
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: Omit<React.ComponentProps<typeof MenuItem>, "children"> & {
  children?: React.ReactNode
  inset?: boolean
}) {
  return (
    <MenuItem
      data-slot="context-menu-sub-trigger"
      className={cn(
        "flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none focused:bg-accent open:bg-accent",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-4" />
    </MenuItem>
  )
}

function ContextMenuSubContent({ className, children, ...props }: Omit<React.ComponentProps<typeof Popover>, "children"> & { children?: React.ReactNode }) {
  return (
    <Popover
      data-slot="context-menu-sub-content"
      placement="right top"
      offset={4}
      className={({ isEntering, isExiting }) => cn(
        "z-50 min-w-32 overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-md entering:animate-in entering:fade-in-0 exiting:animate-out exiting:fade-out-0 motion-reduce:!animate-none",
        isEntering && "data-entering",
        isExiting && "data-exiting",
        typeof className === "string" ? className : undefined,
      )}
      {...props}
    >
      <MenuPrimitive className="outline-hidden">{children}</MenuPrimitive>
    </Popover>
  )
}

function ContextMenuSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Separator
      elementType="div"
      data-slot="context-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & { inset?: boolean }) {
  return (
    <Header
      data-slot="context-menu-label"
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", inset && "pl-8", className)}
      {...props}
    />
  )
}

function ContextMenuSub({ children }: { children: React.ReactElement[] }) {
  return <SubmenuTrigger>{children}</SubmenuTrigger>
}

function ContextMenuPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuPortal,
}

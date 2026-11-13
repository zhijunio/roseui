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
import { Check as IconCheck, ChevronRight as IconChevronRight, Circle as IconCircle } from "lucide-react";

import { Root as SlotRoot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

type MenubarPlacement = "bottom" | "bottom start" | "bottom end"

function toPlacement(align: "start" | "center" | "end"): MenubarPlacement {
  return align === "center" ? "bottom" : `bottom ${align}`
}

type MenubarContextValue = {
  activeMenu: string | null
  setActiveMenu: (value: string | null) => void
}

const MenubarContext = React.createContext<MenubarContextValue | null>(null)

function Menubar({ className, children, ...props }: React.ComponentProps<"div">) {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null)

  return (
    <MenubarContext.Provider value={{ activeMenu, setActiveMenu }}>
      <div
        data-slot="menubar"
        role="menubar"
        aria-orientation="horizontal"
        className={cn("flex h-9 items-center gap-1 rounded-lg border border-border bg-background p-1", className)}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
          const triggers = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[data-slot="menubar-trigger"]'))
          const index = triggers.indexOf(event.target as HTMLElement)
          if (index < 0 || triggers.length === 0) return
          const direction = event.key === "ArrowRight" ? 1 : -1
          const nextIndex = (index + direction + triggers.length) % triggers.length
          event.preventDefault()
          setActiveMenu(null)
          triggers[nextIndex]?.focus()
        }}
        {...props}
      >
        {children}
      </div>
    </MenubarContext.Provider>
  )
}

function MenubarMenu({ value, children }: { children?: React.ReactNode; value?: string }) {
  const context = React.useContext(MenubarContext)
  if (!context) throw new Error("MenubarMenu must be used within Menubar")
  const generatedId = React.useId()
  const menuId = value ?? generatedId

  return (
    <MenuTrigger
      isOpen={context.activeMenu === menuId}
      onOpenChange={(open) => context.setActiveMenu(open ? menuId : null)}
    >
      {children}
    </MenuTrigger>
  )
}

const MenubarTrigger = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ComponentProps<typeof Button>, "children"> & {
    asChild?: boolean
    children?: React.ReactNode
    disabled?: boolean
  }
>(
  function MenubarTrigger({ asChild = false, className, children, disabled, isDisabled, ...props }, ref) {
    return (
      <Button
        ref={ref}
        data-slot="menubar-trigger"
        className={composeRenderProps(className, (resolvedClassName) => cn("flex h-7 items-center rounded-md px-2 text-sm font-medium outline-none hover:bg-accent focus:bg-accent open:bg-accent", resolvedClassName))}
        isDisabled={disabled ?? isDisabled}
        render={asChild ? (renderProps) => <SlotRoot {...renderProps}>{children}</SlotRoot> : undefined}
        {...props}
      >
        {asChild ? null : children}
      </Button>
    )
  },
)

function MenubarPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function MenubarContent({
  className,
  align = "start",
  sideOffset = 6,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Popover>, "children"> & {
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  sideOffset?: number
}) {
  return (
    <Popover
      data-slot="menubar-content"
      placement={toPlacement(align)}
      offset={sideOffset}
      className={({ isEntering, isExiting }) => cn(
        "z-50 min-w-40 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg entering:animate-in entering:fade-in-0 entering:zoom-in-95 exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95 motion-reduce:!animate-none motion-reduce:!transition-none",
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

function MenubarGroup(props: React.ComponentProps<typeof MenuSection>) {
  return <MenuSection data-slot="menubar-group" {...props} />
}

function MenubarLabel({ className, ...props }: React.ComponentProps<"div">) {
  return <Header data-slot="menubar-label" className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)} {...props} />
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  disabled,
  isDisabled,
  ...props
}: Omit<React.ComponentProps<typeof MenuItem>, "isDisabled"> & {
  disabled?: boolean
  inset?: boolean
  isDisabled?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuItem
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      isDisabled={disabled ?? isDisabled}
      className={composeRenderProps(className, (resolvedClassName) => cn("relative flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focused:bg-accent focused:text-secondary-foreground disabled:pointer-events-none disabled:opacity-50 data-inset:pl-8 data-[variant=destructive]:text-destructive", resolvedClassName))}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  isDisabled,
  ...props
}: Omit<React.ComponentProps<typeof MenuItem>, "children"> & {
  checked?: boolean | "indeterminate"
  children?: React.ReactNode
  defaultChecked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}) {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked)
  const currentChecked = checked ?? uncontrolledChecked

  return (
    <MenuItem
      data-slot="menubar-checkbox-item"
      isDisabled={disabled ?? isDisabled}
      onAction={() => {
        const nextChecked = currentChecked === "indeterminate" ? true : !currentChecked
        if (checked === undefined) setUncontrolledChecked(nextChecked)
        onCheckedChange?.(nextChecked)
      }}
      className={composeRenderProps(className, (resolvedClassName) => cn("relative flex cursor-default items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-none focused:bg-accent focused:text-secondary-foreground disabled:pointer-events-none disabled:opacity-50", resolvedClassName))}
      {...props}
      shouldCloseOnSelect={false}
      render={(renderProps) => {
        const content = (
          <>
          <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
            {currentChecked === "indeterminate" ? <span className="h-0.5 w-2 bg-current" /> : currentChecked ? <IconCheck className="size-3.5" /> : null}
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

type RadioGroupContextValue = {
  setValue: (value: string) => void
  value?: string
}

const MenubarRadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)

function MenubarRadioGroup({
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: Omit<React.ComponentProps<typeof MenuSection>, "children"> & {
  children?: React.ReactNode
  defaultValue?: string
  onValueChange?: (value: string) => void
  value?: string
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const currentValue = value ?? uncontrolledValue
  const setValue = React.useCallback((nextValue: string) => {
    if (value === undefined) setUncontrolledValue(nextValue)
    onValueChange?.(nextValue)
  }, [onValueChange, value])

  return (
    <MenubarRadioGroupContext.Provider value={{ setValue, value: currentValue }}>
      <MenuSection data-slot="menubar-radio-group" {...props}>{children}</MenuSection>
    </MenubarRadioGroupContext.Provider>
  )
}

function MenubarRadioItem({
  className,
  children,
  value,
  disabled,
  isDisabled,
  onAction,
  ...props
}: Omit<React.ComponentProps<typeof MenuItem>, "children"> & { children?: React.ReactNode; disabled?: boolean; value: string }) {
  const group = React.useContext(MenubarRadioGroupContext)
  if (!group) throw new Error("MenubarRadioItem must be used within MenubarRadioGroup")
  const checked = group.value === value

  return (
    <MenuItem
      data-slot="menubar-radio-item"
      isDisabled={disabled ?? isDisabled}
      onAction={() => {
        onAction?.()
        group.setValue(value)
      }}
      className={composeRenderProps(className, (resolvedClassName) => cn("relative flex cursor-default items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-none focused:bg-accent focused:text-secondary-foreground disabled:pointer-events-none disabled:opacity-50", resolvedClassName))}
      {...props}
      shouldCloseOnSelect={false}
      render={(renderProps) => {
        const content = (
          <>
          <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
            {checked && <IconCircle className="size-2 fill-current" />}
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

function MenubarSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return <Separator elementType="div" data-slot="menubar-separator" className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
}

function MenubarSub({ children }: { children: React.ReactElement[] }) {
  return <SubmenuTrigger>{children}</SubmenuTrigger>
}

function MenubarSubTrigger({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof MenuItem>, "children"> & { children?: React.ReactNode }) {
  return (
    <MenuItem
      data-slot="menubar-sub-trigger"
      className={cn("flex cursor-default items-center rounded-md px-2 py-1.5 text-sm outline-none focused:bg-accent open:bg-accent", className)}
      {...props}
    >
      {children}
      <IconChevronRight className="ml-auto size-4" />
    </MenuItem>
  )
}

function MenubarSubContent({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Popover>, "children"> & { children?: React.ReactNode }) {
  return (
    <Popover
      data-slot="menubar-sub-content"
      placement="right top"
      offset={6}
      className={({ isEntering, isExiting }) => cn(
        "z-50 min-w-36 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg entering:animate-in entering:fade-in-0 exiting:animate-out exiting:fade-out-0 motion-reduce:!animate-none motion-reduce:!transition-none",
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

function MenubarShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="menubar-shortcut" className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
}

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarLabel,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarShortcut,
  MenubarPortal,
}

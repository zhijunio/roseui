"use client"

import * as React from "react"
import {
  Button,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Popover,
  Select as SelectPrimitive,
  SelectValue as SelectValuePrimitive,
} from "react-aria-components/Select"
import { Header } from "react-aria-components/Header"
import { Separator } from "react-aria-components/Separator"
import { ChevronDown as ChevronDownIcon, Check as CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils"

type SelectPlaceholderContextValue = {
  setPlaceholder: (placeholder: string | undefined) => void
}

const SelectPlaceholderContext = React.createContext<SelectPlaceholderContextValue | null>(null)

type SelectProps = Omit<
  React.ComponentProps<typeof SelectPrimitive>,
  "children" | "defaultOpen" | "defaultSelectedKey" | "isDisabled" | "onOpenChange" | "onSelectionChange" | "placeholder" | "selectedKey"
> & {
  children?: React.ReactNode
  defaultOpen?: boolean
  defaultValue?: string
  disabled?: boolean
  isDisabled?: boolean
  onOpenChange?: (open: boolean) => void
  onValueChange?: (value: string) => void
  open?: boolean
  placeholder?: string
  required?: boolean
  value?: string
}

function Select({
  children,
  value,
  defaultValue,
  disabled,
  isDisabled,
  open,
  required,
  defaultOpen,
  onOpenChange,
  onValueChange,
  placeholder: providedPlaceholder,
  ...props
}: SelectProps) {
  const [placeholder, setPlaceholder] = React.useState(providedPlaceholder)

  React.useLayoutEffect(() => {
    if (providedPlaceholder !== undefined) setPlaceholder(providedPlaceholder)
  }, [providedPlaceholder])

  return (
    <SelectPlaceholderContext.Provider value={{ setPlaceholder }}>
      <SelectPrimitive
        data-slot="select"
        selectedKey={value}
        defaultSelectedKey={defaultValue}
        isDisabled={disabled ?? isDisabled}
        isRequired={required}
        isOpen={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        onSelectionChange={onValueChange ? (key) => onValueChange(String(key)) : undefined}
        placeholder={placeholder}
        {...props}
      >
        {children}
      </SelectPrimitive>
    </SelectPlaceholderContext.Provider>
  )
}

function SelectGroup({ className, ...props }: React.ComponentProps<typeof ListBoxSection>) {
  return <ListBoxSection data-slot="select-group" className={cn("scroll-my-1 p-1", className)} {...props} />
}

function SelectValue({
  className,
  placeholder,
  ...props
}: React.ComponentProps<typeof SelectValuePrimitive> & { placeholder?: string }) {
  const placeholderContext = React.useContext(SelectPlaceholderContext)

  React.useLayoutEffect(() => {
    if (placeholder !== undefined) placeholderContext?.setPlaceholder(placeholder)
  }, [placeholder, placeholderContext])

  return <SelectValuePrimitive data-slot="select-value" className={className} {...props} />
}

type SelectTriggerProps = Omit<React.ComponentProps<typeof Button>, "children"> & {
  children?: React.ReactNode
  disabled?: boolean
  icon?: React.ReactNode
  size?: "sm" | "default"
  variant?: "default" | "inline"
}

function SelectTrigger({
  className,
  size = "default",
  icon = <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />,
  variant = "default",
  disabled,
  isDisabled,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <Button
      data-slot="select-trigger"
      data-size={variant === "inline" ? "inline" : size}
      data-variant={variant}
      isDisabled={disabled ?? isDisabled}
      className={cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors motion-reduce:!transition-none outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 placeholder:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        variant === "inline" && "h-auto min-w-0 gap-1 rounded-md border-0 bg-transparent px-1 py-0.5 font-medium shadow-none hover:bg-accent/60 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-ring/50 dark:!bg-transparent dark:hover:bg-accent/30",
        className
      )}
      {...props}
    >
      {children}
      {icon}
    </Button>
  )
}

type SelectPlacement = "top" | "right" | "bottom" | "left" | `${"top" | "bottom"} ${"start" | "end"}` | `${"left" | "right"} ${"top" | "bottom"}`

function toPlacement(side: "top" | "right" | "bottom" | "left", align: "start" | "center" | "end"): SelectPlacement {
  if (align === "center") return side
  if (side === "left" || side === "right") return `${side} ${align === "start" ? "top" : "bottom"}`
  return `${side} ${align}`
}

type SelectContentProps = Omit<React.ComponentProps<typeof Popover>, "children"> & {
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  collisionPadding?: number
  position?: "item-aligned" | "popper"
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  collisionPadding = 0,
  side = "bottom",
  sideOffset = position === "popper" ? 4 : 0,
  ...props
}: SelectContentProps) {
  return (
    <Popover
      data-slot="select-content"
      data-align-trigger={position === "item-aligned"}
      data-position={position}
      placement={toPlacement(side, position === "item-aligned" ? "start" : align)}
      offset={sideOffset}
      containerPadding={collisionPadding}
      className={({ isEntering, isExiting }) => cn(
        "relative z-50 max-h-[min(24rem,calc(100dvh-2rem))] min-w-36 overflow-x-hidden overflow-y-auto rounded-[var(--radius)] bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-150 entering:animate-in entering:fade-in-0 entering:zoom-in-95 exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95 motion-reduce:!animate-none motion-reduce:!transition-none",
        position === "popper" && "min-w-(--trigger-width)",
        isEntering && "data-entering",
        isExiting && "data-exiting",
        typeof className === "string" ? className : undefined,
      )}
      {...props}
    >
      <ListBox className="p-1 outline-hidden">{children}</ListBox>
    </Popover>
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<"div">) {
  return <Header data-slot="select-label" className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)} {...props} />
}

type SelectItemProps = Omit<React.ComponentProps<typeof ListBoxItem>, "children" | "id" | "isDisabled"> & {
  children?: React.ReactNode
  disabled?: boolean
  indicatorPosition?: "left" | "right"
  isDisabled?: boolean
  value: string
}

function SelectItem({
  className,
  indicatorPosition = "right",
  children,
  value,
  disabled,
  isDisabled,
  ...props
}: SelectItemProps) {
  return (
    <ListBoxItem
      id={value}
      data-slot="select-item"
      data-indicator-position={indicatorPosition}
      textValue={typeof children === "string" ? children : props.textValue}
      isDisabled={disabled ?? isDisabled}
      className={({ isSelected }) => cn(
        "group/select-item relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focused:bg-accent focused:text-secondary-foreground disabled:pointer-events-none disabled:opacity-50 data-[indicator-position=left]:pr-2 data-[indicator-position=left]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        indicatorPosition === "left" && "pr-2 pl-8",
        isSelected && "data-selected",
        typeof className === "string" ? className : undefined,
      )}
      {...props}
    >
      <span className={cn("pointer-events-none absolute flex size-4 items-center justify-center", indicatorPosition === "left" ? "left-2" : "right-2")}>
        <CheckIcon className="invisible group-selected/select-item:visible" />
      </span>
      {children}
    </ListBoxItem>
  )
}

function SelectSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Separator
      elementType="div"
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

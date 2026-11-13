"use client"

import { ChevronsUpDown as ChevronUpDownIcon } from "lucide-react"
import { Button } from "react-aria-components/Button"
import type {
  ComboBoxProps as ComboBoxPrimitiveProps,
  ComboBoxValueProps,
} from "react-aria-components/ComboBox"
import {
  ComboBox as ComboBoxPrimitive,
  ComboBoxContext,
  ComboBoxValue as ComboBoxValuePrimitive,
} from "react-aria-components/ComboBox"
import type { InputProps } from "react-aria-components/Input"
import { ListBox, type ListBoxProps } from "react-aria-components/ListBox"
import type { PopoverProps } from "react-aria-components/Popover"
import { useSlottedContext } from "react-aria-components/slots"
import { fieldStyles } from "@/components/ui/field"
import { Input as AriaInput } from "react-aria-components/Input"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { cn } from "@/lib/utils"
const cx = cn
import { DropdownDescription, DropdownItem, DropdownLabel, DropdownSection } from "./dropdown"
import { PopoverPanel as Popover } from "./popover"

export interface ComboBoxProps<
  T extends object,
  M extends "single" | "multiple" = "single",
> extends Omit<ComboBoxPrimitiveProps<T, M>, "children"> {
  children: React.ReactNode
}

export function ComboBox<T extends object, M extends "single" | "multiple" = "single">({
  className,
  ...props
}: ComboBoxProps<T, M>) {
  return (
    <ComboBoxPrimitive data-slot="control" className={cx(fieldStyles(), className)} {...props} />
  )
}

export interface ComboBoxListProps<T extends object>
  extends Omit<ListBoxProps<T>, "layout" | "orientation">, Pick<PopoverProps, "placement"> {
  popover?: Omit<PopoverProps, "children">
}

export function ComboBoxContent<T extends object>({
  children,
  items,
  className,
  popover,
  ...props
}: ComboBoxListProps<T>) {
  return (
    <Popover
      {...popover}
      placement={popover?.placement ?? "bottom"}
      className={cx(
        "min-w-(--trigger-width) overflow-hidden *:data-[slot=popover-inner]:overflow-hidden",
        popover?.className
      )}
    >
      <ListBox
        layout="stack"
        orientation="vertical"
        className={cx(
          "grid max-h-[inherit] w-full grid-cols-[auto_1fr] flex-col gap-y-1 overflow-y-auto p-1 outline-hidden *:[[role='group']+[role=group]]:mt-4 *:[[role='group']+[role=separator]]:mt-1",
          className
        )}
        items={items}
        {...props}
      >
        {children}
      </ListBox>
    </Popover>
  )
}

export function ComboBoxInput({ showTrigger = true, ...props }: InputProps & { showTrigger?: boolean }) {
  const context = useSlottedContext(ComboBoxContext)!
  return (
    <span
      data-slot="control"
      className="relative isolate block w-full has-[[data-slot=icon]:last-child]:[&_input]:pe-10"
    >
      <AriaInput
        {...props}
        placeholder={props.placeholder}
        className={composeRenderProps(props.className, (className) =>
          cn("h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed aria-invalid:text-destructive", className),
        )}
      />
      {showTrigger ? (
        <Button className="absolute end-0 top-0 grid h-full w-11 cursor-default place-content-center sm:w-9">
          {!context?.inputValue && (
            <ChevronUpDownIcon
              data-slot="chevron"
              className="-me-1 size-5 text-muted-foreground sm:size-4"
            />
          )}
        </Button>
      ) : null}
    </span>
  )
}

export const ComboBoxSection = DropdownSection
export const ComboBoxItem = DropdownItem
export const ComboBoxLabel = DropdownLabel
export const ComboBoxDescription = DropdownDescription
export function ComboBoxValue<T extends object>(props: ComboBoxValueProps<T>) {
  return <ComboBoxValuePrimitive data-slot="control" {...props} />
}

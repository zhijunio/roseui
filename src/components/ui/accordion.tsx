"use client"

import * as React from "react"
import { Button as DisclosureButton, type ButtonProps } from "react-aria-components/Button"
import {
  Disclosure as DisclosurePrimitive,
  DisclosurePanel,
} from "react-aria-components/Disclosure"
import { DisclosureGroup as DisclosureGroupPrimitive, type DisclosureGroupProps } from "react-aria-components/DisclosureGroup"

import { cn } from "@/lib/utils"
import { ChevronDown as ChevronDownIcon } from "lucide-react";

type AccordionValue = string | string[]

type AccordionCommonProps = Omit<
  DisclosureGroupProps,
  "allowsMultipleExpanded" | "expandedKeys" | "defaultExpandedKeys" | "onExpandedChange" | "isDisabled"
> & {
  collapsible?: boolean
  disabled?: boolean
}

type AccordionProps = AccordionCommonProps & (
  | {
      type?: "single"
      value?: string
      defaultValue?: string
      onValueChange?: (value: string) => void
    }
  | {
      type: "multiple"
      value?: string[]
      defaultValue?: string[]
      onValueChange?: (value: string[]) => void
    }
)

function toKeySet(value: AccordionValue | undefined) {
  if (value === undefined) return new Set<string>()
  return new Set(Array.isArray(value) ? value : [value])
}

function Accordion(inputProps: AccordionProps) {
  const {
    className,
    type = "single",
    collapsible = false,
    disabled,
    ...props
  } = inputProps
  const { value, defaultValue } = inputProps
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() => toKeySet(defaultValue))
  const expandedKeys = value === undefined ? uncontrolledValue : toKeySet(value)

  return (
    <DisclosureGroupPrimitive
      data-slot="accordion"
      data-type={type}
      allowsMultipleExpanded={type === "multiple"}
      isDisabled={disabled}
      expandedKeys={Array.from(expandedKeys)}
      onExpandedChange={(nextKeys) => {
        if (type === "single" && !collapsible && nextKeys.size === 0) return
        const normalizedKeys = type === "single"
          ? new Set(Array.from(nextKeys, String).slice(0, 1))
          : new Set(Array.from(nextKeys, String))

        if (value === undefined) setUncontrolledValue(normalizedKeys)
        if (inputProps.type === "multiple") {
          inputProps.onValueChange?.(Array.from(normalizedKeys, String))
        } else {
          inputProps.onValueChange?.(String(Array.from(normalizedKeys)[0] ?? ""))
        }
      }}
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  value,
  disabled,
  isDisabled,
  ...props
}: React.ComponentProps<typeof DisclosurePrimitive> & {
  value?: string
  disabled?: boolean
}) {
  return (
    <DisclosurePrimitive
      id={value}
      isDisabled={disabled ?? isDisabled}
      data-slot="accordion-item"
      className={cn("group/accordion-item not-last:border-b", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  render,
  ...props
}: Omit<ButtonProps, "children" | "render"> & {
  children?: React.ReactNode
  render?: (props: React.ComponentPropsWithoutRef<"button"> & { "data-slot": "accordion-trigger" }) => React.ReactElement
}) {
  return (
    <h3 data-slot="accordion-header" className="flex">
      <DisclosureButton
        {...props}
        render={render ? (domProps) => {
          const triggerProps = {
            ...domProps,
            children,
            className: cn(domProps.className, className),
            "data-slot": "accordion-trigger" as const,
          }
          return render(triggerProps)
        } : undefined}
        type="button"
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium motion-safe:transition-colors outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className,
        )}
      >
        {children}
        {render ? null : (
          <ChevronDownIcon
            data-slot="accordion-trigger-icon"
            className="pointer-events-none shrink-0 motion-safe:transition-transform group-expanded/accordion-item:rotate-180"
          />
        )}
      </DisclosureButton>
    </h3>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DisclosurePanel>) {
  return (
    <DisclosurePanel data-slot="accordion-content" {...props}>
      <div
        className={cn(
          "pt-0 pb-2.5 text-sm expanded:animate-accordion-down motion-reduce:!animate-none [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </DisclosurePanel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

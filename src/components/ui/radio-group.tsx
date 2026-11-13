"use client"

import * as React from "react"
import type { ReactNode } from "react"
import {
  Radio as RadioPrimitive,
  RadioButton as RadioButtonPrimitive,
  RadioField as RadioFieldPrimitive,
  RadioGroup as RadioGroupPrimitive,
  SelectionIndicator,
  type RadioButtonProps as RadioButtonPrimitiveProps,
  type RadioFieldProps as RadioFieldPrimitiveProps,
  type RadioGroupProps as RadioGroupPrimitiveProps,
  type RadioProps as RadioPrimitiveProps,
} from "react-aria-components/RadioGroup"

import { cn } from "@/lib/utils"

type RadioGroupProps = RadioGroupPrimitiveProps & {
  disabled?: boolean
  onValueChange?: (value: string) => void
  required?: boolean
}

type RadioGroupItemProps = RadioPrimitiveProps & {
  disabled?: boolean
  indicator?: ReactNode
}

type RadioFieldProps = RadioFieldPrimitiveProps & {
  disabled?: boolean
}

type RadioButtonProps = RadioButtonPrimitiveProps & {
  indicator?: ReactNode
  indicatorClassName?: string
  boxClassName?: string
}

const radioBoxClassName =
  "touch-target relative flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border border-input bg-transparent transition-colors outline-none group-data-[focus-visible]/radio-button:ring-3 group-data-[focus-visible]/radio-button:ring-ring/50 group-data-[selected]/radio-button:border-primary group-data-[selected]/radio-button:bg-primary group-data-[selected]/radio-button:text-primary-foreground group-data-[disabled]/radio-button:cursor-not-allowed group-data-[disabled]/radio-button:opacity-50 group-data-[disabled]/radio-button:text-[GrayText] group-data-[invalid]/radio-button:border-destructive group-data-[invalid]/radio-button:ring-3 group-data-[invalid]/radio-button:ring-destructive/20 forced-colors:border-[ButtonText] forced-colors:group-data-[selected]/radio-button:border-[Highlight] forced-colors:group-data-[selected]/radio-button:bg-[Highlight] forced-colors:group-data-[selected]/radio-button:text-[HighlightText] forced-colors:group-data-[invalid]/radio-button:border-[Mark] dark:bg-input/30 dark:group-data-[selected]/radio-button:bg-primary"

function RadioGroup({
  className,
  disabled,
  onValueChange,
  isDisabled,
  onChange,
  isRequired,
  required,
  value,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      value={value}
      isDisabled={disabled ?? isDisabled}
      isRequired={required ?? isRequired}
      onChange={onChange ?? (onValueChange ? (nextValue) => onValueChange(String(nextValue)) : undefined)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  disabled,
  indicator,
  isDisabled,
  ...props
}: RadioGroupItemProps) {
  return (
    <RadioPrimitive
      data-slot="radio-group-item"
      className={cn(
        "touch-target group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:text-[GrayText] aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:selected:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 selected:border-primary selected:bg-primary selected:text-primary-foreground dark:selected:bg-primary forced-colors:border-[ButtonText] forced-colors:selected:border-[Highlight] forced-colors:selected:bg-[Highlight] forced-colors:selected:text-[HighlightText] forced-colors:aria-invalid:border-[Mark]",
        className
      )}
      isDisabled={disabled ?? isDisabled}
      {...props}
    >
      <SelectionIndicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        {indicator ?? (
          <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground forced-colors:bg-[HighlightText]" />
        )}
      </SelectionIndicator>
    </RadioPrimitive>
  )
}

function RadioField({ className, disabled, isDisabled, ...props }: RadioFieldProps) {
  return (
    <RadioFieldPrimitive
      data-slot="radio-field"
      className={cn("contents", className)}
      isDisabled={disabled ?? isDisabled}
      {...props}
    />
  )
}

function RadioButton({ children, className, boxClassName, indicator, indicatorClassName, ...props }: RadioButtonProps) {
  return (
    <RadioButtonPrimitive
      data-slot="radio-button"
      className={cn("group/radio-button flex cursor-pointer items-start gap-3 text-left", className)}
      {...props}
    >
      {(values) => (
        <>
          <span data-slot="radio-group-item" className={cn(radioBoxClassName, boxClassName)}>
            <SelectionIndicator
              data-slot="radio-group-indicator"
              className={cn("flex size-4 items-center justify-center", indicatorClassName)}
            >
              {indicator ?? (
                <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground forced-colors:bg-[HighlightText]" />
              )}
            </SelectionIndicator>
          </span>
          {typeof children === "function" ? children(values) : children}
        </>
      )}
    </RadioButtonPrimitive>
  )
}

export { RadioButton, RadioField, RadioGroup, RadioGroupItem }

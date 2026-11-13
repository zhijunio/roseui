"use client"

import * as React from "react"
import {
  Switch as SwitchPrimitive,
  SwitchButton as SwitchButtonPrimitive,
  SwitchField as SwitchFieldPrimitive,
  type SwitchButtonProps as SwitchButtonPrimitiveProps,
  type SwitchFieldProps as SwitchFieldPrimitiveProps,
  type SwitchProps as SwitchPrimitiveProps,
} from "react-aria-components/Switch"

import { cn } from "@/lib/utils"

type SwitchProps = SwitchPrimitiveProps & {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
  required?: boolean
  size?: "sm" | "default" | "lg"
  thumbIcon?: React.ReactNode
}

type SwitchFieldProps = SwitchFieldPrimitiveProps & {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
  readOnly?: boolean
  required?: boolean
}

type SwitchButtonProps = SwitchButtonPrimitiveProps & {
  size?: "sm" | "default" | "lg"
  thumbIcon?: React.ReactNode
  trackClassName?: string
}

const switchTrackClassName =
  "touch-target peer relative inline-flex shrink-0 items-center rounded-full border border-transparent bg-input motion-safe:transition-colors outline-none data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] data-[size=lg]:h-6 data-[size=lg]:w-11 group-data-[focus-visible]/switch-button:ring-3 group-data-[focus-visible]/switch-button:ring-ring/50 group-data-[selected]/switch-button:bg-primary group-data-[disabled]/switch-button:cursor-not-allowed group-data-[disabled]/switch-button:opacity-50 group-data-[disabled]/switch-button:text-[GrayText] group-data-[invalid]/switch-button:border-destructive group-data-[invalid]/switch-button:ring-3 group-data-[invalid]/switch-button:ring-destructive/20 forced-colors:border-[ButtonText] forced-colors:group-data-[selected]/switch-button:bg-[Highlight] forced-colors:group-data-[invalid]/switch-button:border-[Mark] dark:bg-input/80 dark:group-data-[invalid]/switch-button:border-destructive/50 dark:group-data-[invalid]/switch-button:ring-destructive/40"

function Switch({
  className,
  size = "default",
  thumbIcon,
  checked,
  defaultChecked,
  disabled,
  onCheckedChange,
  isSelected,
  defaultSelected,
  onChange,
  isDisabled,
  required,
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive
      data-slot="switch"
      data-size={size}
      isSelected={checked ?? isSelected}
      defaultSelected={defaultChecked ?? defaultSelected}
      onChange={onChange ?? (onCheckedChange ? (value) => onCheckedChange(value) : undefined)}
      isDisabled={disabled ?? isDisabled}
      aria-required={required || undefined}
      className={cn(
        "touch-target peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent motion-safe:transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] data-[size=lg]:h-6 data-[size=lg]:w-11 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 selected:bg-primary not-selected:bg-input dark:not-selected:bg-input/80 disabled:cursor-not-allowed disabled:opacity-50 disabled:text-[GrayText] forced-colors:border-[ButtonText] forced-colors:selected:bg-[Highlight] forced-colors:aria-invalid:border-[Mark]",
        className
      )}
      {...props}
    >
      <span
        data-slot="switch-thumb"
        className="pointer-events-none flex items-center justify-center rounded-full bg-background text-foreground ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=lg]/switch:size-5 group-selected/switch:translate-x-[calc(100%-2px)] group-data-[size=lg]/switch:group-selected/switch:translate-x-[calc(100%+4px)] dark:group-selected/switch:bg-primary-foreground forced-colors:bg-[Canvas]"
      >
        {thumbIcon && <span aria-hidden="true" className="grid place-items-center">{thumbIcon}</span>}
      </span>
    </SwitchPrimitive>
  )
}

function SwitchField({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  readOnly,
  required,
  isSelected,
  defaultSelected,
  onChange,
  isDisabled,
  isReadOnly,
  isRequired,
  className,
  ...props
}: SwitchFieldProps) {
  return (
    <SwitchFieldPrimitive
      data-slot="switch-field"
      className={cn("contents", className)}
      isSelected={checked ?? isSelected}
      defaultSelected={defaultChecked ?? defaultSelected}
      onChange={onChange ?? (onCheckedChange ? (value) => onCheckedChange(value) : undefined)}
      isDisabled={disabled ?? isDisabled}
      isReadOnly={readOnly ?? isReadOnly}
      isRequired={required ?? isRequired}
      {...props}
    />
  )
}

function SwitchButton({ children, className, size = "default", thumbIcon, trackClassName, ...props }: SwitchButtonProps) {
  return (
    <SwitchButtonPrimitive
      data-slot="switch-button"
      className={cn("group/switch-button flex cursor-pointer items-center gap-3 text-left", className)}
      {...props}
    >
      {(values) => (
        <>
          {typeof children === "function" ? children(values) : children}
          <span data-slot="switch" data-size={size} className={cn(switchTrackClassName, trackClassName)}>
            <span
              data-slot="switch-thumb"
              className="pointer-events-none flex items-center justify-center rounded-full bg-background text-foreground ring-0 transition-transform group-data-[size=default]/switch-button:size-4 group-data-[size=sm]/switch-button:size-3 group-data-[size=lg]/switch-button:size-5 group-data-[selected]/switch-button:translate-x-[calc(100%-2px)] dark:group-data-[selected]/switch-button:bg-primary-foreground forced-colors:bg-[Canvas]"
            >
              {thumbIcon && (
                <span aria-hidden="true" className="grid place-items-center">
                  {thumbIcon}
                </span>
              )}
            </span>
          </span>
        </>
      )}
    </SwitchButtonPrimitive>
  )
}

export { Switch, SwitchButton, SwitchField }

"use client"

import * as React from "react"
import {
  Checkbox as CheckboxPrimitive,
  CheckboxButton as CheckboxButtonPrimitive,
  CheckboxField as CheckboxFieldPrimitive,
  type CheckboxButtonProps as CheckboxButtonPrimitiveProps,
  type CheckboxProps as CheckboxPrimitiveProps,
  type CheckboxFieldProps as CheckboxFieldPrimitiveProps,
} from "react-aria-components/Checkbox"
import {
  CheckboxGroup as CheckboxGroupPrimitive,
  type CheckboxGroupProps as CheckboxGroupPrimitiveProps,
} from "react-aria-components/CheckboxGroup"
import { SelectionIndicator } from "react-aria-components/SelectionIndicator"
import { SharedElementTransition } from "react-aria-components/SharedElementTransition"

import { cn } from "@/lib/utils"
import { Check as CheckIcon, Minus as MinusIcon } from "lucide-react";

type CheckboxProps = CheckboxPrimitiveProps & {
  checked?: boolean | "indeterminate"
  defaultChecked?: boolean | "indeterminate"
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
  indicator?: React.ReactNode
  readOnly?: boolean
  required?: boolean
}

type CheckboxFieldProps = CheckboxFieldPrimitiveProps & {
  checked?: boolean | "indeterminate"
  defaultChecked?: boolean | "indeterminate"
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
  readOnly?: boolean
  required?: boolean
}

type CheckboxButtonProps = CheckboxButtonPrimitiveProps & {
  indicator?: React.ReactNode
  indicatorClassName?: string
  boxClassName?: string
}

export function CheckboxGroup({ className, ...props }: CheckboxGroupPrimitiveProps) {
  return (
    <CheckboxGroupPrimitive
      data-slot="control"
      className={cn(
        "grid min-w-0 gap-3 has-[[slot=description]]:gap-5",
        "**:data-[slot=control-label]:font-medium **:[[slot=description]]:block",
        className,
      )}
      {...props}
    />
  );
}

const checkboxBoxClassName =
  "touch-target relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input bg-transparent text-transparent transition-colors outline-none group-data-[focus-visible]/checkbox-button:ring-3 group-data-[focus-visible]/checkbox-button:ring-ring/50 group-data-[selected]/checkbox-button:border-primary group-data-[selected]/checkbox-button:bg-primary group-data-[selected]/checkbox-button:text-primary-foreground group-data-[disabled]/checkbox-button:cursor-not-allowed group-data-[disabled]/checkbox-button:opacity-50 group-data-[disabled]/checkbox-button:text-[GrayText] group-data-[invalid]/checkbox-button:border-destructive group-data-[invalid]/checkbox-button:ring-3 group-data-[invalid]/checkbox-button:ring-destructive/20 forced-colors:border-[ButtonText] forced-colors:group-data-[selected]/checkbox-button:border-[Highlight] forced-colors:group-data-[selected]/checkbox-button:bg-[Highlight] forced-colors:group-data-[selected]/checkbox-button:text-[HighlightText] forced-colors:group-data-[invalid]/checkbox-button:border-[Mark] dark:bg-input/30 dark:group-data-[selected]/checkbox-button:bg-primary"

function Checkbox({
  children,
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  readOnly = false,
  indicator,
  isSelected,
  defaultSelected,
  onChange,
  isDisabled,
  isReadOnly,
  isRequired,
  isIndeterminate,
  required,
  ...props
}: CheckboxProps) {
  const controlledChecked = checked === "indeterminate" ? undefined : checked
  const defaultSelectedValue = defaultChecked === "indeterminate" ? undefined : defaultChecked
  const selected = controlledChecked ?? isSelected ?? (readOnly ? defaultSelectedValue ?? defaultSelected : undefined)

  return (
    <CheckboxPrimitive
      data-slot="checkbox"
      aria-readonly={readOnly}
      className={cn(
        "touch-target peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:text-[GrayText] aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:selected:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 selected:border-primary selected:bg-primary selected:text-primary-foreground dark:selected:bg-primary forced-colors:border-[ButtonText] forced-colors:selected:border-[Highlight] forced-colors:selected:bg-[Highlight] forced-colors:selected:text-[HighlightText] forced-colors:aria-invalid:border-[Mark]",
        className
      )}
      isSelected={selected}
      defaultSelected={readOnly ? undefined : defaultSelectedValue ?? defaultSelected}
      isIndeterminate={checked === "indeterminate" || defaultChecked === "indeterminate" || isIndeterminate}
      onChange={readOnly ? undefined : onChange ?? (onCheckedChange ? (value) => onCheckedChange(value) : undefined)}
      isDisabled={disabled ?? isDisabled}
      isReadOnly={readOnly || isReadOnly}
      isRequired={required ?? isRequired}
      {...props}
    >
      {(values) => (
        <>
          <SharedElementTransition>
            <SelectionIndicator
              isSelected={values.isSelected || values.isIndeterminate}
              data-slot="checkbox-indicator"
              className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
            >
              {indicator ??
                (values.isIndeterminate ? (
                  <MinusIcon aria-hidden="true" data-slot="check-indicator" />
                ) : (
                  <CheckIcon aria-hidden="true" data-slot="check-indicator" />
                ))}
            </SelectionIndicator>
          </SharedElementTransition>
          {typeof children === "function" ? children(values) : children}
        </>
      )}
    </CheckboxPrimitive>
  )
}

function CheckboxField({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  readOnly = false,
  required,
  isSelected,
  defaultSelected,
  onChange,
  isDisabled,
  isReadOnly,
  isRequired,
  isIndeterminate,
  className,
  ...props
}: CheckboxFieldProps) {
  const controlledChecked = checked === "indeterminate" ? undefined : checked
  const defaultSelectedValue = defaultChecked === "indeterminate" ? undefined : defaultChecked
  const selected = controlledChecked ?? isSelected ?? (readOnly ? defaultSelectedValue ?? defaultSelected : undefined)

  return (
    <CheckboxFieldPrimitive
      data-slot="checkbox-field"
      className={cn("contents", className)}
      isSelected={selected}
      defaultSelected={readOnly ? undefined : defaultSelectedValue ?? defaultSelected}
      isIndeterminate={checked === "indeterminate" || defaultChecked === "indeterminate" || isIndeterminate}
      onChange={readOnly ? undefined : onChange ?? (onCheckedChange ? (value) => onCheckedChange(value) : undefined)}
      isDisabled={disabled ?? isDisabled}
      isReadOnly={readOnly || isReadOnly}
      isRequired={required ?? isRequired}
      {...props}
    />
  )
}

function CheckboxButton({ children, className, indicator, indicatorClassName, boxClassName, ...props }: CheckboxButtonProps) {
  return (
    <CheckboxButtonPrimitive
      data-slot="checkbox-button"
      className={cn("group/checkbox-button flex cursor-pointer items-start gap-3 text-left", className)}
      {...props}
    >
      {(values) => (
        <>
          <span data-slot="checkbox" className={cn(checkboxBoxClassName, boxClassName)}>
            <SharedElementTransition>
              <SelectionIndicator
                isSelected={values.isSelected || values.isIndeterminate}
                data-slot="checkbox-indicator"
                className={cn("grid place-content-center text-current transition-none [&>svg]:size-3.5", indicatorClassName)}
              >
                {indicator ??
                  (values.isIndeterminate ? (
                    <MinusIcon aria-hidden="true" data-slot="check-indicator" />
                  ) : (
                    <CheckIcon aria-hidden="true" data-slot="check-indicator" />
                  ))}
              </SelectionIndicator>
            </SharedElementTransition>
          </span>
          {typeof children === "function" ? children(values) : children}
        </>
      )}
    </CheckboxButtonPrimitive>
  )
}

export { Checkbox, CheckboxButton, CheckboxField }

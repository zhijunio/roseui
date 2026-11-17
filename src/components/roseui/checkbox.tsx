"use client";

import * as React from "react";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check as CheckIcon, Minus as MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type CheckedState = boolean | "indeterminate";
type CheckboxGroupContextValue = {
  values: string[];
  disabled: boolean;
  name?: string;
  change: (value: string, checked: boolean) => void;
};
type CheckboxFieldContextValue = {
  checked: CheckedState;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  invalid: boolean;
  name?: string;
  value?: string;
  setChecked: (checked: CheckedState) => void;
};
const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | null>(null);
const CheckboxFieldContext = React.createContext<CheckboxFieldContextValue | null>(null);

type CheckboxGroupProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (values: string[]) => void;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  invalid?: boolean;
};

function CheckboxGroup({
  className,
  value,
  defaultValue = [],
  onValueChange,
  disabled,
  name,
  required,
  invalid,
  ...props
}: CheckboxGroupProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const values = value ?? internal;
  const isGroupDisabled = disabled ?? false;
  const context = React.useMemo<CheckboxGroupContextValue>(
    () => ({
      values,
      disabled: isGroupDisabled,
      name,
      change: (itemValue, checked) => {
        const next = checked ? [...new Set([...values, itemValue])] : values.filter((item) => item !== itemValue);
        if (value === undefined) setInternal(next);
        onValueChange?.(next);
      },
    }),
    [isGroupDisabled, name, onValueChange, value, values],
  );
  return (
    <CheckboxGroupContext.Provider value={context}>
      <div
        role="group"
        data-slot="control"
        data-disabled={isGroupDisabled || undefined}
        data-required={required || undefined}
        data-invalid={invalid || undefined}
        className={cn(
          "grid min-w-0 gap-3 has-[[slot=description]]:gap-5",
          "**:data-[slot=control-label]:font-medium **:[[slot=description]]:block",
          className,
        )}
        {...props}
      />
    </CheckboxGroupContext.Provider>
  );
}

type CheckboxProps = Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  "checked" | "defaultChecked" | "onCheckedChange"
> & {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  onCheckedChange?: (checked: CheckedState) => void;
  readOnly?: boolean;
  indicator?: React.ReactNode;
};

const checkboxClassName =
  "touch-target peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input bg-transparent text-transparent transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground dark:bg-input/30 forced-colors:border-[ButtonText] forced-colors:data-[state=checked]:border-[Highlight] forced-colors:data-[state=checked]:bg-[Highlight] forced-colors:data-[state=checked]:text-[HighlightText]";

function Checkbox({
  className,
  children,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  readOnly,
  required,
  indicator,
  ...props
}: CheckboxProps) {
  const field = React.useContext(CheckboxFieldContext);
  const group = React.useContext(CheckboxGroupContext);
  const [internal, setInternal] = React.useState<CheckedState>(defaultChecked ?? false);
  const groupChecked = field?.value && group ? group.values.includes(field.value) : undefined;
  const contextChecked = groupChecked ?? field?.checked;
  const current = checked ?? contextChecked ?? internal;
  const isReadOnlyValue = readOnly ?? field?.readOnly ?? false;
  const isDisabledValue = disabled ?? field?.disabled ?? group?.disabled ?? false;
  const isRequiredValue = required ?? field?.required ?? false;
  const nextChecked = (next: CheckedState) => {
    if (isReadOnlyValue) return;
    if (checked === undefined && contextChecked === undefined && !field && !group) setInternal(next);
    field?.setChecked(next);
    if (group && field?.value) group.change(field.value, next === true);
    onCheckedChange?.(next);
  };
  return (
    <CheckboxPrimitive.Root
      {...props}
      data-slot="checkbox"
      checked={current}
      disabled={isDisabledValue}
      required={isRequiredValue}
      name={props.name ?? field?.name ?? group?.name}
      value={props.value ?? field?.value}
      onCheckedChange={nextChecked}
      aria-readonly={isReadOnlyValue || undefined}
      aria-invalid={props["aria-invalid"] ?? field?.invalid ?? undefined}
      className={cn(checkboxClassName, className)}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current [&>svg]:size-3.5"
      >
        {indicator ??
          (current === "indeterminate" ? (
            <MinusIcon aria-hidden="true" data-slot="check-indicator" />
          ) : (
            <CheckIcon aria-hidden="true" data-slot="check-indicator" />
          ))}
      </CheckboxPrimitive.Indicator>
      {children}
    </CheckboxPrimitive.Root>
  );
}

type CheckboxFieldProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  onCheckedChange?: (checked: CheckedState) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  name?: string;
  value?: string;
  slot?: string;
};

function CheckboxField({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  readOnly,
  required,
  invalid,
  name,
  value,
  className,
  children,
  ...props
}: CheckboxFieldProps) {
  const group = React.useContext(CheckboxGroupContext);
  const groupChecked = value && group ? group.values.includes(value) : undefined;
  const controlled = checked ?? groupChecked;
  const [internal, setInternal] = React.useState<CheckedState>(defaultChecked ?? false);
  const current = controlled ?? internal;
  const setChecked = (next: CheckedState) => {
    if (controlled === undefined && !group) setInternal(next);
    onCheckedChange?.(next);
  };
  const context = React.useMemo<CheckboxFieldContextValue>(
    () => ({
      checked: current,
      disabled: disabled ?? group?.disabled ?? false,
      readOnly: readOnly ?? false,
      required: required ?? false,
      invalid: invalid ?? false,
      name,
      value,
      setChecked,
    }),
    [current, disabled, group?.disabled, invalid, readOnly, required, name, value],
  );
  return (
    <CheckboxFieldContext.Provider value={context}>
      <div
        data-slot="checkbox-field"
        data-invalid={invalid || undefined}
        className={cn("contents", className)}
        {...props}
      >
        {children}
      </div>
    </CheckboxFieldContext.Provider>
  );
}

type CheckboxButtonProps = Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "children"> & {
  children?: React.ReactNode;
  indicator?: React.ReactNode;
  indicatorClassName?: string;
  boxClassName?: string;
};

function CheckboxButton({
  children,
  className,
  indicator,
  indicatorClassName,
  boxClassName,
  ...props
}: CheckboxButtonProps) {
  const field = React.useContext(CheckboxFieldContext);
  return (
    <label
      data-slot="checkbox-button"
      data-selected={field?.checked === true || undefined}
      data-disabled={field?.disabled || undefined}
      className={cn(
        "group/checkbox-button flex cursor-pointer items-start gap-3 text-left",
        field?.disabled && "cursor-not-allowed opacity-60",
        className,
      )}
      {...props}
    >
      <Checkbox
        className={cn("mt-0.5", boxClassName)}
        indicator={indicator}
        disabled={field?.disabled}
        checked={field?.checked}
        onCheckedChange={field?.setChecked}
      />
      <span className={indicatorClassName}>{children}</span>
    </label>
  );
}

export { Checkbox, CheckboxButton, CheckboxField, CheckboxGroup };

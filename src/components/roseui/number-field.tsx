"use client";

import * as React from "react";

import { Minus as IconMinus, Plus as IconPlus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type NumberFieldContextValue = {
  value: number | undefined;
  setValue: (value: number | undefined) => void;
  min: number | undefined;
  max: number | undefined;
  step: number;
  disabled: boolean;
  readOnly: boolean;
};
const NumberFieldContext = React.createContext<NumberFieldContextValue | null>(null);

export interface NumberFieldProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  value?: number;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  locale?: string;
  onChange?: (value: number) => void;
  onValueChange?: (value: number) => void;
}

export function NumberField({
  className,
  children,
  value,
  defaultValue,
  minValue,
  maxValue,
  min,
  max,
  step = 1,
  disabled,
  readOnly,
  onChange,
  onValueChange,
  ...props
}: NumberFieldProps) {
  const [internalValue, setInternalValue] = React.useState<number | undefined>(defaultValue);
  const currentValue = value ?? internalValue;
  const setValue = (next: number | undefined) => {
    if (value === undefined) setInternalValue(next);
    if (next !== undefined) {
      onChange?.(next);
      onValueChange?.(next);
    }
  };
  const context = {
    value: currentValue,
    setValue,
    min: minValue ?? min,
    max: maxValue ?? max,
    step,
    disabled: disabled ?? false,
    readOnly: readOnly ?? false,
  };
  return (
    <NumberFieldContext.Provider value={context}>
      <div data-slot="control" className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </NumberFieldContext.Provider>
  );
}

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "value" | "defaultValue" | "onChange"> {
  className?: string;
  size?: "sm" | "default" | "lg";
  layout?: "inline" | "right";
}

export function NumberInput({ className, size = "default", layout = "inline", ...props }: NumberInputProps) {
  const context = React.useContext(NumberFieldContext);
  return (
    <div
      className={cn(
        "flex h-9 w-fit min-w-0 items-center overflow-hidden rounded-lg border border-input bg-background focus-within:border-ring/70 focus-within:ring-2 focus-within:ring-ring/20 disabled:opacity-50",
        size === "sm" && "h-7",
        size === "lg" && "h-11",
        layout === "right" && "[&>[data-step=increment]]:order-2 [&>[data-step=controls]]:order-3",
        className,
      )}
    >
      {layout === "inline" && <StepperButton slot="decrement" size={size} />}
      <Input
        {...props}
        type="number"
        min={props.min ?? context?.min}
        max={props.max ?? context?.max}
        step={props.step ?? context?.step}
        disabled={props.disabled ?? context?.disabled}
        readOnly={props.readOnly ?? context?.readOnly}
        value={context?.value ?? ""}
        onChange={(event) => {
          const raw = event.currentTarget.value;
          context?.setValue(raw === "" ? undefined : Number(raw));
        }}
        className={cn(
          "h-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-2 text-center tabular-nums shadow-none focus:ring-0",
          size === "sm" ? "w-12 text-xs" : size === "lg" ? "w-24" : "w-16",
        )}
      />
      {layout === "inline" ? (
        <StepperButton slot="increment" size={size} />
      ) : (
        <span data-step="controls" className="flex h-full shrink-0 flex-col border-l">
          <StepperButton slot="increment" size="sm" className="h-1/2 w-7" />
          <StepperButton slot="decrement" size="sm" className="h-1/2 w-7 border-t" />
        </span>
      )}
    </div>
  );
}

export interface StepperButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "slot"> {
  slot: "increment" | "decrement";
  size?: "sm" | "default" | "lg";
}

export function StepperButton({ slot, size = "default", className, onClick, disabled, ...props }: StepperButtonProps) {
  const context = React.useContext(NumberFieldContext);
  const Icon = slot === "increment" ? IconPlus : IconMinus;
  const current = context?.value ?? 0;
  const next = current + (slot === "increment" ? 1 : -1) * (context?.step ?? 1);
  const isAtLimit =
    slot === "increment"
      ? context?.max !== undefined && current >= context.max
      : context?.min !== undefined && current <= context.min;
  return (
    <button
      {...props}
      type="button"
      data-step={slot}
      aria-label={slot === "increment" ? "Increase value" : "Decrease value"}
      disabled={disabled ?? context?.disabled ?? context?.readOnly ?? isAtLimit}
      className={cn(
        "grid shrink-0 place-content-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50",
        size === "lg" ? "size-10" : size === "sm" ? "size-7" : "size-8",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context?.setValue(next);
      }}
    >
      <Icon aria-hidden="true" className="size-4" />
    </button>
  );
}

"use client";

import type { ComponentProps } from "react";
import {
  Button as AriaButton,
  Group,
  NumberField as NumberFieldPrimitive,
  type NumberFieldProps as AriaNumberFieldProps,
} from "react-aria-components/NumberField";
import type { InputProps as AriaInputProps } from "react-aria-components/Input";
import { I18nProvider } from "react-aria-components/I18nProvider";

import { Minus as IconMinus, Plus as IconPlus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface NumberFieldProps extends AriaNumberFieldProps {
  ref?: React.Ref<HTMLDivElement>;
  /** Compatibility props retained from the RoseUI number field. */
  min?: number;
  max?: number;
  disabled?: boolean;
  readOnly?: boolean;
  locale?: string;
  onValueChange?: (value: number) => void;
}

export function NumberField({
  className,
  min,
  minValue,
  max,
  maxValue,
  disabled,
  isDisabled,
  readOnly,
  isReadOnly,
  locale,
  onChange,
  onValueChange,
  ...props
}: NumberFieldProps) {
  const numberField = (
    <NumberFieldPrimitive
      data-slot="control"
      className={cn("w-full", className)}
      minValue={minValue ?? min}
      maxValue={maxValue ?? max}
      isDisabled={isDisabled ?? disabled}
      isReadOnly={isReadOnly ?? readOnly}
      onChange={(value) => {
        onChange?.(value);
        onValueChange?.(value);
      }}
      {...props}
    />
  );

  return locale ? <I18nProvider locale={locale}>{numberField}</I18nProvider> : numberField;
}

export interface NumberInputProps extends Omit<AriaInputProps, "className" | "size"> {
  className?: string;
  size?: "sm" | "default" | "lg";
  layout?: "inline" | "right";
}

export function NumberInput({ className, size = "default", layout = "inline", ...props }: NumberInputProps) {
  return (
    <Group
      className={cn(
        "flex h-9 w-fit min-w-0 items-center overflow-hidden rounded-lg border border-input bg-background",
        "focus-within:border-ring/70 focus-within:ring-2 focus-within:ring-ring/20",
        "in-disabled:cursor-not-allowed in-disabled:opacity-50",
        size === "sm" && "h-7",
        size === "lg" && "h-11",
        layout === "right" && "[&>[slot=increment]]:order-2 [&>[slot=decrement]]:order-3",
        className,
      )}
    >
      {layout === "inline" && <StepperButton slot="decrement" size={size} />}
      <Input
        {...props}
        type="number"
        className={cn(
          "h-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-2 text-center tabular-nums shadow-none focus:ring-0",
          size === "sm" ? "w-12 text-xs" : size === "lg" ? "w-24" : "w-16",
        )}
      />
      {layout === "inline" ? (
        <StepperButton slot="increment" size={size} />
      ) : (
        <span className="flex h-full shrink-0 flex-col border-l">
          <StepperButton slot="increment" size="sm" className="h-1/2 w-7" />
          <StepperButton slot="decrement" size="sm" className="h-1/2 w-7 border-t" />
        </span>
      )}
    </Group>
  );
}

export interface StepperButtonProps extends Omit<ComponentProps<typeof AriaButton>, "children" | "slot"> {
  slot: "increment" | "decrement";
  size?: "sm" | "default" | "lg";
}

export function StepperButton({ slot, size = "default", className, ...props }: StepperButtonProps) {
  const Icon = slot === "increment" ? IconPlus : IconMinus;
  return (
    <AriaButton
      slot={slot}
      aria-label={slot === "increment" ? "Increase value" : "Decrease value"}
      className={cn(
        "grid shrink-0 place-content-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50",
        size === "lg" ? "size-10" : size === "sm" ? "size-7" : "size-8",
        className,
      )}
      {...props}
    >
      <Icon aria-hidden="true" className="size-4" />
    </AriaButton>
  );
}

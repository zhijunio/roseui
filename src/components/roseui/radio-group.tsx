"use client";

import * as React from "react";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root> & {
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
};
type RadioGroupItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  indicator?: React.ReactNode;
  disabled?: boolean;
};
type RadioFieldContextValue = { value: string; disabled: boolean };
const RadioFieldContext = React.createContext<RadioFieldContextValue | null>(null);

const radioBoxClassName =
  "touch-target relative flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border border-input bg-transparent transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 forced-colors:border-[ButtonText] forced-colors:data-[state=checked]:border-[Highlight] forced-colors:data-[state=checked]:bg-[Highlight]";

function RadioGroup({ className, disabled, invalid, required, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      data-invalid={invalid || undefined}
      className={cn("grid w-full gap-2", className)}
      disabled={disabled}
      required={required}
      {...props}
    />
  );
}

function RadioGroupItem({ className, disabled, indicator, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(radioBoxClassName, className)}
      disabled={disabled}
      {...props}
    >
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator">
        {indicator ?? <Circle className="size-2.5 fill-current" />}
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

type RadioFieldProps = Omit<React.ComponentProps<"div">, "value"> & {
  value: string;
  disabled?: boolean;
};
function RadioField({ value, disabled, className, children, ...props }: RadioFieldProps) {
  const context = React.useMemo(() => ({ value, disabled: disabled ?? false }), [disabled, value]);
  return (
    <RadioFieldContext.Provider value={context}>
      <div data-slot="radio-field" className={cn("contents", className)} {...props}>
        {children}
      </div>
    </RadioFieldContext.Provider>
  );
}

type RadioButtonProps = Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "children"> & {
  children?: React.ReactNode;
  indicator?: React.ReactNode;
  indicatorClassName?: string;
  boxClassName?: string;
};
function RadioButton({ children, className, boxClassName, indicator, indicatorClassName, ...props }: RadioButtonProps) {
  const field = React.useContext(RadioFieldContext);
  return (
    <label
      data-slot="radio-button"
      data-disabled={field?.disabled || undefined}
      className={cn(
        "group/radio-button flex cursor-pointer items-start gap-3 text-left",
        field?.disabled && "cursor-not-allowed opacity-60",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Item
        value={field?.value ?? ""}
        disabled={field?.disabled}
        data-slot="radio-group-item"
        className={cn(radioBoxClassName, boxClassName)}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className={cn("flex size-4 items-center justify-center", indicatorClassName)}
        >
          {indicator ?? <Circle className="size-2.5 fill-current" />}
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {children}
    </label>
  );
}

export { RadioButton, RadioField, RadioGroup, RadioGroupItem };

"use client";

import { useId, type ComponentProps, type ReactNode } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useControlledState } from "@/hooks/use-controlled-state";
import { cn } from "@/lib/utils";

export type CheckboxGroupOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  indicator?: ReactNode;
};

type CheckboxGroupProps = Omit<ComponentProps<"fieldset">, "children" | "defaultValue" | "name" | "onChange"> & {
  label: ReactNode;
  description?: ReactNode;
  options: readonly CheckboxGroupOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  errorMessage?: ReactNode;
  orientation?: "vertical" | "horizontal";
  itemVariant?: "default" | "card";
  itemClassName?: string;
};

export function CheckboxGroup({
  label,
  description,
  options,
  value,
  defaultValue,
  onValueChange,
  name,
  disabled = false,
  readOnly = false,
  required = false,
  invalid = false,
  errorMessage,
  orientation = "vertical",
  itemVariant = "default",
  itemClassName,
  className,
  ...props
}: CheckboxGroupProps) {
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const [selectedValues, setSelectedValues] = useControlledState({
    value,
    defaultValue: defaultValue ?? [],
    onChange: onValueChange,
  });
  const enabledValues = new Set(options.filter((option) => !disabled && !option.disabled).map((option) => option.value));
  const requiredValue = required
    ? selectedValues.find((selectedValue) => enabledValues.has(selectedValue)) ?? options.find((option) => enabledValues.has(option.value))?.value
    : undefined;

  function toggleValue(optionValue: string) {
    setSelectedValues(
      selectedValues.includes(optionValue)
        ? selectedValues.filter((selectedValue) => selectedValue !== optionValue)
        : [...selectedValues, optionValue],
    );
  }

  return (
    <fieldset
      {...props}
      disabled={disabled}
      aria-required={required || undefined}
      aria-invalid={invalid || undefined}
      aria-describedby={[descriptionId, errorId].filter(Boolean).join(" ") || undefined}
      className={cn("grid min-w-0 gap-3", className)}
    >
      <legend className="text-sm font-medium">{label}</legend>
      {description && <p id={descriptionId} className="text-xs text-muted-foreground">{description}</p>}
      <div className={cn("grid gap-3", orientation === "horizontal" && "grid-cols-1 sm:grid-cols-2")}>
        {options.map((option, index) => {
          const optionId = `${id}-option-${index}`;
          const optionDescriptionId = option.description ? `${optionId}-description` : undefined;

          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer items-start gap-3 text-sm has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50",
                itemVariant === "card" && "rounded-xl border border-border p-4 transition-colors motion-reduce:!transition-none has-[[data-state=checked]]:bg-primary/[0.04]",
                itemClassName,
              )}
            >
              <Checkbox
                checked={selectedValues.includes(option.value)}
                onCheckedChange={() => toggleValue(option.value)}
                disabled={disabled || option.disabled}
                readOnly={readOnly}
                required={requiredValue === option.value}
                name={name}
                value={option.value}
                aria-labelledby={`${optionId}-label`}
                aria-describedby={[descriptionId, optionDescriptionId, errorId].filter(Boolean).join(" ") || undefined}
                aria-invalid={invalid || undefined}
                className="mt-0.5"
                indicator={option.indicator}
              />
              <span className="grid min-w-0 gap-1">
                <span id={`${optionId}-label`} className="font-medium leading-5">{option.label}</span>
                {option.description && (
                  <span id={optionDescriptionId} className="text-xs leading-5 text-muted-foreground">
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
      {errorMessage && <p id={errorId} role="alert" className="text-xs text-destructive">{errorMessage}</p>}
    </fieldset>
  );
}

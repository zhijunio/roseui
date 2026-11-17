"use client";

import * as React from "react";

import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

type CheckedProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
};

type SwitchFieldContextValue = CheckedProps & {
  id: string;
  checked: boolean;
  setChecked: (value: boolean) => void;
  name?: string;
  value?: string;
  invalid?: boolean;
};
const SwitchFieldContext = React.createContext<SwitchFieldContextValue | null>(null);

type SwitchProps = Omit<
  React.ComponentProps<typeof SwitchPrimitive.Root>,
  "checked" | "defaultChecked" | "onCheckedChange"
> &
  CheckedProps & {
    size?: "sm" | "default" | "lg";
    thumbIcon?: React.ReactNode;
  };

const switchTrackClassName =
  "touch-target peer relative inline-flex shrink-0 items-center rounded-full border border-transparent bg-input motion-safe:transition-colors outline-none data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] data-[size=lg]:h-6 data-[size=lg]:w-11 focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=checked]:bg-primary disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/80 forced-colors:border-[ButtonText] forced-colors:data-[state=checked]:bg-[Highlight]";
const thumbClassName =
  "pointer-events-none block rounded-full bg-background text-foreground shadow-lg ring-0 transition-transform data-[size=default]:size-4 data-[size=sm]:size-3 data-[size=lg]:size-5 data-[state=checked]:translate-x-[calc(100%-2px)] data-[size=lg]:data-[state=checked]:translate-x-[calc(100%+4px)] dark:data-[state=checked]:bg-primary-foreground forced-colors:bg-[Canvas]";

function Switch({
  className,
  size = "default",
  thumbIcon,
  checked,
  defaultChecked,
  disabled,
  onCheckedChange,
  readOnly,
  required,
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      {...props}
      data-slot="switch"
      data-size={size}
      checked={checked}
      defaultChecked={checked === undefined ? defaultChecked : undefined}
      disabled={disabled}
      required={required}
      aria-readonly={readOnly || undefined}
      onCheckedChange={onCheckedChange}
      className={cn(
        "touch-target peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent motion-safe:transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] data-[size=lg]:h-6 data-[size=lg]:w-11 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80 disabled:cursor-not-allowed disabled:opacity-50 forced-colors:border-[ButtonText] forced-colors:data-[state=checked]:bg-[Highlight]",
        className,
      )}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" data-size={size} className={cn(thumbClassName)}>
        {thumbIcon && (
          <span aria-hidden="true" className="grid place-items-center">
            {thumbIcon}
          </span>
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

type SwitchFieldProps = Omit<React.ComponentProps<"div">, "onChange"> &
  CheckedProps & { id?: string; name?: string; value?: string; invalid?: boolean };

function SwitchField({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  readOnly,
  required,
  id,
  name,
  value,
  invalid,
  className,
  children,
  ...props
}: SwitchFieldProps) {
  const generatedId = React.useId();
  const controlId = id ?? generatedId;
  const controlled = checked;
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const current = controlled ?? internal;
  const setChecked = (next: boolean) => {
    if (controlled === undefined) setInternal(next);
    onCheckedChange?.(next);
  };
  const context = React.useMemo<SwitchFieldContextValue>(
    () => ({
      checked: current,
      id: controlId,
      disabled: disabled,
      readOnly: readOnly,
      required: required,
      name,
      value,
      invalid,
      setChecked,
    }),
    [current, controlId, disabled, invalid, readOnly, required, name, value],
  );
  return (
    <SwitchFieldContext.Provider value={context}>
      <div
        data-slot="switch-field"
        data-invalid={invalid || undefined}
        className={cn("contents", className)}
        {...props}
      >
        {children}
      </div>
    </SwitchFieldContext.Provider>
  );
}

type SwitchButtonProps = Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "children"> & {
  children?: React.ReactNode;
  size?: "sm" | "default" | "lg";
  thumbIcon?: React.ReactNode;
  trackClassName?: string;
};

function SwitchButton({
  children,
  className,
  size = "default",
  thumbIcon,
  trackClassName,
  ...props
}: SwitchButtonProps) {
  const field = React.useContext(SwitchFieldContext);
  return (
    <label
      data-slot="switch-button"
      data-selected={field?.checked || undefined}
      data-disabled={field?.disabled || undefined}
      className={cn(
        "group/switch-button flex cursor-pointer items-center gap-3 text-left",
        field?.disabled && "cursor-not-allowed opacity-60",
        className,
      )}
      {...props}
    >
      {children}
      <Switch
        id={field?.id}
        size={size}
        checked={field?.checked}
        defaultChecked={field ? undefined : undefined}
        disabled={field?.disabled}
        required={field?.required}
        name={field?.name}
        value={field?.value}
        aria-invalid={field?.invalid || undefined}
        readOnly={field?.readOnly}
        onCheckedChange={field?.setChecked}
        thumbIcon={thumbIcon}
        className={cn(switchTrackClassName, trackClassName)}
      />
    </label>
  );
}

export { Switch, SwitchButton, SwitchField };

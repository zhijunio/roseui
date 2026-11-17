"use client";

import * as React from "react";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "@/lib/utils";

type GroupContextValue = { variant: "default" | "outline"; size: "sm" | "default" | "lg"; connected: boolean };
const ToggleGroupContext = React.createContext<GroupContextValue>({
  variant: "default",
  size: "default",
  connected: true,
});

type ToggleGroupCommonProps = Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive.Root>,
  "type" | "value" | "defaultValue" | "onValueChange"
> & {
  variant?: GroupContextValue["variant"];
  size?: GroupContextValue["size"];
  spacing?: number;
  fullWidth?: boolean;
};

type ToggleGroupProps = ToggleGroupCommonProps &
  (
    | {
        type: "single";
        value?: string;
        defaultValue?: string;
        onValueChange?: (value: string) => void;
      }
    | {
        type: "multiple";
        value?: string[];
        defaultValue?: string[];
        onValueChange?: (value: string[]) => void;
      }
  );

function ToggleGroup({
  className,
  variant = "default",
  size = "default",
  spacing = 0,
  orientation = "horizontal",
  fullWidth = false,
  type,
  value,
  defaultValue,
  onValueChange,
  disabled,
  style,
  ...props
}: ToggleGroupProps) {
  const context = React.useMemo(() => ({ variant, size, connected: spacing === 0 }), [size, spacing, variant]);
  const commonClass = cn(
    "group/toggle-group flex w-fit items-center gap-[var(--toggle-group-gap)] data-[orientation=vertical]:flex-col",
    fullWidth &&
      "w-full [&>[data-slot=toggle-group-item]]:flex-1 data-[orientation=vertical]:[&>[data-slot=toggle-group-item]]:w-full data-[orientation=vertical]:[&>[data-slot=toggle-group-item]]:flex-none",
    className,
  );
  const commonStyle = { "--toggle-group-gap": `${spacing * 0.25}rem`, ...style } as React.CSSProperties;
  const commonProps = {
    disabled,
    orientation,
    "data-slot": "toggle-group" as const,
    "data-variant": variant,
    "data-size": size,
    "data-spacing": spacing,
    "data-full-width": fullWidth || undefined,
    style: commonStyle,
    className: commonClass,
    ...props,
  };

  return (
    <ToggleGroupContext.Provider value={context}>
      {type === "multiple" ? (
        <ToggleGroupPrimitive.Root
          type="multiple"
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          {...commonProps}
        />
      ) : (
        <ToggleGroupPrimitive.Root
          type="single"
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          {...commonProps}
        />
      )}
    </ToggleGroupContext.Provider>
  );
}

type ToggleGroupItemProps = React.ComponentProps<typeof ToggleGroupPrimitive.Item> & {
  variant?: GroupContextValue["variant"];
  size?: GroupContextValue["size"];
};

function ToggleGroupItem({ className, value, variant, size, ...props }: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext);
  const currentVariant = variant ?? context.variant;
  const currentSize = size ?? context.size;
  const sizeClasses = { sm: "h-8 px-2 text-xs", default: "h-9 px-2.5 text-sm", lg: "h-11 px-3 text-sm" };
  return (
    <ToggleGroupPrimitive.Item
      value={value}
      data-slot="toggle-group-item"
      data-variant={currentVariant}
      data-size={currentSize}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md font-medium transition-colors outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary/10 data-[state=on]:text-primary [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        sizeClasses[currentSize],
        currentVariant === "outline" && "border border-input bg-background hover:bg-muted/70",
        currentVariant === "default" && "hover:bg-muted",
        context.connected &&
          "rounded-none first:rounded-s-md last:rounded-e-md group-data-[orientation=horizontal]/toggle-group:[&+*]:-ms-px group-data-[orientation=vertical]/toggle-group:[&+*]:-mt-px group-data-[orientation=vertical]/toggle-group:first:rounded-t-md group-data-[orientation=vertical]/toggle-group:first:rounded-s-none group-data-[orientation=vertical]/toggle-group:last:rounded-b-md group-data-[orientation=vertical]/toggle-group:last:rounded-e-none",
        className,
      )}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };

"use client";

import * as React from "react";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

type ToggleGroupContextValue = VariantProps<typeof toggleVariants> & {
  spacing: number;
  orientation: "horizontal" | "vertical";
};

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
});

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
  }) {
  const groupStyle: React.CSSProperties & { "--toggle-group-gap": string } = {
    "--toggle-group-gap": `${spacing * 0.25}rem`,
  };
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={groupStyle}
      className={cn("group/toggle-group flex w-fit items-center gap-[var(--toggle-group-gap)] data-[orientation=vertical]:flex-col", className)}
      orientation={orientation}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing, orientation }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({ className, children, variant = "default", size = "default", ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);
  const currentVariant = context.variant || variant;
  const currentSize = context.size || size;

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={currentVariant}
      data-size={currentSize}
      data-spacing={context.spacing}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md font-medium transition-colors outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary/10 data-[state=on]:text-primary [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        currentSize === "sm" && "h-8 px-2 text-xs",
        currentSize === "default" && "h-9 px-2.5 text-sm",
        currentSize === "lg" && "h-10 px-3 text-sm",
        currentVariant === "outline" && "border border-input bg-background hover:bg-muted/70",
        currentVariant === "default" && "hover:bg-muted",
        context.spacing === 0 && "rounded-none first:rounded-s-md last:rounded-e-md group-data-[orientation=horizontal]/toggle-group:[&+*]:-ms-px group-data-[orientation=vertical]/toggle-group:[&+*]:-mt-px group-data-[orientation=vertical]/toggle-group:first:rounded-t-md group-data-[orientation=vertical]/toggle-group:first:rounded-s-none group-data-[orientation=vertical]/toggle-group:last:rounded-b-md group-data-[orientation=vertical]/toggle-group:last:rounded-e-none",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };

"use client";

import * as React from "react";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "touch-target group/toggle inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-pressed:bg-accent aria-pressed:text-secondary-foreground forced-colors:border-[ButtonBorder] forced-colors:aria-pressed:bg-[Highlight] forced-colors:aria-pressed:text-[HighlightText] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-muted",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-secondary-foreground",
      },
      size: { sm: "h-8 min-w-8 px-2", default: "h-9 min-w-9 px-2.5", lg: "h-10 min-w-10 px-3" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ToggleVariant = NonNullable<VariantProps<typeof toggleVariants>["variant"]>;
export type ToggleSize = NonNullable<VariantProps<typeof toggleVariants>["size"]>;
export type ToggleProps = Omit<
  React.ComponentProps<typeof TogglePrimitive.Root>,
  "pressed" | "defaultPressed" | "onPressedChange" | "onChange"
> &
  VariantProps<typeof toggleVariants> & {
    isIconOnly?: boolean;
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
  };

export function Toggle({
  className,
  variant = "default",
  size = "default",
  isIconOnly = false,
  disabled,
  pressed,
  defaultPressed,
  onPressedChange,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      data-variant={variant}
      data-size={size}
      data-icon-only={isIconOnly || undefined}
      pressed={pressed}
      defaultPressed={pressed === undefined ? defaultPressed : undefined}
      disabled={disabled}
      onPressedChange={onPressedChange}
      className={cn(
        toggleVariants({ variant, size }),
        isIconOnly && (size === "sm" ? "w-8 px-0" : size === "lg" ? "w-10 px-0" : "w-9 px-0"),
        className,
      )}
      {...props}
    />
  );
}

"use client";

import type { ComponentProps } from "react";

import { Color } from "@/lib/color";
import { cn } from "@/lib/utils";

const sizeClasses = { xs: "size-4", sm: "size-6", md: "size-8", lg: "size-9", xl: "size-10" } as const;

export function ColorSwatch({
  className,
  size = "md",
  shape = "circle",
  color,
  style,
  ...props
}: Omit<ComponentProps<"span">, "color"> & {
  color?: Color | string;
  size?: keyof typeof sizeClasses;
  shape?: "circle" | "square";
}) {
  const backgroundColor = color instanceof Color ? color.toString() : color;
  return (
    <span
      data-slot="color-swatch"
      data-shape={shape}
      className={cn(
        "shrink-0 border border-foreground/15 shadow-xs",
        sizeClasses[size],
        shape === "circle" ? "rounded-full" : "rounded-md",
        className,
      )}
      style={{ ...style, backgroundColor }}
      {...props}
    />
  );
}

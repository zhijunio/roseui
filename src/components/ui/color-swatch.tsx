"use client";

import type { ComponentProps } from "react";
import { ColorSwatch as AriaColorSwatch } from "react-aria-components";

import { cn } from "@/lib/utils";

const sizeClasses = {
  xs: "size-4",
  sm: "size-6",
  md: "size-8",
  lg: "size-9",
  xl: "size-10",
} as const;

export function ColorSwatch({ className, size = "md", shape = "circle", ...props }: Omit<ComponentProps<typeof AriaColorSwatch>, "className"> & {
  className?: string;
  size?: keyof typeof sizeClasses;
  shape?: "circle" | "square";
}) {
  return <AriaColorSwatch data-slot="color-swatch" className={cn("shrink-0 border border-foreground/15 shadow-xs", sizeClasses[size], shape === "circle" ? "rounded-full" : "rounded-md", className)} {...props} />;
}

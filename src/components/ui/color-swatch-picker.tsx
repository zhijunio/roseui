"use client";

import type { ComponentProps } from "react";
import { ColorSwatchPicker as AriaColorSwatchPicker, ColorSwatchPickerItem as AriaColorSwatchPickerItem } from "react-aria-components";

import { cn } from "@/lib/utils";

export function ColorSwatchPicker({ className, layout = "grid", ...props }: ComponentProps<typeof AriaColorSwatchPicker>) {
  return <AriaColorSwatchPicker data-slot="color-swatch-picker" layout={layout} className={cn("flex flex-wrap gap-2", layout === "stack" && "flex-col items-start", className)} {...props} />;
}

export function ColorSwatchPickerItem({ className, ...props }: ComponentProps<typeof AriaColorSwatchPickerItem>) {
  return <AriaColorSwatchPickerItem data-slot="color-swatch-picker-item" className={cn("grid size-9 cursor-pointer place-items-center rounded-lg border border-transparent outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring data-[selected]:bg-accent/40", className)} {...props} />;
}

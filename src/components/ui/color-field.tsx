"use client";

import type { ComponentProps } from "react";
import { ColorField as AriaColorField, Input as AriaInput, Label as AriaLabel } from "react-aria-components";

import { cn } from "@/lib/utils";

export function ColorField({ className, ...props }: ComponentProps<typeof AriaColorField>) {
  return <AriaColorField data-slot="color-field" className={cn("grid gap-1.5", className)} {...props} />;
}

export function ColorFieldLabel({ className, ...props }: ComponentProps<typeof AriaLabel>) {
  return <AriaLabel data-slot="color-field-label" className={cn("text-sm font-medium", className)} {...props} />;
}

export function ColorFieldInput({ className, ...props }: ComponentProps<typeof AriaInput>) {
  return <AriaInput data-slot="color-field-input" className={cn("h-9 min-w-0 rounded-lg border border-input bg-background px-3 font-mono text-sm uppercase outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />;
}

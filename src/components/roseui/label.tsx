"use client";

import type * as React from "react";

import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

export const labelStyles = cn(
  "group/label flex items-center gap-2 text-sm leading-none font-medium select-none",
  "group-data-[required=true]/field:after:ml-1 group-data-[required=true]/field:after:text-destructive group-data-[required=true]/field:after:content-['*']",
  "group-data-[disabled=true]/field:opacity-50",
);

export type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & {
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
};

function Label({ className, disabled, required, invalid, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      data-disabled={disabled || undefined}
      data-required={required || undefined}
      data-invalid={invalid || undefined}
      className={cn(labelStyles, disabled && "pointer-events-none opacity-50", className)}
      {...props}
    />
  );
}

export { Label };

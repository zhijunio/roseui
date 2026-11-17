"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import type * as React from "react";

import { cn } from "@/lib/utils";

const labelStyles = cn(
  "group/label flex items-center gap-2 text-sm leading-none font-medium select-none",
  "group-data-[required=true]/field:after:ml-1 group-data-[required=true]/field:after:text-destructive group-data-[required=true]/field:after:content-['*']",
  "group-data-[disabled=true]/field:opacity-50",
);

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(labelStyles, className)}
      {...props}
    />
  );
}

export { Label };

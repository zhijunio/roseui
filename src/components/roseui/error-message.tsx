"use client";

import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function ErrorMessage({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      {...props}
      role="alert"
      data-slot="error-message"
      className={cn("text-sm font-medium text-destructive", className)}
    />
  );
}

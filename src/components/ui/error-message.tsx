"use client"

import { Text as AriaText, type TextProps } from "react-aria-components"

import { cn } from "@/lib/utils"

export function ErrorMessage({ className, ...props }: TextProps) {
  return (
    <AriaText
      {...props}
      slot="errorMessage"
      data-slot="error-message"
      className={cn("text-sm font-medium text-destructive", className)}
    />
  )
}

"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Label({
  className,
  children,
  isRequired = false,
  isDisabled = false,
  isInvalid = false,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & {
  isRequired?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
}) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      data-required={isRequired || undefined}
      data-disabled={isDisabled || undefined}
      data-invalid={isInvalid || undefined}
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        isDisabled && "pointer-events-none opacity-50",
        isInvalid && "text-destructive",
        className
      )}
      {...props}
    >
      {children}
      {isRequired && <span aria-hidden="true" className="text-destructive">*</span>}
    </LabelPrimitive.Root>
  )
}

export { Label }

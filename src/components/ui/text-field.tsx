"use client";

import { TextField as TextFieldPrimitive, type TextFieldProps } from "react-aria-components/TextField";

import { cn } from "@/lib/utils";

export function TextField({ className, ...props }: TextFieldProps) {
  return (
    <TextFieldPrimitive
      data-slot="control"
      className={cn(
        "flex w-full flex-col gap-1.5",
        "disabled:opacity-50 in-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

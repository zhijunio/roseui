"use client";

import {
  Input as InputPrimitive,
  type InputProps as InputPrimitiveProps,
} from "react-aria-components/Input";

import { cn } from "@/lib/utils";

export interface InputProps extends InputPrimitiveProps {
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({ className, ref, ...props }: InputProps) {
  return (
    <span data-slot="control" className="relative block w-full">
      <InputPrimitive
        {...props}
        ref={ref}
        className={cn(
          "relative block w-full appearance-none rounded-lg bg-(--control-bg,transparent)",
          "ps-[calc(--spacing(3.5)-1px)] pe-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] text-base/6 text-foreground placeholder:text-muted-foreground sm:py-[calc(--spacing(1.5)-1px)] sm:text-sm/6",
          "border border-input enabled:hover:border-muted-foreground/30 outline-hidden focus:border-ring/70 focus:ring-3 focus:ring-ring/20 focus:enabled:hover:border-ring/80",
          "invalid:border-danger-subtle-foreground/70 focus:invalid:border-danger-subtle-foreground/70 focus:invalid:ring-danger-subtle-foreground/20 disabled:bg-muted forced-colors:in-disabled:text-[GrayText]",
          "[&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:hidden dark:scheme-dark",
          className,
        )}
      />
    </span>
  );
}

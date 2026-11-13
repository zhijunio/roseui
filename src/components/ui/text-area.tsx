"use client";

import {
  TextArea as TextAreaPrimitive,
  type TextAreaProps as TextAreaPrimitiveProps,
} from "react-aria-components/TextArea";

import { cn } from "@/lib/utils";

export interface TextAreaProps extends TextAreaPrimitiveProps {
  ref?: React.Ref<HTMLTextAreaElement>;
  size?: "default" | "sm";
  autoResize?: boolean;
  maxRows?: number;
}

export function TextArea({ className, size = "default", autoResize = true, maxRows, style, ref, ...props }: TextAreaProps) {
  return (
    <span data-slot="control" className="relative block w-full">
      <TextAreaPrimitive
        {...props}
        ref={ref}
        data-size={size}
        className={cn(
          "relative block min-h-16 w-full appearance-none rounded-lg bg-(--control-bg,transparent)",
          "ps-[calc(--spacing(3.5)-1px)] pe-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] text-base/6 text-foreground placeholder:text-muted-foreground sm:py-[calc(--spacing(1.5)-1px)] sm:text-sm/6",
          "border border-input enabled:hover:border-muted-foreground/30 outline-hidden focus:border-ring/70 focus:ring-3 focus:ring-ring/20 focus:enabled:hover:border-ring/80",
          "invalid:border-danger-subtle-foreground/70 focus:invalid:border-danger-subtle-foreground/70 focus:invalid:ring-danger-subtle-foreground/20 disabled:bg-muted forced-colors:in-disabled:text-[GrayText]",
          "dark:scheme-dark",
          size === "sm" && "px-2.5",
          autoResize && "field-sizing-content",
          className,
        )}
        style={{
          ...style,
          ...(maxRows ? { maxHeight: `calc(${maxRows} * 1.5rem + 1rem + 2px)` } : {}),
        }}
      />
    </span>
  );
}

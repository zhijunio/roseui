"use client";

import type * as React from "react";

import { cn } from "@/lib/utils";

export function Keyboard({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="keyboard"
      className={cn(
        "hidden font-mono text-[0.80rem] text-current/60 group-hover:text-foreground group-focus:text-foreground group-focus:opacity-90 group-disabled:opacity-50 lg:inline forced-colors:group-focus:text-[HighlightText]",
        className,
      )}
      {...props}
    />
  );
}

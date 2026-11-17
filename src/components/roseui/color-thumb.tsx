"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export const ColorWheelContext = React.createContext<{ hue: number; disabled: boolean } | null>(null);

export function ColorThumb({ className, style, ...props }: React.ComponentProps<"span">) {
  const wheel = React.useContext(ColorWheelContext);
  const angle = (((wheel?.hue ?? 0) - 90) * Math.PI) / 180;
  const radius = 44;
  const position = { left: `${50 + Math.cos(angle) * radius}%`, top: `${50 + Math.sin(angle) * radius}%` };
  return (
    <span
      data-slot="color-thumb"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white [box-shadow:0_0_0_1px_black,inset_0_0_0_1px_black] focus-visible:size-8",
        wheel?.disabled && "opacity-50",
        className,
      )}
      style={{ ...position, ...style }}
      {...props}
    />
  );
}

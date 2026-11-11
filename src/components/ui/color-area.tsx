"use client";

import type { ComponentProps, ReactNode } from "react";
import { ColorArea as AriaColorArea, ColorThumb, type ColorAreaRenderProps } from "react-aria-components";

import { cn } from "@/lib/utils";

export function ColorArea({ className, showDots = false, children, ...props }: Omit<ComponentProps<typeof AriaColorArea>, "className"> & {
  className?: string;
  showDots?: boolean;
}) {
  const dotOverlay = showDots ? <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)", backgroundSize: "12px 12px" }} /> : null;
  const areaChildren = typeof children === "function"
    ? (renderProps: ColorAreaRenderProps & { defaultChildren: ReactNode }) => <>{dotOverlay}{children(renderProps)}</>
    : <>{dotOverlay}{children}</>;

  return (
    <AriaColorArea
      data-slot="color-area"
      data-show-dots={showDots || undefined}
      className={cn("relative isolate block h-48 w-full max-w-sm touch-none overflow-hidden rounded-lg", className)}
      {...props}
    >
      {areaChildren}
    </AriaColorArea>
  );
}

export function ColorAreaThumb({ className, ...props }: ComponentProps<typeof ColorThumb>) {
  return (
    <ColorThumb
      data-slot="color-area-thumb"
      className={cn("size-4 rounded-full border-2 border-white shadow-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled]:opacity-50", className)}
      {...props}
    />
  );
}

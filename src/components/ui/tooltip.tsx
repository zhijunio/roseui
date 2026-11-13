"use client";

import type { ReactNode } from "react";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { OverlayArrow, Tooltip as TooltipPrimitive, type TooltipProps as TooltipPrimitiveProps, TooltipTrigger } from "react-aria-components/Tooltip";
import { cn } from "@/lib/utils";

export { TooltipTrigger };
export type TooltipProps = Omit<TooltipPrimitiveProps, "children"> & {
  children?: ReactNode;
  showArrow?: boolean;
  arrowClassName?: string;
};

export function Tooltip({ className, offset = 0, showArrow = true, arrowClassName, children, ...props }: TooltipProps) {
  return <TooltipPrimitive {...props} offset={offset} data-slot="tooltip-content" className={composeRenderProps(className, (className) => cn(
    "z-50 inline-flex w-fit max-w-xs origin-(--trigger-anchor-point) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background outline-none entering:animate-in entering:fade-in-0 exiting:animate-out exiting:fade-out-0 motion-reduce:animate-none has-data-[slot=kbd]:pr-1.5",
    className,
  ))}>
    {children}
    {showArrow && <OverlayArrow className="group"><svg width="10" height="5" viewBox="0 0 10 5" aria-hidden="true" className={cn("block fill-foreground group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90", arrowClassName)}><path d="M0 0L5 5L10 0" /></svg></OverlayArrow>}
  </TooltipPrimitive>;
}

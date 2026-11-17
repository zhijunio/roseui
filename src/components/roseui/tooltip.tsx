"use client";

import * as React from "react";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

type TooltipTriggerProps = React.ComponentProps<typeof TooltipPrimitive.Root> & {
  skipDelayDuration?: number;
};

function TooltipTrigger({ children, delayDuration = 700, skipDelayDuration, ...props }: TooltipTriggerProps) {
  const childNodes = React.Children.toArray(children);
  const trigger = childNodes[0];
  const tooltip = childNodes[1];
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
      <TooltipPrimitive.Root {...props} delayDuration={delayDuration}>
        <TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>
        {tooltip}
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export type TooltipProps = Omit<React.ComponentProps<typeof TooltipPrimitive.Content>, "children"> & {
  children?: React.ReactNode;
  showArrow?: boolean;
  arrowClassName?: string;
};

export function Tooltip({
  className,
  sideOffset = 0,
  showArrow = true,
  arrowClassName,
  children,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        {...props}
        sideOffset={sideOffset}
        data-slot="tooltip-content"
        className={cn(
          "z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background outline-none data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:animate-none has-data-[slot=kbd]:pr-1.5",
          className,
        )}
      >
        {children}
        {showArrow && <TooltipPrimitive.Arrow className={cn("fill-foreground", arrowClassName)} />}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { TooltipTrigger };

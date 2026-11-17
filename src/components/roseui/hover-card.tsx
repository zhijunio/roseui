"use client";

import * as React from "react";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

function HoverCard({
  openDelay = 250,
  closeDelay = 150,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay} {...props} />;
}

function HoverCardTrigger({ className, ...props }: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" className={className} {...props} />;
}

type HoverCardContentProps = React.ComponentProps<typeof HoverCardPrimitive.Content> & { showArrow?: boolean };
function HoverCardContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "center",
  children,
  showArrow = false,
  ...props
}: HoverCardContentProps) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        side={side}
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "z-50 w-64 rounded-[var(--radius)] border border-border bg-popover p-3 text-sm text-popover-foreground shadow-lg outline-none duration-150 ease-out data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:!animate-none motion-reduce:!transition-none",
          className,
        )}
        {...props}
      >
        {children}
        {showArrow && <HoverCardPrimitive.Arrow className="fill-popover" />}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardContent, HoverCardTrigger };

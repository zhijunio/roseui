"use client";

import * as React from "react";

import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

export interface PopoverPanelProps
  extends Omit<React.ComponentProps<typeof PopoverPrimitive.Content>, "className" | "children"> {
  children?: React.ReactNode;
  className?: string;
  arrow?: boolean;
}
export function PopoverPanel({
  children,
  arrow = false,
  className,
  side = "bottom",
  align = "center",
  sideOffset,
  ...props
}: PopoverPanelProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-panel"
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "group/popover min-w-(--radix-popover-trigger-width) max-w-xs origin-(--radix-popover-content-transform-origin) rounded-lg border border-border bg-popover text-popover-foreground shadow-lg outline-hidden data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          className,
        )}
        {...props}
      >
        {arrow && <PopoverPrimitive.Arrow className="fill-popover" />}
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;
function Popover(props: PopoverProps) {
  return <PopoverPrimitive.Root {...props} />;
}
function PopoverClose({ className, ...props }: React.ComponentProps<typeof PopoverPrimitive.Close>) {
  return <PopoverPrimitive.Close data-slot="popover-close" className={className} {...props} />;
}
function PopoverTrigger({ className, ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" className={className} {...props} />;
}
function PopoverAnchor({ className, ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" className={className} {...props} />;
}

type PopoverContentProps = Omit<React.ComponentProps<typeof PopoverPrimitive.Content>, "children" | "className"> & {
  children?: React.ReactNode;
  showArrow?: boolean;
  className?: string;
};

function PopoverContent({
  className,
  align = "center",
  side = "bottom",
  sideOffset = 4,
  collisionPadding = 0,
  showArrow = false,
  children,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          "z-50 flex w-72 flex-col gap-2.5 rounded-[var(--radius)] bg-popover p-2.5 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/10 outline-hidden data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 motion-reduce:!animate-none motion-reduce:!transition-none",
          className,
        )}
        {...props}
      >
        {showArrow && <PopoverPrimitive.Arrow className="fill-popover" />}
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="popover-header" className={cn("flex flex-col gap-0.5 text-sm", className)} {...props} />;
}
function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 data-slot="popover-title" className={cn("font-medium", className)} {...props} />;
}
function PopoverDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="popover-description" className={cn("text-muted-foreground", className)} {...props} />;
}

export {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
};

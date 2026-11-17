"use client";

import * as React from "react";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check as CheckIcon, ChevronDown as ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SelectProps = Omit<React.ComponentProps<typeof SelectPrimitive.Root>, "onValueChange"> & {
  disabled?: boolean;
  required?: boolean;
  onValueChange?: (value: string) => void;
};

function Select({ disabled, required, ...props }: SelectProps) {
  return <SelectPrimitive.Root disabled={disabled} required={required} {...props} />;
}

function SelectGroup({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" className={cn("scroll-my-1 p-1", className)} {...props} />;
}

function SelectValue({ className, placeholder, ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("line-clamp-1 flex items-center gap-1.5", className)}
      placeholder={placeholder}
      {...props}
    />
  );
}

type SelectTriggerProps = Omit<React.ComponentProps<typeof SelectPrimitive.Trigger>, "children"> & {
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  size?: "sm" | "default";
  variant?: "default" | "inline";
};

function SelectTrigger({
  className,
  size = "default",
  icon = <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />,
  variant = "default",
  disabled,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={variant === "inline" ? "inline" : size}
      data-variant={variant}
      disabled={disabled}
      className={cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors motion-reduce:!transition-none outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 placeholder:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 data-[size=sm]:rounded-[min(var(--radius-md),10px)] dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        variant === "inline" &&
          "h-auto min-w-0 gap-1 rounded-md border-0 bg-transparent px-1 py-0.5 font-medium shadow-none hover:bg-accent/60 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-ring/50 dark:!bg-transparent dark:hover:bg-accent/30",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>{icon}</SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

type SelectContentProps = Omit<React.ComponentProps<typeof SelectPrimitive.Content>, "children"> & {
  align?: "start" | "center" | "end";
  children?: React.ReactNode;
  collisionPadding?: number;
  position?: "item-aligned" | "popper";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
};

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  collisionPadding = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        side={side}
        sideOffset={sideOffset}
        align={align}
        collisionPadding={collisionPadding}
        className={cn(
          "relative z-50 max-h-[min(24rem,calc(100dvh-2rem))] min-w-36 overflow-hidden rounded-[var(--radius)] bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/10 data-[position=popper]:min-w-[var(--radix-select-trigger-width)]",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className="flex h-6 cursor-default items-center justify-center">
          ⌃
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex h-6 cursor-default items-center justify-center">
          ⌄
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

type SelectItemProps = Omit<React.ComponentProps<typeof SelectPrimitive.Item>, "children"> & {
  children?: React.ReactNode;
  indicatorPosition?: "left" | "right";
  disabled?: boolean;
};

function SelectItem({ className, indicatorPosition = "right", children, disabled, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      data-indicator-position={indicatorPosition}
      disabled={disabled}
      className={cn(
        "group/select-item relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-none select-none focus:bg-accent focus:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[indicator-position=left]:pr-2 data-[indicator-position=left]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span
        className={cn(
          "pointer-events-none absolute flex size-4 items-center justify-center",
          indicatorPosition === "left" ? "left-2" : "right-2",
        )}
      >
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue };

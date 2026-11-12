"use client";

import type { ComponentProps, ReactNode } from "react";

import { Toolbar } from "@/components/ui/toolbar";
import { cn } from "@/lib/utils";

type ActionBarProps = Omit<
  ComponentProps<typeof Toolbar>,
  "aria-label" | "aria-labelledby" | "children" | "className" | "isAttached"
> & {
  "aria-label": string;
  children: ReactNode;
  className?: string;
  isAttached?: boolean;
  isOpen: boolean;
};

export function ActionBar({
  children,
  className,
  isAttached = true,
  isOpen,
  orientation = "horizontal",
  ...props
}: ActionBarProps) {
  return (
    <div
      data-slot="action-bar-positioner"
      data-open={isOpen}
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 transition duration-200 motion-reduce:transition-none",
        "data-[open=false]:invisible data-[open=false]:translate-y-4 data-[open=false]:opacity-0",
        className,
      )}
    >
      <Toolbar
        {...props}
        orientation={orientation}
        isAttached={false}
        data-slot="action-bar"
        data-orientation={orientation}
        className={cn(
          "group/action-bar pointer-events-auto max-w-full flex-wrap gap-1.5 border border-border bg-popover px-2 py-1.5 text-popover-foreground shadow-md",
          orientation === "vertical" && "flex-col",
          isAttached ? "rounded-xl" : "rounded-md border-transparent bg-transparent shadow-none",
        )}
      >
        {children}
      </Toolbar>
    </div>
  );
}

export function ActionBarPrefix({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="action-bar-prefix" className={cn("flex shrink-0 items-center gap-2 pr-1", className)} {...props} />
  );
}

export function ActionBarContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="action-bar-content"
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-1 group-data-[orientation=vertical]/action-bar:flex-col group-data-[orientation=vertical]/action-bar:flex-nowrap",
        className,
      )}
      {...props}
    />
  );
}

export function ActionBarSuffix({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="action-bar-suffix" className={cn("flex shrink-0 items-center gap-1 pl-1", className)} {...props} />
  );
}

export function ActionBarSeparator({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      data-slot="action-bar-separator"
      className={cn(
        "mx-1 h-5 w-px shrink-0 bg-border group-data-[orientation=vertical]/action-bar:h-px group-data-[orientation=vertical]/action-bar:w-5",
        className,
      )}
      {...props}
    />
  );
}

export function ActionBarLabel({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("sr-only sm:not-sr-only", className)} {...props} />;
}

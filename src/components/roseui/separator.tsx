"use client";

import type { ReactNode } from "react";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant = "default",
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  variant?: "default" | "secondary" | "tertiary";
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
        variant === "default" && "bg-border",
        variant === "secondary" && "bg-muted/50",
        variant === "tertiary" && "bg-muted/25",
        className,
      )}
      {...props}
    />
  );
}

function ContentDivider({
  children,
  align = "center",
  variant = "single",
  className,
}: {
  children: ReactNode;
  align?: "start" | "center" | "end";
  variant?: "single" | "double" | "fill";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 text-xs text-muted-foreground",
        align === "start" && "justify-start",
        align === "center" && "justify-center",
        align === "end" && "justify-end",
        variant === "fill" && "rounded-md bg-muted px-3 py-2",
        className,
      )}
    >
      {align !== "start" && (
        <Separator className={cn("flex-1", variant === "double" && "h-0 border-y border-border bg-transparent")} />
      )}
      <span className="shrink-0">{children}</span>
      {align !== "end" && (
        <Separator className={cn("flex-1", variant === "double" && "h-0 border-y border-border bg-transparent")} />
      )}
    </div>
  );
}

export { ContentDivider, Separator };

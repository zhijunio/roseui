"use client";

import type { ComponentProps } from "react";
import { Toolbar as AriaToolbar } from "react-aria-components";
import { cn } from "@/lib/utils";

type ToolbarLabel =
  | { "aria-label": string; "aria-labelledby"?: never }
  | { "aria-label"?: never; "aria-labelledby": string };

export function Toolbar({
  className,
  orientation = "horizontal",
  isAttached = false,
  ...props
}: Omit<ComponentProps<typeof AriaToolbar>, "aria-label" | "aria-labelledby" | "className"> & ToolbarLabel & {
  className?: string;
  isAttached?: boolean;
}) {
  return (
    <AriaToolbar
      {...props}
      orientation={orientation}
      data-slot="toolbar"
      data-orientation={orientation}
      data-attached={isAttached ? "true" : undefined}
      className={cn(
        "flex w-fit items-center gap-1",
        orientation === "vertical" && "flex-col",
        isAttached && "rounded-lg border border-border bg-muted/40 p-1.5 shadow-xs",
        className,
      )}
    />
  );
}

import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Frame({
  className,
  variant = "default",
  spacing = "default",
  stacked = false,
  dense = false,
  ...props
}: ComponentProps<"div"> & {
  variant?: "default" | "inverse" | "ghost";
  spacing?: "xs" | "sm" | "default" | "lg";
  stacked?: boolean;
  dense?: boolean;
}) {
  return (
    <div
      className={cn(
        "group/frame relative flex min-w-0 flex-col gap-0 overflow-hidden rounded-xl border border-border/80 bg-card p-0 shadow-none [&>[data-slot=frame-panel]:first-of-type]:border-t-0",
        "[--frame-panel-px:--spacing(4)] [--frame-panel-py:--spacing(4)] [--frame-panel-header-py:--spacing(3)] [--frame-panel-footer-py:--spacing(3)]",
        variant === "inverse" && "bg-background",
        variant === "ghost" && "border-transparent bg-transparent",
        spacing === "xs" && "[--frame-panel-px:--spacing(3)] [--frame-panel-py:--spacing(3)] [--frame-panel-header-py:--spacing(2)] [--frame-panel-footer-py:--spacing(2)]",
        spacing === "sm" && "[--frame-panel-px:--spacing(4)] [--frame-panel-py:--spacing(3.5)] [--frame-panel-header-py:--spacing(2.5)] [--frame-panel-footer-py:--spacing(2.5)]",
        spacing === "lg" && "[--frame-panel-px:--spacing(6)] [--frame-panel-py:--spacing(6)] [--frame-panel-header-py:--spacing(4)] [--frame-panel-footer-py:--spacing(4)]",
        stacked && "[&_[data-slot=frame-panel]+[data-slot=frame-panel]]:border-t-0",
        dense && "[--frame-panel-px:--spacing(3)] [--frame-panel-py:--spacing(3)] [&_[data-slot=frame-panel]]:py-3",
        className,
      )}
      data-slot="frame"
      data-spacing={spacing}
      {...props}
    />
  );
}

function FramePanel({
  className,
  fit = false,
  ...props
}: ComponentProps<"div"> & { fit?: boolean }) {
  return (
    <div
      className={cn(
        "relative min-w-0 px-(--frame-panel-px) py-(--frame-panel-py)",
        "border-t border-border/80",
        !fit && "grow",
        !fit && "min-h-0",
        className,
      )}
      data-slot="frame-panel"
      {...props}
    />
  );
}

function FrameHeader({ className, ...props }: ComponentProps<"header">) {
  return (
    <header
      className={cn("flex flex-col gap-0 border-b border-border/80 px-(--frame-panel-px) py-(--frame-panel-header-py)", className)}
      data-slot="frame-panel-header"
      {...props}
    />
  );
}

function FrameTitle({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("text-sm font-medium leading-5", className)} data-slot="frame-panel-title" {...props} />;
}

function FrameDescription({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("text-sm text-muted-foreground", className)} data-slot="frame-panel-description" {...props} />;
}

function FrameFooter({ className, ...props }: ComponentProps<"footer">) {
  return (
    <footer
      className={cn("flex flex-col gap-4 border-t border-border/80 px-(--frame-panel-px) py-(--frame-panel-footer-py)", className)}
      data-slot="frame-panel-footer"
      {...props}
    />
  );
}

export { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle };

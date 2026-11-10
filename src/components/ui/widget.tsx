import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Widget({ className, ...props }: ComponentProps<"section">) {
  return <section data-slot="widget" className={cn("min-w-0 rounded-xl border border-border bg-card p-4", className)} {...props} />;
}

export function WidgetHeader({ className, ...props }: ComponentProps<"header">) {
  return <header data-slot="widget-header" className={cn("flex flex-wrap items-start justify-between gap-3 px-1 pb-3", className)} {...props} />;
}

export function WidgetTitle({ className, ...props }: ComponentProps<"h3">) {
  return <h3 data-slot="widget-title" className={cn("text-sm font-medium", className)} {...props} />;
}

export function WidgetDescription({ className, ...props }: ComponentProps<"p">) {
  return <p data-slot="widget-description" className={cn("mt-1 text-xs text-muted-foreground", className)} {...props} />;
}

export function WidgetContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="widget-content" className={cn("min-w-0", className)} {...props} />;
}

export function WidgetFooter({ className, ...props }: ComponentProps<"footer">) {
  return <footer data-slot="widget-footer" className={cn("flex flex-wrap items-center justify-between gap-2 px-1 pt-3 text-xs text-muted-foreground", className)} {...props} />;
}

export function WidgetLegend({ className, ...props }: ComponentProps<"ul">) {
  return <ul data-slot="widget-legend" className={cn("flex flex-wrap items-center gap-x-3 gap-y-1.5", className)} {...props} />;
}

export function WidgetLegendItem({ color, className, children, ...props }: ComponentProps<"li"> & { color: string }) {
  return (
    <li data-slot="widget-legend-item" className={cn("inline-flex items-center gap-1.5 text-xs text-muted-foreground", className)} {...props}>
      <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: color }} />
      {children}
    </li>
  );
}

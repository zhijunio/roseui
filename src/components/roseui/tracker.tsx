"use client";

import { type ComponentProps, useState } from "react";

import { Tooltip, TooltipTrigger } from "@/components/roseui/tooltip";
import { cn } from "@/lib/utils";

export type TrackerVariant = "neutral" | "info" | "success" | "warning" | "destructive";

export interface TrackerBlockProps {
  key?: string | number;
  label?: string;
  variant?: TrackerVariant;
  color?: string;
  defaultBackgroundColor?: string;
  tooltip?: string;
  disabledTooltip?: boolean;
}

export interface TrackerProps extends ComponentProps<"div"> {
  data: readonly TrackerBlockProps[];
  variant?: TrackerVariant;
  disabledTooltip?: boolean;
  defaultBackgroundColor?: string;
}

const variantClasses: Record<TrackerVariant, string> = {
  neutral: "bg-muted-foreground",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
};

function TrackerBlock({
  item,
  variant,
  disabledTooltip,
  defaultBackgroundColor,
}: {
  item: TrackerBlockProps;
  variant?: TrackerVariant;
  disabledTooltip: boolean;
  defaultBackgroundColor: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const colorClass =
    item.color ??
    item.defaultBackgroundColor ??
    (item.variant ? variantClasses[item.variant] : variant ? variantClasses[variant] : defaultBackgroundColor);
  const content = (
    <button
      type="button"
      aria-label={item.label ?? item.tooltip ?? "Show status"}
      className="h-full min-w-0 flex-1 overflow-hidden px-px first:ps-0 last:pe-0 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      onClick={() => setIsOpen(true)}
    >
      <span
        aria-hidden="true"
        className={cn("block size-full rounded-[1px] transition hover:opacity-50", colorClass)}
      />
    </button>
  );

  if (disabledTooltip || item.disabledTooltip || !item.tooltip) {
    return (
      <div className="h-full min-w-0 flex-1 overflow-hidden px-[0.5px] transition first:rounded-s-sm first:ps-0 last:rounded-e-sm last:pe-0 sm:px-px">
        <span
          aria-hidden="true"
          className={cn("block size-full rounded-[1px] transition hover:opacity-50", colorClass)}
        />
      </div>
    );
  }

  return (
    <TooltipTrigger open={isOpen} onOpenChange={setIsOpen} delayDuration={0} skipDelayDuration={0}>
      {content}
      <Tooltip showArrow={false} sideOffset={10} side="top" className="px-2 py-1.5 text-xs">
        {item.tooltip}
      </Tooltip>
    </TooltipTrigger>
  );
}

export function Tracker({
  data = [],
  variant,
  disabledTooltip = false,
  defaultBackgroundColor = "bg-secondary",
  className,
  ...props
}: TrackerProps) {
  return (
    <div data-slot="tracker" className={cn("group flex h-8 w-full items-center", className)} {...props}>
      {data.map((item, index) => (
        <TrackerBlock
          key={item.key ?? index}
          item={item}
          variant={variant}
          disabledTooltip={disabledTooltip}
          defaultBackgroundColor={defaultBackgroundColor}
        />
      ))}
    </div>
  );
}

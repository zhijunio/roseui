"use client";

import * as React from "react";
import { IconCheck } from "@tabler/icons-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export type RadioCardOption = {
  value: string;
  label: string;
  description?: string;
  meta?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  disabledReason?: string;
};

export type RadioCardsProps = Omit<
  React.ComponentProps<typeof RadioGroup>,
  "children" | "className"
> & {
  options: RadioCardOption[];
  layout?: "grid" | "list";
  minColumnWidth?: number;
  className?: string;
};

export function RadioCards({
  options,
  layout = "grid",
  minColumnWidth = 180,
  className,
  ...props
}: RadioCardsProps) {
  const idBase = React.useId();
  return (
    <RadioGroup
      {...props}
      data-slot="radio-cards"
      data-layout={layout}
      className={cn(
        "grid w-full gap-3",
        layout === "list" && "grid-cols-1",
        className,
      )}
      style={
        layout === "grid"
          ? {
              gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${Math.max(140, minColumnWidth)}px), 1fr))`,
              ...props.style,
            }
          : props.style
      }
    >
      {options.map((option, index) => {
        const detailId = `${idBase}-detail-${index}`;
        const reasonId = `${idBase}-reason-${index}`;
        const describedBy =
          [
            option.description ? detailId : null,
            option.disabled && option.disabledReason ? reasonId : null,
          ]
            .filter(Boolean)
            .join(" ") || undefined;
        const accessibleText = [
          option.label,
          option.disabled ? undefined : option.meta,
        ]
          .filter(Boolean)
          .join(", ");
        return (
          <div
            key={option.value}
            className={cn(
              "group/radio-card relative flex min-h-24 items-start gap-3 rounded-xl border border-border bg-card p-4 pr-10 text-left text-foreground transition-[border-color,background-color,box-shadow] hover:bg-muted/30 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-primary/[0.04] has-[[aria-checked=true]]:ring-1 has-[[aria-checked=true]]:ring-primary/30 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60 motion-reduce:transition-none",
              layout === "list" && "min-h-20 items-center",
            )}
          >
            <RadioGroupItem
              value={option.value}
              disabled={option.disabled}
              aria-label={accessibleText}
              aria-describedby={describedBy}
              className="absolute inset-0 z-10 aspect-auto h-full w-full rounded-[inherit] border-0 bg-transparent opacity-0 after:content-none"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none flex min-w-0 flex-1 items-start gap-3"
            >
              {option.icon && (
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                  {option.icon}
                </span>
              )}
              <span className="grid min-w-0 flex-1 gap-1">
                <span
                  className={cn(
                    "min-w-0 break-words text-sm font-medium text-foreground",
                    layout === "list" &&
                      "flex items-start justify-between gap-3",
                  )}
                >
                  <span className="min-w-0 break-words">{option.label}</span>
                  {layout === "list" && option.meta && !option.disabled && (
                    <span className="max-w-[42%] shrink-0 break-words text-right text-sm font-medium tabular-nums text-foreground">
                      {option.meta}
                    </span>
                  )}
                </span>
                {option.description && (
                  <span className="break-words text-xs leading-5 text-muted-foreground">
                    {option.description}
                  </span>
                )}
                {option.disabled && option.disabledReason && (
                  <span className="break-words text-xs leading-5 text-muted-foreground">
                    {option.disabledReason}
                  </span>
                )}
                {layout === "grid" && option.meta && !option.disabled && (
                  <span className="break-words text-xs font-medium tabular-nums text-muted-foreground">
                    {option.meta}
                  </span>
                )}
              </span>
              <IconCheck className="absolute right-3 top-3 size-4 text-primary opacity-0 transition-opacity group-has-[[aria-checked=true]]/radio-card:opacity-100 motion-reduce:transition-none" />
            </span>
            <span id={detailId} className="sr-only">
              {option.description}
            </span>
            {option.disabled && option.disabledReason && (
              <span id={reasonId} className="sr-only">
                {option.disabledReason}
              </span>
            )}
          </div>
        );
      })}
    </RadioGroup>
  );
}

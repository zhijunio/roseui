"use client";

import type { ReactNode } from "react";

import { IconMinus, IconPlus } from "@tabler/icons-react";
import { NumberField as AriaNumberField, Button, Group, Input, type NumberFieldProps } from "react-aria-components";

import { cn } from "@/lib/utils";

type NumberStepperProps = Omit<NumberFieldProps, "children" | "className"> & {
  className?: string;
  formatOptions?: Intl.NumberFormatOptions;
  locale?: string;
  size?: "sm" | "default" | "lg";
  reversed?: boolean;
  incrementIcon?: ReactNode;
  decrementIcon?: ReactNode;
  incrementLabel?: string;
  decrementLabel?: string;
};

export function NumberStepper({
  className,
  formatOptions,
  locale = "en-US",
  size = "default",
  reversed = false,
  incrementIcon,
  decrementIcon,
  incrementLabel = "Increase value",
  decrementLabel = "Decrease value",
  ...props
}: NumberStepperProps) {
  const formatter = new Intl.NumberFormat(locale, formatOptions);

  return (
    <AriaNumberField {...props} className={cn("inline-flex min-w-0", className)}>
      {({ state }) => (
        <Group
          className={cn(
            "inline-flex w-fit items-center rounded-lg border border-input bg-card shadow-xs outline-none transition-colors data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring/50 data-[disabled]:opacity-50",
            size === "sm" && "h-8",
            size === "default" && "h-9",
            size === "lg" && "h-11",
          )}
        >
          <Button
            slot={reversed ? "increment" : "decrement"}
            aria-label={reversed ? incrementLabel : decrementLabel}
            className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-40 data-[pressed]:bg-accent"
          >
            {reversed
              ? (incrementIcon ?? <IconPlus aria-hidden="true" className="size-4" />)
              : (decrementIcon ?? <IconMinus aria-hidden="true" className="size-4" />)}
          </Button>
          <Input className="sr-only" />
          <output
            aria-hidden="true"
            className={cn(
              "min-w-10 px-2 text-center text-sm tabular-nums",
              size === "sm" && "text-xs",
              size === "lg" && "min-w-14 text-base",
            )}
          >
            {Number.isFinite(state.numberValue) ? formatter.format(state.numberValue) : state.inputValue}
          </output>
          <Button
            slot={reversed ? "decrement" : "increment"}
            aria-label={reversed ? decrementLabel : incrementLabel}
            className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-40 data-[pressed]:bg-accent"
          >
            {reversed
              ? (decrementIcon ?? <IconMinus aria-hidden="true" className="size-4" />)
              : (incrementIcon ?? <IconPlus aria-hidden="true" className="size-4" />)}
          </Button>
        </Group>
      )}
    </AriaNumberField>
  );
}

"use client";

import type { ComponentProps } from "react";

import * as Progress from "@radix-ui/react-progress";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function Leaderboard({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="leaderboard" className={cn("flex flex-col gap-4", className)} {...props} />;
}

export function LeaderboardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="leaderboard-header"
      className={cn(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 has-data-[slot=leaderboard-action]:grid-cols-[1fr_auto]",
        className,
      )}
      {...props}
    />
  );
}

export function LeaderboardTitle({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2 data-slot="leaderboard-title" className={cn("text-balance text-base font-semibold", className)} {...props} />
  );
}

export function LeaderboardAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="leaderboard-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}

export function LeaderboardContent({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      data-slot="leaderboard-content"
      className={cn("m-0 flex max-h-96 list-none flex-col gap-1 p-0", className)}
      {...props}
    />
  );
}

export interface LeaderboardItemProps extends Omit<ComponentProps<"li">, "children"> {
  value?: number;
  minValue?: number;
  maxValue?: number;
  formatOptions?: Intl.NumberFormatOptions;
  children?: React.ReactNode | ((values: { value: number; percentage: number; valueText: string }) => React.ReactNode);
  onAction?: () => void;
}

export function LeaderboardItem({
  minValue = 0,
  maxValue = 100,
  value = 0,
  formatOptions,
  className,
  children,
  onAction,
  ...props
}: LeaderboardItemProps) {
  const percentage =
    maxValue <= minValue ? 0 : Math.max(0, Math.min(100, ((value - minValue) / (maxValue - minValue)) * 100));
  const values = { value, percentage, valueText: new Intl.NumberFormat("en-US", formatOptions).format(value) };
  const content = typeof children === "function" ? children(values) : children;
  return (
    <li {...props} data-slot="leaderboard-item" className="group min-w-0">
      <Progress.Root value={value - minValue} max={maxValue - minValue} asChild>
        <div
          role={onAction ? "button" : undefined}
          tabIndex={onAction ? 0 : undefined}
          onClick={onAction}
          onKeyDown={(event) => {
            if (onAction && (event.key === "Enter" || event.key === " ")) {
              event.preventDefault();
              onAction();
            }
          }}
          className={cn(
            "relative isolate block w-full cursor-default overflow-hidden rounded-md px-2 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
            className,
          )}
        >
          <span className="relative z-10 flex min-w-0 items-center justify-between gap-4 font-medium">{content}</span>
          <span
            aria-hidden="true"
            data-slot="leaderboard-meter"
            className={cn(
              "absolute inset-y-0 start-0 z-0 rounded-e-md bg-primary/10 transition-colors",
              onAction && "group-hover:bg-primary/15",
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </Progress.Root>
    </li>
  );
}

export function LeaderboardStart({ className, ...props }: ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="leaderboard-start"
      className={cn("flex min-w-0 items-center gap-2 truncate", className)}
      {...props}
    />
  );
}

export function LeaderboardEnd({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="leaderboard-end"
      className={cn("shrink-0 tabular-nums text-muted-foreground", className)}
      {...props}
    />
  );
}

import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonGroupLabel =
  | { "aria-label": string; "aria-labelledby"?: never }
  | { "aria-label"?: never; "aria-labelledby": string };

export function ButtonGroup({
  className,
  orientation = "horizontal",
  fullWidth = false,
  ...props
}: Omit<ComponentProps<"div">, "aria-label" | "aria-labelledby" | "role"> &
  ButtonGroupLabel & { orientation?: "horizontal" | "vertical"; fullWidth?: boolean }) {
  return (
    <div
      {...props}
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      data-full-width={fullWidth ? "" : undefined}
      className={cn(
        "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2",
        fullWidth ? "w-full" : "w-fit",
        "has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-e-lg [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
        orientation === "horizontal" &&
          "[&>*:not(:first-child)]:rounded-s-none [&>*:not(:first-child)]:border-s-0 [&>*:not(:last-child)]:rounded-e-none",
        orientation === "vertical" &&
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
        fullWidth && orientation === "horizontal" && "[&>[data-slot=button]]:flex-1",
        fullWidth && orientation === "vertical" && "[&>[data-slot=button]]:w-full",
        "*:focus-visible:relative *:focus-visible:z-10 *:focus-visible:ring-inset",
        className,
      )}
    />
  );
}

export function ButtonGroupText({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="button-group-text"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-3 text-sm font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: ComponentProps<"div"> & { orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      data-slot="button-group-separator"
      data-orientation={orientation}
      className={cn(
        "relative m-0! shrink-0 self-stretch bg-input",
        orientation === "vertical" ? "w-px" : "h-px w-full",
        className,
      )}
      {...props}
    />
  );
}

export function ButtonGroupItem({
  className,
  selected,
  type = "button",
  ...props
}: Omit<ComponentProps<typeof Button>, "aria-pressed"> & {
  selected?: boolean;
}) {
  return (
    <Button
      {...props}
      type={type}
      aria-pressed={selected}
      className={cn(
        selected && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
        className,
      )}
    />
  );
}

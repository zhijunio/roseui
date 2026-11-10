import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function HintText({
  variant = "default",
  role,
  "aria-live": ariaLive,
  className,
  ...props
}: Omit<ComponentProps<"p">, "color"> & {
  variant?: "default" | "error" | "success";
}) {
  return (
    <p
      {...props}
      role={role ?? (variant === "error" ? "alert" : undefined)}
      aria-live={ariaLive ?? (variant === "error" ? "assertive" : undefined)}
      className={cn(
        "text-xs leading-5",
        variant === "default" && "text-muted-foreground",
        variant === "error" && "text-destructive",
        variant === "success" && "text-success",
        className,
      )}
    />
  );
}

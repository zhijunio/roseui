import type * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input">;

export function Input({ className, ref, type, ...props }: InputProps) {
  return (
    <input
      {...props}
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        "block w-full min-w-0 appearance-none rounded-lg bg-(--control-bg,transparent)",
        "ps-[calc(--spacing(3.5)-1px)] pe-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] text-base/6 text-foreground placeholder:text-muted-foreground sm:py-[calc(--spacing(1.5)-1px)] sm:text-sm/6",
        "border border-input enabled:hover:border-muted-foreground/30 outline-hidden focus:border-ring/70 focus:ring-3 focus:ring-ring/20 focus:enabled:hover:border-ring/80",
        "aria-invalid:border-danger-subtle-foreground/70 aria-invalid:focus:border-danger-subtle-foreground/70 aria-invalid:focus:ring-danger-subtle-foreground/20 disabled:bg-muted disabled:text-[GrayText]",
        "[&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:hidden dark:scheme-dark",
        className,
      )}
    />
  );
}

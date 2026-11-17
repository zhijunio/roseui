import type * as React from "react";

import { cn } from "@/lib/utils";

type TextareaProps = React.ComponentProps<"textarea">;

export function Textarea({ className, ref, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      ref={ref}
      data-slot="textarea"
      className={cn(
        "block min-h-16 w-full min-w-0 appearance-none rounded-lg bg-(--control-bg,transparent)",
        "px-3 py-2 text-base/6 text-foreground placeholder:text-muted-foreground sm:text-sm/6",
        "border border-input outline-hidden focus:border-ring/70 focus:ring-3 focus:ring-ring/20",
        "aria-invalid:border-danger-subtle-foreground/70 aria-invalid:focus:border-danger-subtle-foreground/70 aria-invalid:focus:ring-danger-subtle-foreground/20 disabled:bg-muted disabled:text-[GrayText]",
        "dark:scheme-dark",
        className,
      )}
    />
  );
}

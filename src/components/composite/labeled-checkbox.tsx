"use client";

import { useId, type ComponentProps, type ReactNode } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export function LabeledCheckbox({
  label,
  description,
  id,
  className,
  containerClassName,
  ...props
}: Omit<
  ComponentProps<typeof Checkbox>,
  "id"
> & {
  label: ReactNode;
  description?: ReactNode;
  id?: string;
  containerClassName?: string;
}) {
  const generatedId = useId();
  const controlId = id ?? generatedId;

  return (
    <label
      htmlFor={controlId}
      className={cn(
        "group flex cursor-pointer items-start gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-muted/40 has-[[data-state=checked]]:bg-primary/[0.04] has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-60",
        containerClassName,
      )}
    >
      <Checkbox
        {...props}
        id={controlId}
        className={cn("mt-0.5", className)}
      />
      <span className="grid min-w-0 gap-1">
        <span className="text-sm font-medium leading-5">{label}</span>
        {description && (
          <span className="text-xs leading-5 text-muted-foreground">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}

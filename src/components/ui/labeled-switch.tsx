"use client";

import { type ComponentProps, type ReactNode, useId } from "react";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function LabeledSwitch({
  label,
  description,
  id,
  className,
  containerClassName,
  ...props
}: Omit<ComponentProps<typeof Switch>, "id" | "aria-label" | "aria-labelledby"> & {
  label: ReactNode;
  description?: ReactNode;
  id?: string;
  containerClassName?: string;
}) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const labelId = `${controlId}-label`;
  const descriptionId = description ? `${controlId}-description` : undefined;

  return (
    <label
      className={cn(
        "flex cursor-pointer items-start justify-between gap-4 rounded-xl border bg-card p-4 transition-colors has-[[data-state=checked]]:bg-primary/[0.04] has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-60",
        containerClassName,
      )}
    >
      <div className="grid min-w-0 gap-1">
        <span id={labelId} className="text-sm font-medium leading-5">
          {label}
        </span>
        {description && (
          <span id={descriptionId} className="text-xs leading-5 text-muted-foreground">
            {description}
          </span>
        )}
      </div>
      <Switch
        {...props}
        id={controlId}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        className={cn("mt-0.5", className)}
      />
    </label>
  );
}

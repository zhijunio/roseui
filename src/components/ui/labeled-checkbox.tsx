"use client";

import { type ComponentProps, type ReactNode, useId } from "react";

import { CheckboxButton, CheckboxField } from "@/components/ui/checkbox";
import { FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export function LabeledCheckbox({
  label,
  description,
  error,
  required,
  id,
  indicator,
  isInvalid: isInvalidProp,
  className,
  containerClassName,
  ...props
}: Omit<ComponentProps<typeof CheckboxField>, "id" | "children"> & {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  indicator?: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
}) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const labelId = `${controlId}-label`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [props["aria-describedby"], descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  const field = (
    <CheckboxField
      {...props}
      id={controlId}
      required={required}
      isInvalid={error ? true : isInvalidProp}
      aria-describedby={describedBy}
      aria-labelledby={labelId}
    >
      <CheckboxButton
        className={cn(
          "w-full items-start gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-muted/40 data-[selected]:bg-primary/[0.04] data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60",
          containerClassName,
        )}
        boxClassName={cn("mt-0.5", className)}
        indicator={indicator}
      >
        <span className="grid min-w-0 gap-1">
          <span id={labelId} className="text-sm font-medium leading-5">
            {label}
            {required && (
              <span aria-hidden="true" className="ml-1 text-destructive">
                *
              </span>
            )}
          </span>
          {description && (
            <span id={descriptionId} className="text-xs leading-5 text-muted-foreground">
              {description}
            </span>
          )}
        </span>
      </CheckboxButton>
    </CheckboxField>
  );

  if (!error) return field;

  return (
    <div className="grid gap-1.5">
      {field}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}

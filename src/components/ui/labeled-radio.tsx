"use client";

import { type ComponentProps, type ReactNode, useId } from "react";

import { FieldError } from "@/components/ui/field";
import { RadioButton, RadioField, RadioGroup } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export function LabeledRadioGroup({ className, ...props }: ComponentProps<typeof RadioGroup>) {
  return <RadioGroup {...props} className={cn("gap-3", className)} />;
}

export function LabeledRadio({
  label,
  description,
  error,
  id,
  className,
  containerClassName,
  ...props
}: Omit<ComponentProps<typeof RadioField>, "id" | "children"> & {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
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
  const ariaInvalid = (props as { "aria-invalid"?: boolean })["aria-invalid"];

  const field = (
    <RadioField
      {...props}
      id={controlId}
      aria-invalid={error ? true : ariaInvalid}
      aria-describedby={describedBy}
      aria-labelledby={labelId}
    >
      <RadioButton
        className={cn(
          "w-full items-start gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-muted/40 data-[selected]:bg-primary/[0.04] data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60",
          containerClassName,
        )}
        boxClassName={cn("mt-0.5", className)}
      >
        <span className="grid min-w-0 gap-1">
          <span id={labelId} className="text-sm font-medium leading-5">
            {label}
          </span>
          {description && (
            <span id={descriptionId} className="text-xs leading-5 text-muted-foreground">
              {description}
            </span>
          )}
        </span>
      </RadioButton>
    </RadioField>
  );

  if (!error) return field;

  return (
    <div className="grid gap-1.5">
      {field}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}

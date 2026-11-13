"use client";

import {
  Label as LabelPrimitive,
  type LabelProps as LabelPrimitiveProps,
} from "react-aria-components/Label";

import { cn } from "@/lib/utils";

export const labelStyles = cn(
  "group/label flex items-center gap-2 text-sm leading-none font-medium select-none",
  "group-data-[disabled]/field:pointer-events-none group-data-[disabled]/field:opacity-50",
  "group-data-[required]/field:after:ml-1 group-data-[required]/field:after:text-destructive group-data-[required]/field:after:content-['*']",
  "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
);

export type LabelProps = LabelPrimitiveProps & {
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
};

function Label({
  className,
  children,
  isRequired = false,
  isDisabled = false,
  isInvalid = false,
  ...props
}: LabelProps) {
  return (
    <LabelPrimitive
      data-slot="label"
      data-required={isRequired || undefined}
      data-disabled={isDisabled || undefined}
      data-invalid={isInvalid || undefined}
      className={cn(
        labelStyles,
        isDisabled && "pointer-events-none opacity-50",
        isInvalid && "text-destructive",
        className,
      )}
      {...props}
    >
      {children}
      {isRequired && (
        <span
          aria-hidden="true"
          data-slot="label-required"
          className="text-destructive group-data-[required]/field:hidden"
        >
          *
        </span>
      )}
    </LabelPrimitive>
  );
}

export { Label };

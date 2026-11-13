import type * as React from "react";
import { FieldError as FieldErrorPrimitive } from "react-aria-components/FieldError";
import { Text as TextPrimitive } from "react-aria-components/Text";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type FieldOrientation = "vertical" | "horizontal" | "responsive";

export const fieldLabelStyles = cn(
  "w-fit text-sm font-medium",
  "group-data-[required=true]/field:after:ml-1 group-data-[required=true]/field:after:text-destructive group-data-[required=true]/field:after:content-['*'] forced-colors:group-data-[required=true]/field:after:text-[Mark]",
);
export const fieldTitleStyles = cn(fieldLabelStyles, "flex items-center");
export const fieldDescriptionStyles = cn("text-sm leading-normal text-muted-foreground");
export const fieldErrorStyles = cn("text-sm font-medium text-destructive forced-colors:text-[Mark]");
export const fieldStyles = () => cn("flex min-h-9 w-full min-w-0 items-center rounded-lg border border-input bg-background px-3 text-sm shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive");

export function FieldSet(props: React.ComponentProps<"fieldset">) {
  const { className, ...rest } = props;
  return <fieldset data-slot="field-set" className={cn("flex w-full min-w-0 flex-col gap-5", className)} {...rest} />;
}

export function FieldLegend({
  className,
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  const { variant = "legend", ...rest } = props;
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(variant === "legend" ? "mb-2 text-sm font-semibold" : "mb-1 text-sm font-medium", className)}
      {...rest}
    />
  );
}

export function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("@container/field-group flex w-full min-w-0 flex-col gap-5", className)}
      {...props}
    />
  );
}

export function Field({
  className,
  orientation = "vertical",
  invalid,
  disabled,
  required,
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: FieldOrientation;
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      data-required={required || undefined}
      className={cn(
        "group/field flex min-w-0 gap-1.5",
        orientation === "vertical" && "w-full flex-col",
        orientation === "horizontal" && "w-full flex-row items-center gap-4",
        orientation === "responsive" &&
          "w-full flex-col @md/field-group:flex-row @md/field-group:items-center @md/field-group:gap-4",
        invalid && "text-destructive",
        disabled && "opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field-content" className={cn("flex min-w-0 flex-1 flex-col gap-1", className)} {...props} />;
}

export function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return <Label data-slot="field-label" className={cn(fieldLabelStyles, className)} {...props} />;
}

export function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="field-title" className={cn(fieldTitleStyles, className)} {...props} />
  );
}

export function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <TextPrimitive
      slot="description"
      data-slot="field-description"
      className={cn(fieldDescriptionStyles, className)}
      {...props}
    />
  );
}

export function FieldSeparator({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="field-separator" className={cn("relative flex min-h-5 items-center", className)} {...props}>
      <Separator className="absolute inset-x-0 top-1/2" />
      {children && (
        <span className="relative mx-auto bg-background px-2 text-xs text-muted-foreground">{children}</span>
      )}
    </div>
  );
}

export function FieldError({
  children,
  errors,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const content =
    children ??
    [
      ...new Set(errors?.map((error) => error?.message).filter((message): message is string => Boolean(message)) ?? []),
    ].map((message) => message);
  if (!content || (Array.isArray(content) && content.length === 0)) return null;
  return (
    <FieldErrorPrimitive
      role="alert"
      data-slot="field-error"
      className={cn(fieldErrorStyles, className)}
      {...props}
    >
      {Array.isArray(content) ? (
        <ul className="list-inside list-disc space-y-1">
          {content.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      ) : (
        content
      )}
    </FieldErrorPrimitive>
  );
}

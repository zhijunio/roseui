import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "group/alert relative flex w-full flex-row items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left text-sm has-data-[slot=alert-action]:pr-18 [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:select-none",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground [&>svg]:text-foreground [&_[data-slot=alert-title]]:text-foreground",
        info: "border-primary/30 bg-primary/5 text-card-foreground [&>svg]:text-primary [&_[data-slot=alert-title]]:text-primary [&_[data-slot=alert-description]]:text-current",
        success: "border-success/30 bg-success-soft text-card-foreground [&>svg]:text-success [&_[data-slot=alert-title]]:text-success [&_[data-slot=alert-description]]:text-current",
        warning: "border-warning/30 bg-warning-soft text-card-foreground [&>svg]:text-warning [&_[data-slot=alert-title]]:text-warning [&_[data-slot=alert-description]]:text-current",
        invert: "border-foreground bg-foreground text-background [&>svg]:text-background [&_[data-slot=alert-title]]:text-background [&_[data-slot=alert-description]]:text-background/80",
        destructive: "border-destructive/30 bg-card text-destructive [&>svg]:text-current [&_[data-slot=alert-title]]:text-destructive",
      },
      appearance: {
        subtle: "",
        outline: "bg-transparent",
        solid: "",
      },
    },
    compoundVariants: [
      { variant: "default", appearance: "outline", className: "border-border" },
      { variant: "info", appearance: "outline", className: "border-info/40" },
      { variant: "success", appearance: "outline", className: "border-success/40" },
      { variant: "warning", appearance: "outline", className: "border-warning/40" },
      { variant: "destructive", appearance: "outline", className: "border-destructive/40" },
      { variant: "default", appearance: "solid", className: "border-foreground bg-foreground text-background [&>svg]:text-background [&_[data-slot=alert-title]]:text-background [&_[data-slot=alert-description]]:text-background/80" },
      { variant: "info", appearance: "solid", className: "border-info/30 bg-info-soft text-info [&>svg]:text-current [&_[data-slot=alert-title]]:text-current [&_[data-slot=alert-description]]:text-current" },
      { variant: "success", appearance: "solid", className: "border-success/30 bg-success-soft text-success [&>svg]:text-current [&_[data-slot=alert-title]]:text-current [&_[data-slot=alert-description]]:text-current" },
      { variant: "warning", appearance: "solid", className: "border-warning/30 bg-warning-soft text-warning [&>svg]:text-current [&_[data-slot=alert-title]]:text-current [&_[data-slot=alert-description]]:text-current" },
      { variant: "destructive", appearance: "solid", className: "border-destructive/30 bg-destructive-soft text-destructive [&>svg]:text-current [&_[data-slot=alert-title]]:text-current [&_[data-slot=alert-description]]:text-current" },
      { variant: "invert", appearance: "outline", className: "border-foreground/40 text-foreground [&>svg]:text-foreground [&_[data-slot=alert-title]]:text-foreground [&_[data-slot=alert-description]]:text-muted-foreground" },
      { variant: "invert", appearance: "solid", className: "border-foreground bg-foreground text-background [&>svg]:text-background [&_[data-slot=alert-title]]:text-background [&_[data-slot=alert-description]]:text-background/80" },
    ],
    defaultVariants: { variant: "default", appearance: "subtle" },
  },
);

export type AlertVariant = NonNullable<VariantProps<typeof alertVariants>["variant"]>;

function Alert({
  className,
  variant,
  appearance,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-variant={variant ?? "default"}
      data-appearance={appearance ?? "subtle"}
      role="alert"
      className={cn(alertVariants({ variant, appearance }), className)}
      {...props}
    />
  );
}

function AlertContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-content"
      className={cn("flex min-w-0 grow flex-col items-start gap-0.5", className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("font-medium leading-5", className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  );
}

export { Alert, AlertAction, AlertContent, AlertDescription, AlertTitle };

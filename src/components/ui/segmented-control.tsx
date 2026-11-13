"use client";
import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { ToggleButton as TogglePrimitive, type ToggleButtonProps } from "react-aria-components/ToggleButton";
import { ToggleButtonGroup as ToggleGroupPrimitive, type ToggleButtonGroupProps } from "react-aria-components/ToggleButtonGroup";

import { cn } from "@/lib/utils";

const segmentedControlVariants = cva("inline-flex items-center rounded-lg text-muted-foreground", {
  variants: {
    variant: {
      default: "bg-muted p-1",
      ghost: "bg-transparent p-0",
    },
    size: {
      sm: "h-7 gap-0.5",
      md: "h-9 gap-1",
      lg: "h-11 gap-1.5",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

const segmentedControlItemVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "hover:text-foreground selected:bg-background selected:text-foreground selected:shadow-sm",
        ghost: "hover:bg-muted hover:text-foreground selected:bg-accent selected:text-accent-foreground",
      },
      size: {
        sm: "h-6 px-2 text-xs",
        md: "h-7 px-3 text-sm",
        lg: "h-9 px-4 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

type SegmentedControlVariants = VariantProps<typeof segmentedControlVariants>;
const SegmentedControlContext = React.createContext<SegmentedControlVariants>({ variant: "default", size: "md" });

function SegmentedControl({
  className,
  value,
  defaultValue,
  onValueChange,
  disabled,
  isDisabled,
  variant = "default",
  size = "md",
  ...props
}: Omit<ToggleButtonGroupProps, "selectionMode"> & {
  children?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  variant?: SegmentedControlVariants["variant"];
  size?: SegmentedControlVariants["size"];
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue ?? "");
  const current = value ?? uncontrolled;

  return (
    <SegmentedControlContext.Provider value={{ variant, size }}>
      <ToggleGroupPrimitive
        {...props}
        selectionMode="single"
        disallowEmptySelection
        data-slot="segmented-control"
        data-variant={variant}
        data-size={size}
        selectedKeys={current ? [current] : []}
        isDisabled={disabled ?? isDisabled}
        onSelectionChange={(nextKeys) => {
          const next = Array.from(nextKeys)[0];
          if (typeof next !== "string" || !next) return;
          if (value === undefined) setUncontrolled(next);
          onValueChange?.(next);
        }}
        className={cn(segmentedControlVariants({ variant, size }), className)}
      />
    </SegmentedControlContext.Provider>
  );
}
function SegmentedControlItem({
  className,
  variant,
  size,
  value,
  disabled,
  isDisabled,
  id,
  ...props
}: ToggleButtonProps & SegmentedControlVariants & {
  value?: string;
  disabled?: boolean;
}) {
  const inherited = React.useContext(SegmentedControlContext);
  return (
    <TogglePrimitive
      id={id ?? value}
      isDisabled={disabled ?? isDisabled}
      data-slot="segmented-control-item"
      className={cn(
        segmentedControlItemVariants({ variant: variant ?? inherited.variant, size: size ?? inherited.size }),
        className,
      )}
      {...props}
    />
  );
}

function SegmentedControlSeparator({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      data-slot="segmented-control-separator"
      className={cn("h-4 w-px shrink-0 bg-border", className)}
      {...props}
    />
  );
}

export { SegmentedControl, SegmentedControlItem, SegmentedControlSeparator };

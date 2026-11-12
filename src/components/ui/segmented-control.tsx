"use client";
import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";

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
          "hover:text-foreground data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm",
        ghost: "hover:bg-muted hover:text-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
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
  variant = "default",
  size = "md",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  dir?: "ltr" | "rtl";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
  variant?: SegmentedControlVariants["variant"];
  size?: SegmentedControlVariants["size"];
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue ?? "");
  const current = value ?? uncontrolled;
  return (
    <SegmentedControlContext.Provider value={{ variant, size }}>
      <ToggleGroupPrimitive.Root
        {...props}
        type="single"
        data-slot="segmented-control"
        data-variant={variant}
        data-size={size}
        value={current}
        onValueChange={(next) => {
          if (!next) return;
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
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & SegmentedControlVariants) {
  const inherited = React.useContext(SegmentedControlContext);
  return (
    <ToggleGroupPrimitive.Item
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

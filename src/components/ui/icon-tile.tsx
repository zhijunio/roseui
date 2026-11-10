import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconTileVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center align-middle size-(--icon-tile-size) [--icon-tile-radius:min(var(--radius-md),calc(var(--icon-tile-size)/3))] rounded-[var(--icon-tile-radius)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-(--icon-tile-icon-size)",
  {
    variants: {
      variant: {
        outline: "border border-border bg-background dark:bg-input/32",
        elevated: "border-2 border-background bg-muted text-secondary-foreground shadow-xs dark:border",
        soft: "isolate bg-current/10 p-(--icon-tile-inset) text-primary after:absolute after:-z-10 after:inset-(--icon-tile-inset) after:rounded-[calc(var(--icon-tile-radius)_-_var(--icon-tile-inset))] after:border after:border-current/20 after:bg-current/5",
        solid: "bg-primary text-primary-foreground",
        frame: "isolate border border-border bg-muted/50 p-(--icon-tile-inset) after:absolute after:-z-10 after:inset-(--icon-tile-inset) after:rounded-[calc(var(--icon-tile-radius)_-_var(--icon-tile-inset))] after:border after:border-border after:bg-card after:shadow-xs",
      },
      size: {
        xs: "[--icon-tile-size:--spacing(6)] [--icon-tile-icon-size:--spacing(3.5)] [--icon-tile-inset:--spacing(0.5)]",
        sm: "[--icon-tile-size:--spacing(8)] [--icon-tile-icon-size:--spacing(4)] [--icon-tile-inset:--spacing(0.5)]",
        default: "[--icon-tile-size:--spacing(10)] [--icon-tile-icon-size:--spacing(4.5)] [--icon-tile-inset:--spacing(0.75)]",
        lg: "[--icon-tile-size:--spacing(12)] [--icon-tile-icon-size:--spacing(5.5)] [--icon-tile-inset:--spacing(0.75)]",
        xl: "[--icon-tile-size:--spacing(14)] [--icon-tile-icon-size:--spacing(7)] [--icon-tile-inset:--spacing(1)]",
      },
      radius: { default: "", full: "[--icon-tile-radius:9999px]" },
    },
    defaultVariants: { variant: "outline", size: "default", radius: "default" },
  }
);

export type IconTileVariant = NonNullable<VariantProps<typeof iconTileVariants>["variant"]>;
export type IconTileSize = NonNullable<VariantProps<typeof iconTileVariants>["size"]>;

function IconTile({
  className,
  variant = "outline",
  size = "default",
  radius = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & {
  variant?: IconTileVariant;
  size?: IconTileSize;
  radius?: "default" | "full";
  asChild?: boolean;
}) {
  const Component = asChild ? Slot.Root : "span";

  return (
    <Component
      data-slot="icon-tile"
      data-variant={variant}
      data-size={size}
      className={cn(iconTileVariants({ variant, size, radius }), className)}
      {...props}
    />
  );
}

export { IconTile };

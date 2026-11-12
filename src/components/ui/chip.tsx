import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md transition-colors [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      textStyle: {
        bold: "px-1.5 py-0.5 text-sm font-medium leading-5",
        subtle: "px-1.5 py-1 text-sm font-medium leading-5",
        caption: "px-1.5 py-1 text-xs font-medium leading-4 tracking-[0.15px]",
      },
      size: {
        sm: "px-1.5 py-0.5 text-xs leading-4",
        md: "px-2 py-1 text-sm leading-5",
        lg: "px-2.5 py-1.5 text-sm leading-5",
      },
      color: {
        lime: "bg-lime-200 text-lime-800 dark:bg-lime-950/60 dark:text-lime-500",
        rose: "bg-rose-200 text-rose-800 dark:bg-rose-950/60 dark:text-rose-500",
        yellow: "bg-yellow-200 text-yellow-800 dark:bg-yellow-950/60 dark:text-yellow-500",
        cyan: "bg-cyan-200 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-400",
        neutral: "bg-muted text-muted-foreground",
        gray: "bg-secondary text-secondary-foreground",
        soft: "bg-secondary text-muted-foreground",
        default: "bg-secondary text-secondary-foreground",
        accent: "bg-primary text-primary-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        danger: "bg-destructive text-destructive-foreground",
        info: "bg-info text-info-foreground",
      },
      variant: {
        primary: "",
        secondary: "bg-transparent ring-1 ring-inset ring-current/30 data-[color=accent]:text-primary data-[color=danger]:text-destructive",
        tertiary: "bg-transparent data-[color=accent]:text-primary data-[color=danger]:text-destructive",
        soft: "bg-current/10 data-[color=accent]:text-primary data-[color=danger]:text-destructive",
      },
    },
    defaultVariants: { textStyle: "bold", variant: "primary", color: "neutral" },
  }
);

export type ChipTextStyle = NonNullable<VariantProps<typeof chipVariants>["textStyle"]>;
export type ChipVariant = NonNullable<VariantProps<typeof chipVariants>["variant"]>;
export type ChipSize = NonNullable<VariantProps<typeof chipVariants>["size"]>;
export type ChipColor = NonNullable<VariantProps<typeof chipVariants>["color"]>;

export function Chip({
  textStyle = "bold",
  variant = "primary",
  size,
  color = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & {
  textStyle?: ChipTextStyle;
  variant?: ChipVariant;
  size?: ChipSize;
  color?: ChipColor;
}) {
  return (
    <span
      data-slot="chip"
      data-variant={variant}
      data-text-style={textStyle}
      data-size={size}
      data-color={color}
      className={cn(chipVariants({ textStyle, size, color, variant }), className)}
      {...props}
    />
  );
}

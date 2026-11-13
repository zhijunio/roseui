import { cva } from "class-variance-authority";

const buttonBase =
  "group/button inline-flex shrink-0 items-center justify-center rounded-[var(--radius)] border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap motion-safe:transition-[color,background-color,border-color,box-shadow,transform] motion-safe:duration-150 motion-safe:ease-in-out outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 disabled:text-[GrayText] pending:pointer-events-none pending:cursor-progress pending:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 forced-colors:border-[ButtonBorder] forced-colors:aria-invalid:border-[Mark] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:data-[slot=loader]:shrink-0 *:data-[slot=loader]:text-current";

export const buttonVariants = cva(buttonBase, {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/80 forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
      outline:
        "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
      ghost:
        "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 forced-colors:bg-[Mark] forced-colors:text-[MarkText] dark:bg-destructive/60 dark:hover:bg-destructive/80 dark:focus-visible:ring-destructive/40",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
      xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
      sm: "h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
      lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
      icon: "touch-target size-9",
      "icon-xs": "touch-target size-6 rounded-[min(var(--radius-md),10px)] [&_svg:not([class*='size-'])]:size-3",
      "icon-sm": "touch-target size-8 rounded-[min(var(--radius-md),10px)]",
      "icon-lg": "touch-target size-10",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

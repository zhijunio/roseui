"use client";

import type { ReactNode } from "react";

import { Check as CheckIcon } from "lucide-react";
import { tv } from "tailwind-variants";

import { cn } from "@/lib/utils";

import { Keyboard } from "./keyboard";
import { ListBoxItem, ListBoxSection } from "./list-box";

export const dropdownSectionStyles = tv({
  slots: {
    section: "col-span-full grid grid-cols-[auto_1fr]",
    header: "col-span-full px-3 py-2 font-medium text-muted-foreground text-sm/6 sm:px-2.5 sm:py-1.5 sm:text-xs/3",
  },
});
const { section, header } = dropdownSectionStyles();

export interface DropdownSectionProps<T extends { id?: string | number; key?: string | number }>
  extends Omit<React.ComponentProps<"div">, "children" | "title"> {
  items?: Iterable<T>;
  children?: React.ReactNode | ((item: T) => React.ReactNode);
  title?: ReactNode;
}

export function DropdownSection<T extends { id?: string | number; key?: string | number }>({
  className,
  title,
  ...props
}: DropdownSectionProps<T>) {
  return <ListBoxSection data-slot="dropdown-section" className={section({ className })} title={title} {...props} />;
}

export const dropdownItemStyles = tv({
  base: "group relative grid min-w-0 grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center gap-2 rounded-[calc(var(--radius-lg)-(--spacing(1)))] px-3 py-2 text-sm text-foreground outline-none focus:bg-accent focus:text-secondary-foreground data-[selected=true]:bg-accent data-[selected=true]:text-secondary-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 sm:px-2.5 sm:py-1.5 [&_svg]:shrink-0",
  variants: { intent: { danger: "text-danger-subtle-foreground", warning: "text-warning-subtle-foreground" } },
});

export interface DropdownItemProps extends Omit<React.ComponentProps<"div">, "children" | "id" | "key"> {
  id?: string | number;
  key?: string | number;
  textValue?: string;
  disabled?: boolean;
  variant?: "default" | "danger";
  indicator?: React.ReactNode;
  children?: ReactNode;
  intent?: "danger" | "warning";
}

export function DropdownItem({ className, children, intent, ...props }: DropdownItemProps) {
  return (
    <ListBoxItem
      {...props}
      indicator={<CheckIcon className="size-4" data-slot="check-indicator" />}
      className={dropdownItemStyles({ intent, className })}
    >
      {typeof children === "string" ? <DropdownLabel>{children}</DropdownLabel> : children}
    </ListBoxItem>
  );
}

export function DropdownLabel({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="label" className={cn("col-start-2 [&:has(+svg)]:pe-6", className)} {...props} />;
}

export function DropdownDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="description"
      className={cn("col-start-2 font-normal text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export function DropdownSeparator({ className, ...props }: React.ComponentProps<"hr">) {
  return (
    <hr
      data-slot="dropdown-separator"
      className={cn("col-span-full -mx-1 h-px border-0 bg-foreground/10", className)}
      {...props}
    />
  );
}

export function DropdownKeyboard({ className, ...props }: React.ComponentProps<typeof Keyboard>) {
  return (
    <Keyboard
      className={cn(
        "absolute end-2 ps-2 group-hover:text-primary-foreground group-focus:text-primary-foreground",
        className,
      )}
      {...props}
    />
  );
}

"use client";

import type { ReactNode } from "react";
import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  type GridListItemProps,
  type GridListProps,
} from "react-aria-components";
import { IconCheck } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

type ListViewProps<T extends object> = Omit<GridListProps<T>, "className" | "children"> & {
  children?: GridListProps<T>["children"];
  className?: string;
  variant?: "primary" | "secondary";
};

export function ListView<T extends object>({ className, variant = "primary", ...props }: ListViewProps<T>) {
  return (
    <AriaGridList
      data-slot="list-view"
      data-variant={variant}
      data-selection-mode={props.selectionMode ?? "none"}
      className={cn(
        "group/list-view min-h-0 w-full outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        variant === "primary" && "space-y-1 rounded-xl bg-muted/50 p-2",
        variant === "secondary" && "divide-y divide-border",
        className,
      )}
      {...props}
    />
  );
}

type ListViewItemProps<T extends object> = Omit<GridListItemProps<T>, "className" | "children"> & {
  children: ReactNode;
  className?: string;
};

export function ListViewItem<T extends object>({ className, children, ...props }: ListViewItemProps<T>) {
  return (
    <AriaGridListItem
      data-slot="list-view-item"
      className={cn(
        "group/list-view-item flex min-w-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none transition-colors",
        "hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring/50 data-[selected=true]:bg-accent/70",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" data-slot="list-view-selection-cell" className="hidden size-5 shrink-0 items-center justify-center rounded border border-input text-primary group-data-[selection-mode=multiple]/list-view:inline-flex group-data-[selection-mode=single]/list-view:rounded-full group-data-[selected=true]/list-view-item:border-primary group-data-[selected=true]/list-view-item:bg-primary/10">
        <IconCheck className="size-3 opacity-0 group-data-[selected=true]/list-view-item:opacity-100" />
      </span>
      {children}
    </AriaGridListItem>
  );
}

export function ListViewItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="list-view-item-content" className={cn("flex min-w-0 flex-1 items-center gap-3", className)} {...props} />;
}

export function ListViewTitle({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="list-view-title" className={cn("block truncate text-sm font-medium", className)} {...props} />;
}

export function ListViewDescription({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="list-view-description" className={cn("mt-0.5 block truncate text-xs text-muted-foreground", className)} {...props} />;
}

export function ListViewItemAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="list-view-item-action" className={cn("ml-auto flex shrink-0 items-center gap-1", className)} {...props} />;
}

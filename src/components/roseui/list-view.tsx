"use client";

import * as React from "react";

import { Check as IconCheck } from "lucide-react";

import { cn } from "@/lib/utils";

import type { Selection } from "./list-box";

type ListViewContextValue = {
  selected: Set<string | number>;
  selectionMode: "single" | "multiple" | "none";
  disabledKeys: Set<string | number>;
  toggle: (key: string | number) => void;
};
const ListViewContext = React.createContext<ListViewContextValue | null>(null);

type ListViewProps = Omit<React.ComponentProps<"div">, "children"> & {
  children?: React.ReactNode;
  selectionMode?: "single" | "multiple" | "none";
  selectedKeys?: Selection;
  defaultSelectedKeys?: Selection | string[];
  onSelectionChange?: (keys: Selection) => void;
  disabledKeys?: Iterable<string | number>;
  variant?: "primary" | "secondary";
  renderEmptyState?: () => React.ReactNode;
  disabled?: boolean;
};

export function ListView({
  className,
  variant = "primary",
  selectionMode = "none",
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  disabledKeys = [],
  renderEmptyState,
  children,
  disabled = false,
  ...props
}: ListViewProps) {
  const initial = defaultSelectedKeys === "all" ? new Set<string | number>() : new Set(defaultSelectedKeys ?? []);
  const [internal, setInternal] = React.useState(initial);
  const selected =
    selectedKeys === undefined ? internal : selectedKeys === "all" ? new Set<string | number>() : new Set(selectedKeys);
  const toggle = (key: string | number) => {
    if (disabled || selectionMode === "none") return;
    const next = new Set(selected);
    if (selectionMode === "single") {
      next.clear();
      next.add(key);
    } else if (next.has(key)) next.delete(key);
    else next.add(key);
    if (selectedKeys === undefined) setInternal(next);
    onSelectionChange?.(next);
  };
  const content = React.Children.count(children) ? children : renderEmptyState?.();
  return (
    <ListViewContext.Provider value={{ selected, selectionMode, disabledKeys: new Set(disabledKeys), toggle }}>
      <div
        role="listbox"
        aria-multiselectable={selectionMode === "multiple" || undefined}
        aria-disabled={disabled || undefined}
        data-slot="list-view"
        data-variant={variant}
        data-selection-mode={selectionMode}
        className={cn(
          "group/list-view min-h-0 w-full outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          variant === "primary" && "space-y-1 rounded-xl bg-muted/50 p-2",
          variant === "secondary" && "divide-y divide-border",
          className,
        )}
        {...props}
      >
        {content}
      </div>
    </ListViewContext.Provider>
  );
}

type ListViewItemProps = Omit<React.ComponentProps<"div">, "children" | "id"> & {
  id?: string | number;
  textValue?: string;
  children?: React.ReactNode;
  focusMode?: "row" | "child";
  allowsArrowNavigation?: boolean;
  disabled?: boolean;
};

export function ListViewItem({ className, children, id, disabled = false, ...props }: ListViewItemProps) {
  const context = React.useContext(ListViewContext);
  const selected = id !== undefined && (context?.selected.has(id) ?? false);
  const isDisabledValue = disabled || context?.disabledKeys.has(id ?? "") === true;
  return (
    <div
      {...props}
      id={id === undefined ? undefined : String(id)}
      role="option"
      aria-selected={selected}
      aria-disabled={isDisabledValue || undefined}
      tabIndex={isDisabledValue ? -1 : 0}
      data-slot="list-view-item"
      data-selected={selected || undefined}
      className={cn(
        "group/list-view-item flex min-w-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none transition-colors hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring/50 data-[selected=true]:bg-accent/70 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented && !isDisabledValue && id !== undefined) context?.toggle(id);
      }}
    >
      <span
        aria-hidden="true"
        data-slot="list-view-selection-cell"
        className={cn(
          "hidden size-5 shrink-0 items-center justify-center rounded border border-input text-primary",
          context?.selectionMode !== "none" && "inline-flex",
          context?.selectionMode === "single" && "rounded-full",
          selected && "border-primary bg-primary/10",
        )}
      >
        <IconCheck className={cn("size-3", selected ? "opacity-100" : "opacity-0")} />
      </span>
      {children}
    </div>
  );
}

export function ListViewItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="list-view-item-content"
      className={cn("flex min-w-0 flex-1 items-center gap-3", className)}
      {...props}
    />
  );
}
export function ListViewTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="list-view-title" className={cn("block truncate text-sm font-medium", className)} {...props} />
  );
}
export function ListViewDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="list-view-description"
      className={cn("mt-0.5 block truncate text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}
export function ListViewItemAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="list-view-item-action"
      className={cn("ml-auto flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  );
}

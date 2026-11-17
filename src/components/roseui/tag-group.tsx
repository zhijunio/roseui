"use client";

import * as React from "react";

import { X } from "lucide-react";

import { cn } from "@/lib/utils";

export type Key = string | number;
export type Selection = Set<Key> | "all";
type TagGroupContextValue = {
  selected: Set<Key>;
  selectionMode: "single" | "multiple" | "none";
  disabled: boolean;
  remove?: (keys: Set<Key>) => void;
  toggle: (key: Key) => void;
};
const TagGroupContext = React.createContext<TagGroupContextValue | null>(null);

type TagGroupProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  selectionMode?: "single" | "multiple" | "none";
  selectedKeys?: Selection;
  defaultSelectedKeys?: Selection | Key[];
  onSelectionChange?: (keys: Selection) => void;
  onRemove?: (keys: Set<Key>) => void;
  disabledKeys?: Set<Key>;
  disabled?: boolean;
};

export function TagGroup({
  className,
  children,
  selectionMode = "none",
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  onRemove,
  disabledKeys,
  disabled = false,
  ...props
}: TagGroupProps) {
  const initial = defaultSelectedKeys === "all" ? new Set<Key>() : new Set(defaultSelectedKeys ?? []);
  const [internal, setInternal] = React.useState(initial);
  const selected =
    selectedKeys === undefined ? internal : selectedKeys === "all" ? new Set<Key>() : new Set(selectedKeys);
  const toggle = (key: Key) => {
    if (selectionMode === "none" || disabled || disabledKeys?.has(key)) return;
    const next = new Set(selected);
    if (selectionMode === "single") {
      next.clear();
      next.add(key);
    } else if (next.has(key)) next.delete(key);
    else next.add(key);
    if (selectedKeys === undefined) setInternal(next);
    onSelectionChange?.(next);
  };
  return (
    <TagGroupContext.Provider value={{ selected, selectionMode, disabled: disabled, remove: onRemove, toggle }}>
      <div
        role="group"
        data-slot="control"
        aria-disabled={disabled || undefined}
        className={cn("flex flex-col gap-y-1 *:data-[slot=label]:font-medium", className)}
        {...props}
      >
        {children}
      </div>
    </TagGroupContext.Provider>
  );
}

type TagLike = { id: Key; name?: string };
type TagListProps<T extends TagLike> = Omit<React.ComponentProps<"div">, "children"> & {
  items?: Iterable<T>;
  children?: React.ReactNode | ((item: T) => React.ReactNode);
  renderEmptyState?: () => React.ReactNode;
};

export function TagList<T extends TagLike = TagLike>({
  className,
  children,
  items,
  renderEmptyState,
  ...props
}: TagListProps<T>) {
  const content =
    typeof children === "function"
      ? items
        ? Array.from(items, (item) => <React.Fragment key={String(item.id)}>{children(item)}</React.Fragment>)
        : null
      : children;
  return (
    <div data-slot="tag-list" className={cn("flex flex-wrap gap-1", className)} {...props}>
      {content ?? renderEmptyState?.()}
    </div>
  );
}

type TagProps = Omit<React.ComponentProps<"span">, "children"> & {
  id?: Key;
  href?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  textValue?: string;
};

export function Tag({ id, children, className, href, disabled = false, ...props }: TagProps) {
  const context = React.useContext(TagGroupContext);
  const selected = id !== undefined && (context?.selected.has(id) ?? false);
  const isDisabledValue = disabled || context?.disabled === true;
  const classes = cn(
    "inset-ring inset-ring-input outline-hidden inline-flex items-center gap-x-1.5 rounded-full px-2 py-0.5 font-medium text-xs/5 dark:bg-input/30 *:data-[slot=icon]:size-3 *:data-[slot=icon]:shrink-0",
    context?.remove && "pe-1",
    href && "cursor-pointer hover:inset-ring-muted-foreground",
    selected && "inset-ring-ring/70 bg-primary-subtle text-primary-subtle-foreground",
    isDisabledValue && "opacity-50",
    className,
  );
  const handleToggle = () => {
    if (id !== undefined) context?.toggle(id);
  };
  return (
    <span
      {...props}
      data-slot="tag"
      data-selected={selected || undefined}
      data-disabled={isDisabledValue || undefined}
      className={classes}
    >
      {href ? (
        <a href={href} onClick={handleToggle}>
          {children}
        </a>
      ) : context?.selectionMode !== "none" ? (
        <button type="button" role="option" aria-selected={selected} disabled={isDisabledValue} onClick={handleToggle}>
          {children}
        </button>
      ) : (
        <span>{children}</span>
      )}
      {context?.remove && id !== undefined && !isDisabledValue ? (
        <button
          type="button"
          aria-label={`Remove ${typeof children === "string" ? children : "tag"}`}
          className="inline-flex size-4 items-center justify-center"
          onClick={() => context.remove?.(new Set([id]))}
        >
          <X aria-hidden="true" className="size-3.5" />
        </button>
      ) : null}
    </span>
  );
}

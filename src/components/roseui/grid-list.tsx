"use client";

import * as React from "react";

import { Check as IconCheck } from "lucide-react";

import { useVirtualizer } from "@/components/roseui/virtualizer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Selection = Set<string | number> | "all";
type GridListContextValue = {
  selected: Set<string | number>;
  selectionMode: "single" | "multiple" | "none";
  disabled: boolean;
  readOnly: boolean;
  toggle: (key: string | number) => void;
  virtualIndexByKey: ReadonlyMap<string | number, number>;
};
const GridListContext = React.createContext<GridListContextValue | null>(null);
type ItemLike = { id?: string | number; key?: string | number; [key: string]: unknown };

export type GridListProps<T extends ItemLike = ItemLike> = Omit<React.ComponentProps<"div">, "children"> & {
  items?: Iterable<T>;
  children?: React.ReactNode | ((item: T) => React.ReactNode);
  selectionMode?: "single" | "multiple" | "none";
  selectedKeys?: Selection;
  defaultSelectedKeys?: Selection | string[];
  onSelectionChange?: (keys: Selection) => void;
  disabled?: boolean;
  readOnly?: boolean;
  renderEmptyState?: () => React.ReactNode;
  layout?: "stack" | "grid";
};

export function GridList<T extends ItemLike = ItemLike>({
  className,
  children,
  items,
  selectionMode = "none",
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  disabled = false,
  readOnly = false,
  renderEmptyState,
  layout = "stack",
  onFocus,
  onKeyDown,
  onScroll,
  ref,
  ...props
}: GridListProps<T>) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const itemList = React.useMemo(() => (items ? Array.from(items) : null), [items]);
  const staticChildren = React.useMemo(
    () => (typeof children === "function" ? null : React.Children.toArray(children)),
    [children],
  );
  const itemCount = itemList?.length ?? staticChildren?.length ?? 0;
  const virtualizer = useVirtualizer(itemCount);
  const start = virtualizer?.start ?? 0;
  const end = virtualizer?.end ?? itemCount;
  const visibleItems = itemList?.slice(start, end);
  const visibleChildren = staticChildren?.slice(start, end);
  const virtualIndexByKey = React.useMemo(() => {
    const indexes = new Map<string | number, number>();
    if (itemList) {
      itemList.forEach((item, index) => {
        indexes.set(item.id ?? item.key ?? "", index);
      });
    } else
      staticChildren?.forEach((child, index) => {
        if (React.isValidElement<{ id?: string | number }>(child))
          indexes.set(child.props.id ?? child.key ?? "", index);
      });
    return indexes;
  }, [itemList, staticChildren]);
  const initial = defaultSelectedKeys === "all" ? new Set<string | number>() : new Set(defaultSelectedKeys ?? []);
  const [internal, setInternal] = React.useState(initial);
  const selected =
    selectedKeys === undefined ? internal : selectedKeys === "all" ? new Set<string | number>() : new Set(selectedKeys);
  const toggle = (key: string | number) => {
    if (disabled || readOnly || selectionMode === "none") return;
    const next = new Set(selected);
    if (selectionMode === "single") {
      next.clear();
      next.add(key);
    } else if (next.has(key)) next.delete(key);
    else next.add(key);
    if (selectedKeys === undefined) setInternal(next);
    onSelectionChange?.(next);
  };
  const content =
    typeof children === "function"
      ? visibleItems?.map((item) => <React.Fragment key={String(item.id ?? item.key)}>{children(item)}</React.Fragment>)
      : virtualizer
        ? visibleChildren
        : children;
  const isEmpty = itemList ? itemList.length === 0 : staticChildren?.length === 0;
  const renderedContent = isEmpty ? renderEmptyState?.() : content;
  React.useLayoutEffect(() => {
    const element = listRef.current;
    if (!element || !virtualizer) return;
    virtualizer.registerViewport(element);
    return () => virtualizer.registerViewport(null);
  }, [virtualizer?.registerViewport]);
  const setListRef = React.useCallback(
    (element: HTMLDivElement | null) => {
      listRef.current = element;
      if (typeof ref === "function") ref(element);
      else if (ref) ref.current = element;
    },
    [ref],
  );
  return (
    <GridListContext.Provider
      value={{ selected, selectionMode, disabled: disabled, readOnly: readOnly, toggle, virtualIndexByKey }}
    >
      <div
        role="listbox"
        aria-multiselectable={selectionMode === "multiple" || undefined}
        aria-disabled={disabled || undefined}
        data-slot="grid-list"
        data-layout={layout}
        data-virtual-start={virtualizer ? start : undefined}
        tabIndex={0}
        className={cn(
          "relative divide-y overflow-hidden rounded-lg border bg-background sm:text-sm/6 dark:bg-muted",
          layout === "grid" && "grid",
          className,
        )}
        ref={setListRef}
        onScroll={(event) => {
          onScroll?.(event);
          virtualizer?.onScroll(event);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          if (event.target !== event.currentTarget) return;
          const option = event.currentTarget.querySelector<HTMLElement>("[role=option]:not([aria-disabled=true])");
          option?.focus();
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (
            event.defaultPrevented ||
            !["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
          )
            return;
          const options = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>("[role=option]:not([aria-disabled=true])"),
          );
          const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
          const activeOption = activeElement?.closest<HTMLElement>("[role=option]");
          const activeIndex = Number(activeOption?.dataset.virtualIndex);
          const current =
            virtualizer && Number.isInteger(activeIndex)
              ? activeIndex
              : activeOption
                ? options.indexOf(activeOption)
                : -1;
          const next =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? itemCount - 1
                : Math.min(
                    itemCount - 1,
                    Math.max(0, current + (["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1)),
                  );
          if (next >= 0) {
            event.preventDefault();
            const target =
              options.find((option) => Number(option.dataset.virtualIndex) === next) ?? options[next - start];
            if (target) target.focus();
            else virtualizer?.focusIndex(next);
          }
        }}
        {...props}
      >
        {virtualizer && virtualizer.topPadding > 0 && (
          <div role="presentation" aria-hidden="true" className="shrink-0" style={{ height: virtualizer.topPadding }} />
        )}
        {renderedContent}
        {virtualizer && virtualizer.bottomPadding > 0 && (
          <div
            role="presentation"
            aria-hidden="true"
            className="shrink-0"
            style={{ height: virtualizer.bottomPadding }}
          />
        )}
      </div>
    </GridListContext.Provider>
  );
}

export type GridListItemProps = Omit<React.ComponentProps<"div">, "children" | "id"> & {
  id?: string | number;
  textValue?: string;
  children?:
    | React.ReactNode
    | ((values: {
        isSelected: boolean;
        disabled: boolean;
        selectionMode: "single" | "multiple" | "none";
        selectionBehavior: "toggle";
        allowsDragging: false;
      }) => React.ReactNode);
  disabled?: boolean;
};

export function GridListItem({
  className,
  children,
  id,
  disabled = false,
  onClick,
  onKeyDown,
  ...props
}: GridListItemProps) {
  const context = React.useContext(GridListContext);
  const selected = id !== undefined && (context?.selected.has(id) ?? false);
  const isDisabledValue = disabled || context?.disabled === true;
  const values = {
    isSelected: selected,
    disabled: isDisabledValue,
    selectionMode: context?.selectionMode ?? "none",
    selectionBehavior: "toggle" as const,
    allowsDragging: false as const,
  };
  const content = typeof children === "function" ? children(values) : children;
  return (
    <div
      {...props}
      role="option"
      aria-selected={selected}
      aria-disabled={isDisabledValue || undefined}
      data-slot="grid-list-item"
      data-selected={selected || undefined}
      data-virtual-index={id === undefined ? undefined : context?.virtualIndexByKey.get(id)}
      tabIndex={-1}
      className={cn(
        "group relative flex min-w-0 cursor-default items-center gap-2 px-3 py-2.5 outline-none hover:bg-accent/50 data-[selected=true]:bg-accent/40 data-[selected=true]:text-foreground data-[selected=true]:hover:bg-accent/80 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled && id !== undefined) context?.toggle(id);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && !disabled && (event.key === "Enter" || event.key === " ") && id !== undefined) {
          event.preventDefault();
          context?.toggle(id);
        }
      }}
    >
      {context?.selectionMode === "multiple" && (
        <span
          aria-hidden="true"
          className={cn(
            "flex size-4 shrink-0 items-center justify-center rounded border border-input",
            selected && "border-primary bg-primary text-primary-foreground",
          )}
        >
          <IconCheck className={cn("size-3", selected ? "opacity-100" : "opacity-0")} />
        </span>
      )}
      {content}
    </div>
  );
}

export function GridListSection({ className, children, ...props }: React.ComponentProps<"section">) {
  return (
    <section role="group" data-slot="grid-list-section" className={cn("divide-y", className)} {...props}>
      {children}
    </section>
  );
}
export function GridListHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="grid-list-header" className={cn("px-3 py-2.5 text-sm/6 font-semibold", className)} {...props} />
  );
}
export function GridListEmptyState({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="grid-list-empty-state" className={cn("p-6", className)} {...props} />;
}
export function GridListLoadMoreItem({
  className,
  onLoadMore,
  isLoading = false,
  disabled = false,
  children,
  ...props
}: React.ComponentProps<"button"> & { onLoadMore?: () => void; isLoading?: boolean; disabled?: boolean }) {
  return (
    <div className={cn("flex justify-center p-3 text-sm text-muted-foreground", className)}>
      <Button type="button" variant="ghost" disabled={isLoading || disabled} onClick={onLoadMore} {...props}>
        {children}
      </Button>
    </div>
  );
}
export function GridListSpacer({ className, ...props }: React.ComponentProps<"div">) {
  return <div aria-hidden data-slot="grid-list-spacer" className={cn("-ms-4 flex-1", className)} {...props} />;
}
export function GridListStart({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="grid-list-start"
      className={cn("relative flex items-center gap-x-2.5 sm:gap-x-3", className)}
      {...props}
    />
  );
}
export function GridListLabel({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="grid-list-label" className={cn("font-medium", className)} {...props} />;
}
export function GridListDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="grid-list-description"
      className={cn("text-muted-foreground text-sm font-normal", className)}
      {...props}
    />
  );
}

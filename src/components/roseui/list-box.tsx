"use client";

import * as React from "react";

import { Check as IconCheck } from "lucide-react";

import { useVirtualizer } from "@/components/roseui/virtualizer";
import { cn } from "@/lib/utils";

export type Selection = Set<string | number> | "all";
type ListBoxContextValue = {
  selected: Set<string | number>;
  selectionMode: "single" | "multiple" | "none";
  disabled: boolean;
  toggle: (key: string | number) => void;
  virtualIndexByKey: ReadonlyMap<string | number, number>;
};
const ListBoxContext = React.createContext<ListBoxContextValue | null>(null);

type ItemLike = { id?: string | number; key?: string | number; [key: string]: unknown };
type ListBoxProps<T extends ItemLike = ItemLike> = Omit<React.ComponentProps<"div">, "children" | "onChange"> & {
  items?: Iterable<T>;
  children?: React.ReactNode | ((item: T) => React.ReactNode);
  selectionMode?: "single" | "multiple" | "none";
  selectedKeys?: Selection;
  defaultSelectedKeys?: Selection | string[];
  onSelectionChange?: (keys: Selection) => void;
  disabled?: boolean;
  readOnly?: boolean;
};

function ListBox<T extends ItemLike = ItemLike>({
  className,
  children,
  items,
  selectionMode = "none",
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  disabled = false,
  readOnly = false,
  onKeyDown,
  onScroll,
  ref,
  ...props
}: ListBoxProps<T>) {
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
    } else {
      staticChildren?.forEach((child, index) => {
        if (React.isValidElement<{ id?: string | number }>(child))
          indexes.set(child.props.id ?? child.key ?? "", index);
      });
    }
    return indexes;
  }, [itemList, staticChildren]);
  const initial =
    defaultSelectedKeys === "all" ? new Set<string | number>() : new Set(Array.from(defaultSelectedKeys ?? []));
  const [internalSelected, setInternalSelected] = React.useState(initial);
  const selected =
    selectedKeys === undefined
      ? internalSelected
      : selectedKeys === "all"
        ? new Set<string | number>()
        : new Set(Array.from(selectedKeys));
  const toggle = React.useCallback(
    (key: string | number) => {
      if (disabled || readOnly || selectionMode === "none") return;
      const next = new Set(selected);
      if (selectionMode === "single") {
        next.clear();
        next.add(key);
      } else if (next.has(key)) next.delete(key);
      else next.add(key);
      if (selectedKeys === undefined) setInternalSelected(next);
      onSelectionChange?.(next);
    },
    [disabled, readOnly, onSelectionChange, selected, selectedKeys, selectionMode],
  );
  const context = React.useMemo(
    () => ({ selected, selectionMode, disabled: disabled, toggle, virtualIndexByKey }),
    [selected, selectionMode, disabled, toggle, virtualIndexByKey],
  );
  const content =
    typeof children === "function"
      ? visibleItems?.map((item) => <React.Fragment key={String(item.id ?? item.key)}>{children(item)}</React.Fragment>)
      : virtualizer
        ? visibleChildren
        : children;

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
    <ListBoxContext.Provider value={context}>
      <div
        role="listbox"
        aria-multiselectable={selectionMode === "multiple" || undefined}
        aria-disabled={disabled || undefined}
        data-slot="list-box"
        data-virtual-start={virtualizer ? start : undefined}
        className={cn(
          "flex max-h-80 w-full min-w-48 flex-col gap-0.5 overflow-auto rounded-lg border bg-card p-1.5 outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          className,
        )}
        ref={setListRef}
        onScroll={(event) => {
          onScroll?.(event);
          virtualizer?.onScroll(event);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented || !["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
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
                : Math.min(itemCount - 1, Math.max(0, current + (event.key === "ArrowDown" ? 1 : -1)));
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
        {content}
        {virtualizer && virtualizer.bottomPadding > 0 && (
          <div
            role="presentation"
            aria-hidden="true"
            className="shrink-0"
            style={{ height: virtualizer.bottomPadding }}
          />
        )}
      </div>
    </ListBoxContext.Provider>
  );
}

type ListBoxItemProps = Omit<React.ComponentProps<"div">, "children" | "id"> & {
  id?: string | number;
  key?: string | number;
  children:
    | React.ReactNode
    | ((values: { isSelected: boolean; disabled: boolean; selectionMode: string }) => React.ReactNode);
  textValue?: string;
  disabled?: boolean;
  indicator?: React.ReactNode;
  variant?: "default" | "danger";
};

function ListBoxItem({
  id,
  className,
  children,
  disabled = false,
  indicator = <IconCheck aria-hidden="true" className="size-4" />,
  variant = "default",
  onClick,
  onKeyDown,
  ...props
}: ListBoxItemProps) {
  const context = React.useContext(ListBoxContext);
  const key = id ?? props.key ?? "";
  const isSelected = context?.selected.has(key) ?? false;
  const isDisabledValue = disabled || context?.disabled === true;
  const content =
    typeof children === "function"
      ? children({ isSelected, disabled: isDisabledValue, selectionMode: context?.selectionMode ?? "none" })
      : children;
  return (
    <div
      {...props}
      role="option"
      aria-selected={isSelected}
      aria-disabled={isDisabledValue || undefined}
      data-slot="list-box-item"
      data-virtual-index={context?.virtualIndexByKey.get(key)}
      data-selected={isSelected || undefined}
      data-variant={variant}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        "group/list-box-item relative flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm outline-none motion-safe:transition-colors hover:bg-accent hover:text-secondary-foreground focus-visible:bg-accent focus-visible:text-secondary-foreground data-[selected=true]:bg-accent data-[selected=true]:text-secondary-foreground disabled:pointer-events-none disabled:opacity-50",
        variant === "danger" && "text-destructive",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled) context?.toggle(key);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && !disabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          context?.toggle(key);
        }
      }}
    >
      {content}
      {context?.selectionMode !== "none" && (
        <span
          aria-hidden="true"
          data-slot="list-box-item-indicator"
          className={cn("ml-auto inline-flex shrink-0", isSelected ? "opacity-100" : "opacity-0")}
        >
          {indicator}
        </span>
      )}
    </div>
  );
}

type ListBoxSectionProps<T extends ItemLike = ItemLike> = Omit<React.ComponentProps<"div">, "title" | "children"> & {
  items?: Iterable<T>;
  title?: React.ReactNode;
  children?: React.ReactNode | ((item: T) => React.ReactNode);
};

function ListBoxSection<T extends ItemLike = ItemLike>({
  className,
  title,
  items,
  children,
  ...props
}: ListBoxSectionProps<T>) {
  const content =
    typeof children === "function"
      ? items
        ? Array.from(items, (item) => (
            <React.Fragment key={String(item.id ?? item.key)}>{children(item)}</React.Fragment>
          ))
        : null
      : children;
  return (
    <div
      role="group"
      aria-label={typeof title === "string" ? title : undefined}
      data-slot="list-box-section"
      className={cn("not-first:mt-1 not-first:border-t not-first:border-border", className)}
      {...props}
    >
      {title ? <h3 className="px-3 pb-1 pt-2 text-xs font-medium text-muted-foreground">{title}</h3> : null}
      {content}
    </div>
  );
}

function ListBoxHeader({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="list-box-header"
      className={cn("px-3 pb-1 pt-2 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  );
}

export { ListBox, ListBoxHeader, ListBoxItem, ListBoxSection };

"use client";

import { Children, createContext, Fragment, type ReactNode, useContext, useMemo, useState } from "react";

import { ChevronRight, Minus, Plus } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export type TreeSelection = Set<string | number> | "all";
export type TreeMove = { sourceId: string; targetId: string; position: "before" | "after" | "inside" };

type TreeVisualOptions = {
  size: "sm" | "default" | "lg";
  showGuides: boolean | "hover";
  expanderStyle: "chevron" | "plus-minus";
  reduceMotion: boolean;
};
type TreeRootContext = TreeVisualOptions & {
  selectionMode: "none" | "single" | "multiple";
  selectedKeys: TreeSelection;
  onSelectionChange?: (keys: TreeSelection) => void;
  expandedKeys: Set<string | number>;
  setExpandedKeys: (keys: Set<string | number>) => void;
  onItemMove?: (move: TreeMove) => void;
};
type TreeItemContextValue = {
  id: string | number;
  textValue: string;
  level: number;
  expanded: boolean;
  selected: boolean;
  disabled: boolean;
  hasChildren: boolean;
  toggleExpanded: () => void;
};
const TreeRootContext = createContext<TreeRootContext | null>(null);
const TreeItemContext = createContext<TreeItemContextValue | null>(null);

export type TreeProps<T extends object = Record<string, unknown>> = Omit<React.ComponentProps<"div">, "children"> & {
  children?: ReactNode | ((item: T) => ReactNode);
  items?: Iterable<T>;
  size?: TreeVisualOptions["size"];
  showGuides?: TreeVisualOptions["showGuides"];
  expanderStyle?: TreeVisualOptions["expanderStyle"];
  reduceMotion?: boolean;
  emptyState?: ReactNode;
  selectionMode?: "none" | "single" | "multiple";
  selectedKeys?: TreeSelection;
  defaultSelectedKeys?: Iterable<string | number>;
  onSelectionChange?: (keys: TreeSelection) => void;
  expandedKeys?: Iterable<string | number>;
  defaultExpandedKeys?: Iterable<string | number>;
  onExpandedChange?: (keys: Set<string | number>) => void;
  onItemMove?: (move: TreeMove) => void;
  "aria-label"?: string;
};

export function Tree<T extends object = Record<string, unknown>>({
  className,
  children,
  items,
  size = "default",
  showGuides = true,
  expanderStyle = "chevron",
  reduceMotion = false,
  emptyState = "No items.",
  selectionMode = "single",
  selectedKeys,
  defaultSelectedKeys = [],
  onSelectionChange,
  expandedKeys,
  defaultExpandedKeys = [],
  onExpandedChange,
  onItemMove,
  onFocus,
  ...props
}: TreeProps<T>) {
  const [internalSelected, setInternalSelected] = useState<TreeSelection>(() => new Set(defaultSelectedKeys));
  const [internalExpanded, setInternalExpanded] = useState(() => new Set<string | number>(defaultExpandedKeys));
  const selected = selectedKeys ?? internalSelected;
  const expanded = expandedKeys === undefined ? internalExpanded : new Set(expandedKeys);
  const itemList = items ? Array.from(items) : undefined;
  const context = useMemo<TreeRootContext>(
    () => ({
      size,
      showGuides,
      expanderStyle,
      reduceMotion,
      selectionMode,
      selectedKeys: selected,
      onSelectionChange: (next) => {
        if (selectedKeys === undefined) setInternalSelected(next);
        onSelectionChange?.(next);
      },
      expandedKeys: expanded,
      setExpandedKeys: (next) => {
        if (expandedKeys === undefined) setInternalExpanded(next);
        onExpandedChange?.(next);
      },
      onItemMove,
    }),
    [
      size,
      showGuides,
      expanderStyle,
      reduceMotion,
      selectionMode,
      selected,
      selectedKeys,
      onSelectionChange,
      expanded,
      expandedKeys,
      onExpandedChange,
      onItemMove,
    ],
  );
  const renderedChildren =
    typeof children === "function"
      ? itemList?.map((item, index) => <Fragment key={index}>{children(item)}</Fragment>)
      : children;

  return (
    <TreeRootContext.Provider value={context}>
      <div
        role="tree"
        tabIndex={0}
        data-slot="tree"
        className={cn("flex min-w-0 flex-col gap-y-1 overflow-auto outline-none", className)}
        onFocus={(event) => {
          onFocus?.(event);
          if (event.target !== event.currentTarget) return;
          const firstItem = Array.from(
            event.currentTarget.querySelectorAll<HTMLButtonElement>("[data-tree-item]"),
          ).find((button) => !button.disabled && !button.closest("[hidden]"));
          firstItem?.focus();
        }}
        {...props}
      >
        {itemList && itemList.length === 0 ? (
          <div className="p-3 text-sm text-muted-foreground">{emptyState}</div>
        ) : (
          renderedChildren
        )}
      </div>
    </TreeRootContext.Provider>
  );
}

export type TreeItemProps = Omit<React.ComponentProps<"div">, "children"> & {
  id: string | number;
  textValue?: string;
  children?: ReactNode;
  disabled?: boolean;
};

export function TreeItem({ id, textValue, children, disabled = false, className, ...props }: TreeItemProps) {
  const tree = useContext(TreeRootContext);
  const parent = useContext(TreeItemContext);
  if (!tree) throw new Error("TreeItem must be used within <Tree />");
  const childNodes = Children.toArray(children);
  const content = childNodes[0];
  const nestedChildren = childNodes.slice(1);
  const hasChildren = nestedChildren.length > 0;
  const expanded = tree.expandedKeys.has(id);
  const selected = tree.selectedKeys === "all" || tree.selectedKeys.has(id);
  const key = String(id);
  const toggleExpanded = () => {
    const next = new Set(tree.expandedKeys);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    tree.setExpandedKeys(next);
  };
  const context: TreeItemContextValue = {
    id,
    textValue: textValue ?? key,
    level: (parent?.level ?? 0) + 1,
    expanded,
    selected,
    disabled: disabled,
    hasChildren,
    toggleExpanded,
  };
  const move = (event: React.DragEvent<HTMLDivElement>, position: TreeMove["position"]) => {
    const sourceId = event.dataTransfer.getData("text/plain");
    if (sourceId && sourceId !== key) tree.onItemMove?.({ sourceId, targetId: key, position });
  };

  return (
    <TreeItemContext.Provider value={context}>
      <div
        role="treeitem"
        tabIndex={-1}
        aria-level={context.level}
        aria-expanded={hasChildren ? expanded : undefined}
        aria-selected={tree.selectionMode === "none" ? undefined : selected}
        aria-disabled={disabled || undefined}
        data-tree-node={key}
        data-slot="tree-item"
        className={cn("min-w-0", className)}
        draggable={Boolean(tree.onItemMove)}
        onDragStart={(event) => {
          event.dataTransfer.setData("text/plain", key);
          event.dataTransfer.effectAllowed = "move";
        }}
        onDragOver={(event) => {
          if (tree.onItemMove) event.preventDefault();
        }}
        onDrop={(event) => {
          event.preventDefault();
          move(event, hasChildren ? "inside" : "after");
        }}
        {...props}
      >
        {content}
        <div
          role="group"
          hidden={!expanded}
          className={cn(
            "ms-4 border-s border-border ps-2",
            tree.showGuides === "hover" && "opacity-70 hover:opacity-100",
          )}
        >
          {nestedChildren}
        </div>
      </div>
    </TreeItemContext.Provider>
  );
}

export type TreeContentProps = Omit<React.ComponentProps<"button">, "children"> & { children?: ReactNode };
export function TreeContent({ className, children, onKeyDown, onClick, ...props }: TreeContentProps) {
  const tree = useContext(TreeRootContext);
  const item = useContext(TreeItemContext);
  if (!tree || !item) throw new Error("TreeContent must be used inside <TreeItem />");
  const Expander = item.expanded ? Minus : Plus;
  const toggleSelection = () => {
    if (!tree.onSelectionChange || tree.selectionMode === "none" || item.disabled) return;
    if (tree.selectionMode === "single") {
      tree.onSelectionChange(new Set([item.id]));
      return;
    }
    const next = tree.selectedKeys === "all" ? new Set<string | number>() : new Set(tree.selectedKeys);
    if (next.has(item.id)) next.delete(item.id);
    else next.add(item.id);
    tree.onSelectionChange(next);
  };
  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-1.5",
        tree.size === "sm" && "text-xs",
        tree.size === "lg" && "text-base",
      )}
    >
      {tree.selectionMode === "multiple" && (
        <Checkbox
          aria-label={`Select ${item.textValue}`}
          checked={item.selected}
          disabled={item.disabled}
          onClick={(event) => event.stopPropagation()}
          onCheckedChange={toggleSelection}
        />
      )}
      {item.hasChildren ? (
        <button
          type="button"
          aria-label={`${item.expanded ? "Collapse" : "Expand"} ${item.textValue}`}
          aria-expanded={item.expanded}
          disabled={item.disabled}
          tabIndex={-1}
          onClick={item.toggleExpanded}
          className="grid size-6 shrink-0 place-content-center rounded hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
        >
          {tree.expanderStyle === "chevron" ? (
            <ChevronRight
              className={cn("size-4 transition-transform", item.expanded && !tree.reduceMotion && "rotate-90")}
            />
          ) : (
            <Expander className="size-3.5" />
          )}
        </button>
      ) : (
        <span className="size-6 shrink-0" aria-hidden="true" />
      )}
      <button
        type="button"
        data-tree-item="true"
        data-tree-id={String(item.id)}
        disabled={item.disabled}
        tabIndex={-1}
        aria-label={item.textValue}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          const allItems = Array.from(
            event.currentTarget.closest('[role="tree"]')?.querySelectorAll<HTMLButtonElement>("[data-tree-item]") ?? [],
          ).filter((button) => !button.closest("[hidden]") && !button.disabled);
          const index = allItems.indexOf(event.currentTarget);
          const treeItem = event.currentTarget.closest<HTMLElement>('[role="treeitem"]');
          const focusFirstChild = () =>
            treeItem?.querySelector<HTMLButtonElement>(":scope > [role=group] [data-tree-item]")?.focus();
          const focusParent = () =>
            treeItem?.parentElement
              ?.closest<HTMLElement>('[role="treeitem"]')
              ?.firstElementChild?.querySelector<HTMLButtonElement>("[data-tree-item]")
              ?.focus();
          if (event.key === "ArrowRight" && item.hasChildren) {
            event.preventDefault();
            if (!item.expanded) item.toggleExpanded();
            window.requestAnimationFrame(focusFirstChild);
            return;
          }
          if (event.key === "ArrowLeft") {
            if (item.hasChildren && item.expanded) {
              event.preventDefault();
              item.toggleExpanded();
              return;
            }
            event.preventDefault();
            focusParent();
            return;
          }
          const targetIndex = event.key === "ArrowDown" ? index + 1 : event.key === "ArrowUp" ? index - 1 : -1;
          if (targetIndex >= 0) {
            event.preventDefault();
            allItems[targetIndex]?.focus();
          }
          if (event.key === "Home") {
            event.preventDefault();
            allItems[0]?.focus();
          }
          if (event.key === "End") {
            event.preventDefault();
            allItems.at(-1)?.focus();
          }
        }}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) toggleSelection();
        }}
        className={cn(
          "flex min-h-8 min-w-0 flex-1 items-center gap-2 rounded-lg px-2 text-left text-sm outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
          item.selected && "bg-primary/10 text-foreground",
          item.disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        {...props}
      >
        {children ?? item.textValue}
      </button>
    </div>
  );
}

export type { TreeRootContext as TreeContextProps };

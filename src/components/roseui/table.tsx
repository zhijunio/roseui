"use client";

import type { ReactNode, Ref } from "react";
import * as React from "react";

import { ChevronDown } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type TableSelection = Set<string | number> | "all";
type TableContextValue = {
  allowResize: boolean;
  bleed: boolean;
  selectionMode: "single" | "multiple" | "none";
  selectedKeys: TableSelection;
  rowKeys: Set<string | number>;
  toggleSelection: (key: string | number) => void;
  setAllSelected: (selected: boolean) => void;
  registerRow: (key: string | number) => () => void;
  sortDescriptor?: TableSortDescriptor;
  onSortChange?: (descriptor: TableSortDescriptor) => void;
};
const TableContext = React.createContext<TableContextValue>({
  allowResize: false,
  bleed: false,
  selectionMode: "none",
  selectedKeys: new Set(),
  rowKeys: new Set(),
  toggleSelection: () => {},
  setAllSelected: () => {},
  registerRow: () => () => {},
});

export type TableSortDescriptor = { column: string | number; direction: "ascending" | "descending" };

export type TableProps = Omit<React.ComponentProps<"table">, "role" | "children"> & {
  allowResize?: boolean;
  bleed?: boolean;
  tableClassName?: string;
  children?: ReactNode;
  selectionMode?: "single" | "multiple" | "none";
  selectedKeys?: TableSelection;
  defaultSelectedKeys?: Iterable<string | number>;
  onSelectionChange?: (keys: TableSelection) => void;
  sortDescriptor?: TableSortDescriptor;
  onSortChange?: (descriptor: TableSortDescriptor) => void;
  role?: React.AriaRole;
  ref?: Ref<HTMLTableElement>;
};

export function Table({
  allowResize = false,
  className,
  bleed = false,
  tableClassName,
  children,
  ref,
  selectionMode = "none",
  selectedKeys,
  defaultSelectedKeys = [],
  onSelectionChange,
  sortDescriptor,
  onSortChange,
  style,
  ...props
}: TableProps) {
  const [internalSelected, setInternalSelected] = React.useState<TableSelection>(() => new Set(defaultSelectedKeys));
  const [rowKeys, setRowKeys] = React.useState<Set<string | number>>(() => new Set());
  const selected = selectedKeys ?? internalSelected;
  const changeSelection = React.useCallback(
    (next: TableSelection) => {
      if (selectedKeys === undefined) setInternalSelected(next);
      onSelectionChange?.(next);
    },
    [onSelectionChange, selectedKeys],
  );
  const registerRow = React.useCallback((key: string | number) => {
    setRowKeys((current) => (current.has(key) ? current : new Set(current).add(key)));
    return () =>
      setRowKeys((current) => {
        if (!current.has(key)) return current;
        const next = new Set(current);
        next.delete(key);
        return next;
      });
  }, []);
  const toggleSelection = React.useCallback(
    (key: string | number) => {
      if (selectionMode === "none") return;
      const next = selected === "all" ? new Set(rowKeys) : new Set(selected);
      if (selectionMode === "single") {
        next.clear();
        next.add(key);
      } else if (next.has(key)) next.delete(key);
      else next.add(key);
      changeSelection(next);
    },
    [changeSelection, rowKeys, selected, selectionMode],
  );
  const setAllSelected = React.useCallback(
    (isSelected: boolean) => {
      if (selectionMode !== "multiple") return;
      changeSelection(isSelected ? "all" : new Set());
    },
    [changeSelection, selectionMode],
  );
  const context = React.useMemo<TableContextValue>(
    () => ({
      allowResize,
      bleed,
      selectionMode,
      selectedKeys: selected,
      rowKeys,
      toggleSelection,
      setAllSelected,
      registerRow,
      sortDescriptor,
      onSortChange,
    }),
    [
      allowResize,
      bleed,
      onSortChange,
      registerRow,
      rowKeys,
      selected,
      selectionMode,
      setAllSelected,
      sortDescriptor,
      toggleSelection,
    ],
  );
  const tableStyle = allowResize ? { ...style, tableLayout: "fixed" as const } : style;
  const ariaLabel = props["aria-label"] ?? (props["aria-labelledby"] ? undefined : "Table");

  return (
    <TableContext.Provider value={context}>
      <div className="flow-root">
        <div
          className={cn(
            "relative -mx-(--gutter) overflow-x-auto whitespace-nowrap [--gutter:--spacing(4)] [--gutter-y:--spacing(2)]",
            className,
          )}
        >
          <div className={cn("inline-block min-w-full align-middle", !bleed && "sm:px-(--gutter)")}>
            <table
              ref={ref}
              aria-label={ariaLabel}
              aria-labelledby={props["aria-labelledby"]}
              data-slot="table"
              className={cn(
                "w-full min-w-full caption-bottom text-sm/6 outline-hidden [--table-selected-background:var(--color-secondary)]/50",
                tableClassName,
              )}
              style={tableStyle}
              {...props}
            >
              {children}
            </table>
          </div>
        </div>
      </div>
    </TableContext.Provider>
  );
}

export function ColumnResizer({
  className,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const drag = React.useRef<{ startX: number; startWidth: number; column: HTMLTableCellElement } | null>(null);
  return (
    <button
      type="button"
      aria-label="Resize column"
      data-slot="column-resizer"
      className={cn(
        "absolute end-0 top-0 bottom-0 grid w-2 touch-none place-content-center cursor-col-resize",
        className,
      )}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        event.stopPropagation();
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (event.defaultPrevented) return;
        const column = event.currentTarget.closest("th");
        if (!column) return;
        event.preventDefault();
        event.stopPropagation();
        drag.current = {
          startX: event.clientX,
          startWidth: column.getBoundingClientRect().width,
          column,
        };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        const current = drag.current;
        if (!current) return;
        const direction = window.getComputedStyle(current.column).direction;
        const delta = direction === "rtl" ? current.startX - event.clientX : event.clientX - current.startX;
        const width = Math.max(64, current.startWidth + delta);
        current.column.style.width = `${width}px`;
        current.column.style.minWidth = `${width}px`;
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        drag.current = null;
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event);
        drag.current = null;
      }}
    >
      <span className="bg-border h-full w-px" />
    </button>
  );
}

type TableBodyProps<T> = Omit<React.ComponentProps<"tbody">, "children"> & {
  items?: Iterable<T>;
  children?: ReactNode | ((item: T) => ReactNode);
  renderEmptyState?: () => ReactNode;
  onLoadMore?: () => void;
  isLoading?: boolean;
};
export function TableBody<T>({
  children,
  items,
  renderEmptyState,
  onLoadMore,
  isLoading = false,
  ...props
}: TableBodyProps<T>) {
  const itemList = items ? Array.from(items) : null;
  const content =
    typeof children === "function"
      ? itemList?.map((item, index) => <React.Fragment key={index}>{children(item)}</React.Fragment>)
      : children;
  const isEmpty = itemList !== null && itemList.length === 0;
  return (
    <tbody data-slot="table-body" {...props}>
      {isEmpty && renderEmptyState ? (
        <TableRow>
          <TableCell colSpan={100}>{renderEmptyState()}</TableCell>
        </TableRow>
      ) : (
        content
      )}
      {onLoadMore && <TableLoadMoreItem onLoadMore={onLoadMore} isLoading={isLoading} />}
    </tbody>
  );
}

export type TableColumnProps = Omit<React.ComponentProps<"th">, "children"> & {
  children?: ReactNode;
  isResizable?: boolean;
  isRowHeader?: boolean;
  allowsSorting?: boolean;
  textValue?: string;
};
export function TableColumn({
  className,
  children,
  id,
  isResizable = false,
  isRowHeader = false,
  allowsSorting = false,
  onClick,
  ...props
}: TableColumnProps) {
  const { allowResize, bleed, sortDescriptor, onSortChange } = React.useContext(TableContext);
  const currentSort = sortDescriptor && sortDescriptor.column === id ? sortDescriptor.direction : undefined;
  const sort = () => {
    if (!onSortChange || id === undefined) return;
    onSortChange({ column: id, direction: currentSort === "ascending" ? "descending" : "ascending" });
  };
  const sortable = allowsSorting && (onSortChange !== undefined || onClick !== undefined);
  return (
    <th
      id={id}
      scope={isRowHeader ? "col" : undefined}
      aria-sort={currentSort}
      data-slot="table-column"
      data-sortable={allowsSorting || undefined}
      onClick={onClick}
      className={cn(
        "relative px-4 py-(--gutter-y) text-start font-medium text-muted-foreground",
        "first:ps-(--gutter,--spacing(2)) last:pe-(--gutter,--spacing(2))",
        !bleed && "sm:first:ps-1 sm:last:pe-1",
        isResizable && "truncate overflow-hidden",
        sortable && "cursor-pointer",
        className,
      )}
      {...props}
    >
      <span className="flex items-center gap-2">
        {sortable ? (
          <button type="button" className="inline-flex min-w-0 items-center gap-2 text-start" onClick={sort}>
            {children}
          </button>
        ) : (
          children
        )}
        {allowsSorting && (
          <span
            aria-hidden="true"
            className="grid size-[1.15rem] place-content-center rounded bg-secondary text-foreground"
          >
            <ChevronDown className={cn("size-3.5", currentSort === "ascending" && "rotate-180")} />
          </span>
        )}
        {isResizable && allowResize && <ColumnResizer />}
      </span>
    </th>
  );
}

type TableHeaderProps = Omit<React.ComponentProps<"thead">, "children"> & { children?: ReactNode };
export function TableHeader({ className, children, ...props }: TableHeaderProps) {
  const { selectionMode, selectedKeys, rowKeys, setAllSelected } = React.useContext(TableContext);
  const selectedSet = selectedKeys === "all" ? null : selectedKeys;
  const selectedCount = selectedSet === null ? rowKeys.size : [...rowKeys].filter((key) => selectedSet.has(key)).length;
  const allSelected = selectedKeys === "all" || (rowKeys.size > 0 && selectedCount === rowKeys.size);
  const someSelected = selectedCount > 0 && !allSelected;
  return (
    <thead data-slot="table-header" className={cn("border-b", className)} {...props}>
      <tr>
        {selectionMode !== "none" && (
          <th scope="col" className="w-10 px-2">
            {selectionMode === "multiple" && (
              <Checkbox
                aria-label="Select all rows"
                checked={someSelected ? "indeterminate" : allSelected}
                onCheckedChange={(checked) => setAllSelected(checked === true)}
              />
            )}
          </th>
        )}
        {children}
      </tr>
    </thead>
  );
}

export type TableRowProps = Omit<React.ComponentProps<"tr">, "children"> & {
  children?: ReactNode;
  href?: string;
  onAction?: () => void;
  disabled?: boolean;
};
export function TableRow({
  className,
  children,
  href,
  onAction,
  disabled = false,
  id,
  onClick,
  ...props
}: TableRowProps) {
  const table = React.useContext(TableContext);
  const selected = id !== undefined && (table.selectedKeys === "all" || table.selectedKeys.has(id));
  React.useEffect(
    () => (id === undefined || table.selectionMode === "none" ? undefined : table.registerRow(id)),
    [id, table.registerRow, table.selectionMode],
  );
  const select = (event: React.MouseEvent<HTMLTableRowElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || disabled) return;
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest("button, a, input, select, textarea")) return;
    if (href) window.location.href = href;
    onAction?.();
    if (id !== undefined && table.selectionMode !== "none") table.toggleSelection(id);
  };
  return (
    <tr
      id={id}
      aria-selected={table.selectionMode === "none" ? undefined : selected}
      data-slot="table-row"
      data-disabled={disabled || undefined}
      data-selected={selected || undefined}
      className={cn(
        "group relative border-b text-muted-foreground outline-transparent ring-primary last:border-b-0",
        (href || onAction || table.selectionMode !== "none") &&
          "cursor-pointer hover:bg-secondary/50 hover:text-foreground",
        selected && "bg-secondary/50 text-foreground",
        disabled && "opacity-50",
        className,
      )}
      onClick={select}
      {...props}
    >
      {table.selectionMode !== "none" && (
        <TableCell className="w-10 px-2">
          <Checkbox
            aria-label={id === undefined ? "Select row" : `Select row ${id}`}
            checked={selected}
            disabled={disabled || id === undefined}
            onClick={(event) => event.stopPropagation()}
            onCheckedChange={() => {
              if (id !== undefined) table.toggleSelection(id);
            }}
          />
        </TableCell>
      )}
      {children}
    </tr>
  );
}

export type TableCellProps = React.ComponentProps<"td"> & { ref?: Ref<HTMLTableCellElement> };
export function TableCell({ className, ref, ...props }: TableCellProps) {
  const { bleed } = React.useContext(TableContext);
  return (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn(
        "px-4 py-(--gutter-y) align-middle outline-hidden first:ps-(--gutter,--spacing(2)) last:pe-(--gutter,--spacing(2))",
        !bleed && "sm:first:ps-1 sm:last:pe-1",
        className,
      )}
      {...props}
    />
  );
}

export function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return <tfoot data-slot="table-footer" className={cn("**:font-semibold", className)} {...props} />;
}

export function TableLoadMoreItem({
  className,
  onLoadMore,
  isLoading = false,
  children = "Load more",
  ...props
}: React.ComponentProps<"tr"> & { onLoadMore?: () => void; isLoading?: boolean; children?: ReactNode }) {
  return (
    <tr
      data-slot="table-load-more-item"
      className={cn("text-muted-foreground text-center text-sm", className)}
      {...props}
    >
      <td colSpan={100} className="py-3">
        <button type="button" onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? "Loading…" : children}
        </button>
      </td>
    </tr>
  );
}

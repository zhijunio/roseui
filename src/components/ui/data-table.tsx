"use client";

import * as React from "react";

import { SlidersHorizontal as IconAdjustmentsHorizontal, ArrowDown as IconArrowDown, ArrowUpDown as IconArrowsSort, ArrowUp as IconArrowUp, ChevronLeft as IconChevronLeft, ChevronRight as IconChevronRight, ChevronsLeft as IconChevronsLeft, ChevronsRight as IconChevronsRight, Search as IconSearch } from "lucide-react";
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  functionalUpdate,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type OnChangeFn,
  type PaginationState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  MenuTrigger,
  Menu,
  MenuHeader,
  MenuItem,
  MenuSeparator,
} from "@/components/ui/menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  toolbar?: React.ReactNode;
  isPending?: boolean;
  emptyState?: React.ReactNode;
  errorState?: React.ReactNode;
  pageSize?: number;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  manualPagination?: boolean;
  pageCount?: number;
  totalRowCount?: number;
  showPagination?: boolean;
  className?: string;
}

type TableScrollState = "none" | "start" | "middle" | "end";

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search…",
  toolbar,
  isPending = false,
  emptyState = "No results.",
  errorState,
  pageSize = 8,
  pagination,
  onPaginationChange,
  manualPagination = false,
  pageCount,
  totalRowCount,
  showPagination = true,
  className,
}: DataTableProps<TData, TValue>) {
  "use no memo";

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [internalPagination, setInternalPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  const paginationState = pagination ?? internalPagination;
  const handlePaginationChange = React.useCallback<OnChangeFn<PaginationState>>(
    (updater) => {
      if (pagination === undefined) {
        setInternalPagination((currentPagination) => functionalUpdate(updater, currentPagination));
      }
      onPaginationChange?.(updater);
    },
    [onPaginationChange, pagination],
  );

  // TanStack Table's stateful API is intentionally left uncompiled; memoizing
  // its returned callbacks can make the table render stale data.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection, pagination: paginationState },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: handlePaginationChange,
    manualPagination,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const rows = table.getRowModel().rows;
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const totalCount = totalRowCount ?? table.getFilteredRowModel().rows.length;
  const tablePageCount = table.getPageCount();
  const currentPage = tablePageCount > 0 ? paginationState.pageIndex + 1 : 1;
  const visiblePageCount = Math.max(1, tablePageCount);
  const pageSizeOptions = [...new Set([8, 10, 20, 50, paginationState.pageSize])].sort((a, b) => a - b);
  const rowHeaderColumnId = table.getAllLeafColumns().find((column) => column.id !== "select")?.id;
  const tableFrameRef = React.useRef<HTMLDivElement>(null);
  const [tableScrollState, setTableScrollState] = React.useState<TableScrollState>("none");

  React.useEffect(() => {
    const frame = tableFrameRef.current;
    const scroller = frame?.querySelector<HTMLElement>('[data-slot="table-container"]');
    if (!scroller) return;

    let animationFrame = 0;
    const updateScrollState = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        if (maxScroll <= 1) {
          setTableScrollState("none");
          return;
        }
        const atStart = scroller.scrollLeft <= 1;
        const atEnd = scroller.scrollLeft >= maxScroll - 1;
        setTableScrollState(atStart ? "start" : atEnd ? "end" : "middle");
      });
    };

    updateScrollState();
    scroller.addEventListener("scroll", updateScrollState, { passive: true });
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateScrollState);
    resizeObserver?.observe(scroller);
    if (scroller.firstElementChild) resizeObserver?.observe(scroller.firstElementChild);

    return () => {
      cancelAnimationFrame(animationFrame);
      scroller.removeEventListener("scroll", updateScrollState);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <div data-slot="data-table" className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {searchKey && (
          <div className="relative sm:max-w-xs">
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
              placeholder={searchPlaceholder}
              className="pl-9"
            />
          </div>
        )}
        <div className="flex items-center gap-2 sm:ml-auto">
          {toolbar}
          <MenuTrigger>

              <Button variant="outline" size="sm">
                <IconAdjustmentsHorizontal className="size-4" />
                View
              </Button>

            <Menu placement="bottom end" className="w-44">
              <MenuHeader>Toggle columns</MenuHeader>
              <MenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <MenuItem
                    key={column.id}
                    className="capitalize"
                    onAction={() => column.toggleVisibility(!column.getIsVisible())}
                  >
                    {column.id}
                  </MenuItem>
                ))}
            </Menu>
          </MenuTrigger>
        </div>
      </div>

      <div
        ref={tableFrameRef}
        aria-busy={isPending || undefined}
        data-pending={isPending || undefined}
        className="relative overflow-hidden rounded-lg border"
      >
        <Table
          aria-label="Data table"
          tableClassName={cn("min-w-[800px]", isPending && rows.length > 0 && "opacity-60")}
        >
          <TableHeader>
            {table.getHeaderGroups().at(-1)?.headers.map((header) => (
              <TableColumn key={header.id} id={header.id} isRowHeader={header.column.id === rowHeaderColumnId}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {errorState ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-28 text-center">
                  <div role="alert" className="mx-auto max-w-md text-destructive">
                    {errorState}
                  </div>
                </TableCell>
              </TableRow>
            ) : isPending && rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-28 text-center">
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Spinner size="sm" label="Loading rows" />
                    Loading rows…
                  </span>
                </TableCell>
              </TableRow>
            ) : rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-28 text-center text-muted-foreground">
                  {emptyState}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {(tableScrollState === "start" || tableScrollState === "middle") && (
          <span
            aria-hidden="true"
            className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l to-transparent sm:hidden"
          />
        )}
        {(tableScrollState === "end" || tableScrollState === "middle") && (
          <span
            aria-hidden="true"
            className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r to-transparent sm:hidden"
          />
        )}
      </div>

      {showPagination && (
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {errorState
              ? "Rows could not be loaded"
              : selectedCount > 0
                ? `${selectedCount} of ${totalCount} row(s) selected`
                : `${totalCount} row(s)`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page</span>
              <Select
                value={`${paginationState.pageSize}`}
                onValueChange={(value) =>
                  table.setPageSize(Number(value))
                }
              >
                <SelectTrigger size="sm" className="w-[72px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((option) => (
                    <SelectItem key={option} value={`${option}`}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {visiblePageCount}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="First page"
                onPress={() => table.setPageIndex(0)}
                isDisabled={!table.getCanPreviousPage()}
              >
                <IconChevronsLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Previous page"
                onPress={() => table.previousPage()}
                isDisabled={!table.getCanPreviousPage()}
              >
                <IconChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Next page"
                onPress={() => table.nextPage()}
                isDisabled={!table.getCanNextPage()}
              >
                <IconChevronRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Last page"
                onPress={() => table.setPageIndex(tablePageCount - 1)}
                isDisabled={!table.getCanNextPage()}
              >
                <IconChevronsRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Sortable column header button — use in a column's `header`. */
export function SortableHeader<TData, TValue>({ column, title }: { column: Column<TData, TValue>; title: string }) {
  const sorted = column.getIsSorted();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 data-[state=open]:bg-accent"
      onPress={() => column.toggleSorting(sorted === "asc")}
    >
      {title}
      {sorted === "asc" ? (
        <IconArrowUp className="size-3.5" />
      ) : sorted === "desc" ? (
        <IconArrowDown className="size-3.5" />
      ) : (
        <IconArrowsSort className="size-3.5 text-muted-foreground" />
      )}
    </Button>
  );
}

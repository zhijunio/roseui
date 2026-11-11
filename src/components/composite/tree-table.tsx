"use client";

import { type KeyboardEvent, type ReactNode, useRef, useState } from "react";

import { IconChevronRight, IconRefresh } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type TreeTableNode<Row> = {
  id: string;
  data: Row;
  children?: readonly TreeTableNode<Row>[];
  hasChildren?: boolean;
  disabled?: boolean;
};

export type TreeTableColumn<Row> = {
  id: string;
  label: string;
  render: (row: Row) => ReactNode;
  sortValue?: (row: Row) => string | number;
};

type VisibleNode<Row> = {
  node: TreeTableNode<Row>;
  parentId: string | null;
  depth: number;
  position: number;
  setSize: number;
};

type SortState = {
  columnId: string;
  direction: "ascending" | "descending";
};

export function TreeTable<Row>({
  rows,
  columns,
  rowLabel,
  ariaLabel,
  defaultExpandedIds = [],
  selectedIds,
  defaultSelectedIds = [],
  onSelectionChange,
  loadChildren,
}: {
  rows: readonly TreeTableNode<Row>[];
  columns: readonly TreeTableColumn<Row>[];
  rowLabel: (row: Row) => string;
  ariaLabel: string;
  defaultExpandedIds?: readonly string[];
  selectedIds?: readonly string[];
  defaultSelectedIds?: readonly string[];
  onSelectionChange?: (ids: string[]) => void;
  loadChildren?: (node: TreeTableNode<Row>) => Promise<readonly TreeTableNode<Row>[]>;
}) {
  const [internalExpanded, setInternalExpanded] = useState(() => new Set(defaultExpandedIds));
  const [internalSelected, setInternalSelected] = useState(() => new Set(defaultSelectedIds));
  const [loadedChildren, setLoadedChildren] = useState<ReadonlyMap<string, readonly TreeTableNode<Row>[]>>(
    () => new Map(),
  );
  const [loadingIds, setLoadingIds] = useState(() => new Set<string>());
  const [loadErrors, setLoadErrors] = useState<ReadonlyMap<string, string>>(() => new Map());
  const [sort, setSort] = useState<SortState | null>(null);
  const [focusedId, setFocusedId] = useState(rows[0]?.id ?? "");
  const rowRefs = useRef(new Map<string, HTMLTableRowElement>());
  const expanded = internalExpanded;
  const selected = selectedIds ? new Set(selectedIds) : internalSelected;

  function childrenFor(node: TreeTableNode<Row>): readonly TreeTableNode<Row>[] {
    return loadedChildren.get(node.id) ?? node.children ?? [];
  }

  function hasChildren(node: TreeTableNode<Row>): boolean {
    return Boolean(node.hasChildren || childrenFor(node).length);
  }

  function sortSiblings(items: readonly TreeTableNode<Row>[]): readonly TreeTableNode<Row>[] {
    if (!sort) return items;
    const column = columns.find((item) => item.id === sort.columnId);
    if (!column?.sortValue) return items;
    const direction = sort.direction === "ascending" ? 1 : -1;
    return [...items].sort((left, right) => {
      const a = column.sortValue?.(left.data);
      const b = column.sortValue?.(right.data);
      const compare =
        typeof a === "number" && typeof b === "number"
          ? a - b
          : String(a ?? "").localeCompare(String(b ?? ""), undefined, {
              numeric: true,
              sensitivity: "base",
            });
      return compare * direction;
    });
  }

  const visibleNodes = (() => {
    const result: VisibleNode<Row>[] = [];
    function visit(items: readonly TreeTableNode<Row>[], depth: number, parentId: string | null) {
      const siblings = sortSiblings(items);
      siblings.forEach((node, index) => {
        result.push({
          node,
          parentId,
          depth,
          position: index + 1,
          setSize: siblings.length,
        });
        if (expanded.has(node.id)) visit(sortSiblings(childrenFor(node)), depth + 1, node.id);
      });
    }
    visit(rows, 1, null);
    return result;
  })();

  const focusableId = visibleNodes.some(({ node }) => node.id === focusedId)
    ? focusedId
    : (visibleNodes[0]?.node.id ?? "");

  function setExpanded(id: string, nextExpanded: boolean) {
    setInternalExpanded((current) => {
      const next = new Set(current);
      if (nextExpanded) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  async function expandNode(node: TreeTableNode<Row>) {
    const hasLoaded = loadedChildren.has(node.id) || Boolean(node.children?.length);
    if (node.hasChildren && !hasLoaded && loadChildren) {
      setLoadingIds((current) => new Set(current).add(node.id));
      setLoadErrors((current) => {
        const next = new Map(current);
        next.delete(node.id);
        return next;
      });
      try {
        const children = await loadChildren(node);
        setLoadedChildren((current) => new Map(current).set(node.id, children));
        if (selected.has(node.id)) {
          const collectLoadedIds = (items: readonly TreeTableNode<Row>[]): string[] =>
            items.flatMap((item) => [item.id, ...collectLoadedIds(item.children ?? [])]);
          const inherited = new Set(selected);
          collectLoadedIds(children).forEach((id) => {
            inherited.add(id);
          });
          if (!selectedIds) setInternalSelected(inherited);
          onSelectionChange?.([...inherited]);
        }
        setExpanded(node.id, true);
      } catch {
        setLoadErrors((current) => new Map(current).set(node.id, "Could not load child rows. Try again."));
      } finally {
        setLoadingIds((current) => {
          const next = new Set(current);
          next.delete(node.id);
          return next;
        });
      }
      return;
    }
    setExpanded(node.id, true);
  }

  function descendantIds(node: TreeTableNode<Row>): string[] {
    if (node.disabled) return [];
    return [node.id, ...childrenFor(node).flatMap(descendantIds)];
  }

  function toggleSelection(node: TreeTableNode<Row>) {
    const ids = descendantIds(node);
    const shouldSelect = ids.some((id) => !selected.has(id));
    const next = new Set(selected);
    ids.forEach((id) => {
      if (shouldSelect) {
        next.add(id);
      } else {
        next.delete(id);
      }
    });
    if (!selectedIds) setInternalSelected(next);
    onSelectionChange?.([...next]);
  }

  function checkedState(node: TreeTableNode<Row>): boolean | "indeterminate" {
    const ids = descendantIds(node);
    const checkedCount = ids.filter((id) => selected.has(id)).length;
    if (checkedCount === 0) return false;
    return checkedCount === ids.length ? true : "indeterminate";
  }

  function focusRow(id: string | undefined) {
    if (!id) return;
    setFocusedId(id);
    rowRefs.current.get(id)?.focus();
  }

  function onRowKeyDown(entry: VisibleNode<Row>, event: KeyboardEvent<HTMLTableRowElement>) {
    if (event.target !== event.currentTarget) return;
    const currentIndex = visibleNodes.findIndex(({ node }) => node.id === entry.node.id);
    const nextId = visibleNodes[currentIndex + 1]?.node.id;
    const previousId = visibleNodes[currentIndex - 1]?.node.id;
    const isExpanded = expanded.has(entry.node.id);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusRow(nextId);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusRow(previousId);
        break;
      case "Home":
        event.preventDefault();
        focusRow(visibleNodes[0]?.node.id);
        break;
      case "End":
        event.preventDefault();
        focusRow(visibleNodes.at(-1)?.node.id);
        break;
      case "ArrowRight":
        if (hasChildren(entry.node) && !isExpanded) {
          event.preventDefault();
          void expandNode(entry.node);
        } else if (isExpanded) {
          event.preventDefault();
          focusRow(nextId);
        }
        break;
      case "ArrowLeft":
        if (isExpanded) {
          event.preventDefault();
          setExpanded(entry.node.id, false);
        } else if (entry.parentId) {
          event.preventDefault();
          focusRow(entry.parentId);
        }
        break;
      case "Enter":
        if (hasChildren(entry.node)) {
          event.preventDefault();
          if (isExpanded) setExpanded(entry.node.id, false);
          else void expandNode(entry.node);
        }
        break;
      case " ":
        event.preventDefault();
        toggleSelection(entry.node);
        break;
    }
  }

  function toggleSort(column: TreeTableColumn<Row>) {
    if (!column.sortValue) return;
    setSort((current) =>
      current?.columnId === column.id
        ? {
            columnId: column.id,
            direction: current.direction === "ascending" ? "descending" : "ascending",
          }
        : { columnId: column.id, direction: "ascending" },
    );
  }

  return (
    <div className="grid min-w-0 gap-2">
      <Table aria-label={ariaLabel} role="treegrid" aria-colcount={columns.length + 2}>
        <TableHeader>
          <TableRow role="row">
            <TableHead role="columnheader" className="w-10">
              <span className="sr-only">Select</span>
            </TableHead>
            <TableHead role="columnheader">Record</TableHead>
            {columns.map((column) => {
              const direction = sort?.columnId === column.id ? sort.direction : "none";
              return (
                <TableHead key={column.id} role="columnheader" aria-sort={direction}>
                  {column.sortValue ? (
                    <Button variant="ghost" size="sm" className="-ml-2" onClick={() => toggleSort(column)}>
                      {column.label}
                      <span className="sr-only">
                        {direction === "ascending"
                          ? ", sorted ascending"
                          : direction === "descending"
                            ? ", sorted descending"
                            : ", not sorted"}
                      </span>
                    </Button>
                  ) : (
                    column.label
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleNodes.map((entry) => {
            const { node, depth, position, setSize } = entry;
            const label = rowLabel(node.data);
            const canExpand = hasChildren(node);
            const isExpanded = expanded.has(node.id);
            const isLoading = loadingIds.has(node.id);
            const error = loadErrors.get(node.id);
            const checked = checkedState(node);
            return (
              <TableRow
                key={node.id}
                id={`tree-table-row-${node.id}`}
                ref={(element) => {
                  if (element) rowRefs.current.set(node.id, element);
                  else rowRefs.current.delete(node.id);
                }}
                role="row"
                aria-level={depth}
                aria-posinset={position}
                aria-setsize={setSize}
                aria-expanded={canExpand ? isExpanded : undefined}
                aria-selected={checked === true}
                tabIndex={focusableId === node.id ? 0 : -1}
                onFocus={() => setFocusedId(node.id)}
                onKeyDown={(event) => onRowKeyDown(entry, event)}
              >
                <TableCell role="gridcell" className="w-10 px-2">
                  <Checkbox
                    aria-label={`Select ${label} and its child rows`}
                    checked={checked}
                    disabled={node.disabled}
                    onCheckedChange={() => toggleSelection(node)}
                  />
                </TableCell>
                <TableCell role="gridcell" className="min-w-52">
                  <div className="grid gap-1" style={{ paddingInlineStart: `${(depth - 1) * 1.25}rem` }}>
                    <div className="flex min-w-0 items-center gap-2">
                      {canExpand ? (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${label}`}
                          aria-expanded={isExpanded}
                          disabled={isLoading || node.disabled}
                          onClick={() => (isExpanded ? setExpanded(node.id, false) : void expandNode(node))}
                        >
                          <IconChevronRight
                            className={`size-4 transition-transform motion-reduce:transition-none ${isExpanded ? "rotate-90" : ""}`}
                          />
                        </Button>
                      ) : (
                        <span className="size-8 shrink-0" aria-hidden="true" />
                      )}
                      <span className="truncate font-medium">{label}</span>
                      {isLoading && (
                        <span className="text-xs text-muted-foreground" role="status">
                          Loading…
                        </span>
                      )}
                    </div>
                    {error && (
                      <span className="flex items-center gap-2 text-xs text-destructive" role="alert">
                        {error}
                        <Button size="sm" variant="outline" onClick={() => void expandNode(node)}>
                          <IconRefresh className="size-3.5" />
                          Retry
                        </Button>
                      </span>
                    )}
                  </div>
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id} role="gridcell">
                    {column.render(node.data)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
          {!visibleNodes.length && (
            <TableRow>
              <TableCell colSpan={columns.length + 2} className="py-8 text-center text-muted-foreground">
                No rows to display.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <p className="sr-only" aria-live="polite">
        {selected.size} rows selected.
      </p>
      <p className="text-xs text-muted-foreground">
        Use the arrow keys to move between rows, expand or collapse branches, and press Space to select a row and its
        descendants.
      </p>
    </div>
  );
}

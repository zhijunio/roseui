"use client";

import { useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { IconChevronRight, IconCopy } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

type JsonEntry = {
  key: string;
  value: JsonValue;
  path: string;
};

function entriesFor(value: JsonValue, path: string): JsonEntry[] {
  if (Array.isArray(value)) {
    return value.map((entry, index) => ({ key: `[${index}]`, value: entry, path: `${path}[${index}]` }));
  }
  if (value !== null && typeof value === "object") {
    return Object.entries(value).map(([key, entry]) => ({ key, value: entry, path: `${path}[${JSON.stringify(key)}]` }));
  }
  return [];
}

function isExpandable(value: JsonValue): boolean {
  return value !== null && typeof value === "object";
}

function matches(value: JsonValue, query: string): boolean {
  if (!query) return true;
  if (value === null || typeof value !== "object") return String(value).toLocaleLowerCase().includes(query);
  if (Array.isArray(value)) return value.some((entry) => matches(entry, query));
  return Object.entries(value).some(([key, entry]) => key.toLocaleLowerCase().includes(query) || matches(entry, query));
}

function displayValue(value: JsonValue): string {
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return Array.isArray(value) ? `Array (${value.length})` : `Object (${Object.keys(value).length})`;
}

type JsonViewerProps = {
  label?: string;
  rootName?: string;
  pageSize?: number;
  defaultExpanded?: boolean;
} & (
  | { value: JsonValue; data?: never }
  | { data: JsonValue; value?: never }
);

export function JsonViewer(props: JsonViewerProps) {
  const value = ("value" in props ? props.value : props.data) ?? null;
  const { label = "JSON structure", rootName = "payload", pageSize = 40, defaultExpanded = true } = props;
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(() => defaultExpanded ? new Set(["$"]) : new Set<string>());
  const [pages, setPages] = useState<ReadonlyMap<string, number>>(() => new Map());
  const [copyMessage, setCopyMessage] = useState("");
  const [copyError, setCopyError] = useState("");
  const [focusedPath, setFocusedPath] = useState("$");
  const itemRefs = useRef(new Map<string, HTMLButtonElement>());
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const itemsPerPage = Math.max(1, Math.floor(pageSize));

  async function copy(text: string, description: string) {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard access is unavailable.");
      await navigator.clipboard.writeText(text);
      setCopyError("");
      setCopyMessage(`${description} copied.`);
    } catch {
      setCopyMessage("");
      setCopyError(`Could not copy ${description.toLocaleLowerCase()}. Check browser clipboard permissions and try again.`);
    }
  }

  function toggle(path: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  function setPage(path: string, page: number) {
    setPages((current) => new Map(current).set(path, page));
  }

  const rootLabel = rootName;
  const rootPath = "$";
  const rootHasMatch = useMemo(() => matches(value, normalizedQuery), [value, normalizedQuery]);

  function visiblePaths(label: string, nodeValue: JsonValue, path: string): string[] {
    if (normalizedQuery && !matches(nodeValue, normalizedQuery) && !label.toLocaleLowerCase().includes(normalizedQuery)) return [];
    const paths = [path];
    if (!isExpandable(nodeValue)) return paths;
    const allEntries = entriesFor(nodeValue, path);
    const filteredEntries = normalizedQuery
      ? allEntries.filter((entry) => entry.key.toLocaleLowerCase().includes(normalizedQuery) || matches(entry.value, normalizedQuery))
      : allEntries;
    if (!expanded.has(path) && !(normalizedQuery && filteredEntries.length > 0)) return paths;
    const pageCount = Math.max(1, Math.ceil(filteredEntries.length / itemsPerPage));
    const page = Math.min(pages.get(path) ?? 0, pageCount - 1);
    const pageEntries = Array.isArray(nodeValue)
      ? filteredEntries.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
      : filteredEntries;
    return [...paths, ...pageEntries.flatMap((entry) => visiblePaths(entry.key, entry.value, entry.path))];
  }

  const paths = rootHasMatch ? visiblePaths(rootLabel, value, rootPath) : [];
  const activeFocusPath = paths.includes(focusedPath) ? focusedPath : paths[0] ?? "";

  function focusPath(path: string | undefined) {
    if (!path) return;
    setFocusedPath(path);
    itemRefs.current.get(path)?.focus();
  }

  function handleTreeKeyDown(event: KeyboardEvent<HTMLButtonElement>, path: string, parentPath: string | null, expandable: boolean, isExpanded: boolean, nodeValue: JsonValue) {
    const index = paths.indexOf(path);
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusPath(paths[index + 1]);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusPath(paths[index - 1]);
        break;
      case "Home":
        event.preventDefault();
        focusPath(paths[0]);
        break;
      case "End":
        event.preventDefault();
        focusPath(paths.at(-1));
        break;
      case "ArrowRight":
        if (expandable && !isExpanded) {
          event.preventDefault();
          toggle(path);
        } else if (isExpanded) {
          event.preventDefault();
          focusPath(paths[index + 1]);
        }
        break;
      case "ArrowLeft":
        if (expandable && isExpanded) {
          event.preventDefault();
          toggle(path);
        } else if (parentPath) {
          event.preventDefault();
          focusPath(parentPath);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (expandable) toggle(path);
        else void copy(JSON.stringify(nodeValue) ?? "null", "Value");
        break;
    }
  }

  function renderNode(label: string, nodeValue: JsonValue, path: string, depth: number, parentPath: string | null): ReactNode {
    if (normalizedQuery && !matches(nodeValue, normalizedQuery) && !label.toLocaleLowerCase().includes(normalizedQuery)) return null;
    const expandable = isExpandable(nodeValue);
    const allEntries = expandable ? entriesFor(nodeValue, path) : [];
    const filteredEntries = normalizedQuery
      ? allEntries.filter((entry) => entry.key.toLocaleLowerCase().includes(normalizedQuery) || matches(entry.value, normalizedQuery))
      : allEntries;
    const pageCount = Math.max(1, Math.ceil(filteredEntries.length / itemsPerPage));
    const page = Math.min(pages.get(path) ?? 0, pageCount - 1);
    const pageEntries = Array.isArray(nodeValue)
      ? filteredEntries.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
      : filteredEntries;
    const expandsForSearch = normalizedQuery.length > 0 && filteredEntries.length > 0;
    const isExpanded = expanded.has(path) || expandsForSearch;
    const primitiveTone = nodeValue === null || typeof nodeValue === "object" ? "text-muted-foreground" : typeof nodeValue === "string" ? "text-primary" : "text-foreground";

    return <li key={path} role="treeitem" aria-selected={false} aria-expanded={expandable ? isExpanded : undefined}>
      <div className="group flex min-w-0 items-center gap-1 rounded-sm py-1 hover:bg-muted/60 focus-within:bg-muted/60" style={{ paddingInlineStart: `${depth * 1.1}rem` }}>
        {expandable ? <Button variant="ghost" size="icon-xs" aria-label={`${isExpanded ? "Collapse" : "Expand"} ${label}`} aria-expanded={isExpanded} onClick={() => toggle(path)}><IconChevronRight className={`size-3.5 transition-transform motion-reduce:transition-none ${isExpanded ? "rotate-90" : ""}`} /></Button> : <span className="size-7 shrink-0" aria-hidden="true" />}
        <Button
          ref={(element) => { if (element) itemRefs.current.set(path, element); else itemRefs.current.delete(path); }}
          variant="ghost"
          size="sm"
          className="h-7 min-w-0 max-w-64 justify-start truncate px-1 font-medium"
          aria-label={`${label}, ${displayValue(nodeValue)}`}
          aria-expanded={expandable ? isExpanded : undefined}
          tabIndex={activeFocusPath === path ? 0 : -1}
          onFocus={() => setFocusedPath(path)}
          onKeyDown={(event) => handleTreeKeyDown(event, path, parentPath, expandable, isExpanded, nodeValue)}
          onClick={() => { if (expandable) toggle(path); }}
        >{label}</Button>
        <span className="text-muted-foreground">:</span>
        <span className={`min-w-0 truncate font-mono text-xs ${primitiveTone}`}>{displayValue(nodeValue)}</span>
        <span className="ml-auto flex shrink-0 items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px]" aria-label={`Copy path ${path}`} onClick={() => void copy(path, "Path")}>Path</Button>
          <Button variant="ghost" size="icon-xs" aria-label={`Copy value at ${path}`} onClick={() => void copy(JSON.stringify(nodeValue, null, 2), "Value")}><IconCopy /></Button>
        </span>
      </div>
      {expandable && isExpanded && <ul role="group" className="grid min-w-0 border-l border-border/70">
        {pageEntries.map((entry) => renderNode(entry.key, entry.value, entry.path, depth + 1, path))}
        {!pageEntries.length && <li className="py-2 pl-8 text-xs text-muted-foreground">No matching values.</li>}
        {Array.isArray(nodeValue) && filteredEntries.length > itemsPerPage && <li className="flex items-center justify-between gap-2 py-2 pl-8">
          <span className="text-xs text-muted-foreground">Page {page + 1} of {pageCount} · {filteredEntries.length} items</span>
          <span className="flex gap-1">
            <Button size="sm" variant="outline" disabled={page === 0} onClick={() => setPage(path, page - 1)}>Previous</Button>
            <Button size="sm" variant="outline" disabled={page + 1 >= pageCount} onClick={() => setPage(path, page + 1)}>Next</Button>
          </span>
        </li>}
      </ul>}
    </li>;
  }

  return (
    <div className="grid min-w-0 gap-3">
      <label className="grid gap-1.5 text-sm font-medium">Search keys and values
        <Input type="search" value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder="Search this JSON" />
      </label>
      <div className="max-h-[32rem] min-w-0 overflow-auto rounded-lg border p-2" role="region" aria-label={label}>
        <ul role="tree" aria-label={label} className="min-w-max text-sm">
          {rootHasMatch ? renderNode(rootLabel, value, rootPath, 0, null) : <li className="p-4 text-sm text-muted-foreground" role="treeitem" aria-selected={false}>No values match this search.</li>}
        </ul>
      </div>
      <p className="min-h-5 text-xs text-muted-foreground" role="status" aria-live="polite">{copyMessage}</p>
      {copyError && <p className="text-xs text-destructive" role="alert">{copyError}</p>}
      <p className="text-xs text-muted-foreground">Arrays show {itemsPerPage} values per page. Search expands matching paths automatically.</p>
    </div>
  );
}

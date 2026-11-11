"use client";

import * as React from "react";

import { IconArchive, IconRotate2, IconTrash } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type UndoableEntry = { id: string; title: string; description?: string };
export type UndoableChange = { item: UndoableEntry; index: number; action: "archive" | "delete" };
export function UndoToast({
  items,
  onItemsChange,
  onCommit,
  label = "Records",
  duration = 6000,
  className,
}: {
  items: UndoableEntry[];
  onItemsChange: (items: UndoableEntry[]) => void;
  onCommit?: (entries: UndoableChange[]) => void | Promise<void>;
  label?: string;
  duration?: number;
  className?: string;
}) {
  const [pending, setPending] = React.useState<UndoableChange[]>([]);
  const [message, setMessage] = React.useState("");
  const [commitState, setCommitState] = React.useState<"idle" | "committing">("idle");
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastFocus = React.useRef<{ id: string; action: UndoableChange["action"] } | null>(null);
  const restoreFocus = React.useCallback(() => {
    const target = lastFocus.current;
    if (!target) return;
    window.requestAnimationFrame(() =>
      document
        .querySelector<HTMLElement>(`[data-undo-id="${target.id}"][data-undo-action="${target.action}"]`)
        ?.focus(),
    );
  }, []);
  const undo = React.useCallback(() => {
    if (!pending.length || commitState === "committing") return;
    const restored = [...items];
    [...pending]
      .sort((a, b) => a.index - b.index)
      .forEach(({ item, index }) => {
        restored.splice(Math.min(index, restored.length), 0, item);
      });
    onItemsChange(restored);
    setMessage(`${pending.length} item${pending.length === 1 ? "" : "s"} restored.`);
    setPending([]);
    setCommitState("idle");
    restoreFocus();
    if (timer.current) clearTimeout(timer.current);
  }, [commitState, items, onItemsChange, pending, restoreFocus]);
  React.useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "z" &&
        !target?.closest("input,textarea,[contenteditable=true]")
      ) {
        event.preventDefault();
        undo();
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [undo]);
  React.useEffect(() => {
    if (!pending.length) return;
    timer.current = setTimeout(async () => {
      setCommitState("committing");
      try {
        await onCommit?.(pending);
        setPending([]);
        setCommitState("idle");
        setMessage(`${pending.length} item${pending.length === 1 ? "" : "s"} archived.`);
      } catch {
        const restored = [...items];
        [...pending]
          .sort((a, b) => a.index - b.index)
          .forEach(({ item, index }) => {
            restored.splice(Math.min(index, restored.length), 0, item);
          });
        onItemsChange(restored);
        setPending([]);
        setCommitState("idle");
        setMessage("Could not save the change. Items were restored.");
        restoreFocus();
      }
    }, duration);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [pending, duration, onCommit, items, onItemsChange, restoreFocus]);
  const remove = (id: string, action: UndoableChange["action"], source: HTMLElement) => {
    const index = items.findIndex((item) => item.id === id);
    if (index < 0) return;
    const item = items[index];
    lastFocus.current = { id, action };
    setCommitState("idle");
    setPending((old) => [...old, { item, index, action }]);
    onItemsChange(items.filter((entry) => entry.id !== id));
    source.blur();
    setMessage(`${item.title} ${action === "archive" ? "archived" : "removed"}. Undo is available.`);
  };
  return (
    <section aria-label={label} className={cn("relative space-y-2 pb-16", className)}>
      <ul className="divide-y rounded-lg border">
        {items.map((item) => (
          <li key={item.id} className="flex min-w-0 items-center gap-3 p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.title}</p>
              {item.description && <p className="truncate text-xs text-muted-foreground">{item.description}</p>}
            </div>
            <Button
              size="icon-sm"
              variant="ghost"
              data-undo-id={item.id}
              data-undo-action="archive"
              aria-label={`Archive ${item.title}`}
              onClick={(event) => remove(item.id, "archive", event.currentTarget)}
            >
              <IconArchive />
            </Button>
            <Button
              size="icon-sm"
              variant="ghost"
              data-undo-id={item.id}
              data-undo-action="delete"
              aria-label={`Remove ${item.title}`}
              onClick={(event) => remove(item.id, "delete", event.currentTarget)}
            >
              <IconTrash />
            </Button>
          </li>
        ))}
        {!items.length && <li className="p-6 text-center text-sm text-muted-foreground">All records are clear.</li>}
      </ul>
      {pending.length > 0 && (
        <div
          role="group"
          aria-label="Undo recent changes"
          className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-3 rounded-lg border bg-card p-3 shadow-md"
        >
          <span className="text-sm" aria-live="polite">
            {commitState === "committing"
              ? "Saving changes..."
              : `${pending.length} change${pending.length === 1 ? "" : "s"} pending`}
          </span>
          <Button size="sm" variant="outline" disabled={commitState === "committing"} onClick={undo}>
            <IconRotate2 /> {commitState === "committing" ? "Saving..." : "Undo"}
          </Button>
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {message}
      </p>
    </section>
  );
}

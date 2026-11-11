"use client";

import * as React from "react";

import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type InlineEditProps = {
  value: string;
  onSave: (value: string) => void | Promise<unknown>;
  label: string;
  validate?: (value: string) => string | null | undefined;
  placeholder?: string;
  multiline?: boolean;
  as?: "span" | "p" | "h1" | "h2" | "h3";
  className?: string;
};

function InlineEdit({
  value,
  onSave,
  label,
  validate,
  placeholder = "Add a value",
  multiline = false,
  as = "span",
  className,
}: InlineEditProps) {
  const [optimisticValue, setOptimisticValue] = React.useState<{
    base: string;
    next: string;
  } | null>(null);
  const [draft, setDraft] = React.useState(value);
  const [editing, setEditing] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("");
  const fieldRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const saveInProgress = React.useRef(false);
  const generatedId = React.useId();
  const errorId = `${generatedId}-error`;
  const statusId = `${generatedId}-status`;

  React.useEffect(() => {
    if (editing) fieldRef.current?.focus();
  }, [editing]);

  const displayValue = optimisticValue?.base === value ? optimisticValue.next : value;

  function beginEdit() {
    setDraft(displayValue);
    setError("");
    setStatus("");
    setEditing(true);
  }

  function cancelEdit() {
    setDraft(displayValue);
    setError("");
    setStatus("");
    setEditing(false);
  }

  async function saveDraft() {
    if (saveInProgress.current) return;
    const next = draft.trim();
    const validationError = validate?.(next);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (next === displayValue) {
      setEditing(false);
      setError("");
      return;
    }

    saveInProgress.current = true;
    setSaving(true);
    setError("");
    setOptimisticValue({ base: value, next });
    try {
      await onSave(next);
      setStatus("Changes saved.");
      setEditing(false);
    } catch (saveError) {
      setOptimisticValue(null);
      setError(saveError instanceof Error ? saveError.message : "Could not save this value. Try again.");
    } finally {
      saveInProgress.current = false;
      setSaving(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelEdit();
    } else if (event.key === "Enter" && (!multiline || !event.shiftKey)) {
      event.preventDefault();
      void saveDraft();
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (editing && !event.currentTarget.contains(event.relatedTarget as Node | null)) {
      void saveDraft();
    }
  }

  const DisplayTag = as;

  if (!editing) {
    return (
      <DisplayTag className={cn("m-0", className)}>
        <button
          type="button"
          aria-label={`${label}: ${displayValue || "empty"}. Edit`}
          onClick={beginEdit}
          className="group/inline-edit inline-flex max-w-full items-start gap-2 rounded-sm text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className={cn("min-w-0", multiline ? "whitespace-pre-wrap" : "truncate")}>
            {displayValue || <span className="text-muted-foreground">{placeholder}</span>}
          </span>
          <IconPencil
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/inline-edit:opacity-100 group-focus-visible/inline-edit:opacity-100 motion-reduce:transition-none"
          />
        </button>
      </DisplayTag>
    );
  }

  return (
    <div className={cn("grid w-full gap-2", className)} onBlur={handleBlur}>
      {multiline ? (
        <Textarea
          ref={fieldRef as React.Ref<HTMLTextAreaElement>}
          aria-label={label}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          value={draft}
          onChange={(event) => setDraft(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={3}
          autoResize
          disabled={saving}
        />
      ) : (
        <Input
          ref={fieldRef as React.Ref<HTMLInputElement>}
          aria-label={label}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          value={draft}
          onChange={(event) => setDraft(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={saving}
        />
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
      <div className="flex items-center gap-1">
        <Button type="button" size="sm" onClick={() => void saveDraft()} disabled={saving}>
          {saving ? (
            "Saving…"
          ) : (
            <>
              <IconCheck aria-hidden="true" />
              Save
            </>
          )}
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={cancelEdit} disabled={saving}>
          <IconX aria-hidden="true" />
          Cancel
        </Button>
      </div>
      <span id={statusId} role="status" aria-live="polite" className="text-xs text-muted-foreground">
        {saving ? "Saving changes…" : status}
      </span>
    </div>
  );
}

export { InlineEdit, type InlineEditProps };

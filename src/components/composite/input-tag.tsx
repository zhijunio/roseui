"use client";

import * as React from "react";

import { IconX } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type InputTagProps = {
  label: string;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  maxTags?: number;
  id?: string;
  className?: string;
};

function InputTag({
  label,
  value,
  defaultValue = [],
  onValueChange,
  placeholder = "Add a value",
  description,
  error,
  disabled,
  maxTags,
  id: providedId,
  className,
}: InputTagProps) {
  const generatedId = React.useId();
  const id = providedId ?? generatedId;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [draft, setDraft] = React.useState("");
  const [pickedIndex, setPickedIndex] = React.useState<number | null>(null);
  const [announcement, setAnnouncement] = React.useState("");
  const tags = value ?? internalValue;

  function emit(next: string[]) {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  }

  function removeAt(index: number) {
    const removed = tags[index];
    emit(tags.filter((_, itemIndex) => itemIndex !== index));
    setPickedIndex(null);
    setAnnouncement(`${removed} removed.`);
  }

  function addDraft() {
    const next = draft.trim().replace(/,+$/, "").trim();
    if (!next) return;
    if (tags.some((tag) => tag.toLocaleLowerCase() === next.toLocaleLowerCase())) {
      setAnnouncement(`${next} is already in the list.`);
      setDraft("");
      return;
    }
    if (maxTags !== undefined && tags.length >= maxTags) {
      setAnnouncement(`You can add up to ${maxTags} items.`);
      return;
    }
    emit([...tags, next]);
    setDraft("");
    setPickedIndex(null);
    setAnnouncement(`${next} added.`);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addDraft();
    } else if (event.key === "Backspace" && !draft) {
      event.preventDefault();
      if (pickedIndex !== null) removeAt(pickedIndex);
      else if (tags.length > 0) {
        setPickedIndex(tags.length - 1);
        setAnnouncement(`${tags[tags.length - 1]} selected. Press Backspace again to remove.`);
      }
    } else if (event.key === "Delete" && pickedIndex !== null) {
      event.preventDefault();
      removeAt(pickedIndex);
    } else if (event.key === "ArrowLeft" && event.currentTarget.selectionStart === 0 && tags.length > 0) {
      event.preventDefault();
      setPickedIndex((current) => (current === null ? tags.length - 1 : Math.max(0, current - 1)));
    } else if (event.key === "ArrowRight" && pickedIndex !== null) {
      event.preventDefault();
      setPickedIndex((current) => (current !== null && current < tags.length - 1 ? current + 1 : null));
    } else if (event.key === "Escape") {
      setPickedIndex(null);
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) addDraft();
  }

  return (
    <div className={cn("grid min-w-0 gap-2", className)} onBlur={handleBlur}>
      <Label htmlFor={id} isDisabled={disabled} isInvalid={Boolean(error)}>
        {label}
      </Label>
      <div
        className={cn(
          "flex min-h-9 min-w-0 flex-wrap items-center gap-1.5 rounded-[var(--radius)] border border-input bg-background p-1.5 focus-within:ring-3 focus-within:ring-ring/50",
          error && "border-destructive focus-within:ring-destructive/20",
          disabled && "bg-input/50 opacity-60",
        )}
      >
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            data-selected={pickedIndex === index || undefined}
            className={cn(
              "inline-flex max-w-full items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground",
              pickedIndex === index && "ring-2 ring-ring",
            )}
          >
            <span className="truncate">{tag}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Remove ${tag}`}
              disabled={disabled}
              onClick={() => removeAt(index)}
              className="-mr-1 size-5 text-muted-foreground"
            >
              <IconX aria-hidden="true" />
            </Button>
          </span>
        ))}
        <Input
          id={id}
          value={draft}
          disabled={disabled || (maxTags !== undefined && tags.length >= maxTags)}
          placeholder={tags.length === 0 ? placeholder : "Add another…"}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [description ? descriptionId : undefined, error ? errorId : undefined].filter(Boolean).join(" ") ||
            undefined
          }
          onChange={(event) => setDraft(event.currentTarget.value)}
          onKeyDown={onKeyDown}
          className="h-7 min-w-24 flex-1 border-0 bg-transparent px-2 shadow-none focus-visible:ring-0"
        />
      </div>
      {description && (
        <p id={descriptionId} className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}

export { InputTag, type InputTagProps };

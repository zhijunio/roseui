"use client";

import * as React from "react";
import { IconChevronDown, IconX } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type MultiSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type MultiSelectProps = {
  label: string;
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  description?: string;
  maxVisible?: number;
  disabled?: boolean;
  id?: string;
  className?: string;
};

function MultiSelect({
  label,
  options,
  value,
  defaultValue = [],
  onValueChange,
  placeholder = "Select options",
  description,
  maxVisible = 2,
  disabled,
  id: providedId,
  className,
}: MultiSelectProps) {
  const generatedId = React.useId();
  const id = providedId ?? generatedId;
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;
  const listId = `${id}-listbox`;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [open, setOpen] = React.useState(false);
  const [announcement, setAnnouncement] = React.useState("");
  const selectedValues = value ?? internalValue;
  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value),
  );
  const visibleCount = Math.max(0, maxVisible);
  const visibleOptions = selectedOptions.slice(0, visibleCount);
  const hiddenCount = Math.max(
    0,
    selectedOptions.length - visibleOptions.length,
  );
  const accessibleSelection = selectedOptions.length
    ? selectedOptions.map((option) => option.label).join(", ")
    : "none selected";

  function update(next: string[]) {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
    setAnnouncement(
      `${next.length} ${next.length === 1 ? "option" : "options"} selected.`,
    );
  }

  function remove(valueToRemove: string) {
    update(selectedValues.filter((item) => item !== valueToRemove));
  }

  function handleSelectionChange(selection: "all" | Set<React.Key>) {
    const keys =
      selection === "all"
        ? options
            .filter((option) => !option.disabled)
            .map((option) => option.value)
        : Array.from(selection).filter(
            (key): key is string => typeof key === "string",
          );
    update(
      options
        .filter((option) => keys.includes(option.value))
        .map((option) => option.value),
    );
  }

  return (
    <div className={cn("grid min-w-0 gap-2", className)}>
      <Label id={labelId} htmlFor={`${id}-trigger`} isDisabled={disabled}>
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div
            role="group"
            aria-labelledby={labelId}
            aria-describedby={description ? descriptionId : undefined}
            className={cn(
              "flex min-h-9 min-w-0 items-center gap-1.5 rounded-[var(--radius-control)] border border-input bg-background p-1.5",
              "focus-within:ring-3 focus-within:ring-ring/50",
              disabled && "bg-input/50 opacity-60",
            )}
          >
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
              {visibleOptions.length === 0 ? (
                <span className="px-1.5 text-sm text-muted-foreground">
                  {placeholder}
                </span>
              ) : (
                visibleOptions.map((option) => (
                  <span
                    key={option.value}
                    className="inline-flex max-w-36 items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                  >
                    <span className="truncate">{option.label}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label={`Remove ${option.label}`}
                      disabled={disabled}
                      onClick={() => remove(option.value)}
                      className="-mr-1 size-5 text-muted-foreground"
                    >
                      <IconX aria-hidden="true" />
                    </Button>
                  </span>
                ))
              )}
              {hiddenCount > 0 && (
                <span
                  className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                  aria-hidden="true"
                >
                  +{hiddenCount}
                </span>
              )}
            </div>
            {selectedOptions.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={`Clear ${label}`}
                disabled={disabled}
                onClick={() => update([])}
                className="size-7 shrink-0 text-muted-foreground"
              >
                <IconX aria-hidden="true" />
              </Button>
            )}
            <PopoverTrigger asChild>
              <Button
                id={`${id}-trigger`}
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={`${label}: ${accessibleSelection}`}
                aria-haspopup="listbox"
                aria-controls={listId}
                aria-expanded={open}
                aria-describedby={description ? descriptionId : undefined}
                disabled={disabled}
                className="size-7 shrink-0 text-muted-foreground"
              >
                <IconChevronDown aria-hidden="true" />
              </Button>
            </PopoverTrigger>
          </div>
        </PopoverAnchor>
        <PopoverContent
          align="start"
          className="w-(--radix-popover-trigger-width) min-w-56 p-1.5"
        >
          <ListBox
            id={listId}
            aria-label={label}
            selectionMode="multiple"
            selectedKeys={selectedValues}
            onSelectionChange={handleSelectionChange}
            className="max-h-64 border-0 bg-transparent p-0 shadow-none"
          >
            {options.map((option) => (
              <ListBoxItem
                key={option.value}
                id={option.value}
                isDisabled={disabled || option.disabled}
              >
                <span className="min-w-0 flex-1 truncate">{option.label}</span>
              </ListBoxItem>
            ))}
          </ListBox>
        </PopoverContent>
      </Popover>
      {description && (
        <p id={descriptionId} className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}

export { MultiSelect, type MultiSelectProps };

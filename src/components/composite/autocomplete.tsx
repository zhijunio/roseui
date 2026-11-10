"use client";

import { useId, useMemo, useRef, useState } from "react";
import { IconChevronDown, IconLoader2, IconX } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type AutocompleteItem = {
  value: string;
  label?: string;
  group?: string;
  description?: string;
  disabled?: boolean;
};

export function Autocomplete({
  items,
  value,
  defaultValue = "",
  onValueChange,
  onSelect,
  placeholder = "Search options...",
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  disabled = false,
  invalid = false,
  autoHighlight = false,
  clearable = false,
  showTrigger = false,
  size = "default",
  loading = false,
  error,
  emptyText = "No results found.",
  name,
  required = false,
  className,
  id: providedId,
}: {
  items: AutocompleteItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSelect?: (item: AutocompleteItem) => void;
  placeholder?: string;
  "aria-label": string;
  "aria-describedby"?: string;
  disabled?: boolean;
  invalid?: boolean;
  autoHighlight?: boolean;
  clearable?: boolean;
  showTrigger?: boolean;
  size?: "sm" | "default" | "lg";
  loading?: boolean;
  error?: string;
  emptyText?: string;
  name?: string;
  required?: boolean;
  className?: string;
  id?: string;
}) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [moved, setMoved] = useState(false);
  const currentValue = value ?? uncontrolledValue;
  const filteredItems = useMemo(() => {
    const query = currentValue.trim().toLocaleLowerCase();
    return items.filter((item) => `${item.label ?? item.value} ${item.group ?? ""} ${item.description ?? ""}`.toLocaleLowerCase().includes(query));
  }, [currentValue, items]);
  const availableItems = useMemo(() => filteredItems.filter((item) => !item.disabled), [filteredItems]);
  const navigableItems = loading || error ? [] : availableItems;
  const groups = useMemo(() => {
    const result = new Map<string, AutocompleteItem[]>();
    for (const item of filteredItems) {
      const group = item.group ?? "";
      result.set(group, [...(result.get(group) ?? []), item]);
    }
    return result;
  }, [filteredItems]);

  function updateValue(next: string) {
    if (disabled) return;
    if (value === undefined) setUncontrolledValue(next);
    onValueChange?.(next);
    setActiveIndex(-1);
    setMoved(false);
  }

  function choose(item: AutocompleteItem) {
    if (disabled || item.disabled) return;
    updateValue(item.value);
    onSelect?.(item);
    setOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && navigableItems.length) {
      event.preventDefault();
      setOpen(true);
      setMoved(true);
      setActiveIndex((index) => {
        return index < 0 ? 0 : (index + 1) % navigableItems.length;
      });
    } else if (event.key === "ArrowUp" && navigableItems.length) {
      event.preventDefault();
      setOpen(true);
      setMoved(true);
      setActiveIndex((index) => {
        const current = index < 0 && autoHighlight && currentValue.length > 0 ? 0 : index;
        return current < 0 ? navigableItems.length - 1 : (current - 1 + navigableItems.length) % navigableItems.length;
      });
    } else if (event.key === "Enter" && open) {
      const current = activeIndex < 0 && autoHighlight && currentValue.length > 0 ? 0 : activeIndex;
      if (current >= 0 && current < navigableItems.length) {
        event.preventDefault();
        choose(navigableItems[current]);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const activeOptionIndex = autoHighlight && !moved && currentValue.length > 0 ? 0 : activeIndex;
  const activeFilteredIndex = activeOptionIndex >= 0 && activeOptionIndex < navigableItems.length
    ? filteredItems.indexOf(navigableItems[activeOptionIndex])
    : -1;
  const hasListbox = open && !loading && !error && filteredItems.length > 0;
  const isOpen = open && !disabled;
  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverAnchor asChild><div className={cn("relative w-full", className)}>
        <Input
          ref={inputRef}
          id={id}
          role="combobox"
          aria-label={ariaLabel}
          aria-expanded={isOpen}
          aria-controls={hasListbox ? `${id}-listbox` : undefined}
          aria-activedescendant={hasListbox && activeFilteredIndex >= 0 ? `${id}-option-${activeFilteredIndex}` : undefined}
          aria-autocomplete="list"
          aria-invalid={invalid || Boolean(error) || undefined}
          aria-errormessage={error ? `${id}-error` : undefined}
          aria-describedby={ariaDescribedBy}
          autoComplete="off"
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          required={required}
          value={currentValue}
          data-size={size}
          className={cn("pr-16", size === "sm" && "h-7 text-xs", size === "lg" && "h-9", (clearable || showTrigger) && "pr-16")}
          onFocus={() => { if (currentValue || showTrigger) setOpen(true); }}
          onChange={(event) => { updateValue(event.currentTarget.value); setOpen(true); }}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute inset-y-0 right-1 flex items-center gap-0.5">
          {clearable && currentValue && <button type="button" aria-label="Clear input" disabled={disabled} className="rounded p-1 text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50" onClick={() => updateValue("")}><IconX className="size-4" /></button>}
          {showTrigger && <button type="button" aria-label="Show suggestions" aria-haspopup="listbox" aria-controls={hasListbox ? `${id}-listbox` : undefined} aria-expanded={isOpen} disabled={disabled} className="rounded p-1 text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50" onClick={() => { const nextOpen = !open; inputRef.current?.focus(); setOpen(nextOpen); }}><IconChevronDown className="size-4" /></button>}
        </div>
        <PopoverContent align="start" className="max-h-64 w-(--radix-popover-trigger-width) overflow-auto p-1" onOpenAutoFocus={(event) => event.preventDefault()}>
          {loading ? <div role="status" className="flex items-center gap-2 px-3 py-4 text-sm text-muted-foreground"><IconLoader2 aria-hidden="true" className="size-4 motion-safe:animate-spin" />Searching…</div>
            : error ? <p id={`${id}-error`} role="alert" className="px-3 py-3 text-sm text-destructive">{error}</p>
              : filteredItems.length === 0 ? <p role="status" className="px-3 py-3 text-sm text-muted-foreground">{emptyText}</p>
                : <div id={`${id}-listbox`} role="listbox" aria-label={`${ariaLabel} suggestions`}>
                  {[...groups].map(([group, groupItems]) => <div key={group || "ungrouped"} role="group" aria-label={group || undefined}>
                    {group && <div className="sticky top-0 bg-popover px-2 py-1.5 text-xs font-medium text-muted-foreground">{group}</div>}
                    {groupItems.map((item) => {
                      const filteredIndex = filteredItems.indexOf(item);
                      const index = availableItems.indexOf(item);
                      const highlighted = index >= 0 && index === activeOptionIndex;
                      return <div key={`${group}:${item.value}`} id={`${id}-option-${filteredIndex}`} role="option" aria-selected={highlighted} aria-disabled={item.disabled || undefined} tabIndex={-1} className={cn("flex w-full flex-col rounded-md px-2 py-1.5 text-left text-sm outline-none hover:bg-accent", highlighted && "bg-accent", item.disabled && "pointer-events-none opacity-50")} onMouseEnter={() => { if (!item.disabled) { setMoved(true); setActiveIndex(index); } }} onMouseDown={(event) => event.preventDefault()} onClick={() => choose(item)}>
                        <span>{item.label ?? item.value}</span>{item.description && <span className="text-xs text-muted-foreground">{item.description}</span>}
                      </div>;
                    })}
                  </div>)}
                </div>}
        </PopoverContent>
      </div></PopoverAnchor>
    </Popover>
  );
}

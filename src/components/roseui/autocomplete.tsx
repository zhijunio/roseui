"use client";

import { useId, useMemo, useState } from "react";

import { ChevronDown as IconChevronDown, Loader2 as IconLoader2, X as IconX } from "lucide-react";

import { ComboBox, ComboBoxContent, ComboBoxInput, ComboBoxItem } from "@/components/roseui/combo-box";
import { Button } from "@/components/ui/button";
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
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const filteredItems = useMemo(() => {
    const query = currentValue.trim().toLocaleLowerCase();
    return items.filter((item) =>
      `${item.label ?? item.value} ${item.group ?? ""} ${item.description ?? ""}`.toLocaleLowerCase().includes(query),
    );
  }, [currentValue, items]);
  const itemsWithGroupLabels = useMemo(
    () =>
      filteredItems.map((item, index) => ({
        ...item,
        groupLabel: item.group && item.group !== filteredItems[index - 1]?.group ? item.group : undefined,
      })),
    [filteredItems],
  );
  const popoverItems = loading || error ? [] : itemsWithGroupLabels;

  function updateValue(nextValue: string) {
    if (disabled) return;
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }

  return (
    <ComboBox
      aria-label={ariaLabel}
      inputValue={currentValue}
      onInputChange={updateValue}
      onSelectionChange={(key) => {
        const selected = filteredItems.find((item) => item.value === String(key));
        if (!selected) return;
        updateValue(selected.value);
        onSelect?.(selected);
      }}
      disabled={disabled}
      invalid={invalid || Boolean(error)}
      required={required}
      allowsEmptyCollection
      className={cn(
        "relative w-full min-h-0 rounded-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 aria-invalid:border-0",
        className,
      )}
    >
      <ComboBoxInput
        id={id}
        name={name}
        placeholder={placeholder}
        showTrigger={false}
        aria-describedby={[ariaDescribedBy, error ? `${id}-error` : undefined].filter(Boolean).join(" ") || undefined}
        autoComplete="off"
        className={cn(
          "h-9 w-full rounded-lg border border-input bg-background px-3 pe-9 text-sm outline-none focus:border-ring/70 focus:ring-2 focus:ring-ring/20",
          size === "sm" && "h-7 text-xs",
          size === "lg" && "h-11 text-base",
          (clearable || loading) && "pe-16",
        )}
      />
      {loading ? (
        <span
          role="status"
          aria-label="Searching"
          className="pointer-events-none absolute end-10 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          <IconLoader2 aria-hidden="true" className="size-4 motion-safe:animate-spin" />
        </span>
      ) : null}
      {clearable && currentValue ? (
        <Button
          type="button"
          aria-label="Clear input"
          onClick={() => updateValue("")}
          className="absolute end-9 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
        >
          <IconX aria-hidden="true" className="size-4" />
        </Button>
      ) : null}
      {showTrigger ? (
        <Button
          type="button"
          aria-label="Show suggestions"
          onClick={() => document.getElementById(id)?.focus()}
          className="absolute end-1 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
        >
          <IconChevronDown aria-hidden="true" className="size-4" />
        </Button>
      ) : null}
      <ComboBoxContent
        items={popoverItems.map((item) => ({ ...item, id: item.value }))}
        className="max-h-64 overflow-auto"
        renderEmptyState={() => (
          <div
            className={cn("px-3 py-3 text-sm", error ? "text-destructive" : "text-muted-foreground")}
            role={error ? "alert" : "status"}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <IconLoader2 aria-hidden="true" className="size-4 motion-safe:animate-spin" />
                Searching…
              </span>
            ) : error ? (
              <span id={`${id}-error`}>{error}</span>
            ) : (
              emptyText
            )}
          </div>
        )}
      >
        {(item) => (
          <ComboBoxItem
            id={item.value}
            textValue={item.label ?? item.value}
            disabled={item.disabled || loading || Boolean(error)}
            className="flex w-full flex-col items-start gap-1 rounded-md px-2 py-2 text-left text-sm text-foreground outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            {item.groupLabel ? (
              <span className="w-full text-xs font-medium text-muted-foreground">{item.groupLabel}</span>
            ) : null}
            <span>{item.label ?? item.value}</span>
            {item.description ? <span className="text-xs text-muted-foreground">{item.description}</span> : null}
          </ComboBoxItem>
        )}
      </ComboBoxContent>
    </ComboBox>
  );
}

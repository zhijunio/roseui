"use client";

import * as React from "react";

import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface OptionBase {
  id: string | number;
  name: string;
  disabled?: boolean;
}
export interface MultiSelectContentProps<T extends OptionBase> {
  items: Iterable<T>;
  children: (item: T) => React.ReactNode;
}
export function MultiSelectContent<T extends OptionBase>(_props: MultiSelectContentProps<T>) {
  return null;
}

export interface MultiSelectProps<T extends OptionBase = OptionBase>
  extends Omit<React.ComponentProps<"div">, "children"> {
  placeholder?: string;
  children?: React.ReactNode;
  name?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  selectedKeys?: Set<string | number>;
  defaultSelectedKeys?: Set<string | number> | string[];
  onSelectionChange?: (keys: Set<string | number>) => void;
  disabled?: boolean;
}

type MultiSelectItemProps = Omit<React.ComponentProps<"button">, "children" | "id"> & {
  id: string | number;
  children?: React.ReactNode;
  textValue?: string;
  disabled?: boolean;
};

export function MultiSelect<T extends OptionBase = OptionBase>({
  placeholder = "No selected items",
  className,
  children,
  name,
  searchPlaceholder = "Search options...",
  searchValue,
  onSearchChange,
  selectedKeys,
  defaultSelectedKeys = [],
  onSelectionChange,
  disabled = false,
  ...props
}: MultiSelectProps<T>) {
  const [localSelected, setLocalSelected] = React.useState(
    new Set<string | number>(
      defaultSelectedKeys instanceof Set ? defaultSelectedKeys : defaultSelectedKeys.map(String),
    ),
  );
  const selected = selectedKeys ?? localSelected;
  const [localSearch, setLocalSearch] = React.useState("");
  const query = searchValue ?? localSearch;
  const [open, setOpen] = React.useState(false);
  const elements = React.Children.toArray(children);
  const content = elements.find(
    (element): element is React.ReactElement<MultiSelectContentProps<T>> =>
      React.isValidElement(element) && element.type === MultiSelectContent,
  );
  const before = content ? elements.slice(0, elements.indexOf(content)) : elements;
  const after = content ? elements.slice(elements.indexOf(content) + 1) : [];
  const items = content ? Array.from(content.props.items) : [];
  const filtered = items.filter((item) => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const setSelected = (next: Set<string | number>) => {
    if (selectedKeys === undefined) setLocalSelected(next);
    onSelectionChange?.(next);
  };
  const toggle = (item: T) => {
    const next = new Set(selected);
    if (next.has(item.id)) next.delete(item.id);
    else next.add(item.id);
    setSelected(next);
  };

  return (
    <div data-slot="multi-select" className={cn("flex w-full min-w-0 flex-col gap-1.5", className)} {...props}>
      {before}
      {content && (
        <>
          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
              <button
                type="button"
                disabled={disabled}
                aria-label={props["aria-label"] ?? "Choose options"}
                aria-expanded={open}
                className="flex min-h-9 w-full min-w-0 items-center gap-2 rounded-lg border border-input bg-background p-1 text-left shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
                  {selected.size ? (
                    [...selected].map((key) => {
                      const item = items.find((candidate) => candidate.id === key);
                      if (!item) return null;
                      return (
                        <span
                          key={String(key)}
                          className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs"
                        >
                          {item.name}
                        </span>
                      );
                    })
                  ) : (
                    <span className="px-2 text-sm text-muted-foreground">{placeholder}</span>
                  )}
                </span>
                <ChevronDown aria-hidden="true" className="mr-2 size-4 shrink-0 text-muted-foreground" />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                side="bottom"
                align="start"
                sideOffset={4}
                className="z-50 w-[var(--radix-popover-trigger-width)] rounded-lg border border-border bg-popover p-2 shadow-lg"
              >
                <Input
                  autoFocus
                  value={query}
                  onChange={(event) => {
                    if (searchValue === undefined) setLocalSearch(event.currentTarget.value);
                    onSearchChange?.(event.currentTarget.value);
                  }}
                  placeholder={searchPlaceholder}
                  className="mb-2"
                />
                <div role="listbox" aria-multiselectable="true" className="max-h-56 overflow-y-auto">
                  {filtered.map((item) => (
                    <MultiSelectItem
                      key={String(item.id)}
                      id={item.id}
                      textValue={item.name}
                      disabled={disabled || Boolean(item.disabled)}
                      aria-selected={selected.has(item.id)}
                      onClick={() => toggle(item)}
                    >
                      {content.props.children(item)}
                    </MultiSelectItem>
                  ))}
                  {!filtered.length && (
                    <p role="status" className="px-3 py-2 text-sm text-muted-foreground">
                      No results found.
                    </p>
                  )}
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
          {name && <input type="hidden" name={name} value={[...selected].join(",")} />}
        </>
      )}
      {after}
    </div>
  );
}

export function MultiSelectItem({
  id,
  children,
  textValue,
  disabled = false,
  className,
  ...props
}: MultiSelectItemProps) {
  return (
    <button
      {...props}
      type="button"
      data-slot="multi-select-item"
      disabled={disabled}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-accent focus-visible:bg-accent disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
    >
      <span className="flex-1">{children ?? textValue}</span>
      {props["aria-selected"] && <Check className="size-4" aria-hidden="true" />}
    </button>
  );
}

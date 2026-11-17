"use client";

import * as React from "react";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ChevronsUpDown as ChevronUpDownIcon } from "lucide-react";

import { fieldStyles } from "@/components/roseui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { DropdownDescription, DropdownItem, DropdownLabel, DropdownSection } from "./dropdown";
import { ListBox, type Selection } from "./list-box";

type ComboBoxContextValue = {
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedKeys: Set<string>;
  setSelectedKeys: (keys: Set<string>) => void;
  selectionMode: "single" | "multiple";
  disabled: boolean;
  readOnly: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedText: string;
  setSelectedText: (value: string) => void;
};
const ComboBoxContext = React.createContext<ComboBoxContextValue | null>(null);

export interface ComboBoxProps<T extends object = object>
  extends Omit<React.ComponentProps<"div">, "children" | "onChange"> {
  children?: React.ReactNode;
  inputValue?: string;
  defaultInputValue?: string;
  onInputChange?: (value: string) => void;
  selectedKey?: string | number | null;
  defaultSelectedKey?: string | number | null;
  selectedKeys?: Selection;
  defaultSelectedKeys?: Selection | string[];
  onSelectionChange?: (key: string | number | null) => void;
  selectionMode?: "single" | "multiple";
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  allowsEmptyCollection?: boolean;
}

export function ComboBox<T extends object = object>({
  className,
  children,
  inputValue,
  defaultInputValue = "",
  onInputChange,
  selectedKey,
  defaultSelectedKey = null,
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  selectionMode = "single",
  disabled = false,
  readOnly = false,
  invalid: _isInvalid,
  required: _isRequired,
  ...props
}: ComboBoxProps<T>) {
  const [localInput, setLocalInput] = React.useState(defaultInputValue);
  const currentInput = inputValue ?? localInput;
  const [localSelected, setLocalSelected] = React.useState<Set<string>>(() => {
    if (selectedKeys !== undefined) return new Set(selectedKeys === "all" ? [] : [...selectedKeys].map(String));
    if (defaultSelectedKeys !== undefined)
      return new Set(defaultSelectedKeys === "all" ? [] : [...defaultSelectedKeys].map(String));
    return defaultSelectedKey === null ? new Set() : new Set([String(defaultSelectedKey)]);
  });
  const currentSelected: Set<string> =
    selectedKeys !== undefined
      ? new Set<string>(selectedKeys === "all" ? [] : [...selectedKeys].map(String))
      : selectedKey !== undefined
        ? selectedKey === null
          ? new Set<string>()
          : new Set<string>([String(selectedKey)])
        : localSelected;
  const [open, setOpen] = React.useState(false);
  const [selectedText, setSelectedText] = React.useState("");
  const setInputValue = (next: string) => {
    if (inputValue === undefined) setLocalInput(next);
    onInputChange?.(next);
  };
  const setSelectedKeys = (next: Set<string>) => {
    if (selectedKeys === undefined && selectedKey === undefined) setLocalSelected(next);
    const first = next.values().next().value;
    onSelectionChange?.(selectionMode === "single" ? (first ?? null) : (first ?? null));
  };
  const context = React.useMemo(
    () => ({
      inputValue: currentInput,
      setInputValue,
      selectedKeys: currentSelected,
      setSelectedKeys,
      selectionMode,
      disabled: disabled,
      readOnly: readOnly,
      open,
      setOpen,
      selectedText,
      setSelectedText,
    }),
    [currentInput, currentSelected, selectionMode, disabled, readOnly, open, selectedText],
  );
  return (
    <ComboBoxContext.Provider value={context}>
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <div data-slot="control" className={cn(fieldStyles(), "relative", className)} {...props}>
          {children}
        </div>
      </PopoverPrimitive.Root>
    </ComboBoxContext.Provider>
  );
}

type ComboBoxListProps<T extends { id?: string | number; key?: string | number }> = {
  items?: Iterable<T>;
  children?: React.ReactNode | ((item: T) => React.ReactNode);
  className?: string;
  popover?: {
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    align?: "start" | "center" | "end";
    className?: string;
  };
  renderEmptyState?: () => React.ReactNode;
};

export function ComboBoxContent<T extends { id?: string | number; key?: string | number }>({
  children,
  items,
  className,
  popover,
  renderEmptyState,
}: ComboBoxListProps<T>) {
  const context = React.useContext(ComboBoxContext);
  if (!context) throw new Error("ComboBoxContent must be used inside ComboBox");
  const itemList = items ? Array.from(items) : [];
  const matches = (item: T) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" && value.toLocaleLowerCase().includes(context.inputValue.trim().toLocaleLowerCase()),
    );
  const filteredItems = context.inputValue ? itemList.filter(matches) : itemList;
  const renderedChildren =
    typeof children === "function"
      ? filteredItems.map((item) => <React.Fragment key={String(item.id ?? item.key)}>{children(item)}</React.Fragment>)
      : children;
  const options = renderedChildren ?? (items && typeof children === "function" ? renderedChildren : null);
  const onSelectionChange = (selection: Selection) => {
    const keys = selection === "all" ? new Set<string>() : new Set([...selection].map(String));
    context.setSelectedKeys(keys);
    if (context.selectionMode === "single" && keys.size) {
      const id = [...keys][0];
      const item = itemList.find((candidate) => String(candidate.id ?? candidate.key) === id);
      const label = item ? Object.values(item).find((value) => typeof value === "string" && value !== id) : undefined;
      if (typeof label === "string") {
        context.setInputValue(label);
        context.setSelectedText(label);
      }
      context.setOpen(false);
    }
  };
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="combobox-content"
        side={popover?.side ?? "bottom"}
        sideOffset={popover?.sideOffset ?? 4}
        align={popover?.align ?? "start"}
        className={cn(
          "z-50 min-w-[var(--radix-popover-trigger-width)] max-h-64 overflow-auto rounded-lg border border-border bg-popover p-1 shadow-lg",
          popover?.className,
        )}
      >
        {filteredItems.length === 0 ? renderEmptyState?.() : null}
        <ListBox
          selectionMode={context.selectionMode}
          selectedKeys={context.selectedKeys}
          onSelectionChange={onSelectionChange}
          disabled={context.disabled}
          aria-label="Suggestions"
          className={cn(
            "grid max-h-64 w-full grid-cols-[auto_1fr] gap-y-1 overflow-y-auto border-0 bg-transparent p-0 shadow-none",
            className,
          )}
        >
          {options}
        </ListBox>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

export function ComboBoxInput({
  showTrigger = true,
  className,
  onChange,
  onFocus,
  onKeyDown,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { showTrigger?: boolean }) {
  const context = React.useContext(ComboBoxContext);
  if (!context) throw new Error("ComboBoxInput must be used inside ComboBox");
  return (
    <PopoverPrimitive.Anchor asChild>
      <span
        data-slot="control"
        className="relative isolate block w-full has-[[data-slot=icon]:last-child]:[&_input]:pe-10"
      >
        <Input
          {...props}
          disabled={context.disabled}
          readOnly={context.readOnly}
          aria-required={props.required || undefined}
          value={context.inputValue}
          onChange={(event) => {
            onChange?.(event);
            context.setInputValue(event.currentTarget.value);
            context.setOpen(true);
          }}
          onFocus={(event) => {
            onFocus?.(event);
            if (!context.disabled) context.setOpen(true);
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (event.key === "Escape") context.setOpen(false);
          }}
          className={cn(
            "h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed aria-invalid:text-destructive",
            className,
          )}
        />
        {showTrigger ? (
          <button
            type="button"
            aria-label="Show suggestions"
            disabled={context.disabled}
            onClick={() => context.setOpen(!context.open)}
            className="absolute end-0 top-0 grid h-full w-11 place-content-center sm:w-9"
          >
            {!context.inputValue && (
              <ChevronUpDownIcon data-slot="chevron" className="-me-1 size-5 text-muted-foreground sm:size-4" />
            )}
          </button>
        ) : null}
      </span>
    </PopoverPrimitive.Anchor>
  );
}

export const ComboBoxSection = DropdownSection;
export const ComboBoxItem = DropdownItem;
export const ComboBoxLabel = DropdownLabel;
export const ComboBoxDescription = DropdownDescription;

export function ComboBoxValue<T extends object>({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  children?: (values: { selectedText: string; selectedItems: T[] }) => React.ReactNode;
}) {
  const context = React.useContext(ComboBoxContext);
  if (!context) return null;
  return (
    <div data-slot="control" className={className} {...props}>
      {children?.({ selectedText: context.selectedText, selectedItems: [] })}
    </div>
  );
}

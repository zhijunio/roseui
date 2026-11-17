"use client";

import { createContext, useContext, useId, useState } from "react";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown as IconChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type DisclosureGroupContextValue = { expandedKeys: Set<string>; setExpanded: (id: string, expanded: boolean) => void };
const DisclosureGroupContext = createContext<DisclosureGroupContextValue | null>(null);

export type DisclosureGroupProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  allowsMultipleExpanded?: boolean;
  expandedKeys?: Iterable<string>;
  onExpandedChange?: (keys: Set<string>) => void;
};

export function DisclosureGroup({
  className,
  children,
  allowsMultipleExpanded = true,
  expandedKeys,
  onExpandedChange,
  ...props
}: DisclosureGroupProps) {
  const [internalKeys, setInternalKeys] = useState(new Set<string>());
  const currentKeys = expandedKeys === undefined ? internalKeys : new Set(expandedKeys);
  const setExpanded = (id: string, expanded: boolean) => {
    const next = allowsMultipleExpanded ? new Set(currentKeys) : new Set<string>();
    if (expanded) next.add(id);
    else next.delete(id);
    if (expandedKeys === undefined) setInternalKeys(next);
    onExpandedChange?.(next);
  };
  return (
    <DisclosureGroupContext.Provider value={{ expandedKeys: currentKeys, setExpanded }}>
      <div data-slot="disclosure-group" className={cn("flex flex-col gap-2", className)} {...props}>
        {children}
      </div>
    </DisclosureGroupContext.Provider>
  );
}

export type DisclosureProps = Omit<
  React.ComponentProps<typeof Collapsible.Root>,
  "open" | "defaultOpen" | "onOpenChange" | "disabled"
> & {
  isExpanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  disabled?: boolean;
};

export function Disclosure({
  id,
  className,
  children,
  isExpanded,
  defaultExpanded = false,
  onExpandedChange,
  disabled,
  ...props
}: DisclosureProps) {
  const group = useContext(DisclosureGroupContext);
  const generatedId = useId();
  const key = id ?? generatedId;
  const [localOpen, setLocalOpen] = useState(defaultExpanded);
  const open = isExpanded ?? (group ? group.expandedKeys.has(key) : localOpen);
  const handleOpenChange = (next: boolean) => {
    if (group) group.setExpanded(key, next);
    else setLocalOpen(next);
    onExpandedChange?.(next);
  };
  return (
    <Collapsible.Root
      id={id}
      open={open}
      onOpenChange={handleOpenChange}
      disabled={disabled}
      data-slot="disclosure"
      className={cn(
        "group/disclosure w-full rounded-lg border border-border bg-background transition-colors data-[state=open]:border-ring/50 data-[state=open]:bg-muted/20",
        className,
      )}
      {...props}
    >
      {children}
    </Collapsible.Root>
  );
}

export interface DisclosureTriggerProps extends Omit<React.ComponentProps<typeof Collapsible.Trigger>, "children"> {
  children?: React.ReactNode;
  triggerIndicator?: boolean;
}

export function DisclosureTrigger({ className, triggerIndicator = true, children, ...props }: DisclosureTriggerProps) {
  return (
    <Collapsible.Trigger
      data-slot="disclosure-trigger"
      className={cn(
        "flex w-full items-center justify-between gap-4 px-4 py-3 text-start text-sm font-medium",
        className,
      )}
      {...props}
    >
      {children}
      {triggerIndicator && (
        <IconChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-transform data-[state=open]:rotate-180 group-data-[state=open]/disclosure:rotate-180"
        />
      )}
    </Collapsible.Trigger>
  );
}

export function DisclosurePanel({ className, children, ...props }: React.ComponentProps<typeof Collapsible.Content>) {
  return (
    <Collapsible.Content
      data-slot="disclosure-panel"
      className={cn(
        "overflow-hidden text-sm data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up motion-reduce:!animate-none",
        className,
      )}
      {...props}
    >
      <div className="px-4 pb-4 text-muted-foreground">{children}</div>
    </Collapsible.Content>
  );
}

"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

function Combobox({ ...props }: React.ComponentProps<typeof Popover>) {
  return <Popover data-slot="combobox" {...props} />
}

function ComboboxValue({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="combobox-value" className={cn("truncate", className)} {...props} />
}

function ComboboxTrigger({ className, children, ...props }: React.ComponentProps<typeof PopoverTrigger>) {
  return (
    <PopoverTrigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children ?? <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />}
    </PopoverTrigger>
  )
}

function ComboboxClear({ className, children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label="Clear selection"
      className={cn(className)}
      {...props}
    >
      {children ?? <XIcon className="pointer-events-none" />}
    </Button>
  )
}

function ComboboxInput({ className, ...props }: React.ComponentProps<typeof CommandInput>) {
  return <CommandInput data-slot="combobox-input" className={className} {...props} />
}

function ComboboxContent({ className, children, ...props }: React.ComponentProps<typeof PopoverContent>) {
  return (
    <PopoverContent
      data-slot="combobox-content"
      className={cn("w-(--radix-popover-trigger-width) min-w-48 p-1", className)}
      {...props}
    >
      <Command>{children}</Command>
    </PopoverContent>
  )
}

function ComboboxList({ className, ...props }: React.ComponentProps<typeof CommandList>) {
  return <CommandList data-slot="combobox-list" className={cn("max-h-72", className)} {...props} />
}

function ComboboxItem({ className, children, ...props }: React.ComponentProps<typeof CommandItem>) {
  return (
    <CommandItem data-slot="combobox-item" className={cn("pr-8", className)} {...props}>
      {children}
      <CheckIcon className="ml-auto opacity-0 group-data-[selected=true]/command-item:opacity-100" />
    </CommandItem>
  )
}

function ComboboxGroup({ className, ...props }: React.ComponentProps<typeof CommandGroup>) {
  return <CommandGroup data-slot="combobox-group" className={className} {...props} />
}

function ComboboxLabel({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="combobox-label" className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)} {...props} />
}

function ComboboxCollection({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="combobox-collection" className={className} {...props} />
}

function ComboboxEmpty({ className, ...props }: React.ComponentProps<typeof CommandEmpty>) {
  return <CommandEmpty data-slot="combobox-empty" className={className} {...props} />
}

function ComboboxSeparator({ className, ...props }: React.ComponentProps<typeof CommandSeparator>) {
  return <CommandSeparator data-slot="combobox-separator" className={className} {...props} />
}

function ComboboxChips({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="combobox-chips"
      className={cn("flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-input px-2.5 py-1.5", className)}
      {...props}
    />
  )
}

function ComboboxChip({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="combobox-chip"
      className={cn("flex h-6 items-center gap-1 rounded-sm bg-muted px-1.5 text-xs font-medium", className)}
      {...props}
    >
      {children}
    </span>
  )
}

function ComboboxChipsInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return <Input data-slot="combobox-chip-input" className={cn("h-6 min-w-16 flex-1 border-0 p-0 shadow-none", className)} {...props} />
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxClear,
  useComboboxAnchor,
}

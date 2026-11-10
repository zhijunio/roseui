"use client";

import * as React from "react";
import {
  Button as AriaButton,
  ComboBox as AriaComboBox,
  ComboBoxValue as AriaComboBoxValue,
  Group as AriaGroup,
  Input as AriaInput,
  Popover as AriaPopover,
} from "react-aria-components";
import { IconChevronDown } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

function ComboBox({
  className,
  variant = "primary",
  ...props
}: React.ComponentProps<typeof AriaComboBox> & {
  variant?: "primary" | "secondary";
}) {
  return (
    <AriaComboBox
      data-slot="combobox"
      data-variant={variant}
      className={cn("group/combobox flex min-w-0 flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function ComboBoxInputGroup({
  className,
  ...props
}: React.ComponentProps<typeof AriaGroup>) {
  return (
    <AriaGroup
      data-slot="combobox-input-group"
      className={cn(
        "group/combobox-input flex h-9 min-w-0 items-center overflow-hidden rounded-lg border border-input bg-background shadow-sm transition-colors",
        "hover:bg-accent/30",
        "data-[invalid=true]:border-destructive",
        "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",
        "group-data-[variant=secondary]/combobox:bg-muted/40 group-data-[variant=secondary]/combobox:shadow-none",
        className,
      )}
      {...props}
    />
  );
}

function ComboBoxInput({
  className,
  ...props
}: React.ComponentProps<typeof AriaInput>) {
  return (
    <AriaInput
      data-slot="combobox-input"
      className={cn(
        "h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground",
        "disabled:cursor-not-allowed aria-invalid:text-destructive",
        className,
      )}
      {...props}
    />
  );
}

function ComboBoxTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AriaButton>) {
  return (
    <AriaButton
      slot="trigger"
      data-slot="combobox-trigger"
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    >
      {children ?? <IconChevronDown aria-hidden="true" className="size-4" />}
    </AriaButton>
  );
}

function ComboBoxValue<T extends object>({
  className,
  ...props
}: React.ComponentProps<typeof AriaComboBoxValue<T>>) {
  return (
    <AriaComboBoxValue<T>
      data-slot="combobox-value"
      className={cn("flex min-w-0 items-center gap-1 text-sm", className)}
      {...props}
    />
  );
}

function ComboBoxPopover({
  className,
  ...props
}: React.ComponentProps<typeof AriaPopover>) {
  return (
    <AriaPopover
      data-slot="combobox-popover"
      className={cn(
        "z-50 w-(--trigger-width) overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-md outline-none",
        "data-[entering]:animate-in data-[entering]:fade-in-0 data-[entering]:zoom-in-95 data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95 motion-reduce:!animate-none motion-reduce:!transition-none",
        className,
      )}
      {...props}
    />
  );
}

export {
  ComboBox,
  ComboBoxInput,
  ComboBoxInputGroup,
  ComboBoxPopover,
  ComboBoxTrigger,
  ComboBoxValue,
};

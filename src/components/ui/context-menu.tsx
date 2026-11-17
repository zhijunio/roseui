"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

function ContextMenu(props: React.ComponentProps<typeof ContextMenuPrimitive.Root>) { return <ContextMenuPrimitive.Root {...props} />; }
function ContextMenuTrigger({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) { return <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" className={cn("[-webkit-touch-callout:none]", className)} {...props} />; }

function ContextMenuContent({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Content> & { side?: "top" | "right" | "bottom" | "left" }) {
  return <ContextMenuPrimitive.Portal><ContextMenuPrimitive.Content data-slot="context-menu-content" className={cn("z-50 min-w-36 overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:!animate-none motion-reduce:!transition-none", className)} {...props} /></ContextMenuPrimitive.Portal>;
}

function ContextMenuGroup(props: React.ComponentProps<typeof ContextMenuPrimitive.Group>) { return <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />; }

type ContextMenuItemProps = React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  disabled?: boolean;
  inset?: boolean;
  variant?: "default" | "destructive";
};
function ContextMenuItem({ className, inset, variant = "default", disabled, ...props }: ContextMenuItemProps) {
  return <ContextMenuPrimitive.Item data-slot="context-menu-item" data-inset={inset || undefined} data-variant={variant} disabled={disabled} className={cn("relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10", className)} {...props} />;
}

function ContextMenuCheckboxItem({ className, children, inset, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem> & { inset?: boolean }) {
  return <ContextMenuPrimitive.CheckboxItem data-slot="context-menu-checkbox-item" data-inset={inset || undefined} className={cn("relative flex cursor-default select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent data-inset:pl-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)} {...props}><span className="absolute left-2 flex size-4 items-center justify-center"><ContextMenuPrimitive.ItemIndicator><Check className="size-4" /></ContextMenuPrimitive.ItemIndicator></span>{children}</ContextMenuPrimitive.CheckboxItem>;
}

function ContextMenuRadioGroup(props: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) { return <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />; }
function ContextMenuRadioItem({ className, children, inset, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem> & { inset?: boolean }) {
  return <ContextMenuPrimitive.RadioItem data-slot="context-menu-radio-item" data-inset={inset || undefined} className={cn("relative flex cursor-default select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent data-inset:pl-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)} {...props}><span className="absolute left-2 flex size-4 items-center justify-center"><ContextMenuPrimitive.ItemIndicator><Circle className="size-2 fill-current" /></ContextMenuPrimitive.ItemIndicator></span>{children}</ContextMenuPrimitive.RadioItem>;
}

function ContextMenuSub(props: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) { return <ContextMenuPrimitive.Sub {...props} />; }
function ContextMenuSubTrigger({ className, inset, children, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }) {
  return <ContextMenuPrimitive.SubTrigger data-slot="context-menu-sub-trigger" data-inset={inset || undefined} className={cn("flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent data-inset:pl-8", className)} {...props}>{children}<ChevronRight className="ml-auto size-4" /></ContextMenuPrimitive.SubTrigger>;
}
function ContextMenuSubContent({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return <ContextMenuPrimitive.Portal><ContextMenuPrimitive.SubContent data-slot="context-menu-sub-content" className={cn("z-50 min-w-32 overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:!animate-none", className)} {...props} /></ContextMenuPrimitive.Portal>;
}

function ContextMenuSeparator({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) { return <ContextMenuPrimitive.Separator data-slot="context-menu-separator" className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />; }
function ContextMenuLabel({ className, inset, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Label> & { inset?: boolean }) { return <ContextMenuPrimitive.Label data-slot="context-menu-label" data-inset={inset || undefined} className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground data-inset:pl-8", className)} {...props} />; }
function ContextMenuShortcut({ className, ...props }: React.ComponentProps<"span">) { return <span data-slot="context-menu-shortcut" className={cn("ml-auto text-xs tracking-widest text-muted-foreground group-focus/context-menu-item:text-accent-foreground", className)} {...props} />; }
function ContextMenuPortal(props: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) { return <ContextMenuPrimitive.Portal {...props} />; }

export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuGroup, ContextMenuLabel, ContextMenuShortcut, ContextMenuSeparator, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent, ContextMenuPortal };

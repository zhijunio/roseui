"use client";

import * as React from "react";
import { ContextMenu as Primitive } from "radix-ui";
import { IconCheck as Check, IconChevronRight as ChevronRight, IconCircle as Circle } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const ContextMenu = Primitive.Root;
type ContextMenuTriggerProps = React.ComponentPropsWithRef<typeof Primitive.Trigger> & { longPressDuration?: number | null };

function ContextMenuTrigger({ ref, className, longPressDuration = 500, onPointerDown, onPointerUp, onPointerCancel, onPointerLeave, onContextMenu, onClick, ...props }: ContextMenuTriggerProps) {
  const timer = React.useRef<number | null>(null);
  const clickSuppressionTimer = React.useRef<number | null>(null);
  const didLongPress = React.useRef(false);
  const clearTimer = React.useCallback(() => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  }, []);
  const clearClickSuppressionTimer = React.useCallback(() => {
    if (clickSuppressionTimer.current !== null) window.clearTimeout(clickSuppressionTimer.current);
    clickSuppressionTimer.current = null;
  }, []);

  React.useEffect(() => () => { clearTimer(); clearClickSuppressionTimer(); }, [clearClickSuppressionTimer, clearTimer]);

  return <Primitive.Trigger
    ref={ref}
    className={cn("[-webkit-touch-callout:none]", className)}
    {...props}
    data-slot="context-menu-trigger"
    onPointerDown={(event) => {
      clearClickSuppressionTimer();
      didLongPress.current = false;
      onPointerDown?.(event);
      if (event.defaultPrevented || event.pointerType !== "touch" || longPressDuration === null) return;
      clearTimer();
      const trigger = event.currentTarget;
      const { clientX, clientY } = event;
      timer.current = window.setTimeout(() => {
        didLongPress.current = true;
        const view = trigger.ownerDocument.defaultView;
        if (!view) return;
        trigger.dispatchEvent(new view.MouseEvent("contextmenu", { bubbles: true, cancelable: true, clientX, clientY, view }));
      }, Math.max(0, longPressDuration));
    }}
    onPointerUp={(event) => {
      clearTimer();
      onPointerUp?.(event);
      if (didLongPress.current) {
        clearClickSuppressionTimer();
        clickSuppressionTimer.current = window.setTimeout(() => { didLongPress.current = false; clickSuppressionTimer.current = null; }, 750);
      }
    }}
    onPointerCancel={(event) => { clearTimer(); clearClickSuppressionTimer(); didLongPress.current = false; onPointerCancel?.(event); }}
    onPointerLeave={(event) => { clearTimer(); onPointerLeave?.(event); }}
    onContextMenu={(event) => { clearTimer(); onContextMenu?.(event); }}
    onClick={(event) => {
      if (didLongPress.current) { event.preventDefault(); event.stopPropagation(); clearClickSuppressionTimer(); didLongPress.current = false; return; }
      onClick?.(event);
    }}
  />;
}
const ContextMenuGroup = Primitive.Group;
const ContextMenuPortal = Primitive.Portal;
const ContextMenuSub = Primitive.Sub;
const ContextMenuRadioGroup = Primitive.RadioGroup;

function ContextMenuContent({ ref, className, ...props }: React.ComponentPropsWithRef<typeof Primitive.Content>) {
  return <Primitive.Portal><Primitive.Content ref={ref} className={cn("z-50 min-w-36 overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-md outline-none", className)} {...props} /></Primitive.Portal>;
}

type ContextMenuItemProps = React.ComponentPropsWithRef<typeof Primitive.Item> & { inset?: boolean; variant?: "default" | "destructive" };

function ContextMenuItem({ ref, className, inset, variant = "default", ...props }: ContextMenuItemProps) {
  return <Primitive.Item ref={ref} className={cn("relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", variant === "destructive" && "text-destructive focus:bg-destructive/10", className)} {...props} />;
}

function ContextMenuCheckboxItem({ ref, className, children, checked, ...props }: React.ComponentPropsWithRef<typeof Primitive.CheckboxItem>) {
  return <Primitive.CheckboxItem ref={ref} checked={checked} className={cn("relative flex cursor-default select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)} {...props}><span className="absolute left-2 flex size-4 items-center justify-center">{checked === "indeterminate" ? <span className="h-0.5 w-2 bg-current" /> : <Primitive.ItemIndicator><Check className="size-4" /></Primitive.ItemIndicator>}</span>{children}</Primitive.CheckboxItem>;
}

function ContextMenuRadioItem({ ref, className, children, ...props }: React.ComponentPropsWithRef<typeof Primitive.RadioItem>) {
  return <Primitive.RadioItem ref={ref} className={cn("relative flex cursor-default select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)} {...props}><span className="absolute left-2 flex size-4 items-center justify-center"><Primitive.ItemIndicator><Circle className="size-2 fill-current" /></Primitive.ItemIndicator></span>{children}</Primitive.RadioItem>;
}

type ContextMenuSubTriggerProps = React.ComponentPropsWithRef<typeof Primitive.SubTrigger> & { inset?: boolean };

function ContextMenuSubTrigger({ ref, className, inset, children, ...props }: ContextMenuSubTriggerProps) {
  return <Primitive.SubTrigger ref={ref} className={cn("flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent", inset && "pl-8", className)} {...props}>{children}<ChevronRight className="ml-auto size-4" /></Primitive.SubTrigger>;
}

function ContextMenuSubContent({ ref, className, ...props }: React.ComponentPropsWithRef<typeof Primitive.SubContent>) {
  return <Primitive.SubContent ref={ref} className={cn("z-50 min-w-32 overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-md", className)} {...props} />;
}

function ContextMenuSeparator({ ref, className, ...props }: React.ComponentPropsWithRef<typeof Primitive.Separator>) {
  return <Primitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />;
}

type ContextMenuLabelProps = React.ComponentPropsWithRef<typeof Primitive.Label> & { inset?: boolean };

function ContextMenuLabel({ ref, className, inset, ...props }: ContextMenuLabelProps) {
  return <Primitive.Label ref={ref} className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", inset && "pl-8", className)} {...props} />;
}

export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuGroup, ContextMenuLabel, ContextMenuSeparator, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent, ContextMenuPortal };

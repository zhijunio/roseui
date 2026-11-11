"use client";

import * as React from "react";

import { IconDots, IconX } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SwipeAction = {
  label: string;
  icon?: React.ReactNode;
  onSelect: () => void;
  variant?: "default" | "destructive";
};

export type SwipeActionsProps = {
  children: React.ReactNode;
  actions: SwipeAction[];
  className?: string;
  label?: string;
};

export function SwipeActions({ children, actions, className, label = "Item actions" }: SwipeActionsProps) {
  const [open, setOpen] = React.useState(false);
  const pointerStart = React.useRef<{ x: number; y: number } | null>(null);
  const swipedRef = React.useRef(false);
  const actionWidth = actions.length * 40 + 8;

  function finishAction(action: SwipeAction) {
    action.onSelect();
    setOpen(false);
  }

  return (
    <div
      data-slot="swipe-actions"
      data-open={open || undefined}
      className={cn("relative isolate overflow-hidden rounded-xl border bg-card", className)}
      style={{ touchAction: "pan-y" }}
      onPointerDown={(event) => {
        pointerStart.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={(event) => {
        if (!pointerStart.current) return;
        const deltaX = event.clientX - pointerStart.current.x;
        const deltaY = event.clientY - pointerStart.current.y;
        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
          setOpen(deltaX < 0);
          swipedRef.current = true;
          window.setTimeout(() => {
            swipedRef.current = false;
          }, 400);
        }
        pointerStart.current = null;
      }}
      onPointerCancel={() => {
        pointerStart.current = null;
      }}
      onClickCapture={(event) => {
        if (!swipedRef.current) return;
        event.preventDefault();
        event.stopPropagation();
        swipedRef.current = false;
      }}
    >
      <div aria-hidden={!open} className="absolute inset-y-0 right-0 flex items-center gap-2 px-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            type="button"
            variant={action.variant === "destructive" ? "destructive" : "secondary"}
            size="icon-sm"
            aria-label={action.label}
            tabIndex={open ? 0 : -1}
            onClick={() => finishAction(action)}
          >
            {action.icon ?? (action.label === "Close" ? <IconX /> : action.label.slice(0, 1))}
          </Button>
        ))}
      </div>
      <div
        className="relative flex min-w-0 items-center gap-2 bg-card p-3 motion-safe:transition-transform motion-safe:duration-200 motion-reduce:transition-none"
        style={{
          transform: open ? `translateX(-${actionWidth}px)` : undefined,
        }}
      >
        <div className="min-w-0 flex-1">{children}</div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={open ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <IconX /> : <IconDots />}
        </Button>
      </div>
    </div>
  );
}

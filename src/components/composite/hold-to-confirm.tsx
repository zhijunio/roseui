"use client";

import * as React from "react";

import { IconCheck } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type HoldToConfirmProps = Omit<React.ComponentProps<typeof Button>, "onClick" | "children"> & {
  label: React.ReactNode;
  confirmedLabel?: string;
  duration?: number;
  onConfirm: () => void;
  onHoldChange?: (holding: boolean) => void;
  resetOnComplete?: boolean;
};

export function HoldToConfirm({
  label,
  confirmedLabel = "Confirmed",
  duration = 1200,
  onConfirm,
  onHoldChange,
  resetOnComplete = false,
  className,
  disabled,
  ...buttonProps
}: HoldToConfirmProps) {
  const [progress, setProgress] = React.useState(0);
  const [confirmed, setConfirmed] = React.useState(false);
  const frameRef = React.useRef<number | null>(null);
  const resetTimerRef = React.useRef<number | null>(null);
  const startRef = React.useRef<number | null>(null);
  const completedRef = React.useRef(false);

  const stop = React.useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    startRef.current = null;
    onHoldChange?.(false);
    if (!completedRef.current) setProgress(0);
  }, [onHoldChange]);

  const complete = React.useCallback(() => {
    completedRef.current = true;
    setProgress(1);
    setConfirmed(true);
    onHoldChange?.(false);
    onConfirm();
    if (resetOnComplete) {
      resetTimerRef.current = window.setTimeout(() => {
        resetTimerRef.current = null;
        completedRef.current = false;
        setConfirmed(false);
        setProgress(0);
      }, 900);
    }
  }, [onConfirm, onHoldChange, resetOnComplete]);

  function tick(now: number) {
    if (startRef.current === null) startRef.current = now;
    const next = Math.min(1, (now - startRef.current) / Math.max(300, duration));
    setProgress(next);
    if (next >= 1) {
      frameRef.current = null;
      complete();
      return;
    }
    frameRef.current = requestAnimationFrame(tick);
  }

  function start() {
    if (disabled || completedRef.current || frameRef.current !== null) return;
    startRef.current = null;
    onHoldChange?.(true);
    frameRef.current = requestAnimationFrame(tick);
  }

  React.useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
    },
    [],
  );

  return (
    <Button
      {...buttonProps}
      type="button"
      variant="destructive"
      disabled={disabled || confirmed}
      aria-label={confirmed ? confirmedLabel : typeof label === "string" ? label : undefined}
      aria-describedby={buttonProps["aria-describedby"]}
      aria-disabled={confirmed || undefined}
      data-slot="hold-to-confirm"
      data-holding={(progress > 0 && !confirmed) || undefined}
      onPointerDown={(event) => {
        buttonProps.onPointerDown?.(event);
        if (!event.defaultPrevented) start();
      }}
      onPointerUp={(event) => {
        buttonProps.onPointerUp?.(event);
        stop();
      }}
      onPointerCancel={(event) => {
        buttonProps.onPointerCancel?.(event);
        stop();
      }}
      onPointerLeave={(event) => {
        buttonProps.onPointerLeave?.(event);
        stop();
      }}
      onBlur={(event) => {
        buttonProps.onBlur?.(event);
        stop();
      }}
      onKeyDown={(event) => {
        buttonProps.onKeyDown?.(event);
        if (!event.defaultPrevented && (event.key === " " || event.key === "Enter")) {
          event.preventDefault();
          start();
        }
      }}
      onKeyUp={(event) => {
        buttonProps.onKeyUp?.(event);
        if (event.key === " " || event.key === "Enter") stop();
      }}
      className={cn("relative isolate overflow-hidden select-none touch-none", className)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 origin-left bg-current/15 motion-reduce:hidden"
        style={{ transform: `scaleX(${progress})` }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {confirmed ? (
          <>
            <IconCheck aria-hidden />
            {confirmedLabel}
          </>
        ) : (
          label
        )}
      </span>
      <span className="sr-only">Press and hold, or hold Space or Enter, to confirm.</span>
    </Button>
  );
}

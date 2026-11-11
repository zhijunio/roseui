"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type SelectionProps =
  | { pressed: boolean; defaultPressed?: never; onPressedChange?: (pressed: boolean) => void }
  | { pressed?: never; defaultPressed?: boolean; onPressedChange?: (pressed: boolean) => void };

export type EmojiReactionButtonProps = Omit<React.ComponentProps<"button">, "aria-pressed"> &
  SelectionProps & {
    emoji: React.ReactNode;
    label: string;
    count?: number;
    size?: "sm" | "md" | "lg";
    readOnly?: boolean;
  };

export function EmojiReactionButton({
  emoji,
  label,
  count = 0,
  size = "md",
  pressed,
  defaultPressed = false,
  onPressedChange,
  readOnly = false,
  disabled = false,
  "aria-label": ariaLabel,
  className,
  type = "button",
  onClick,
  ...props
}: EmojiReactionButtonProps) {
  const [uncontrolledPressed, setUncontrolledPressed] = React.useState(defaultPressed);
  const isControlled = pressed !== undefined;
  const isPressed = isControlled ? pressed : uncontrolledPressed;
  const safeCount = Number.isFinite(count) ? Math.max(0, count) : 0;
  const displayCount = Math.max(0, safeCount + Number(isPressed));
  const isDisabled = disabled || readOnly;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (readOnly) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
    if (event.defaultPrevented || isDisabled) return;
    const nextPressed = !isPressed;
    if (!isControlled) setUncontrolledPressed(nextPressed);
    onPressedChange?.(nextPressed);
  }

  return (
    <button
      {...props}
      type={type}
      data-slot="emoji-reaction-button"
      data-selected={isPressed}
      data-size={size}
      aria-label={ariaLabel ?? `${label}, ${displayCount} ${displayCount === 1 ? "reaction" : "reactions"}`}
      aria-pressed={isPressed}
      aria-disabled={readOnly || undefined}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border font-medium tabular-nums outline-none motion-safe:transition-[background-color,border-color,color,transform] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-safe:active:scale-95 motion-reduce:!transition-none motion-reduce:active:scale-100 disabled:pointer-events-none disabled:opacity-50",
        size === "sm" && "h-7 min-w-10 px-2 text-xs [&_[data-slot=emoji-reaction-count]]:text-xs",
        size === "md" && "h-8 min-w-11 px-2.5 text-sm",
        size === "lg" && "h-10 min-w-14 px-3 text-base [&_[data-slot=emoji-reaction-count]]:text-sm",
        isPressed
          ? "border-border bg-primary/10 text-primary"
          : cn("border-border bg-muted/50 text-foreground", !readOnly && "hover:bg-muted"),
        readOnly && "cursor-default",
        className,
      )}
    >
      <span data-slot="emoji-reaction-emoji" aria-hidden="true" className="leading-none">
        {emoji}
      </span>
      <span data-slot="emoji-reaction-count" aria-hidden="true" className="text-muted-foreground">
        {displayCount.toLocaleString()}
      </span>
    </button>
  );
}

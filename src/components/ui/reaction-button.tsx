"use client";

import { type ComponentProps, type ReactNode, useState } from "react";

import { Star as IconStar, ThumbsUp as IconThumbUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ReactionButton({
  icon,
  label,
  count,
  pressed,
  defaultPressed = false,
  onPressedChange,
  onPress,
  ...buttonProps
}: {
  icon?: ReactNode;
  label: ReactNode;
  count: number;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
} & Omit<ComponentProps<typeof Button>, "children" | "aria-pressed">) {
  const [uncontrolledPressed, setUncontrolledPressed] = useState(defaultPressed);
  const isPressed = pressed ?? uncontrolledPressed;
  const iconNode =
    icon === "like" ? (
      <IconThumbUp aria-hidden className={isPressed ? "fill-current" : undefined} />
    ) : icon === "star" ? (
      <IconStar aria-hidden className={isPressed ? "fill-current" : undefined} />
    ) : (
      (icon ?? <IconThumbUp aria-hidden />)
    );

  return (
    <Button
      {...buttonProps}
      variant={buttonProps.variant ?? "outline"}
      aria-pressed={isPressed}
      onPress={(event) => {
        const nextPressed = !isPressed;
        if (pressed === undefined) setUncontrolledPressed(nextPressed);
        onPressedChange?.(nextPressed);
        onPress?.(event);
      }}
    >
      {iconNode}
      {label}
      <span className="ml-1 border-l border-current/30 pl-3 text-xs">{count + (isPressed ? 1 : 0)}</span>
    </Button>
  );
}

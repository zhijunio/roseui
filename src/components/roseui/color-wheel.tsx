"use client";

import * as React from "react";

import { ColorThumb, ColorWheelContext } from "@/components/roseui/color-thumb";
import { Color, parseColor } from "@/lib/color";
import { cn } from "@/lib/utils";

export type ColorWheelProps = Omit<React.ComponentProps<"div">, "onChange" | "value" | "defaultValue"> & {
  value?: Color | string;
  defaultValue?: Color | string;
  onChange?: (color: Color) => void;
  disabled?: boolean;
};

export function ColorWheel({
  className,
  value,
  defaultValue = "#dc2626",
  onChange,
  disabled,
  children,
  ...props
}: ColorWheelProps) {
  const initial = defaultValue instanceof Color ? defaultValue : parseColor(defaultValue);
  const [internal, setInternal] = React.useState(initial);
  const color = value instanceof Color ? value : typeof value === "string" ? parseColor(value) : internal;
  const hue = color.toFormat("hsl").getChannelValue("hue");
  const update = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const angle =
      ((Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2)) * 180) /
        Math.PI +
        90 +
        360) %
      360;
    const next = color.withChannel("hue", angle);
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };
  const context = React.useMemo(() => ({ hue, disabled: Boolean(disabled) }), [hue, disabled]);
  return (
    <ColorWheelContext.Provider value={context}>
      <div
        {...props}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        aria-valuemin={0}
        aria-valuemax={359}
        aria-valuenow={Math.round(hue)}
        aria-valuetext={`${Math.round(hue)} degrees`}
        data-slot="color-wheel"
        className={cn(
          "relative isolate size-52 touch-none rounded-full",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        onPointerDown={(event) => {
          if (!disabled) {
            event.currentTarget.setPointerCapture(event.pointerId);
            update(event);
          }
        }}
        onPointerMove={(event) => {
          if (event.buttons === 1) update(event);
        }}
      >
        {children ?? <ColorWheelTrack />}
        <ColorThumb />
      </div>
    </ColorWheelContext.Provider>
  );
}

export function ColorWheelTrack({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="color-wheel-track"
      aria-hidden="true"
      className={cn(
        "absolute inset-0 rounded-full bg-[conic-gradient(red,yellow,lime,aqua,blue,magenta,red)]",
        className,
      )}
      style={{
        ...style,
        background: style?.background ?? "conic-gradient(#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)",
      }}
      {...props}
    />
  );
}

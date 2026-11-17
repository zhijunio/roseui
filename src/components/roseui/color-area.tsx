"use client";

import * as React from "react";

import { useColorPickerContext } from "@/components/roseui/color-field";
import { Color, type ColorChannel, type ColorFormat, getColorChannelMax, parseColor } from "@/lib/color";
import { cn } from "@/lib/utils";

type ColorAreaContextValue = {
  color: Color;
  xChannel: ColorChannel;
  yChannel: ColorChannel;
  colorSpace: ColorFormat;
  disabled: boolean;
};
const ColorAreaContext = React.createContext<ColorAreaContextValue | null>(null);

type ColorAreaProps = Omit<React.ComponentProps<"div">, "onChange" | "value" | "defaultValue"> & {
  value?: Color | string;
  defaultValue?: Color | string;
  onChange?: (color: Color) => void;
  colorSpace?: ColorFormat;
  xChannel?: ColorChannel;
  yChannel?: ColorChannel;
  disabled?: boolean;
  showDots?: boolean;
};

export function ColorArea({
  className,
  value,
  defaultValue = "#2563eb",
  onChange,
  colorSpace = "hsl",
  xChannel = "saturation",
  yChannel = "lightness",
  disabled,
  showDots = false,
  children,
  style,
  ...props
}: ColorAreaProps) {
  const picker = useColorPickerContext();
  const initial = defaultValue instanceof Color ? defaultValue : parseColor(defaultValue);
  const [internal, setInternal] = React.useState(initial);
  const controlled = value instanceof Color ? value : typeof value === "string" ? parseColor(value) : picker?.color;
  const color = controlled ?? internal;
  const ref = React.useRef<HTMLDivElement>(null);
  const update = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)) * getColorChannelMax(xChannel);
    const y = (1 - Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))) * getColorChannelMax(yChannel);
    const next = color.withChannel(xChannel, x, colorSpace).withChannel(yChannel, y, colorSpace);
    if (value === undefined && !picker) setInternal(next);
    else picker?.update(next);
    onChange?.(next);
  };
  const areaContext = React.useMemo(
    () => ({ color, xChannel, yChannel, colorSpace, disabled: Boolean(disabled) }),
    [color, colorSpace, disabled, xChannel, yChannel],
  );
  return (
    <ColorAreaContext.Provider value={areaContext}>
      <div
        {...props}
        ref={ref}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        aria-valuetext={color.toString("hex")}
        data-slot="color-area"
        data-show-dots={showDots || undefined}
        className={cn(
          "relative isolate block h-48 w-full max-w-sm touch-none overflow-hidden rounded-lg",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        style={{
          ...style,
          backgroundColor: style?.backgroundColor ?? color.toString("hex"),
          backgroundImage:
            style?.backgroundImage ??
            "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
        }}
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
        {showDots && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff8c 1px, transparent 1px)",
              backgroundSize: "12px 12px",
            }}
          />
        )}
        {children}
      </div>
    </ColorAreaContext.Provider>
  );
}

export function ColorAreaThumb({ className, ...props }: React.ComponentProps<"span">) {
  const area = React.useContext(ColorAreaContext);
  const channels = area?.color.toFormat(area.colorSpace);
  const x = area && channels ? (channels.getChannelValue(area.xChannel) / getColorChannelMax(area.xChannel)) * 100 : 50;
  const y =
    area && channels ? 100 - (channels.getChannelValue(area.yChannel) / getColorChannelMax(area.yChannel)) * 100 : 50;
  return (
    <span
      data-slot="color-area-thumb"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md outline-none",
        area?.disabled && "opacity-50",
        className,
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
      {...props}
    />
  );
}

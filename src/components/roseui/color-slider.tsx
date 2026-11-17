"use client";

import * as React from "react";

import { useColorPickerContext } from "@/components/roseui/color-field";
import { Color, type ColorChannel, type ColorFormat, getColorChannelMax, parseColor } from "@/lib/color";
import { cn } from "@/lib/utils";

type ColorSliderContextValue = {
  color: Color;
  channel: ColorChannel;
  colorSpace: ColorFormat;
  disabled: boolean;
  orientation: "horizontal" | "vertical";
};
const ColorSliderContext = React.createContext<ColorSliderContextValue | null>(null);

type ColorSliderProps = Omit<React.ComponentProps<"div">, "onChange" | "value" | "defaultValue"> & {
  value?: Color | string;
  defaultValue?: Color | string;
  onChange?: (color: Color) => void;
  channel: ColorChannel;
  colorSpace?: ColorFormat;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
};

export function ColorSlider({
  className,
  value,
  defaultValue = "#2563eb",
  onChange,
  channel,
  colorSpace = "hsl",
  orientation = "horizontal",
  disabled,
  children,
  ...props
}: ColorSliderProps) {
  const picker = useColorPickerContext();
  const initial = defaultValue instanceof Color ? defaultValue : parseColor(defaultValue);
  const [internal, setInternal] = React.useState(initial);
  const controlled = value instanceof Color ? value : typeof value === "string" ? parseColor(value) : picker?.color;
  const color = controlled ?? internal;
  const current = color.toFormat(colorSpace).getChannelValue(channel);
  const max = getColorChannelMax(channel);
  const step = channel === "hue" || channel === "red" || channel === "green" || channel === "blue" ? 1 : 0.1;
  const nextContext = React.useMemo(
    () => ({ color, channel, colorSpace, disabled: Boolean(disabled), orientation }),
    [channel, color, colorSpace, disabled, orientation],
  );
  return (
    <ColorSliderContext.Provider value={nextContext}>
      <div
        data-slot="color-slider"
        data-orientation={orientation}
        className={cn(
          "relative flex w-full touch-none flex-col gap-2",
          orientation === "vertical" && "h-full w-auto flex-row",
          className,
        )}
        {...props}
      >
        {children}
        <input
          aria-label={props["aria-label"]}
          type="range"
          min="0"
          max={max}
          step={step}
          value={current}
          disabled={disabled}
          className="absolute inset-0 z-10 m-0 h-full w-full cursor-pointer opacity-0"
          onChange={(event) => {
            const next = color.withChannel(channel, Number(event.currentTarget.value), colorSpace);
            if (value === undefined && !picker) setInternal(next);
            else picker?.update(next);
            onChange?.(next);
          }}
        />
      </div>
    </ColorSliderContext.Provider>
  );
}

export function ColorSliderTrack({ className, ...props }: React.ComponentProps<"div">) {
  const slider = React.useContext(ColorSliderContext);
  return (
    <div
      data-slot="color-slider-track"
      data-orientation={slider?.orientation}
      className={cn("relative h-3 w-full rounded-full", slider?.orientation === "vertical" && "h-full w-3", className)}
      {...props}
    />
  );
}

export function ColorSliderThumb({ className, ...props }: React.ComponentProps<"span">) {
  const slider = React.useContext(ColorSliderContext);
  const current = slider ? slider.color.toFormat(slider.colorSpace).getChannelValue(slider.channel) : 0;
  const maximum = slider ? getColorChannelMax(slider.channel) : 100;
  const percentage = maximum ? (current / maximum) * 100 : 0;
  const style = slider?.orientation === "vertical" ? { bottom: `${percentage}%` } : { left: `${percentage}%` };
  return (
    <span
      aria-hidden="true"
      data-slot="color-slider-thumb"
      data-disabled={slider?.disabled || undefined}
      className={cn(
        "pointer-events-none absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md outline-none",
        slider?.orientation === "vertical" && "left-1/2 top-auto translate-x-[-50%] translate-y-1/2",
        slider?.disabled && "opacity-50",
        className,
      )}
      style={{ ...style, ...props.style }}
      {...props}
    />
  );
}

"use client";

import * as React from "react";

import { useColorPickerContext } from "@/components/roseui/color-field";
import { Color, parseColor } from "@/lib/color";
import { cn } from "@/lib/utils";

type SwatchPickerContextValue = { color: string; disabled: boolean; select: (color: Color) => void };
const SwatchPickerContext = React.createContext<SwatchPickerContextValue | null>(null);

export function ColorSwatchPicker({
  className,
  layout = "grid",
  value,
  defaultValue,
  onChange,
  disabled,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange" | "value" | "defaultValue"> & {
  layout?: "grid" | "stack";
  value?: Color | string;
  defaultValue?: Color | string;
  onChange?: (color: Color) => void;
  disabled?: boolean;
}) {
  const picker = useColorPickerContext();
  const initial = defaultValue instanceof Color ? defaultValue : parseColor(defaultValue ?? "#2563eb");
  const [internal, setInternal] = React.useState(initial);
  const external = value instanceof Color ? value : typeof value === "string" ? parseColor(value) : picker?.color;
  const color = external ?? internal;
  const select = (next: Color) => {
    if (value === undefined && !picker) setInternal(next);
    else picker?.update(next);
    onChange?.(next);
  };
  const context = React.useMemo(
    () => ({ color: color.toString("hex"), disabled: Boolean(disabled), select }),
    [color, disabled],
  );
  return (
    <SwatchPickerContext.Provider value={context}>
      <div
        role="radiogroup"
        data-slot="color-swatch-picker"
        data-layout={layout}
        className={cn("flex flex-wrap gap-2", layout === "stack" && "flex-col items-start", className)}
        {...props}
      >
        {children}
      </div>
    </SwatchPickerContext.Provider>
  );
}

export function ColorSwatchPickerItem({
  className,
  color,
  disabled,
  children,
  ...props
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> & { color: Color | string; disabled?: boolean }) {
  const picker = React.useContext(SwatchPickerContext);
  const parsedColor = color instanceof Color ? color : parseColor(color);
  const value = parsedColor.toString("hex");
  const selected = value === picker?.color;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-pressed={selected}
      disabled={disabled ?? picker?.disabled}
      data-slot="color-swatch-picker-item"
      data-state={selected ? "checked" : "unchecked"}
      onClick={() => picker?.select(parsedColor)}
      className={cn(
        "grid size-9 cursor-pointer place-items-center rounded-lg border border-transparent outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring data-[state=checked]:bg-accent/40 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

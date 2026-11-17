"use client";

import * as React from "react";

import { Color, type ColorChannel, type ColorFormat, parseColor } from "@/lib/color";
import { cn } from "@/lib/utils";

type ColorFieldContextValue = {
  color: Color;
  id: string;
  channel?: ColorChannel;
  format: ColorFormat;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
  update: (value: Color) => void;
};
const ColorFieldContext = React.createContext<ColorFieldContextValue | null>(null);
export function useColorFieldContext() {
  return React.useContext(ColorFieldContext);
}

type ColorFieldProps = Omit<React.ComponentProps<"div">, "onChange" | "value" | "defaultValue"> & {
  value?: Color | string;
  defaultValue?: Color | string;
  onChange?: (color: Color) => void;
  channel?: ColorChannel;
  colorSpace?: ColorFormat;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
};

export function ColorField({
  className,
  value,
  defaultValue = "#2563eb",
  onChange,
  channel,
  colorSpace = "hex",
  disabled,
  required,
  invalid,
  children,
  ...props
}: ColorFieldProps) {
  const picker = React.useContext(ColorPickerContext);
  const generatedId = React.useId();
  const initial = defaultValue instanceof Color ? defaultValue : parseColor(defaultValue);
  const [internal, setInternal] = React.useState(initial);
  const controlled = value === undefined ? picker?.color : value instanceof Color ? value : parseColor(value);
  const color = controlled ?? internal;
  const update = (next: Color) => {
    if (value === undefined && !picker) setInternal(next);
    else picker?.update(next);
    onChange?.(next);
  };
  const context = React.useMemo(
    () => ({
      color,
      id: generatedId,
      channel,
      format: colorSpace,
      disabled: Boolean(disabled),
      required: Boolean(required),
      invalid: Boolean(invalid),
      update,
    }),
    [channel, color, colorSpace, generatedId, disabled, invalid, required],
  );
  return (
    <ColorPickerContext.Provider value={picker ?? null}>
      <ColorFieldContext.Provider value={context}>
        <div
          data-slot="color-field"
          data-disabled={disabled || undefined}
          data-required={required || undefined}
          data-invalid={invalid || undefined}
          className={cn("grid gap-1.5", className)}
          {...props}
        >
          {children}
        </div>
      </ColorFieldContext.Provider>
    </ColorPickerContext.Provider>
  );
}

export type ColorPickerContextValue = { color: Color; update: (color: Color) => void };
export const ColorPickerContext = React.createContext<ColorPickerContextValue | null>(null);
export function useColorPickerContext() {
  return React.useContext(ColorPickerContext);
}

export function ColorPickerProvider({
  value,
  onChange,
  children,
}: {
  value?: Color | string;
  onChange?: (color: Color) => void;
  children?: React.ReactNode;
}) {
  const [internal, setInternal] = React.useState(() =>
    value instanceof Color ? value : parseColor(value ?? "#2563eb"),
  );
  const color = value instanceof Color ? value : typeof value === "string" ? parseColor(value) : internal;
  const update = (next: Color) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };
  const context = React.useMemo(() => ({ color, update }), [color, value]);
  return <ColorPickerContext.Provider value={context}>{children}</ColorPickerContext.Provider>;
}

export function ColorFieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  const field = React.useContext(ColorFieldContext);
  return (
    <label
      htmlFor={props.htmlFor ?? field?.id}
      data-slot="color-field-label"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}

export function ColorFieldInput({
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange">) {
  const field = React.useContext(ColorFieldContext);
  const picker = React.useContext(ColorPickerContext);
  if (!field && !picker)
    return (
      <input
        data-slot="color-field-input"
        className={cn(
          "h-9 min-w-0 rounded-lg border border-input bg-background px-3 font-mono text-sm uppercase outline-none focus-visible:ring-3 focus-visible:ring-ring/30",
          className,
        )}
        {...props}
      />
    );
  const color = field?.color ?? picker?.color;
  if (!color) return null;
  const channel = field?.channel;
  const currentValue = channel
    ? String(Math.round(color.toFormat(field?.format ?? "hsl").getChannelValue(channel)))
    : color.toString(field?.format ?? "hex");
  return (
    <input
      id={field?.id}
      data-slot="color-field-input"
      type="text"
      value={currentValue}
      disabled={field?.disabled}
      required={field?.required}
      aria-invalid={field?.invalid || undefined}
      className={cn(
        "h-9 min-w-0 rounded-lg border border-input bg-background px-3 font-mono text-sm uppercase outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onChange={(event) => {
        const nextValue = event.currentTarget.value;
        if (channel) {
          const parsed = Number(nextValue);
          if (Number.isFinite(parsed)) field?.update(color.withChannel(channel, parsed, field.format));
        } else {
          try {
            field?.update(parseColor(nextValue));
          } catch {
            /* Keep the last valid color while editing. */
          }
        }
      }}
      {...props}
    />
  );
}

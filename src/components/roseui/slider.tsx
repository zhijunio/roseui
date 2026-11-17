"use client";

import * as React from "react";

import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

export type SliderMark = { value: number; label?: string };
type SliderDisplayProps = {
  label?: string;
  formatValue?: (value: number) => string;
  showTooltip?: boolean;
  thumbClassName?: string;
};
type SliderSharedProps = Omit<
  React.ComponentProps<typeof SliderPrimitive.Root>,
  "value" | "defaultValue" | "onValueChange" | "onValueCommit" | "min" | "max"
> &
  SliderDisplayProps & {
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    showSteps?: boolean;
    marks?: readonly SliderMark[];
  };

const rootClassName =
  "relative flex w-full touch-none select-none items-center py-2 disabled:opacity-50 disabled:pointer-events-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:py-0";
const trackClassName =
  "relative h-1.5 w-full grow overflow-visible rounded-full bg-muted shadow-inner data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5";
const rangeClassName =
  "absolute h-full rounded-full bg-gradient-to-r from-primary/80 to-primary forced-colors:bg-[Highlight] data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-full data-[orientation=vertical]:bg-gradient-to-b";
const thumbClassName =
  "touch-target relative z-10 block size-4 shrink-0 rounded-full border-2 border-primary bg-background shadow-md shadow-primary/20 transition-shadow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20 disabled:pointer-events-none disabled:opacity-50 forced-colors:border-[Highlight] forced-colors:bg-[Canvas]";

function SliderIndicators({
  min,
  max,
  step,
  orientation,
  values,
  showSteps,
  marks = [],
}: {
  min: number;
  max: number;
  step: number;
  orientation: "horizontal" | "vertical";
  values: number[];
  showSteps: boolean;
  marks?: readonly SliderMark[];
}) {
  const stepCount = step > 0 ? Math.floor((max - min) / step) : 0;
  const steps =
    showSteps && stepCount <= 100
      ? Array.from({ length: stepCount + 1 }, (_, index) => min + index * step).concat(max)
      : [];
  const validMarks = marks.filter((mark) => Number.isFinite(mark.value) && mark.value >= min && mark.value <= max);
  const indicatorValues = [...new Set([...steps, ...validMarks.map((mark) => mark.value)])];
  if (indicatorValues.length === 0) return null;
  return (
    <div data-slot="slider-indicators" data-orientation={orientation} className="pointer-events-none absolute inset-0">
      {indicatorValues.map((value) => {
        const percentage = max === min ? 0 : ((value - min) / (max - min)) * 100;
        const filled =
          value >= (values.length > 1 ? values[0] : min) && value <= (values.length > 1 ? values[1] : values[0]);
        const mark = validMarks.find((item) => item.value === value);
        return (
          <span
            key={value}
            data-slot={mark?.label ? "slider-mark" : "slider-step"}
            data-value={value}
            data-filled={filled || undefined}
            aria-hidden={!mark?.label || undefined}
            className={cn(
              "absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/60 data-[filled=true]:bg-primary",
              orientation === "vertical" ? "left-1/2" : "top-1/2",
            )}
            style={orientation === "vertical" ? { bottom: `${percentage}%` } : { left: `${percentage}%` }}
          >
            {mark?.label && (
              <span
                className={cn(
                  "absolute text-xs font-normal text-muted-foreground",
                  orientation === "vertical" ? "left-4 top-1/2 -translate-y-1/2" : "top-3 left-1/2 -translate-x-1/2",
                  value === min && orientation === "horizontal" && "left-0 translate-x-0",
                  value === max && orientation === "horizontal" && "left-auto right-0 translate-x-0",
                )}
              >
                {mark.label}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function ValueThumb({
  value,
  label,
  formatValue,
  showTooltip,
  className,
}: {
  value: number;
  label: string;
  formatValue: (value: number) => string;
  showTooltip: boolean;
  className?: string;
}) {
  return (
    <SliderPrimitive.Thumb aria-label={label} className={cn(thumbClassName, className)}>
      {showTooltip && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium tabular-nums text-background shadow-sm"
        >
          {formatValue(value)}
        </span>
      )}
    </SliderPrimitive.Thumb>
  );
}

type SingleSliderProps = SliderSharedProps & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  onValueCommit?: (value: number) => void;
};
export function Slider({
  value,
  defaultValue = 50,
  onValueChange,
  onValueCommit,
  label = "Value",
  formatValue = String,
  showTooltip = true,
  className,
  thumbClassName: customThumbClassName,
  min = 0,
  max = 100,
  step = 1,
  showSteps = false,
  marks,
  orientation = "horizontal",
  disabled,
  ...props
}: SingleSliderProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value ?? internal;
  const change = (values: number[]) => {
    const next = values[0] ?? min;
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };
  return (
    <SliderPrimitive.Root
      {...props}
      min={min}
      max={max}
      step={step}
      orientation={orientation}
      value={[current]}
      onValueChange={change}
      onValueCommit={(values) => onValueCommit?.(values[0] ?? min)}
      disabled={disabled}
      data-slot="slider"
      className={cn(rootClassName, className)}
    >
      <SliderPrimitive.Track className={trackClassName}>
        <SliderPrimitive.Range className={rangeClassName} />
        <SliderIndicators
          min={min}
          max={max}
          step={step}
          orientation={orientation}
          values={[current]}
          showSteps={showSteps}
          marks={marks}
        />
        <ValueThumb
          value={current}
          label={label}
          formatValue={formatValue}
          showTooltip={showTooltip}
          className={customThumbClassName}
        />
      </SliderPrimitive.Track>
    </SliderPrimitive.Root>
  );
}

type RangeSliderProps = SliderSharedProps & {
  value?: [number, number];
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  onValueCommit?: (value: [number, number]) => void;
};
export function RangeSlider({
  value,
  defaultValue = [25, 75],
  onValueChange,
  onValueCommit,
  label = "Range",
  formatValue = String,
  showTooltip = true,
  className,
  thumbClassName: customThumbClassName,
  min = 0,
  max = 100,
  step = 1,
  showSteps = false,
  marks,
  orientation = "horizontal",
  disabled,
  ...props
}: RangeSliderProps) {
  const [internal, setInternal] = React.useState<[number, number]>(defaultValue);
  const current = value ?? internal;
  const change = (values: number[]) => {
    const next: [number, number] = [values[0] ?? min, values[1] ?? min];
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };
  return (
    <SliderPrimitive.Root
      {...props}
      min={min}
      max={max}
      step={step}
      orientation={orientation}
      value={current}
      onValueChange={change}
      onValueCommit={(values) => onValueCommit?.([values[0] ?? min, values[1] ?? min])}
      disabled={disabled}
      data-slot="slider"
      className={cn(rootClassName, className)}
    >
      <SliderPrimitive.Track className={trackClassName}>
        <SliderPrimitive.Range className={rangeClassName} />
        <SliderIndicators
          min={min}
          max={max}
          step={step}
          orientation={orientation}
          values={current}
          showSteps={showSteps}
          marks={marks}
        />
        {current.map((thumbValue, index) => (
          <ValueThumb
            key={index}
            value={thumbValue}
            label={`${label} ${index === 0 ? "minimum" : "maximum"}`}
            formatValue={formatValue}
            showTooltip={showTooltip}
            className={customThumbClassName}
          />
        ))}
      </SliderPrimitive.Track>
    </SliderPrimitive.Root>
  );
}

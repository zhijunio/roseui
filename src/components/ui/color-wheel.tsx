"use client";

import {
  ColorWheel as ColorWheelPrimitive,
  ColorWheelTrack,
  type ColorWheelProps as PrimitiveColorWheelProps,
} from "react-aria-components/ColorWheel";

import { ColorThumb } from "@/components/ui/color-thumb";

export type ColorWheelProps = Omit<PrimitiveColorWheelProps, "outerRadius" | "innerRadius">;

export function ColorWheel(props: ColorWheelProps) {
  return (
    <ColorWheelPrimitive {...props} outerRadius={100} innerRadius={74}>
      <ColorWheelTrack
        className="disabled:bg-muted-foreground forced-colors:disabled:bg-[GrayText]"
        style={({ defaultStyle, isDisabled }) => ({
          ...defaultStyle,
          background: isDisabled
            ? undefined
            : `${defaultStyle.background}, repeating-conic-gradient(#cccccc 0% 25%, #ffffff 0% 50%) 50% / 16px 16px`,
        })}
      />
      <ColorThumb />
    </ColorWheelPrimitive>
  );
}

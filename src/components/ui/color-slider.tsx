"use client";

import type { ComponentProps } from "react";
import { ColorSlider as AriaColorSlider, ColorThumb, SliderTrack } from "react-aria-components";

import { cn } from "@/lib/utils";

export function ColorSlider({ className, ...props }: ComponentProps<typeof AriaColorSlider>) {
  return <AriaColorSlider data-slot="color-slider" className={cn("relative flex w-full touch-none flex-col gap-2", className)} {...props} />;
}

export function ColorSliderTrack({ className, ...props }: ComponentProps<typeof SliderTrack>) {
  return <SliderTrack data-slot="color-slider-track" className={cn("relative h-3 w-full rounded-full", className)} {...props} />;
}

export function ColorSliderThumb({ className, ...props }: ComponentProps<typeof ColorThumb>) {
  return <ColorThumb data-slot="color-slider-thumb" className={cn("size-4 rounded-full border-2 border-white shadow-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled]:opacity-50", className)} {...props} />;
}

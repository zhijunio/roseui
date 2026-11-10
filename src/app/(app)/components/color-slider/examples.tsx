"use client";

import { useState } from "react";
import { parseColor, type Color } from "react-aria-components";

import { ComponentPreview } from "@/components/composite/component-preview";
import { ColorSlider, ColorSliderThumb, ColorSliderTrack } from "@/components/ui/color-slider";

const hueGradient = "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)";

export function ColorSliderExamples() {
  const [color, setColor] = useState<Color>(() => parseColor("#2563eb"));
  const hslColor = color.toFormat("hsl");
  const hue = hslColor.getChannelValue("hue");

  return (
    <>
      <ComponentPreview previewId="color-slider-01" title="Hue"  layout="field">
        <div className="grid w-full max-w-sm gap-2">
          <div className="flex items-center justify-between text-sm"><span>Hue</span><output className="tabular-nums text-muted-foreground">{Math.round(hue)}°</output></div>
          <ColorSlider aria-label="Hue" channel="hue" colorSpace="hsl" value={color} onChange={setColor}>
            <ColorSliderTrack style={{ backgroundImage: hueGradient }}><ColorSliderThumb /></ColorSliderTrack>
          </ColorSlider>
          <output className="font-mono text-xs uppercase text-muted-foreground">{color.toString("hex")}</output>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="color-slider-02" title="HSL Channels"  layout="panel">
        <div className="grid w-full max-w-md gap-4">
          {([
            ["Hue", "hue", hueGradient],
            ["Saturation", "saturation", `linear-gradient(to right, hsl(${hue} 0% 50%), hsl(${hue} 100% 50%))`],
            ["Lightness", "lightness", "linear-gradient(to right, #000, #fff)"],
          ] as const).map(([label, channel, backgroundImage]) => (
            <div key={channel} className="grid gap-2">
              <div className="flex items-center justify-between text-sm"><span>{label}</span><output className="tabular-nums text-muted-foreground">{Math.round(hslColor.getChannelValue(channel))}{channel === "hue" ? "°" : "%"}</output></div>
              <ColorSlider aria-label={label} channel={channel} colorSpace="hsl" value={color} onChange={setColor}>
                <ColorSliderTrack style={{ backgroundImage }}><ColorSliderThumb /></ColorSliderTrack>
              </ColorSlider>
            </div>
          ))}
          <output className="font-mono text-xs uppercase text-muted-foreground">Current color: {color.toString("hex")}</output>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="color-slider-03" title="Vertical Slider" layout="inline">
        <div className="flex h-36 items-center gap-3">
          <ColorSlider aria-label="Vertical hue" channel="hue" colorSpace="hsl" orientation="vertical" defaultValue={parseColor("#dc2626")} className="h-full w-8">
            <ColorSliderTrack className="h-full w-3" style={{ backgroundImage: "linear-gradient(to top, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)" }}><ColorSliderThumb /></ColorSliderTrack>
          </ColorSlider>
          <span className="text-xs text-muted-foreground">Hue</span>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="color-slider-04" title="Disabled" layout="field">
        <ColorSlider aria-label="Disabled hue" channel="hue" colorSpace="hsl" defaultValue={parseColor("#059669")} isDisabled>
          <ColorSliderTrack style={{ backgroundImage: hueGradient }}><ColorSliderThumb /></ColorSliderTrack>
        </ColorSlider>
      </ComponentPreview>
    </>
  );
}

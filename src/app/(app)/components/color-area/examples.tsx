"use client";

import { useState } from "react";
import { parseColor, type Color } from "react-aria-components";

import { ComponentPreview } from "@/components/composite/component-preview";
import { ColorArea, ColorAreaThumb } from "@/components/ui/color-area";

function colorPlane(color: Color) {
  return {
    backgroundColor: `hsl(${color.toFormat("hsl").getChannelValue("hue")} 100% 50%)`,
    backgroundImage: "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
  };
}

export function ColorAreaExamples() {
  const [color, setColor] = useState<Color>(() => parseColor("#7c3aed"));

  return (
    <>
      <ComponentPreview previewId="color-area-01" title="Saturation and Brightness"  layout="panel">
        <div className="grid w-full max-w-sm gap-3">
          <ColorArea aria-label="Saturation and brightness" value={color} onChange={setColor} colorSpace="hsb" xChannel="saturation" yChannel="brightness" style={colorPlane(color)}>
            <ColorAreaThumb />
          </ColorArea>
          <output className="font-mono text-xs uppercase text-muted-foreground">{color.toString("hex")}</output>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="color-area-02" title="Color Spaces and Channels" layout="panel">
        <div className="grid w-full gap-4">
          <div className="grid gap-2">
            <span className="text-sm font-medium">HSB · Saturation × Brightness</span>
            <ColorArea aria-label="HSB saturation and brightness" value={color} onChange={setColor} colorSpace="hsb" xChannel="saturation" yChannel="brightness" showDots style={colorPlane(color)}>
              <ColorAreaThumb />
            </ColorArea>
          </div>
          <div className="grid gap-2">
            <span className="text-sm font-medium">HSL · Saturation × Lightness</span>
            <ColorArea aria-label="HSL saturation and lightness" value={color} onChange={setColor} colorSpace="hsl" xChannel="saturation" yChannel="lightness" style={colorPlane(color)}>
              <ColorAreaThumb />
            </ColorArea>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="color-area-03" title="Disabled" layout="inline">
        <ColorArea aria-label="Disabled color area" defaultValue="#dc2626" isDisabled colorSpace="hsb" xChannel="saturation" yChannel="brightness" style={colorPlane(parseColor("#dc2626"))}>
          <ColorAreaThumb />
        </ColorArea>
      </ComponentPreview>
    </>
  );
}

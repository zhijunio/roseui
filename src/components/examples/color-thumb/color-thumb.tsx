"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { ColorWheel } from "@/components/roseui/color-wheel";
import { type Color, parseColor } from "@/lib/color";

export function ColorThumbExamples() {
  const [color, setColor] = useState<Color>(() => parseColor("#2563eb"));

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ComponentPreview title="Interactive thumb" layout="panel">
        <div className="grid justify-items-center gap-3">
          <ColorWheel aria-label="Choose a color" value={color} onChange={setColor} />
          <output className="text-muted-foreground font-mono text-xs uppercase">{color.toString("hex")}</output>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Disabled thumb" layout="panel">
        <ColorWheel aria-label="Disabled color wheel" defaultValue="#e11d48" disabled />
      </ComponentPreview>
    </div>
  );
}

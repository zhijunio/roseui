"use client";

import { useState } from "react";
import { parseColor, type Color } from "react-aria-components";

import { ComponentPreview } from "@/components/composite/component-preview";
import { ColorSwatch } from "@/components/ui/color-swatch";
import { ColorSwatchPicker, ColorSwatchPickerItem } from "@/components/ui/color-swatch-picker";

const palette = [
  { name: "Blue", value: "#2563eb" },
  { name: "Violet", value: "#7c3aed" },
  { name: "Rose", value: "#db2777" },
  { name: "Red", value: "#dc2626" },
  { name: "Amber", value: "#d97706" },
  { name: "Emerald", value: "#059669" },
  { name: "Teal", value: "#0f766e" },
  { name: "Slate", value: "#475569" },
];

function PaletteItems({ disabled = false }: { disabled?: boolean }) {
  return palette.map(({ name, value }) => (
    <ColorSwatchPickerItem key={name} color={value} aria-label={name} isDisabled={disabled}>
      <ColorSwatch color={value} aria-label={name} size="sm" />
    </ColorSwatchPickerItem>
  ));
}

export function ColorSwatchPickerExamples() {
  const [color, setColor] = useState<Color>(() => parseColor("#2563eb"));

  return (
    <>
      <ComponentPreview previewId="color-swatch-picker-01" title="Controlled Palette"  layout="panel">
        <div className="grid w-full max-w-md gap-3">
          <ColorSwatchPicker aria-label="Brand colors" value={color} onChange={setColor}>
            <PaletteItems />
          </ColorSwatchPicker>
          <div className="flex items-center gap-2 text-sm"><ColorSwatch color={color} size="sm" /><span>Selected</span><output className="font-mono uppercase text-muted-foreground">{color.toString("hex")}</output></div>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="color-swatch-picker-02" title="Stack Layout" layout="inline">
        <ColorSwatchPicker aria-label="Stacked brand colors" layout="stack" defaultValue={parseColor("#059669")}>
          <PaletteItems />
        </ColorSwatchPicker>
      </ComponentPreview>

      <ComponentPreview previewId="color-swatch-picker-03" title="Disabled Options"  layout="panel">
        <ColorSwatchPicker aria-label="Palette with unavailable colors" defaultValue={parseColor("#2563eb")}>
          <PaletteItems disabled />
        </ColorSwatchPicker>
      </ComponentPreview>
    </>
  );
}

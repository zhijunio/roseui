"use client";

import { parseColor } from "react-aria-components";

import { ComponentPreview } from "@/components/composite/component-preview";
import { ColorSwatch } from "@/components/ui/color-swatch";

const samples = [
  { name: "Blue", color: "#2563eb" },
  { name: "Violet", color: "#7c3aed" },
  { name: "Emerald", color: "#059669" },
  { name: "Amber", color: "#d97706" },
  { name: "Rose", color: "#db2777" },
];

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function ColorSwatchExamples() {
  return (
    <>
      <ComponentPreview previewId="color-swatch-01" title="Color Samples"  layout="inline">
        <div className="flex flex-wrap gap-3">
          {samples.map(({ name, color }) => <ColorSwatch key={name} aria-label={`${name} ${color}`} color={color} size="lg" />)}
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="color-swatch-02" title="Sizes" layout="inline">
        <div className="flex flex-wrap items-center gap-4">
          {sizes.map((size) => <span key={size} className="grid justify-items-center gap-1"><ColorSwatch aria-label={`${size} blue swatch`} color="#2563eb" size={size} /><span className="text-xs text-muted-foreground">{size}</span></span>)}
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="color-swatch-03" title="Shapes" layout="inline">
        <div className="flex items-center gap-4">
          <span className="grid justify-items-center gap-1"><ColorSwatch aria-label="Circular violet swatch" color="#7c3aed" size="xl" shape="circle" /><span className="text-xs text-muted-foreground">Circle</span></span>
          <span className="grid justify-items-center gap-1"><ColorSwatch aria-label="Square violet swatch" color="#7c3aed" size="xl" shape="square" /><span className="text-xs text-muted-foreground">Square</span></span>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="color-swatch-04" title="Transparency"  layout="panel">
        <div className="flex flex-wrap gap-3">
          {["#fff", "#111827"].map((surface) => (
            <div key={surface} className="grid justify-items-center gap-2 rounded-lg border p-3" style={{ backgroundColor: surface }}>
              <ColorSwatch aria-label={`50 percent blue over ${surface}`} color={parseColor("rgba(37, 99, 235, 0.5)")} size="xl" />
              <span className="text-xs" style={{ color: surface === "#fff" ? "#111827" : "#fff" }}>{surface === "#fff" ? "Light surface" : "Dark surface"}</span>
            </div>
          ))}
        </div>
      </ComponentPreview>
    </>
  );
}

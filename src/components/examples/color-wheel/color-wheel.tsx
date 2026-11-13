"use client";

import { useState } from "react";

import { type ColorFormat, parseColor } from "react-aria-components";

import { ComponentPreview } from "@/components/docs/component-preview";
import { ColorWheel } from "@/components/ui/color-wheel";

const formats: ColorFormat[] = ["hex", "rgb", "hsl", "hsb"];

export function ColorWheelExamples() {
  const [color, setColor] = useState(() => parseColor("hsl(0, 100%, 50%)"));

  return (
    <>
      <ComponentPreview title="Color selection">
        <ColorWheel aria-label="Choose a color" />
      </ComponentPreview>
      <ComponentPreview title="Controlled color" layout="panel">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <ColorWheel aria-label="Choose a brand color" value={color} onChange={setColor} />
          <div className="grid gap-3">
            {formats.map((format) => (
              <div key={format} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="size-5 rounded border"
                  style={{ backgroundColor: color.toString(format) }}
                />
                <code className="text-sm">{color.toString(format)}</code>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Disabled">
        <ColorWheel aria-label="Disabled color selector" isDisabled />
      </ComponentPreview>
    </>
  );
}

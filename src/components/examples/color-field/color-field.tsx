"use client";

import { useState } from "react";

import { type Color, parseColor } from "react-aria-components";

import { ColorField, ColorFieldInput, ColorFieldLabel } from "@/components/ui/color-field";
import { ComponentPreview } from "@/examples/component-preview";

export function ColorFieldExamples() {
  const [color, setColor] = useState<Color>(() => parseColor("#7f007f"));
  const [channelColor, setChannelColor] = useState<Color>(() => parseColor("hsl(280, 100%, 50%)"));

  return (
    <>
      <ComponentPreview title="HEX Color" layout="field">
        <ColorField
          aria-label="Brand color"
          value={color}
          onChange={(next) => {
            if (next) setColor(next);
          }}
        >
          <ColorFieldLabel>Brand color</ColorFieldLabel>
          <ColorFieldInput />
          <output className="text-xs uppercase text-muted-foreground">Selected: {color.toString("hex")}</output>
        </ColorField>
      </ComponentPreview>

      <ComponentPreview title="Edit a Color Channel" layout="field">
        <div className="grid w-full max-w-sm gap-3">
          {(
            [
              ["Hue", "hue"],
              ["Saturation", "saturation"],
              ["Lightness", "lightness"],
            ] as const
          ).map(([label, channel]) => (
            <ColorField
              key={channel}
              aria-label={label}
              colorSpace="hsl"
              channel={channel}
              value={channelColor}
              onChange={(next) => {
                if (next) setChannelColor(next);
              }}
            >
              <ColorFieldLabel>{label}</ColorFieldLabel>
              <ColorFieldInput />
            </ColorField>
          ))}
          <output className="font-mono text-xs uppercase text-muted-foreground">{channelColor.toString("hsl")}</output>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Required and Disabled States" layout="panel">
        <div className="grid w-full max-w-sm gap-4">
          <ColorField aria-label="Required theme color" isRequired defaultValue={parseColor("#2563eb")}>
            <ColorFieldLabel>Theme color</ColorFieldLabel>
            <ColorFieldInput />
            <p className="text-xs text-muted-foreground">Choose the color used for primary actions.</p>
          </ColorField>
          <ColorField aria-label="Locked color" isDisabled defaultValue={parseColor("#64748b")}>
            <ColorFieldLabel>Managed by your organization</ColorFieldLabel>
            <ColorFieldInput />
            <p className="text-xs text-muted-foreground">This value is read only for your account.</p>
          </ColorField>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Invalid Color" layout="field">
        <ColorField aria-label="Invalid brand color" isInvalid defaultValue={parseColor("#dc2626")}>
          <ColorFieldLabel>Brand color</ColorFieldLabel>
          <ColorFieldInput />
          <p role="alert" className="text-xs text-destructive">
            This color is reserved for destructive actions.
          </p>
        </ColorField>
      </ComponentPreview>
    </>
  );
}

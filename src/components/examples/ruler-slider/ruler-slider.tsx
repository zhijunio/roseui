"use client";

import * as React from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { RulerSlider } from "@/components/ui/ruler-slider";

export function RulerSliderExamples() {
  const [threshold, setThreshold] = React.useState(12500);
  const [retention, setRetention] = React.useState(30);
  return (
    <>
      <ComponentPreview title="Approval threshold" layout="fullStack">
        <RulerSlider
          label="Invoice approval threshold"
          min={0}
          max={50000}
          step={250}
          majorEvery={4}
          value={threshold}
          onValueChange={setThreshold}
          onValueCommit={setThreshold}
          formatValue={(value) => `$${value.toLocaleString()}`}
        />
      </ComponentPreview>
      <ComponentPreview title="Range and Tick Labels" layout="fullStack">
        <RulerSlider
          label="Retention period"
          min={7}
          max={365}
          step={1}
          majorEvery={14}
          value={retention}
          onValueChange={setRetention}
          unit=" days"
        />
      </ComponentPreview>
    </>
  );
}

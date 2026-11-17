"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { LabeledRadio, LabeledRadioGroup } from "@/components/roseui/labeled-radio";

export function LabeledRadioExamples() {
  const [value, setValue] = useState("standard");

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ComponentPreview title="Label and description" layout="panel">
        <LabeledRadioGroup
          aria-label="Delivery method"
          value={value}
          onValueChange={setValue}
          className="w-full max-w-md"
        >
          <LabeledRadio value="standard" label="Standard" description="Arrives in 3–5 business days." />
          <LabeledRadio value="express" label="Express" description="Arrives in 1–2 business days." />
          <LabeledRadio value="pickup" label="Pickup" description="Collect your order at a nearby location." />
        </LabeledRadioGroup>
      </ComponentPreview>
      <ComponentPreview title="Disabled and validation states" layout="panel">
        <LabeledRadioGroup aria-label="Plan" defaultValue="basic" className="w-full max-w-md">
          <LabeledRadio value="basic" label="Basic" description="Included with your account." />
          <LabeledRadio value="pro" label="Pro" description="Requires an administrator." disabled />
          <LabeledRadio
            value="required"
            label="Required choice"
            description="An error can be shown with the selected field."
            error="Choose an available option to continue."
          />
        </LabeledRadioGroup>
      </ComponentPreview>
    </div>
  );
}

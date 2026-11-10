"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/composite/component-preview";
import { Slider } from "@/components/ui/slider";
import { Meter, type MeterTone } from "@/components/ui/meter";

function toneFor(value: number): MeterTone {
  if (value >= 90) return "error";
  if (value >= 75) return "warning";
  return "accent";
}

export function MeterExamples() {
  const [used, setUsed] = useState(62);

  return (
    <>
      <ComponentPreview previewId="meter-01" title="Usage and Quota Meters" layout="panel">
        <div className="grid gap-5">
          <Meter label="Storage" value={7.2} maxValue={10} valueLabel="7.2 of 10 GB" />
          <Meter
            label="Seats"
            value={19}
            maxValue={20}
            valueLabel="19 of 20"
            tone="warning"
            description="Add seats before inviting more teammates."
          />
          <Meter label="API requests this month" value={96} valueLabel="96%" tone="error" />
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="meter-02" title="Status Tones" layout="panel">
        <div className="grid gap-5">
          <Meter label="Accent" value={40} valueLabel="40%" />
          <Meter label="Success" value={55} valueLabel="55%" tone="success" />
          <Meter label="Warning" value={78} valueLabel="78%" tone="warning" />
          <Meter label="Error" value={94} valueLabel="94%" tone="error" />
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="meter-03" title="Sizes and Accessible Label" layout="panel">
        <div className="grid gap-5">
          <Meter label="Small" value={40} size="sm" />
          <Meter label="Medium" value={60} />
          <Meter label="Large" value={80} size="lg" />
          <Meter ariaLabel="Upload progress" value={45} valueLabel="45%" />
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="meter-04" title="Formatted Values" layout="panel">
        <div className="grid gap-5">
          <Meter label="Revenue" value={750} maxValue={1000} formatOptions={{ style: "currency", currency: "USD" }} />
          <Meter label="Storage used" value={68} valueLabel="68% of 100 GB" />
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="meter-05" title="Interactive Thresholds"  layout="panel">
        <div className="grid gap-4">
          <Meter label="Storage" value={used} valueLabel={`${used}%`} tone={toneFor(used)} />
          <div className="grid gap-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Used</span>
              <span className="tabular-nums">{used}</span>
            </div>
            <Slider aria-label="Used" min={0} max={100} step={1} value={used} onValueChange={setUsed} formatValue={(value) => `${value}%`} />
          </div>
        </div>
      </ComponentPreview>
    </>
  );
}

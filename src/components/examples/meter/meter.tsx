"use client";

import { useEffect, useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Meter, MeterHeader, type MeterTone, MeterTrack, MeterValue } from "@/components/ui/meter";
import { Slider } from "@/components/ui/slider";

function toneFor(value: number): MeterTone {
  if (value >= 90) return "error";
  if (value >= 75) return "warning";
  return "accent";
}

export function MeterExamples() {
  const [used, setUsed] = useState(62);
  const [animatedValue, setAnimatedValue] = useState(1);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setAnimatedValue((previous) => (previous < 100 ? previous + 1 : 100));
    }, 50);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <ComponentPreview title="Multiple Values and Limits" layout="panel">
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

      <ComponentPreview title="Animated Value" layout="panel">
        <Meter label="Storage space" value={animatedValue} description="Current storage space usage" />
      </ComponentPreview>

      <ComponentPreview title="Status Tones" layout="panel">
        <div className="grid gap-5">
          <Meter label="Accent" value={40} valueLabel="40%" />
          <Meter label="Success" value={55} valueLabel="55%" tone="success" />
          <Meter label="Warning" value={78} valueLabel="78%" tone="warning" />
          <Meter label="Error" value={94} valueLabel="94%" tone="error" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Sizes and Accessible Label" layout="panel">
        <div className="grid gap-5">
          <Meter label="Small" value={40} size="sm" />
          <Meter label="Medium" value={60} />
          <Meter label="Large" value={80} size="lg" />
          <Meter ariaLabel="Upload progress" value={45} valueLabel="45%" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Formatted Values" layout="panel">
        <div className="grid gap-5">
          <Meter
            label="Revenue"
            value={15}
            formatOptions={{ style: "currency", currency: "USD" }}
            description="Current revenue"
          />
          <Meter
            label="Progress"
            value={75.25}
            formatOptions={{ style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
          />
          <Meter label="Storage used" value={68} valueLabel="68% of 100 GB" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Bounded Values" layout="panel">
        <div className="grid gap-5">
          <Meter label="Score" value={72} minValue={50} maxValue={100} />
          <Meter
            label="Storage"
            value={140}
            maxValue={100}
            formatOptions={{ style: "decimal", maximumFractionDigits: 0 }}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Interactive Thresholds" layout="panel">
        <div className="grid gap-4">
          <Meter label="Storage" value={used} valueLabel={`${used}%`} tone={toneFor(used)} />
          <div className="grid gap-2">
            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <span>Used</span>
              <span className="tabular-nums">{used}</span>
            </div>
            <Slider
              aria-label="Used"
              min={0}
              max={100}
              step={1}
              value={used}
              onValueChange={setUsed}
              formatValue={(value) => `${value}%`}
            />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Composition" layout="panel">
        <Meter ariaLabel="Storage used" value={7.2} maxValue={10} valueLabel="7.2 of 10 GB">
          <MeterHeader>
            <span className="text-foreground font-medium">Workspace storage</span>
            <MeterValue />
          </MeterHeader>
          <MeterTrack />
        </Meter>
      </ComponentPreview>
    </>
  );
}

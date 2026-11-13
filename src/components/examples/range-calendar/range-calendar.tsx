"use client";

import { useState } from "react";

import { type DateValue, getLocalTimeZone, today } from "@internationalized/date";

import { ComponentPreview } from "@/components/docs/component-preview";
import { RangeCalendar } from "@/components/ui/range-calendar";

export function RangeCalendarExamples() {
  const [range, setRange] = useState<{ start: DateValue; end: DateValue } | null>(null);
  const now = today(getLocalTimeZone());
  const defaultStart = now.add({ days: 2 });

  return (
    <>
      <ComponentPreview title="Default" layout="field">
        <RangeCalendar aria-label="Select a date range" />
      </ComponentPreview>
      <ComponentPreview title="Uncontrolled Range" layout="field">
        <RangeCalendar
          aria-label="Select a trip date range"
          defaultValue={{ start: defaultStart, end: defaultStart.add({ days: 12 }) }}
        />
      </ComponentPreview>
      <ComponentPreview title="Controlled Range" layout="field">
        <div className="grid gap-3">
          <RangeCalendar aria-label="Choose a reporting period" value={range} onChange={setRange} />
          <p className="min-h-5 text-xs text-muted-foreground" aria-live="polite">
            {range ? `${range.start.toString()} – ${range.end.toString()}` : "No range selected"}
          </p>
        </div>
      </ComponentPreview>
    </>
  );
}

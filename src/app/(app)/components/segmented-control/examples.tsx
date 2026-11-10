"use client";

import { useState } from "react";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";

import { ComponentPreview } from "@/components/composite/component-preview";
import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlSeparator,
} from "@/components/composite/segmented-control";

export function SegmentedControlExamples() {
  const [period, setPeriod] = useState("month");
  const [scope, setScope] = useState("all");
  const [view, setView] = useState("list");

  return (
    <>
      <ComponentPreview previewId="segmented-control-01" title="Appearance" layout="grid2" exampleLabels={["Default", "Ghost"]}>
        <SegmentedControl aria-label="Billing interval" defaultValue="monthly">
          <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
          <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
        </SegmentedControl>
        <SegmentedControl aria-label="Billing interval, minimal" defaultValue="monthly" variant="ghost">
          <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
          <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
        </SegmentedControl>
      </ComponentPreview>
      <ComponentPreview previewId="segmented-control-02" title="Sizes">
        <div className="flex flex-wrap items-center gap-4">
          {(["sm", "md", "lg"] as const).map((size) => (
            <SegmentedControl key={size} aria-label={`${size} density`} defaultValue="comfortable" size={size}>
              <SegmentedControlItem value="compact">Compact</SegmentedControlItem>
              <SegmentedControlItem value="comfortable">Comfortable</SegmentedControlItem>
            </SegmentedControl>
          ))}
        </div>
      </ComponentPreview>
      <ComponentPreview previewId="segmented-control-03" title="With Icons">
        <SegmentedControl aria-label="Project view" value={view} onValueChange={setView}>
          <SegmentedControlItem value="list" aria-label="List view"><IconList aria-hidden="true" className="size-4" /></SegmentedControlItem>
          <SegmentedControlItem value="grid" aria-label="Grid view"><IconLayoutGrid aria-hidden="true" className="size-4" /></SegmentedControlItem>
        </SegmentedControl>
      </ComponentPreview>
      <ComponentPreview previewId="segmented-control-04" title="Controlled Selection">
        <div className="grid gap-3">
          <SegmentedControl aria-label="Reporting period" value={period} onValueChange={setPeriod}>
            <SegmentedControlItem value="week">Week</SegmentedControlItem>
            <SegmentedControlItem value="month">Month</SegmentedControlItem>
            <SegmentedControlItem value="year">Year</SegmentedControlItem>
          </SegmentedControl>
          <p className="text-xs text-muted-foreground" aria-live="polite">Showing: {period}</p>
        </div>
      </ComponentPreview>
      <ComponentPreview previewId="segmented-control-05" title="Disabled Option">
        <SegmentedControl aria-label="Report interval" defaultValue="week">
          <SegmentedControlItem value="day">Day</SegmentedControlItem>
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
          <SegmentedControlItem value="quarter" disabled>Quarter</SegmentedControlItem>
        </SegmentedControl>
      </ComponentPreview>
      <ComponentPreview previewId="segmented-control-06" title="Filter Scope">
        <SegmentedControl aria-label="Filter projects" value={scope} onValueChange={setScope}>
          <SegmentedControlItem value="all">All</SegmentedControlItem>
          <SegmentedControlItem value="owned">Owned</SegmentedControlItem>
          <SegmentedControlItem value="shared">Shared</SegmentedControlItem>
        </SegmentedControl>
      </ComponentPreview>
      <ComponentPreview previewId="segmented-control-07" title="With Separators">
        <SegmentedControl aria-label="Calendar range" defaultValue="month">
          <SegmentedControlItem value="day">Day</SegmentedControlItem>
          <SegmentedControlSeparator />
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
          <SegmentedControlSeparator />
          <SegmentedControlItem value="month">Month</SegmentedControlItem>
        </SegmentedControl>
      </ComponentPreview>
    </>
  );
}

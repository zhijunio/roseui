"use client";

import { useState } from "react";

import { SplitBarChart, type SplitBarDatum } from "@/components/ui/split-bar-chart";
import { ComponentPreview } from "@/examples/component-preview";

const ranges = ["7 days", "30 days", "90 days"] as const;
const dataByRange: Record<(typeof ranges)[number], readonly SplitBarDatum[]> = {
  "7 days": [
    { key: "organic", label: "Organic search", value: 41_300, color: "chart-3" },
    { key: "direct", label: "Direct", value: 24_700, color: "chart-2" },
    { key: "paid", label: "Paid search", value: 19_000, color: "chart-1" },
    { key: "social", label: "Social", value: 9_800, color: "chart-5" },
    { key: "referral", label: "Referral", value: 3_100, color: "chart-4" },
    { key: "other", label: "Other", value: 1_400, color: "chart-1" },
  ],
  "30 days": [
    { key: "organic", label: "Organic search", value: 168_400, color: "chart-3" },
    { key: "direct", label: "Direct", value: 102_600, color: "chart-2" },
    { key: "paid", label: "Paid search", value: 74_500, color: "chart-1" },
    { key: "social", label: "Social", value: 41_200, color: "chart-5" },
    { key: "referral", label: "Referral", value: 13_800, color: "chart-4" },
    { key: "other", label: "Other", value: 7_200, color: "chart-1" },
  ],
  "90 days": [
    { key: "organic", label: "Organic search", value: 491_200, color: "chart-3" },
    { key: "direct", label: "Direct", value: 306_800, color: "chart-2" },
    { key: "paid", label: "Paid search", value: 219_400, color: "chart-1" },
    { key: "social", label: "Social", value: 122_900, color: "chart-5" },
    { key: "referral", label: "Referral", value: 40_100, color: "chart-4" },
    { key: "other", label: "Other", value: 20_600, color: "chart-1" },
  ],
};

export function SplitBarChartExample() {
  const [range, setRange] = useState<(typeof ranges)[number]>("7 days");
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentPreview title="Traffic by source" layout="fullStack" span={2} density="chart">
        <div className="grid gap-5">
          <div className="flex justify-end">
            <div
              className="inline-flex items-center gap-1 rounded-2xl border bg-muted/50 p-1"
              role="group"
              aria-label="Choose time range"
            >
              {ranges.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={range === item}
                  onClick={() => setRange(item)}
                  className="min-h-9 rounded-xl px-4 text-sm text-muted-foreground transition-colors hover:text-foreground aria-pressed:bg-background aria-pressed:text-foreground aria-pressed:shadow-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <SplitBarChart data={dataByRange[range]} />
        </div>
      </ComponentPreview>
    </div>
  );
}

"use client";
import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { SegmentedControl, SegmentedControlItem } from "@/components/roseui/segmented-control";

const visitorRegions = [
  {
    name: "North America",
    visitors: 895,
    orders: 115,
    color: "var(--chart-1)",
    d: "M24 53l18-20 30-5 21 10 24-2 25 18-8 17-24 8-8 20-19 8-9-21-21-7-13-15-19 4z",
  },
  {
    name: "South America",
    visitors: 131,
    orders: 16,
    color: "var(--chart-2)",
    d: "M145 100l20-4 17 14-4 23-10 30-10-17-3-23-13-8z",
  },
  { name: "Europe", visitors: 546, orders: 72, color: "var(--chart-3)", d: "M226 46l15-10 19 5 4 14-14 10-18-5z" },
  {
    name: "Africa",
    visitors: 87,
    orders: 12,
    color: "var(--chart-4)",
    d: "M238 82l27-7 21 15-5 28-18 25-13-21-3-20-16-9z",
  },
  {
    name: "Asia Pacific",
    visitors: 459,
    orders: 84,
    color: "var(--chart-5)",
    d: "M270 42l30-10 36 5 27 12 34 1 31 22-11 20-24 9-20-11-25 10-18-14-24 2-19-15-20 1-12-14z",
  },
  { name: "Australia", visitors: 66, orders: 13, color: "var(--primary)", d: "M388 128l19-9 20 8-7 16-21 3z" },
];

export function VisitorRegionMap() {
  const [metric, setMetric] = useState<"visitors" | "orders">("visitors");
  const metricLabel = metric === "visitors" ? "Visitors" : "Orders";
  const total = visitorRegions.reduce((sum, region) => sum + region[metric], 0);
  const maxValue = Math.max(...visitorRegions.map((region) => region[metric]));

  return (
    <div className="grid w-full gap-3">
      <SegmentedControl
        aria-label="Map metric"
        value={metric}
        onValueChange={(value) => setMetric(value === "orders" ? "orders" : "visitors")}
        className="w-fit"
      >
        <SegmentedControlItem value="visitors">Visitors</SegmentedControlItem>
        <SegmentedControlItem value="orders">Orders</SegmentedControlItem>
      </SegmentedControl>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1.3fr)_minmax(8rem,0.7fr)]">
        <svg viewBox="0 0 500 190" role="img" aria-label={`${metricLabel} by region`} className="h-48 w-full">
          {visitorRegions.map((region) => {
            const value = region[metric];
            return (
              <path
                key={region.name}
                d={region.d}
                fill={region.color}
                fillOpacity={0.2 + (value / maxValue) * 0.65}
                stroke="var(--background)"
                strokeWidth={1.2}
              >
                <title>{`${region.name}: ${value.toLocaleString("en-US")} ${metricLabel.toLowerCase()}`}</title>
              </path>
            );
          })}
        </svg>
        <ul className="grid content-center gap-2 text-xs">
          {visitorRegions.map((region) => {
            const value = region[metric];
            const share = Math.round((value / total) * 100);
            return (
              <li key={region.name} className="flex items-center gap-2">
                <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: region.color }} />
                <span className="min-w-0 flex-1 truncate">{region.name}</span>
                <span className="tabular-nums text-muted-foreground">
                  {value.toLocaleString("en-US")} · {share}%
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function MapChartExamples() {
  return (
    <ComponentPreview title="Controlled regional metric" layout="panel" density="chart">
      <VisitorRegionMap />
    </ComponentPreview>
  );
}

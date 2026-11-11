"use client";

import { MetricTicker, type MetricTickerItem } from "@/components/ui/metric-ticker";

const metrics: MetricTickerItem[] = [
  {
    id: "active-users",
    label: "Active users",
    value: "24,680",
    change: "+12.4%",
    trend: "up",
    detail: "Weekly active users are above the workspace target.",
    history: [42, 58, 51, 68, 74, 82, 91],
  },
  {
    id: "resolution",
    label: "Resolution time",
    value: "3h 18m",
    change: "-8.2%",
    trend: "down",
    detail: "Support requests are being resolved faster this week.",
    history: [88, 75, 82, 64, 58, 52, 46],
  },
  {
    id: "retention",
    label: "Team retention",
    value: "96.2%",
    change: "+2.1%",
    trend: "up",
    detail: "More teams returned to review their workspace activity.",
    history: [61, 63, 67, 71, 76, 81, 86],
  },
];

export function MetricTickerExamples() {
  return <MetricTicker items={metrics} />;
}

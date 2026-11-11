"use client";

import { useState } from "react";

import { Sparkline } from "@/components/ui/sparkline";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const periods = {
  week: {
    label: "1W",
    value: "2,486",
    change: "+7.2%",
    data: [2140, 2195, 2228, 2204, 2320, 2386, 2486],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  month: {
    label: "1M",
    value: "2,486",
    change: "+7.2%",
    data: [1940, 2020, 1998, 2110, 2165, 2280, 2246, 2388, 2326, 2486],
    labels: ["May 1", "May 4", "May 7", "May 10", "May 13", "May 16", "May 19", "May 22", "May 25", "May 28"],
  },
  year: {
    label: "1Y",
    value: "2,486",
    change: "+7.2%",
    data: [1420, 1580, 1510, 1770, 1695, 1930, 1850, 2180, 2050, 2300, 2240, 2486],
    labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"],
  },
} as const;

type Period = keyof typeof periods;

export function SparklineExample() {
  const [period, setPeriod] = useState<Period>("week");
  const current = periods[period];
  return (
    <div className="grid w-full max-w-2xl gap-4">
      <Sparkline
        key={period}
        label="Daily active users"
        data={current.data.slice()}
        labels={current.labels.slice()}
        value={current.value}
        change={current.change}
        tone="accent"
        width={360}
        height={76}
      />
      <ToggleGroup
        type="single"
        value={period}
        onValueChange={(value) => {
          if (value === "week" || value === "month" || value === "year") setPeriod(value);
        }}
        variant="outline"
        size="sm"
        aria-label="Sparkline time range"
        className="w-fit rounded-lg border border-border bg-muted/45 p-1 shadow-none"
      >
        {(Object.entries(periods) as [Period, (typeof periods)[Period]][]).map(([key, item]) => (
          <ToggleGroupItem
            key={key}
            value={key}
            className="h-8 border-0 px-2.5 text-xs text-muted-foreground shadow-none data-[state=on]:bg-background data-[state=on]:text-accent-strong data-[state=on]:shadow-[0_1px_3px_color-mix(in_oklab,var(--foreground)_12%,transparent)] sm:px-3 sm:text-sm"
          >
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

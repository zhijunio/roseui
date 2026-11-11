"use client";

import { useState } from "react";

import { SunburstChart } from "@/components/ui/sunburst-chart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function SunburstExample() {
  const [month, setMonth] = useState("Sep");
  return (
    <div className="grid w-full gap-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium leading-tight sm:text-xl sm:leading-7">Cloud spend</h2>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base sm:leading-6">
            {month === "Sep" ? "September 2026" : "August 2026"}
          </p>
          <p className="mt-4 text-sm font-medium text-accent-strong sm:text-base">All teams</p>
        </div>
        <ToggleGroup
          type="single"
          value={month}
          onValueChange={(value) => {
            if (value === "Aug" || value === "Sep") setMonth(value);
          }}
          variant="outline"
          size="sm"
          aria-label="Choose month"
          className="shrink-0 rounded-xl border border-border bg-muted/45 p-1 shadow-none"
        >
          <ToggleGroupItem
            value="Aug"
            className="h-8 border-0 px-2.5 text-sm text-muted-foreground shadow-none data-[state=on]:bg-background data-[state=on]:text-accent-strong data-[state=on]:shadow-[0_1px_3px_color-mix(in_oklab,var(--foreground)_12%,transparent)] sm:h-9 sm:px-3"
          >
            Aug
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Sep"
            className="h-8 border-0 px-2.5 text-sm text-muted-foreground shadow-none data-[state=on]:bg-background data-[state=on]:text-accent-strong data-[state=on]:shadow-[0_1px_3px_color-mix(in_oklab,var(--foreground)_12%,transparent)] sm:h-9 sm:px-3"
          >
            Sep
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <SunburstChart month={month === "Sep" ? "September 2026" : "August 2026"} />
    </div>
  );
}

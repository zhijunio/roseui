"use client";

import { useMemo, useState } from "react";

import { Ridgeline, type RidgelineSeries } from "@/components/ui/ridgeline-chart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const cities = ["Zurich", "Lisbon", "Denver"] as const;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
const centers: Record<(typeof cities)[number], readonly number[]> = {
  Zurich: [-1, 1, 6, 10, 15, 19, 24, 23, 18, 10, 5, 1],
  Lisbon: [12, 14, 17, 19, 22, 25, 28, 28, 26, 22, 17, 13],
  Denver: [7, 10, 14, 18, 24, 30, 33, 31, 26, 19, 11, 6],
};

function seriesFor(city: (typeof cities)[number]): RidgelineSeries[] {
  return months.map((month, monthIndex) => ({
    id: month.toLowerCase(),
    label: month,
    values: Array.from({ length: 32 }, (_, index) => {
      const seasonal = centers[city][monthIndex] ?? 0;
      const wave = Math.sin((index + monthIndex * 1.7) * 1.8) * 2.5 + Math.cos(index * 0.63) * 1.5;
      const warmBias = (index % 7) * 0.28;
      return Math.max(-10, Math.min(40, seasonal + wave + warmBias));
    }),
  }));
}

export function RidgelineExample() {
  const [city, setCity] = useState<(typeof cities)[number]>("Zurich");
  const series = useMemo(() => seriesFor(city), [city]);
  return (
    <div className="grid w-full gap-5">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <h2 className="text-lg font-medium leading-tight sm:text-xl sm:leading-7">Daily highs</h2>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base sm:leading-6">{city}, 2025</p>
        </div>
        <ToggleGroup
          type="single"
          value={city}
          onValueChange={(value) => {
            if (value === "Zurich" || value === "Lisbon" || value === "Denver") setCity(value);
          }}
          variant="outline"
          size="sm"
          aria-label="Choose city"
          className="shrink-0 rounded-xl border border-border bg-muted/45 p-1 shadow-none"
        >
          {cities.map((item) => (
            <ToggleGroupItem
              key={item}
              value={item}
              className="h-8 border-0 px-2.5 text-sm text-muted-foreground shadow-none data-[state=on]:bg-background data-[state=on]:text-accent-strong data-[state=on]:shadow-[0_1px_3px_color-mix(in_oklab,var(--foreground)_12%,transparent)] sm:h-9 sm:px-3"
            >
              {item}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <Ridgeline
        key={city}
        series={series}
        label={`Daily highs in ${city}`}
        unit="°"
        domain={[-10, 40]}
        rowHeight={34}
        overlap={2.4}
        tint
      />
    </div>
  );
}

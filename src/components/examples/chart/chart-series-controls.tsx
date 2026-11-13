"use client";

import { Button } from "@/components/ui/button";

export interface ChartSeriesControl {
  key: string;
  label: string;
  color: string;
}

export function ChartSeriesControls({
  label,
  series,
  selected,
  onToggle,
}: {
  label: string;
  series: readonly ChartSeriesControl[];
  selected: ReadonlySet<string>;
  onToggle: (key: string) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap justify-center gap-2">
      {series.map((item) => {
        const isSelected = selected.has(item.key);
        return (
          <Button
            key={item.key}
            size="sm"
            variant={isSelected ? "default" : "outline"}
            aria-pressed={isSelected}
            onPress={() => onToggle(item.key)}
          >
            <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}

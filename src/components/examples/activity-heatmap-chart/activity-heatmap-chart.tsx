"use client";

import { useMemo, useState } from "react";

import { type ActivityDay, ActivityHeatmap } from "@/components/ui/activity-heatmap";

const years = [2026, 2025, 2024] as const;

function daysForYear(year: number): ActivityDay[] {
  const days = new Date(Date.UTC(year, 1, 29)).getUTCMonth() === 1 ? 366 : 365;
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(Date.UTC(year, 0, index + 1));
    return { date: date.toISOString().slice(0, 10), count: ((index * 13) % 7) + (index % 31 === 0 ? 1 : 0) };
  });
}

export function ActivityHeatmapExample() {
  const [year, setYear] = useState<(typeof years)[number]>(2026);
  const [selectedDate, setSelectedDate] = useState<string | null>(`${year}-03-18`);
  const days = useMemo(() => daysForYear(year), [year]);

  function selectYear(nextYear: (typeof years)[number]) {
    setYear(nextYear);
    setSelectedDate(`${nextYear}-03-18`);
  }

  return (
    <ActivityHeatmap
      days={days}
      label={`Contributions in ${year}`}
      period={String(year)}
      selectedDate={selectedDate}
      onSelectDate={setSelectedDate}
      actions={
        <div
          className="inline-flex items-center gap-1 rounded-2xl border bg-muted/50 p-1"
          role="group"
          aria-label="Choose year"
        >
          {years.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={item === year}
              onClick={() => selectYear(item)}
              className="min-h-9 rounded-xl px-4 text-sm text-muted-foreground transition-colors hover:text-foreground aria-pressed:bg-background aria-pressed:text-accent-strong aria-pressed:shadow-sm"
            >
              {item}
            </button>
          ))}
        </div>
      }
    />
  );
}

"use client";

import { useEffect, useState } from "react";

import { ComponentPreview } from "@/components/examples/component-preview";
import { RealtimeStream, type StreamPoint } from "@/components/ui/realtime-stream";

const start = Date.UTC(2026, 8, 21, 7, 50, 8);
const seedValues = [
  104, 108, 106, 110, 107, 112, 109, 115, 110, 118, 111, 120, 117, 114, 379, 128, 122, 126, 131, 128, 134, 137, 133,
  140, 136, 142, 139, 145, 138, 379, 379, 379,
];
const initialPoints = seedValues.map(
  (value, index): StreamPoint => ({ t: start + index * 1_000, value, anomaly: value > 300 ? "Spike" : undefined }),
);

function formatTime(time: number) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(time);
}

export function RealtimeStreamExamples() {
  const [points, setPoints] = useState(initialPoints);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(
      () =>
        setPoints((current) => {
          const last = current[current.length - 1]!;
          const value = Math.max(80, Math.min(420, last.value + Math.round((Math.random() - 0.48) * 14)));
          return [...current.slice(-80), { t: last.t + 500, value, anomaly: value > 300 ? "Spike" : undefined }];
        }),
      500,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <ComponentPreview title="Checkout API" layout="fullStack" span={2} density="chart">
      <div className="grid gap-3">
        <div>
          <h3 className="text-base font-medium leading-normal">Checkout API</h3>
          <p className="text-sm text-muted-foreground">p95 latency, simulated feed</p>
        </div>
        <RealtimeStream
          points={points}
          label="Checkout API p95 latency"
          unit="ms"
          interval={500}
          paused={paused}
          onPausedChange={setPaused}
          formatTime={formatTime}
        />
      </div>
    </ComponentPreview>
  );
}

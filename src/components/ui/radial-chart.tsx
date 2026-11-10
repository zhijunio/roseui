"use client";

import { useId } from "react";

export type RadialChartDatum = { key: string; label: string; value: number; color?: string };
export type RadialChartProps = { data: readonly [RadialChartDatum, ...RadialChartDatum[]]; label: string; max?: number; semicircle?: boolean; height?: number };

function colorFor(index: number) { return `var(--chart-${(index % 5) + 1})`; }

export function RadialChart({ data, label, max = 100, semicircle = false, height = 240 }: RadialChartProps) {
  const id = useId();
  const viewBox = semicircle ? "0 0 240 156" : "0 0 240 240";
  const centerValue = data[0]?.value ?? 0;
  return (
    <figure className="grid w-full gap-4" aria-labelledby={`${id}-title`}>
      <figcaption className="sr-only" id={`${id}-title`}>{label}</figcaption>
      <div className="relative mx-auto w-full max-w-[320px]" style={{ height }}>
        <svg viewBox={viewBox} className="size-full" aria-hidden="true">
          {semicircle ? (
            <>
              <path d="M 32 124 A 88 88 0 0 1 208 124" fill="none" className="stroke-muted" strokeWidth="14" strokeLinecap="round" />
              <path d="M 32 124 A 88 88 0 0 1 208 124" fill="none" stroke={data[0]?.color ?? colorFor(0)} strokeWidth="14" strokeLinecap="round" pathLength="100" strokeDasharray={`${Math.max(0, Math.min(100, (centerValue / max) * 100))} 100`} />
            </>
          ) : data.map((item, index) => {
            const radius = 88 - index * 19;
            const circumference = 2 * Math.PI * radius;
            const progress = Math.max(0, Math.min(1, item.value / Math.max(1, max)));
            return <g key={item.key} transform="rotate(-90 120 120)"><circle cx="120" cy="120" r={radius} fill="none" className="stroke-muted" strokeWidth="12" /><circle cx="120" cy="120" r={radius} fill="none" stroke={item.color ?? colorFor(index)} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${circumference * progress} ${circumference}`} /></g>;
          })}
        </svg>
        <div className={`absolute inset-0 grid place-items-center content-center text-center ${semicircle ? "pb-1" : ""}`}><span className="text-3xl font-semibold tabular-nums">{centerValue}</span><span className="text-xs text-muted-foreground">{data[0]?.label}</span></div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2" aria-label={`${label} values`}>
        {data.map((item, index) => <div key={item.key} className="flex items-center justify-between gap-3 text-sm"><span className="flex min-w-0 items-center gap-2"><span aria-hidden="true" className="size-2.5 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color ?? colorFor(index) }} />{item.label}</span><span className="tabular-nums font-medium">{item.value}</span></div>)}
      </div>
    </figure>
  );
}

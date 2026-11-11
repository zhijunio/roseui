"use client";

import * as React from "react";
import { IconChevronLeft, IconChevronRight, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type MetricTickerItem = {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  detail: string;
  history: readonly number[];
};

type MetricTickerProps = {
  items: readonly MetricTickerItem[];
  defaultActiveId?: string;
  onActiveChange?: (item: MetricTickerItem) => void;
  className?: string;
};

export function MetricTicker({ items, defaultActiveId, onActiveChange, className }: MetricTickerProps) {
  const initialIndex = Math.max(0, items.findIndex((item) => item.id === defaultActiveId));
  const [activeIndex, setActiveIndex] = React.useState(initialIndex);
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const panelId = React.useId();
  const selectedIndex = items.length ? Math.min(activeIndex, items.length - 1) : 0;
  const activeItem = items[selectedIndex];

  const select = (index: number, moveFocus = false) => {
    const nextIndex = (index + items.length) % items.length;
    setActiveIndex(nextIndex);
    const item = items[nextIndex];
    if (item) onActiveChange?.(item);
    if (moveFocus) {
      window.requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus());
    }
  };

  if (!activeItem) return null;

  return <section className={cn("space-y-3", className)} aria-label="Workspace metrics">
    <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Workspace metrics" aria-orientation="horizontal">
      {items.map((item, index) => <button key={item.id} ref={(element) => { tabRefs.current[index] = element; }} id={`${panelId}-tab-${item.id}`} type="button" role="tab" aria-selected={index === selectedIndex} aria-controls={panelId} tabIndex={index === selectedIndex ? 0 : -1} onClick={() => select(index)} onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); select(selectedIndex + 1, true); }
        if (event.key === "ArrowLeft") { event.preventDefault(); select(selectedIndex - 1, true); }
        if (event.key === "Home") { event.preventDefault(); select(0, true); }
        if (event.key === "End") { event.preventDefault(); select(items.length - 1, true); }
      }} className={cn("min-w-44 shrink-0 rounded-lg border bg-card p-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring", index === activeIndex ? "border-primary bg-primary/5" : "hover:bg-muted")}>
        <span className="block truncate text-xs text-muted-foreground">{item.label}</span>
        <span className="mt-1 block text-xl font-semibold tabular-nums">{item.value}</span>
        <span className={cn("mt-1 inline-flex items-center gap-1 text-xs font-medium", item.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400")}>
          {item.trend === "up" ? <IconTrendingUp className="size-3.5" aria-hidden="true" /> : <IconTrendingDown className="size-3.5" aria-hidden="true" />}{item.change}
        </span>
      </button>)}
    </div>
    <div id={panelId} role="tabpanel" tabIndex={0} className="rounded-lg border bg-muted/20 p-4" aria-labelledby={`${panelId}-tab-${activeItem.id}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><p className="text-sm font-medium">{activeItem.label}</p><p className="mt-1 text-sm text-muted-foreground">{activeItem.detail}</p></div>
        <div className="flex gap-1" aria-label="Select metric">
          <Button size="icon-sm" variant="ghost" aria-label="Previous metric" onClick={() => select(activeIndex - 1)}><IconChevronLeft /></Button>
          <Button size="icon-sm" variant="ghost" aria-label="Next metric" onClick={() => select(activeIndex + 1)}><IconChevronRight /></Button>
        </div>
      </div>
      <div className="mt-4" aria-label={`${activeItem.label} history`}>
        <svg viewBox="0 0 320 72" role="img" aria-label={`${activeItem.label} trend`} className="h-20 w-full overflow-visible text-primary">
          <path d="M0 64H320" stroke="currentColor" strokeOpacity=".16" />
          <polyline points={activeItem.history.map((point, index) => `${index * (320 / Math.max(1, activeItem.history.length - 1))},${64 - Math.max(0, Math.min(100, point)) * 0.52}`).join(" ")} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex justify-between gap-2 text-[10px] text-muted-foreground">{activeItem.history.map((point, index) => <span key={`${point}-${index}`} className="tabular-nums">{point}</span>)}</div>
      </div>
    </div>
  </section>;
}

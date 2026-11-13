"use client";

import { useMemo, useState } from "react";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { LineChart, type LineChartDatum } from "@/components/ui/line-chart";
import styles from "@/components/ui/line-chart.module.css";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { ComponentPreview } from "@/examples/component-preview";

type Range = "7d" | "30d" | "90d";

const thirtyDayValues = [
  [128, 121],
  [198, 202],
  [192, 198],
  [211, 190],
  [206, 182],
  [199, 172],
  [130, 121],
  [159, 134],
  [254, 218],
  [262, 217],
  [247, 226],
  [260, 223],
  [253, 231],
  [169, 146],
  [158, 121],
  [231, 184],
  [239, 203],
  [437, 200],
  [338, 181],
  [240, 187],
  [139, 118],
  [134, 148],
  [250, 235],
  [268, 211],
  [262, 230],
  [260, 226],
  [268, 232],
  [154, 143],
  [176, 147],
  [248, 183],
] satisfies readonly [number, number][];

const thirtyDayLabels = [
  "Sun, Aug 23",
  "Mon, Aug 24",
  "Tue, Aug 25",
  "Wed, Aug 26",
  "Thu, Aug 27",
  "Fri, Aug 28",
  "Sat, Aug 29",
  "Sun, Aug 30",
  "Mon, Aug 31",
  "Tue, Sep 1",
  "Wed, Sep 2",
  "Thu, Sep 3",
  "Fri, Sep 4",
  "Sat, Sep 5",
  "Sun, Sep 6",
  "Mon, Sep 7",
  "Tue, Sep 8",
  "Wed, Sep 9",
  "Thu, Sep 10",
  "Fri, Sep 11",
  "Sat, Sep 12",
  "Sun, Sep 13",
  "Mon, Sep 14",
  "Tue, Sep 15",
  "Wed, Sep 16",
  "Thu, Sep 17",
  "Fri, Sep 18",
  "Sat, Sep 19",
  "Sun, Sep 20",
  "Today, Sep 21",
] as const;

function dateKey(startMonth: number, startDay: number, offset: number) {
  return new Date(Date.UTC(2026, startMonth, startDay + offset)).toISOString().slice(0, 10);
}

const thirtyDayData = thirtyDayLabels.map((label, index) => {
  const values = thirtyDayValues[index] ?? [0, 0];
  return {
    key: dateKey(7, 23, index),
    label,
    axisLabel:
      index === 0 || index === 8 || index === 16 || index === 24 || index === 29
        ? label.replace(/^[A-Za-z]+, /, "")
        : undefined,
    values: { signups: values[0], previous: values[1] },
  };
}) satisfies LineChartDatum[];

const olderData = Array.from({ length: 60 }, (_, index) => {
  const day = index + 1;
  const current = 118 + ((index * 29) % 126) + (index % 7 === 3 ? 44 : 0);
  const previous = 112 + ((index * 23) % 104);
  return {
    key: dateKey(5, 1, index),
    label: `Day ${day} before Aug 23`,
    axisLabel: index % 15 === 0 ? `Jun ${day}` : undefined,
    values: { signups: current, previous },
  };
}) satisfies LineChartDatum[];

const ranges: Record<Range, LineChartDatum[]> = {
  "7d": thirtyDayData.slice(-7),
  "30d": thirtyDayData,
  "90d": [...olderData, ...thirtyDayData],
};

const periodLabels: Record<Range, string> = {
  "7d": "7 days",
  "30d": "30 days",
  "90d": "90 days",
};

function total(data: readonly LineChartDatum[], key: string) {
  return data.reduce((sum, item) => sum + (item.values[key] ?? 0), 0);
}

export function LineChartExamples() {
  const [range, setRange] = useState<Range>("30d");
  const [active, setActive] = useState<LineChartDatum | null>(null);
  const data = ranges[range];
  const readout = active ?? data[data.length - 1];
  const totals = useMemo(() => ({ current: total(data, "signups"), previous: total(data, "previous") }), [data]);
  const change = totals.previous ? ((totals.current / totals.previous - 1) * 100).toFixed(1) : "0.0";

  return (
    <ComponentPreview title="Trial signups" bare span={2} className={styles.card}>
      <div className={styles.top}>
        <h3 className={styles.title}>Trial signups</h3>
        <SegmentedControl
          aria-label="Range"
          size="sm"
          value={range}
          onValueChange={(value) => {
            if (value === "7d" || value === "30d" || value === "90d") {
              setRange(value);
              setActive(null);
            }
          }}
        >
          <SegmentedControlItem value="7d">7 days</SegmentedControlItem>
          <SegmentedControlItem value="30d">30 days</SegmentedControlItem>
          <SegmentedControlItem value="90d">90 days</SegmentedControlItem>
        </SegmentedControl>
      </div>
      <div className={styles.readout}>
        <AnimatedCounter
          label={active ? readout?.label : "Total signups"}
          value={active ? (readout?.values.signups ?? 0) : totals.current}
          animateOnView
        />
        <p className={styles.note} data-up={!active || undefined}>
          {active ? "Signups on selected day" : `+${change}% vs previous ${periodLabels[range]}`}
        </p>
      </div>
      <LineChart
        label="Trial signups"
        data={data}
        series={[
          { key: "signups", label: "This period" },
          { key: "previous", label: "Previous period", dashed: true },
        ]}
        onActiveChange={(_, datum) => setActive(datum)}
      />
    </ComponentPreview>
  );
}

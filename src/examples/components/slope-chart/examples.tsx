"use client";

import { useState } from "react";

import { SlopeChart, type SlopeItem } from "@/components/ui/slope-chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentPreview } from "@/examples/component-preview";

type Region = "americas" | "europe" | "asia";

const dataByRegion: Record<Region, SlopeItem[]> = {
  americas: [
    { key: "direct", label: "Direct", start: 3.9, end: 3.7 },
    { key: "search", label: "Organic search", start: 3.4, end: 3.6 },
    { key: "email", label: "Email", start: 3.1, end: 4.6 },
    { key: "paid-search", label: "Paid search", start: 2.8, end: 2.5 },
    { key: "referral", label: "Referral", start: 2.6, end: 3.2 },
    { key: "social", label: "Paid social", start: 1.9, end: 1.3 },
  ],
  europe: [
    { key: "search", label: "Organic search", start: 4.2, end: 4.8 },
    { key: "direct", label: "Direct", start: 3.8, end: 3.6 },
    { key: "email", label: "Email", start: 3.2, end: 3.9 },
    { key: "referral", label: "Referral", start: 2.9, end: 3.1 },
    { key: "paid-search", label: "Paid search", start: 2.7, end: 2.4 },
    { key: "social", label: "Paid social", start: 2.1, end: 1.8 },
  ],
  asia: [
    { key: "search", label: "Organic search", start: 3.6, end: 4.4 },
    { key: "email", label: "Email", start: 3.4, end: 3.9 },
    { key: "direct", label: "Direct", start: 3.5, end: 3.2 },
    { key: "referral", label: "Referral", start: 2.8, end: 3.4 },
    { key: "paid-search", label: "Paid search", start: 2.5, end: 2.2 },
    { key: "social", label: "Paid social", start: 1.7, end: 1.4 },
  ],
};

const regionLabels: Record<Region, string> = {
  americas: "Americas",
  europe: "Europe",
  asia: "Asia Pacific",
};

const regions: readonly Region[] = ["americas", "europe", "asia"];

export function SlopeChartExample() {
  const [region, setRegion] = useState<Region>("americas");

  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentPreview title="Interactive slope chart" layout="fullStack" span={2} density="chart">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold tracking-tight">Conversion by channel</h2>
              <p className="mt-1 text-sm text-muted-foreground">Q1 to Q2 2026</p>
            </div>
            <Tabs
              value={region}
              onValueChange={(value) => {
                if (value === "americas" || value === "europe" || value === "asia") setRegion(value);
              }}
              className="shrink-0"
            >
              <TabsList aria-label="Conversion region" variant="pill" className="w-full sm:w-auto">
                {regions.map((key) => (
                  <TabsTrigger key={key} value={key}>
                    {regionLabels[key]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <SlopeChart
            className="mt-8 w-full"
            data={dataByRegion[region]}
            label={`Conversion by channel in ${regionLabels[region]}`}
            startLabel="Q1"
            endLabel="Q2"
            height={300}
            highlightKey="email"
            formatValue={(value) => `${value.toFixed(1)}%`}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}

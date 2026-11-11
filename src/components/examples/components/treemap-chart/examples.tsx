"use client";

import { ComponentPreview } from "@/components/examples/component-preview";
import { Treemap, type TreemapNode } from "@/components/ui/treemap";

const data = {
  id: "all",
  label: "All regions",
  children: [
    {
      id: "na",
      label: "North America",
      children: [
        { id: "us", label: "United States", value: 18400, color: 24 },
        { id: "ca", label: "Canada", value: 2350, color: 19 },
      ],
    },
    { id: "eu", label: "Europe", children: [{ id: "de", label: "Germany", value: 4120, color: 28 }] },
  ],
} satisfies TreemapNode;

export function TreemapExample() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentPreview title="ARR" layout="fullStack" span={2} density="chart">
        <Treemap data={data} label="ARR" colorLabel="Growth" formatColor={(value) => "+" + value + "%"} />
      </ComponentPreview>
    </div>
  );
}

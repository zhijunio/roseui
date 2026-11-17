"use client";

import { useMemo, useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { SegmentedControl, SegmentedControlItem } from "@/components/roseui/segmented-control";

const weekVisitors = [
  { label: "Mon", desktop: 32, mobile: 20 },
  { label: "Tue", desktop: 41, mobile: 22 },
  { label: "Wed", desktop: 28, mobile: 15 },
  { label: "Thu", desktop: 36, mobile: 18 },
  { label: "Fri", desktop: 44, mobile: 25 },
  { label: "Sat", desktop: 18, mobile: 30 },
  { label: "Sun", desktop: 12, mobile: 16 },
];

type Period = "week" | "half-year";
type Stage = 0 | 1 | 2;

type SankeyNode = {
  id: string;
  label: string;
  stage: Stage;
  color: string;
};

type SankeyLink = {
  from: string;
  to: string;
  value: number;
};

type SankeyData = {
  nodes: SankeyNode[];
  links: SankeyLink[];
};

type LayoutNode = SankeyNode & {
  x: number;
  y: number;
  height: number;
  value: number;
};

type LayoutLink = SankeyLink & {
  source: LayoutNode;
  target: LayoutNode;
  sourceY: number;
  targetY: number;
  height: number;
};

function monthlyVisitors(locale: string) {
  return [186, 305, 237, 173, 209, 214].map((desktop, index) => ({
    desktop,
    mobile: [80, 200, 120, 190, 130, 140][index],
    month: new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(2026, index, 1)),
  }));
}

function splitValue(total: number, shares: readonly [number, number]): [number, number, number] {
  const first = Math.round(total * shares[0]);
  const second = Math.round(total * shares[1]);
  return [first, second, total - first - second];
}

function visitorFlow(period: Period): SankeyData {
  const rows = period === "week" ? weekVisitors : monthlyVisitors("en-US");
  const totals = rows.reduce(
    (result, row) => ({ desktop: result.desktop + row.desktop, mobile: result.mobile + row.mobile }),
    { desktop: 0, mobile: 0 },
  );
  const [desktopProducts, desktopDocs, desktopPricing] = splitValue(totals.desktop, [0.48, 0.3]);
  const [mobileProducts, mobileDocs, mobilePricing] = splitValue(totals.mobile, [0.42, 0.33]);
  const productViews = desktopProducts + mobileProducts;
  const documentationViews = desktopDocs + mobileDocs;
  const pricingViews = desktopPricing + mobilePricing;
  const signups: [number, number, number] = [
    Math.round(productViews * 0.32),
    Math.round(documentationViews * 0.1),
    Math.round(pricingViews * 0.48),
  ];

  return {
    nodes: [
      { id: "desktop", label: "Desktop", stage: 0, color: "var(--chart-1)" },
      { id: "mobile", label: "Mobile", stage: 0, color: "var(--chart-2)" },
      { id: "products", label: "Products", stage: 1, color: "var(--chart-3)" },
      { id: "docs", label: "Documentation", stage: 1, color: "var(--chart-4)" },
      { id: "pricing", label: "Pricing", stage: 1, color: "var(--chart-5)" },
      { id: "signup", label: "Signed up", stage: 2, color: "var(--chart-1)" },
      { id: "left", label: "No signup", stage: 2, color: "var(--muted-foreground)" },
    ],
    links: [
      { from: "desktop", to: "products", value: desktopProducts },
      { from: "desktop", to: "docs", value: desktopDocs },
      { from: "desktop", to: "pricing", value: desktopPricing },
      { from: "mobile", to: "products", value: mobileProducts },
      { from: "mobile", to: "docs", value: mobileDocs },
      { from: "mobile", to: "pricing", value: mobilePricing },
      { from: "products", to: "signup", value: signups[0] },
      { from: "products", to: "left", value: productViews - signups[0] },
      { from: "docs", to: "signup", value: signups[1] },
      { from: "docs", to: "left", value: documentationViews - signups[1] },
      { from: "pricing", to: "signup", value: signups[2] },
      { from: "pricing", to: "left", value: pricingViews - signups[2] },
    ],
  };
}

function layoutSankey(data: SankeyData) {
  const width = 760;
  const height = 340;
  const top = 42;
  const nodeWidth = 10;
  const gap = 18;
  const positions: readonly [number, number, number] = [48, 375, 692];
  const valueByNode = new Map(data.nodes.map((node) => [node.id, 0]));

  for (const link of data.links) {
    valueByNode.set(link.from, (valueByNode.get(link.from) ?? 0) + link.value);
  }
  for (const link of data.links) {
    if (!data.links.some((candidate) => candidate.from === link.to)) {
      valueByNode.set(link.to, (valueByNode.get(link.to) ?? 0) + link.value);
    }
  }

  const total = data.nodes
    .filter((node) => node.stage === 0)
    .reduce((sum, node) => sum + (valueByNode.get(node.id) ?? 0), 0);
  const stages: readonly Stage[] = [0, 1, 2];
  const maxNodes = Math.max(...stages.map((stage) => data.nodes.filter((node) => node.stage === stage).length));
  const scale = (height - top - 18 - gap * (maxNodes - 1)) / total;
  const nodes = new Map<string, LayoutNode>();

  for (const stage of stages) {
    let y = top;
    for (const node of data.nodes.filter((item) => item.stage === stage)) {
      const value = valueByNode.get(node.id) ?? 0;
      const nodeHeight = value * scale;
      nodes.set(node.id, { ...node, value, x: positions[stage], y, height: nodeHeight });
      y += nodeHeight + gap;
    }
  }

  const sourceOffsets = new Map<string, number>();
  const targetOffsets = new Map<string, number>();
  const links = data.links.map((link): LayoutLink => {
    const source = nodes.get(link.from);
    const target = nodes.get(link.to);
    if (!source || !target) throw new Error(`Sankey link references an unknown node: ${link.from} → ${link.to}`);
    const linkHeight = link.value * scale;
    const sourceY = source.y + (sourceOffsets.get(link.from) ?? 0);
    const targetY = target.y + (targetOffsets.get(link.to) ?? 0);
    sourceOffsets.set(link.from, (sourceOffsets.get(link.from) ?? 0) + linkHeight);
    targetOffsets.set(link.to, (targetOffsets.get(link.to) ?? 0) + linkHeight);
    return { ...link, source, target, sourceY, targetY, height: linkHeight };
  });

  return { width, height, nodeWidth, nodes: [...nodes.values()], links, total };
}

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function VisitorSankey() {
  const [period, setPeriod] = useState<Period>("half-year");
  const data = useMemo(() => visitorFlow(period), [period]);
  const chart = useMemo(() => layoutSankey(data), [data]);
  const signups = chart.nodes.find((node) => node.id === "signup")?.value ?? 0;
  const signupRate = chart.total ? Math.round((signups / chart.total) * 100) : 0;
  const periodLabel = period === "week" ? "This week" : "January through June";

  return (
    <div className="grid w-full gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SegmentedControl
          aria-label="Sankey flow period"
          value={period}
          onValueChange={(value) => setPeriod(value === "week" ? "week" : "half-year")}
          className="w-fit"
        >
          <SegmentedControlItem value="week">This week</SegmentedControlItem>
          <SegmentedControlItem value="half-year">Jan–Jun</SegmentedControlItem>
        </SegmentedControl>
        <span className="text-xs tabular-nums text-muted-foreground">{periodLabel}</span>
      </div>

      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <div className="rounded-lg border bg-background px-3 py-2">
          <dt className="text-xs text-muted-foreground">Sessions</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums">{formatCount(chart.total)}</dd>
        </div>
        <div className="rounded-lg border bg-background px-3 py-2">
          <dt className="text-xs text-muted-foreground">Sign-ups</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums">{formatCount(signups)}</dd>
        </div>
        <div className="col-span-2 rounded-lg border bg-background px-3 py-2 sm:col-span-1">
          <dt className="text-xs text-muted-foreground">Conversion</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums">{signupRate}%</dd>
        </div>
      </dl>

      <div className="w-full overflow-x-auto rounded-lg border bg-background/50">
        <svg
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          role="img"
          aria-label={`Visitor sessions from device through page group to sign-up outcome, ${periodLabel}`}
          className="h-[300px] min-w-[680px] w-full"
        >
          <text x={48} y={20} textAnchor="middle" className="fill-muted-foreground text-[11px]">
            Device
          </text>
          <text x={380} y={20} textAnchor="middle" className="fill-muted-foreground text-[11px]">
            Page group
          </text>
          <text x={700} y={20} textAnchor="middle" className="fill-muted-foreground text-[11px]">
            Outcome
          </text>
          {chart.links.map((link) => {
            const sourceX = link.source.x + chart.nodeWidth;
            const targetX = link.target.x;
            const curve = (targetX - sourceX) * 0.48;
            const path = [
              `M ${sourceX} ${link.sourceY}`,
              `C ${sourceX + curve} ${link.sourceY}, ${targetX - curve} ${link.targetY}, ${targetX} ${link.targetY}`,
              `L ${targetX} ${link.targetY + link.height}`,
              `C ${targetX - curve} ${link.targetY + link.height}, ${sourceX + curve} ${link.sourceY + link.height}, ${sourceX} ${link.sourceY + link.height}`,
              "Z",
            ].join(" ");
            return (
              <path key={`${link.from}-${link.to}`} d={path} fill={link.source.color} fillOpacity={0.26}>
                <title>{`${link.source.label} → ${link.target.label}: ${formatCount(link.value)} sessions`}</title>
              </path>
            );
          })}
          {chart.nodes.map((node) => {
            const labelX = node.stage === 0 ? node.x - 10 : node.x + chart.nodeWidth + 10;
            const anchor = node.stage === 0 ? "end" : "start";
            return (
              <g key={node.id}>
                <rect x={node.x} y={node.y} width={chart.nodeWidth} height={node.height} rx={4} fill={node.color}>
                  <title>{`${node.label}: ${formatCount(node.value)} sessions`}</title>
                </rect>
                <text
                  x={labelX}
                  y={node.y + node.height / 2 - 4}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  className="fill-foreground text-[11px] font-medium"
                >
                  {node.label}
                </text>
                <text
                  x={labelX}
                  y={node.y + node.height / 2 + 10}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  className="fill-muted-foreground text-[10px] tabular-nums"
                >
                  {formatCount(node.value)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export function SankeyChartExamples() {
  return (
    <ComponentPreview title="Multi-stage Flow" layout="panel" density="chart">
      <VisitorSankey />
    </ComponentPreview>
  );
}

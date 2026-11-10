"use client";

import { useMemo, useState } from "react";
import {
  IconArrowUpRight,
  IconCalendarEvent,
  IconChevronRight,
  IconDownload,
  IconEye,
  IconUserPlus,
  IconWallet,
} from "@tabler/icons-react";
import { toast } from "sonner";

import { AreaChart, type MetricAreaDatum } from "@/components/ui/area-chart";
import { PieChart, type PieChartDatum } from "@/components/ui/pie-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type RangeKey = "7d" | "30d" | "90d";
type SourceMixKey = "organic" | "direct" | "social" | "referral" | "email";
type SourceMixDatum = Omit<PieChartDatum, "key"> & { key: SourceMixKey };
type SourcePerformanceDatum = {
  key: SourceMixKey;
  source: string;
  visitors: number;
  signups: number;
  revenue: number;
  change: number;
  tone: string;
};
type SourcePerformanceRow = SourcePerformanceDatum & { conversion: number };

function isRangeKey(value: string): value is RangeKey {
  return value in ranges;
}

const ranges: Record<RangeKey, { label: string; period: string }> = {
  "7d": { label: "Last 7 days", period: "Nov 4 - Nov 10, 2026" },
  "30d": { label: "Last 30 days", period: "Oct 12 - Nov 10, 2026" },
  "90d": { label: "Last 90 days", period: "Aug 12 - Nov 10, 2026" },
};

const trendData: Record<RangeKey, readonly MetricAreaDatum[]> = {
  "7d": [
    { key: "nov-04", label: "Nov 04", axisLabel: "Nov 04", values: { visitors: 612, signups: 41 } },
    { key: "nov-05", label: "Nov 05", axisLabel: "Nov 05", values: { visitors: 734, signups: 49 } },
    { key: "nov-06", label: "Nov 06", axisLabel: "Nov 06", values: { visitors: 689, signups: 44 } },
    { key: "nov-07", label: "Nov 07", axisLabel: "Nov 07", values: { visitors: 521, signups: 31 } },
    { key: "nov-08", label: "Nov 08", axisLabel: "Nov 08", values: { visitors: 804, signups: 53 } },
    { key: "nov-09", label: "Nov 09", axisLabel: "Nov 09", values: { visitors: 917, signups: 62 } },
    { key: "nov-10", label: "Nov 10", axisLabel: "Nov 10", values: { visitors: 1034, signups: 68 } },
  ],
  "30d": [
    { key: "oct-12", label: "Oct 12", axisLabel: "Oct 12", values: { visitors: 2184, signups: 142 } },
    { key: "oct-16", label: "Oct 16", axisLabel: "Oct 16", values: { visitors: 3106, signups: 194 } },
    { key: "oct-20", label: "Oct 20", axisLabel: "Oct 20", values: { visitors: 2748, signups: 176 } },
    { key: "oct-24", label: "Oct 24", axisLabel: "Oct 24", values: { visitors: 3884, signups: 251 } },
    { key: "oct-28", label: "Oct 28", axisLabel: "Oct 28", values: { visitors: 4216, signups: 278 } },
    { key: "nov-03", label: "Nov 03", axisLabel: "Nov 03", values: { visitors: 4906, signups: 319 } },
    { key: "nov-10", label: "Nov 10", axisLabel: "Nov 10", values: { visitors: 5188, signups: 341 } },
  ],
  "90d": [
    { key: "aug-12", label: "Aug 12", axisLabel: "Aug 12", values: { visitors: 4420, signups: 288 } },
    { key: "aug-26", label: "Aug 26", axisLabel: "Aug 26", values: { visitors: 5084, signups: 322 } },
    { key: "sep-09", label: "Sep 09", axisLabel: "Sep 09", values: { visitors: 5710, signups: 360 } },
    { key: "sep-23", label: "Sep 23", axisLabel: "Sep 23", values: { visitors: 6264, signups: 398 } },
    { key: "oct-07", label: "Oct 07", axisLabel: "Oct 07", values: { visitors: 6882, signups: 439 } },
    { key: "oct-24", label: "Oct 24", axisLabel: "Oct 24", values: { visitors: 7514, signups: 486 } },
    { key: "nov-10", label: "Nov 10", axisLabel: "Nov 10", values: { visitors: 8236, signups: 531 } },
  ],
};

const revenueBySource: readonly [SourcePerformanceDatum, ...SourcePerformanceDatum[]] = [
  { key: "organic", source: "Organic search", visitors: 26842, signups: 1932, revenue: 48760, change: 12.6, tone: "success" },
  { key: "direct", source: "Direct", visitors: 18406, signups: 1276, revenue: 33920, change: 7.4, tone: "primary" },
  { key: "social", source: "Paid social", visitors: 12984, signups: 714, revenue: 18640, change: -4.8, tone: "info" },
  { key: "referral", source: "Referral", visitors: 7218, signups: 612, revenue: 14880, change: 18.9, tone: "warning" },
  { key: "email", source: "Email", visitors: 5276, signups: 528, revenue: 12360, change: 3.1, tone: "destructive" },
];

const sourceMixScales: Record<RangeKey, Record<SourceMixKey, number>> = {
  // The short window captures a partner launch and an email campaign; the
  // longer window reflects the steadier organic acquisition mix.
  "7d": { organic: 0.12, direct: 0.08, social: 0.28, referral: 0.42, email: 0.65 },
  "30d": { organic: 1, direct: 1, social: 1, referral: 1, email: 1 },
  "90d": { organic: 3.5, direct: 2.1, social: 1.3, referral: 3.8, email: 1.6 },
};

const sourceColors: Record<SourceMixKey, string> = {
  organic: "var(--chart-1)",
  direct: "var(--chart-2)",
  social: "var(--chart-3)",
  referral: "var(--chart-4)",
  email: "var(--chart-5)",
};

function sourcePerformanceForRange(range: RangeKey): readonly [SourcePerformanceRow, ...SourcePerformanceRow[]] {
  const scales = sourceMixScales[range];
  const [first, ...rest] = revenueBySource;
  const rows = [first, ...rest].map((item) => {
    const scale = scales[item.key];
    const visitors = Math.round(item.visitors * scale);
    const signups = Math.round(item.signups * scale);
    return {
      ...item,
      visitors,
      signups,
      revenue: Math.round(item.revenue * scale),
      conversion: (signups / Math.max(visitors, 1)) * 100,
    };
  });
  const [firstRow, ...restRows] = rows;
  return [firstRow, ...restRows];
}

function sourceMixForPerformance(rows: readonly [SourcePerformanceRow, ...SourcePerformanceRow[]]): readonly [SourceMixDatum, ...SourceMixDatum[]] {
  const [first, ...rest] = rows;
  const toDatum = (item: SourcePerformanceRow): SourceMixDatum => ({
    key: item.key,
    label: item.source,
    value: item.revenue,
    color: sourceColors[item.key],
  });
  return [toDatum(first), ...rest.map(toDatum)];
}

const summary = {
  visitors: { label: "Visitors", change: "+11.8%", icon: IconEye, color: "text-primary" },
  signups: { label: "Signups", change: "+7.6%", icon: IconUserPlus, color: "text-success" },
  revenue: { label: "Revenue", change: "+13.4%", icon: IconWallet, color: "text-warning" },
};

export function AnalyticsDashboard() {
  const [range, setRange] = useState<RangeKey>("30d");
  const [source, setSource] = useState("all");
  const rangeInfo = ranges[range];
  const chartData = useMemo(() => trendData[range], [range]);
  const rangeSourcePerformance = useMemo(() => sourcePerformanceForRange(range), [range]);
  const rangeSourceMix = useMemo(() => sourceMixForPerformance(rangeSourcePerformance), [rangeSourcePerformance]);
  const rangeTotals = useMemo(() => rangeSourcePerformance.reduce((totals, item) => ({
    visitors: totals.visitors + item.visitors,
    signups: totals.signups + item.signups,
    revenue: totals.revenue + item.revenue,
  }), { visitors: 0, signups: 0, revenue: 0 }), [rangeSourcePerformance]);
  const rangeSummary = useMemo(() => ({
    visitors: rangeTotals.visitors.toLocaleString("en-US"),
    signups: rangeTotals.signups.toLocaleString("en-US"),
    revenue: `$${rangeTotals.revenue.toLocaleString("en-US")}`,
  }), [rangeTotals]);
  const rangeRevenueTotal = rangeSummary.revenue;

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header className="flex flex-col gap-4 border-b border-border/70 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Track acquisition, activation, and revenue across every source.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Tabs value={range} onValueChange={(value) => { if (isRangeKey(value)) setRange(value); }}>
            <TabsList aria-label="Select date range" variant="pill" className="h-9">
              <TabsTrigger value="7d" className="h-7 px-3"><IconCalendarEvent aria-hidden="true" />7 days</TabsTrigger>
              <TabsTrigger value="30d" className="h-7 px-3">30 days</TabsTrigger>
              <TabsTrigger value="90d" className="h-7 px-3">90 days</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" onClick={() => toast.success("Report exported", { description: `Analytics for ${rangeInfo.period} is ready.` })}>
            <IconDownload />
            Export report
          </Button>
        </div>
      </header>

      <section aria-label="Key metrics" className="grid gap-4 md:grid-cols-3">
        {Object.entries(summary).map(([key, { label, change, icon: Icon, color }]) => (
          <Card key={label} className="min-w-0">
            <CardContent className="flex items-start justify-between gap-4">
              <div className="min-w-0 space-y-3">
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className="text-3xl font-semibold tracking-tight tabular-nums">{rangeSummary[key as keyof typeof rangeSummary]}</p>
                <p className="flex items-center gap-1.5 text-xs text-success"><IconArrowUpRight className="size-3.5" />{change}<span className="text-muted-foreground">vs previous period</span></p>
              </div>
              <div className={cn("rounded-md bg-muted/60 p-2.5", color)}><Icon className="size-5" /></div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.9fr)]">
        <Card className="min-w-0">
          <CardHeader className="border-b border-border/60">
            <CardTitle>Visitors and signups</CardTitle>
            <CardDescription>Daily acquisition trend for {rangeInfo.period}.</CardDescription>
            <CardAction><Badge variant="success-light" radius="full"><IconArrowUpRight />12.8% growth</Badge></CardAction>
          </CardHeader>
          <CardContent className="pt-5">
            <AreaChart data={chartData} series={[{ key: "visitors", label: "Visitors", color: "var(--chart-1)", fillOpacity: 0.12 }, { key: "signups", label: "Signups", color: "var(--chart-2)", fillOpacity: 0.2 }]} label="Visitors and signups" period={rangeInfo.period} height={300} showLegend />
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader className="border-b border-border/60">
            <CardTitle>Revenue by source</CardTitle>
            <CardDescription>Contribution to total revenue.</CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <PieChart data={rangeSourceMix} label="Revenue by source" centerLabel={`${rangeRevenueTotal} total`} height={260} />
          </CardContent>
        </Card>
      </section>

      <Card className="min-w-0">
        <CardHeader className="gap-3 border-b border-border/60 sm:flex-row sm:items-center sm:justify-between">
          <div><CardTitle>Source performance</CardTitle><CardDescription>Compare channel quality and return.</CardDescription></div>
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger aria-label="Filter sources" className="h-8 w-[154px]"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="all">All sources</SelectItem>{rangeSourcePerformance.map((item) => <SelectItem key={item.source} value={item.source}>{item.source}</SelectItem>)}</SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[680px] text-sm">
            <thead className="bg-muted/30 text-left text-xs font-medium text-muted-foreground">
              <tr><th className="px-5 py-3 font-medium">Source</th><th className="px-5 py-3 text-right font-medium">Visitors</th><th className="px-5 py-3 text-right font-medium">Signups</th><th className="px-5 py-3 text-right font-medium">Conversion</th><th className="px-5 py-3 text-right font-medium">Revenue</th><th className="px-5 py-3 text-right font-medium">Change</th><th className="w-10 px-3 py-3" /></tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {rangeSourcePerformance.filter((item) => source === "all" || item.source === source).map((item) => (
                <tr key={item.source} className="group transition-colors hover:bg-muted/30">
                  <td className="px-5 py-3.5 font-medium">{item.source}</td><td className="px-5 py-3.5 text-right tabular-nums text-muted-foreground">{item.visitors.toLocaleString("en-US")}</td><td className="px-5 py-3.5 text-right tabular-nums text-muted-foreground">{item.signups.toLocaleString("en-US")}</td><td className="px-5 py-3.5 text-right tabular-nums">{item.conversion.toFixed(1)}%</td><td className="px-5 py-3.5 text-right font-medium tabular-nums">${item.revenue.toLocaleString("en-US")}</td><td className="px-5 py-3.5 text-right"><span className="text-xs font-medium text-success">+{item.change.toFixed(1)}%</span></td><td className="px-3 py-3.5 text-right"><Button variant="ghost" size="icon-xs" className="opacity-0 transition-opacity group-hover:opacity-100" aria-label={`View ${item.source} details`}><IconChevronRight /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

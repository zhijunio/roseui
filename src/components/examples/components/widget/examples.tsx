"use client";

import Link from "next/link";

import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, XAxis } from "recharts";

import { ComponentPreview } from "@/components/examples/component-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Widget,
  WidgetContent,
  WidgetDescription,
  WidgetFooter,
  WidgetHeader,
  WidgetLegend,
  WidgetLegendItem,
  WidgetTitle,
} from "@/components/ui/widget";

const chartData = [
  { month: "Jan", revenue: 18, expenses: 12 },
  { month: "Feb", revenue: 24, expenses: 16 },
  { month: "Mar", revenue: 20, expenses: 14 },
  { month: "Apr", revenue: 32, expenses: 19 },
  { month: "May", revenue: 38, expenses: 22 },
  { month: "Jun", revenue: 34, expenses: 21 },
];

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  expenses: { label: "Expenses", color: "var(--chart-2)" },
};

const channels = [
  { name: "Direct", value: 48, color: "var(--chart-1)" },
  { name: "Partner", value: 31, color: "var(--chart-2)" },
  { name: "Organic", value: 21, color: "var(--chart-3)" },
];

function ChartWidget({ type }: { type: "bar" | "line" | "pie" }) {
  return (
    <Widget>
      <WidgetHeader>
        <div>
          <WidgetTitle>{type === "pie" ? "Revenue by channel" : "Revenue overview"}</WidgetTitle>
          <WidgetDescription>Monthly totals · last 6 months</WidgetDescription>
        </div>
        <WidgetLegend>
          {type === "pie" ? (
            channels.map((channel) => (
              <WidgetLegendItem key={channel.name} color={channel.color}>
                {channel.name}
              </WidgetLegendItem>
            ))
          ) : (
            <>
              <WidgetLegendItem color="var(--chart-1)">Revenue</WidgetLegendItem>
              <WidgetLegendItem color="var(--chart-2)">Expenses</WidgetLegendItem>
            </>
          )}
        </WidgetLegend>
      </WidgetHeader>
      <WidgetContent className="p-2 sm:p-3">
        <ChartContainer config={chartConfig} className="h-48 w-full" aria-label={`${type} chart of monthly revenue`}>
          {type === "bar" ? (
            <BarChart data={chartData} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
              <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
            </BarChart>
          ) : type === "line" ? (
            <LineChart data={chartData} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line dataKey="revenue" type="monotone" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
              <Line dataKey="expenses" type="monotone" stroke="var(--color-expenses)" strokeWidth={2} dot={false} />
            </LineChart>
          ) : (
            <PieChart accessibilityLayer>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie data={channels} dataKey="value" nameKey="name" innerRadius={48} outerRadius={76} paddingAngle={3}>
                {channels.map((channel) => (
                  <Cell key={channel.name} fill={channel.color} />
                ))}
              </Pie>
            </PieChart>
          )}
        </ChartContainer>
      </WidgetContent>
      <WidgetFooter>
        <span>Updated 8 minutes ago</span>
        <Button asChild variant="ghost" size="xs">
          <Link href="/components/area">View report</Link>
        </Button>
      </WidgetFooter>
    </Widget>
  );
}

function KpiWidget() {
  return (
    <Widget>
      <WidgetHeader>
        <div>
          <WidgetTitle>Workspace performance</WidgetTitle>
          <WidgetDescription>Key metrics for this month</WidgetDescription>
        </div>
        <Badge variant="secondary">June</Badge>
      </WidgetHeader>
      <WidgetContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Revenue", value: "$48,290", change: "+12.8%" },
          { label: "Active users", value: "2,840", change: "+6.4%" },
          { label: "Conversion", value: "4.82%", change: "+0.6%" },
          { label: "Churn", value: "1.24%", change: "−0.3%" },
        ].map((metric) => (
          <div key={metric.label} className="min-w-0">
            <p className="text-xs text-muted-foreground">{metric.label}</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">{metric.value}</p>
            <p className="mt-1 text-xs text-success">{metric.change} vs last month</p>
          </div>
        ))}
      </WidgetContent>
    </Widget>
  );
}

function UsageSummaryWidget() {
  return (
    <Widget>
      <WidgetHeader>
        <div>
          <WidgetTitle>Usage summary</WidgetTitle>
          <WidgetDescription>Current usage against plan limits</WidgetDescription>
        </div>
        <Badge variant="outline">Pro plan</Badge>
      </WidgetHeader>
      <WidgetContent className="space-y-4">
        {[
          { label: "Storage", value: 68, detail: "68 GB of 100 GB" },
          { label: "Automations", value: 42, detail: "420 of 1,000 runs" },
          { label: "Team seats", value: 80, detail: "8 of 10 seats" },
        ].map((row) => (
          <div key={row.label} className="space-y-1.5">
            <div className="flex justify-between gap-3 text-xs">
              <span className="font-medium">{row.label}</span>
              <span className="text-muted-foreground">{row.detail}</span>
            </div>
            <Progress value={row.value} aria-label={`${row.label} usage`} />
          </div>
        ))}
      </WidgetContent>
    </Widget>
  );
}

function TableWidget() {
  return (
    <Widget>
      <WidgetHeader>
        <div>
          <WidgetTitle>Recent transactions</WidgetTitle>
          <WidgetDescription>Latest account activity</WidgetDescription>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/components/table">View all</Link>
        </Button>
      </WidgetHeader>
      <WidgetContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { name: "Northstar Labs", status: "Paid", amount: "$2,480" },
              { name: "Fieldwork Studio", status: "Pending", amount: "$860" },
              { name: "Sundial Systems", status: "Paid", amount: "$1,240" },
            ].map((row) => (
              <TableRow key={row.name}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>
                  <Badge variant={row.status === "Paid" ? "secondary" : "outline"}>{row.status}</Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </WidgetContent>
      <WidgetFooter>
        <span>Showing 3 of 24 transactions</span>
        <span>Updated just now</span>
      </WidgetFooter>
    </Widget>
  );
}

export function WidgetExamples() {
  return (
    <>
      <ComponentPreview title="With Bar Chart" layout="panel">
        <ChartWidget type="bar" />
      </ComponentPreview>
      <ComponentPreview title="With Line Chart" layout="panel">
        <ChartWidget type="line" />
      </ComponentPreview>
      <ComponentPreview title="With Pie Chart" layout="panel">
        <ChartWidget type="pie" />
      </ComponentPreview>
      <ComponentPreview title="With KPIs" layout="panel">
        <KpiWidget />
      </ComponentPreview>
      <ComponentPreview title="Usage Summary" layout="panel">
        <UsageSummaryWidget />
      </ComponentPreview>
      <ComponentPreview title="With Table" layout="panel">
        <TableWidget />
      </ComponentPreview>
    </>
  );
}

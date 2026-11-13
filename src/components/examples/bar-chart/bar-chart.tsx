import { BarChart, type BarChartSeries, type MetricBarDatum } from "@/components/ui/bar-chart";
import { ComponentPreview } from "@/examples/component-preview";

const accent = "var(--primary)";

const weeklyActivity = [
  { key: "mon", label: "Monday", axisLabel: "Mon", values: { activity: 32 } },
  { key: "tue", label: "Tuesday", axisLabel: "Tue", values: { activity: 48 } },
  { key: "wed", label: "Wednesday", axisLabel: "Wed", values: { activity: 27 } },
  { key: "thu", label: "Thursday", axisLabel: "Thu", values: { activity: 56 } },
  { key: "fri", label: "Friday", axisLabel: "Fri", values: { activity: 42 } },
  { key: "sat", label: "Saturday", axisLabel: "Sat", values: { activity: 18 } },
  { key: "sun", label: "Sunday", axisLabel: "Sun", values: { activity: 24 } },
] satisfies readonly MetricBarDatum[];

const revenue = [
  { key: "jan", label: "January", axisLabel: "Jan", values: { recurring: 42, expansion: 18 } },
  { key: "feb", label: "February", axisLabel: "Feb", values: { recurring: 48, expansion: 21 } },
  { key: "mar", label: "March", axisLabel: "Mar", values: { recurring: 55, expansion: 24 } },
  { key: "apr", label: "April", axisLabel: "Apr", values: { recurring: 52, expansion: 29 } },
  { key: "may", label: "May", axisLabel: "May", values: { recurring: 64, expansion: 33 } },
  { key: "jun", label: "June", axisLabel: "Jun", values: { recurring: 71, expansion: 38 } },
] satisfies readonly MetricBarDatum[];

const pipeline = [
  {
    key: "qualified",
    label: "Qualified",
    axisLabel: "Qualified",
    values: { inbound: 480, outbound: 260, partner: 150 },
  },
  {
    key: "discovery",
    label: "Discovery",
    axisLabel: "Discovery",
    values: { inbound: 290, outbound: 190, partner: 104 },
  },
  { key: "proposal", label: "Proposal", axisLabel: "Proposal", values: { inbound: 180, outbound: 122, partner: 70 } },
  { key: "won", label: "Won", axisLabel: "Won", values: { inbound: 86, outbound: 54, partner: 38 } },
] satisfies readonly MetricBarDatum[];

const change = [
  { key: "onboarding", label: "Onboarding", axisLabel: "Onboarding", values: { change: 18 } },
  { key: "billing", label: "Billing", axisLabel: "Billing", values: { change: -7 } },
  { key: "reporting", label: "Reporting", axisLabel: "Reporting", values: { change: 12 } },
  { key: "permissions", label: "Permissions", axisLabel: "Permissions", values: { change: -14 } },
  { key: "integrations", label: "Integrations", axisLabel: "Integrations", values: { change: 8 } },
] satisfies readonly MetricBarDatum[];

const responseTime = [
  { key: "critical", label: "Critical", axisLabel: "Critical", values: { minutes: 8 } },
  { key: "high", label: "High", axisLabel: "High", values: { minutes: 24 } },
  { key: "normal", label: "Normal", axisLabel: "Normal", values: { minutes: 52 } },
  { key: "low", label: "Low", axisLabel: "Low", values: { minutes: 96 } },
] satisfies readonly MetricBarDatum[];

const activitySeries = [{ key: "activity", label: "Active minutes", color: accent }] satisfies readonly [
  BarChartSeries,
  ...BarChartSeries[],
];
const revenueSeries = [
  { key: "recurring", label: "Recurring", color: accent },
  { key: "expansion", label: "Expansion", color: "var(--chart-2)" },
] satisfies readonly [BarChartSeries, ...BarChartSeries[]];
const pipelineSeries = [
  { key: "inbound", label: "Inbound", color: accent },
  { key: "outbound", label: "Outbound", color: "var(--chart-2)" },
  { key: "partner", label: "Partner", color: "var(--chart-3)" },
] satisfies readonly [BarChartSeries, ...BarChartSeries[]];
const changeSeries = [{ key: "change", label: "Net change", color: accent }] satisfies readonly [
  BarChartSeries,
  ...BarChartSeries[],
];
const responseSeries = [{ key: "minutes", label: "Median response", color: accent }] satisfies readonly [
  BarChartSeries,
  ...BarChartSeries[],
];

export function BarChartExamples() {
  return (
    <>
      <ComponentPreview title="Weekly activity" layout="panel" density="chart">
        <BarChart
          data={weeklyActivity}
          series={activitySeries}
          label="Active minutes by day"
          period="This week"
          unit="min"
        />
      </ComponentPreview>
      <ComponentPreview title="Grouped revenue" layout="panel" density="chart">
        <BarChart
          data={revenue}
          series={revenueSeries}
          variant="grouped"
          label="Revenue by month"
          period="First half"
          unit="k"
        />
      </ComponentPreview>
      <ComponentPreview title="Stacked pipeline" layout="panel" density="chart">
        <BarChart
          data={pipeline}
          series={pipelineSeries}
          variant="stacked"
          label="Pipeline by stage"
          period="Current quarter"
          unit="deals"
        />
      </ComponentPreview>
      <ComponentPreview title="Net change" layout="panel" density="chart">
        <BarChart
          data={change}
          series={changeSeries}
          variant="diverging"
          label="Net change by area"
          period="Last 30 days"
          valueFormat="signed"
        />
      </ComponentPreview>
      <ComponentPreview title="Horizontal comparison" layout="panel" density="chart">
        <BarChart
          data={responseTime}
          series={responseSeries}
          orientation="horizontal"
          label="Median response time"
          period="Last 7 days"
          unit="min"
          height={240}
        />
      </ComponentPreview>
      <ComponentPreview title="Lollipop marks" layout="panel" density="chart">
        <BarChart
          data={weeklyActivity}
          series={activitySeries}
          mark="lollipop"
          label="Active minutes with lollipop marks"
          period="Work week"
          unit="min"
        />
      </ComponentPreview>
    </>
  );
}

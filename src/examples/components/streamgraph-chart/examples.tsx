import { Streamgraph, type StreamgraphDatum, type StreamgraphSeries } from "@/components/ui/streamgraph";
import { ComponentPreview } from "@/examples/component-preview";

const series = [
  { key: "bugs", label: "Bugs", color: "var(--chart-1)" },
  { key: "billing", label: "Billing", color: "var(--chart-5)" },
  { key: "integrations", label: "Integrations", color: "var(--chart-3)" },
  { key: "onboarding", label: "Onboarding", color: "var(--chart-2)" },
  { key: "account-access", label: "Account access" },
  { key: "feature-requests", label: "Feature requests" },
] satisfies StreamgraphSeries[];

const data = [
  {
    key: "2026-09-01",
    label: "Week of Sep 1",
    axisLabel: "Sep",
    values: { bugs: 18, billing: 12, integrations: 8, onboarding: 24, "account-access": 7, "feature-requests": 5 },
  },
  {
    key: "2026-09-08",
    label: "Week of Sep 8",
    values: { bugs: 25, billing: 18, integrations: 11, onboarding: 20, "account-access": 9, "feature-requests": 6 },
  },
  {
    key: "2026-09-15",
    label: "Week of Sep 15",
    values: { bugs: 21, billing: 28, integrations: 14, onboarding: 26, "account-access": 8, "feature-requests": 7 },
  },
  {
    key: "2026-09-22",
    label: "Week of Sep 22",
    values: { bugs: 32, billing: 22, integrations: 10, onboarding: 18, "account-access": 12, "feature-requests": 9 },
  },
  {
    key: "2026-09-29",
    label: "Week of Sep 29",
    values: { bugs: 28, billing: 31, integrations: 16, onboarding: 24, "account-access": 10, "feature-requests": 8 },
  },
  {
    key: "2026-10-06",
    label: "Week of Oct 6",
    axisLabel: "Oct",
    values: { bugs: 36, billing: 26, integrations: 13, onboarding: 22, "account-access": 14, "feature-requests": 10 },
  },
  {
    key: "2026-10-13",
    label: "Week of Oct 13",
    values: { bugs: 30, billing: 34, integrations: 18, onboarding: 27, "account-access": 11, "feature-requests": 12 },
  },
  {
    key: "2026-10-20",
    label: "Week of Oct 20",
    values: { bugs: 39, billing: 29, integrations: 15, onboarding: 23, "account-access": 16, "feature-requests": 11 },
  },
  {
    key: "2026-10-27",
    label: "Week of Oct 27",
    values: { bugs: 34, billing: 38, integrations: 20, onboarding: 30, "account-access": 13, "feature-requests": 14 },
  },
  {
    key: "2026-11-03",
    label: "Week of Nov 3",
    axisLabel: "Nov",
    values: { bugs: 42, billing: 33, integrations: 17, onboarding: 28, "account-access": 18, "feature-requests": 13 },
  },
  {
    key: "2026-11-10",
    label: "Week of Nov 10",
    values: { bugs: 38, billing: 41, integrations: 22, onboarding: 32, "account-access": 15, "feature-requests": 16 },
  },
  {
    key: "2026-11-17",
    label: "Week of Nov 17",
    values: { bugs: 46, billing: 36, integrations: 19, onboarding: 29, "account-access": 20, "feature-requests": 15 },
  },
] satisfies StreamgraphDatum[];

export function StreamgraphExample() {
  return (
    <ComponentPreview title="Support tickets by topic" layout="fullStack" span={2} density="chart">
      <Streamgraph data={data} series={series} label="Support tickets by topic" unit="tickets" categoryLabel="Week" />
    </ComponentPreview>
  );
}

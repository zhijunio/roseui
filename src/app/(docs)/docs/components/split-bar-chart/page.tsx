import { SplitBarChartExample } from "@/examples/components/split-bar-chart/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Split Bar Chart" };

export default function SplitBarChartPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Split Bar Chart" />
      <SplitBarChartExample />
    </div>
  );
}

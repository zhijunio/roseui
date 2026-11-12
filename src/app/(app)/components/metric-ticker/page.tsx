import { ComponentPreview } from "@/examples/component-preview";
import { MetricTickerExamples } from "@/examples/components/metric-ticker/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Metric Ticker" };

export default function MetricTickerPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Metric Ticker" />
      <ComponentPreview title="Workspace metrics" layout="fullStack">
        <MetricTickerExamples />
      </ComponentPreview>
    </div>
  );
}

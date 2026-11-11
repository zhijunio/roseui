import { ComponentPreview } from "@/components/examples/component-preview";
import { MetricTickerExamples } from "@/components/examples/components/metric-ticker/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Metric Ticker" };

export default function MetricTickerPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Metric Ticker"
        description="Scan several workspace measures and inspect one selected metric in context."
      />
      <ComponentPreview title="Workspace metrics" layout="fullStack">
        <MetricTickerExamples />
      </ComponentPreview>
    </div>
  );
}

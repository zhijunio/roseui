import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import { MetricTickerExamples } from "./examples";

export const metadata = { title: "Metric Ticker" };

export default function MetricTickerPage() {
  return <div className="space-y-6"><PageHeader title="Metric Ticker" description="Scan several workspace measures and inspect one selected metric in context." /><ComponentPreview previewId="metric-ticker-01" title="Workspace metrics" layout="fullStack"><MetricTickerExamples /></ComponentPreview></div>;
}

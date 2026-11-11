import { GaugeExamples } from "@/components/examples/components/gauge-chart/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Gauge" };

export default function GaugeExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Gauge" description="Show a value against a known range with a clear completion state." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <GaugeExamples />
      </div>
    </div>
  );
}

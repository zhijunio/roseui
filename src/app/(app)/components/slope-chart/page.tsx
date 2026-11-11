import { SlopeChartExample } from "@/components/examples/components/slope-chart/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Slope Chart" };

export default function SlopeChartExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Slope Chart" description="Compare how several items changed between two moments." />
      <SlopeChartExample />
    </div>
  );
}

import { SlopeChartExample } from "@/examples/components/slope-chart/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Slope Chart" };

export default function SlopeChartExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Slope Chart" />
      <SlopeChartExample />
    </div>
  );
}

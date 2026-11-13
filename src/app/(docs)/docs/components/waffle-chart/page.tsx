import { WaffleChartExample } from "@/examples/components/waffle-chart/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Waffle Chart" };

export default function WaffleChartPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Waffle Chart" />
      <WaffleChartExample />
    </div>
  );
}

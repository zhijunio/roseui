import { RaceBarChartExample } from "@/examples/components/race-bar-chart/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Race Bar Chart" };

export default function RaceBarChartPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Race Bar Chart" />
      <RaceBarChartExample />
    </div>
  );
}

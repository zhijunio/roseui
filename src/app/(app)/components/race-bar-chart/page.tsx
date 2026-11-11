import { RaceBarChartExample } from "@/components/examples/components/race-bar-chart/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Race Bar Chart" };

export default function RaceBarChartPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Race Bar Chart" description="Compare how category rankings change across reporting periods." />
      <RaceBarChartExample />
    </div>
  );
}

import { FunnelChartExamples } from "@/components/examples/funnel-chart/funnel-chart";

export const metadata = { title: "Funnel Chart" };

export default function FunnelChartPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <FunnelChartExamples />
      </div>
    </div>
  );
}

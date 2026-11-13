import { RadarChartExamples } from "@/examples/components/radar/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Radar Charts" };

export default function RadarPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Radar Charts" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <RadarChartExamples />
      </div>
    </div>
  );
}

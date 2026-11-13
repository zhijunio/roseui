import { MapChartExamples } from "@/examples/components/map/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Maps" };

export default function MapPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Maps" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <MapChartExamples />
      </div>
    </div>
  );
}

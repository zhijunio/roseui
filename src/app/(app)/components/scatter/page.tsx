import { ScatterChartExamples } from "@/examples/components/scatter/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Scatter Charts" };

export default function ScatterPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Scatter Charts" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ScatterChartExamples />
      </div>
    </div>
  );
}

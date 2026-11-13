import { SankeyChartExamples } from "@/examples/components/sankey/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Sankey Chart" };

export default function SankeyPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Sankey Chart" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SankeyChartExamples />
      </div>
    </div>
  );
}

import { DonutChartExamples } from "@/examples/components/donut/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Donut Chart" };

export default function DonutPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Donut Chart" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <DonutChartExamples />
      </div>
    </div>
  );
}

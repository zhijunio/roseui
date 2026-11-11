import { PieChartExamples } from "@/components/examples/components/pie/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Pie Charts" };

export default function PiePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Pie Charts" description="Show parts of a whole, including category breakdowns." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <PieChartExamples />
      </div>
    </div>
  );
}

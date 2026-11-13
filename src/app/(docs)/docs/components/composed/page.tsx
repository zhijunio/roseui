import { ComposedChartExamples } from "@/examples/components/composed/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Composed Charts" };

export default function ComposedPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Composed Charts" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComposedChartExamples />
      </div>
    </div>
  );
}

import { RadialChartExamples } from "@/components/examples/components/radial/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Radial Charts" };

export default function RadialPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Radial Charts" description="Show circular scores and a single completion target." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <RadialChartExamples />
      </div>
    </div>
  );
}

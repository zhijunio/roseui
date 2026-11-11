import { AreaChartExamples } from "@/components/examples/components/area/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Area Charts" };

export default function AreaPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Area Charts" description="Compare volume, share, stacked series, and step-shaped trends." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <AreaChartExamples />
      </div>
    </div>
  );
}

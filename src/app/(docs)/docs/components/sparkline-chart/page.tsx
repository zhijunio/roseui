import { ComponentPreview } from "@/examples/component-preview";
import { SparklineExample } from "@/examples/components/sparkline-chart/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Sparkline" };

export default function SparklineExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Sparkline" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentPreview
          title="Sparkline"
          layout="fullStack"
          span={2}
          density="chart"
          className="[&>[data-slot=card-header]]:hidden"
        >
          <SparklineExample />
        </ComponentPreview>
      </div>
    </div>
  );
}

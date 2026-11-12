import { ProgressCircleExamples } from "@/examples/components/progress-circle/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Progress Circle" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Progress Circle" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ProgressCircleExamples />
      </div>
    </div>
  );
}

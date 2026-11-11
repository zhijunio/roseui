import { ProgressCircleExamples } from "@/components/examples/components/progress-circle/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Progress Circle" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Progress Circle" description="Usage examples for the Progress Circle component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ProgressCircleExamples />
      </div>
    </div>
  );
}

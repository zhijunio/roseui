import { PageHeader } from "@/components/page-header";
import { SegmentedControlExamples } from "@/app/(app)/components/segmented-control/examples";

export const metadata = { title: "Segmented Control" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Segmented Control" description="Usage examples for the Segmented Control component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SegmentedControlExamples />
      </div>
    </div>
  );
}

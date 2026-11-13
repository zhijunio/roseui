import { SkeletonExamples } from "@/examples/components/skeleton/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Skeleton" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Skeleton" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SkeletonExamples />
      </div>
    </div>
  );
}

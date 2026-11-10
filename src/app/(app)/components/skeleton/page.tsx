import { PageHeader } from "@/components/page-header";
import { SkeletonExamples } from "@/app/(app)/components/skeleton/examples";

export const metadata = { title: "Skeleton" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Skeleton" description="Usage examples for the Skeleton component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SkeletonExamples />
      </div>
    </div>
  );
}

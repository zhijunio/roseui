import { PageHeader } from "@/components/page-header";
import { ProgressExamples } from "@/app/(app)/components/progress/examples";

export const metadata = { title: "Progress" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Progress" description="Usage examples for the Progress component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ProgressExamples />
      </div>
    </div>
  );
}

import { PageHeader } from "@/components/page-header";
import { ResizableExamples } from "@/app/(app)/components/resizable/examples";

export const metadata = { title: "Resizable" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Resizable" description="Usage examples for the Resizable component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ResizableExamples />
      </div>
    </div>
  );
}

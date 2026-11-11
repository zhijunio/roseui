import { TreeExamples } from "@/components/examples/components/tree/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Tree" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tree" description="Usage examples for the Tree component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TreeExamples />
      </div>
    </div>
  );
}

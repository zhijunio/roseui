import { CollapsibleExamples } from "@/examples/components/collapsible/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Collapsible" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Collapsible" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CollapsibleExamples />
      </div>
    </div>
  );
}

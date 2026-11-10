import { PageHeader } from "@/components/page-header";
import { CollapsibleExamples } from "@/app/(app)/components/collapsible/examples";

export const metadata = { title: "Collapsible" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Collapsible" description="Usage examples for the Collapsible component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CollapsibleExamples />
      </div>
    </div>
  );
}

import { SortableExamples } from "@/components/examples/components/sortable/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Sortable" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Sortable" description="Usage examples for the Sortable component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SortableExamples />
      </div>
    </div>
  );
}

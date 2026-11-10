import { PageHeader } from "@/components/page-header";
import { SortableExamples } from "@/app/(app)/components/sortable/examples";

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

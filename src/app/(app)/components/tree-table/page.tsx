import { TreeTableExamples } from "@/app/(app)/components/tree-table/examples";
import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Tree Table" };

export default function TreeTablePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tree Table" description="Compare records while keeping their parent and child relationships visible." />
      <TreeTableExamples />
    </div>
  );
}

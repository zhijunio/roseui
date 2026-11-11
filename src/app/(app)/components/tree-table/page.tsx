import { TreeTableExamples } from "@/components/examples/components/tree-table/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Tree Table" };

export default function TreeTablePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tree Table"
        description="Compare records while keeping their parent and child relationships visible."
      />
      <TreeTableExamples />
    </div>
  );
}

import { TreeTableExamples } from "@/examples/components/tree-table/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Tree Table" };

export default function TreeTablePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tree Table" />
      <TreeTableExamples />
    </div>
  );
}

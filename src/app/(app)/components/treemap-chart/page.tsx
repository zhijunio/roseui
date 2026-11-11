import { TreemapExample } from "@/components/examples/components/treemap-chart/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Treemap" };

export default function TreemapExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Treemap" description="Compare category size and inspect the parts within a group." />
      <TreemapExample />
    </div>
  );
}

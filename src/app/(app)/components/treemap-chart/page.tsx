import { TreemapExample } from "@/examples/components/treemap-chart/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Treemap" };

export default function TreemapExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Treemap" />
      <TreemapExample />
    </div>
  );
}

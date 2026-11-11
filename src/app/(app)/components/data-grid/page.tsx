import { DataGridExamples } from "@/components/examples/components/data-grid/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Data Grid" };

export default function DataGridPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Grid"
        description="Edit structured records in place with keyboard navigation and a responsive overflow surface."
      />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <DataGridExamples />
      </div>
    </div>
  );
}

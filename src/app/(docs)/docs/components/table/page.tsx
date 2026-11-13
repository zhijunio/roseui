import { TableExamples } from "@/examples/components/table/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Table" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Table" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TableExamples />
      </div>
    </div>
  );
}

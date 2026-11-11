import { TableExamples } from "@/components/examples/components/table/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Table" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Table" description="Usage examples for the Table component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TableExamples />
      </div>
    </div>
  );
}

import { BusinessTableExamples } from "@/components/examples/table/business-table";
import { TableExamples } from "@/components/examples/table/table";

export const metadata = { title: "Table" };

export default function TablePage() {
  return (
    <div className="space-y-6">
      <TableExamples />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <BusinessTableExamples />
      </div>
    </div>
  );
}

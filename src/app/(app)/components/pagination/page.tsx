import { PaginationExamples } from "@/components/examples/components/pagination/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Pagination" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Pagination" description="Usage examples for the Pagination component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <PaginationExamples />
      </div>
    </div>
  );
}

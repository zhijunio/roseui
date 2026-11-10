import { PageHeader } from "@/components/page-header";
import { PaginationExamples } from "@/app/(app)/components/pagination/examples";

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

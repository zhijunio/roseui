import { PageHeader } from "@/components/page-header";
import { SearchFieldExamples } from "@/app/(app)/components/search-field/examples";

export const metadata = { title: "Search Field" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Search Field" description="Usage examples for the Search Field component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SearchFieldExamples />
      </div>
    </div>
  );
}

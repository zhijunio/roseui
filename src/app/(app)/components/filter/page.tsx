import { FilterExamples } from "@/components/examples/components/filter/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Filter" };

export default function FilterPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Filter" description="Build and apply conditions to narrow a set of records." />
      <FilterExamples />
    </div>
  );
}

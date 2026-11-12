import { FilterExamples } from "@/examples/components/filter/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Filter" };

export default function FilterPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Filter" />
      <FilterExamples />
    </div>
  );
}

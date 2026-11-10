import { PageHeader } from "@/components/page-header";
import { FilterExamples } from "@/app/(app)/components/filter/examples";

export const metadata = { title: "Filter" };

export default function FilterPage() {
  return <div className="space-y-6"><PageHeader title="Filter" description="Build and apply conditions to narrow a set of records." /><FilterExamples /></div>;
}

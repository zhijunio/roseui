import { EmptyExamples, EmptyStatesGrid } from "@/components/examples/components/empty-states/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Empty States" };

export default function EmptyStatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Empty States"
        description="Consistent, on-brand states for zero-data, no-results and error surfaces."
      />

      <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
        <EmptyStatesGrid />
        <EmptyExamples />
      </div>
    </div>
  );
}

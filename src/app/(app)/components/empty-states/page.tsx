import { PageHeader } from "@/components/page-header";
import { EmptyExamples, EmptyStatesGrid } from "./examples";

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

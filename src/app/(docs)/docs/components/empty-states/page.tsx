import { EmptyExamples, EmptyStatesGrid } from "@/examples/components/empty-states/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Empty States" };

export default function EmptyStatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Empty States" />

      <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
        <EmptyStatesGrid />
        <EmptyExamples />
      </div>
    </div>
  );
}

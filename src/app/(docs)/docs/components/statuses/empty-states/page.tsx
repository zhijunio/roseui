import { EmptyExamples, EmptyStatesGrid } from "@/components/examples/empty-states/empty-states";

export const metadata = { title: "Empty States" };

export default function EmptyStatesPage() {
  return (
    <div className="space-y-6">
      <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
        <EmptyStatesGrid />
        <EmptyExamples />
      </div>
    </div>
  );
}

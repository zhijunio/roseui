import { SwipeActionsExamples } from "@/components/examples/components/swipe-actions/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Swipe Actions" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Swipe Actions"
        description="Reveal common row actions with a horizontal swipe or the visible actions control."
      />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SwipeActionsExamples />
      </div>
    </div>
  );
}

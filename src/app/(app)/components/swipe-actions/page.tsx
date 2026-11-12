import { SwipeActionsExamples } from "@/examples/components/swipe-actions/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Swipe Actions" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Swipe Actions" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SwipeActionsExamples />
      </div>
    </div>
  );
}

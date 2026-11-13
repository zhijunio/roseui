import { SwipeActionsExamples } from "@/components/examples/swipe-actions/swipe-actions";

export const metadata = { title: "Swipe Actions" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SwipeActionsExamples />
      </div>
    </div>
  );
}

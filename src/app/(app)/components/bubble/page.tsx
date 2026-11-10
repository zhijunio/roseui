import { PageHeader } from "@/components/page-header";
import { BubbleExamples } from "@/app/(app)/components/bubble/examples";

export const metadata = { title: "Bubble" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Bubble" description="Usage examples for the Bubble component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <BubbleExamples />
      </div>
    </div>
  );
}

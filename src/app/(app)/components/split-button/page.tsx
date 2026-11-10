import { SplitButtonExamples } from "@/app/(app)/components/split-button/examples";
import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Split Button" };

export default function SplitButtonExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Split Button"
        description="Pair a primary command with closely related alternatives."
      />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SplitButtonExamples />
      </div>
    </div>
  );
}

import { SplitButtonExamples } from "@/examples/components/split-button/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Split Button" };

export default function SplitButtonExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Split Button" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SplitButtonExamples />
      </div>
    </div>
  );
}

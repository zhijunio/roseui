import { NumberValueExamples } from "@/components/examples/components/number-value/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Number Value" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Number Value" description="Usage examples for the Number Value component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <NumberValueExamples />
      </div>
    </div>
  );
}

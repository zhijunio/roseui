import { PageHeader } from "@/components/page-header";
import { NumberFieldExamples } from "@/app/(app)/components/number-field/examples";

export const metadata = { title: "Number Field" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Number Field" description="Usage examples for the Number Field component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <NumberFieldExamples />
      </div>
    </div>
  );
}

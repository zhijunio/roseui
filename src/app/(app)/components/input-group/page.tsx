import { InputGroupExamples } from "@/components/examples/components/input-group/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Input Group" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Input Group" description="Usage examples for the Input Group component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <InputGroupExamples />
      </div>
    </div>
  );
}

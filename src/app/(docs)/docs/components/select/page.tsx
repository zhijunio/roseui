import { SelectExamples } from "@/examples/components/select/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Select" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Select" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SelectExamples />
      </div>
    </div>
  );
}

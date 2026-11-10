import { PageHeader } from "@/components/page-header";
import { SelectExamples } from "@/app/(app)/components/select/examples";

export const metadata = { title: "Select" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Select" description="Usage examples for the Select component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SelectExamples />
      </div>
    </div>
  );
}

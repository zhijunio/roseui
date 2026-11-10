import { PageHeader } from "@/components/page-header";
import { CheckboxExamples } from "@/app/(app)/components/checkbox/examples";

export const metadata = { title: "Checkbox" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Checkbox" description="Usage examples for the Checkbox component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CheckboxExamples />
      </div>
    </div>
  );
}

import { PageHeader } from "@/components/page-header";
import { CheckboxGroupExamples } from "@/app/(app)/components/checkbox-group/examples";

export const metadata = { title: "Checkbox Group" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Checkbox Group" description="Usage examples for the Checkbox Group component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CheckboxGroupExamples />
      </div>
    </div>
  );
}

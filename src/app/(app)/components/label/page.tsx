import { PageHeader } from "@/components/page-header";
import { LabelExamples } from "@/app/(app)/components/label/examples";

export const metadata = { title: "Label" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Label" description="Usage examples for the Label component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <LabelExamples />
      </div>
    </div>
  );
}

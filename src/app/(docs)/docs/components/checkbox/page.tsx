import { CheckboxExamples } from "@/examples/components/checkbox/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Checkbox" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Checkbox" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CheckboxExamples />
      </div>
    </div>
  );
}

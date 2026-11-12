import { FieldExamples } from "@/examples/components/field/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Field" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Field" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <FieldExamples />
      </div>
    </div>
  );
}
